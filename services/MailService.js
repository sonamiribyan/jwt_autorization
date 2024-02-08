import nodemailer from 'nodemailer';

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: false,
            auth: {
                user: process.env.MAIL_USERNAME, // Corrected variable name
                pass: process.env.MAIL_PASSWORD // Corrected variable name
            }
        });
    }

    async sendActivationEmail(to, link) {
        await this.transporter.sendMail({
            from: process.env.MAIL_USERNAME, // Corrected variable name
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
