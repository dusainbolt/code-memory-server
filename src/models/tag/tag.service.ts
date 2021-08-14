import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, _FilterQuery } from 'mongoose';
import { CreateTagInput, UpdateTagInput } from 'src/dto/tag/CreateTagDTO';
import { OutputSearchTag, QuerySearchTag, SearchTagInput } from 'src/dto/tag/SearchTagDTO';
import { Tag } from 'src/dto/tag/TagDTO';
import { TagDocument, TAG_NAME } from './tag.schema';
import { convertToSlug, removeEmpty } from 'src/common/functions';
import { UserHashToken } from '../users/dto/user-hash-token';
import { TagStatus, TagType } from 'src/dto/tag/TagEnum';
import { Role } from '../users/dto/user-enum';
import { MSG_SYSTEM } from 'src/common/valid_message';

@Injectable()
export class TagService {
  constructor(@InjectModel(TAG_NAME) public tagModel: Model<TagDocument>) {}

  async create(createTagInput: CreateTagInput, user: UserHashToken): Promise<Tag> {
    // Convert slug
    const slug = convertToSlug(createTagInput.title);
    // Create Tag
    const tag = new this.tagModel({ ...createTagInput, slug, createBy: user.id });
    const tagData = await tag.save();
    // Return result
    return tagData;
  }

  async update(updateTagInput: UpdateTagInput): Promise<Tag> {
    const tagData = updateTagInput.data;
    // Convert slug
    const slug = convertToSlug(tagData.title);
    // update Tag
    const tagDataUpdate = await this.tagModel.findByIdAndUpdate(updateTagInput.tagId, { ...tagData, slug });
    // Return result
    return tagDataUpdate;
  }

  async list(searchTagInput: SearchTagInput): Promise<OutputSearchTag> {
    const query: QuerySearchTag = { title: {}, status: {} };
    // Handle condition with key
    if (!!searchTagInput?.key) {
      query.title.$regex = new RegExp(searchTagInput.key.trim(), 'i');
    }
    // Handle condition with status
    if (!!searchTagInput?.status?.length) {
      query.status.$in = searchTagInput.status;
    }
    // Handle remove not condition filed
    const queryConvert = removeEmpty(query);
    // Query data
    const dataTags = await this.tagModel.find(queryConvert).skip(searchTagInput.offset).limit(searchTagInput.limit);
    // Query total
    const total = await this.tagModel.countDocuments(queryConvert);
    // Return result
    return { dataTags, total };
  }
}
