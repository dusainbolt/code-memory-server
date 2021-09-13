import { SearchWorkInput, OutputSearchWork } from '../../dto/work/SearchWorkDTO';
import { USER_KEY, Roles } from '../../auth/roles.guard';
import { WorkService } from './work.service';
import { Resolver, Mutation, Args, Context, ResolveField, Parent, Query } from '@nestjs/graphql';
import { Work } from 'src/dto/work/WorkDTO';
import { User } from '../../dto/user/UserDTO';
import { Role } from '../../dto/user/UserEnum';
import { CreateWorkInput, UpdateWorkInput } from 'src/dto/work/CreateWorkDTO';
import { WorkDocument } from './work.schema';
import * as DataLoader from 'dataloader';
@Resolver(() => Work)
export class WorkResolver {
  constructor(private readonly workService: WorkService) {}

  @Roles([Role.ADMIN])
  @Mutation(() => Work)
  async workCreate(@Args('input') input: CreateWorkInput, @Context(USER_KEY) user: User): Promise<Work> {
    return this.workService.create(input, user);
  }

  @Roles([Role.ADMIN])
  @Mutation(() => Work)
  async workUpdate(@Args('input') input: UpdateWorkInput): Promise<Work> {
    return this.workService.update(input);
  }

  @Roles([Role.ADMIN])
  @Query(() => OutputSearchWork)
  async workList(@Args('input') input: SearchWorkInput, @Context(USER_KEY) user: User): Promise<OutputSearchWork> {
    return this.workService.list(input, user.id);
  }

  @ResolveField()
  async userCreate(@Parent() workResolve: WorkDocument, @Context('usersLoader') usersLoader: DataLoader<string, User>) {
    return usersLoader.load(workResolve.createBy);
  }
}
