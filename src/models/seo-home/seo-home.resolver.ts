import { SeoHomeService } from './seo-home.service';
import { Resolver, Query } from '@nestjs/graphql';
import { SeoHome } from 'src/dto/seoHome/SeoHomeDTO';
@Resolver()
export class SeoHomeResolver {
  constructor(private readonly seoHomeService: SeoHomeService) { }

  @Query(() => SeoHome)
  async seoHome(): Promise<SeoHome> {
    return this.seoHomeService.getSeoHome();
  }
}
