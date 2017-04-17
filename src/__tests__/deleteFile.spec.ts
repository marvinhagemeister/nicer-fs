import { assert as t } from "chai";
import * as path from "path";
import * as fs from "fs";
import { deleteFile } from "../index";

describe("deleteFile", () => {
  it("should succeed", () => {
    const f = path.join(__dirname, "foo.txt");
    fs.writeFileSync(f, "hello world", "utf-8");
    return deleteFile(f);
  });

  it("should reject Promise on error", () => {
    const f = path.join(__dirname, "bar.txt");
    return deleteFile(f)
      .then(() => t.fail())
      .catch(err => { /* noop */ });
  });
});
