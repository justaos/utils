const {createLogger} = require('../lib/logger-utils');

const logger = createLogger({filePath: __dirname + '/log/test.log'});
logger.info("some info message");
logger.error("Some error");
logger.logError(new Error("and an error message"));
