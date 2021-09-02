import { MSG_SYSTEM } from 'src/common/valid_message';
import { GraphQLError } from 'graphql';
import { convertMongoObject } from './../../common/functions';
import { CreateSeoHomeInput } from './../../dto/seoHome/CreateSeoHomeDTO';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { SeoHomeDocument, SEO_HOME_NAME } from './seo-home.schema';
import { Model } from 'mongoose';
import { SeoHome } from 'src/dto/seoHome/SeoHomeDTO';
import { User } from '../users/dto/user-dto';
import { getDiffObject } from 'src/common/functions';

@Injectable()
export class SeoHomeService {
    constructor(@InjectModel(SEO_HOME_NAME) public seoHomeModel: Model<SeoHomeDocument>) { }
    async getSeoHome(): Promise<SeoHome> {
        return this.seoHomeModel.findOne({}, {}, { sort: { createdAt: -1 } });
    }

    async create(createSeoHomeInput: CreateSeoHomeInput, user: User): Promise<SeoHome> {
        const seoHomeLast = convertMongoObject((await this.getSeoHome()))
        // Get diff field to history
        const history = getDiffObject(seoHomeLast, createSeoHomeInput);
        if (!history.length) {
            throw new GraphQLError(MSG_SYSTEM.UPDATE_NOT_DIFF);
        }
        // Create Tag
        const seoHome = new this.seoHomeModel({ ...createSeoHomeInput, createBy: user.id, history });
        const seoHomeData = await seoHome.save();
        // Return result
        return seoHomeData;
    }
}
