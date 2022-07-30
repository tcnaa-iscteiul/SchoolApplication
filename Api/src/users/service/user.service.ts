import { Injectable, NotFoundException } from "@nestjs/common";
import { UserUpdateDto } from "../dto/UserUpdate.dto";
import { UserCreateDto } from "../dto/UserCreate.dto";
import { UserSearchDto } from "../dto/UserSearch.dto";
import { UserRepository } from "../repository/user.repository";
import { User } from "../schemas/user.schema";

@Injectable()
export class UserService {
    constructor(private userRepository: UserRepository) { }

    async getAll(): Promise<User[]> {
        return await this.userRepository.findAll();
    }

    getUserById(id: string): Promise<User> {
        const user = this.userRepository.findOne(id);
        if (!user) {
            throw new NotFoundException(`${id} User not found! `);
        }
        return user;
    }

    async userSearch(userSearchDto: UserSearchDto) {
        return await this.userRepository.findWithFilters(userSearchDto);
    }

    async create(userCreateDto: UserCreateDto): Promise<void> {
        return await this.userRepository.create(userCreateDto);
    }

    async delete(userSearchDto: UserUpdateDto): Promise<void> {
        return await this.userRepository.delete(userSearchDto);
    }

    async update(updateuserDto: UserUpdateDto): Promise<void> {
        return await this.userRepository.update(updateuserDto);
    }

    async getNrUsers(updateuserDto: UserSearchDto) {
        return await this.userRepository.getNrUsers(updateuserDto);
    }

    async signIn(userCredentialsDto: UserSearchDto): Promise<{
        accessToken: string;
        role: string;
    }> {
        return await this.userRepository.signIn(userCredentialsDto);
    }
}
