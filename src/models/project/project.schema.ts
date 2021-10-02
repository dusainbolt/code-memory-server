import { ProjectStatus } from './../../dto/project/ProjectEnum';
import { TAG_NAME } from './../tag/tag.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { USER_NAME } from '../users/user.schema';
import { WORK_NAME } from '../work/work.schema';

@Schema({ timestamps: true })
export class ProjectModel {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  nameEN: string;

  @Prop()
  description: string;

  @Prop()
  descriptionEN: string;

  @Prop()
  size: number;

  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: TAG_NAME }])
  techs: string[];

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: WORK_NAME })
  workId: string;

  @Prop({ type: Date })
  startTime: string;

  @Prop({ type: Date })
  endTime: string;

  @Prop({ type: Number, enum: ProjectStatus, required: true })
  status: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: USER_NAME, required: true })
  createBy: string;
}

export type ProjectDocument = ProjectModel & Document;

export const PROJECT_NAME = 'Project';

export const ProjectSchema = SchemaFactory.createForClass(ProjectModel);
