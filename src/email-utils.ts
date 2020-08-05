import * as nodemailer from "nodemailer";
import * as Mail from "nodemailer/lib/mailer";
import * as Imap from 'imap';
import {createLogger} from "./logger-utils";
// @ts-ignore
import * as replyParser from "node-email-reply-parser";

const parse = require('parse-email');


export class EmailSendHandler {

    #transport: Mail;

    constructor(config: any) {
        this.#transport = nodemailer.createTransport(config);
    }

    sendMail(mailOptions: any, callback: any) {
        this.#transport.sendMail(mailOptions, callback);
    }
}

export function parseReply(mailText: string) {
    return replyParser(mailText, true)
}

export function parseMail(buffer: string) {
    return parse(buffer);
}

export class EmailReceiveHandler {

    #imap: Imap;

    constructor(config: any, callback: any) {
        let firstSkipped = false;
        let total = 1;

        this.#imap = new Imap(config);

        this.#imap.once('ready', () => {
            logger.info("IMAP receiver ready");
            this.#imap.openBox('INBOX', true, (err, box) => {
                total = box.messages.total;
            });
        });

        this.#imap.on('mail', (numNewMsgs: number) => {
            if (!firstSkipped) {
                firstSkipped = true
                return;
            }

            const fetch = this.#imap.seq.fetch((total + 1) + ":*", {
                bodies: ['']
            });

            total = total + numNewMsgs;


            fetch.on('message', (msg, seqno) => {

                msg.on('body', function (stream, info) {

                    let buffer = '';
                    stream.on('data', function (chunk) {
                        buffer += chunk.toString('utf8');
                    });
                    stream.once('end', function () {
                        callback(buffer, seqno);
                    });
                });
            });

            fetch.once('error', function (err: Error) {
                callback(err);
            });
        })

        this.#imap.once('error', function (err: Error) {
            callback(err);
            logger.logError(err);
        });

        this.#imap.once('end', function () {
            console.log('Connection ended');
        });


        this.#imap.connect();
    }


}

const logger = createLogger({label: EmailSendHandler.name});