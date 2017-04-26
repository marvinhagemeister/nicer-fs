# Changelog

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
