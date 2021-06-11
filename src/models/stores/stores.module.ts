import { MongooseModule } from '@nestjs/mongoose';
import { Store, StoreSchema } from './stores.schema';
import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresResolver } from './stores.resolver';

@Module({
  imports: [MongooseModule.forFeature([{ name: Store.name, schema: StoreSchema }])],
  providers: [StoresService, StoresResolver],
  exports: [StoresService],
})
export class StoresModule {}
