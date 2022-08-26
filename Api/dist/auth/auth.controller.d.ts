import { UserCreateDto } from '../users/dto/UserCreate.dto';
import { UserSearchDto } from '../users/dto/UserSearch.dto';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';
import { UserUpdatePasswordDto } from './dto/UserUpdatePassword.dto';
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    login(req: any): Promise<{
        accessToken: string;
        role: any;
        status: any;
    }>;
    createUser(userCreateDto: UserCreateDto): Promise<void>;
    changePassword(userUpdatePasswordDto: UserUpdatePasswordDto): Promise<void | import("@nestjs/common").HttpException>;
    forgotPassword(user: UserSearchDto): Promise<import("@nestjs/common").HttpException>;
}
