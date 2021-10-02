import { EVENT } from './../../common/contant';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { OutputSearchProject, SearchProjectInput, QuerySearchProject } from './../../dto/project/SearchProjectDTO';
import { Project } from './../../dto/project/ProjectDTO';
import { CreateProjectInput, UpdateProjectInput } from './../../dto/project/CreateProjectDTO';
import { PROJECT_NAME, ProjectDocument } from './project.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../dto/user/UserDTO';
import { Model } from 'mongoose';
import { helperService } from 'src/common/HelperService';

@Injectable()
export class ProjectService {
  constructor(@InjectModel(PROJECT_NAME) public projectModel: Model<ProjectDocument>, private eventEmitter: EventEmitter2) {}

  async create(createProjectInput: CreateProjectInput, user: User): Promise<Project> {
    // Create project
    const project = new this.projectModel({ ...createProjectInput, createBy: user.id });
    const projectData = await project.save();
    // Send event change user Skill
    this.eventEmitter.emit(EVENT.CHANGE_USER_SKILL, { user, skillData: createProjectInput.techs });
    // Return result
    return projectData;
  }

  async update(updateProjectInput: UpdateProjectInput, user: User): Promise<Project> {
    const { data, projectId } = updateProjectInput;
    // update project
    const projectDataUpdate = await this.projectModel.findByIdAndUpdate(projectId, data);
    // Send event change user Skill
    this.eventEmitter.emit(EVENT.CHANGE_USER_SKILL, { user, skillData: data.techs });
    // Return result
    return projectDataUpdate;
  }

  async list(searchProject: SearchProjectInput, userId: string = ''): Promise<OutputSearchProject> {
    const query: QuerySearchProject = {};
    const queryList = helperService.getParamsList(searchProject);
    // Handle condition with key
    if (!!searchProject.key) {
      const regExpKey = new RegExp(searchProject.key.trim(), 'i');
      query.$or = [{ nameEN: { $regex: regExpKey } }, { nameVN: { $regex: regExpKey } }];
    }
    // Handle condition with status
    if (!!searchProject.status?.length) {
      query.status = { $in: searchProject.status };
    }

    if (!!userId) {
      query.createBy = { $in: [userId] };
    }
    // Query data
    const dataProjects = await this.projectModel
      .find(query as any)
      .skip(queryList.offset)
      .limit(queryList.limit)
      .sort({ [queryList.orderBy]: queryList.sortBy });
    // Query total
    const total = await this.projectModel.countDocuments(query as any);
    // Return result
    return { dataProjects, total };
  }
}
