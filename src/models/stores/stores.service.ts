import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Store, StoreDocument } from './stores.schema';
import { Model } from 'mongoose';

@Injectable()
export class StoresService {
  constructor(@InjectModel(Store.name) public storeModel: Model<StoreDocument>) {}
}
