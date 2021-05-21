import { MetadataService } from '../metadata/metadata.service';
import { MetaDataModel } from './models/metadata.model';
export declare class MetadataResolver {
    private readonly metadataService;
    constructor(metadataService: MetadataService);
    getMetadatas(): Promise<MetaDataModel[]>;
    getMetadataByLink(link: string): Promise<MetaDataModel>;
}
