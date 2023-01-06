import { assertEquals, describe, it } from "../../test.deps.ts";

import DateUtils from "../mod.ts";

describe("date-utils", function () {
  it("#isIsoDate()", function () {
    assertEquals(
      DateUtils.isIsoDate("2022-12-27T07:40:25.551Z"),
      true,
    );
    assertEquals(
      DateUtils.isIsoDate("hello_world"),
      false,
    );
  });
});
