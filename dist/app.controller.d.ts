import { HttpService } from '@nestjs/common';
import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { MetaDataModel } from './metadata.model';
export declare class AppController {
    private readonly mtRepo;
    private readonly http;
    constructor(mtRepo: InMemoryDBService<MetaDataModel>, http: HttpService);
    metadatas: MetaDataModel[];
    ttl: number;
    getDimension(src: string): Promise<any>;
    parse_url(_url: string): Promise<any>;
    _getMetaDatas(): Promise<MetaDataModel[]>;
    _getMetaDataByLink(link: any): Promise<MetaDataModel>;
    treatTTLMetaDatas(): Promise<MetaDataModel[]>;
    isEmptyString(_in: string): boolean;
    isEmptyObject(_in: any): boolean;
    isEmptyArray(_in: any): boolean;
    root(): void;
    getMetaDatas(): Promise<MetaDataModel[]>;
    getMetaDataByLink(query: any): Promise<MetaDataModel>;
    getMetaDataByLink2(link: any): Promise<MetaDataModel>;
}
