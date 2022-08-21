import { HttpException } from "@nestjs/common";
import { UserService } from "src/users/user.service";
import { AuthRepository } from "src/auth/auth.repository";
import { Model } from "mongoose";
import { TokenDocument } from "./token.schema";
export declare class TokenRepository {
    private tokenModel;
    private userService;
    private authService;
    constructor(tokenModel: Model<TokenDocument>, userService: UserService, authService: AuthRepository);
    save(hash: string, email: string, expireAt: string): Promise<void>;
    refreshToken(oldToken: string): Promise<HttpException | {
        accessToken: string;
        role: any;
        status: any;
    }>;
    getUserByToken(oldToken: string): Promise<import("../users/User.schema").User>;
    deleteToken(token: string): Promise<void>;
}
