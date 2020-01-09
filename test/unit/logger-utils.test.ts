import {assert, expect} from "chai";
import "mocha";
import * as fs from "fs";
import * as utils from "../../src";
import {TEST_RESOURCES_PATH} from "../test.utils";

const LOG_FILEPATH =  TEST_RESOURCES_PATH + '/test.log';

describe('logger-utils', function () {

    let logger: any;

    after(function () {
        fs.unlinkSync(LOG_FILEPATH);
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
