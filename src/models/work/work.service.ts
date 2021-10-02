import { SearchWorkInput, OutputSearchWork, QuerySearchWork } from '../../dto/work/SearchWorkDTO';
import { WorkDocument, WORK_NAME } from './work.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Work } from 'src/dto/work/WorkDTO';
import { User } from '../../dto/user/UserDTO';
import { CreateWorkInput, UpdateWorkInput } from 'src/dto/work/CreateWorkDTO';
import { helperService } from 'src/common/HelperService';
@Injectable()
export class WorkService {
  constructor(@InjectModel(WORK_NAME) public workModel: Model<WorkDocument>) {}

  async create(createWorkInput: CreateWorkInput, user: User): Promise<Work> {
    // Create work
    const work = new this.workModel({ ...createWorkInput, createBy: user.id });
    const workData = await work.save();
    // Return result
    return workData;
  }

  async update(updateWorkInput: UpdateWorkInput): Promise<Work> {
    const { data, workId } = updateWorkInput;
    // update work
    const workDataUpdate = await this.workModel.findByIdAndUpdate(workId, data);
    // Return result
    return workDataUpdate;
  }

  async findByIds(ids: string[]): Promise<Work[]> {
    return this.workModel.find({ _id: { $in: ids } });
  }

  async list(searchWorkInput: SearchWorkInput, userId: string = ''): Promise<OutputSearchWork> {
    const query: QuerySearchWork = {};
    const queryList = helperService.getParamsList(searchWorkInput);
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
    if (!!userId) {
      query.createBy = { $in: [userId] };
    }
    // Query data
    const dataWorks = await this.workModel
      .find(query as any)
      .skip(queryList.offset)
      .limit(queryList.limit)
      .sort({ [queryList.orderBy]: queryList.sortBy });
    // Query total
    const total = searchWorkInput.count ? await this.workModel.countDocuments(query as any) : 0;
    // Return result
    return { dataWorks, total };
  }
}
