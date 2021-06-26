import { ModelsModule } from './../models.module';
import { Logger } from '@nestjs/common';
import { LoginInput, LoginOutput } from './dto/login-user-dto';
import { UsersService } from './users.service';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { User } from './dto/user-dto';
@Resolver(() => User)
export class UsersResolver {
    private readonly logger = new Logger(UsersResolver.name);

    constructor(private readonly usersService: UsersService) { }

    // @Mutation(returns => User)
    // async createUser(@Args('input') input: CreateUser): Promise<User> {
    //     // this.logger.debug(`createUser => input: ${JSON.stringify(input)}`);
    //     return this.usersService.create(input);
    // }

    // @Query(() => [User])
    // async userInitData(): Promise<User[]> {
    //     return this.usersService.initDataByUser();
    // }

    @Mutation(returns => LoginOutput)
    async login(@Args('input') input: LoginInput): Promise<LoginOutput> {
        // this.logger.debug(`login => input: ${JSON.stringify(input)}`);
        return this.usersService.login(input);
    }

    // @Roles(Role.Admin)
    // @Query(() => [User])
    // async users(): Promise<User[]> {
    //     this.logger.debug("Query users {...}");
    //     return this.usersService.list();
    // }

    // @ResolveField()
    // async items(@Parent() user: UserDocument, @Args('populate') populate: boolean = false) {
    //     if (populate) {
    //         await user.populate({ path: 'items', model: Item.name }).execPopulate();
    //     }
    //     return user.items;
    // }
}
