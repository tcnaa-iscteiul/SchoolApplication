"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const Class_schema_1 = require("../classes/Class.schema");
const class_controller_1 = require("../classes/class.controller");
const class_service_1 = require("../classes/class.service");
const class_repository_1 = require("../classes/class.repository");
const user_module_1 = require("../users/user.module");
const common_2 = require("@nestjs/common");
let ClassModule = class ClassModule {
};
ClassModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            mongoose_1.MongooseModule.forFeature([
                { name: Class_schema_1.Class.name, schema: Class_schema_1.ClassSchema },
            ]),
            (0, common_2.forwardRef)(() => user_module_1.UserModule),
        ],
        controllers: [class_controller_1.ClassController],
        providers: [
            class_repository_1.ClassRepository,
            class_service_1.ClassService,
        ],
        exports: [class_service_1.ClassService]
    })
], ClassModule);
exports.ClassModule = ClassModule;
//# sourceMappingURL=class.module.js.map