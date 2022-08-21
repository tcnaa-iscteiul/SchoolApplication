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
exports.AuthRepository = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const user_repository_1 = require("../users/user.repository");
const token_repository_1 = require("../token/token.repository");
const UserStatus_dto_1 = require("../users/dto/UserStatus.dto");
const mail_service_1 = require("../mail/mail.service");
let AuthRepository = class AuthRepository {
    constructor(userModel, jwtService, tokenService, mailService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.tokenService = tokenService;
        this.mailService = mailService;
    }
    async validateUser(email, password) {
        const user = await this.userModel.findEmail(email);
        if (user &&
            (await bcrypt.compare(password, user.password)) &&
            user.status === UserStatus_dto_1.Status.Active) {
            return user;
        }
        return null;
    }
    async login(user) {
        const { email } = user;
        const payload = { email };
        const accessToken = await this.jwtService.sign(payload);
        const role = user.role;
        const status = user.status;
        const expireAt = new Date();
        expireAt.setDate(expireAt.getDate() + 1);
        const expired = expireAt.toISOString();
        this.tokenService.save(accessToken, email, expired);
        return { accessToken, role, status };
    }
    async loginToken(token) {
        const user = await this.tokenService.getUserByToken(token);
        if (user) {
            return this.login(user);
        }
        else {
            return new common_1.HttpException({
                errorMessage: "Invalid Token",
            }, common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async changePassword(userUpdatePasswordDto) {
        const { token, password } = userUpdatePasswordDto;
        const user = await this.tokenService.getUserByToken(token);
        if (user) {
            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;
            const response = await this.userModel.update(user);
            return response;
        }
        else {
            return new common_1.HttpException({
                errorMessage: "Invalid URL",
            }, common_1.HttpStatus.UNAUTHORIZED);
        }
    }
    async forgotPassword(userSearch) {
        const user = await this.userModel.findEmail(userSearch.email);
        if (!user) {
            return new common_1.HttpException({
                errorMessage: "Invalid email",
            }, common_1.HttpStatus.UNAUTHORIZED);
        }
        const { accessToken } = await this.login(user);
        const forgotLink = `http:localhost:3000/changePassword?token=${accessToken}`;
        await this.mailService.send({
            from: "noreply@schoolApplication.com",
            to: user.email,
            subject: 'Forgot Password',
            html: `
                <h3>Hello ${user.firstName}!</h3>
                <p>Please use this <a href="${forgotLink}">link</a> to reset your password.</p>
            `,
        });
    }
};
AuthRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(() => token_repository_1.TokenRepository))),
    __metadata("design:paramtypes", [user_repository_1.UserRepository,
        jwt_1.JwtService,
        token_repository_1.TokenRepository,
        mail_service_1.MailService])
], AuthRepository);
exports.AuthRepository = AuthRepository;
//# sourceMappingURL=auth.repository.js.map