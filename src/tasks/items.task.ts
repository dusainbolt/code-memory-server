import { CachingService } from './../caching/caching.service';
import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class ItemTask {
  private readonly logger = new Logger(ItemTask.name);
  // private readonly logger = new Logger(ItemTask.name);
  constructor(
    private readonly cachingService: CachingService, // REMEMBER TO INJECT THIS
  ) {}
  
  // @Cron(CronExpression.EVERY_10_SECONDS)
  handleCron() {
    this.logger.verbose('Called when the second is 60');
    // this.cachingService.set('DU_SAINBOLT_'+this.count, {hello: 1, hi: 2});
  }

  // @Interval(10000) 
  // handleInterval() {
  //   this.logger.debug('Called every 10 seconds');
  // }

  // @Timeout(5000)
  // handleTimeout() {
  //   this.logger.debug('Called once after 5 seconds');
  // }
}
