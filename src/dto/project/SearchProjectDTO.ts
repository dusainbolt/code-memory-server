import { ProjectStatus } from './ProjectEnum';
import { Project } from './ProjectDTO';
import { InputType, Field, Int, ObjectType } from '@nestjs/graphql';
import { Condition } from 'mongodb';
import { FilterQuery } from 'mongoose';

@InputType()
export class SearchProjectInput {
  @Field({ defaultValue: null })
  key?: string;

  @Field(() => [ProjectStatus])
  status?: ProjectStatus[];

  @Field(() => Int, { defaultValue: null })
  offset?: number;

  @Field(() => Int, { defaultValue: null })
  limit?: number;

  @Field(() => Int, { defaultValue: null })
  sortBy?: number;

  @Field({ defaultValue: '' })
  orderBy?: string;
}


export type QuerySearchProject = FilterQuery<{
  status?: Condition<ProjectStatus[]>;
  createBy?: Condition<string>;
}>

@ObjectType()
export class OutputSearchProject {
  @Field(() => [Project])
  dataProjects: Project[];

  @Field(() => Int)
  total?: number;
}
