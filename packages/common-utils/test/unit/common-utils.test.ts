import { assert } from 'chai';
import CommonUtils from '../../src';

describe('common-utils', function () {
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

  it('#findDuplicates()', function () {
    const result = CommonUtils.findDuplicates(['a', 'b', 'c', 'b', 'a', 'a']);
    assert.equal(result.length, 2);
    assert.equal(result[0], 'a');
    assert.equal(result[1], 'b');
  });

  it('#flatToHierarchy()', function () {
    const result = CommonUtils.flatToHierarchy([
      { id: 1 },
      { id: 2, parent: 1 },
      { id: 3, parent: 1 },
      { id: 4, parent: 2 },
      { id: 5 }
    ]);
    assert.equal(result.length, 2);
    assert.equal(result[0].id, 1);
    assert.equal(result[0].children[0].id, 2);
    assert.equal(result[0].children[0].children[0].id, 4);
  });
});
