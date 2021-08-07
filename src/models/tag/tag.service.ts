import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, _FilterQuery } from 'mongoose';
import { CreateTagInput } from 'src/dto/tag/CreateTagDTO';
import { SearchTagInput } from 'src/dto/tag/SearchTagDTO';
import { Tag } from 'src/dto/tag/TagDTO';
import { TagDocument, TAG_NAME } from './tag.schema';
import { FilterQuery } from 'mongoose';

@Injectable()
export class TagService {
  constructor(@InjectModel(TAG_NAME) public tagModel: Model<TagDocument>) {}

  async create(createTagInput: CreateTagInput, userId: string): Promise<Tag> {
    const slug = createTagInput.title;
    const tag = new this.tagModel({ ...createTagInput, slug, createBy: userId });
    const tagData = await tag.save();
    return tagData;
  }

  async list(searchTagInput: SearchTagInput): Promise<Tag[]> {
    const query: any = {};
    if (!!searchTagInput?.key) {
      query.title = { $regex: new RegExp(searchTagInput.key.trim(), 'i') };
    }
    if (!!searchTagInput?.status?.length) {
      // query.status: {$ }
    }
    // const slug = createTagInput.title;
    // const tag = new this.tagModel({ ...createTagInput, slug, createBy: userId });
    // const tagData = await tag.save();
    // return tagData;

    return this.tagModel.find(query);
  }
}
