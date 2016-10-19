declare module 'nicer-fs' {
  export function find(globber: string): Promise<string[]>;
  export function readFile(path: string): Promise<string>;
  export function writeFile(path: string, data: string | Buffer): void;
}
