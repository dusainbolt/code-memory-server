import { SeoHomeImage, SeoHomeSocial } from './SeoHomeDTO';
import { InputType, Field } from '@nestjs/graphql';
@InputType()
export class CreateSeoHomeInput {

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

  @Field({ nullable: true })
  reason: string;

  @Field(() => SeoHomeSocial)
  social: SeoHomeSocial;

  @Field(() => SeoHomeImage)
  image: SeoHomeImage;

}
