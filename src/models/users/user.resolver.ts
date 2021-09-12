import { ModelsModule } from '../models.module';
import { Logger } from '@nestjs/common';
import { LoginInput, LoginOutput } from './dto/login-user-dto';
import { UserService } from './user.service';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { User } from './dto/user-dto';
import { CreateUser } from './dto/create-user-dto';
@Resolver(() => User)
export class UserResolver {
  private readonly logger = new Logger(UserResolver.name);

  constructor(private readonly userService: UserService) { }

  @Mutation(returns => User)
  async userCreate(@Args('input') input: CreateUser): Promise<User> {
    // this.logger.debug(`createUser => input: ${JSON.stringify(input)}`);
    return this.userService.create(input);
  }

  // @Query(() => [User])
  // async userInitData(): Promise<User[]> {
  //     return this.userService.initDataByUser();
  // }

  @Mutation(returns => LoginOutput)
  async userLogin(@Args('input') input: LoginInput): Promise<LoginOutput> {
    // this.logger.debug(`login => input: ${JSON.stringify(input)}`);
    return this.userService.login(input);
  }

  // @Roles(Role.Admin)
  // @Query(() => [User])
  // async user(): Promise<User[]> {
  //     this.logger.debug("Query user {...}");
  //     return this.userService.list();
  // }

  // @ResolveField()
  // async items(@Parent() user: UserDocument, @Args('populate') populate: boolean = false) {
  //     if (populate) {
  //         await user.populate({ path: 'items', model: Item.name }).execPopulate();
  //     }
  //     return user.items;
  // }
}
