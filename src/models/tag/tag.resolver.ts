import { Args, Context, Mutation, Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Roles, USER_KEY } from 'src/auth/roles.guard';
import { CreateTagInput, UpdateTagInput } from 'src/dto/tag/CreateTagDTO';
import { EntireTagInput } from 'src/dto/tag/GetTagDetailDTO';
import { OutputSearchTag, SearchTagInput } from 'src/dto/tag/SearchTagDTO';
import { Tag } from 'src/dto/tag/TagDTO';
import { User } from '../users/dto/user-dto';
import { Role } from '../users/dto/user-enum';
import { USER_NAME } from '../users/user.schema';
import { TagDocument } from './tag.schema';
import { TagService } from './tag.service';
@Resolver(() => Tag)
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  @Roles([Role.ADMIN])
  @Mutation(() => Tag)
  async createTag(@Args('input') input: CreateTagInput, @Context(USER_KEY) user: User): Promise<Tag> {
    return this.tagService.create(input, user);
  }

  @Roles([Role.ADMIN])
  @Mutation(() => Tag)
  async updateTag(@Args('input') input: UpdateTagInput): Promise<Tag> {
    return this.tagService.update(input);
  }

  @Query(() => OutputSearchTag)
  async listTags(@Args('input') input: SearchTagInput): Promise<OutputSearchTag> {
    return this.tagService.list(input);
  }

  @Query(() => [Tag])
  async entireTags(@Args('input') input: EntireTagInput): Promise<Tag[]> {
    return this.tagService.entire(input);
  }

  @ResolveField()
  async userCreate(@Parent() tagResolve: TagDocument) {
    await tagResolve.populate({ path: 'createBy', model: USER_NAME }).execPopulate();
    return tagResolve.createBy;
  }
}
