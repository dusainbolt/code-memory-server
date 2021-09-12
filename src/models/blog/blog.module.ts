import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogResolver } from './blog.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogSchema, BLOG_NAME } from './blog.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: BLOG_NAME, schema: BlogSchema }])],
  providers: [BlogService, BlogResolver],
})
export class BlogModule {}
