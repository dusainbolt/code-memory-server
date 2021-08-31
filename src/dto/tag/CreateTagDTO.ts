import { InputType, Field } from '@nestjs/graphql';
import { Length } from 'class-validator';
import { lengthMessage } from 'src/common/valid_message';
import { TagStatus } from './TagEnum';

@InputType()
export class CreateTagInput {
  @Length(3, 256, { message: lengthMessage })
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  thumbnail: string;

  @Field(() => TagStatus) // it's very important
  status: TagStatus;
}

@InputType()
export class UpdateTagInput {
  @Field(() => CreateTagInput)
  data: CreateTagInput;

  @Field()
  tagId: string;
}
