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
var _a, _b, _c, _d, _e, _f, _g, _h, _j;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassController = void 0;
const common_1 = require("@nestjs/common");
const AssignTeacherToClass_dto_1 = require("./dto/AssignTeacherToClass.dto");
const ClassCreate_dto_1 = require("./dto/ClassCreate.dto");
const ClassSearch_dto_1 = require("./dto/ClassSearch.dto");
const ClassUpdate_dto_1 = require("./dto/ClassUpdate.dto");
const StudentToClass_dto_1 = require("./dto/StudentToClass.dto");
const class_service_1 = require("./service/class.service");
let ClassController = class ClassController {
    constructor(classService) {
        this.classService = classService;
    }
    async create(classCreateDto) {
        return await this.classService.create(classCreateDto);
    }
    async getAll(param) {
        if (Object.keys(param).length) {
            return this.classService.classSearch(param);
        }
        else {
            return this.classService.getAll();
        }
    }
    async updateClass(classUpdateDto) {
        return await this.classService.update(classUpdateDto);
    }
    async deleteClass(param) {
        return await this.classService.delete(param);
    }
    async assignStudentsToClass(classSearchDto) {
        return await this.classService.assignStudentsToClass(classSearchDto);
    }
    async removeStudentsFromClass(classSearchDto) {
        return await this.classService.removeStudentsFromClass(classSearchDto);
    }
    async assignTeacherToClass(classSearchDto) {
        return await this.classService.assignTeacherToClass(classSearchDto);
    }
    async removeTeacherFromClass(classSearchDto) {
        return await this.classService.removeTeacherFromClass(classSearchDto);
    }
    async getNrClasses() {
        return await this.classService.getNrClasses();
    }
    async getClassByUser() {
        return await this.classService.getClassByUser();
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof ClassCreate_dto_1.ClassCreateDto !== "undefined" && ClassCreate_dto_1.ClassCreateDto) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "create", null);
__decorate([
    (0, common_1.Get)("/all"),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof ClassSearch_dto_1.ClassSearchDto !== "undefined" && ClassSearch_dto_1.ClassSearchDto) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "getAll", null);
__decorate([
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_c = typeof ClassUpdate_dto_1.ClassUpdateDto !== "undefined" && ClassUpdate_dto_1.ClassUpdateDto) === "function" ? _c : Object]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "updateClass", null);
__decorate([
    (0, common_1.Delete)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_d = typeof ClassUpdate_dto_1.ClassUpdateDto !== "undefined" && ClassUpdate_dto_1.ClassUpdateDto) === "function" ? _d : Object]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "deleteClass", null);
__decorate([
    (0, common_1.Patch)("/student"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_e = typeof StudentToClass_dto_1.StudentToClassDto !== "undefined" && StudentToClass_dto_1.StudentToClassDto) === "function" ? _e : Object]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "assignStudentsToClass", null);
__decorate([
    (0, common_1.Patch)("/removeStudent"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_f = typeof StudentToClass_dto_1.StudentToClassDto !== "undefined" && StudentToClass_dto_1.StudentToClassDto) === "function" ? _f : Object]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "removeStudentsFromClass", null);
__decorate([
    (0, common_1.Patch)("/assign"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_g = typeof AssignTeacherToClass_dto_1.TeacherToClassDto !== "undefined" && AssignTeacherToClass_dto_1.TeacherToClassDto) === "function" ? _g : Object]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "assignTeacherToClass", null);
__decorate([
    (0, common_1.Patch)("/remove"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_h = typeof AssignTeacherToClass_dto_1.TeacherToClassDto !== "undefined" && AssignTeacherToClass_dto_1.TeacherToClassDto) === "function" ? _h : Object]),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "removeTeacherFromClass", null);
__decorate([
    (0, common_1.Get)("/nr"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "getNrClasses", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClassController.prototype, "getClassByUser", null);
ClassController = __decorate([
    (0, common_1.Controller)("class"),
    __metadata("design:paramtypes", [typeof (_j = typeof class_service_1.ClassService !== "undefined" && class_service_1.ClassService) === "function" ? _j : Object])
], ClassController);
exports.ClassController = ClassController;
//# sourceMappingURL=class.controller.js.map