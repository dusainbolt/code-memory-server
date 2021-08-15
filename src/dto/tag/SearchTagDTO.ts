import { InputType, Field, Int, ObjectType } from '@nestjs/graphql';
import { TagStatus } from './TagEnum';
import { Condition } from 'mongodb';
import { Tag } from './TagDTO';

@InputType()
export class SearchTagInput {
  @Field()
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
}
@ObjectType()
export class QuerySearchTag {
  title?: Condition<any>;

  status?: Condition<any>;
}

@ObjectType()
export class OutputSearchTag {
  @Field(() => [Tag])
  dataTags: Tag[];

  @Field(() => Int)
  total?: number;
}
