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

    constructor(config: any) {
        this.#imap = new Imap(config);
    }

    connect(resolve: any, reject: any) {
        const that = this;

        let firstSkipped = false;
        let totalMessagesInInbox = 0;

        that.#imap.once('ready', () => {
            logger.info("IMAP receiver ready");
            that.#imap.openBox('INBOX', true, (err, box) => {
                totalMessagesInInbox = box.messages.total;
                logger.info(`Total Inbox Messages [${totalMessagesInInbox}]`)
            });
        });

        that.#imap.on('mail', (numNewMsgs: number) => {
            if (!firstSkipped) {
                firstSkipped = true
                return;
            }

            const fetch = that.#imap.seq.fetch((totalMessagesInInbox + 1) + ":*", {
                bodies: ['']
            });

            totalMessagesInInbox = totalMessagesInInbox + numNewMsgs;


            fetch.on('message', (message, seqno) => {

                message.on('body', function (stream, info) {

                    let buffer = '';
                    stream.on('data', function (chunk) {
                        buffer += chunk.toString();
                    });
                    stream.once('end', function () {
                        resolve({buffer, seqno});
                    });
                });
            });

            fetch.once('error', function (err: Error) {
                reject(err);
            });
        })

        that.#imap.once('error', function (err: Error) {
            reject(err);
            logger.logError(err);
        });

        that.#imap.once('end', function () {
            console.log('Connection ended');
        });

        that.#imap.connect();
    }


}

const logger = createLogger({label: EmailSendHandler.name});