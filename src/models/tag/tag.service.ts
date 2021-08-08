import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, _FilterQuery } from 'mongoose';
import { CreateTagInput } from 'src/dto/tag/CreateTagDTO';
import { OutputSearchTag, QuerySearchTag, SearchTagInput } from 'src/dto/tag/SearchTagDTO';
import { Tag } from 'src/dto/tag/TagDTO';
import { TagDocument, TAG_NAME } from './tag.schema';
import { removeEmpty } from 'src/common/functions';
import { UserHashToken } from '../users/dto/user-hash-token';
import { TagType } from 'src/dto/tag/TagEnum';
import { Role } from '../users/dto/user-enum';
import { MSG_TAG } from 'src/common/valid_message';

@Injectable()
export class TagService {
  constructor(@InjectModel(TAG_NAME) public tagModel: Model<TagDocument>) {}

  async create(createTagInput: CreateTagInput, user: UserHashToken): Promise<Tag> {
    // Check allow create type
    if (createTagInput.tagType === TagType.SYSTEM && user.roles.includes(Role.ADMIN)) {
      throw new Error(MSG_TAG.NOT_ALLOW_TYPE);
    }
    // Convert slug
    const slug = createTagInput.title;
    // Create Tag
    const tag = new this.tagModel({ ...createTagInput, slug, createBy: user.id });
    const tagData = await tag.save();
    // Return result
    return tagData;
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