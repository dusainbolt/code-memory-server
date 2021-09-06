import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppLogger } from './logs/logs.service';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: new AppLogger(), cors: true });

  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());


  await app.listen(configService.get('PORT') || 3333);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
