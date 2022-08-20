import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { IMailGunData } from './interface/mail.interface';
import { MailService } from './mail.service';

@Controller('email')
export class MailController {
    constructor(private mailService: MailService) { }

    
    @Get()
    async send(@Body()data: IMailGunData) {
        return await this.mailService.send(data);
    }

    /*
    @Get()
    async plainTextEmail(@Query('toemail') toEmail) {
        var response = await this.mailerService.sendMail({
            to: toEmail,
            subject: 'Recover Password',
            text: 'Welcome NestJS Email Sending Tutorial',
        });
        return response;
    }*/
}