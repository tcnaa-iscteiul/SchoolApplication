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
exports.ClassCreateDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
tomorrow.toLocaleString();
class ClassCreateDto {
}
__decorate([
    (0, class_validator_1.IsAlpha)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ClassCreateDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(15),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ClassCreateDto.prototype, "description", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => new Date(value)),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.MinDate)(tomorrow),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], ClassCreateDto.prototype, "startDate", void 0);
__decorate([
    (0, class_transformer_1.Transform)(({ value }) => new Date(value)),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.MinDate)(tomorrow),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], ClassCreateDto.prototype, "endDate", void 0);
exports.ClassCreateDto = ClassCreateDto;
//# sourceMappingURL=ClassCreate.dto.js.map