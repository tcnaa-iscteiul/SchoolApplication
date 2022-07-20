import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { AuthCredentials } from './auth.model';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
    constructor(private readonly service: AuthService) { }


    @Post('create')
    async createUserAuthentication(@Body('username') username: string, @Body('password') password: string):Promise<string> {
        const generatedId = await this.service.createUserAuthentication(username, password);

        return generatedId;
    }

    @Get()
    async getAllAuth() {
        return await this.service.getAllAuth();
    }

    @Get(':id')
    getAuth(@Param('id') authId:string) {
        return this.service.getAuth(authId);
    }

    @Patch('/:id/password')
    async update(@Param('id') id: string, @Body('password') password:string) {
        await this.service.update(id, password);
        return null;
    }

    //Delete user
    @Delete(':id')
    async remove(@Param('id') authId:string): Promise<void> {
        await this.service.deleteAuth(authId);
        return null;
    }
}
