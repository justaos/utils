import * as nodemailer from "nodemailer";

const privates = Symbol('privates');

export class EmailSendHandler {

    private [privates]: any;

    constructor(config: any) {
        this[privates].transport = nodemailer.createTransport(config);
    }

    sendMail(mailOptions: any, callback: any) {
        this[privates].transport.sendMail(mailOptions, callback);
    }
}