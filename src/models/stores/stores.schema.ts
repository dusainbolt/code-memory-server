import { ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export class PackageTypeStore {
  packageId: MongooseSchema.Types.ObjectId;
  endTime: Date;
}

export class StoreContact {
  hotline: string | '';
  phone: string | '';
  address: string | '';
  branchAddress: string[] | [];
  openingHours: string | '';
  closeHours: string | '';
}

export class StoreSocial {
  facebookPage: string;
  tiktok: string;
  zalo: string;
  youtube: string;
  twitter: string;
  instagram: string;
}
@Schema({ timestamps: true })
@ObjectType()
export class Store {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  logo: string;

  @Prop()
  logoText: string;

  @Prop({ required: true })
  descriptionLogo: string;

  @Prop()
  storeContact: StoreContact;

  @Prop()
  storeSocial: StoreSocial;

  @Prop()
  owner: MongooseSchema.Types.ObjectId;

  @Prop()
  theme: MongooseSchema.Types.ObjectId;

  @Prop()
  package: PackageTypeStore;

  @Prop()
  status: string;

  @Prop()
  trial: boolean;
}

export type StoreDocument = Store & Document;

export const StoreSchema = SchemaFactory.createForClass(Store);
