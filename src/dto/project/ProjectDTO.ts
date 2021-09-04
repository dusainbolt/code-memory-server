import { ProjectStatus } from './ProjectEnum';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/models/users/dto/user-dto';

@ObjectType()
export class Project {
  @Field(() => ID)
  readonly id?: MongooseSchema.Types.ObjectId;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  nameEN: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  descriptionEN: string;

  @Field({ nullable: true })
  size: number;

  @Field(() => [String])
  techs: string[];

  @Field({ nullable: true })
  startTime: string;

  @Field({ nullable: true })
  endTime: string;

  @Field(() => ProjectStatus, { nullable: true })
  status: ProjectStatus;

  @Field({ nullable: true })
  createdAt?: string;

  @Field({ nullable: true })
  updatedAt?: string;

  @Field({ nullable: true })
  createBy: string;

  @Field({ nullable: true })
  userCreate?: User;
}
