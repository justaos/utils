import { assertEquals } from 'https://deno.land/std@0.107.0/testing/asserts.ts';
import {
  describe,
  it
} from 'https://deno.land/x/test_suite@v0.8.0/mod.ts';

import CommonUtils from '../mod.ts';


describe('common-utils', function() {
  it('#underscoreToCamelCase()', function() {
    assertEquals(
      CommonUtils.underscoreToCamelCase('hello_world'),
      'Hello World'
    );
    assertEquals(
      CommonUtils.underscoreToCamelCase('_hello_world_'),
      ' Hello World '
    );
  });

  it('#hasDuplicates()', function() {
    assertEquals(CommonUtils.hasDuplicates(['a', 'a']), true);
    assertEquals(CommonUtils.hasDuplicates(['a', 'ab']), false);
  });

  it('#findDuplicates()', function() {
    const result = CommonUtils.findDuplicates(['a', 'b', 'c', 'b', 'a', 'a']);
    assertEquals(result.length, 2);
    assertEquals(result[0], 'a');
    assertEquals(result[1], 'b');
  });

  it('#flatToHierarchy()', function() {
    const result = CommonUtils.flatToHierarchy([
      { id: 1 },
      { id: 2, parent: 1 },
      { id: 3, parent: 1 },
      { id: 4, parent: 2 },
      { id: 5 }
    ]);
    assertEquals(result.length, 2);
    assertEquals(result[0].id, 1);
    assertEquals(result[0].children[0].id, 2);
    assertEquals(result[0].children[0].children[0].id, 4);
  });
});