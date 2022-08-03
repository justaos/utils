import * as path from "https://deno.land/std@0.57.0/path/mod.ts";
import { assertEquals } from 'https://deno.land/std@0.107.0/testing/asserts.ts';
import { afterAll, beforeAll, describe, it } from 'https://deno.land/x/test_suite@v0.8.0/mod.ts';
import FileUtils from '../mod.ts';


const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const TEST_RESOURCES_PATH =path.normalize(__dirname + '/resources');

describe('file-utils', function() {

  beforeAll(function() {
    const tempDir = `${TEST_RESOURCES_PATH}/_temp_`;
    if (!FileUtils.existsSync(tempDir)) {
      FileUtils.mkdirSync(tempDir, { recursive: true });
    }
  });

  afterAll(function() {
    const tempDir = `${TEST_RESOURCES_PATH}/_temp_`;
    if (FileUtils.existsSync(tempDir)) {
      FileUtils.remove(tempDir, { recursive: true });
    }
    const copyDir = `${TEST_RESOURCES_PATH}/copy`;
    if (FileUtils.existsSync(copyDir)) {
      FileUtils.remove(copyDir, { recursive: true });
    }
  });

  it('#readTextFileSync()', function() {
    const fileContent = FileUtils.readTextFileSync(`${TEST_RESOURCES_PATH}/sample.txt`);
    assertEquals(fileContent, 'Hello');
  });

  it('#readJsonFileSync()', function() {
    const obj = FileUtils.readJsonFileSync(`${TEST_RESOURCES_PATH}/sample.json`);
    assertEquals(obj.title, 'Hello');
  });

  it('#writeJsonFileSync()', function() {
    FileUtils.writeJsonFileSync(`${TEST_RESOURCES_PATH}/_temp_/write.json`, { title: 'Write' });
    const obj = FileUtils.readJsonFileSync(`${TEST_RESOURCES_PATH}/_temp_/write.json`);
    assertEquals(obj.title, 'Write');
  });

  it('#writeTextFileSync()', function() {
    FileUtils.writeTextFileSync(`${TEST_RESOURCES_PATH}/_temp_/write.txt`, 'Write');
    const str = FileUtils.readTextFileSync(`${TEST_RESOURCES_PATH}/_temp_/write.txt`);
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
     const objs = FileUtils.readJsonFilesFromPathSync(TEST_RESOURCES_PATH + '/copy/**.json');
     assertEquals(objs[0].title, 'a');
     assertEquals(objs[1].title, 'b');
   });

});
