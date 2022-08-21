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
exports.ClassRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const class_schema_1 = require("./class.schema");
const UserRole_dto_1 = require("../users/dto/UserRole.dto");
const user_repository_1 = require("../users/user.repository");
let ClassRepository = class ClassRepository {
    constructor(classModel, userModel) {
        this.classModel = classModel;
        this.userModel = userModel;
    }
    async create(classCreateDto) {
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
    }
    async findAll() {
        return await this.classModel.find().populate("teacher students");
    }
    async findWithFilters(filter) {
        const name = Object.is(filter.name, undefined) ? "" : filter.name;
        const description = Object.is(filter.description, undefined)
            ? ""
            : filter.description;
        const startDate = Object.is(filter.startDate, undefined)
            ? ""
            : filter.startDate;
        const endDate = Object.is(filter.endDate, undefined)
            ? ""
            : filter.endDate;
        return await this.classModel
            .find({
            $and: [
                {
                    name: {
                        $regex: name,
                    },
                },
                {
                    description: {
                        $regex: description,
                    },
                },
                {
                    startDate: {
                        $regex: startDate,
                    },
                },
                {
                    endDate: { $regex: endDate },
                },
            ],
        })
            .populate("teacher students")
            .exec();
    }
    async delete(classSearchDto) {
        const result = await this.classModel
            .findOneAndDelete({ name: classSearchDto.name, })
            .exec();
        if (!result) {
            throw new common_1.NotFoundException(`Class with ID not found`);
        }
    }
    async update(classUpdateDto) {
        const result = await this.classModel.findOneAndUpdate({ name: classUpdateDto.name }, {
            name: classUpdateDto.name,
            description: classUpdateDto.description,
            startDate: classUpdateDto.startDate,
            endDate: classUpdateDto.endDate,
        }, {
            new: true,
        });
        if (!result) {
            throw new common_1.NotFoundException(`Class with ID not found`);
        }
    }
    async assignStudentsToClass(classSearchDto) {
        const { name, newStudents } = classSearchDto;
        try {
            const findStudent = await this.userModel.findOne({
                email: newStudents,
                role: UserRole_dto_1.Role.Student,
            });
            if (!findStudent) {
                throw new common_1.NotFoundException(`User with ID not found`);
            }
            const res = await this.classModel.findOneAndUpdate({ name: name }, { $addToSet: { students: findStudent._id } });
            if (!res) {
                throw new common_1.NotFoundException(`User with ID not found`);
            }
        }
        catch (err) {
            throw new common_1.NotFoundException(err.message);
        }
    }
    async removeStudentsFromClass(classSearchDto) {
        const { name, newStudents } = classSearchDto;
        try {
            const findStudent = await this.userModel.findOne({
                email: newStudents,
                role: UserRole_dto_1.Role.Student,
            });
            if (!findStudent) {
                throw new common_1.NotFoundException(`User with ID not found`);
            }
            const res = await this.classModel.findOneAndUpdate({ name: name }, { $pull: { students: findStudent._id } });
            if (!res) {
                throw new common_1.NotFoundException(`User with ID not found`);
            }
        }
        catch (err) {
            throw new common_1.NotFoundException(err.message);
        }
    }
    async assignTeacherToClass(classSearchDto) {
        const { name, teacher } = classSearchDto;
        try {
            const findTeacher = await this.userModel.findOne({
                email: teacher,
                role: UserRole_dto_1.Role.Teacher,
            });
            if (!findTeacher) {
                throw new common_1.NotFoundException(`User with ID not found`);
            }
            const res = await this.classModel.findOneAndUpdate({ name: name }, { teacher: findTeacher._id });
            if (!res) {
                throw new common_1.NotFoundException(`User with ID not found`);
            }
        }
        catch (err) {
            throw new common_1.NotFoundException(err.message);
        }
    }
    async removeTeacherFromClass(classSearchDto) {
        const { name, teacher } = classSearchDto;
        try {
            const findTeacher = await this.userModel.findOne({
                email: teacher,
                role: UserRole_dto_1.Role.Teacher,
            });
            if (!findTeacher) {
                throw new common_1.NotFoundException(`User with ID not found`);
            }
            const res = await this.classModel.findOneAndUpdate({ name: name }, { teacher: null });
            if (!res) {
                throw new common_1.NotFoundException(`User with ID not found`);
            }
        }
        catch (err) {
            throw new common_1.NotFoundException(err.message);
        }
    }
    async getNrClasses() {
        const response = await this.classModel.count();
        console.log(response);
        return response;
    }
    async getClassByUser() {
        const response = await this.userModel.aggregate([
            {
                $lookup: {
                    from: "classes",
                    localField: "_id",
                    foreignField: "students",
                    as: "classes",
                },
            },
            {
                $replaceRoot: {
                    newRoot: {
                        $mergeObjects: [
                            {
                                $arrayElemAt: ["$classes", 0],
                            },
                            "$$ROOT",
                        ],
                    },
                },
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
                    "classes._id": 1,
                },
            },
        ]);
        return response;
    }
};
ClassRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(class_schema_1.Class.name)),
    __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(() => user_repository_1.UserRepository))),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], ClassRepository);
exports.ClassRepository = ClassRepository;
//# sourceMappingURL=class.repository.js.map