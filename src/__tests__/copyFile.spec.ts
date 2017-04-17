import { assert as t } from "chai";
import * as path from "path";
import * as fs from "fs";
import { copyFile } from "../index";

describe("copyFile", () => {
  it("should copy a file", () => {
    const source = path.join(__dirname, "tmp.txt");
    const target = path.join(__dirname, "tmp2.txt");

    fs.writeFileSync("./src/__tests__/tmp.txt", "hello world", "utf-8");

    return copyFile(source, target)
      .then(result => {
        t.equal(result, target);
        t.equal(fs.readFileSync(target, "utf-8"), "hello world");
        fs.unlinkSync(source);
        fs.unlinkSync(target);
      });
  });

  it("should reject promise on failure", () => {
    const target = "foo.txt";
    return copyFile("foo/bar", target)
      .then(() => t.fail())
      .catch(err => { /* noop */ });
  });
});
