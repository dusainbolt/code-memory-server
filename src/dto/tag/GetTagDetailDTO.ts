import { Field, InputType } from '@nestjs/graphql';
import { TagStatus } from './TagEnum';

@InputType()
export class EntireTagInput {
  @Field(() => [TagStatus])
  status?: TagStatus[];
}

@InputType()
export class FindTagBySlugInput {
  @Field()
  slug: string;
}
