import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthCredentials } from './auth.model';

@Injectable()
export class AuthService {
     constructor(@InjectModel('Auth') private readonly authCredentials: Model<AuthCredentials>) { }
    //Create
    async createUserAuthentication(username: string, password: string):Promise<string> {
        const newAuth = new this.authCredentials({ username, password });
        const result = await newAuth.save();

        return result.id as string;
    }
    //getAll
    async getAllAuth() {
        const auths = await this.authCredentials.find().exec();//exec gives a real promise and find not
        const response = auths.map((auth) => ({
            id: auth.id,
            username: auth.username,
            password: auth.password,
        }));
        return response;
    }

    //Aux func to Find by ID
    private async findAuthById(id: string):Promise<AuthCredentials> {
        let auth;
        try {
            auth = await this.authCredentials.findById(id).exec();
        }
        catch (error) {
            throw new NotFoundException(`User not found`);
        }
        if (!auth) {
            throw new NotFoundException(`User not found`);
        }
        return auth ;
    }

     async getAuth(id: string) {
        const auth = await this.findAuthById(id);
         return { id: auth.id, username:auth.username, password:auth.password };
    }

    //Update
    async update(id: string, password:string): Promise<void> {
        const updatesAuth = await this.findAuthById(id);
        updatesAuth.password = password;
        await updatesAuth.save();
    }

    //Delete
    async deleteAuth(authId: string) {
        const result=await this.authCredentials.deleteOne({ _id: authId }).exec();
      /*  if (result.n === 0) {
            throw new NotFoundException(`User with ID not found`);
        }*/
        return null;
    }

}
