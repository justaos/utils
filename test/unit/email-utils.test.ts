import {assert} from "chai";
import "mocha";
import * as utils from "../../src";

describe('email-utils', function() {

    it('#parseReply()', function() {
        console.log(utils.parseReply('test'));
        assert.equal(utils.parseReply('test'), 'test');
    });

});
