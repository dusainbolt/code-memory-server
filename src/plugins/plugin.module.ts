import { HashModule } from './../hash/hash.module';
import { LoggingPlugin } from './logging.plugin';
import { Module } from '@nestjs/common';

@Module({
    imports: [HashModule],
    providers: [LoggingPlugin],
})
export class PluginModule {}
