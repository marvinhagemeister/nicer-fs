import { assert as t } from "chai";
import { replaceExtension as replace } from "../index";

describe("replaceExtension", () => {
  it("should remove an extension", () => {
    t.equal(replace("foo.txt", ""), "foo");
  });

  it("should replace an extensions", () => {
    t.equal(replace("foo.txt", "html"), "foo.html");
    t.equal(replace("foo.txt", ".html"), "foo.html");
    t.equal(replace("bar/baz/foo.txt", ".html"), "bar/baz/foo.html");
  });
});
