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
exports.ClassService = void 0;
const common_1 = require("@nestjs/common");
const class_repository_1 = require("./class.repository");
let ClassService = class ClassService {
    constructor(classRepository) {
        this.classRepository = classRepository;
    }
    async create(classCreateDto) {
        return await this.classRepository.create(classCreateDto);
    }
    async getAll() {
        return await this.classRepository.findAll();
    }
    classSearch(classSearchDto) {
        return this.classRepository.findWithFilters(classSearchDto);
    }
    async delete(classSearchDto) {
        return await this.classRepository.delete(classSearchDto);
    }
    async update(classUpdateDto) {
        return await this.classRepository.update(classUpdateDto);
    }
    async assignStudentsToClass(classSearchDto) {
        return await this.classRepository.assignStudentsToClass(classSearchDto);
    }
    async removeStudentsFromClass(classSearchDto) {
        return await this.classRepository.removeStudentsFromClass(classSearchDto);
    }
    async assignTeacherToClass(classSearchDto) {
        return await this.classRepository.assignTeacherToClass(classSearchDto);
    }
    async removeTeacherFromClass(classSearchDto) {
        return await this.classRepository.removeTeacherFromClass(classSearchDto);
    }
    async getNrClasses() {
        return await this.classRepository.getNrClasses();
    }
    async getClassByUser(email) {
        return await this.classRepository.getClassByUser(email);
    }
};
ClassService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [class_repository_1.ClassRepository])
], ClassService);
exports.ClassService = ClassService;
//# sourceMappingURL=class.service.js.map