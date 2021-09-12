import { PROJECT_NAME, ProjectSchema } from './project.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectResolver } from './project.resolver';

@Module({
  imports: [MongooseModule.forFeature([{ name: PROJECT_NAME, schema: ProjectSchema }])],
  providers: [ProjectService, ProjectResolver]
})
export class ProjectModule { }
