import { MongooseModule } from '@nestjs/mongoose';
import { SeoHome, SeoHomeSchema } from './seo-home.schema';
import { Module } from '@nestjs/common';
import { SeoHomeService } from './seo-home.service';
import { SeoHomeResolver } from './seo-home.resolver';

@Module({
    imports: [MongooseModule.forFeature([{ name: SeoHome.name, schema: SeoHomeSchema }])],
    providers: [SeoHomeService, SeoHomeResolver],
    exports: [SeoHomeService],
})
export class SeoHomeModule {}
