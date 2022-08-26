import { TokenRepository } from './token.repository';
export declare class TokenService {
    private tokenRepository;
    constructor(tokenRepository: TokenRepository);
    save(hash: string, email: string, expireAt: string): Promise<void>;
    refreshToken(oldToken: string): Promise<{
        accessToken: string;
        role: any;
        status: any;
    } | import("@nestjs/common").HttpException>;
    getUserByToken(token: string): Promise<import("../users/User.schema").User>;
    deleteToken(token: string): Promise<any>;
}
