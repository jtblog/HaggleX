import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
/*import { AppService } from './app.service';
import { MetadataService } from './metadata/metadata.service';
import { MetadataController } from './metadata/metadata.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { MetadataModule } from './metadata/metadata.module';
import { MetadataResolver } from './metadata/metadata.resolver';*/

import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';
import { CacheModule} from '@nestjs/common';
/*import { TypeOrmModule} from '@nestjs/typeorm';
import { SequelizeModule } from '@nestjs/sequelize';*/
import { InMemoryDBModule } from '@nestjs-addons/in-memory-db';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
/*import { MetaDataRepository } from './metadata/metadata.repository';
import { MetaDataEntity } from './metadata/entities/metadata.entity';
import { ImageEntity } from './metadata/entities/image.entity';
import { DimensionEntity } from './metadata/entities/dimension.entity';*/


@Module({
  imports: [
    HttpModule, 
    //MetaDataRepository,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }), 
    /*TypeOrmModule.forRoot({
      type: "sqlite",
      database: "md",
      cache: { duration: 30000 }, //30 seconds*/
      ////entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      /*entities: [MetaDataEntity, ImageEntity, DimensionEntity],
      synchronize: true
    }),*/
    InMemoryDBModule,
    /*SequelizeModule.forRoot({
      database: 'meta',
      dialect: 'sqlite',
      username: 'root',
      password: '',
      storage: ':memory:',
      models: [MetaDataEntity],
    }),*/
    /*GraphQLModule.forRoot({
      autoSchemaFile: true,
      introspection: true,
      playground: true
    }),*/
    CacheModule.register({
      ttl: 120
    }),
    //MetadataModule
  ],
  /*controllers: [AppController, MetadataController],
  providers: [AppService, MetadataService, MetadataResolver, InMemoryDBService],*/
  controllers: [AppController],
  providers: [InMemoryDBService],
})
export class AppModule {}