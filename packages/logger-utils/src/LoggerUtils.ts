import { getLogger, log, Logger } from "../deps.ts";

export default class LoggerUtils {
  static loggers: {
    [key: string]: any;
  } = {};

  static handlers: {
    [key: string]: any;
  } = {
    console: new log.ConsoleHandler("NOTSET", {
      formatter: (record: any) =>
        `[${record.datetime.toISOString()}] ${record.levelName.padEnd(
          7
        )} ${record.loggerName.padEnd(20)} ${record.msg}`
    })
  };

  static setup() {
    log.setup({
      handlers: LoggerUtils.handlers,
      loggers: LoggerUtils.loggers
    });
  }

  static getLogger(loggerName: string): Logger {
    if (!LoggerUtils.loggers[loggerName]) {
      return LoggerUtils.defineLogger(loggerName);
    }
    return getLogger(loggerName);
  }

  static defineFileHandler(handlerName: string, filename: string) {
    LoggerUtils.handlers[handlerName] = new log.FileHandler("NOTSET", {
      filename: filename,
      // you can change format of output message using any keys in `LogRecord`.
      formatter: (record: any) =>
        `[${record.datetime.toISOString()}] ${record.levelName.padEnd(
          7
        )} ${record.loggerName.padEnd(20)} ${record.msg.replace(
          /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g,
          ""
        )}`
    });
  }

  static defineLogger(loggerName: string, level?: string, handlers?: string[]): Logger {
    LoggerUtils.loggers[loggerName] = {
      level: level || "INFO",
      handlers: handlers || ["console"]
    };
    LoggerUtils.setup();
    return getLogger(loggerName);
  }
}
