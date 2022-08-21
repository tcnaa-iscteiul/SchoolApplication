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
exports.RolesGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_decode_1 = require("jwt-decode");
const UserStatus_dto_1 = require("./users/dto/UserStatus.dto");
const user_service_1 = require("./users/user.service");
let RolesGuard = class RolesGuard {
    constructor(reflector, userService) {
        this.reflector = reflector;
        this.userService = userService;
    }
    async canActivate(context) {
        try {
            const token = context
                .getArgs()[0]
                .headers.authorization.split(" ")[1];
            const { email } = (0, jwt_decode_1.default)(token);
            const user = await this.userService.findEmail(email);
            const roles = this.reflector.get("roles", context.getHandler());
            const total_roles = roles.filter((role) => role === user.role && user.status === UserStatus_dto_1.Status.Active);
            return total_roles.length >= 1;
        }
        catch (err) {
            new common_1.HttpException({
                errorMessage: "Missing Token",
            }, common_1.HttpStatus.UNAUTHORIZED);
        }
    }
};
RolesGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        user_service_1.UserService])
], RolesGuard);
exports.RolesGuard = RolesGuard;
//# sourceMappingURL=roles.guard.js.map