
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './user.model';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>,
    ) {
    }
    //Create
    async create(doc: User):Promise<User> {
        const result = await new this.userModel(doc).save();
        return result;
    }
    //Find by ID
    async findById(id: string):Promise<User> {
        const found = await this.userModel.findById(id);
        if (!found) {
            throw new NotFoundException(`User with ID "${id}" not found`);
        }
        return found;
    }
    //Find all
    async getAllUsers(): Promise<User[]> {
        const response = await this.userModel.find().exec();
        return response;
    }
    //Update
    async update(id: string, user:User): Promise<User> {
        const found = await this.userModel.findById(id);
        Object.assign(found, user);
        found.save();
        return found;
    }
    //Delete user
    async remove(id: string): Promise<void> {
        const found = this.userModel.findById(id);
        const result = await this.userModel.deleteOne(found);
        console.log(result);

        if (result.deletedCount===0)
            throw new NotFoundException(`User with ID "${id}" not found`);
    }
}