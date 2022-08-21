import { Model } from "mongoose";
import { UserCreateDto } from "../dto/UserCreate.dto";
import { User, UserDocument } from "../schemas/User.schema";
import { Role, Status } from "../dto/UserSearch.dto";
import { UserUpdateDto } from "../dto/UserUpdate.dto";
import { UserSearchDto } from "../dto/UserSearch.dto";
import { JwtService } from "@nestjs/jwt";
export declare class UserRepository {
    private userModel;
    private jwtService;
    constructor(userModel: Model<UserDocument>, jwtService: JwtService);
    create(userCreatedto: UserCreateDto): Promise<void>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    findWithFilters(filter: UserSearchDto): Promise<any[]>;
    update(user: UserUpdateDto): Promise<void>;
    delete(user: UserUpdateDto): Promise<void>;
    getNrUsers(user: UserSearchDto): Promise<number>;
    signIn(userCredentialsDto: UserSearchDto): Promise<{
        accessToken: string;
        role: Role;
        status: Status;
    }>;
}
