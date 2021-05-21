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
exports.MetadataController = void 0;
const common_1 = require("@nestjs/common");
const metadata_service_1 = require("../metadata/metadata.service");
const common_2 = require("@nestjs/common");
let MetadataController = class MetadataController {
    constructor(cacheManager, metadataService) {
        this.cacheManager = cacheManager;
        this.metadataService = metadataService;
    }
    async getMetaDatas() {
        const metadatas = await this.metadataService.getMetaDatas();
        return metadatas;
    }
    async getMetaDataByLink(query) {
        var lnk = decodeURI(query.link).toString();
        const metadata = await this.metadataService.getMetaDataByLink(lnk);
        return metadata;
    }
    async getMetaDataByLink2(link) {
        var lnk = decodeURI(link).toString();
        const metadata = await this.metadataService.getMetaDataByLink(lnk);
        return metadata;
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MetadataController.prototype, "getMetaDatas", null);
__decorate([
    common_1.Get(),
    __param(0, common_1.Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MetadataController.prototype, "getMetaDataByLink", null);
__decorate([
    common_1.Get(':link'),
    __param(0, common_1.Param('link')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], MetadataController.prototype, "getMetaDataByLink2", null);
MetadataController = __decorate([
    common_1.Controller('metadata'),
    __param(0, common_2.Inject(common_2.CACHE_MANAGER)),
    __metadata("design:paramtypes", [Object, metadata_service_1.MetadataService])
], MetadataController);
exports.MetadataController = MetadataController;
//# sourceMappingURL=metadata.controller.js.map