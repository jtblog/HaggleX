import { Controller, Get, Param, Post, Body, Query, Delete } from '@nestjs/common';
import { MetadataService } from '../metadata/metadata.service';
import { MetaDataModel} from './models/metadata.model';
import { CreateMetaDataDTO } from '../metadata/dto/create-metadata.dto';
import * as flatted from 'flatted';

@Controller('metadata')
export class MetadataController {

    constructor(private metadataService: MetadataService) { }

    @Get()
    async getMetaDatas() {
        const metadatas = await this.metadataService.getMetaDatas();
        return metadatas;
    }

    @Get()
    async getMetaDataByLink(@Query() query) {
        var lnk = decodeURI(query.link).toString();
        const metadata = await this.metadataService.getMetaDataByLink(lnk);
        return metadata;
    }

    @Get(':link')
    async getMetaDataByLink2(@Param('link') link) {
        var lnk = decodeURI(link).toString();
        const metadata = await this.metadataService.getMetaDataByLink(lnk);
        return metadata;
    }

    /*@Post()
    async createMetaData(@Body() createMetaDataDTO: CreateMetaDataDTO) {
        const metadatas = await this.metadataService.createMetaData(createMetaDataDTO);
        return metadatas;
    }

    @Delete()
    async deleteMetaData(@Query() query) {
        const metadatas = await this.metadataService.deleteMetaData(query.link);
        return metadatas;
    }*/
}