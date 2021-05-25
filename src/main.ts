import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
//import { createConnection } from 'typeorm';
//import {MetadataResolver} from './metadata/metadata.resolver';
import "reflect-metadata";
//import { ApolloServer } from 'apollo-server-express';
//import { buildSchema } from 'graphql/utilities';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  //const con = await createConnection();
  /*const schema = await buildSchema({
    resolvers: [MetadataResolver]
  }) */

  app.useStaticAssets(join(__dirname, '..', 'public', 'assets'));
  app.setBaseViewsDir(join(__dirname, '..', 'public'));
  app.setViewEngine('hbs');

  app.enableCors();
  await app.listen(process.env.PORT || 3000);
}

bootstrap();