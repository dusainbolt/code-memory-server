import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { Roles, USER_KEY } from 'src/auth/roles.guard';
import { CreateTagInput } from 'src/dto/tag/CreateTagDTO';
import { Tag } from 'src/dto/tag/TagDTO';
import { Role } from '../users/dto/user-enum';
import { UserHashToken } from '../users/dto/user-hash-token';
import { TagService } from './tag.service';

@Resolver(() => Tag)
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  // @Roles(Role.USER)
  @Roles([Role.USER, Role.ADMIN])
  @Mutation(() => Tag)
  async createTag(@Args('input') input: CreateTagInput, @Context(USER_KEY) user: UserHashToken): Promise<Tag> {
    return this.tagService.create(input, user.id);
  }
}
