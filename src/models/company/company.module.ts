import { COMPANY_NAME, CompanySchema } from './company.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyResolver } from './company.resolver';

@Module({
  imports: [MongooseModule.forFeature([{ name: COMPANY_NAME, schema: CompanySchema }])],
  providers: [CompanyService, CompanyResolver],
  exports: [CompanyResolver],

})
export class CompanyModule { }
