import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import Imap from 'imap';
import { createLogger } from './logger-utils';
import { simpleParser } from 'mailparser';
// @ts-ignore
import replyParser from 'node-email-reply-parser';

export class EmailSendHandler {
  #transport: Mail;

  constructor(config: any) {
    this.#transport = nodemailer.createTransport(config);
  }

  sendMail(mailOptions: any, callback: any) {
    this.#transport.sendMail(mailOptions, callback);
  }
}

export function parseReply(mailText: string): string {
  return replyParser(mailText, true);
}

export function parseMail(buffer: string): Promise<any> {
  return simpleParser(buffer);
}

export class EmailReceiveHandler {
  #imap: Imap;

  constructor(config: any) {
    this.#imap = new Imap(config);
  }

  connect(resolve: any, reject: any) {
    let firstSkipped = false;
    let totalMessagesInInbox = 0;

    this.#imap.once('ready', () => {
      emailReceiverLogger.info('IMAP receiver ready');
      this.#imap.openBox('INBOX', true, (err, box) => {
        totalMessagesInInbox = box.messages.total;
        emailReceiverLogger.info(
          `Total Inbox Messages [${totalMessagesInInbox}]`,
        );
      });
    });

    this.#imap.on('mail', (numNewMsgs: number) => {
      if (!firstSkipped) {
        firstSkipped = true;
        return;
      }

      const fetch = this.#imap.seq.fetch(totalMessagesInInbox + 1 + ':*', {
        bodies: [''],
      });

      totalMessagesInInbox = totalMessagesInInbox + numNewMsgs;

      fetch.on('message', (message, seqno) => {
        message.on('body', function (stream, info) {
          let buffer = '';
          stream.on('data', function (chunk) {
            buffer += chunk.toString();
          });
          stream.once('end', function () {
            resolve({ buffer, seqno });
          });
        });
      });

      fetch.once('error', function (err: Error) {
        reject(err);
      });
    });

    this.#imap.on('error', function (err: Error) {
      reject(err);
      emailReceiverLogger.logError(err);
    });

    this.#imap.on('end', function () {
      emailReceiverLogger.info('Connection ended');
    });

    this.#imap.on('close', (err: Error) => {
      emailReceiverLogger.info(
        'Connection closed. Will retry to connect after 10 secs',
      );
      setTimeout(() => {
        this.#imap.connect();
      }, 10000);
    });

    this.#imap.connect();
  }

  end() {
    return this.#imap.end();
  }
}

const emailReceiverLogger = createLogger({ label: EmailReceiveHandler.name });
