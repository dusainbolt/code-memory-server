import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { Roles, USER_KEY } from 'src/auth/roles.guard';
import { CreateTagInput } from 'src/dto/tag/CreateTagDTO';
import { OutputSearchTag, SearchTagInput } from 'src/dto/tag/SearchTagDTO';
import { Tag } from 'src/dto/tag/TagDTO';
import { Role } from '../users/dto/user-enum';
import { UserHashToken } from '../users/dto/user-hash-token';
import { TagService } from './tag.service';

@Resolver(() => Tag)
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  @Roles([Role.USER, Role.ADMIN])
  @Mutation(() => Tag)
  async createTag(@Args('input') input: CreateTagInput, @Context(USER_KEY) user: UserHashToken): Promise<Tag> {
    return this.tagService.create(input, user.id);
  }

  @Query(() => OutputSearchTag)
  async listTags(@Args('input') input: SearchTagInput): Promise<OutputSearchTag> {
    return this.tagService.list(input);
  }
}
