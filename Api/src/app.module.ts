import { Module } from "@nestjs/common";
import { UserModule } from "./users/user.module";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import dotenv from "dotenv";

@Module({
    imports: [
        MongooseModule.forRoot(
            "mongodb+srv://admin:admin@cluster0.majpwd7.mongodb.net/test?retryWrites=true&w=majority"
        ),
        UserModule,
    ]
})
export class AppModule { }
