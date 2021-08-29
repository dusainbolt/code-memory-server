import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { BlogService } from './blog.service';
import { Blog } from '../../dto/blog/BlogDTO';
import { CreateBlogInput } from '../../dto/blog/CreateBlogDTO';

@Resolver(() => Blog)
export class BlogResolver {
  constructor(private readonly blogService: BlogService) { }

  @Mutation(() => Blog)
  async blogCreate(@Args('input') input: CreateBlogInput): Promise<Blog> {
    return this.blogService.create(input);
  }
}
