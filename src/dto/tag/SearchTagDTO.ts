import { InputType, Field, Int, ObjectType } from '@nestjs/graphql';
import { TagStatus } from './TagEnum';
import { Condition } from 'mongodb';
import { Tag } from './TagDTO';

@InputType()
export class SearchTagInput {
  @Field()
  key?: string;

  @Field(() => [Int])
  status?: TagStatus[];

  @Field(() => Int)
  offset?: number;

  @Field(() => Int)
  limit?: number;
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
