import * as email from "nodemailer";
import ejs from "ejs-promise";
import * as path from "path";

const emailer = email.createTransport({
    service: process.env.EMAIL_SERV,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

export default class EmailService {

    // Needs work, later in development.
    public static async resetPasswordEmail(recipient: string): Promise<Boolean | Error> {
        try {
            ejs.renderFile(path.resolve(__dirname + "./src/Modules/Email/resetPassword/resetPassword.ejs"))
            const email = ({
                from: process.env.EMAIL_FROM,
                to: recipient,
                subject: process.env.BIZ_NAME + " password reset",
                html: ""
            })
            const template = require('email-templates').EmailTemplate;
            emailer.sendMail(email, (err) => {
                if (err) throw err;
            })
            return true;
        } catch (err) {
            throw err;
        }
    }

}