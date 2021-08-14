import { lengthMessage } from './../../../common/valid_message';
import { IsEmail, Length, MaxLength } from 'class-validator';
import { Field, ObjectType, ID, InputType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Gender, Role, UserStatus } from './user-enum';

@ObjectType()
export class User {
  @Field(() => ID)
  id?: MongooseSchema.Types.ObjectId;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  firstName: string;

  @Field()
  password: string;

  @Field()
  lastName: string;

  @Field()
  avatar: string;

  @Field()
  phone: string;

  @Field()
  facebook: string;

  @Field(() => Gender)
  gender: Gender;

  @Field(() => [Role])
  roles: Role[];

  @Field(() => UserStatus)
  status: UserStatus;

  @Field()
  createdAt?: string;

  @Field()
  updatedAt?: string;
}

@InputType()
export class InitUser {
  @IsEmail()
  email: string;

  @Field()
  username: string;

  @Length(1, 25, { message: lengthMessage })
  firstName: string;

  @Length(1, 25, { message: lengthMessage })
  lastName: string;

  @Field()
  avatar: string;

  @Field()
  password: string;

  @Field()
  phone: string;

  @Field()
  facebook: string;

  @Field(() => Number)
  gender: Gender;

  @Field(() => [Number])
  roles: number[];
}
