import { assert, describe, it } from "../../../test_deps.ts";

import { EmailSender } from "../mod.ts";
import { load } from "jsr:@std/dotenv@0.221.0";

await load({export: true});

describe("email-utils", function () {
  it("#EmailSender", async function () {
    const sender = new EmailSender({
      host: "smtp.office365.com",
      port: 587,
      auth: {
        user: Deno.env.get('SMTP_TEST_USERNAME'),
        pass: Deno.env.get('SMTP_TEST_PASSWORD'),
      },
    });
    sender.connect();
    const info = await sender.send({
      from: Deno.env.get('SMTP_TEST_FROM_EMAIL'),
      to: Deno.env.get('SMTP_TEST_TO_EMAIL'),
      subject: "send.test.ts -> test run",
      html: "<p>Hello World</p>",
    });
    await sender.close();
    assert(!!info.messageId);
  });
});
