import * as nodemailer from "nodemailer";
import * as Mail from "nodemailer/lib/mailer";
import * as Imap from 'imap';
import {createLogger} from "./logger-utils";
import {simpleParser} from 'mailparser';
// @ts-ignore
import * as replyParser from "node-email-reply-parser";

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

export class EmailReceiveHandler {

    #imap: Imap;

    constructor(config: any, callback: any) {
        let firstSkipped = false;

        this.#imap = new Imap(config);

        this.#imap.once('ready', () => {
            logger.info("IMAP receiver ready");
            this.#imap.openBox('INBOX', true, (err, box) => {

            });
        });

        this.#imap.on('mail', (numNewMsgs: number) => {
            const fetch = this.#imap.seq.fetch(numNewMsgs + ":*", {
                bodies: ['']
            });


            fetch.on('message', (msg, seqno) => {
                if (!firstSkipped) {
                    firstSkipped = true
                    return;
                }
                msg.on('body', function (stream, info) {

                    let buffer = '';
                    stream.on('data', function (chunk) {
                        buffer += chunk.toString('utf8');
                    });
                    stream.once('end', function () {
                        simpleParser(stream).then(function (parsedMail) {
                            callback(buffer, parsedMail);
                        }).catch(function (err) {
                            callback(err);
                            console.log('An error occurred:', err.message);
                        });
                    });
                });
            });

            fetch.once('error', function (err) {
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