import { UsersModule } from './users/user.module';
import { Module } from '@nestjs/common';
import { ModelResolver } from './models.resolver';
import { BlogModule } from 'src/models/blog/blog.module';
import { SeoHomeModule } from './seo-home/seo-home.module';
import { CompanyModule } from './company/company.module';
import { TagModule } from './tag/tag.module';
import { HashService } from 'src/hash/hash.service';

export const EVENT_INIT_DATA_BY_USER = 'EVENT_INIT_DATA_BY_USER';
@Module({
  imports: [UsersModule, SeoHomeModule, BlogModule, TagModule, CompanyModule],
  providers: [ModelResolver, HashService],
})
export class ModelsModule { }
