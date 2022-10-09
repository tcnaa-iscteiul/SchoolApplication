import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './users/user.module';
import { ClassModule } from './classes/class.module';
import { AuthModule } from './auth/auth.module';
import { TokenModule } from './token/token.module';
import { LessonsModule } from './lessons/lessons.module';
import { MailModule } from './mail/mail.module';
import { FilesModule } from './file/files.module';
@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URL),
    UserModule,
    FilesModule,
    AuthModule,
    TokenModule,
    LessonsModule,
    ClassModule,
    MailModule,
  ],
})
export class AppModule {}
