import { assert as t } from "chai";
import * as path from "path";
import { exists } from "../index";

describe("exists", () => {
  it("should return false when not existing", async () => {
    const res = await exists("./foo/bar");
    t.equal(res, false);
  });

  it("should return true when exists", async () => {
    const file = path.join(__dirname, "exists.spec.ts");
    const res = await exists(file);
    t.equal(res, true);
  });

  it("should work on folders", async () => {
    const file = path.join(__dirname);
    const res = await exists(file);
    t.equal(res, true);
  });
});
