import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.useStaticAssets(join(__dirname, '..', 'public', 'assets'));
  app.setBaseViewsDir(join(__dirname, '..', 'public'));
  app.setViewEngine('hbs');

  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}

bootstrap();