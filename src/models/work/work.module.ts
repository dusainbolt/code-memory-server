import { WORK_NAME, WorkSchema } from './work.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { WorkService } from './work.service';
import { WorkResolver } from './work.resolver';

@Module({
  imports: [MongooseModule.forFeature([{ name: WORK_NAME, schema: WorkSchema }])],
  providers: [WorkService, WorkResolver],
  exports: [WorkService],
})
export class WorkModule {}
