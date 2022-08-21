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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("../repository/user.repository");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async getAll() {
        return await this.userRepository.findAll();
    }
    getUserById(id) {
        const user = this.userRepository.findOne(id);
        if (!user) {
            throw new common_1.NotFoundException(`${id} User not found! `);
        }
        return user;
    }
    async userSearch(userSearchDto) {
        return await this.userRepository.findWithFilters(userSearchDto);
    }
    async create(userCreateDto) {
        return await this.userRepository.create(userCreateDto);
    }
    async delete(userSearchDto) {
        return await this.userRepository.delete(userSearchDto);
    }
    async update(updateuserDto) {
        return await this.userRepository.update(updateuserDto);
    }
    async getNrUsers(updateuserDto) {
        return await this.userRepository.getNrUsers(updateuserDto);
    }
    async signIn(userCredentialsDto) {
        return await this.userRepository.signIn(userCredentialsDto);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof user_repository_1.UserRepository !== "undefined" && user_repository_1.UserRepository) === "function" ? _a : Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map