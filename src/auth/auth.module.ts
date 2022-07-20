import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './schemas/auth.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'topSecret51',
            signOptions: {
                expiresIn:3600,
            },
        }),
        MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }])],
    providers: [AuthService, JwtStrategy],
    controllers: [AuthController],
    exports:[JwtStrategy, PassportModule]
})
export class AuthModule {}
