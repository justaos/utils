import { assertEquals } from 'https://deno.land/std@0.107.0/testing/asserts.ts';
import { afterAll, beforeAll, describe, it } from 'https://deno.land/x/test_suite@v0.8.0/mod.ts';
import FileUtils from '../mod.ts';


const TEST_RESOURCES_PATH = './test/resources';


describe('file-utils', function() {

  beforeAll(function() {
    const dir = `${TEST_RESOURCES_PATH}/_temp_`;
    if (!FileUtils.existsSync(dir)) {
      FileUtils.mkdirSync(dir, { recursive: true });
    }
    const copyDir = `${TEST_RESOURCES_PATH}/copy`;
    if (FileUtils.existsSync(copyDir)) {
      FileUtils.remove(copyDir, { recursive: true });
    }
  });

  afterAll(function() {

  });

  it('#readTextFileSync()', function() {
    let fileContent = FileUtils.readTextFileSync(`${TEST_RESOURCES_PATH}/sample.txt`);
    assertEquals(fileContent, 'Hello');
  });

  it('#readJsonFileSync()', function() {
    let obj = FileUtils.readJsonFileSync(`${TEST_RESOURCES_PATH}/sample.json`);
    assertEquals(obj.title, 'Hello');
  });

  it('#writeJsonFileSync()', function() {
    FileUtils.writeJsonFileSync(`${TEST_RESOURCES_PATH}/_temp_/write.json`, { title: 'Write' });
    let obj = FileUtils.readJsonFileSync(`${TEST_RESOURCES_PATH}/_temp_/write.json`);
    assertEquals(obj.title, 'Write');
  });

  it('#writeTextFileSync()', function() {
    FileUtils.writeTextFileSync(`${TEST_RESOURCES_PATH}/_temp_/write.txt`, 'Write');
    let str = FileUtils.readTextFileSync(`${TEST_RESOURCES_PATH}/_temp_/write.txt`);
    assertEquals(str.toString(), 'Write');
  });

  it('#readJsonFilesFromPathSync()', function() {
    const arr = FileUtils.readJsonFilesFromPathSync(`${TEST_RESOURCES_PATH}/path/**.json`);
    assertEquals(arr[0].title, 'a');
    assertEquals(arr[1].title, 'b');
  });

  it('#remove()', function() {
    const dir = `${TEST_RESOURCES_PATH}/_temp_`;
    FileUtils.removeSync(dir, { recursive: true });
    assertEquals(FileUtils.existsSync(dir), false);
  });

   it('#copySync()', function() {
     FileUtils.copySync(TEST_RESOURCES_PATH + '/path', TEST_RESOURCES_PATH + '/copy');
     let objs = FileUtils.readJsonFilesFromPathSync(TEST_RESOURCES_PATH + '/copy/**.json');
     assertEquals(objs[0].title, 'a');
     assertEquals(objs[1].title, 'b');
   });

});
