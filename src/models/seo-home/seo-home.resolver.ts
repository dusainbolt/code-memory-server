import { CreateSeoHomeInput } from './../../dto/seoHome/CreateSeoHomeDTO';
import { Roles, USER_KEY } from './../../auth/roles.guard';
import { SeoHomeService } from './seo-home.service';
import { Resolver, Query, Mutation, Context, Args } from '@nestjs/graphql';
import { SeoHome } from 'src/dto/seoHome/SeoHomeDTO';
import { Role } from '../users/dto/user-enum';
import { User } from '../users/dto/user-dto';
@Resolver()
export class SeoHomeResolver {
  constructor(private readonly seoHomeService: SeoHomeService) { }

  @Query(() => SeoHome)
  async seoHome(): Promise<SeoHome> {
    return this.seoHomeService.getSeoHome();
  }

  @Roles([Role.ADMIN])
  @Mutation(() => SeoHome)
  async seoHomeCreate(@Args('input') input: CreateSeoHomeInput, @Context(USER_KEY) user: User): Promise<SeoHome> {
    return this.seoHomeService.create(input, user);
  }

}
