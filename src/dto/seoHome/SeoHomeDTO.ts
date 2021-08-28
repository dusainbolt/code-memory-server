import { SeoHomeStatus } from './SeoHomeEnum';
// import { SeoContact, SeoMeta, SeoSocial } from './../seo-home.schema';
import { Field, ObjectType, ID, InputType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@InputType('SeoHomeHistoryInput')
export class SeoHomeHistory {
  @Field()
  type: string;
  @Field()
  newValue: string;
  @Field()
  oldValue: string;
}

@ObjectType()
export class SeoHome {
  @Field(() => ID)
  readonly id?: MongooseSchema.Types.ObjectId;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  domain: string;

  @Field()
  siteName: string;

  @Field()
  facebookAppId: string;

  @Field()
  languageAlternates: string;

  @Field()
  faviconUrlICO: string;

  @Field()
  faviconUrlJPG: string;

  @Field()
  searchBoxUrl: string;

  @Field()
  logo400x400: string;

  @Field()
  logo800x600: string;

  @Field()
  logo1280x1280: string;

  @Field()
  logoAlt: string;

  @Field(() => [SeoHomeHistory])
  history: SeoHomeHistory[]

  @Field(() => SeoHomeStatus)
  status: SeoHomeStatus;
}
