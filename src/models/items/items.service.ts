import { EventEmitter2 } from 'eventemitter2';
import { EVENT_ITEM } from './items.listener';
import { AppLogger } from './../../logs/logs.service';
import { ItemUpdateDTO } from './dto/update-dto';
import { CreateItemDTO } from './dto/create-item-dto';
import { ItemDocument, Item } from './items.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ItemDTO } from './dto/type-item-dto';
@Injectable()
export class ItemsService {
    constructor(
        @InjectModel(Item.name) private itemModel: Model<ItemDocument>,
        private appLogger: AppLogger,
        private eventEmitter: EventEmitter2,
    ) {
        this.appLogger.setContext(ItemsService.name);
    }

    async create(createItemDto: CreateItemDTO): Promise<ItemDTO> {
        const createdItem = new this.itemModel(createItemDto);
        const data: ItemDTO = await createdItem.save();
        this.eventEmitter.emit(EVENT_ITEM.CREATE, data);
        // this.appLogger.warn('About to return cats!');
        // const date = new Date();
        // const job = new CronJob(date, () => {
        //     console.log('123123123');
        // });
        // this.appLogger.debug(JSON.stringify(data));

        // this.schedulerRegistry.addCronJob(`${Date.now()}-'123123`, job);
        // job.start();
        return data;
    }

    async findAll(): Promise<ItemDTO[]> {
        return await this.itemModel.find().exec();
    }

    async findOne(id: string): Promise<ItemDTO> {
        return await this.itemModel.findOne({ _id: id });
    }

    async delete(id: string): Promise<ItemDTO> {
        return await this.itemModel.findByIdAndRemove(id);
    }

    async update(id: string, item: ItemUpdateDTO): Promise<ItemDTO> {
        return await this.itemModel.findByIdAndUpdate(id, item, { new: true });
    }
}
