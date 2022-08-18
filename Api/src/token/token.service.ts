import { Injectable } from "@nestjs/common";
import { TokenRepository } from "./token.repository";

@Injectable()
export class TokenService {
    constructor(private tokenRepository: TokenRepository) { }

    async save(hash: string, email: string) {
        return await this.tokenRepository.save(hash,email);
    }

    async refreshToken(oldToken: string) {
        return await this.tokenRepository.refreshToken(oldToken);
    }

    async getUserByToken(token: string): Promise<any> {
        return await this.tokenRepository.getUserByToken(token);
    }

    async deleteToken(token: string): Promise<any> {
        return await this.tokenRepository.deleteToken(token);
    }
}
