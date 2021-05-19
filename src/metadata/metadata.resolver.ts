import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { MetadataService } from '../metadata/metadata.service';
import { MetaDataModel} from './models/metadata.model';
import { CreateMetaDataDTO } from '../metadata/dto/create-metadata.dto';

@Resolver('MetaDataModel')
export class MetadataResolver {
    constructor(private readonly metadataService: MetadataService) { }

    @Query(type => [MetaDataModel])
    async getMetadatas() : Promise<MetaDataModel[]>{
        return await this.metadataService.getMetaDatas();
    }

    /*@Query(type => MetaDataModel)
    async getMetadataByLink(@Args('link') link: string,) {
        return await this.metadataService.getMetaDataByLink(link);
    }*/

    @Query(type => MetaDataModel)
    async getMetadataByLink( @Args('link') link: string,) : Promise<MetaDataModel>{
        return await this.metadataService.getMetaDataByLink(link);
    }

    

    /*@Mutation(type => [MetaDataModel])
    async createMetadata(@Args('input') input: CreateMetaDataDTO,) : Promise<MetaDataModel[]>{
        return await this.metadataService.createMetaData(input);
    }*/

    /*@Mutation(type => MetaDataModel)
    async updateMetadata(
        //@Args('input') input: UpdateMetadataDTO,
    ) {
        //return this.metadataService.updateTask(input);
    }

    @Mutation(type => [MetaDataModel])
    async deleteMetaData(@Args('link') link: string,) {
        //return this.metadataService.deleteMetaData(link);
    }*/
}
