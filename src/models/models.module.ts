import { UsersModule } from './users/user.module';
import { Module } from '@nestjs/common';
import { ModelResolver } from './models.resolver';
import { BlogModule } from 'src/models/blog/blog.module';
import { SeoHomeModule } from './seo-home/seo-home.module';
import { WorkModule } from './work/work.module';
import { TagModule } from './tag/tag.module';
import { HashService } from 'src/hash/hash.service';
import { ProjectModule } from './project/project.module';

export const EVENT_INIT_DATA_BY_USER = 'EVENT_INIT_DATA_BY_USER';
@Module({
  imports: [UsersModule, SeoHomeModule, BlogModule, TagModule, WorkModule, ProjectModule],
  providers: [ModelResolver, HashService],
})
export class ModelsModule { }
