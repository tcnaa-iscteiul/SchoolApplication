import { UserSearchDto } from '../users/dto/UserSearch.dto';
import { User } from '../users/User.schema';
import { AuthRepository } from './auth.repository';
import { UserUpdatePasswordDto } from './dto/UserUpdatePassword.dto';
export declare class AuthService {
    private authRepository;
    constructor(authRepository: AuthRepository);
    validateUser(email: string, password: string): Promise<User>;
    login(user: any): Promise<{
        accessToken: string;
        role: any;
        status: any;
    }>;
    loginToken(token: string): Promise<{
        accessToken: string;
        role: any;
        status: any;
    } | import("@nestjs/common").HttpException>;
    changePassword(userUpdatePasswordDto: UserUpdatePasswordDto): Promise<void | import("@nestjs/common").HttpException>;
    forgotPassword(user: UserSearchDto): Promise<import("@nestjs/common").HttpException>;
}
