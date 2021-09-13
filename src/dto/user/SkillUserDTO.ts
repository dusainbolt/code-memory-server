import { Tag } from 'src/dto/tag/TagDTO';
import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { UserSkillStatus } from './UserEnum';

@ObjectType()
@InputType('AddUserSkillInput')
export class UserSkill {
  @Field({ nullable: true })
  tagId: string;

  @Field({ nullable: true })
  percent: number;

  @Field(() => UserSkillStatus, { nullable: true })
  status: UserSkillStatus;
}

@InputType()
export class UpdateUserSkill {
  @Field(() => [UserSkill])
  data: UserSkill[];
}

@ObjectType()
export class UserSkillData {
  @Field(() => Tag, { nullable: true })
  tagData: Tag | string;

  @Field({ nullable: true })
  percent: number;

  @Field(() => UserSkillStatus, { nullable: true })
  status: UserSkillStatus;
}
