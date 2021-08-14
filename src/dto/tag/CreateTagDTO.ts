import { InputType, Field, Int } from '@nestjs/graphql';
import { Length } from 'class-validator';
import { lengthMessage } from 'src/common/valid_message';
import { TagStatus, TagType } from './TagEnum';

@InputType()
export class CreateTagInput {
  @Length(10, 256, { message: lengthMessage })
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  thumbnail: string;

  @Field(() => TagType, { defaultValue: TagType.ADDITION })
  tagType: TagType;

  @Field(() => TagStatus) // it's very important
  status: TagStatus;
}
