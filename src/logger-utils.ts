import * as winston from 'winston';

const LEVELS = {
    ERROR: 'error', // 0
    WARN: 'warn', // 1
    INFO: 'info', // 2
    VERBOSE: 'verbose', // 3
    DEBUG: 'debug', // 4
    SILLY: 'silly' // 5
};

export class Logger {

    logger: winston.Logger;

    constructor(options: any = {}) {
        options = {
            ...{label: ''},
            ...options,
        };

        let loggerOptions: any = {
            transports: []
        };

        const customLogFormat = winston.format.printf((info: any) => {
            if (info.message instanceof Error) {
                info.message = info.message.stack;
            }
            return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
        });
        const label = winston.format.label({label: options.label});
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
                filename: options.filePath, level: 'silly', format: winston.format.combine(
                    label,
                    timestamp,
                    customLogFormat
                )
            });
            loggerOptions.transports.push(file);
        }

        this.logger = winston.createLogger(loggerOptions);
    }

    log(options: any) {
        // @ts-ignore
        return this.logger.log.apply(this.logger, arguments);
    }

    error(options: any) {
        // @ts-ignore
        return this.logger.error.apply(this.logger, arguments);
    }

    info(options: any) {
        // @ts-ignore
        return this.logger.info.apply(this.logger, arguments);
    }

    warn(options: any) {
        // @ts-ignore
        return this.logger.warn.apply(this.logger, arguments);
    }

    debug(options: any) {
        // @ts-ignore
        return this.logger.debug.apply(this.logger, arguments);
    }

    silly(options: any) {
        // @ts-ignore
        return this.logger.silly.apply(this.logger, arguments);
    }

    logError(err: Error) {
        this.log({level: 'error', message: err});
    }

}


export function createLogger(options: any = {}) {
    return new Logger(options);
}
