import { MetadataService } from '../metadata/metadata.service';
import { MetaDataModel } from './models/metadata.model';
import { Cache } from 'cache-manager';
export declare class MetadataController {
    private cacheManager;
    private metadataService;
    constructor(cacheManager: Cache, metadataService: MetadataService);
    getMetaDatas(): Promise<MetaDataModel[]>;
    getMetaDataByLink(query: any): Promise<MetaDataModel>;
    s: any;
    getMetaDataByLink2(link: any): Promise<MetaDataModel>;
}
