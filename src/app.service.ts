import { Injectable} from '@nestjs/common';

import { HttpService } from '@nestjs/common';
import { parse } from 'node-html-parser';
import * as flatted from 'flatted';
const url = require('url');
const sizeOf = require('image-size');

@Injectable()
export class AppService {
  
  constructor(private readonly http: HttpService) {}

  getHello(): string {
    return 'Hello World!';
  }

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
        return {'dimension': dimension, 'base64': base64, 'src': src};
      })
      .catch(err => {
        return err;
      });
  }

  parse_url(_url: string){
    return this.http.get(_url)
    .toPromise()
    .then(async res => {
      var _html = res.data;
      var doc = parse(res.data);
      //const dom = new JSDOM(_html, { runScripts: "dangerously", pretendToBeVisual: true } );

      var title = doc.querySelector('title').textContent;
      var desc = doc.querySelector('meta[name="description"]').getAttribute('content');
      var result = {'title': title, 'description': desc, 'link': _url};

      var maxImage = null;
      var maxSize = 0;
      var imgs = doc.querySelectorAll('img');
      for(var i = 0; i < imgs.length; i++){
        const src = new URL(imgs[i].getAttribute('src'), _url).toString();
        const _dim = await this.getDimension(src);

        var currSize = _dim['dimension'].width * _dim['dimension'].height;
        if(maxSize < currSize){
          maxSize = currSize;
          maxImage = _dim;
        }
      }
      result['image'] = maxImage;

      return flatted.stringify(result);
    })
    .catch(err => {
      return err;
    });
  }

}
