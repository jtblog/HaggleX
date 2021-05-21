"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataService = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const node_html_parser_1 = require("node-html-parser");
const url = require('url');
const sizeOf = require('image-size');
const metadatas_mock_1 = require("../mocks/metadatas.mock");
const metadata_model_1 = require("./models/metadata.model");
const class_transformer_1 = require("class-transformer");
require("reflect-metadata");
let MetadataService = class MetadataService {
    constructor(cacheManager, http) {
        this.cacheManager = cacheManager;
        this.http = http;
        this.metadatas = metadatas_mock_1.METADATAS;
    }
    async getDimension(src) {
        return this.http.get(src, { responseType: 'arraybuffer' })
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
    parse_url(_url) {
        return this.http.get(_url)
            .toPromise()
            .then(async (res) => {
            var _html = res.data;
            var doc = node_html_parser_1.parse(res.data);
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
    async getCacheObject(key) {
        var result = await this.cacheManager.get(key)
            .then((value) => {
            result = JSON.parse(value);
        })
            .catch(err => {
            result = JSON.parse(JSON.stringify({}));
        });
        return result;
    }
    async setCacheObject(key, value) {
        var result = false;
        var v = await this.cacheManager.set(key, JSON.stringify(value))
            .then((value) => {
            result = true;
        })
            .catch(err => {
            result = false;
        });
        console.log(v);
        return result;
    }
    async getCacheKeys(key) {
        var result = await this.cacheManager.get(key)
            .then((value) => {
            result = JSON.parse(value);
        })
            .catch(err => {
            result = JSON.parse(JSON.stringify([]));
        });
        return result;
    }
    async setCacheKey(key, value) {
        var result = false;
        var v = await this.cacheManager.set(key, JSON.stringify(value))
            .then((value) => {
            result = true;
        })
            .catch(err => {
            result = false;
        });
        console.log(v);
        return result;
    }
    async addCacheKey(key) {
        var cache_kys = await this.getCacheKeys("keys");
        var t1 = this.isEmptyArray(cache_kys);
        if (t1) {
            cache_kys = [key];
        }
        else {
            cache_kys.push(key);
            cache_kys = cache_kys.concat(key);
        }
        return await this.setCacheKey("keys", cache_kys);
    }
    getMetaDatas() {
        return new Promise(async (resolve) => {
            var cache_kys = await this.getCacheKeys("keys");
            if (!this.isEmptyArray(cache_kys)) {
                for (var i = 0; i < cache_kys.length; i++) {
                    var cache_meta = await this.getCacheObject(cache_kys[i]);
                    if (!this.isEmptyObject(cache_meta)) {
                        var metadata = class_transformer_1.plainToClass(metadata_model_1.MetaDataModel, cache_meta);
                        this.metadatas.push(metadata);
                        this.metadatas = this.metadatas.concat(metadata);
                    }
                }
            }
            for (var i = 0; i < this.metadatas.length; i++) {
                if (this.isEmptyObject(this.metadatas[i])) {
                    this.metadatas.splice(1, i);
                }
            }
            resolve(this.metadatas);
        });
    }
    async getMetaDataByLink(link) {
        return new Promise(async (resolve) => {
            var cache_meta;
            var metadata;
            try {
                var cache_meta = await this.getCacheObject(link);
                if (!this.isEmptyObject(cache_meta)) {
                    metadata = class_transformer_1.plainToClass(metadata_model_1.MetaDataModel, cache_meta);
                }
                else {
                    cache_meta = this.parse_url(link);
                    var t0 = await this.setCacheObject(link, cache_meta);
                    var t1 = await this.addCacheKey(link);
                    if (t1 && t0) {
                        metadata = class_transformer_1.plainToClass(metadata_model_1.MetaDataModel, cache_meta);
                        this.metadatas.push(metadata);
                        this.metadatas = this.metadatas.concat(metadata);
                    }
                }
            }
            catch (e) {
                cache_meta = this.parse_url(link);
                var t0 = await this.setCacheObject(link, cache_meta);
                var t1 = await this.addCacheKey(link);
                if (t1 && t0) {
                    metadata = class_transformer_1.plainToClass(metadata_model_1.MetaDataModel, cache_meta);
                    this.metadatas.push(metadata);
                    this.metadatas = this.metadatas.concat(metadata);
                }
            }
            resolve(metadata);
        });
    }
    isEmpty(_in) {
        var result = !_in;
        result = result || (_in.length === 0);
        result = result || (/^\s*s/.test(_in));
        result = result || (!_in.trim());
        return result;
    }
    isEmptyObject(_in) {
        var result = JSON.stringify(_in) === '{}';
        try {
            result = result || Object.keys(_in).length === 0;
        }
        catch (e) {
            result = true;
        }
        return result;
    }
    isEmptyArray(_in) {
        var result = JSON.stringify(_in) === '[]';
        try {
            result = result || _in.length === 0;
        }
        catch (e) {
            result = true;
        }
        return result;
    }
};
MetadataService = __decorate([
    common_1.Injectable(),
    __param(0, common_1.Inject(common_1.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object, common_2.HttpService])
], MetadataService);
exports.MetadataService = MetadataService;
//# sourceMappingURL=metadata.service.js.map