import { SearchWorkInput, OutputSearchWork } from '../../dto/work/SearchWorkDTO';
import { USER_KEY, Roles } from '../../auth/roles.guard';
import { WorkService } from './work.service';
import { Resolver, Mutation, Args, Context, ResolveField, Parent, Query } from '@nestjs/graphql';
import { Work } from 'src/dto/work/WorkDTO';
import { User } from '../users/dto/user-dto';
import { Role } from '../users/dto/user-enum';
import { CreateWorkInput, UpdateWorkInput } from 'src/dto/work/CreateWorkDTO';
import { WorkDocument } from './work.schema';
import { USER_NAME } from '../users/user.schema';

@Resolver(() => Work)
export class WorkResolver {
  constructor(private readonly workService: WorkService) { }

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

  @Query(() => OutputSearchWork)
  async workList(@Args('input') input: SearchWorkInput): Promise<OutputSearchWork> {
    return this.workService.list(input);
  }

  @ResolveField()
  async userCreate(@Parent() workResolve: WorkDocument) {
    await workResolve.populate({ path: 'createBy', model: USER_NAME }).execPopulate();
    return workResolve.createBy;
  }
}
