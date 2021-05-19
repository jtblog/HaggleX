import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MetadataService } from './metadata/metadata.service';
import { MetadataController } from './metadata/metadata.controller';
import { GraphQLModule } from '@nestjs/graphql';
import { MetadataModule } from './metadata/metadata.module';
import { MetadataResolver } from './metadata/metadata.resolver';

import { CacheModule} from '@nestjs/common';

@Module({
  imports: [
    HttpModule, MetadataModule,
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }), 
    CacheModule.register({
      ttl: 15
    })
  ],
  controllers: [AppController, MetadataController],
  providers: [AppService, MetadataService, MetadataResolver],
})
export class AppModule {}
