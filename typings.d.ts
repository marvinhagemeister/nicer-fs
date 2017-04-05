declare module "nicer-fs" {
  import glob = require("glob");

  export function find(globber: string, options?: glob.IOptions): Promise<string[]>;
  export function readFile(path: string): Promise<string>;
  export function writeFile(path: string, data: string | Buffer): Promise<void>;
  export function readDir(folder: string): Promise<string[]>;
}
