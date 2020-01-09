import {assert} from "chai";
import "mocha";
import * as utils from "../../src";

describe('string-utils', function() {

  it('#underscoreToCamelCase()', function() {
    assert.equal(utils.underscoreToCamelCase('hello_world'), 'Hello World');
    assert.equal(utils.underscoreToCamelCase('_hello_world_'), ' Hello World ');
  });

});
