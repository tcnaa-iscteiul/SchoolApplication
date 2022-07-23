import { Injectable, InternalServerErrorException, NotFoundException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { BaseUserDto } from './dto/base-user.dto';
//import { userCredentials } from './user.model';
import { User, userDocument } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';
import { GetUser } from './get-user.decorator';

@Injectable()
export class userService {
    constructor(
        @InjectModel(User.name)
        private readonly userCredentials: Model<userDocument>,
        private jwtService: JwtService,
    ) { }

    //getAll
    async getAlluser(): Promise<User[]> {
        const users = await this.userCredentials.find().exec();//exec gives a real promise and find not
        const response:User[] = users.map((user) => ({
            id: user.id,
            email: user.email,
            password: user.password,
            role:user.role,
            status: user.status,
            firstName: user.firstName,
            lastName: user.lastName,
            phone:user.phone,
        }));
         return response;
    }
    //finduser
    async getuser(id: string): Promise<User> {
        const user = await this.finduserById(id);
        return {
            email: user.email,
            password: user.password,
            role: user.role,
            status:user.status,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
        };
    }

    //Create
    async signUp(createuserDto: CreateUserDto): Promise<void> {
        //has the password and the store in db
        const { email, password, ...rest } = createuserDto;
        const salt = await bcrypt.genSalt();//generate a salt
        const hashedPassword = await bcrypt.hash(password, salt);//hash the password with the salt
        try {
            await new this.userCredentials({
                email,
                password: hashedPassword,
                ...rest,
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
    async signIn(userCredentialsDto: BaseUserDto): Promise<{ accessToken: string }> {
        const { email, password } = userCredentialsDto;
        const user = await this.userCredentials.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            const payload: JwtPayload = { email };
            const accessToken: string = await this.jwtService.sign(payload);

            return { accessToken };
        }
        else {
            throw new UnauthorizedException('Please check your login credentials!');
        }
    }

    //Aux func to Find by ID
    private async finduserById(id: string): Promise<userDocument> {
        let user;
        try {
            user = await this.userCredentials.findById(id).exec();
        }
        catch (error) {
            throw new NotFoundException(`User not found`);
        }
        if (!user) {
            throw new NotFoundException(`User not found`);
        }
        return user;
    }


    //Update
    async update(id: string, updateuserDto: UpdateUserDto): Promise<User> {
        return await this.userCredentials.findByIdAndUpdate(id, updateuserDto).exec();
    }

    //Delete
    async deleteuser(userId: string): Promise<User> {
        /*  const result = await this.userCredentials.findByIdAndDelete(id).exec();
          if (result.n === 0) {
              throw new NotFoundException(`User with ID not found`);
          }
          return null;*/
        return await this.userCredentials.findByIdAndDelete(userId).exec();
    }
}
