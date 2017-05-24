import { assert as t } from "chai";
import * as path from "path";
import * as fs from "fs";
import { remove, mkdir } from "../index";

describe("remove", () => {
  it("should remove a file", async () => {
    const f = path.join(__dirname, "foo.txt");
    fs.writeFileSync(f, "hello world", "utf-8");
    return await remove(f);
  });

  it("should remove a directory", async () => {
    const tmp = path.join(__dirname, "tmp");
    await mkdir(tmp);

    fs.writeFileSync(path.join(tmp, "foo1.txt"), "hello world", "utf-8");
    fs.writeFileSync(path.join(tmp, "foo2.txt"), "hello world2", "utf-8");
    return await remove(tmp);
  });

  it("should reject Promise on error", async () => {
    const f = path.join(__dirname, "bar.txt");

    try {
      await remove(f);
      t.fail();
    } catch (err) { /* noop */ }
  });
});
