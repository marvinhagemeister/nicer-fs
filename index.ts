import * as fs from "fs";
import * as glob from "glob";
import * as path from "path";
import * as mkdirp from "mkdirp";

export function find(globber: string, options: glob.IOptions = {}) {
  return new Promise((resolve, reject) => {
    glob(globber, options, (err, files) => err ? reject(err) : resolve(files));
  });
}

export function readFile(filepath: string, encoding: string = null) {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, encoding, (err, data) => err ? reject(err) : resolve(data));
  });
}

export function writeFile(filepath: string, data: string | Buffer, options: any = {}) {
  return new Promise((resolve, reject) => {
    const base = path.dirname(filepath);
    mkdirp(base, err => {
      if (err) {
        reject(err);
      }

      fs.writeFile(filepath, data, options, err => err ? reject(err) : resolve());
    });
  });
}

export function readDir(folder: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(folder, (err, files) => err ? reject(err) : resolve(files));
  });
}
