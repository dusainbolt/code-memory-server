import { Field, InputType, Int } from '@nestjs/graphql';
import { TagStatus } from './TagEnum';

@InputType()
export class EntireTagInput {
  @Field(() => [TagStatus])
  status: TagStatus[];

  @Field(() => Int, { defaultValue: null })
  limit?: number;
}

@InputType()
export class FindTagBySlugInput {
  @Field()
  slug: string;
}
