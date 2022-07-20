import { Houston, ConsoleTransport, FileTransport, TimePrefix, Format, LogLevelDisplay, LogLevel } from 'https://x.nest.land/Houston@1.0.0/mod.ts'
import LoggerLevel from './LoggerLevel.ts';
import LoggerOptions from './LoggerOptions.ts';

export default class Logger {
  logger: Houston;

  constructor(options: LoggerOptions = new LoggerOptions()) {


    const transports  = [];

    transports.push(new ConsoleTransport( [LogLevel.Info, LogLevel.Success, LogLevel.Warning, LogLevel.Error], {
      format: Format.text,
      prefix: new TimePrefix(),
      logLevelDisplay: LogLevelDisplay.Text,
    }));

    if (options.filePath) {
      transports.push(new FileTransport(options.filePath));
    }

    this.logger = new Houston(transports);

  /*  const customLogFormat = Houston.format.printf((info: any) => {
      if (info.message instanceof Error) {
        info.message = info.message.stack;
      }
      return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
    });
    const label = Houston.format.label({ label: options.label });
    const timestamp = Houston.format.timestamp();

    const console = new Houston.transports.Console({
      level: LEVELS.INFO,
      format: Houston.format.combine(
        label,
        timestamp,
        Houston.format.colorize(),
        customLogFormat
      )
    });
    loggerOptions.transports.push(console);

    if (options.filePath) {
      const file = new Houston.transports.File({
        filename: options.filePath,
        level: 'silly',
        format: Houston.format.combine(label, timestamp, customLogFormat)
      });
      loggerOptions.transports.push(file);
    }*/
  }

  static createLogger(options: any = {}) {
    return new Logger(options);
  }

  log(...args: any): any {
    return this.logger.log.apply(this.logger, args);
  }

  error(...args: any): any {
    return this.logger.error.apply(this.logger, args);
  }

  info(...args: any): any {
    return this.logger.info.apply(this.logger, args);
  }

  warn(...args: any): any {
    return this.logger.warning.apply(this.logger, args);
  }
}
