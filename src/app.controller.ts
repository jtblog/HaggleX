import { Controller, Get, Render, Query, Param } from '@nestjs/common';
//import { AppService } from './app.service';

import { HttpService } from '@nestjs/common';
import { parse } from 'node-html-parser';
import * as flatted from 'flatted';
import { plainToClass } from 'class-transformer';
const url = require('url');
const sizeOf = require('image-size');

import { InMemoryDBService } from '@nestjs-addons/in-memory-db';
import { MetaDataModel } from './metadata.model';
import { METADATAS } from './metadatas.mock';


@Controller()
export class AppController {
  //constructor(private readonly appService: AppService) {}
  constructor(private readonly mtRepo: InMemoryDBService<MetaDataModel>,
    private readonly http: HttpService) {
    for (var i = 0; i < this.metadatas.length; i++) {
      this.mtRepo.create(this.metadatas[i]);
    }
  }

  metadatas = METADATAS;
  ttl = 1000 * 60;

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

  async _getMetaDatas(): Promise<MetaDataModel[]> {
    //return this.mtRepo.getAll();
    return new Promise(async resolve => {
      var _metadatas = [];
      try{
        _metadatas = await this.treatTTLMetaDatas();
      }catch(e){}
      resolve(_metadatas);
    });
  }

  async _getMetaDataByLink(link): Promise<MetaDataModel> {
    //return this.userService.get(id);
    return new Promise(async resolve => {
      var _metadata : MetaDataModel;
      try{
        var _metadatas = await this.treatTTLMetaDatas();
        _metadata = await this.mtRepo.query(record => record.link === link)[0];
        if (!this.isEmptyArray(_metadata)) {
          
        }else{
          var lastmetadata = _metadatas.slice(-1).pop();
          var new_id = 1 + "";
          if(!this.isEmptyObject(lastmetadata)){
            new_id = Number(lastmetadata.id) + 1 + "";
          }
          var cache_meta = await this.parse_url(link);
          //var metadata = await plainToClass(MetaDataModel, cache_meta);
          var metadata: MetaDataModel = {
            id: new_id,
            link: cache_meta['link'],
            title: cache_meta['title'],
            description: cache_meta['description'],
            largest_image: cache_meta['largest_image'],
            time_added: (new Date()).getTime()
          }
          await this.mtRepo.create(metadata);
        }
        _metadata = await this.mtRepo.query(record => record.link === link)[0];
      }catch(e){}
      resolve(_metadata);
    });
  }

  async treatTTLMetaDatas() : Promise<MetaDataModel[]> {
    return new Promise(async resolve => {
      var curr_time = (new Date()).getTime();
      var _metadatas = await this.mtRepo.getAll();
      for (var i = 0; i < _metadatas.length; i++) {
        try{
          var time_diff = curr_time - Number(_metadatas[i].time_added);
          if (time_diff > this.ttl || time_diff === this.ttl) {
            console.log(await this.mtRepo.delete(_metadatas[i].id));
          }
        }catch(e){}
      }
      _metadatas = await this.mtRepo.getAll();
      resolve(_metadatas);
    });
  }

  isEmptyString(_in: string): boolean {
    var result = !_in;
    result = result || (_in.length === 0);
    result = result || (/^\s*s/.test(_in));
    result = result || (!_in.trim());
    return result;
  }

  isEmptyObject(_in: any): boolean {
    var result = JSON.stringify(_in) === '{}';
    try {
      result = result || result === undefined;
      result = result || result === null;
      result = result || Object.keys(_in).length === 0;
    } catch (e) {
      result = true;
    }

    return result;
  }

  isEmptyArray(_in: any): boolean {
    var result = JSON.stringify(_in) === '[]';
    try {
      result = result || _in.length === 0;
    } catch (e) {
      result = true;
    }

    return result;
  }

  @Get()
  @Render('index')
  root() {
    //return this.appService.getHello();
  }

  @Get('metadata')
  async getMetaDatas(): Promise<MetaDataModel[]> {
    const metadatas = await this._getMetaDatas();
    return metadatas;
  }

  @Get()
  //@UseInterceptors(CacheInterceptor)
  async getMetaDataByLink(@Query() query) {
    var lnk = decodeURI(query.link).toString();
    const metadata = await this._getMetaDataByLink(lnk);
    return metadata;
  }

  @Get('metadata/:link')
  //@UseInterceptors(CacheInterceptor)
  async getMetaDataByLink2(@Param('link') link) {
    var lnk = decodeURI(link).toString();
    const metadata = await this._getMetaDataByLink(lnk);
    return metadata;
  }

}
