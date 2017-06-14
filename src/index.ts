import * as fs from "fs";
import { ncp, Options as NcpOptions } from "ncp";
import * as glob from "glob";
import * as path from "path";
import * as mkdirp from "mkdirp";
import * as rimraf from "rimraf";

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

export function readDir(folder: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    fs.readdir(folder, (err, files) => err ? reject(err) : resolve(files));
  });
}

/** Remove a file, directory or a glob path */
export function remove(...fileOrDir: string[]): Promise<void[]> {
  return Promise.all(fileOrDir.map(f => {
    return new Promise<void>((resolve, reject) => {
      rimraf(f, err => err !== null ? reject(err) : resolve());
    });
  }));
}

/** Copy a file or a directory */
export async function copy(source: string, target: string, options: NcpOptions = {}): Promise<void> {
  const currentPath = path.resolve(source);
  const targetPath = path.resolve(target);

  if (currentPath === targetPath) {
    throw new Error("Source and destination must not be the same");
  }

  await mkdir(path.dirname(targetPath));

  return await new Promise<void>((resolve, reject) => {
    ncp(currentPath, targetPath, options, err => err !== null ? reject(err) : resolve());
  });
}

export function exists(fileOrDir: string): Promise<boolean> {
  fileOrDir = path.resolve(fileOrDir);

  return new Promise((resolve, reject) => {
    fs.access(fileOrDir, err => err !== null ? resolve(false) : resolve(true));
  });
}

export function open(path: string | Buffer, flags: string | number): Promise<number> {
  return new Promise((resolve, reject) => {
    fs.open(path, flags, (err, fd) => err !== null ? reject(err) : resolve(fd));
  });
}

export interface WriteResult {
  written: number;
  str: string;
}

export function write(fd: number, data: any): Promise<WriteResult> {
  return new Promise((resolve, reject) => {
    fs.write(fd, data, (err, written, str) =>
      err !== null ? reject(err) : resolve({ written, str }));
  });
}

export function close(fd: number): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    fs.close(fd, err => err !== null ? reject(err) : resolve());
  });
}

export function replaceExtension(file: string, ext: string): string {
  ext = ext !== "" && !ext.startsWith(".") ? "." + ext : ext;

  const nFile = path.basename(file, path.extname(file)) + ext;
  return path.join(path.dirname(file), nFile);
}


interface CustomError extends ErrorConstructor {
  prepareStackTrace: <T>(err: Error, stack: T) => T;
}

/**
 * Get the filename of the calling function. This is a genius trick to abuse
 * the `stack` property of native `Error` objects.
 * Taken from https://stackoverflow.com/questions/16697791/nodejs-get-filename-of-caller-function/29581862#29581862
 */
export function getCallerFileName(): string | undefined {
  const originalFunc = (Error as CustomError).prepareStackTrace;

  let caller;
  try {
    const error = new Error();
    let current;

    (Error as CustomError).prepareStackTrace = (err: Error, stack: any) => {
      return stack;
    };

    if (error.stack !== undefined) {
      current = (error.stack as any).shift().getFileName();

      while (error.stack.length) {
        caller = (error.stack as any).shift().getFileName();

        if (current !== caller) {
          break;
        }
      }
    }
  } catch (e) {
    /* noop */
  }

  (Error as CustomError).prepareStackTrace = originalFunc;
  return caller;
}
