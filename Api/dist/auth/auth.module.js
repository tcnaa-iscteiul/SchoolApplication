"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const token_module_1 = require("../token/token.module");
const auth_service_1 = require("./auth.service");
const config_1 = require("@nestjs/config");
const user_module_1 = require("../users/user.module");
const local_strategy_1 = require("./strategy/local.strategy");
const jwt_strategy_1 = require("./strategy/jwt.strategy");
const auth_repository_1 = require("./auth.repository");
const auth_controller_1 = require("./auth.controller");
const mail_module_1 = require("../mail/mail.module");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            passport_1.PassportModule,
            user_module_1.UserModule,
            token_module_1.TokenModule,
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: {
                    expiresIn: '30s',
                },
            }),
            mail_module_1.MailModule,
        ],
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService, local_strategy_1.LocalStrategy, auth_repository_1.AuthRepository, jwt_strategy_1.JwtStrategy],
        exports: [jwt_1.JwtModule, auth_service_1.AuthService, auth_repository_1.AuthRepository],
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map