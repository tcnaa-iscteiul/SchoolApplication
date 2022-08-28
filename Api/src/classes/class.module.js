"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ClassModule = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var Class_schema_1 = require("../classes/Class.schema");
var class_controller_1 = require("../classes/class.controller");
var class_service_1 = require("../classes/class.service");
var class_repository_1 = require("../classes/class.repository");
var user_module_1 = require("../users/user.module");
var common_2 = require("@nestjs/common");
var ClassModule = /** @class */ (function () {
    function ClassModule() {
    }
    ClassModule = __decorate([
        (0, common_1.Module)({
            imports: [
                user_module_1.UserModule,
                mongoose_1.MongooseModule.forFeature([{ name: Class_schema_1.Class.name, schema: Class_schema_1.ClassSchema }]),
                (0, common_2.forwardRef)(function () { return user_module_1.UserModule; }),
            ],
            controllers: [class_controller_1.ClassController],
            providers: [class_repository_1.ClassRepository, class_service_1.ClassService],
            exports: [class_service_1.ClassService]
        })
    ], ClassModule);
    return ClassModule;
}());
exports.ClassModule = ClassModule;
