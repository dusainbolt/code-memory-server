import { SeoHomeDTO } from '../../dto/seoHome/SeoHomeDTO';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { SeoHome, SeoHomeDocument } from './seo-home.schema';
import { Model } from 'mongoose';

@Injectable()
export class SeoHomeService {
    constructor(@InjectModel(SeoHome.name) public seoHomeModel: Model<SeoHomeDocument>) { }
    async getSeoHome(): Promise<SeoHomeDTO> {
        return this.seoHomeModel.findOne({}, {}, { sort: { createdAt: -1 } });
    }
}
