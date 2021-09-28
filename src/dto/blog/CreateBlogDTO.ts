import { InputType, Field } from '@nestjs/graphql';
import { Length } from 'class-validator';
import { lengthMessage } from 'src/common/valid_message';
import { BlogContent } from './BlogDTO';
@InputType()
export class CreateBlogInput {
  @Length(10, 256, { message: lengthMessage })
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  thumbnail: string;

  @Field(() => [BlogContent])
  contents: BlogContent[];

  @Field(() => [String])
  tags: string[];
}
@InputType()
export class UpdateBlogInput {
  @Field(() => CreateBlogInput)
  data: CreateBlogInput;

  @Field()
  blogId: string;
}
