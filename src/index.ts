import * as fs from "fs";
import * as glob from "glob";
import * as path from "path";
import * as mkdirp from "mkdirp";

export function find(globber: string, options: glob.IOptions = {}): Promise<string[]> {
  return new Promise((resolve, reject) => {
    glob(globber, options, (err, files) => err !== null ? reject(err) : resolve(files));
  });
}

export function mkdir(dir: string, flags: any = {}): Promise<string> {
  return new Promise((resolve, reject) => {
    mkdirp(dir, flags, (err, res) => err ? reject(err) : resolve(res));
  });
}

export function readFile(filepath: string): Promise<Buffer>;
export function readFile(filepath: string, encoding: string): Promise<string>;
export function readFile(filepath: string, encoding: string = null): Promise<string | Buffer> {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, encoding, (err, data) => err ? reject(err) : resolve(data));
  });
}

export function writeFile(filepath: string, data: string | Buffer, options: any = {}): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    const base = path.dirname(filepath);
    mkdirp(base, err => {
      if (err) {
        reject(err);
      }

      fs.writeFile(filepath, data, options, err =>
        err ? reject(err) : resolve());
    });
  });
}

export function readDir(folder: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(folder, (err, files) => err ? reject(err) : resolve(files));
  });
}

export function deleteFile(file: string | Buffer): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    fs.unlink(file, err => err ? reject(err) : resolve());
  });
}

export function copyFile(source: string, target: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const read = fs.createReadStream(source);
    read.on("error", (err: Error) => {
      // cleanup, target my be created by the time an error occurs
      const cb = () => reject(err);
      return deleteFile(target)
        .then(cb)
        .catch(cb);
    });

    const write = fs.createWriteStream(target);
    write.on("error", (err: Error) => reject(err));
    write.on("close", () => resolve(target));
    read.pipe(write);
  });
}

export function replaceExtension(file: string, ext: string): string {
  ext = ext !== "" && !ext.startsWith(".") ? "." + ext : ext;

  const nFile = path.basename(file, path.extname(file)) + ext;
  return path.join(path.dirname(file), nFile);
}
