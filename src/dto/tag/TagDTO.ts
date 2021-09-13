import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/dto/user/UserDTO';
import { TagStatus, TagType } from './TagEnum';

@ObjectType()
export class Tag {
  @Field(() => ID)
  readonly id?: string;

  @Field()
  title: string;

  @Field()
  slug: string;

  @Field()
  createBy: string;

  @Field()
  thumbnail: string;

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
