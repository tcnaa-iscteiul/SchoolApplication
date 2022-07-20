import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
//import { AuthCredentials } from './auth.model';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { BaseAuthDto } from './dto/base-auth.dto';
import { Auth } from './schemas/auth.schema';


@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService) { }
    @Get()
    async getAllAuth(): Promise<Auth[]> {
        return await this.service.getAllAuth();
    }

    @Get(':id')
    async getAuth(@Param('id') authId: string): Promise<Auth> {
        return await this.service.getAuth(authId);
    }
    @Post('create')
    async createUserAuthentication(@Body() createAuthDto: CreateAuthDto): Promise<void> {
        await this.service.createUserAuthentication(createAuthDto);
    }
    @Post('signin')
    async signIn(@Body() createAuthDto: BaseAuthDto): Promise<{ accessToken: string }> {
        return await this.service.signIn(createAuthDto);
    }


    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
        return await this.service.update(id, updateAuthDto);
    }
    //Delete user
    @Delete(':id')
    async remove(@Param('id') authId: string): Promise<Auth> {
        return await this.service.deleteAuth(authId);
    }
}
