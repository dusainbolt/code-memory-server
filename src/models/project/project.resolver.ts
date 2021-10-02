import { Tag } from './../../dto/tag/TagDTO';
import { ProjectDocument } from './project.schema';
import { ProjectService } from './project.service';
import { OutputSearchProject, SearchProjectInput } from './../../dto/project/SearchProjectDTO';
import { Roles } from 'src/auth/roles.guard';
import { CreateProjectInput, UpdateProjectInput } from './../../dto/project/CreateProjectDTO';
import { USER_KEY } from './../../auth/roles.guard';
import { Project } from './../../dto/project/ProjectDTO';
import { Resolver, Mutation, Args, Parent, ResolveField, Context, Query } from '@nestjs/graphql';
import { User } from '../../dto/user/UserDTO';
import { Role } from '../../dto/user/UserEnum';
import * as DataLoader from 'dataloader';
import { Work } from 'src/dto/work/WorkDTO';

@Resolver(Project)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) {}

  @Roles([Role.ADMIN])
  @Mutation(() => Project)
  async projectCreate(@Args('input') input: CreateProjectInput, @Context(USER_KEY) user: User): Promise<Project> {
    return this.projectService.create(input, user);
  }

  @Roles([Role.ADMIN])
  @Mutation(() => Project)
  async projectUpdate(@Args('input') input: UpdateProjectInput, @Context(USER_KEY) user: User): Promise<Project> {
    return this.projectService.update(input, user);
  }

  @Roles([Role.ADMIN])
  @Query(() => OutputSearchProject)
  async projectList(
    @Args('input') input: SearchProjectInput,
    @Context(USER_KEY) user: User
  ): Promise<OutputSearchProject> {
    return this.projectService.list(input, user.id);
  }

  @ResolveField()
  async userCreate(
    @Parent() projectResolve: ProjectDocument,
    @Context('usersLoader') usersLoader: DataLoader<string, User>
  ) {
    return usersLoader.load(projectResolve.createBy);
  }

  @ResolveField()
  async work(@Parent() projectResolve: ProjectDocument, @Context('worksLoader') worksLoader: DataLoader<string, Work>) {
    return worksLoader.load(projectResolve.workId);
  }

  @ResolveField()
  async techsData(
    @Parent() projectResolve: ProjectDocument,
    @Context('tagsLoader') tagsLoader: DataLoader<string[], Tag>
  ) {
    return tagsLoader.loadMany(projectResolve.techs as any);
  }
}
