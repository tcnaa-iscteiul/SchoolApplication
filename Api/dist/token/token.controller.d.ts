import { RefreshTokenDto } from './dto/refresh.token.dto';
import { TokenService } from './token.service';
export declare class TokenController {
    private tokenService;
    constructor(tokenService: TokenService);
    refreshToken(data: RefreshTokenDto): Promise<{
        accessToken: string;
        role: any;
        status: any;
    } | import("@nestjs/common").HttpException>;
    deleteToken(data: RefreshTokenDto): Promise<any>;
}
