"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const metadata_service_1 = require("./metadata/metadata.service");
const metadata_controller_1 = require("./metadata/metadata.controller");
const graphql_1 = require("@nestjs/graphql");
const metadata_module_1 = require("./metadata/metadata.module");
const metadata_resolver_1 = require("./metadata/metadata.resolver");
const path_1 = require("path");
const serve_static_1 = require("@nestjs/serve-static");
const common_2 = require("@nestjs/common");
let AppModule = class AppModule {
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            common_1.HttpModule, metadata_module_1.MetadataModule,
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: path_1.join(__dirname, '..', 'public'),
            }),
            graphql_1.GraphQLModule.forRoot({
                autoSchemaFile: true,
                introspection: true,
                playground: true
            }),
            common_2.CacheModule.register({
                ttl: 120
            })
        ],
        controllers: [app_controller_1.AppController, metadata_controller_1.MetadataController],
        providers: [app_service_1.AppService, metadata_service_1.MetadataService, metadata_resolver_1.MetadataResolver],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map