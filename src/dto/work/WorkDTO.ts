import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from 'src/dto/user/UserDTO';
import { WorkStatus, WorkType } from './WorkEnum';
@ObjectType()
export class Work {
  @Field(() => ID)
  readonly id?: string;

  @Field({ nullable: true })
  nameVN: string;

  @Field({ nullable: true })
  nameEN: string;

  @Field({ nullable: true })
  thumbnail: string;

  @Field({ nullable: true })
  position: string;

  @Field({ nullable: true })
  descriptionVN: string;

  @Field({ nullable: true })
  descriptionEN: string;

  @Field({ nullable: true })
  startTime: string;

  @Field({ nullable: true })
  endTime: string;

  @Field(() => WorkStatus, { nullable: true })
  status: WorkStatus;

  @Field(() => WorkType, { nullable: true })
  workType: WorkType;

  @Field({ nullable: true })
  createdAt?: string;

  @Field({ nullable: true })
  updatedAt?: string;

  @Field({ nullable: true })
  createBy: string;

  @Field({ nullable: true })
  userCreate?: User;
}
