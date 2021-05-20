import { Injectable, HttpException, Inject, CACHE_MANAGER } from '@nestjs/common';

import { HttpService } from '@nestjs/common';
import { parse } from 'node-html-parser';
import * as flatted from 'flatted';
const url = require('url');
const sizeOf = require('image-size');

import { METADATAS } from '../mocks/metadatas.mock';
import { MetaDataModel} from './models/metadata.model';
import { CreateMetaDataDTO } from '../metadata/dto/create-metadata.dto';
import { Cache } from 'cache-manager';
import { plainToClass } from 'class-transformer';
import 'reflect-metadata';

@Injectable()
export class MetadataService {

    constructor(@Inject(CACHE_MANAGER) private cacheManager : Cache, private readonly http: HttpService){}
    
    metadatas = METADATAS;

    async getDimension(src: string) {
        return this.http.get(
          src,
          {responseType: 'arraybuffer'})
        .toPromise()
        .then(res => {
          var _html = res.data;
          const buffer = Buffer.from(res.data, 'binary').toString('base64');
          const base64 = Buffer.from(buffer, 'base64');
          const dimension = sizeOf(base64);
          return {'dimension': dimension, 'base64': buffer, 'src': src};
        })
        .catch(err => {
          return null;
        });
    }

    parse_url(_url: string){
        return this.http.get(_url)
        .toPromise()
        .then(async res => {
          var _html = res.data;
          var doc = parse(res.data);
    
          var title = doc.querySelector('title').textContent;
          var desc = doc.querySelector('meta[name="description"]').getAttribute('content');
          var result = {'title': title, 'description': desc, 'link': _url};
    
          var maxImage = null;
          var maxSize = 0;
          var imgs = doc.querySelectorAll('img');
          for(var i = 0; i < imgs.length; i++){
            const src = new URL(imgs[i].getAttribute('src'), _url).toString();
            const _dim = await this.getDimension(src);
            
            if(_dim){
                var currSize = _dim['dimension'].width * _dim['dimension'].height;
                if(maxSize < currSize){
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

    getMetaDatas(): Promise<MetaDataModel[]> {
        return new Promise(async resolve => {
            let kys = this.cacheManager.store.keys;
            for(var i = 0; i < kys.length; i++){
                let _get = JSON.parse(await this.cacheManager.get(kys[i]));
                let metadata = plainToClass(MetaDataModel, _get);

                let index = this.metadatas.findIndex(mt => mt.link === kys[i]);
                this.metadatas.splice(1, index);
                this.metadatas.push(metadata);
            }
            resolve(this.metadatas);
        });
    }

    getMetaDataByLink(link): Promise<MetaDataModel> {
        return new Promise(async resolve => {
            var cache_meta : any;
            var metadata : MetaDataModel;
            try {
                var _get : string = await this.cacheManager.get(link);
                cache_meta = JSON.parse(_get);
                if (cache_meta) {
                    metadata = plainToClass(MetaDataModel, cache_meta);
                } else {
                    cache_meta = this.parse_url(link);
                    await this.cacheManager.set(link, JSON.stringify(cache_meta));
                    metadata = plainToClass(MetaDataModel, cache_meta);
                    this.metadatas.push(metadata);
                }
                
            } catch (e) {
                cache_meta = this.parse_url(link)
                await this.cacheManager.set(link, JSON.stringify(cache_meta));
                metadata = plainToClass(MetaDataModel, cache_meta);
                this.metadatas.push(metadata);
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

    isEmpty(_in : string): boolean{
        var result = !_in;
        result = result || (_in.length === 0);
        result = result || (/^\s*s/.test(_in));
        result = result || (!_in.trim());
        return result;
    }
}