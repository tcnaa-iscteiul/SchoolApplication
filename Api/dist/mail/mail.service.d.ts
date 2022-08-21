import { MailerService } from "@nestjs-modules/mailer";
import { IMailGunData } from "./interface/mail.interface";
export declare class MailService {
    private readonly mailerService;
    constructor(mailerService: MailerService);
    send(data: IMailGunData): Promise<unknown>;
}
