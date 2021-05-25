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
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const node_html_parser_1 = require("node-html-parser");
const url = require('url');
const sizeOf = require('image-size');
const in_memory_db_1 = require("@nestjs-addons/in-memory-db");
const metadatas_mock_1 = require("./metadatas.mock");
let AppController = class AppController {
    constructor(mtRepo, http) {
        this.mtRepo = mtRepo;
        this.http = http;
        this.metadatas = metadatas_mock_1.METADATAS;
        this.ttl = 1000 * 60;
        for (var i = 0; i < this.metadatas.length; i++) {
            this.mtRepo.create(this.metadatas[i]);
        }
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
    async _getMetaDatas() {
        return new Promise(async (resolve) => {
            var _metadatas = [];
            try {
                _metadatas = await this.treatTTLMetaDatas();
            }
            catch (e) { }
            resolve(_metadatas);
        });
    }
    async _getMetaDataByLink(link) {
        return new Promise(async (resolve) => {
            var _metadata;
            try {
                var _metadatas = await this.treatTTLMetaDatas();
                _metadata = await this.mtRepo.query(record => record.link === link)[0];
                if (!this.isEmptyArray(_metadata)) {
                }
                else {
                    var lastmetadata = _metadatas.slice(-1).pop();
                    var new_id = 1 + "";
                    if (!this.isEmptyObject(lastmetadata)) {
                        new_id = Number(lastmetadata.id) + 1 + "";
                    }
                    var cache_meta = await this.parse_url(link);
                    var metadata = {
                        id: new_id,
                        link: cache_meta['link'],
                        title: cache_meta['title'],
                        description: cache_meta['description'],
                        largest_image: cache_meta['largest_image'],
                        time_added: (new Date()).getTime()
                    };
                    await this.mtRepo.create(metadata);
                }
                _metadata = await this.mtRepo.query(record => record.link === link)[0];
            }
            catch (e) { }
            resolve(_metadata);
        });
    }
    async treatTTLMetaDatas() {
        return new Promise(async (resolve) => {
            var curr_time = (new Date()).getTime();
            var _metadatas = await this.mtRepo.getAll();
            for (var i = 0; i < _metadatas.length; i++) {
                try {
                    var time_diff = curr_time - Number(_metadatas[i].time_added);
                    if (time_diff > this.ttl || time_diff === this.ttl) {
                        console.log(await this.mtRepo.delete(_metadatas[i].id));
                    }
                }
                catch (e) { }
            }
            _metadatas = await this.mtRepo.getAll();
            resolve(_metadatas);
        });
    }
    isEmptyString(_in) {
        var result = !_in;
        result = result || (_in.length === 0);
        result = result || (/^\s*s/.test(_in));
        result = result || (!_in.trim());
        return result;
    }
    isEmptyObject(_in) {
        var result = JSON.stringify(_in) === '{}';
        try {
            result = result || result === undefined;
            result = result || result === null;
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
    root() {
    }
    async getMetaDatas() {
        const metadatas = await this._getMetaDatas();
        return metadatas;
    }
    async getMetaDataByLink(query) {
        var lnk = decodeURI(query.link).toString();
        const metadata = await this._getMetaDataByLink(lnk);
        return metadata;
    }
    async getMetaDataByLink2(link) {
        var lnk = decodeURI(link).toString();
        const metadata = await this._getMetaDataByLink(lnk);
        return metadata;
    }
};
__decorate([
    common_1.Get(),
    common_1.Render('index'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AppController.prototype, "root", null);
__decorate([
    common_1.Get('metadata'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getMetaDatas", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getMetaDataByLink", null);
__decorate([
    common_1.Get('metadata/:link'),
    __param(0, common_1.Param('link')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getMetaDataByLink2", null);
AppController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [in_memory_db_1.InMemoryDBService,
        common_2.HttpService])
], AppController);
exports.AppController = AppController;
//# sourceMappingURL=app.controller.js.map