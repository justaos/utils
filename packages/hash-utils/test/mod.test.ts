import { assertEquals, describe, it } from "../../../test.deps.ts";

import HashUtils from "../mod.ts";

describe("HashUtils", function () {
  it("#validateHash()", async function () {
    const testHash = HashUtils.generateHash("test");
    assertEquals(HashUtils.validateHash("test", testHash), true);
    assertEquals(HashUtils.validateHash("test2", testHash), false);
  });
});
