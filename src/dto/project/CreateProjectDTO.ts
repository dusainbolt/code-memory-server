import { ProjectStatus } from './ProjectEnum';
import { InputType, Field, Int } from '@nestjs/graphql';
import { MinLength, MaxLength, isMongoId, IS_MONGO_ID, IsMongoId } from 'class-validator';
import { isValidObjectId } from 'mongoose';

@InputType()
export class CreateProjectInput {
  @Field()
  name: string;

  @Field()
  nameEN: string;

  @Field()
  descriptionVN: string;

  @Field()
  descriptionEN: string;

  @Field(() => Int)
  size: number;

  // @IsMongoId({each: true})
  @Field(() => [String])
  techs: string[];

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
