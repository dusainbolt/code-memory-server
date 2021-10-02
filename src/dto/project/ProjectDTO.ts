import { Tag } from './../tag/TagDTO';
import { ProjectStatus } from './ProjectEnum';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/dto/user/UserDTO';
import { Work } from '../work/WorkDTO';

@ObjectType()
export class Project {
  @Field(() => ID)
  readonly id?: string;

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

  @Field(() => [Tag])
  techsData?: Tag[];

  @Field({ nullable: true })
  startTime: string;

  @Field({ nullable: true })
  endTime: string;

  @Field(() => ProjectStatus, { nullable: true })
  status: ProjectStatus;

  @Field({ nullable: true })
  workId: string;

  @Field({ nullable: true })
  work?: Work;

  @Field({ nullable: true })
  createdAt?: string;

  @Field({ nullable: true })
  updatedAt?: string;

  @Field({ nullable: true })
  createBy: string;

  @Field({ nullable: true })
  userCreate?: User;
}
