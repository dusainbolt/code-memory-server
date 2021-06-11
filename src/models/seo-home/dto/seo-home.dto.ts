// import { SeoContact, SeoMeta, SeoSocial } from './../seo-home.schema';
import { Field, ObjectType, ID, InputType } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';

@ObjectType('SeoContact')
@InputType('SeoContactInput')
export class SeoContact {
    @Field()
    address: string;
    @Field()
    email: string;
    @Field()
    phone: string;
}

@ObjectType('SeoMeta')
@InputType('SeoMetaInput')
export class SeoMeta {
    @Field()
    title: string;
    @Field()
    description: string;
    @Field()
    imageUrl: string;
    @Field()
    domain: string;
    @Field()
    jsonType: string;
    @Field()
    logoUrl: string;
    @Field()
    logoWidth: number;
    @Field()
    logoHeight: number;
    @Field()
    facebookPageId: string;
}

@ObjectType('SeoSocial')
@InputType('SeoSocialInput')
export class SeoSocial {
    @Field()
    youtube: string;
    @Field()
    facebook: string;
    @Field()
    facebookPage: string;
    @Field()
    skype: string;
    @Field()
    twitter: string;
}

@ObjectType('SeoHomeDTO')
export class SeoHomeDTO {
    @Field(() => ID)
    readonly id?: MongooseSchema.Types.ObjectId;

    @Field(() => String)
    owner: MongooseSchema.Types.ObjectId;

    @Field()
    appName: string;

    @Field()
    keyWord: string;

    @Field()
    author: string;

    @Field()
    publisher: string;

    @Field()
    contact: SeoContact;

    @Field()
    social: SeoSocial;

    @Field()
    meta: SeoMeta;
}

@InputType('SeoHomeInitDTO')
export class SeoHomeInitDTO {
    @Field()
    owner: MongooseSchema.Types.ObjectId;

    @Field()
    appName: string;

    @Field()
    keyWord: string;

    @Field()
    author: string;

    @Field()
    publisher: string;

    @Field()
    contact: SeoContact;

    @Field()
    social: SeoSocial;

    @Field()
    meta: SeoMeta;
}
