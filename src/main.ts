import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppLogger } from './logs/logs.service';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: new AppLogger(), cors: true });

  const config = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());

  // const options = new DocumentBuilder()
  //     .setTitle('Cats example')
  //     .setDescription('The cats API description')
  //     .setVersion('1.0')
  //     .addTag('cats')
  //     .addBearerAuth()
  //     .build();

  // const document = SwaggerModule.createDocument(app, options);

  // SwaggerModule.setup('api', app, document);

  await app.listen(config.get('PORT') || 3333);

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
