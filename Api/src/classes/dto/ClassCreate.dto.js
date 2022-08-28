"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ClassCreateDto = void 0;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
var ClassCreateDto = /** @class */ (function () {
    function ClassCreateDto() {
    }
    __decorate([
        (0, class_validator_1.IsAlpha)(),
        (0, class_validator_1.MinLength)(2),
        (0, class_validator_1.MaxLength)(50),
        (0, class_validator_1.IsNotEmpty)()
    ], ClassCreateDto.prototype, "name");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.MinLength)(15),
        (0, class_validator_1.MaxLength)(50),
        (0, class_validator_1.IsNotEmpty)()
    ], ClassCreateDto.prototype, "description");
    __decorate([
        (0, class_transformer_1.Transform)(function (_a) {
            var value = _a.value;
            return new Date(value);
        }),
        (0, class_validator_1.IsDate)(),
        (0, class_validator_1.MinDate)(tomorrow),
        (0, class_validator_1.IsNotEmpty)()
    ], ClassCreateDto.prototype, "startDate");
    __decorate([
        (0, class_transformer_1.Transform)(function (_a) {
            var value = _a.value;
            return new Date(value);
        }),
        (0, class_validator_1.IsDate)(),
        (0, class_validator_1.MinDate)(tomorrow),
        (0, class_validator_1.IsNotEmpty)()
    ], ClassCreateDto.prototype, "endDate");
    return ClassCreateDto;
}());
exports.ClassCreateDto = ClassCreateDto;
