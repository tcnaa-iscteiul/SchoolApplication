import { Injectable } from "@nestjs/common";
import { User } from "../users/User.schema";
import { AuthRepository } from "./auth.repository";

@Injectable()
export class AuthService {
    constructor(private authRepository: AuthRepository) { }

    async validateUser(email: string, password: string): Promise<User> {
        return await this.authRepository.validateUser(email,password);
    }

    async login(user: any) {
        return await this.authRepository.login(user);
    }

    async loginToken(token: string) {
        return await this.authRepository.loginToken(token);
    }
}
