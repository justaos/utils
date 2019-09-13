const {createLogger} = require('../lib/logger-utils');

const logger = createLogger({filePath: __dirname + '/log/test.log', label: 'logger.js'});
logger.info("some info message");
logger.error("Some error");
logger.logError(new Error("this is a error object"));
