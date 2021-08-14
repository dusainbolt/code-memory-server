import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/models/users/dto/user-dto';
import { TagStatus, TagType } from './TagEnum';

@ObjectType()
export class Tag {
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

  @Field(() => TagStatus)
  status: TagStatus;

  @Field(() => TagType)
  tagType: TagType;

  @Field()
  createdAt?: string;

  @Field()
  updatedAt?: string;

  @Field()
  userCreate?: User;
}
