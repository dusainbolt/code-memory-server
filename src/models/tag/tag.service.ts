import { QUERY_LIST } from './../../common/contant';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, _FilterQuery } from 'mongoose';
import { CreateTagInput, UpdateTagInput } from 'src/dto/tag/CreateTagDTO';
import { OutputSearchTag, QuerySearchTag, SearchTagInput } from 'src/dto/tag/SearchTagDTO';
import { Tag } from 'src/dto/tag/TagDTO';
import { TagDocument, TAG_NAME } from './tag.schema';
import { User } from '../../dto/user/UserDTO';
import { EntireTagInput } from 'src/dto/tag/GetTagDetailDTO';
import { helperService } from 'src/common/HelperService';
@Injectable()
export class TagService {
  constructor(@InjectModel(TAG_NAME) public tagModel: Model<TagDocument>) {}

  async create(createTagInput: CreateTagInput, user: User): Promise<Tag> {
    // Convert slug
    const slug = helperService.convertToSlug(createTagInput.title);
    // Create Tag
    const tag = new this.tagModel({ ...createTagInput, slug, createBy: user.id });
    const tagData = await tag.save();
    // Return result
    return tagData;
  }

  async update(updateTagInput: UpdateTagInput): Promise<Tag> {
    const { data, tagId } = updateTagInput;
    // Convert slug
    const slug = helperService.convertToSlug(data.title);
    // update Tag
    const tagDataUpdate = await this.tagModel.findByIdAndUpdate(tagId, { ...data, slug });
    // Return result
    return tagDataUpdate;
  }

  async findByIds(ids: string[]): Promise<Tag[]> {
    return this.tagModel.find({ _id: { $in: ids } });
  }

  async entire({ status, limit }: EntireTagInput): Promise<Tag[]> {
    if (!!limit) {
      return this.tagModel
        .find({ status: { $in: status } })
        .limit(limit)
        .sort({ createdAt: QUERY_LIST.DESC });
    } else {
      return this.tagModel.find({ status: { $in: status } }).sort({ createdAt: QUERY_LIST.DESC });
    }
  }

  async findOneBySlug(slug: string): Promise<Tag> {
    return this.tagModel.findOne({ slug });
  }

  async list(searchTagInput: SearchTagInput): Promise<OutputSearchTag> {
    const query: QuerySearchTag = {};
    const queryList = helperService.getParamsList(searchTagInput);
    // Handle condition with key
    if (!!searchTagInput.key) {
      query.title = { $regex: new RegExp(searchTagInput.key.trim(), 'i') };
    }
    // Handle condition with status
    if (!!searchTagInput.status.length) {
      query.status = { $in: searchTagInput.status };
    }
    // Query data
    const dataTags = await this.tagModel
      .find(query as any)
      .skip(queryList.offset)
      .limit(queryList.limit)
      .sort({ [queryList.orderBy]: queryList.sortBy });
    // Query total
    const total = searchTagInput.count ? await this.tagModel.countDocuments(query as any) : 0;
    // Return result
    return { dataTags, total };
  }
}
