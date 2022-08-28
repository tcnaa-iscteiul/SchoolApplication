"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserUpdateDto = void 0;
var UserSearch_dto_1 = require("../dto/UserSearch.dto");
var class_validator_1 = require("class-validator");
var UserUpdateDto = /** @class */ (function () {
    function UserUpdateDto() {
    }
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsMongoId)()
    ], UserUpdateDto.prototype, "id");
    __decorate([
        (0, class_validator_1.IsEmail)()
    ], UserUpdateDto.prototype, "email");
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)()
    ], UserUpdateDto.prototype, "password");
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsEnum)(UserSearch_dto_1.Role)
    ], UserUpdateDto.prototype, "role");
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsEnum)(UserSearch_dto_1.Status)
    ], UserUpdateDto.prototype, "status");
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsAlpha)(),
        (0, class_validator_1.MinLength)(2),
        (0, class_validator_1.MaxLength)(20)
    ], UserUpdateDto.prototype, "firstName");
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsAlpha)(),
        (0, class_validator_1.MinLength)(2),
        (0, class_validator_1.MaxLength)(20)
    ], UserUpdateDto.prototype, "lastName");
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsPhoneNumber)("PT")
    ], UserUpdateDto.prototype, "phone");
    return UserUpdateDto;
}());
exports.UserUpdateDto = UserUpdateDto;
