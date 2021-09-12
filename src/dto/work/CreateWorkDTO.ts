import { WorkStatus, WorkType } from 'src/dto/work/WorkEnum';
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateWorkInput {
  @Field()
  nameVN: string;

  @Field()
  nameEN: string;

  @Field()
  thumbnail: string;

  @Field()
  position: string;

  @Field()
  descriptionVN: string;

  @Field()
  descriptionEN: string;

  @Field()
  startTime: string;

  @Field()
  endTime: string;

  @Field(() => WorkType)
  workType: WorkType;

  @Field(() => WorkStatus)
  status: WorkStatus;

}

@InputType()
export class UpdateWorkInput {
  @Field(() => CreateWorkInput)
  data: CreateWorkInput;

  @Field()
  workId: string;
}
