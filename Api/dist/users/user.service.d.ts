/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { UserUpdateDto } from './dto/UserUpdate.dto';
import { UserCreateDto } from './dto/UserCreate.dto';
import { UserSearchDto } from './dto/UserSearch.dto';
import { UserRepository } from './user.repository';
import { User } from './user.schema';
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
