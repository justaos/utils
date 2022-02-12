import * as winston from 'winston';
import { LEVELS } from './contants';

export default class Logger {
  readonly #logger: winston.Logger;

  constructor(options: any = {}) {
    options = {
      ...{ label: '' },
      ...options
    };

    const loggerOptions: any = {
      transports: []
    };

    const customLogFormat = winston.format.printf((info: any) => {
      if (info.message instanceof Error) {
        info.message = info.message.stack;
      }
      return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
    });
    const label = winston.format.label({ label: options.label });
    const timestamp = winston.format.timestamp();

    const console = new winston.transports.Console({
      level: LEVELS.INFO,
      format: winston.format.combine(
        label,
        timestamp,
        winston.format.colorize(),
        customLogFormat
      )
    });
    loggerOptions.transports.push(console);

    if (options.filePath) {
      const file = new winston.transports.File({
        filename: options.filePath,
        level: 'silly',
        format: winston.format.combine(label, timestamp, customLogFormat)
      });
      loggerOptions.transports.push(file);
    }

    this.#logger = winston.createLogger(loggerOptions);
  }

  static createLogger(options: any = {}) {
    return new Logger(options);
  }

  log(...args: any): any {
    return this.#logger.log.apply(this.#logger, args); // eslint-disable-line
  }

  error(...args: any): any {
    return this.#logger.error.apply(this.#logger, args); // eslint-disable-line
  }

  info(...args: any): any {
    return this.#logger.info.apply(this.#logger, args); // eslint-disable-line
  }

  warn(...args: any): any {
    return this.#logger.warn.apply(this.#logger, args); // eslint-disable-line
  }

  debug(...args: any): any {
    return this.#logger.debug.apply(this.#logger, args); // eslint-disable-line
  }

  silly(...args: any): any {
    return this.#logger.silly.apply(this.#logger, args); // eslint-disable-line
  }

  logError(err: Error): any {
    return this.log({ level: 'error', message: err });
  }
}
