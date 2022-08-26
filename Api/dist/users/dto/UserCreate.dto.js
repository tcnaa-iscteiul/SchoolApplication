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
exports.UserCreateDto = void 0;
const class_validator_1 = require("class-validator");
const UserSearch_dto_1 = require("../dto/UserSearch.dto");
class UserCreateDto {
}
__decorate([
    (0, class_validator_1.IsEnum)(UserSearch_dto_1.Role),
    __metadata("design:type", String)
], UserCreateDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(UserSearch_dto_1.Status),
    __metadata("design:type", String)
], UserCreateDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsAlpha)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], UserCreateDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsAlpha)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], UserCreateDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsPhoneNumber)('PT'),
    __metadata("design:type", String)
], UserCreateDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UserCreateDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserCreateDto.prototype, "password", void 0);
exports.UserCreateDto = UserCreateDto;
//# sourceMappingURL=UserCreate.dto.js.map