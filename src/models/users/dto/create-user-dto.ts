import { Schema as MongooseSchema } from 'mongoose';
import { Length, IsEmail, IsOptional, isEmpty, IsEmpty } from 'class-validator';
import { InputType, Field } from '@nestjs/graphql';
import { lengthMessage } from 'src/common/valid_message';

@InputType()
export class CreateUser {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Length(1, 25, { message: lengthMessage })
  firstName: string;

  @Field()
  @Length(1, 25, { message: lengthMessage })
  lastName: string;

  @IsEmpty()
  @Field()
  avatar: string;

  @Field()
  password: string;

  @Field()
  age: number;

  @Field()
  gender: number;

  @Field(() => [String])
  items: string[] | MongooseSchema.Types.ObjectId[];
}
