import { ProjectStatus } from './ProjectEnum';
import { InputType, Field, Int } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
@InputType()
export class CreateProjectInput {
  @Field()
  name: string;

  @Field()
  nameEN: string;

  @Field()
  description: string;

  @Field()
  descriptionEN: string;

  @Field(() => Int)
  size: number;

  @IsMongoId({ each: true })
  @Field(() => [String])
  techs: string[];

  @IsMongoId({ each: true })
  @Field(() => String)
  workId: string;

  @Field()
  startTime: string;

  @Field()
  endTime: string;

  @Field(() => ProjectStatus)
  status: ProjectStatus;
}

@InputType()
export class UpdateProjectInput {
  @Field(() => CreateProjectInput)
  data: CreateProjectInput;

  @Field()
  projectId: string;
}
