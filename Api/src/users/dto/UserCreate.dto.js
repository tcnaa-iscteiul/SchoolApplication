"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserCreateDto = void 0;
var class_validator_1 = require("class-validator");
var UserSearch_dto_1 = require("../dto/UserSearch.dto");
var UserCreateDto = /** @class */ (function () {
    function UserCreateDto() {
    }
    __decorate([
        (0, class_validator_1.IsEnum)(UserSearch_dto_1.Role)
    ], UserCreateDto.prototype, "role");
    __decorate([
        (0, class_validator_1.IsEnum)(UserSearch_dto_1.Status)
    ], UserCreateDto.prototype, "status");
    __decorate([
        (0, class_validator_1.IsAlpha)(),
        (0, class_validator_1.MinLength)(2),
        (0, class_validator_1.MaxLength)(20)
    ], UserCreateDto.prototype, "firstName");
    __decorate([
        (0, class_validator_1.IsAlpha)(),
        (0, class_validator_1.MinLength)(2),
        (0, class_validator_1.MaxLength)(20)
    ], UserCreateDto.prototype, "lastName");
    __decorate([
        (0, class_validator_1.IsPhoneNumber)("PT")
    ], UserCreateDto.prototype, "phone");
    __decorate([
        (0, class_validator_1.IsEmail)()
    ], UserCreateDto.prototype, "email");
    __decorate([
        (0, class_validator_1.IsString)()
    ], UserCreateDto.prototype, "password");
    return UserCreateDto;
}());
exports.UserCreateDto = UserCreateDto;
