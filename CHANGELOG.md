# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.2.0] - 2023-10-14

### Added

+ Experimental support for the rich text editor (Labs feature). Inserting the
  autocomplete replacements is quite slow at the moment and depends on the
  length of the content due to the workaround required to make it functional
+ The ability to configure the number of emote suggestions shown at the same
  time

### Changed

+ The emotes no longer have their own `font-size` property that overrides
  whatever the font size in the _Appearance_ settings of Element is set to.
  This also means you might have to re-adjust the emote size in the extension
  options

## [1.1.0] - 2022-11-01

### Added

+ Frozen emote support

## 1.0.0 - 2022-06-27

### Added

+ Initial release

[Unreleased]: https://github.com/mserajnik/element-emotes/compare/1.2.0...develop
[1.2.0]: https://github.com/mserajnik/element-emotes/compare/1.1.0...1.2.0
[1.1.0]: https://github.com/mserajnik/element-emotes/compare/1.0.0...1.1.0
