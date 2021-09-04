import { getParamsList, removeEmpty } from '../../common/functions';
import { SearchWorkInput, OutputSearchWork, QuerySearchWork } from '../../dto/work/SearchWorkDTO';
import { WorkDocument, WORK_NAME } from './work.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Work } from 'src/dto/work/WorkDTO';
import { User } from '../users/dto/user-dto';
import { CreateWorkInput, UpdateWorkInput } from 'src/dto/work/CreateWorkDTO';

@Injectable()
export class WorkService {
  constructor(@InjectModel(WORK_NAME) public workModel: Model<WorkDocument>) { }

  async create(createWorkInput: CreateWorkInput, user: User): Promise<Work> {
    // Create work
    const work = new this.workModel({ ...createWorkInput, createBy: user.id });
    const workData = await work.save();
    // Return result
    return workData;
  }

  async update(updateWorkInput: UpdateWorkInput): Promise<Work> {
    const workData = updateWorkInput.data;
    // update work
    const workDataUpdate = await this.workModel.findByIdAndUpdate(updateWorkInput.workId, workData);
    // Return result
    return workDataUpdate;
  }

  async list(searchWorkInput: SearchWorkInput): Promise<OutputSearchWork> {
    const query: QuerySearchWork = {};
    const queryList = getParamsList(searchWorkInput);
    // Handle condition with key
    if (!!searchWorkInput.key) {
      const regExpKey = new RegExp(searchWorkInput.key.trim(), 'i');
      query.$or = [{ nameEN: { $regex: regExpKey } }, { nameVN: { $regex: regExpKey } }];
    }
    // Handle condition with status
    if (!!searchWorkInput.status?.length) {
      query.status = { $in: searchWorkInput.status };
    }
    // Handle condition with type
    if (!!searchWorkInput.type?.length) {
      query.workType = { $in: searchWorkInput.type };
    }
    // Query data
    const dataWorks = await this.workModel
      .find(query as any)
      .skip(queryList.offset)
      .limit(queryList.limit)
      .sort({ [queryList.orderBy]: queryList.sortBy });
    // Query total
    const total = await this.workModel.countDocuments(query as any);
    // Return result
    return { dataWorks, total };
  }
}