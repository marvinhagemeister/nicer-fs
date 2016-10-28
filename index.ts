import * as fs from "fs";
import * as glob from "glob";
import * as path from "path";
import * as mkdirp from "mkdirp";

export function find(globber: string, options?: glob.IOptions) {
  options = typeof options !== "undefined"
    ? options
    : {};

  return new Promise((resolve, reject) => {
    glob(globber, options, (err, files) => err ? reject(err) : resolve(files));
  });
}

export function readFile(filepath: string) {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, "utf-8", (err, data) => err ? reject(err) : resolve(data));
  });
}

export function writeFile(filepath: string, data: string | Buffer) {
  return new Promise((resolve, reject) => {
    const base = path.dirname(filepath);
    mkdirp(base, err => {
      if (err) {
        reject(err);
      }

      fs.writeFile(filepath, data, err => err ? reject(err) : resolve());
    });
  });
}
