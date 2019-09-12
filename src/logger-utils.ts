import * as winston from 'winston';

const LEVELS = {
    ERROR: 'error', // 0
    WARN: 'warn', // 1
    INFO: 'info', // 2
    VERBOSE: 'verbose', // 3
    DEBUG: 'debug', // 4
    SILLY: 'silly' // 5
};

export function createLogger(options: any = {}) {

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

    let logger = winston.createLogger(loggerOptions);
    // @ts-ignore
    logger.logError = function(err: Error) {
        // @ts-ignore
        this.log({level:'error', message: new Error("and an error message")});
    };
    return logger;
}
