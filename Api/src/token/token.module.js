"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TokenModule = void 0;
var common_1 = require("@nestjs/common");
var auth_module_1 = require("../../../../../../../../../../src/auth/auth.module");
var user_module_1 = require("../users/user.module");
var token_controller_1 = require("./token.controller");
var token_service_1 = require("./token.service");
var mongoose_1 = require("@nestjs/mongoose");
var token_schema_1 = require("./token.schema");
var token_repository_1 = require("./token.repository");
var TokenModule = /** @class */ (function () {
    function TokenModule() {
    }
    TokenModule = __decorate([
        (0, common_1.Module)({
            imports: [
                (0, common_1.forwardRef)(function () { return auth_module_1.AuthModule; }),
                user_module_1.UserModule,
                mongoose_1.MongooseModule.forFeature([{ name: token_schema_1.Token.name, schema: token_schema_1.TokenSchema }]),
            ],
            controllers: [token_controller_1.TokenController],
            providers: [token_service_1.TokenService, token_repository_1.TokenRepository],
            exports: [token_service_1.TokenService, token_repository_1.TokenRepository]
        })
    ], TokenModule);
    return TokenModule;
}());
exports.TokenModule = TokenModule;
