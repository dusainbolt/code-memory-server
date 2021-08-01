import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { USER_NAME } from '../users/user.schema';
import { BlogContent } from './dto/blog-dto';
// import { BlogContent } from './dto/blog-dto';

@Schema({ timestamps: true })
export class BlogModel {
  @Prop({ unique: true, required: true })
  title: string;

  @Prop({ unique: true, required: true })
  slug: string;

  @Prop({ unique: true, required: true })
  description: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: USER_NAME })
  createBy: string;

  @Prop({
    type: [{ type: { type: String }, content: { type: String }, language: { type: String } }],
    required: true,
  })
  content: BlogContent[];
}

export type BlogDocument = BlogModel & Document;

export const BLOG_NAME = 'Blog';

export const BlogSchema = SchemaFactory.createForClass(BlogModel);
