import { lengthMessage } from './../../../common/valid_message';
import { IsEmail, Length } from 'class-validator';
import { Field, ObjectType, ID, InputType } from '@nestjs/graphql';
import { Gender, Role, UserStatus, UserSkillStatus } from './user-enum';

@ObjectType()
@InputType('UserSkillsInput')
export class UserSkills {
  @Field({ nullable: true })
  skillId: string;

  @Field({ nullable: true })
  percent: number;

  @Field({ nullable: true })
  status: UserSkillStatus;
}

@ObjectType()
export class User {
  @Field(() => ID)
  id?: string;

  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  username: string;

  @Field({ nullable: true })
  firstName: string;

  @Field({ nullable: true })
  password: string;

  @Field({ nullable: true })
  lastName: string;

  @Field({ nullable: true })
  avatar: string;

  @Field({ nullable: true })
  phone: string;

  @Field({ nullable: true })
  facebook: string;

  @Field(() => [UserSkills])
  skills: UserSkills[];

  @Field(() => Gender)
  gender: Gender;

  @Field(() => [Role])
  roles: Role[];

  @Field(() => UserStatus)
  status: UserStatus;

  @Field({ nullable: true })
  createdAt?: string;

  @Field({ nullable: true })
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
  avatar?: string;

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
