import { SeoHomeSocial } from './../../dto/seoHome/SeoHomeDTO';
import { SeoHomeStatus } from './../../dto/seoHome/SeoHomeEnum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SeoHomeHistory, SeoHomeImage } from 'src/dto/seoHome/SeoHomeDTO';
@Schema({ timestamps: true })
export class SeoHomeModel {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  domain: string;

  @Prop()
  siteName: string;

  @Prop()
  languageAlternates: string;

  @Prop()
  searchBoxUrl: string;

  @Prop({
    type: { facebookAppId: { type: String }, facebookPageUrl: { type: String }, youtubeUrl: { type: String }, twitterUrl: { type: String } },
    default: {}
  }) social: SeoHomeSocial;


  @Prop({
    type: { faviconUrlICO: { type: String }, faviconUrlJPG: { type: String }, logo400x400: { type: String }, logo800x600: { type: String }, logo1280x1280: { type: String }, logoAlt: { type: String } },
    default: {}
  }) image: SeoHomeImage;


  @Prop({
    type: [{ type: { type: String }, data: { type: String }, language: { type: String } }],
    default: []
  }) history: SeoHomeHistory[]

  @Prop({ type: Number, enum: SeoHomeStatus, required: true })
  status: SeoHomeStatus;
}

export type SeoHomeDocument = SeoHomeModel & Document;

export const SEO_HOME_NAME = 'SeoHome';

export const SeoHomeSchema = SchemaFactory.createForClass(SeoHomeModel);
