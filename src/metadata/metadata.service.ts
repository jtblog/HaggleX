import { Injectable, HttpException, Inject, CACHE_MANAGER } from '@nestjs/common';

import { HttpService } from '@nestjs/common';
import { parse } from 'node-html-parser';
import * as flatted from 'flatted';
const url = require('url');
const sizeOf = require('image-size');

import { METADATAS } from '../mocks/metadatas.mock';
import { MetaDataModel } from './models/metadata.model';
import { CreateMetaDataDTO } from '../metadata/dto/create-metadata.dto';
import { Cache } from 'cache-manager';
import { plainToClass } from 'class-transformer';
import 'reflect-metadata';

@Injectable()
export class MetadataService {

    constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache, private readonly http: HttpService) { }

    metadatas = METADATAS;

    async getDimension(src: string) {
        return this.http.get(
            src,
            { responseType: 'arraybuffer' })
            .toPromise()
            .then(res => {
                var _html = res.data;
                const buffer = Buffer.from(res.data, 'binary').toString('base64');
                const base64 = Buffer.from(buffer, 'base64');
                const dimension = sizeOf(base64);
                return { 'dimension': dimension, 'base64': buffer, 'src': src };
            })
            .catch(err => {
                return null;
            });
    }

    parse_url(_url: string) {
        return this.http.get(_url)
            .toPromise()
            .then(async res => {
                var _html = res.data;
                var doc = parse(res.data);

                var title = doc.querySelector('title').textContent;
                var desc = doc.querySelector('meta[name="description"]').getAttribute('content');
                var result = { 'title': title, 'description': desc, 'link': _url };

                var maxImage = null;
                var maxSize = 0;
                var imgs = doc.querySelectorAll('img');
                for (var i = 0; i < imgs.length; i++) {
                    const src = new URL(imgs[i].getAttribute('src'), _url).toString();
                    const _dim = await this.getDimension(src);

                    if (_dim) {
                        var currSize = _dim['dimension'].width * _dim['dimension'].height;
                        if (maxSize < currSize) {
                            maxSize = currSize;
                            maxImage = _dim;
                        }
                    }

                }
                result['largest_image'] = maxImage;

                return result;
            })
            .catch(err => {
                return err;
            });
    }

    async getCacheObject(key : string): Promise<any>{
        var result = await this.cacheManager.get(key)
        .then((value: string) => {
            result = JSON.parse(value);
        })
        .catch(err => {
            result = JSON.parse(JSON.stringify({}));
        });
        return result;
    }

    async setCacheObject(key : string, value: any){
        var result = false;
        var v = await this.cacheManager.set(key, JSON.stringify(value))
        .then((value: string) => {
            result = true;
        })
        .catch(err => {
            result = false;
        });
        console.log(v);
        return result;
    }

    async getCacheKeys(key : string): Promise<any>{
        var result = await this.cacheManager.get(key)
        .then((value: string) => {
            result = JSON.parse(value);
        })
        .catch(err => {
            result = JSON.parse(JSON.stringify([]));
        });
        return result;
    }

    async setCacheKey(key : string, value: any){
        var result = false;
        var v = await this.cacheManager.set(key, JSON.stringify(value))
        .then((value: string) => {
            result = true;
        })
        .catch(err => {
            result = false;
        });
        console.log(v);
        return result;
    }

    async addCacheKey(key: string){
        var cache_kys = await this.getCacheKeys("keys");
        var t1 = this.isEmptyArray(cache_kys);
        if(t1){
            cache_kys = [ key ];
        }else{
            cache_kys.push(key);
            cache_kys = cache_kys.concat(key);
        }
        return await this.setCacheKey("keys", cache_kys);
    }

    getMetaDatas(): Promise<MetaDataModel[]> {
        return new Promise(async resolve => {
            //this.metadatas = [];
            var cache_kys = await this.getCacheKeys("keys");
            if (!this.isEmptyArray(cache_kys)) {
                for (var i = 0; i < cache_kys.length; i++) {
                    var cache_meta = await this.getCacheObject(cache_kys[i]);
                    if(!this.isEmptyObject(cache_meta)){
                        var metadata = plainToClass(MetaDataModel, cache_meta);
                        this.metadatas.push(metadata);
                        this.metadatas = this.metadatas.concat(metadata);
                    }
                }
            }
            for (var i = 0; i < this.metadatas.length; i++) {
                if(this.isEmptyObject(this.metadatas[i])){
                    this.metadatas.splice(1, i);
                }
            }
            resolve(this.metadatas);
        });
    }

    async getMetaDataByLink(link): Promise<MetaDataModel> {
        return new Promise(async resolve => {
            var cache_meta: any;
            var metadata: MetaDataModel;
            try {
                var cache_meta = await this.getCacheObject(link);
                if (!this.isEmptyObject(cache_meta)) {
                    metadata = plainToClass(MetaDataModel, cache_meta);
                } else {
                    cache_meta = this.parse_url(link);
                    var t0 = await this.setCacheObject(link, cache_meta);
                    var t1 = await this.addCacheKey(link);

                    if (t1 && t0) {
                        metadata = plainToClass(MetaDataModel, cache_meta);
                        this.metadatas.push(metadata);
                        this.metadatas = this.metadatas.concat(metadata);
                    }
                }

            } catch (e) {
                cache_meta = this.parse_url(link);
                var t0 = await this.setCacheObject(link, cache_meta);
                var t1 = await this.addCacheKey(link);

                if (t1 && t0) {
                    metadata = plainToClass(MetaDataModel, cache_meta);
                    this.metadatas.push(metadata);
                    this.metadatas = this.metadatas.concat(metadata);
                }
            }
            resolve(metadata);
        });
    }

    /*
    createMetaData(input: CreateMetaDataDTO): Promise<MetaDataModel[]> {
        return new Promise(resolve => {
            const lastMetaData = metadatas.slice(-1).pop();
            const metadata : MetaDataModel = {
                id: Number(lastMetaData.id) + 1 + '',
                title: input.title,
                description: input.description,
                link: input.link,
                largest_image: input.largest_image,
            };
            if(this.isEmpty(input.id)){
                metadata.id = input.id;
            }
            
            this.metadatas.push(metadata);
            resolve(this.metadatas);
        });
    }
    
    deleteMetaData(link: string): Promise<MetaDataModel[]> {
        return new Promise(resolve => {
            let index = this.metadatas.findIndex(mt => mt.link === link);
            if (index === -1) {
                throw new HttpException('Does not exist!', 404);
            }
            this.metadatas.splice(1, index);
            resolve(this.metadatas);
        });
    }*/

    isEmpty(_in: string): boolean {
        var result = !_in;
        result = result || (_in.length === 0);
        result = result || (/^\s*s/.test(_in));
        result = result || (!_in.trim());
        return result;
    }

    isEmptyObject(_in: any): boolean {
        var result = JSON.stringify(_in) === '{}';
        try{
            result = result || Object.keys(_in).length === 0;
        }catch(e){
            result = true;
        }
        
        return result;
    }

    isEmptyArray(_in: any): boolean {
        var result = JSON.stringify(_in) === '[]';
        try{
            result = result || _in.length === 0;
        }catch(e){
            result = true;
        }
        
        return result;
    }
}