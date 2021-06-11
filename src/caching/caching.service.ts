import { Injectable, Inject, CACHE_MANAGER } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CachingService {
    constructor(@Inject(CACHE_MANAGER) private readonly cache: Cache) {}

    async get(key) {
        return await this.cache.get(key);
    }

    async set(key, value, time = false) {
        await this.cache.set(key, value, { ttl: time });
    }

    async reset() {
        await this.cache.reset();
    }

    async del(key) {
        await this.cache.del(key);
    }
}
