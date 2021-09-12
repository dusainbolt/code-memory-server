import { OutputSearchProject, SearchProjectInput, QuerySearchProject } from './../../dto/project/SearchProjectDTO';
import { Project } from './../../dto/project/ProjectDTO';
import { CreateProjectInput, UpdateProjectInput } from './../../dto/project/CreateProjectDTO';
import { removeEmpty, getParamsList } from './../../common/functions';
import { PROJECT_NAME, ProjectDocument } from './project.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../users/dto/user-dto';
import { Model } from 'mongoose';

@Injectable()
export class ProjectService {
  constructor(@InjectModel(PROJECT_NAME) public projectModel: Model<ProjectDocument>) { }

  async create(createProjectInput: CreateProjectInput, user: User): Promise<Project> {
    // Create project
    const project = new this.projectModel({ ...createProjectInput, createBy: user.id });
    const projectData = await project.save();
    // Return result
    return projectData;
  }

  async update(updateProjectInput: UpdateProjectInput): Promise<Project> {
    const projectData = updateProjectInput.data;
    // update project
    const projectDataUpdate = await this.projectModel.findByIdAndUpdate(updateProjectInput.projectId, projectData);
    // Return result
    return projectDataUpdate;
  }

  async list(searchProject: SearchProjectInput, userId: string = ""): Promise<OutputSearchProject> {
    const query: QuerySearchProject = {};
    const queryList = getParamsList(searchProject);
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
      query.createBy = { $in: [userId] }
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
