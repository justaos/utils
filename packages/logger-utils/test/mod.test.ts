import { assertEquals, describe, it } from "../../../test.deps.ts";

import { LoggerUtils } from "../mod.ts";
import { bgRgb24, rgb24 } from "https://deno.land/std@0.210.0/fmt/colors.ts";
import { FileUtils } from "../../../mod.ts";

describe({
  name: "LoggerUtils",
  sanitizeResources: false,
  sanitizeOps: false,
  fn: () => {
    it("#getLogger()", async function () {
      LoggerUtils.defineFileHandler("my-file-handler", "./my-file-handler.txt");
      const logger = LoggerUtils.defineLogger("test", "DEBUG", [
        "console",
        "my-file-handler"
      ]);
      logger.info(
        bgRgb24(rgb24("Hello, World!", { r: 0, g: 0, b: 0 }), {
          r: 255,
          g: 138,
          b: 101
        })
      );
      assertEquals(FileUtils.existsSync("./my-file-handler.txt"), true);
      FileUtils.removeSync("./my-file-handler.txt");
    });
  }
});
