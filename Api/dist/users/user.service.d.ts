import { UserUpdateDto } from "./dto/UserUpdate.dto";
import { UserCreateDto } from "./dto/UserCreate.dto";
import { UserSearchDto } from "./dto/UserSearch.dto";
import { UserRepository } from "./user.repository";
import { User } from "./user.schema";
export declare class UserService {
    private userRepository;
    constructor(userRepository: UserRepository);
    getAll(): Promise<User[]>;
    getUserById(id: string): Promise<User>;
    userSearch(userSearchDto: UserSearchDto): Promise<(User & import("mongoose").Document<any, any, any> & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    create(userCreateDto: UserCreateDto): Promise<void>;
    delete(userSearchDto: UserUpdateDto): Promise<void>;
    update(updateuserDto: UserUpdateDto): Promise<void>;
    getNrUsers(updateuserDto: UserSearchDto): Promise<number>;
    findEmail(email: string): Promise<User | undefined>;
}
