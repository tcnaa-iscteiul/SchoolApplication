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
exports.UserRepository = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const User_schema_1 = require("../schemas/User.schema");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
let UserRepository = class UserRepository {
    constructor(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
    }
    async create(userCreatedto) {
        const { email, password, status, role, firstName, lastName, phone } = userCreatedto;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        try {
            await new this.userModel({
                email: email.toLowerCase(),
                password: hashedPassword,
                status,
                role,
                firstName: firstName
                    .charAt(0)
                    .toUpperCase()
                    .concat(firstName.substring(1).toLowerCase()),
                lastName: lastName
                    .charAt(0)
                    .toUpperCase()
                    .concat(lastName.substring(1).toLowerCase()),
                phone,
            }).save();
        }
        catch (error) {
            if (error.code === 11000) {
                throw new common_1.ConflictException("Username already exists!");
            }
            else {
                throw new common_1.InternalServerErrorException();
            }
        }
    }
    async findAll() {
        return await this.userModel.find();
    }
    async findOne(id) {
        if (mongoose_2.default.Types.ObjectId.isValid(id)) {
            return await this.userModel.findOne({ _id: id });
        }
        return null;
    }
    async findWithFilters(filter) {
        const email = Object.is(filter.email, undefined) ? '' : filter.email;
        const role = Object.is(filter.role, undefined) ? '' : filter.role;
        const status = Object.is(filter.status, undefined) ? '' : filter.status;
        return await this.userModel.find({
            $and: [
                {
                    email: { $regex: email },
                },
                {
                    role: { $regex: role },
                },
                {
                    status: { $regex: status },
                },
            ],
        });
    }
    async update(user) {
        const newUser = Object.fromEntries(Object.entries(user).filter(([_, v]) => v !== null && v !== ""));
        const result = await this.userModel.findOneAndUpdate({ email: user.email }, Object.assign({}, newUser), {
            new: true,
        });
        if (!result) {
            throw new common_1.NotFoundException(`User with ID not found`);
        }
    }
    async delete(user) {
        const result = await this.userModel.findOneAndDelete({
            email: user.email,
        });
        if (!result) {
            throw new common_1.NotFoundException(`User with ID not found`);
        }
    }
    async getNrUsers(user) {
        const response = await this.userModel.find({ role: user.role }).count();
        return response;
    }
    async signIn(userCredentialsDto) {
        const { email, password } = userCredentialsDto;
        const user = await this.userModel.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            const payload = { email };
            const accessToken = await this.jwtService.sign(payload);
            const role = user.role;
            const status = user.status;
            return { accessToken, role, status };
        }
        else {
            throw new common_1.UnauthorizedException("Please check your login credentials!");
        }
    }
};
UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(User_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map