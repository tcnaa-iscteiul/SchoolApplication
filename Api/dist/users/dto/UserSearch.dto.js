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
exports.UserSearchDto = exports.Status = exports.Role = void 0;
const class_validator_1 = require("class-validator");
var Role;
(function (Role) {
    Role["Admin"] = "Admin";
    Role["Student"] = "Student";
    Role["Teacher"] = "Teacher";
})(Role = exports.Role || (exports.Role = {}));
var Status;
(function (Status) {
    Status["Active"] = "Active";
    Status["Pending"] = "Pending";
    Status["Inactive"] = "Inactive";
})(Status = exports.Status || (exports.Status = {}));
class UserSearchDto {
}
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsMongoId)(),
    __metadata("design:type", String)
], UserSearchDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], UserSearchDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserSearchDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(Role),
    __metadata("design:type", String)
], UserSearchDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(Status),
    __metadata("design:type", String)
], UserSearchDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsAlpha)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], UserSearchDto.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsAlpha)(),
    (0, class_validator_1.MinLength)(2),
    (0, class_validator_1.MaxLength)(20),
    __metadata("design:type", String)
], UserSearchDto.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsPhoneNumber)('PT'),
    __metadata("design:type", String)
], UserSearchDto.prototype, "phone", void 0);
exports.UserSearchDto = UserSearchDto;
//# sourceMappingURL=UserSearch.dto.js.map