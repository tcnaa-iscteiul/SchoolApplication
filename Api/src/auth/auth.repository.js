"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AuthRepository = void 0;
var common_1 = require("@nestjs/common");
var bcrypt = require("bcrypt");
var token_repository_1 = require("../token/token.repository");
var UserStatus_dto_1 = require("../users/dto/UserStatus.dto");
var AuthRepository = /** @class */ (function () {
    function AuthRepository(userModel, jwtService, tokenService, mailService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.tokenService = tokenService;
        this.mailService = mailService;
    }
    AuthRepository.prototype.validateUser = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.userModel.findEmail(email)];
                    case 1:
                        user = _b.sent();
                        _a = user;
                        if (!_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, bcrypt.compare(password, user.password)];
                    case 2:
                        _a = (_b.sent());
                        _b.label = 3;
                    case 3:
                        if (_a &&
                            user.status === UserStatus_dto_1.Status.Active) {
                            return [2 /*return*/, user];
                        }
                        return [2 /*return*/, null];
                }
            });
        });
    };
    AuthRepository.prototype.login = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var email, payload, accessToken, role, status, expireAt, expired;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = user.email;
                        payload = { email: email };
                        return [4 /*yield*/, this.jwtService.sign(payload)];
                    case 1:
                        accessToken = _a.sent();
                        role = user.role;
                        status = user.status;
                        expireAt = new Date();
                        expireAt.setDate(expireAt.getDate() + 1);
                        expired = expireAt.toISOString();
                        this.tokenService.save(accessToken, email, expired);
                        return [2 /*return*/, { accessToken: accessToken, role: role, status: status }];
                }
            });
        });
    };
    AuthRepository.prototype.loginToken = function (token) {
        return __awaiter(this, void 0, void 0, function () {
            var user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.tokenService.getUserByToken(token)];
                    case 1:
                        user = _a.sent();
                        if (user) {
                            return [2 /*return*/, this.login(user)];
                        }
                        else {
                            return [2 /*return*/, new common_1.HttpException({
                                    errorMessage: "Invalid Token"
                                }, common_1.HttpStatus.UNAUTHORIZED)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthRepository.prototype.changePassword = function (userUpdatePasswordDto) {
        return __awaiter(this, void 0, void 0, function () {
            var token, password, user, salt, hashedPassword, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = userUpdatePasswordDto.token, password = userUpdatePasswordDto.password;
                        return [4 /*yield*/, this.tokenService.getUserByToken(token)];
                    case 1:
                        user = _a.sent();
                        if (!user) return [3 /*break*/, 5];
                        return [4 /*yield*/, bcrypt.genSalt()];
                    case 2:
                        salt = _a.sent();
                        return [4 /*yield*/, bcrypt.hash(password, salt)];
                    case 3:
                        hashedPassword = _a.sent();
                        user.password = hashedPassword;
                        return [4 /*yield*/, this.userModel.update(user)];
                    case 4:
                        response = _a.sent();
                        return [2 /*return*/, response];
                    case 5: return [2 /*return*/, new common_1.HttpException({
                            errorMessage: "Invalid URL"
                        }, common_1.HttpStatus.UNAUTHORIZED)];
                }
            });
        });
    };
    AuthRepository.prototype.forgotPassword = function (userSearch) {
        return __awaiter(this, void 0, void 0, function () {
            var user, accessToken, forgotLink;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.findEmail(userSearch.email)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, new common_1.HttpException({
                                    errorMessage: "Invalid email"
                                }, common_1.HttpStatus.UNAUTHORIZED)];
                        }
                        return [4 /*yield*/, this.login(user)];
                    case 2:
                        accessToken = (_a.sent()).accessToken;
                        forgotLink = "http:localhost:3000/changePassword?token=".concat(accessToken);
                        return [4 /*yield*/, this.mailService.send({
                                from: "noreply@schoolApplication.com",
                                to: user.email,
                                subject: "Forgot Password",
                                html: "\n                <h3>Hello ".concat(user.firstName, "!</h3>\n                <p>Please use this <a href=\"").concat(forgotLink, "\">link</a> to reset your password.</p>\n            ")
                            })];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthRepository = __decorate([
        (0, common_1.Injectable)(),
        __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(function () { return token_repository_1.TokenRepository; })))
    ], AuthRepository);
    return AuthRepository;
}());
exports.AuthRepository = AuthRepository;
