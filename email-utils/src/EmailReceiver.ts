import Imap from 'npm:imap@0.8.19';

import { Logger } from '../deps.ts';
import * as mailparser from 'npm:mailparser';
import replyParser from 'npm:node-email-reply-parser';


export function parseReply(mailText: string): string {
  return replyParser(mailText, true);
}

export function parseMail(buffer: string): Promise<any> {
  return mailparser.simpleParser(buffer);
}

export default class EmailReceiveHandler {
  #imap: any;

  constructor(config: any) {
    this.#imap = new Imap(config);
  }

  connect(resolve: any, reject: any) {
    let firstSkipped = false;
    let totalMessagesInInbox = 0;

    this.#imap.once('ready', () => {
      emailReceiverLogger.info('IMAP receiver ready');
      this.#imap.openBox('INBOX', true, (err: any, box: any) => {
        totalMessagesInInbox = box.messages.total;
        emailReceiverLogger.info(
          `Total Inbox Messages [${totalMessagesInInbox}]`
        );
      });
    });

    this.#imap.on('mail', (numNewMsgs: number) => {
      if (!firstSkipped) {
        firstSkipped = true;
        return;
      }

      const fetch = this.#imap.seq.fetch(totalMessagesInInbox + 1 + ':*', {
        bodies: ['']
      });

      totalMessagesInInbox = totalMessagesInInbox + numNewMsgs;

      fetch.on('message', (message: any, seqno: any) => {
        message.on('body', function(stream: any, info: any) {
          let buffer = '';
          stream.on('data', function(chunk: any) {
            buffer += chunk.toString();
          });
          stream.once('end', function() {
            resolve({ buffer, seqno });
          });
        });
      });

      fetch.once('error', function(err: Error) {
        reject(err);
      });
    });

    this.#imap.on('error', function(err: Error) {
      reject(err);
      emailReceiverLogger.error(err);
    });

    this.#imap.on('end', function() {
      emailReceiverLogger.info('Connection ended');
    });

    this.#imap.on('close', (err: Error) => {
      emailReceiverLogger.info(
        'Connection closed. Will retry to connect after 10 secs'
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

const emailReceiverLogger = Logger.createLogger({
  label: EmailReceiveHandler.name
});

