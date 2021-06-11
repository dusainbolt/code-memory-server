import { Module } from '@nestjs/common';
import { SeoHomeService } from './seo-home.service';
import { SeoHomeResolver } from './seo-home.resolver';

@Module({
  providers: [SeoHomeService, SeoHomeResolver]
})
export class SeoHomeModule {}
