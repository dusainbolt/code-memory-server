import { CreateSeoHomeInput } from './../../dto/seoHome/CreateSeoHomeDTO';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { SeoHomeDocument, SEO_HOME_NAME } from './seo-home.schema';
import { Model } from 'mongoose';
import { SeoHome } from 'src/dto/seoHome/SeoHomeDTO';
import { User } from '../users/dto/user-dto';

@Injectable()
export class SeoHomeService {
    constructor(@InjectModel(SEO_HOME_NAME) public seoHomeModel: Model<SeoHomeDocument>) { }
    async getSeoHome(): Promise<SeoHome> {
        return this.seoHomeModel.findOne({}, {}, { sort: { createdAt: -1 } });
    }

    async create(createSeoHomeInput: CreateSeoHomeInput, user: User): Promise<SeoHome> {
        // Create Tag
        const seoHome = new this.seoHomeModel({ ...createSeoHomeInput, createBy: user.id });
        const seoHomeData = await seoHome.save();
        // Return result
        return seoHomeData;
    }
}
