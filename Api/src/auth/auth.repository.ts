import {
    forwardRef,
    HttpException,
    HttpStatus,
    Inject,
    Injectable,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { User } from "../users/User.schema";
import { JwtPayload } from "./strategy/jwt-payload.interface";
import { UserRepository } from "../users/user.repository";
import { TokenRepository } from "../token/token.repository";
import { Status } from "../users/dto/UserStatus.dto";

@Injectable()
export class AuthRepository {
    constructor(
        private readonly userModel: UserRepository,
        private jwtService: JwtService,
        @Inject(forwardRef(() => TokenRepository))
        private tokenService: TokenRepository
    ) { }

    async validateUser(
        email: string,
        password: string
    ): Promise<User | undefined> {
        const user = await this.userModel.findEmail(email);
        if (
            user &&
            (await bcrypt.compare(password, user.password)) &&
            user.status === Status.Active) {
            // const { password, ...result } = user;
            return user;
        }
        return null;
    }

    async login(user: any) {
        const { email } = user;
        const payload: JwtPayload = { email };
        const accessToken: string = await this.jwtService.sign(payload);
        const role = user.role;
        const status = user.status;
        this.tokenService.save(accessToken, email);
        return { accessToken, role, status };
    }

    async loginToken(token: string) {
        const user = await this.tokenService.getUserByToken(token);
        if (user) {
            return this.login(user);
        } else {
            return new HttpException(
                {
                    errorMessage: "Invalid Token",
                },
                HttpStatus.UNAUTHORIZED);
        }
    }
}
