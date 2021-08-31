import { InputType, Field, Int, ObjectType } from '@nestjs/graphql';
import { WorkStatus, WorkType } from './WorkEnum';
import { Condition } from 'mongodb';
import { Work } from './WorkDTO';

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
}

@ObjectType()
export class QuerySearchWork {
  $or?: any;

  workType?: Condition<any>;

  status?: Condition<any>;
}

@ObjectType()
export class OutputSearchWork {
  @Field(() => [Work])
  dataWorks: Work[];

  @Field(() => Int)
  total?: number;
}
