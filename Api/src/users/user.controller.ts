import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    UseGuards,
    Query,
} from "@nestjs/common";
import { UserService } from "./service/user.service";
import { UserCreateDto } from "./dto/UserCreate.dto";
import { UserUpdateDto } from "./dto/UserUpdate.dto";
import { UserSearchDto } from "./dto/UserSearch.dto";
import { User } from "./schemas/user.schema";
import { AuthGuard } from "@nestjs/passport";

//@UseGuards(AuthGuard)
@Controller("user")
export class userController {
    constructor(private userService: UserService) { }

    // @UsePipes(ValidationPipe)
    @Get("/all")
    async getAllUsers(@Query() param: UserSearchDto): Promise<User[]> {
        if (Object.keys(param).length) {
            return this.userService.userSearch(param);
        } else {
            return this.userService.getAll();
        }
    }

    @Post()
    //@UsePipes(ValidationPipe)
    // @UsePipes(new EmployeeTierValidationPipe())
    createUser(@Body() userCreateDto: UserCreateDto): Promise<void> {
        return this.userService.create(userCreateDto);
    }

    @Get("/:id")
    getUserById(@Param("id") id: string): Promise<User> {
        return this.userService.getUserById(id);
    }

    @Patch()
    updateUser(@Body() userUpdateDto: UserUpdateDto): Promise<void> {
        return this.userService.update(userUpdateDto);
    }
    // @HttpCode(204)
    @Delete()
    async deleteUser(@Body() param: UserUpdateDto) {
        return await this.userService.delete(param);
    }

    @Get()
    async getNrUsers(@Body() userUpdateDto: UserSearchDto) {
        return await this.userService.getNrUsers(userUpdateDto);
    }

    @Post("/signin")
    async signIn(@Body() baseUserDto: UserSearchDto): Promise<{
        accessToken: string,
        role: string
    }> {
        return await this.userService.signIn(baseUserDto);
    }
}
