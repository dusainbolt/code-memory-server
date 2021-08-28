import { SeoHomeDTO } from '../../dto/seoHome/SeoHomeDTO';
import { SeoHomeService } from './seo-home.service';
import { Resolver, Query } from '@nestjs/graphql';
@Resolver()
export class SeoHomeResolver {
  constructor(private readonly seoHomeService: SeoHomeService) { }

  @Query(() => SeoHomeDTO)
  async seoHome(): Promise<SeoHomeDTO> {
    return this.seoHomeService.getSeoHome();
  }
}
