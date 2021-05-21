import { HttpService } from '@nestjs/common';
import { MetaDataModel } from './models/metadata.model';
import { Cache } from 'cache-manager';
import 'reflect-metadata';
export declare class MetadataService {
    private cacheManager;
    private readonly http;
    constructor(cacheManager: Cache, http: HttpService);
    metadatas: MetaDataModel[];
    getDimension(src: string): Promise<any>;
    parse_url(_url: string): Promise<any>;
    getCacheObject(key: string): Promise<any>;
    setCacheObject(key: string, value: any): Promise<boolean>;
    getCacheKeys(key: string): Promise<any>;
    setCacheKey(key: string, value: any): Promise<boolean>;
    addCacheKey(key: string): Promise<boolean>;
    getMetaDatas(): Promise<MetaDataModel[]>;
    getMetaDataByLink(link: any): Promise<MetaDataModel>;
    isEmpty(_in: string): boolean;
    isEmptyObject(_in: any): boolean;
    isEmptyArray(_in: any): boolean;
}
