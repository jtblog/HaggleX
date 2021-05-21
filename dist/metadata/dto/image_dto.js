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
exports.ImageDTO = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const dimension_dto_1 = require("../dto/dimension_dto");
let ImageDTO = class ImageDTO {
};
__decorate([
    graphql_1.Field(),
    class_validator_1.IsString(),
    __metadata("design:type", String)
], ImageDTO.prototype, "src", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.IsString(),
    class_validator_1.IsBase64(),
    __metadata("design:type", String)
], ImageDTO.prototype, "base64", void 0);
__decorate([
    graphql_1.Field(),
    class_validator_1.IsObject(),
    class_transformer_1.Type(() => dimension_dto_1.DimensionDTO),
    __metadata("design:type", dimension_dto_1.DimensionDTO)
], ImageDTO.prototype, "dimension", void 0);
ImageDTO = __decorate([
    graphql_1.InputType()
], ImageDTO);
exports.ImageDTO = ImageDTO;
//# sourceMappingURL=image_dto.js.map