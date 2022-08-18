import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { Class, ClassSchema } from "../classes/Class.schema";
import { ClassController } from "../classes/class.controller";
import { ClassService } from "../classes/class.service";
import { ClassRepository } from "../classes/class.repository";
import { ConfigModule } from "@nestjs/config";
import { UserModule } from "../users/user.module";
import { forwardRef } from '@nestjs/common';
import { UserRepository } from "../users/user.repository";
import { UserService } from "../users/user.service";

@Module({
    imports: [
        UserModule,
        MongooseModule.forFeature([
            { name: Class.name, schema: ClassSchema },
        ]),
        forwardRef(() => UserModule),
    ],
    controllers: [ClassController],
    providers: [
        ClassRepository,
        ClassService,
    ],
    exports:[ClassService]
})
export class ClassModule { }
