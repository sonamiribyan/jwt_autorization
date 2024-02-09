import nodemailer from 'nodemailer';

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: false,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD
            }
        });
    }

    async sendActivationEmail(to, link) {
        await this.transporter.sendMail({
            from: process.env.MAIL_USERNAME,
            to,
            subject: 'Activation',
            text: '',
            html:
                `
                <a href="${link}">${link}</a>
                `
        });
    }
}

export default new MailService();
