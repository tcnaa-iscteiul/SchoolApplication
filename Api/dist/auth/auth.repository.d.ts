import { HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/User.schema';
import { UserRepository } from '../users/user.repository';
import { TokenRepository } from '../token/token.repository';
import { UserUpdatePasswordDto } from './dto/UserUpdatePassword.dto';
import { MailService } from '../mail/mail.service';
import { UserSearchDto } from '../users/dto/UserSearch.dto';
export declare class AuthRepository {
  private readonly userModel;
  private jwtService;
  private tokenService;
  private mailService;
  constructor(
    userModel: UserRepository,
    jwtService: JwtService,
    tokenService: TokenRepository,
    mailService: MailService,
  );
  validateUser(email: string, password: string): Promise<User | undefined>;
  login(user: any): Promise<{
    accessToken: string;
    role: any;
    status: any;
  }>;
  loginToken(token: string): Promise<
    | HttpException
    | {
        accessToken: string;
        role: any;
        status: any;
      }
  >;
  changePassword(
    userUpdatePasswordDto: UserUpdatePasswordDto,
  ): Promise<void | HttpException>;
  forgotPassword(userSearch: UserSearchDto): Promise<HttpException>;
}
