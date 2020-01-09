import {assert} from "chai";
import "mocha";
import * as fs from "fs";
import * as utils from "../../src";
import {TEST_RESOURCES_PATH} from "../test.utils";

describe("file-utils", function () {

    before(function () {
        let dir = TEST_RESOURCES_PATH + "/_temp_";
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
    });

    after(function () {
        fs.unlinkSync(TEST_RESOURCES_PATH + "/_temp_/write.json");
        fs.unlinkSync(TEST_RESOURCES_PATH + "/_temp_/write.txt");
        fs.unlinkSync(TEST_RESOURCES_PATH + "/copy/a.json");
        fs.unlinkSync(TEST_RESOURCES_PATH + "/copy/b.json");
    });

    it("#readJsonFileSync()", function () {
        let obj = utils.readJsonFileSync(TEST_RESOURCES_PATH + "/sample.json", null);
        assert.equal(obj.title, "Hello");
    });

    it("#writeJsonFileSync()", function () {
        utils.writeJsonFileSync(TEST_RESOURCES_PATH + "/_temp_/write.json", {title: "Write"});
        let obj = utils.readJsonFileSync(TEST_RESOURCES_PATH + "/_temp_/write.json", null);
        assert.equal(obj.title, "Write");
    });

    it("#writeFileSync()", function () {
        utils.writeFileSync(TEST_RESOURCES_PATH + "/_temp_/write.txt", "Write");
        let str = utils.readFileSync(TEST_RESOURCES_PATH + "/_temp_/write.txt");
        assert.equal(str.toString(), "Write");
    });

    it("#readJsonFilesFromPathSync()", function () {
        let objs = utils.readJsonFilesFromPathSync(TEST_RESOURCES_PATH + "/path/**.json", null);
        assert.equal(objs[0].title, "a");
        assert.equal(objs[1].title, "b");
    });

    it("#copySync()", function () {
        utils.copySync(TEST_RESOURCES_PATH + "/path", TEST_RESOURCES_PATH + "/copy");
        let objs = utils.readJsonFilesFromPathSync(TEST_RESOURCES_PATH + "/copy/**.json", null);
        assert.equal(objs[0].title, "a");
        assert.equal(objs[1].title, "b");
    });

});
