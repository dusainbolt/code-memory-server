import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/models/users/dto/user-dto';
import { CompanyStatus, CompanyType } from './CompanyEnum';

@ObjectType()
export class Company {
  @Field(() => ID)
  readonly id?: MongooseSchema.Types.ObjectId;

  @Field()
  nameVN: string;

  @Field()
  nameEN: string;

  @Field()
  createBy: string;

  @Field()
  thumbnail: string;

  @Field(() => CompanyStatus)
  status: CompanyStatus;

  @Field(() => CompanyType)
  companyType: CompanyType;

  @Field()
  createdAt?: string;

  @Field()
  updatedAt?: string;

  @Field()
  userCreate?: User;
}
