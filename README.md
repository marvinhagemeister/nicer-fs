# Nicer FS

Nicer fs is a collection of common file system function brought to the age of
promises. Main differences compared to [fs-extra](https://github.com/jprichardson/node-fs-extra)
is that `nicer-fs` is lighter.

## API

- `find` - find file by glob pattern
- `readFile` - promisified `fs.readFile`
- `writeFile` - promisified `fs.writeFile`
- `readJson` - safely read json files
- `writeJson` - safely write json files
- `readDir` - promisified `fs.readDir`
- `mkdir` - same as `mkdir -p`
- `copy` - same as `cp [source] [target]`, works for files and folders
- `remove` - same as `rm -rf myfile myfolder`
- `exists` - check if a file or folder exists
- `replaceExtension` - easily replace a file extension
- `getCallerFileName` - get the name of the file a function is called in
