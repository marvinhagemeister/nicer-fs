import * as fs from "fs";
import * as glob from "glob";
import * as path from "path";
import * as mkdirp from "mkdirp";

export function find(globber: string, options: glob.IOptions = {}) {
  return new Promise((resolve, reject) => {
    glob(globber, options, (err, files) => err ? reject(err) : resolve(files));
  });
}

export function mkdir(dir: string, flags: any = {}): Promise<string> {
  return new Promise((resolve, reject) => {
    mkdirp(dir, flags, (err, res) => err ? reject(err) : resolve(res));
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

export function copyFile(source: string, target: string) {
  return new Promise((resolve, reject) => {
    const read = fs.createReadStream(source);
    read.on("error", (err: Error) => reject(err));

    const write = fs.createWriteStream(target);
    write.on("error", (err: Error) => reject(err));
    write.on("close", () => resolve());
    read.pipe(write);
  });
}
