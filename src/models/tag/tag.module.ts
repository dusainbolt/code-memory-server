import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagResolver } from './tag.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { TagSchema, TAG_NAME } from './tag.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: TAG_NAME, schema: TagSchema }])],
  providers: [TagService, TagResolver],
  exports: [TagService],
})
export class TagModule {}
