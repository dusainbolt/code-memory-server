import { InputType, Field } from '@nestjs/graphql';
import { Length } from 'class-validator';
import { lengthMessage } from 'src/common/valid_message';
import { BlogContent } from './blog-dto';

@InputType()
export class CreateBlogInput {
  @Length(10, 256, { message: lengthMessage })
  @Field()
  title: string;

  @Field()
  createBy: string;

  @Field()
  description: string;

  @Field(() => [BlogContent])
  content: BlogContent[];
}
