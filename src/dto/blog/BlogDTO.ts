import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { BlogContentType } from './BlogEnum';

@ObjectType('BlogContent')
@InputType('BlogContentInput')
export class BlogContent {
  @Field()
  type: BlogContentType;

  @Field()
  data: string;

  @Field()
  language: string;
}

@ObjectType()
export class Blog {
  @Field(() => ID)
  readonly id?: MongooseSchema.Types.ObjectId;

  @Field()
  title: string;

  @Field()
  slug: string;

  @Field()
  createBy: string;

  @Field()
  description: string;

  @Field(() => [BlogContent])
  content: BlogContent[];

  @Field()
  createdAt?: string;

  @Field()
  updatedAt?: string;
}
