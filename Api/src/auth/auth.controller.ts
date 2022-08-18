import { Controller, Post, Req, UseGuards, Body } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UserCreateDto } from "../users/dto/UserCreate.dto";
import { UserService } from "../users/user.service";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) { }

    @UseGuards(AuthGuard("local"))
    @Post()
    async login(@Req() req: any) {
        return await this.authService.login(req.user);
    }

    @Post("/create")
    createUser(@Body() userCreateDto: UserCreateDto): Promise<void> {
        return this.userService.create(userCreateDto);
    }
}
