import * as fs from "fs";
import * as glob from "glob";
import * as mkdirp from "mkdirp";

export function find(globber: string) {
  return new Promise((resolve, reject) => {
    glob(globber, {}, (err, files) => err ? reject(err) : resolve(files));
  });
}

export function readFile(filepath: string) {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, "utf-8", (err, data) => err ? reject(err) : resolve(data));
  });
}

export function writeFile(filepath: string, data: string | Buffer) {
  return new Promise((resolve, reject) => {
    mkdirp(filepath, err => {
      if (err) {
        reject(err);
      }

      fs.writeFile(filepath, data, err => err ? reject(err) : resolve());
    });
  });
}
