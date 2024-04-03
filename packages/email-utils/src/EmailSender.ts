import nodemailer from "npm:nodemailer@6.9.13";

export type EmailSenderConfig = {
  host: string;
  port: number;
  secure?: boolean;
  auth: {
    user: string;
    pass: string;
  };
};

export default class EmailSender {
  #smtpClient: any;
  readonly #config: EmailSenderConfig;

  constructor(config: any) {
    this.#config = config;
  }

  connect() {
    this.#smtpClient = nodemailer.createTransport(this.#config);
  }

  async close() {
    await this.#getSmtpClient().close();
    this.#smtpClient = undefined;
  }

  async send(config: any): Promise<any> {
    return await this.#getSmtpClient().sendMail(config);
  }

  #getSmtpClient() {
    if (!this.#smtpClient) {
      throw new Error("SMTP Client not initialized");
    }
    return this.#smtpClient;
  }
}
