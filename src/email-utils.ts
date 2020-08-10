import * as nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import Imap from "imap";
import {createLogger} from "./logger-utils";
import {simpleParser} from "mailparser";

const replyParser = require("node-email-reply-parser");



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
    return simpleParser(buffer);
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
            emailReceiverLogger.info("IMAP receiver ready");
            that.#imap.openBox('INBOX', true, (err, box) => {
                totalMessagesInInbox = box.messages.total;
                emailReceiverLogger.info(`Total Inbox Messages [${totalMessagesInInbox}]`)
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

        that.#imap.on('error', function (err: Error) {
            reject(err);
            emailReceiverLogger.logError(err);
        });

        that.#imap.on('end', function () {
            emailReceiverLogger.info('Connection ended');
        });

        that.#imap.on('close', function (err: Error) {
            emailReceiverLogger.info("Connection closed. Will retry to connect after 10 secs");
            setTimeout(()=> {
                that.#imap.connect();
            }, 10000);
        });

        that.#imap.connect();
    }

    end() {
        return this.#imap.end();
    }


}

const emailSenderLogger = createLogger({label: EmailSendHandler.name});
const emailReceiverLogger = createLogger({label: EmailReceiveHandler.name});