import { InputType, Field, Int, ObjectType } from '@nestjs/graphql';
import { TagStatus } from './TagEnum';
import { Condition } from 'mongodb';
import { Tag } from './TagDTO';
import { FilterQuery } from 'mongoose';

@InputType()
export class SearchTagInput {
  @Field({ defaultValue: null })
  key?: string;

  @Field(() => [TagStatus])
  status?: TagStatus[];

  @Field(() => Int, { defaultValue: null })
  offset?: number;

  @Field(() => Int, { defaultValue: null })
  limit?: number;

  @Field(() => Int, { defaultValue: null })
  sortBy?: number;

  @Field({ defaultValue: '' })
  orderBy?: string;

  @Field({ defaultValue: true })
  count?: boolean;
}

export type QuerySearchTag = FilterQuery<{
  title?: Condition<string>;

  status?: Condition<TagStatus[]>;
}>;

@ObjectType()
export class OutputSearchTag {
  @Field(() => [Tag])
  dataTags: Tag[];

  @Field(() => Int)
  total?: number;
}
