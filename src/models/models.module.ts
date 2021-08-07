import { UsersModule } from './users/user.module';
import { Module } from '@nestjs/common';
import { ModelResolver } from './models.resolver';
import { BlogModule } from 'src/models/blog/blog.module';
import { SeoHomeModule } from './seo-home/seo-home.module';
// import { TagModule } from './tag/tag.module';
import { TagModule } from './tag/tag.module';
// import { TagModule } from './tag/tag.module';

export const EVENT_INIT_DATA_BY_USER = 'EVENT_INIT_DATA_BY_USER';
@Module({
  imports: [UsersModule, SeoHomeModule, BlogModule, TagModule],
  providers: [ModelResolver],
})
export class ModelsModule {}
