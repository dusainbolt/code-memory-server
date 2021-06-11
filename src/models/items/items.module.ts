import { ItemsListener } from './items.listener';
import { AppLogger } from './../../logs/logs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemSchema, Item } from './items.schema';
import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsResolver } from './items.resolver';

@Module({
    imports: [MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }])],
    providers: [ItemsService, ItemsResolver, AppLogger, ItemsListener],
})
export class ItemsModule {}
