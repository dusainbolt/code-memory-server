import { CompanyStatus, CompanyType } from 'src/dto/company/CompanyEnum';
import { InputType, Field } from '@nestjs/graphql';
import { Length } from 'class-validator';
import { lengthMessage } from 'src/common/valid_message';

@InputType()
export class CreateCompanyInput {
  // @Length(3, 256, { message: lengthMessage })
  @Field({ defaultValue: null })
  nameVN: string;

  // @Length(3, 256, { message: lengthMessage })
  @Field({ defaultValue: null })
  nameEN: string;

  @Field()
  thumbnail: string;

  @Field(() => CompanyStatus)
  status: CompanyStatus;

  @Field(() => CompanyType)
  companyType: CompanyStatus;
}

@InputType()
export class UpdateCompanyInput {
  @Field(() => CreateCompanyInput)
  data: CreateCompanyInput;

  @Field()
  companyId: string;
}
