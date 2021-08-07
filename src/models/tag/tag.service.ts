import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTagInput } from 'src/dto/tag/CreateTagDTO';
import { Tag } from 'src/dto/tag/TagDTO';
import { TagDocument, TAG_NAME } from './tag.schema';

@Injectable()
export class TagService {
  constructor(@InjectModel(TAG_NAME) public tagModel: Model<TagDocument>) {}

  async create(createTagInput: CreateTagInput, userId: string): Promise<Tag> {
    const slug = createTagInput.title;
    const tag = new this.tagModel({ ...createTagInput, slug, createBy: userId });
    const tagData = await tag.save();
    // this.eventEmitter.emit(EVENT_ITEM.CREATE, data);
    return tagData;
  }
}
