import { WorkStatus, WorkType } from './../../dto/work/WorkEnum';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { USER_NAME } from '../users/user.schema';

@Schema({ timestamps: true })
export class WorkModel {
  @Prop({ required: true })
  nameVN: string;

  @Prop({ required: true })
  nameEN: string;

  @Prop()
  thumbnail: string;

  @Prop()
  position: string;

  @Prop()
  descriptionVN: string;

  @Prop()
  descriptionEN: string;

  @Prop({ type: Date })
  startTime: string;

  @Prop({ type: Date })
  endTime: string;

  @Prop({ type: Number, enum: WorkStatus, required: true })
  status: number;

  @Prop({ type: Number, enum: WorkType, required: true })
  workType: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: USER_NAME, required: true })
  createBy: string;
}

export type WorkDocument = WorkModel & Document;

export const WORK_NAME = 'Work';

export const WorkSchema = SchemaFactory.createForClass(WorkModel);
