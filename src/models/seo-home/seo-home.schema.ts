import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { SeoContact, SeoMeta, SeoSocial } from './dto/seo-home.dto';
@Schema({ timestamps: true })
export class SeoHome {
  @Prop()
  owner: MongooseSchema.Types.ObjectId;

  @Prop()
  appName: string;

  @Prop()
  keyWord: string;

  @Prop()
  author: string;

  @Prop()
  publisher: string;

  @Prop()
  contact: SeoContact;

  @Prop()
  social: SeoSocial;

  @Prop()
  meta: SeoMeta;
}

export type SeoHomeDocument = SeoHome & Document;

export const SeoHomeSchema = SchemaFactory.createForClass(SeoHome);
