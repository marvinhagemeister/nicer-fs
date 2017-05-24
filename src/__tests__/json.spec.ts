import { assert as t } from "chai";
import * as path from "path";
import { readJson, writeJson, remove, readFile, writeFile } from "../index";

describe("json", () => {
  it("should readJson", async () => {
    const file = path.join(__dirname, "tmp", "foo.json");
    await writeJson(file, { foo: "bar" });

    const content = await readJson(file);
    t.deepEqual(content, { foo: "bar" });
    return await remove(file);
  });

  it("should fail when reading invalid json", async () => {
    const file = path.join(__dirname, "tmp", "foo.json");
    await writeFile(file, "{\n  \"foo\"\": \"bar\"\n}\n");

    try  {
      await readJson(file);
      t.fail();
    } catch (err) { /* noop */ }

    return await remove(file);
  });

  it("should writeJson", async () => {
    const file = path.join(__dirname, "tmp", "foo.json");
    await writeJson(file, { foo: "bar" });

    const content = await readFile(file, "utf8");
    t.equal(content, "{\n  \"foo\": \"bar\"\n}\n");
    return await remove(file);
  });
});
