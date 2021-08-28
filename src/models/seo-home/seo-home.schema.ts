import { SeoHomeStatus } from './../../dto/seoHome/SeoHomeEnum';
import { SeoHomeHistory } from '../../dto/seoHome/SeoHomeDTO';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
@Schema({ timestamps: true })
export class SeoHome {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  domain: string;

  @Prop()
  siteName: string;

  @Prop()
  facebookAppId: string;

  @Prop()
  languageAlternates: string;

  @Prop()
  faviconUrlICO: string;

  @Prop()
  faviconUrlJPG: string;

  @Prop()
  searchBoxUrl: string;

  @Prop()
  logo400x400: string;

  @Prop()
  logo800x600: string;

  @Prop()
  logo1280x1280: string;

  @Prop()
  logoAlt: string;

  @Prop({
    type: [{ type: { type: String }, data: { type: String }, language: { type: String } }],
    default: []
  }) history: SeoHomeHistory[]

  @Prop({ type: Number, enum: SeoHomeStatus, required: true })
  status: SeoHomeStatus;
}

export type SeoHomeDocument = SeoHome & Document;

export const SEO_HOME_NAME = 'SeoHome';

export const SeoHomeSchema = SchemaFactory.createForClass(SeoHome);
