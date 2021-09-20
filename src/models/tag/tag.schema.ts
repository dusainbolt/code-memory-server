import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { TagStatus, TagType } from 'src/dto/tag/TagEnum';
import { USER_NAME } from '../users/user.schema';

@Schema({ timestamps: true })
export class TagModel {
  @Prop({ unique: true, required: true })
  title: string;

  @Prop({ unique: true, required: true })
  slug: string;

  @Prop()
  description: string;

  @Prop()
  thumbnail: string;

  @Prop({ type: Number, enum: TagStatus, required: true })
  status: number;

  @Prop({ type: Number, enum: TagType, required: true, default: TagType.SYSTEM })
  tagType: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: USER_NAME, required: true })
  createBy: string;
}

export type TagDocument = TagModel & Document;

export const TAG_NAME = 'Tag';

export const TAG_OTHER_NAME = 'tags';

export const TagSchema = SchemaFactory.createForClass(TagModel);
