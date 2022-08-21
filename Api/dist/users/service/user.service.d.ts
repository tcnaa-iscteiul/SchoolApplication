import { UserUpdateDto } from "../dto/UserUpdate.dto";
import { UserCreateDto } from "../dto/UserCreate.dto";
import { UserSearchDto } from "../dto/UserSearch.dto";
import { UserRepository } from "../repository/user.repository";
import { User } from "../schemas/user.schema";
export declare class UserService {
    private userRepository;
    constructor(userRepository: UserRepository);
    getAll(): Promise<User[]>;
    getUserById(id: string): Promise<User>;
    userSearch(userSearchDto: UserSearchDto): Promise<any>;
    create(userCreateDto: UserCreateDto): Promise<void>;
    delete(userSearchDto: UserUpdateDto): Promise<void>;
    update(updateuserDto: UserUpdateDto): Promise<void>;
    getNrUsers(updateuserDto: UserSearchDto): Promise<any>;
    signIn(userCredentialsDto: UserSearchDto): Promise<{
        accessToken: string;
        role: string;
    }>;
}
