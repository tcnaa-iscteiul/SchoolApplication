import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
//import { userCredentials } from './user.model';
import { userService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BaseUserDto } from './dto/base-user.dto';
import { User } from './schemas/user.schema';
import { GetUser } from './get-user.decorator';


@Controller('user')
export class userController {
    constructor(private readonly service: userService) { }
    @Get()
    async getAlluser(): Promise<User[]> {
        return await this.service.getAlluser();
    }
    
    @Get(':id')
    async getuser(@Param('id') userId: string): Promise<User> {
        return await this.service.getuser(userId);
    }
    @Post('create')
    async signUp(@Body() createuserDto: CreateUserDto): Promise<void> {
        await this.service.signUp(createuserDto);
    }
    @Post('signin')
    async signIn(@Body() createuserDto: BaseUserDto): Promise<{ accessToken: string }> {
        return await this.service.signIn(createuserDto);
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateuserDto: UpdateUserDto) {
        return await this.service.update(id, updateuserDto);
    }
    //Delete user
    @Delete(':id')
    async remove(@Param('id') userId: string): Promise<User> {
        return await this.service.deleteuser(userId);
    }
}
