import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { MailController } from './mail.controller';
const nodemailer = require("nodemailer");

@Module({
    imports: [
        MailerModule.forRoot({
            transport: {
                host: process.env.EMAIL_HOST,
                port: process.env.EMAIL_PORT,
                secure: false,
                auth: {
                    user: process.env.USER,
                    pass: process.env.PASS
                },
            }
        }),
    ],
    controllers: [MailController],
    providers: [MailService],
    exports: [MailService],
})
export class MailModule { }