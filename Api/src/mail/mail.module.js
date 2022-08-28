"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MailModule = void 0;
var common_1 = require("@nestjs/common");
var mailer_1 = require("@nestjs-modules/mailer");
var mail_service_1 = require("./mail.service");
var mail_controller_1 = require("./mail.controller");
var config_1 = require("@nestjs/config");
var MailModule = /** @class */ (function () {
    function MailModule() {
    }
    MailModule = __decorate([
        (0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot(),
                mailer_1.MailerModule.forRoot({
                    transport: {
                        host: process.env.EMAIL_HOST,
                        port: process.env.EMAIL_PORT,
                        auth: {
                            user: process.env.USER,
                            pass: process.env.PASS
                        }
                    }
                }),
            ],
            controllers: [mail_controller_1.MailController],
            providers: [mail_service_1.MailService],
            exports: [mail_service_1.MailService]
        })
    ], MailModule);
    return MailModule;
}());
exports.MailModule = MailModule;
