import { Controller, Post, Req, UseGuards, Body, Patch, HttpCode, Get } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ClassRepository } from 'src/classes/class.repository'
import { RefreshTokenDto } from 'src/token/dto/refresh.token.dto'
import { UserCreateDto } from '../users/dto/UserCreate.dto'
import { UserSearchDto } from '../users/dto/UserSearch.dto'
import { UserService } from '../users/user.service'
import { AuthService } from './auth.service'
import { UserUpdatePasswordDto } from './dto/UserUpdatePassword.dto'

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly classModel: ClassRepository,
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post()
  async login(@Req() req: any) {
    return await this.authService.login(req.user)
  }

  @HttpCode(200)
  @Post('/create')
  async createUser(@Body() userCreateDto: UserCreateDto): Promise<void> {
    return await this.userService.create(userCreateDto)
  }

  @Patch('/changePassword')
  async changePassword(@Body() userUpdatePasswordDto: UserUpdatePasswordDto) {
    return await this.authService.changePassword(userUpdatePasswordDto)
  }

  @Post('/forgotPassword')
  async forgotPassword(@Body() user: UserSearchDto) {
    return await this.authService.forgotPassword(user)
  }

  @Post('/userClasses')
  async getUserClass(@Body() data: RefreshTokenDto) {
    return await this.authService.getUserClassByToken(data.oldToken)
  }

  @Get('/nr')
  async getNrClasses() {
    return await this.classModel.getNrClasses()
  }
  @Get('/classes')
  async getTopFive() {
    return await this.classModel.getTopFive()
  }
}
