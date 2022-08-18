import {
    Injectable,
    Inject,
    HttpException,
    HttpStatus,
    forwardRef,
    NotFoundException,
} from "@nestjs/common";
import { UserService } from "src/users/user.service";
import { AuthRepository } from "src/auth/auth.repository";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Token, TokenDocument } from "./token.schema";

@Injectable()
export class TokenRepository {
    constructor(
        @InjectModel(Token.name)
        private tokenModel: Model<TokenDocument>,
        private userService: UserService,
        @Inject(forwardRef(() => AuthRepository))
        private authService: AuthRepository
    ) { }

    async save(hash: string, email: string) {
        const objToken = await this.tokenModel.findOne({ email: email });
        if (objToken) {
            await this.tokenModel.findOneAndUpdate(
                { id: objToken.id },
                {
                    hash,
                },
                {
                    new: true,
                }
            )
        } else {
            await new this.tokenModel({
                hash: hash,
                email: email,
            }).save();
        }
    }

    async refreshToken(oldToken: string) {
        const objToken = await this.tokenModel.findOne({ hash: oldToken });
        if (objToken) {
            const user = await this.userService.findEmail(objToken.email);
            return this.authService.login(user);
        } else { 
            return new HttpException(
                {
                    errorMessage: "Token inválido",
                },
                HttpStatus.UNAUTHORIZED);
        }
    }

    async getUserByToken(token: string): Promise<any> {
        token = token.replace("Bearer ", "").trim();
        const objToken: Token = await this.tokenModel.findOne({ hash: token });
        if (objToken) {
            const user = await this.userService.findEmail(objToken.email);
            return user;
        } else { 
            return null;
        }
    }

    async deleteToken(token:string): Promise<void> {
        const result = await this.tokenModel.findOneAndDelete({
            token:token,
        });
        if (!result) {
            throw new NotFoundException(`Token with ID not found`);
        }
    }
}
