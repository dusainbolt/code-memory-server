import { Logger } from '@nestjs/common';
import { LoginUserDTO } from './dto/login-user-dto';
import { Item } from './../items/items.schema';
import { CreateUserDTO } from './dto/create-user-dto';
import { UsersService } from './users.service';
import { Resolver, Args, Mutation, Query, ResolveField, Parent } from '@nestjs/graphql';
import { User, UserDocument } from './users.schema';
@Resolver(() => User)
export class UsersResolver {
    private readonly logger = new Logger(UsersResolver.name);

    constructor(private readonly usersService: UsersService) {}

    // @Mutation(returns => User)
    // async createUser(@Args('input') input: CreateUserDTO): Promise<User> {
    //     // this.logger.debug(`createUser => input: ${JSON.stringify(input)}`);
    //     return this.usersService.create(input);
    // }

    // @Mutation(returns => String)
    // async login(@Args('input') input: LoginUserDTO): Promise<string> {
    //     // this.logger.debug(`login => input: ${JSON.stringify(input)}`);
    //     return this.usersService.login(input);
    // }

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
