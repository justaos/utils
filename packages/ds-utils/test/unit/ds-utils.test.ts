import { assert } from 'chai';
import DSUtils from '../../src';

describe('ds-utils', function() {

  it('#underscoreToCamelCase()', function() {
    assert.equal(DSUtils.underscoreToCamelCase('hello_world'), 'Hello World');
    assert.equal(DSUtils.underscoreToCamelCase('_hello_world_'), ' Hello World ');
  });

});
