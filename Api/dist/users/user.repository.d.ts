import mongoose, { Model } from "mongoose";
import { UserCreateDto } from "./dto/UserCreate.dto";
import { User, UserDocument } from "./User.schema";
import { UserUpdateDto } from "./dto/UserUpdate.dto";
import { UserSearchDto } from "./dto/UserSearch.dto";
export declare class UserRepository {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    create(userCreatedto: UserCreateDto): Promise<void>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    findWithFilters(filter: UserSearchDto): Promise<(User & mongoose.Document<any, any, any> & {
        _id: mongoose.Types.ObjectId;
    })[]>;
    findEmail(email: string): Promise<User | undefined>;
    update(user: UserUpdateDto): Promise<void>;
    delete(user: UserUpdateDto): Promise<void>;
    getNrUsers(user: UserSearchDto): Promise<number>;
}
