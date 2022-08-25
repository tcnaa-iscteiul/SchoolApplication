import { RefreshTokenDto } from './dto/refresh.token.dto';
import { TokenService } from './token.service';
export declare class TokenController {
  private tokenService;
  constructor(tokenService: TokenService);
  refreshToken(data: RefreshTokenDto): Promise<
    | import('@nestjs/common').HttpException
    | {
        accessToken: string;
        role: any;
        status: any;
      }
  >;
  deleteToken(data: RefreshTokenDto): Promise<any>;
}
