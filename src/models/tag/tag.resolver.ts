import { Args, Context, Mutation, Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Roles, ROLE_PUBLIC, USER_KEY } from 'src/auth/roles.guard';
import { CreateTagInput } from 'src/dto/tag/CreateTagDTO';
import { OutputSearchTag, SearchTagInput } from 'src/dto/tag/SearchTagDTO';
import { Tag } from 'src/dto/tag/TagDTO';
import { Role } from '../users/dto/user-enum';
import { UserHashToken } from '../users/dto/user-hash-token';
import { USER_NAME } from '../users/user.schema';
import { TagDocument } from './tag.schema';
import { TagService } from './tag.service';

@Resolver(() => Tag)
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  @Roles([Role.USER, Role.ADMIN])
  @Mutation(() => Tag)
  async createTag(@Args('input') input: CreateTagInput, @Context(USER_KEY) user: UserHashToken): Promise<Tag> {
    return this.tagService.create(input, user);
  }

  // @Roles([Role.USER, Role.ADMIN])
  // @Mutation(() => Tag)
  // async updateTag(@Args('input') input: CreateTagInput, @Context(USER_KEY) user: UserHashToken): Promise<Tag> {
  //   return this.tagService.create(input, user);
  // }

  @Roles([ROLE_PUBLIC])
  @Query(() => OutputSearchTag)
  async listTags(@Args('input') input: SearchTagInput): Promise<OutputSearchTag> {
    return this.tagService.list(input);
  }

  @ResolveField()
  async userCreate(@Parent() tagResolve: TagDocument) {
    await tagResolve.populate({ path: 'createBy', model: USER_NAME }).execPopulate();
    return tagResolve.createBy;
  }
}
