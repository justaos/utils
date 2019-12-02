const {assert, expect} = require('chai');
const utils = require('../../lib');

const LOG_FILEPATH = __dirname + '/log/test.log';
function clearLogFile() {
    utils.writeFileSync(LOG_FILEPATH, "");
}

describe('logger-utils', function () {

    let logger;

    before(function(){
        clearLogFile();
    });


    it('#createLogger()', function () {
        logger = utils.createLogger({filePath: LOG_FILEPATH});
        assert.isOk(!!logger, "Logger created");
    });

    it('#info()', function (done) {
        logger.info("test");
        setTimeout(function() {
            const fileContent = utils.readFileSync(LOG_FILEPATH);
            const logStr = fileContent.toString();
            expect(logStr).to.contain("info: test");
            done();
        }, 500);

    });

    it('#error()', function (done) {
        logger.error("test");
        setTimeout(function() {
            const fileContent = utils.readFileSync(LOG_FILEPATH);
            const logStr = fileContent.toString();
            expect(logStr).to.contain("error: test");
            done();
        }, 500);
    });

    it('#warn()', function (done) {
        logger.warn("test");
        setTimeout(function() {
            const fileContent = utils.readFileSync(LOG_FILEPATH);
            const logStr = fileContent.toString();
            expect(logStr).to.contain("warn: test");
            done();
        }, 500);
    });
});
