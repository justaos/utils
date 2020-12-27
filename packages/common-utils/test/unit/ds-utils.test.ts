import { assert } from 'chai';
import CommonUtils from '../../src';

describe('ds-utils', function () {
  it('#underscoreToCamelCase()', function () {
    assert.equal(
      CommonUtils.underscoreToCamelCase('hello_world'),
      'Hello World'
    );
    assert.equal(
      CommonUtils.underscoreToCamelCase('_hello_world_'),
      ' Hello World '
    );
  });

  it('#hasDuplicates()', function () {
    assert.equal(CommonUtils.hasDuplicates(['a', 'a']), true);
    assert.equal(CommonUtils.hasDuplicates(['a', 'ab']), false);
  });
});
