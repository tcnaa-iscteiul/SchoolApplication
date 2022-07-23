import { Module } from '@nestjs/common';
import { userService } from './user.service';
import { userController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
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
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    providers: [userService, JwtStrategy],
    controllers: [userController],
    exports:[JwtStrategy, PassportModule]
})
export class UserModule {}
