# Changelog

## 2.0.0

- Uprade requirements to node `8.0.0` (uses `util.promisify`)
- Use `fs.copyFile` where available
- remove `getCallerFileName`. This shouldn't have been part of this package in the first place in retrospect :/

## 1.1.1

- Fix wrong return type for `exists()`

## 1.1.0

- **NEW:** Use `getCallerFileName` to get the name of the file a function is called in

## 1.0.1

- Fix npm package not containing `readJSON`.

## 1.0.0

- **Breaking:** `copyFile` is renamed to `copy` and supports directories alongside files
- **Breaking:** `deleteFile` is renamed to `remove` and supports directories alongside files
- **NEW:** `exists` function to check if a file or folder exists
- **NEW:** `readJson` and `writeJson` to safely read json files

## 0.6.3

- Don't fail on `writeFile` if directory already exists

## 0.6.2

- Fix `deleteFile` typings

## 0.6.1

- Move `@types/glob` and `@types/node` to `dependencies` (consuming modules would fail)
- Minor typing enhancements

## 0.6.0

- Add `replaceExtension` function
- Add unit-tests
- cleanup empty target file on `copyFile` rejection
- return path of newly created file for `copyFile`

## 0.5.2

- Don't autogenerate typings. The custom ones are more solid.

## 0.5.1

- Fix `readFile` typings
- Fix spelling mistake in `README`

## 0.5.0

- Add `copyFile` function

## 0.4.0

- Add `mkdirp` wrapper

## 0.3.1

- Don't change default encoding

## 0.3.0

- Add `fs.readdir` promise variant

## 0.2.0

- Allow passing glob options to `find`
- Fix `writeFiles` failing on directory creation

## 0.1.0

- Initial Release
