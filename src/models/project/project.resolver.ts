import { ProjectDocument } from './project.schema';
import { ProjectService } from './project.service';
import { OutputSearchProject, SearchProjectInput } from './../../dto/project/SearchProjectDTO';
import { Roles } from 'src/auth/roles.guard';
import { CreateProjectInput, UpdateProjectInput } from './../../dto/project/CreateProjectDTO';
import { USER_KEY } from './../../auth/roles.guard';
import { Project } from './../../dto/project/ProjectDTO';
import { Resolver, Mutation, Args, Parent, ResolveField, Context, Query } from '@nestjs/graphql';
import { User } from '../users/dto/user-dto';
import { Role } from '../users/dto/user-enum';
import * as DataLoader from 'dataloader';

@Resolver(Project)
export class ProjectResolver {
  constructor(private readonly projectService: ProjectService) { }

  @Roles([Role.ADMIN])
  @Mutation(() => Project)
  async projectCreate(@Args('input') input: CreateProjectInput, @Context(USER_KEY) user: User): Promise<Project> {
    return this.projectService.create(input, user);
  }

  @Roles([Role.ADMIN])
  @Mutation(() => Project)
  async projectUpdate(@Args('input') input: UpdateProjectInput): Promise<Project> {
    return this.projectService.update(input);
  }

  @Roles([Role.ADMIN])
  @Query(() => OutputSearchProject)
  async projectList(@Args('input') input: SearchProjectInput, @Context(USER_KEY) user: User): Promise<OutputSearchProject> {
    return this.projectService.list(input, user.id);
  }

  @ResolveField()
  async userCreate(@Parent() projectResolve: ProjectDocument, @Context('usersLoader') usersLoader: DataLoader<string, User>,
  ) {
    return usersLoader.load(projectResolve.createBy);
  }

  @ResolveField()
  async techsData(@Parent() projectResolve: ProjectDocument, @Context('tagsLoader') tagsLoader: DataLoader<string[], User>,
  ) {
    return tagsLoader.loadMany(projectResolve.techs as any);
  }
}
