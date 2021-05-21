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
exports.MetadataResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const metadata_service_1 = require("../metadata/metadata.service");
const metadata_model_1 = require("./models/metadata.model");
let MetadataResolver = class MetadataResolver {
    constructor(metadataService) {
        this.metadataService = metadataService;
    }
    async getMetadatas() {
        return await this.metadataService.getMetaDatas();
    }
    async getMetadataByLink(link) {
        return await this.metadataService.getMetaDataByLink(link);
    }
};
__decorate([
    graphql_1.Query(type => [metadata_model_1.MetaDataModel]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], MetadataResolver.prototype, "getMetadatas", null);
__decorate([
    graphql_1.Query(type => metadata_model_1.MetaDataModel),
    __param(0, graphql_1.Args('link')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MetadataResolver.prototype, "getMetadataByLink", null);
MetadataResolver = __decorate([
    graphql_1.Resolver('MetaDataModel'),
    __metadata("design:paramtypes", [metadata_service_1.MetadataService])
], MetadataResolver);
exports.MetadataResolver = MetadataResolver;
//# sourceMappingURL=metadata.resolver.js.map