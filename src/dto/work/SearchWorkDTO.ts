import { InputType, Field, Int, ObjectType } from '@nestjs/graphql';
import { WorkStatus, WorkType } from './WorkEnum';
import { Condition } from 'mongodb';
import { Work } from './WorkDTO';
import { FilterQuery } from 'mongoose';

@InputType()
export class SearchWorkInput {
  @Field({ defaultValue: null })
  key?: string;

  @Field(() => [WorkStatus])
  status?: WorkStatus[];

  @Field(() => [WorkType])
  type?: WorkType[];

  @Field(() => Int, { defaultValue: null })
  offset?: number;

  @Field(() => Int, { defaultValue: null })
  limit?: number;

  @Field(() => Int, { defaultValue: null })
  sortBy?: number;

  @Field({ defaultValue: '' })
  orderBy?: string;

  @Field({ defaultValue: true })
  count?: boolean;
}

export type QuerySearchWork = FilterQuery<{
  workType?: Condition<WorkType[]>;

  status?: Condition<WorkStatus[]>;

  createBy?: Condition<string>;
}>;
@ObjectType()
export class OutputSearchWork {
  @Field(() => [Work])
  dataWorks: Work[];

  @Field(() => Int)
  total?: number;
}
