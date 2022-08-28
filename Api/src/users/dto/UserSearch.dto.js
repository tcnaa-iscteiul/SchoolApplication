"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserSearchDto = exports.Status = exports.Role = void 0;
var class_validator_1 = require("class-validator");
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
var UserSearchDto = /** @class */ (function () {
    function UserSearchDto() {
    }
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsMongoId)()
    ], UserSearchDto.prototype, "id");
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsEmail)()
    ], UserSearchDto.prototype, "email");
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsString)()
    ], UserSearchDto.prototype, "password");
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsEnum)(Role)
    ], UserSearchDto.prototype, "role");
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsEnum)(Status)
    ], UserSearchDto.prototype, "status");
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsAlpha)(),
        (0, class_validator_1.MinLength)(2),
        (0, class_validator_1.MaxLength)(20)
    ], UserSearchDto.prototype, "firstName");
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsAlpha)(),
        (0, class_validator_1.MinLength)(2),
        (0, class_validator_1.MaxLength)(20)
    ], UserSearchDto.prototype, "lastName");
    __decorate([
        (0, class_validator_1.IsOptional)(),
        (0, class_validator_1.IsPhoneNumber)("PT")
    ], UserSearchDto.prototype, "phone");
    return UserSearchDto;
}());
exports.UserSearchDto = UserSearchDto;
