const {assert, expect} = require('chai');
const utils = require('../../lib');

const LOG_FILEPATH = __dirname + '/log/test.log';
function clearLogFile() {
    utils.writeFileSync(LOG_FILEPATH, "");
}

describe('logger-utils', function () {

    let logger;



    it('#createLogger()', function () {
        logger = utils.createLogger({filePath: LOG_FILEPATH});
        assert.isOk(!!logger, "Logger created");
    });

    it('#info()', function () {
        logger.info("test");
        const fileContent = utils.readFileSync(LOG_FILEPATH);
        const logStr = fileContent.toString();
        expect(logStr).to.contain("info: test");
    });

    it('#error()', function () {
        logger.error("test");
        const fileContent = utils.readFileSync(LOG_FILEPATH);
        const logStr = fileContent.toString();
        expect(logStr).to.contain("error: test");
    });

    it('#warn()', function () {
        logger.warn("test");
        const fileContent = utils.readFileSync(LOG_FILEPATH);
        const logStr = fileContent.toString();
        expect(logStr).to.contain("warn: test");
        clearLogFile();
    });
});
