import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { CompanyStatus, CompanyType } from 'src/dto/company/CompanyEnum';
import { USER_NAME } from '../users/user.schema';

@Schema({ timestamps: true })
export class CompanyModel {
  @Prop({ unique: true, required: true, default: null })
  nameVN: string;

  @Prop({ unique: true, required: true, default: null })
  nameEN: string;

  @Prop()
  thumbnail: string;

  @Prop({ type: Number, enum: CompanyStatus, required: true })
  status: number;

  @Prop({ type: Number, enum: CompanyType, required: true })
  companyType: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: USER_NAME, required: true })
  createBy: string;
}

export type CompanyDocument = CompanyModel & Document;

export const COMPANY_NAME = 'Company';

export const CompanySchema = SchemaFactory.createForClass(CompanyModel);
