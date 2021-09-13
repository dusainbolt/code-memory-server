import { Field, ObjectType, ID, InputType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/dto/user/UserDTO';
@ObjectType()
@InputType('HistoryFieldInput')
export class HistoryField {
  @Field({ nullable: true })
  key: string;

  @Field({ nullable: true })
  newValue: string;

  @Field({ nullable: true })
  oldValue: string;
}

@ObjectType()
@InputType('SeoHomeImageInput')
export class SeoHomeImage {
  @Field({ nullable: true })
  faviconUrlICO: string;

  @Field({ nullable: true })
  faviconUrlJPG: string;

  @Field({ nullable: true })
  logo400x400: string;

  @Field({ nullable: true })
  logo800x600: string;

  @Field({ nullable: true })
  logo1280x720: string;

  @Field({ nullable: true })
  logoAlt: string;

  @Field({ nullable: true })
  logoAltEN: string;
}

@ObjectType()
@InputType('SeoHomeSocialInput')
export class SeoHomeSocial {
  @Field({ nullable: true })
  facebookAppId?: string;

  @Field({ nullable: true })
  facebookPageUrl?: string;

  @Field({ nullable: true })
  youtubeUrl?: string;

  @Field({ nullable: true })
  twitterUrl?: string;
}

@ObjectType()
export class SeoHome {
  @Field(() => ID)
  readonly id?: MongooseSchema.Types.ObjectId;

  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  titleEN: string;

  @Field({ nullable: true })
  descriptionEN: string;

  @Field({ nullable: true })
  domain: string;

  @Field({ nullable: true })
  siteName: string;

  @Field({ nullable: true })
  searchBoxUrl: string;

  @Field({ nullable: true })
  facebookChatPlugin: string;

  @Field(() => SeoHomeSocial)
  social: SeoHomeSocial;

  @Field(() => SeoHomeImage)
  image: SeoHomeImage;

  @Field(() => [HistoryField])
  history: HistoryField[];

  @Field({ nullable: true })
  reason: string;

  @Field()
  createBy: string;

  @Field()
  createdAt?: string;

  @Field({ nullable: true })
  userCreate?: User;
}
