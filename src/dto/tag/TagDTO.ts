import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

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

  @Field()
  createdAt?: string;

  @Field()
  updatedAt?: string;
}
