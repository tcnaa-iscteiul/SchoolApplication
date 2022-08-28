"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.UserRepository = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var mongoose_2 = require("mongoose");
var User_schema_1 = require("./User.schema");
var bcrypt = require("bcrypt");
var UserRepository = /** @class */ (function () {
    function UserRepository(userModel) {
        this.userModel = userModel;
    }
    UserRepository.prototype.create = function (userCreatedto) {
        return __awaiter(this, void 0, void 0, function () {
            var email, password, status, role, firstName, lastName, phone, salt, hashedPassword, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = userCreatedto.email, password = userCreatedto.password, status = userCreatedto.status, role = userCreatedto.role, firstName = userCreatedto.firstName, lastName = userCreatedto.lastName, phone = userCreatedto.phone;
                        return [4 /*yield*/, bcrypt.genSalt()];
                    case 1:
                        salt = _a.sent();
                        return [4 /*yield*/, bcrypt.hash(password, salt)];
                    case 2:
                        hashedPassword = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, new this.userModel({
                                email: email.toLowerCase(),
                                password: hashedPassword,
                                status: status,
                                role: role,
                                firstName: firstName
                                    .charAt(0)
                                    .toUpperCase()
                                    .concat(firstName.substring(1).toLowerCase()),
                                lastName: lastName
                                    .charAt(0)
                                    .toUpperCase()
                                    .concat(lastName.substring(1).toLowerCase()),
                                phone: phone
                            }).save()];
                    case 4:
                        _a.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _a.sent();
                        if (error_1.code === 11000) {
                            throw new common_1.ConflictException("Username already exists!");
                        }
                        else {
                            throw new common_1.InternalServerErrorException();
                        }
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserRepository.prototype.findAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.find()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserRepository.prototype.findOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!mongoose_2["default"].Types.ObjectId.isValid(id)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.userModel.findOne({ _id: id })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/, null];
                }
            });
        });
    };
    UserRepository.prototype.findWithFilters = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var email, role, status;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = Object.is(filter.email, undefined) ? "" : filter.email;
                        role = Object.is(filter.role, undefined) ? "" : filter.role;
                        status = Object.is(filter.status, undefined) ? "" : filter.status;
                        return [4 /*yield*/, this.userModel.find({
                                $and: [
                                    {
                                        email: { $regex: email }
                                    },
                                    {
                                        role: { $regex: role }
                                    },
                                    {
                                        status: { $regex: status }
                                    },
                                ]
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserRepository.prototype.findEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.userModel.findOne({ email: email })];
            });
        });
    };
    UserRepository.prototype.update = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var newUser, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newUser = Object.fromEntries(Object.entries(user).filter(function (_a) {
                            var _ = _a[0], v = _a[1];
                            return v !== null && v !== "";
                        }));
                        return [4 /*yield*/, this.userModel.findOneAndUpdate({ email: user.email }, __assign({}, newUser), {
                                "new": true
                            })];
                    case 1:
                        result = _a.sent();
                        if (!result) {
                            throw new common_1.NotFoundException("User with ID not found");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserRepository.prototype["delete"] = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.findOneAndDelete({
                            email: user.email
                        })];
                    case 1:
                        result = _a.sent();
                        if (!result) {
                            throw new common_1.NotFoundException("User with ID not found");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserRepository.prototype.getNrUsers = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.find({ role: user.role }).count()];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    UserRepository = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, mongoose_1.InjectModel)(User_schema_1.User.name))
    ], UserRepository);
    return UserRepository;
}());
exports.UserRepository = UserRepository;
