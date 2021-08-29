import { InputType, Field, Int, ObjectType } from '@nestjs/graphql';
import { CompanyStatus, CompanyType } from './CompanyEnum';
import { Condition } from 'mongodb';
import { Company } from './CompanyDTO';

@InputType()
export class SearchCompanyInput {
  @Field({ defaultValue: null })
  key?: string;

  @Field(() => [CompanyStatus])
  status?: CompanyStatus[];

  @Field(() => [CompanyType])
  type?: CompanyType[];

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
export class QuerySearchCompany {
  $or?: any;
  // nameEN?: Condition<any>;

  companyType?: Condition<any>;

  status?: Condition<any>;
}

@ObjectType()
export class OutputSearchCompany {
  @Field(() => [Company])
  dataCompanies: Company[];

  @Field(() => Int)
  total?: number;
}
