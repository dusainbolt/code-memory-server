import { ItemsService } from './items.service';
import { AppLogger } from './../../logs/logs.service';
import { ItemDTO } from './dto/type-item-dto';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';

export const EVENT_ITEM = {
    CREATE: 'ITEM_CREATE_EVENT',
};

@Injectable()
export class ItemsListener {
    constructor(private appLogger: AppLogger) {
        this.appLogger.setContext(ItemsService.name);
    }

    @OnEvent(EVENT_ITEM.CREATE)
    handleOrderCreatedEvent(event: ItemDTO) {
        this.appLogger.verbose("ITEM_CREATE_EVENT");
    }
}
