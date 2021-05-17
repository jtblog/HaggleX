import { HttpModule, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MetadataService } from './metadata/metadata.service';
import { MetadataController } from './metadata/metadata.controller';
//import { GraphQLModule } from '@nestjs/graphql';
import { MetadataModule } from './metadata/metadata.module';

@Module({
  imports: [
    HttpModule, MetadataModule,
    /*GraphQLModule.forRoot({s
      autoSchemaFile: true,
    })*/
  ],
  controllers: [AppController, MetadataController],
  providers: [AppService, MetadataService],
})
export class AppModule {}
