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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenRepository = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../users/user.service");
const auth_repository_1 = require("../auth/auth.repository");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const token_schema_1 = require("./token.schema");
let TokenRepository = class TokenRepository {
    constructor(tokenModel, userService, authService) {
        this.tokenModel = tokenModel;
        this.userService = userService;
        this.authService = authService;
    }
    async save(hash, email, expireAt) {
        const objToken = await this.tokenModel.findOne({ email: email });
        if (objToken) {
            await this.tokenModel.findOneAndUpdate({ id: objToken.id }, {
                hash,
                expireAt
            }, {
                new: true,
            });
        }
        else {
            await new this.tokenModel({
                hash: hash,
                email: email,
                expireAt
            }).save();
        }
    }
    async refreshToken(oldToken) {
        const objToken = await this.tokenModel.findOne({ hash: oldToken });
        if (objToken) {
            const user = await this.userService.findEmail(objToken.email);
            return this.authService.login(user);
        }
        else {
            return new common_1.HttpException({
                errorMessage: "Invalid Token",
            }, common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async getUserByToken(oldToken) {
        const objToken = await this.tokenModel.findOne({ hash: oldToken });
        const today = new Date();
        today.setDate(today.getDate());
        if (objToken && today.getTime() <= new Date(objToken.expireAt).getTime()) {
            if (today.getTime() >= new Date(objToken.expireAt).getTime()) {
                return null;
            }
            const user = await this.userService.findEmail(objToken.email);
            return user;
        }
        else {
            return null;
        }
    }
    async deleteToken(token) {
        const result = await this.tokenModel.findOneAndDelete({
            token: token,
        });
        if (!result) {
            throw new common_1.NotFoundException(`Token with ID not found`);
        }
    }
};
TokenRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(token_schema_1.Token.name)),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => auth_repository_1.AuthRepository))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService,
        auth_repository_1.AuthRepository])
], TokenRepository);
exports.TokenRepository = TokenRepository;
//# sourceMappingURL=token.repository.js.map