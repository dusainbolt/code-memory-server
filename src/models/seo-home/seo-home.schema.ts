import { SeoHomeSocial } from './../../dto/seoHome/SeoHomeDTO';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { HistoryField, SeoHomeImage } from 'src/dto/seoHome/SeoHomeDTO';
import { USER_NAME } from '../users/user.schema';
@Schema({ timestamps: { updatedAt: false } })
export class SeoHomeModel {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  titleEN: string;

  @Prop()
  descriptionEN: string;

  @Prop()
  domain: string;

  @Prop()
  siteName: string;

  @Prop()
  searchBoxUrl: string;

  @Prop()
  facebookChatPlugin: string;

  @Prop()
  reason: string;

  @Prop({
    type: { facebookAppId: { type: String }, facebookPageUrl: { type: String }, youtubeUrl: { type: String }, twitterUrl: { type: String } },
    default: {}
  }) social: SeoHomeSocial;


  @Prop({
    type: { faviconUrlICO: { type: String }, faviconUrlJPG: { type: String }, logo400x400: { type: String }, logo800x600: { type: String }, logo1280x720: { type: String }, logoAlt: { type: String }, logoAltEN: { type: String } },
    default: {}
  }) image: SeoHomeImage;


  @Prop({
    type: [{ key: { type: String }, newValue: { type: String }, oldValue: { type: String } }],
    default: []
  }) history: HistoryField[]

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: USER_NAME, required: true })
  createBy: string;
}

export type SeoHomeDocument = SeoHomeModel & Document;

export const SEO_HOME_NAME = 'SeoHome';

export const SeoHomeSchema = SchemaFactory.createForClass(SeoHomeModel);
