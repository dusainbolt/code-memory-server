import { lengthMessage } from '../../common/valid_message';
import { IsEmail, Length } from 'class-validator';
import { Field, ObjectType, ID, InputType } from '@nestjs/graphql';
import { Gender, Role, UserStatus } from './UserEnum';
import { UserSkill } from './SkillUserDTO';

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

  @Field(() => [UserSkill])
  skills: UserSkill[];

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

@InputType()
export class FindUserInput {
  @Field()
  credential: string;
}

export class UserHashToken {
  id: string;

  firstName: string;

  lastName: string;

  email: string;

  roles: Role[];
}
