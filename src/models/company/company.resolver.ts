import { SearchCompanyInput, OutputSearchCompany } from './../../dto/company/SearchCompanyDTO';
import { USER_KEY, Roles } from './../../auth/roles.guard';
import { CompanyService } from './company.service';
import { Resolver, Mutation, Args, Context, ResolveField, Parent, Query } from '@nestjs/graphql';
import { Company } from 'src/dto/company/CompanyDTO';
import { User } from '../users/dto/user-dto';
import { Role } from '../users/dto/user-enum';
import { CreateCompanyInput, UpdateCompanyInput } from 'src/dto/company/CreateCompanyDTO';
import { CompanyDocument } from './company.schema';
import { USER_NAME } from '../users/user.schema';

@Resolver(() => Company)
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) { }

  @Roles([Role.ADMIN])
  @Mutation(() => Company)
  async companyCreate(@Args('input') input: CreateCompanyInput, @Context(USER_KEY) user: User): Promise<Company> {
    return this.companyService.create(input, user);
  }

  @Roles([Role.ADMIN])
  @Mutation(() => Company)
  async companyUpdate(@Args('input') input: UpdateCompanyInput): Promise<Company> {
    return this.companyService.update(input);
  }

  @Query(() => OutputSearchCompany)
  async companyList(@Args('input') input: SearchCompanyInput): Promise<OutputSearchCompany> {
    return this.companyService.list(input);
  }

  @ResolveField()
  async userCreate(@Parent() companyResolve: CompanyDocument) {
    await companyResolve.populate({ path: 'createBy', model: USER_NAME }).execPopulate();
    return companyResolve.createBy;
  }
}
