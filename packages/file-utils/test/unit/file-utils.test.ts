import {assert} from "chai";
import "mocha";
import * as fs from "fs";
import FileUtils from "../../src";
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
        let obj = FileUtils.readJsonFileSync(TEST_RESOURCES_PATH + "/sample.json");
        assert.equal(obj.title, "Hello");
    });

    it("#writeJsonFileSync()", function () {
        FileUtils.writeJsonFileSync(TEST_RESOURCES_PATH + "/_temp_/write.json", {title: "Write"});
        let obj = FileUtils.readJsonFileSync(TEST_RESOURCES_PATH + "/_temp_/write.json");
        assert.equal(obj.title, "Write");
    });

    it("#writeFileSync()", function () {
        FileUtils.writeFileSync(TEST_RESOURCES_PATH + "/_temp_/write.txt", "Write");
        let str = FileUtils.readFileSync(TEST_RESOURCES_PATH + "/_temp_/write.txt");
        assert.equal(str.toString(), "Write");
    });

    it("#readJsonFilesFromPathSync()", function () {
        let objs = FileUtils.readJsonFilesFromPathSync(TEST_RESOURCES_PATH + "/path/**.json");
        assert.equal(objs[0].title, "a");
        assert.equal(objs[1].title, "b");
    });

    it("#copySync()", function () {
        FileUtils.copySync(TEST_RESOURCES_PATH + "/path", TEST_RESOURCES_PATH + "/copy");
        let objs = FileUtils.readJsonFilesFromPathSync(TEST_RESOURCES_PATH + "/copy/**.json");
        assert.equal(objs[0].title, "a");
        assert.equal(objs[1].title, "b");
    });

});
