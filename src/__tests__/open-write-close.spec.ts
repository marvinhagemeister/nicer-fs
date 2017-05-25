import { assert as t } from "chai";
import * as fs from "fs";
import * as path from "path";
import { open, close, write, writeFile, remove } from "../index";

describe("open", () => {
  afterEach(() => remove(path.join(__dirname, "fixtures")));

  it("should throw if fail doesn't exist", async () => {
    try {
      await open("./foo/bar", "w+");
      t.fail();
    } catch (err) { /* noop */ }
  });

  it("should open a file", async () => {
    const file = path.join(__dirname, "fixtures", "foo.txt");
    await writeFile(file, "Hello");

    const res = await open(file, "w+");
    fs.closeSync(res);
    t.equal(res > 0, true);
  });
});

describe("write", () => {
  afterEach(() => remove(path.join(__dirname, "fixtures")));

  it("should fail to write with an invalid handle", async () => {
    try {
      await write(3, "foo");
      t.fail();
    } catch (err) { /* noop */ }
  });

  it("should write into a file", async () => {
    const file = path.join(__dirname, "fixtures", "foo.txt");
    await writeFile(file, "Hello");

    const fd = fs.openSync(file, "w+");
    await write(fd, "Hello World!");
    fs.closeSync(fd);

    const content = fs.readFileSync(file, "utf8");
    t.equal(content, "Hello World!");
  });
});

describe("close", () => {
  afterEach(() => remove(path.join(__dirname, "fixtures")));

  it("should close a file", async () => {
    const file = path.join(__dirname, "fixtures", "foo.txt");
    await writeFile(file, "Hello");

    const fd = fs.openSync(file, "w+");
    await close(fd);
  });
});
