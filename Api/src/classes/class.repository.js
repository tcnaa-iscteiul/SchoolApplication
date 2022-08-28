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
exports.ClassRepository = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var class_schema_1 = require("./class.schema");
var UserRole_dto_1 = require("../users/dto/UserRole.dto");
var user_repository_1 = require("../users/user.repository");
var ClassRepository = /** @class */ (function () {
    function ClassRepository(classModel, userModel) {
        this.classModel = classModel;
        this.userModel = userModel;
    }
    //Create a class, and if already exists a class with the same name, return an error
    ClassRepository.prototype.create = function (classCreateDto) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    new this.classModel(classCreateDto).save();
                }
                catch (error) {
                    if (error.code === 11000) {
                        throw new common_1.ConflictException("Class with this name already exists!");
                    }
                    else {
                        throw new common_1.InternalServerErrorException();
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    //Find all the classes and populate the table with the data of the teacher and students
    ClassRepository.prototype.findAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.classModel.find().populate("teacher students")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    //Find with filters (name, description, startDate or endDate)
    ClassRepository.prototype.findWithFilters = function (filter) {
        return __awaiter(this, void 0, void 0, function () {
            var name, description, startDate, endDate;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = Object.is(filter.name, undefined) ? "" : filter.name;
                        description = Object.is(filter.description, undefined)
                            ? ""
                            : filter.description;
                        startDate = Object.is(filter.startDate, undefined)
                            ? ""
                            : filter.startDate;
                        endDate = Object.is(filter.endDate, undefined) ? "" : filter.endDate;
                        return [4 /*yield*/, this.classModel
                                .find({
                                $and: [
                                    {
                                        name: {
                                            $regex: name
                                        }
                                    },
                                    {
                                        description: {
                                            $regex: description
                                        }
                                    },
                                    {
                                        startDate: {
                                            $regex: startDate
                                        }
                                    },
                                    {
                                        endDate: { $regex: endDate }
                                    },
                                ]
                            })
                                .populate("teacher students")
                                .exec()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    ClassRepository.prototype["delete"] = function (classSearchDto) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.classModel
                            .findOneAndDelete({ name: classSearchDto.name })
                            .exec()];
                    case 1:
                        result = _a.sent();
                        if (!result) {
                            throw new common_1.NotFoundException("Class with ID not found");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ClassRepository.prototype.update = function (classUpdateDto) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.classModel.findOneAndUpdate({ name: classUpdateDto.name }, {
                            name: classUpdateDto.name,
                            description: classUpdateDto.description,
                            startDate: classUpdateDto.startDate,
                            endDate: classUpdateDto.endDate
                        }, {
                            "new": true
                        })];
                    case 1:
                        result = _a.sent();
                        if (!result) {
                            throw new common_1.NotFoundException("Class with ID not found");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ClassRepository.prototype.assignStudentsToClass = function (classSearchDto) {
        return __awaiter(this, void 0, void 0, function () {
            var name, newStudents, findStudent, res, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = classSearchDto.name, newStudents = classSearchDto.newStudents;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.userModel.findOne({
                                email: newStudents,
                                role: UserRole_dto_1.Role.Student
                            })];
                    case 2:
                        findStudent = _a.sent();
                        if (!findStudent) {
                            throw new common_1.NotFoundException("User with ID not found");
                        }
                        return [4 /*yield*/, this.classModel.findOneAndUpdate({ name: name }, { $addToSet: { students: findStudent._id } })];
                    case 3:
                        res = _a.sent();
                        if (!res) {
                            throw new common_1.NotFoundException("User with ID not found");
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        throw new common_1.NotFoundException(err_1.message);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ClassRepository.prototype.removeStudentsFromClass = function (classSearchDto) {
        return __awaiter(this, void 0, void 0, function () {
            var name, newStudents, findStudent, res, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = classSearchDto.name, newStudents = classSearchDto.newStudents;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.userModel.findOne({
                                email: newStudents,
                                role: UserRole_dto_1.Role.Student
                            })];
                    case 2:
                        findStudent = _a.sent();
                        if (!findStudent) {
                            throw new common_1.NotFoundException("User with ID not found");
                        }
                        return [4 /*yield*/, this.classModel.findOneAndUpdate({ name: name }, { $pull: { students: findStudent._id } })];
                    case 3:
                        res = _a.sent();
                        if (!res) {
                            throw new common_1.NotFoundException("User with ID not found");
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        err_2 = _a.sent();
                        throw new common_1.NotFoundException(err_2.message);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ClassRepository.prototype.assignTeacherToClass = function (classSearchDto) {
        return __awaiter(this, void 0, void 0, function () {
            var name, teacher, findTeacher, res, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = classSearchDto.name, teacher = classSearchDto.teacher;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.userModel.findOne({
                                email: teacher,
                                role: UserRole_dto_1.Role.Teacher
                            })];
                    case 2:
                        findTeacher = _a.sent();
                        if (!findTeacher) {
                            throw new common_1.NotFoundException("User with ID not found");
                        }
                        return [4 /*yield*/, this.classModel.findOneAndUpdate({ name: name }, { teacher: findTeacher._id })];
                    case 3:
                        res = _a.sent();
                        if (!res) {
                            throw new common_1.NotFoundException("User with ID not found");
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        err_3 = _a.sent();
                        throw new common_1.NotFoundException(err_3.message);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ClassRepository.prototype.removeTeacherFromClass = function (classSearchDto) {
        return __awaiter(this, void 0, void 0, function () {
            var name, teacher, findTeacher, res, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = classSearchDto.name, teacher = classSearchDto.teacher;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.userModel.findOne({
                                email: teacher,
                                role: UserRole_dto_1.Role.Teacher
                            })];
                    case 2:
                        findTeacher = _a.sent();
                        if (!findTeacher) {
                            throw new common_1.NotFoundException("User with ID not found");
                        }
                        return [4 /*yield*/, this.classModel.findOneAndUpdate({ name: name }, { teacher: null })];
                    case 3:
                        res = _a.sent();
                        if (!res) {
                            throw new common_1.NotFoundException("User with ID not found");
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        err_4 = _a.sent();
                        throw new common_1.NotFoundException(err_4.message);
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ClassRepository.prototype.getNrClasses = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.classModel.count()];
                    case 1:
                        response = _a.sent();
                        console.log(response);
                        return [2 /*return*/, response];
                }
            });
        });
    };
    ClassRepository.prototype.getClassByUser = function () {
        return __awaiter(this, void 0, void 0, function () {
            var response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.aggregate([
                            {
                                $lookup: {
                                    from: "classes",
                                    localField: "_id",
                                    foreignField: "students",
                                    as: "classes"
                                }
                            },
                            {
                                $replaceRoot: {
                                    newRoot: {
                                        $mergeObjects: [
                                            {
                                                $arrayElemAt: ["$classes", 0]
                                            },
                                            "$$ROOT",
                                        ]
                                    }
                                }
                            },
                            {
                                $project: {
                                    " _id ": 1,
                                    " email ": 1,
                                    " password ": 1,
                                    " firstName ": 1,
                                    " lastName ": 1,
                                    " role ": 1,
                                    " status ": 1,
                                    "classes.name": 1,
                                    "classes._id": 1
                                }
                            },
                        ])];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    ClassRepository = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, mongoose_1.InjectModel)(class_schema_1.Class.name)),
        __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(function () { return user_repository_1.UserRepository; })))
    ], ClassRepository);
    return ClassRepository;
}());
exports.ClassRepository = ClassRepository;
