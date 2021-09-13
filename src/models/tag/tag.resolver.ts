import { Args, Context, Mutation, Resolver, Query, ResolveField, Parent } from '@nestjs/graphql';
import { Roles, USER_KEY } from 'src/auth/roles.guard';
import { CreateTagInput, UpdateTagInput } from 'src/dto/tag/CreateTagDTO';
import { EntireTagInput, FindTagBySlugInput } from 'src/dto/tag/GetTagDetailDTO';
import { OutputSearchTag, SearchTagInput } from 'src/dto/tag/SearchTagDTO';
import { Tag } from 'src/dto/tag/TagDTO';
import { User } from '../../dto/user/UserDTO';
import { Role } from '../../dto/user/UserEnum';
import { TagDocument } from './tag.schema';
import { TagService } from './tag.service';
import * as DataLoader from 'dataloader';

@Resolver(Tag)
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  @Roles([Role.ADMIN])
  @Mutation(() => Tag)
  async tagCreate(@Args('input') input: CreateTagInput, @Context(USER_KEY) user: User): Promise<Tag> {
    return this.tagService.create(input, user);
  }

  @Roles([Role.ADMIN])
  @Mutation(() => Tag)
  async tagUpdate(@Args('input') input: UpdateTagInput): Promise<Tag> {
    return this.tagService.update(input);
  }

  @Query(() => OutputSearchTag)
  async tagList(@Args('input') input: SearchTagInput): Promise<OutputSearchTag> {
    return this.tagService.list(input);
  }

  @Query(() => Tag)
  async tagFindBySlug(@Args('input') input: FindTagBySlugInput): Promise<Tag> {
    return this.tagService.findOneBySlug(input.slug);
  }

  @Query(() => [Tag])
  async tagEntire(@Args('input') input: EntireTagInput): Promise<Tag[]> {
    return this.tagService.entire(input);
  }

  @ResolveField()
  async userCreate(@Parent() tagResolve: TagDocument, @Context('usersLoader') usersLoader: DataLoader<string, User>) {
    return usersLoader.load(tagResolve.createBy);
  }
}
