declare module "nicer-fs" {
  import glob = require("glob");

  export function find(globber: string, options?: glob.IOptions): Promise<{}>;
  export function readFile(filepath: string): Promise<Buffer>;
  export function readFile(filepath: string, encoding: string): Promise<string>;
  export function writeFile(filepath: string, data: string | Buffer, options?: any): Promise<{}>;
  export function readDir(folder: string): Promise<string[]>;
  export function mkdir(dir: string, flags?: any): Promise<string>;
  export function copyFile(source: string, target: string): Promise<{}>;
}
