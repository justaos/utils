import { assertEquals } from "https://deno.land/std@0.107.0/testing/asserts.ts";
import {
  describe,
  it
} from "https://deno.land/x/test_suite@v0.8.0/mod.ts";

import HashUtils from "../mod.ts";


describe("HashUtils", function() {
  it("#validateHash()", async function() {
    const testHash = HashUtils.generateHash("test");
    assertEquals(HashUtils.validateHash("test", testHash), true);
    assertEquals(HashUtils.validateHash("test2", testHash), false);
  });


});