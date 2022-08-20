import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { IMailGunData } from './interface/mail.interface';

@Injectable()
export class MailService {
    constructor(private readonly mailerService: MailerService) { }

    async send(data: IMailGunData){
       /* return new Promise((res, rej) => {
            this.mailerService
                .sendMail(data)
                .then((body) => { res(body)})
                .catch((error) => { rej(error) });
        });*/
        
        const response = await this.mailerService.sendMail({
            to: data.to,
            subject: data.subject,
            text: data.html,
        });

        return response;
    }
}
