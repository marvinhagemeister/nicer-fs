import { assert as t } from "chai";
import * as path from "path";
import * as fs from "fs";
import { copy, mkdir, remove } from "../index";

describe("copy", () => {
  it("should copy a file", async () => {
    const source = path.join(__dirname, "tmp.txt");
    const target = path.join(__dirname, "tmp2.txt");

    fs.writeFileSync("./src/__tests__/tmp.txt", "hello world", "utf8");

    await copy(source, target);
    t.equal(fs.readFileSync(target, "utf8"), "hello world");
    fs.unlinkSync(source);
    fs.unlinkSync(target);
  });

  it("should copy a folder", async () => {
    const tmp = path.join(__dirname, "tmp");
    await mkdir(tmp);

    fs.writeFileSync(path.join(tmp, "foo1.txt"), "hello world", "utf8");
    fs.writeFileSync(path.join(tmp, "foo2.txt"), "hello world2", "utf8");

    const tmp2 = path.join(__dirname, "tmp2");
    await copy(tmp, tmp2);
    return await remove(tmp, tmp2);
  });

  it("should reject promise on failure", async () => {
    const target = "foo.txt";

    try {
      await copy("foo/bar", target);
      t.fail();
    } catch (err) { /* noop */ }
  });
});
