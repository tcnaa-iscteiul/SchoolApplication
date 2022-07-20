import { Injectable, InternalServerErrorException, NotFoundException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateAuthDto } from './dto/create-auth.dto';
import { BaseAuthDto } from './dto/base-auth.dto';
//import { AuthCredentials } from './auth.model';
import { Auth, AuthDocument } from './schemas/auth.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Auth.name)
        private readonly authCredentials: Model<AuthDocument>,
        private jwtService: JwtService,
    ) { }

    //getAll
    async getAllAuth(): Promise<Auth[]> {
        const auths = await this.authCredentials.find().exec();//exec gives a real promise and find not
        const response = auths.map((auth) => ({
            id: auth.id,
            username: auth.username,
            password: auth.password,
        }));
        return response;
    }
    //findAuth
    async getAuth(id: string): Promise<Auth> {
        const auth = await this.findAuthById(id);
        return { username: auth.username, password: auth.password };
    }

    //Create
    async createUserAuthentication(createAuthDto: CreateAuthDto): Promise<void> {
        //has the password and the store in db
        const { username, password } = createAuthDto;

        const salt = await bcrypt.genSalt();//generate a salt
        const hashedPassword = await bcrypt.hash(password, salt);//hash the password with the salt

        try {
            await new this.authCredentials({
                username, password: hashedPassword//salt+password
            }).save();
        }
        catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('Username already exists!');
            }
            else {
                throw new InternalServerErrorException();
            }
        }
    }
    //SignIn
    async signIn(authCredentialsDto: BaseAuthDto): Promise<{accessToken:string}> {
        const { username, password } = authCredentialsDto;
        const user = await this.authCredentials.findOne({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            const payload: JwtPayload = { username };
            const accessToken: string = await this.jwtService.sign(payload);

            return {accessToken};
        }
        else {
            throw new UnauthorizedException('Please check your login credentials!');
        }
    }

    //Aux func to Find by ID
    private async findAuthById(id: string): Promise<AuthDocument> {
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
        return auth;
    }


    //Update
    async update(id: string, updateAuthDto: UpdateAuthDto): Promise<Auth> {
        return await this.authCredentials.findByIdAndUpdate(id, updateAuthDto).exec();
    }

    //Delete
    async deleteAuth(authId: string): Promise<Auth> {
        /*  const result = await this.authCredentials.findByIdAndDelete(id).exec();
          if (result.n === 0) {
              throw new NotFoundException(`User with ID not found`);
          }
          return null;*/
        return await this.authCredentials.findByIdAndDelete(authId).exec();
    }

}
