import { Field, ObjectType, ID, InputType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/models/users/dto/user-dto';
import { SeoHomeStatus } from './SeoHomeEnum';

@ObjectType()
@InputType('SeoHomeHistoryInput')
export class SeoHomeHistory {
  @Field({ nullable: true })
  type: string;

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
  logo1280x1280: string;

  @Field({ nullable: true })
  logoAlt: string;
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
  domain: string;

  @Field({ nullable: true })
  siteName: string;

  @Field({ nullable: true })
  languageAlternates: string;

  @Field({ nullable: true })
  searchBoxUrl: string;

  @Field({ nullable: true })
  facebookChatPlugin: string;

  @Field(() => SeoHomeSocial)
  social: SeoHomeSocial;

  @Field(() => SeoHomeImage)
  image: SeoHomeImage;

  @Field(() => [SeoHomeHistory])
  history: SeoHomeHistory[]

  @Field(() => SeoHomeStatus)
  status: SeoHomeStatus;

  @Field()
  createBy: string;

  @Field({ nullable: true })
  userCreate?: User;
}
