import { QUERY_LIST } from './../../common/contant';
import { MSG_SYSTEM } from 'src/common/valid_message';
import { GraphQLError } from 'graphql';
import { CreateSeoHomeInput } from './../../dto/seoHome/CreateSeoHomeDTO';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { SeoHomeDocument, SEO_HOME_NAME } from './seo-home.schema';
import { Model } from 'mongoose';
import { SeoHome } from 'src/dto/seoHome/SeoHomeDTO';
import { User } from '../../dto/user/UserDTO';
import { helperService } from 'src/common/HelperService';

@Injectable()
export class SeoHomeService {
  constructor(@InjectModel(SEO_HOME_NAME) public seoHomeModel: Model<SeoHomeDocument>) {}
  async getSeoHome(): Promise<SeoHome> {
    return this.seoHomeModel.findOne({}, {}, { sort: { createdAt: -1 } });
  }

  async create(createSeoHomeInput: CreateSeoHomeInput, user: User): Promise<SeoHome> {
    const seoHomeLast = helperService.convertMongoObject(await this.getSeoHome());
    // Get diff field to history
    const history = helperService.getDiffObject(seoHomeLast, createSeoHomeInput);
    if (!history.length) {
      throw new GraphQLError(MSG_SYSTEM.UPDATE_NOT_DIFF);
    }
    // Create Tag
    const seoHome = new this.seoHomeModel({ ...createSeoHomeInput, createBy: user.id, history });
    const seoHomeData = await seoHome.save();
    // Return result
    return seoHomeData;
  }

  async entire(): Promise<SeoHome[]> {
    return this.seoHomeModel.find().sort({ createdAt: QUERY_LIST.DESC });
  }
}
