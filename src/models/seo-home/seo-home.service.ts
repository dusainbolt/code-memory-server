import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { SeoHomeDocument, SEO_HOME_NAME } from './seo-home.schema';
import { Model } from 'mongoose';
import { SeoHome } from 'src/dto/seoHome/SeoHomeDTO';

@Injectable()
export class SeoHomeService {
    constructor(@InjectModel(SEO_HOME_NAME) public seoHomeModel: Model<SeoHomeDocument>) { }
    async getSeoHome(): Promise<SeoHome> {
        return this.seoHomeModel.findOne({}, {}, { sort: { createdAt: -1 } });
    }
}
