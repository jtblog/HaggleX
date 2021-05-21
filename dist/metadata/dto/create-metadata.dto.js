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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMetaDataDTO = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const image_dto_1 = require("../dto/image_dto");
let CreateMetaDataDTO = class CreateMetaDataDTO {
};
__decorate([
    graphql_1.Field(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateMetaDataDTO.prototype, "title", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], CreateMetaDataDTO.prototype, "description", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], CreateMetaDataDTO.prototype, "link", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.IsObject(),
    class_validator_1.IsOptional(),
    class_transformer_1.Type(() => image_dto_1.ImageDTO),
    __metadata("design:type", image_dto_1.ImageDTO)
], CreateMetaDataDTO.prototype, "largest_image", void 0);
CreateMetaDataDTO = __decorate([
    graphql_1.InputType()
], CreateMetaDataDTO);
exports.CreateMetaDataDTO = CreateMetaDataDTO;
//# sourceMappingURL=create-metadata.dto.js.map