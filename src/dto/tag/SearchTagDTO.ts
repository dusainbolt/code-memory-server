import { InputType, Field, Int } from '@nestjs/graphql';
import { TagStatus } from './TagEnum';

@InputType()
export class SearchTagInput {
  @Field()
  key?: string;

  @Field(type => [Int])
  status?: TagStatus[];

  @Field(type => Int)
  offset?: number;

  @Field(type => Int)
  limit?: number;
}
