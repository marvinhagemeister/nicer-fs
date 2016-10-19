# Nicer FS

Nicer fs is a collection of common file system function brought to the age of
promises.

## Documentation

### `find(globber: string): Promise<string[]>`

Search files that match the given glob path.

### `readFile(path: string): Promise<string>`

Read file with utf-8 encoding and return the content as string.

### `writeFile(path: string, data: string | Buffer): void`

Write a file to disk. Parent folders are automatically created if they don't
exist before the first write operation.
