"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ClassUpdateDto = void 0;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var ClassUpdateDto = /** @class */ (function () {
    function ClassUpdateDto() {
    }
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsMongoId)(),
        (0, class_validator_1.IsNotEmpty)()
    ], ClassUpdateDto.prototype, "id");
    __decorate([
        (0, class_validator_1.IsAlpha)(),
        (0, class_validator_1.MinLength)(2),
        (0, class_validator_1.MaxLength)(50),
        (0, class_validator_1.IsNotEmpty)()
    ], ClassUpdateDto.prototype, "name");
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MinLength)(15),
        (0, class_validator_1.MaxLength)(50),
        (0, class_validator_1.IsNotEmpty)()
    ], ClassUpdateDto.prototype, "description");
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Transform)(function (_a) {
            var value = _a.value;
            return new Date(value);
        }),
        (0, class_validator_1.IsDate)(),
        (0, class_validator_1.MinDate)(new Date()),
        (0, class_validator_1.IsNotEmpty)()
    ], ClassUpdateDto.prototype, "startDate");
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_transformer_1.Transform)(function (_a) {
            var value = _a.value;
            return new Date(value);
        }),
        (0, class_validator_1.IsDate)(),
        (0, class_validator_1.Validate)(class_validator_1.MinDate, ["startDate"]),
        (0, class_validator_1.IsNotEmpty)()
    ], ClassUpdateDto.prototype, "endDate");
    return ClassUpdateDto;
}());
exports.ClassUpdateDto = ClassUpdateDto;
