import { getParamsList, removeEmpty } from './../../common/functions';
import { SearchCompanyInput, OutputSearchCompany, QuerySearchCompany } from './../../dto/company/SearchCompanyDTO';
import { CompanyDocument, COMPANY_NAME } from './company.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from 'src/dto/company/CompanyDTO';
import { CreateCompanyInput, UpdateCompanyInput } from 'src/dto/company/CreateCompanyDTO';
import { User } from '../users/dto/user-dto';

@Injectable()
export class CompanyService {
  constructor(@InjectModel(COMPANY_NAME) public companyModel: Model<CompanyDocument>) { }

  async create(createCompanyInput: CreateCompanyInput, user: User): Promise<Company> {
    // Create company
    const company = new this.companyModel({ ...createCompanyInput, createBy: user.id });
    const companyData = await company.save();
    // Return result
    return companyData;
  }

  async update(updateCompanyInput: UpdateCompanyInput): Promise<Company> {
    const companyData = updateCompanyInput.data;
    // update company
    const companyDataUpdate = await this.companyModel.findByIdAndUpdate(updateCompanyInput.companyId, companyData);
    // Return result
    return companyDataUpdate;
  }

  async list(searchTagInput: SearchCompanyInput): Promise<OutputSearchCompany> {
    const query: QuerySearchCompany = { status: {}, companyType: {} };
    const queryList = getParamsList(searchTagInput);
    // Handle condition with key
    if (!!searchTagInput.key) {
      const regExpKey = new RegExp(searchTagInput.key.trim(), 'i');
      query.$or = [{ nameEN: { $regex: regExpKey } }, { nameVN: { $regex: regExpKey } }];
    }
    // Handle condition with status
    if (!!searchTagInput.status?.length) {
      query.status.$in = searchTagInput.status;
    }
    // Handle condition with type
    if (!!searchTagInput.type?.length) {
      query.companyType.$in = searchTagInput.type;
    }
    // Handle remove not condition filed
    const queryConvert = removeEmpty(query);
    // Query data
    const dataCompanies = await this.companyModel
      .find(queryConvert)
      .skip(queryList.offset)
      .limit(queryList.limit)
      .sort({ [queryList.orderBy]: queryList.sortBy });
    // Query total
    const total = await this.companyModel.countDocuments(queryConvert);
    // Return result
    return { dataCompanies, total };
  }
}