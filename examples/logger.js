const {createLogger} = require('../lib/logger-utils');

const logger = createLogger({filePath: __dirname + '/log/test.log'});
logger.info("some info message");
logger.error("and an error message");
