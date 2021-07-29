import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BlogService } from './blog.service';
import { Blog } from './dto/blog-dto';
import { CreateBlogInput } from './dto/create-blog-dto';

@Resolver(() => Blog)
export class BlogResolver {
  constructor(private readonly blogService: BlogService) {}

  @Mutation(() => Blog)
  async createBlog(@Args('input') input: CreateBlogInput): Promise<Blog> {
    // this.logger.debug(`createUser => input: ${JSON.stringify(input)}`);
    return this.blogService.create(input);
  }
}
