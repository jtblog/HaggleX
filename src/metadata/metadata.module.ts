import { HttpModule, Module } from '@nestjs/common';
import { MetadataService } from './metadata.service';
import { MetadataController } from './metadata.controller';
import { MetadataResolver } from './metadata.resolver';

import { CacheModule} from '@nestjs/common';

@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: 120
    })
  ],
  providers: [MetadataService, MetadataResolver, ],
  controllers: [MetadataController]
})
export class MetadataModule {}
