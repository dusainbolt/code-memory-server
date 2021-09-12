import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BlogDocument, BLOG_NAME } from './blog.schema';
import { Blog } from '../../dto/blog/BlogDTO';
import { CreateBlogInput } from '../../dto/blog/CreateBlogDTO';

@Injectable()
export class BlogService {
  constructor(@InjectModel(BLOG_NAME) public blogModel: Model<BlogDocument>) {}

  async create(createBlog: CreateBlogInput): Promise<Blog> {
    const slug = createBlog.title;
    const blog = new this.blogModel({ ...createBlog, slug });
    const blogData = await blog.save();
    // this.eventEmitter.emit(EVENT_ITEM.CREATE, data);
    return blogData;
  }
}
