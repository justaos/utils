import {
  SendConfig,
  SMTPClient,
} from "https://deno.land/x/denomailer@1.2.0/mod.ts";

export default class EmailSender {
  #smtpClient: SMTPClient | undefined;
  #config: any;

  constructor(config: any) {
    this.#config = config;
  }

  connect() {
    this.#smtpClient = new SMTPClient({
      connection: this.#config,
    });
  }

  async close() {
    await this.#getSmtpClient().close();
  }

  async send(config: SendConfig) {
    await this.#getSmtpClient().send(config);
  }

  #getSmtpClient() {
    if (!this.#smtpClient) {
      throw new Error("SMTP Client not initialized");
    }
    return this.#smtpClient;
  }
}
