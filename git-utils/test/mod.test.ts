import { afterAll, assertEquals, beforeAll, describe, it } from "../../test.deps.ts";

import GitUtils from "../mod.ts";
import { FileUtils } from "../../mod.ts";
import { path } from "../../deps.ts";

const __dirname = path.dirname(path.fromFileUrl(import.meta.url));
const TEST_RESOURCES_PATH = path.normalize(__dirname + "/resources");

describe({
  name: "GitUtils",
  sanitizeResources: false,
  sanitizeOps: false,
  fn: () => {

    beforeAll(function () {
      const tempDir = `${TEST_RESOURCES_PATH}/_temp_`;
      if (FileUtils.existsSync(tempDir)) {
        FileUtils.removeSync(tempDir, { recursive: true });
      }
      FileUtils.mkdirSync(tempDir, { recursive: true });
    });

    it("#validateHash()", async () => {
      await GitUtils.checkoutRepository(
        `${TEST_RESOURCES_PATH}/_temp_`,
        "https://github.com/justaos/odm.git"
      );
      assertEquals(
        FileUtils.existsSync(
          TEST_RESOURCES_PATH + "/_temp_/odm",
        ),
        true,
      );
    });
  }
});
