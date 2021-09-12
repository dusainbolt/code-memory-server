import { MongooseModule } from '@nestjs/mongoose';
import { SeoHomeSchema, SEO_HOME_NAME } from './seo-home.schema';
import { Module } from '@nestjs/common';
import { SeoHomeService } from './seo-home.service';
import { SeoHomeResolver } from './seo-home.resolver';

@Module({
    imports: [MongooseModule.forFeature([{ name: SEO_HOME_NAME, schema: SeoHomeSchema }])],
    providers: [SeoHomeService, SeoHomeResolver],
    exports: [SeoHomeService],
})
export class SeoHomeModule { }
