import { path } from "../../../deps.ts";
import {
  afterAll,
  assertEquals,
  beforeAll,
  describe,
  it,
} from "../../../test_deps.ts";
import FileUtils from "../mod.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const TEST_RESOURCES_PATH = path.normalize(__dirname + "/resources");

describe({
  name: "file-utils",
  sanitizeResources: false,
  sanitizeOps: false,
  fn: () => {
    beforeAll(async () => {
      const tempDir = `${TEST_RESOURCES_PATH}/.temp`;
      if (!FileUtils.existsSync(tempDir)) {
        console.log("SHIVAJI true")
        FileUtils.mkdirSync(tempDir, { recursive: true });
      }
    });

    afterAll(async ()=> {
      /*const tempDir = `${TEST_RESOURCES_PATH}/.temp`;
      if (FileUtils.existsSync(tempDir)) {
        FileUtils.remove(tempDir, { recursive: true });
      }*/
      const copyDir = `${TEST_RESOURCES_PATH}/copy`;
      if (FileUtils.existsSync(copyDir)) {
        FileUtils.remove(copyDir, { recursive: true });
      }
    });

    it("#readTextFileSync()", function () {
      const fileContent = FileUtils.readTextFileSync(
        `${TEST_RESOURCES_PATH}/sample.txt`,
      );
      assertEquals(fileContent, "Hello");
    });

    it("#readJsonFileSync()", function () {
      const obj = FileUtils.readJsonFileSync(
        `${TEST_RESOURCES_PATH}/sample.json`,
      );
      assertEquals(obj.title, "Hello");
    });

    it("#writeJsonFileSync()", function () {
      FileUtils.writeJsonFileSync(`${TEST_RESOURCES_PATH}/.temp/write.json`, {
        title: "Write",
      });
      const obj = FileUtils.readJsonFileSync(
        `${TEST_RESOURCES_PATH}/.temp/write.json`,
      );
      assertEquals(obj.title, "Write");
    });

    it("#writeTextFileSync()", function () {
      FileUtils.writeTextFileSync(
        `${TEST_RESOURCES_PATH}/.temp/write.txt`,
        "Write",
      );
      const str = FileUtils.readTextFileSync(
        `${TEST_RESOURCES_PATH}/.temp/write.txt`,
      );
      assertEquals(str.toString(), "Write");
    });

    it("#readJsonFilesFromPathSync()", function () {
      const arr = FileUtils.readJsonFilesFromPathSync(
        `${TEST_RESOURCES_PATH}/path/**.json`,
      );
      assertEquals(arr[0].title, "a");
      assertEquals(arr[1].title, "b");
    });

    it("#remove()", async () => {
      const dir = `${TEST_RESOURCES_PATH}/.temp`;
      FileUtils.removeSync(dir, { recursive: true });
      assertEquals(FileUtils.existsSync(dir), false);
    });

    it("#copySync()", function () {
      FileUtils.copySync(
        TEST_RESOURCES_PATH + "/path",
        TEST_RESOURCES_PATH + "/copy",
      );
      const objs = FileUtils.readJsonFilesFromPathSync(
        TEST_RESOURCES_PATH + "/copy/**.json",
      );
      assertEquals(objs[0].title, "a");
      assertEquals(objs[1].title, "b");
    });

    it("#unZipFromURL()", async () => {
      FileUtils.mkdirSync(path.join(`${TEST_RESOURCES_PATH}/.temp`), {
        recursive: true,
      });
      await FileUtils.unZipFromURL(
        new URL("./resources/compress.zip", import.meta.url),
        path.join(`${TEST_RESOURCES_PATH}/.temp/uncompressed`),
      );
      assertEquals(
        FileUtils.existsSync(
          TEST_RESOURCES_PATH + "/.temp/uncompressed/path/a.json",
        ),
        true,
      );
      assertEquals(
        FileUtils.existsSync(
          TEST_RESOURCES_PATH + "/.temp/uncompressed/sample.txt",
        ),
        true,
      );
    });
  },
});
