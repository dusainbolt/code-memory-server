import { HistoryField, SeoHomeImage, SeoHomeSocial } from './SeoHomeDTO';
import { InputType, Field } from '@nestjs/graphql';
import { SeoHomeStatus } from './SeoHomeEnum';

@InputType()
export class CreateSeoHomeInput {

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

  @Field(() => SeoHomeStatus)
  status: SeoHomeStatus;

}
