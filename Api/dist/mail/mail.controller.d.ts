import { IMailGunData } from './interface/mail.interface';
import { MailService } from './mail.service';
export declare class MailController {
    private mailService;
    constructor(mailService: MailService);
    send(data: IMailGunData): Promise<unknown>;
}
