import * as fs from "fs";
import { ncp, Options as NcpOptions } from "ncp";
import * as glob from "glob";
import * as path from "path";
import * as mkdirp from "mkdirp";
import * as rimraf from "rimraf";
import { promisify } from "util";

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
      if (err !== null && err.code !== "EEXIST") {
        reject(err);
      }

      fs.writeFile(filepath, data, options, err =>
        err ? reject(err) : resolve());
    });
  });
}

export async function readJson(file: string, encoding: string = "utf8"): Promise<object> {
  const data = await readFile(file, encoding);

  try {
    return JSON.parse(data);
  } catch (err) {
    throw err;
  }
}

export interface JsonOptions {
  encoding?: string;
  spaces?: number;
}

export async function writeJson(file: string, data: object, options: JsonOptions = {}): Promise<void> {
  const spaces = options.spaces !== undefined ? options.spaces : 2;
  const encoding = options.encoding !== undefined ? options.encoding : "utf8";

  try {
    const str = JSON.stringify(data, null, spaces) + "\n";
    return writeFile(file, str, encoding);
  } catch (err) {
    throw err;
  }
}

export const readDir = promisify(fs.readdir);

/** Remove a file, directory or a glob path */
export function remove(...fileOrDir: string[]): Promise<void[]> {
  return Promise.all(fileOrDir.map(f => {
    return new Promise<void>((resolve, reject) => {
      rimraf(f, err => err !== null ? reject(err) : resolve());
    });
  }));
}

export const lstat = promisify(fs.lstat);

/** Copy a file or a directory */
export async function copy(source: string, dest: string, flags?: number): Promise<void> {
  const targetPath = path.resolve(dest);
  const currentPath = path.resolve(source);
  await mkdir(path.dirname(targetPath));

  const stats = await lstat(source);

  return new Promise<void>((resolve, reject) => {
    // TODO: Node typings are not updated yet
    if (stats.isFile() && (fs as any).copyFile !== undefined) {
      (fs as any).copyFile(currentPath, dest, flags, (err: Error) => err !== null ? reject(err) : resolve());
    } else {
      ncp(currentPath, targetPath, err => err !== null ? reject(err) : resolve());
    }
  });
}

export const open = promisify(fs.open);
export const write = promisify(fs.write);
export const close = promisify(fs.close);
export function exists(fileOrDir: string): Promise<boolean> {
  fileOrDir = path.resolve(fileOrDir);

  return new Promise((resolve, reject) => {
    fs.access(fileOrDir, err => err !== null ? resolve(false) : resolve(true));
  });
}

export function replaceExtension(file: string, ext: string): string {
  ext = ext !== "" && !ext.startsWith(".") ? "." + ext : ext;

  const nFile = path.basename(file, path.extname(file)) + ext;
  return path.join(path.dirname(file), nFile);
}
