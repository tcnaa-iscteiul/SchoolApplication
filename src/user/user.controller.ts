
import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.model';

@Controller('user')
export class UserController {
    constructor(private service: UserService) {
    }

    @Get()
    getAllUsers() {
        return this.service.getAllUsers();
    }

    @Get('findById/:id')
    findById(@Param() params) {
        return this.service.findById(params.id);
    }

    @Post('create')
    create(@Body() user: User) {
        return this.service.create(user);
    }
    //Update
    @Patch('/:id/name')
    update(@Param('id') id: string, @Body() user:User ) {
        return this.service.update(id, user);
    }
    
    //Delete user
    @Delete('delete/:id')
    remove(@Param() params): Promise<void> {
        return this.service.remove(params.id);
    }
    /*
    //Delete user by id
    @Delete('deleteByID/:id')
    removeById(@Param() params): Promise<void> {
        return this.service.remove(params.id);
    }*/
}