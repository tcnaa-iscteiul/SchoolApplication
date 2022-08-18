import { Body, Controller, Put, Delete, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RefreshTokenDto } from "./dto/refresh.token.dto";
import { TokenService } from "./token.service";

@Controller("token")
export class TokenController {
    constructor(private tokenService: TokenService) {}

    @Put("refresh")
    async refreshToken(@Body() data: RefreshTokenDto) {
        return this.tokenService.refreshToken(data.oldToken);
    }

    @Delete()
    async deleteToken(@Body() data: RefreshTokenDto) {
        return this.tokenService.deleteToken(data.oldToken);
    }
}
