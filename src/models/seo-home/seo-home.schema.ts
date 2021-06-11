import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export class SeoContact {
    address: string;
    email: string;
    phone: string;
}

export class SeoMeta {
    title: string;
    description: string;
    imageUrl: string;
    domain: string;
    jsonType: string;
    logoUrl: string;
    logoWidth: number;
    logoHeight: number;
    facebookPageId: string;
}

export class SeoSocial {
    youtube: string;
    facebook: string;
    facebookPage: string;
    skype: string;
    twitter: string;
}

@Schema({ timestamps: true })
export class SeoHome {
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
    social: SeoContact;

    @Prop()
    meta: SeoMeta;
}

export type SeoHomeDocument = SeoHome & Document;

export const SeoHomeSchema = SchemaFactory.createForClass(SeoHome);
