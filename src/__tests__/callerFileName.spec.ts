import { assert as t } from "chai";
import * as path from "path";
import { getCallerFileName } from "../index";

describe("getCallerFileName", () => {
  it("should get filename where the function is called", () => {
    t.equal(getCallerFileName(), __filename);
  });
});
