const {assert} = require('chai');
const fs = require('fs');
const utils = require('../../lib');

describe('file-utils', function () {

    it('#readJsonFileSync()', function () {
        let obj = utils.readJsonFileSync('test/resources/sample.json');
        assert.equal(obj.title, 'Hello');
    });

    it('#writeJsonFileSync()', function () {
        utils.writeJsonFileSync('test/resources/_temp_/write.json', {title: 'Write'});
        let obj = utils.readJsonFileSync('test/resources/_temp_/write.json');
        assert.equal(obj.title, 'Write');
    });

    it('#writeFileSync()', function () {
        utils.writeFileSync('test/resources/_temp_/write.txt', 'Write');
        let str = fs.readFileSync('test/resources/_temp_/write.txt');
        assert.equal(str, 'Write');
    });

    it('#readJsonFilesFromPathSync()', function () {
        let objs = utils.readJsonFilesFromPathSync('test/resources/path/**.json');
        assert.equal(objs[0].title, 'a');
        assert.equal(objs[1].title, 'b');
    });

    after(function () {
        fs.unlinkSync('test/resources/_temp_/write.json');
        fs.unlinkSync('test/resources/_temp_/write.txt');
    });

});
