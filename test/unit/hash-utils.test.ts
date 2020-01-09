import {assert} from "chai";
import "mocha";
import * as utils from "../../src";

describe('hash-utils', function() {

  it('#validateHash()', function() {
    assert.isTrue(utils.validateHash('admin',
        '$2a$08$tr.RqALF3sNUNkkINTmm2uTFxu/lnyDKXiEP4Ld2n1wdKiPe03gue'),
        'hashing comparision failed');
  });

  it('#generateHash()', function() {
    let hash = utils.generateHash('admin');
    assert.isTrue(utils.validateHash('admin', hash),
        'invalid hash generated'
    );
  });

});
