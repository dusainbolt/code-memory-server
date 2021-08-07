import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, _FilterQuery } from 'mongoose';
import { CreateTagInput } from 'src/dto/tag/CreateTagDTO';
import { OutputSearchTag, QuerySearchTag, SearchTagInput } from 'src/dto/tag/SearchTagDTO';
import { Tag } from 'src/dto/tag/TagDTO';
import { TagDocument, TAG_NAME } from './tag.schema';
import { FilterQuery } from 'mongoose';
import { Condition } from 'mongodb';
import { removeEmpty } from 'src/common/functions';

@Injectable()
export class TagService {
  constructor(@InjectModel(TAG_NAME) public tagModel: Model<TagDocument>) {}

  async create(createTagInput: CreateTagInput, userId: string): Promise<Tag> {
    const slug = createTagInput.title;
    const tag = new this.tagModel({ ...createTagInput, slug, createBy: userId });
    const tagData = await tag.save();
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
    const queryConvert = removeEmpty(query);
    const dataTags = await this.tagModel.find(queryConvert).skip(searchTagInput.offset).limit(searchTagInput.limit);
    const total = await this.tagModel.count(queryConvert);
    return { dataTags, total };
  }
}
