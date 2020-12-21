import { assert } from 'chai';
import DSUtils from '../../src';

describe('ds-utils', function () {
  it('#underscoreToCamelCase()', function () {
    assert.equal(DSUtils.underscoreToCamelCase('hello_world'), 'Hello World');
    assert.equal(
      DSUtils.underscoreToCamelCase('_hello_world_'),
      ' Hello World '
    );
  });

  it('#hasDuplicates()', function () {
    assert.equal(DSUtils.hasDuplicates(['a', 'a']), true);
    assert.equal(DSUtils.hasDuplicates(['a', 'ab']), false);
  });
});
