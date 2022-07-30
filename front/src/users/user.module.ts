import { Module } from "@nestjs/common";
import { UserService } from "./service/user.service";
import { userController } from "../users/user.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./jwt.strategy";
import { Class, ClassSchema } from "./schemas/Class.schema";
import { ClassController } from "./class.controller";
import { ClassService } from "./service/class.service";
import { UserRepository } from "./repository/user.repository";
import { ClassRepository } from "./repository/class.repository";

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: "jwt" }),
        JwtModule.register({
            secret: "topSecret51",
            signOptions: {
                expiresIn: 3600,
            },
        }),
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema },
            { name: Class.name, schema: ClassSchema },
        ]),],
    controllers: [userController, ClassController],
    providers: [
        UserService,
        UserRepository,
        JwtStrategy,
        ClassRepository,
        ClassService
    ],
    exports: [JwtStrategy, PassportModule]
})
export class UserModule { }
