import { CachingModule } from './../caching/caching.module';
import { Module } from '@nestjs/common';
import { ItemTask } from './items.task';

@Module({
  imports: [CachingModule],
  providers: [ItemTask],
})
export class TasksModule {}
