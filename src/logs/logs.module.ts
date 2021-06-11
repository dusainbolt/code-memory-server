import { Module } from '@nestjs/common';
import { AppLogger } from './logs.service';

@Module({
  providers: [AppLogger],
  exports: [AppLogger],
})
export class LogsModule {}