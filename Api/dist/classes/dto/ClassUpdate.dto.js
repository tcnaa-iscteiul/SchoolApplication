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
exports.ClassUpdateDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class ClassUpdateDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ClassUpdateDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsAlpha)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ClassUpdateDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(15),
    (0, class_validator_1.MaxLength)(50),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ClassUpdateDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => new Date(value)),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.MinDate)(new Date()),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], ClassUpdateDto.prototype, "startDate", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => new Date(value)),
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.Validate)(class_validator_1.MinDate, ['startDate']),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], ClassUpdateDto.prototype, "endDate", void 0);
exports.ClassUpdateDto = ClassUpdateDto;
//# sourceMappingURL=ClassUpdate.dto.js.map