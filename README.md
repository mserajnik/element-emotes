# element-emotes

> A browser extension for custom emote support in Element

https://user-images.githubusercontent.com/80664890/175499654-7cd745e2-f31e-43ea-af0d-d2fd42e33a77.mp4

This is a browser extension that adds custom emote support to
[Element][element]. Available emotes are not managed by the extension itself;
instead, it requires an application to serve them according to
[this API specification][emote-server-api].

__Note:__ This extension uses [Manifest V3][manifest-v3] and might or might not
work in Firefox or other browsers that are not based on Chromium. I have no
interest in supporting these browsers.

## Table of contents

+ [Install](#install)
  + [Updating](#updating)
+ [Usage](#usage)
  + [Configuration](#configuration)
  + [Usage in Element](#usage-in-element)
+ [Develop](#develop)
  + [Installing dependencies](#installing-dependencies)
  + [Building](#building)
+ [Maintainer](#maintainer)
+ [Contribute](#contribute)
+ [License](#license)

## Install

Clone this repository:

```zsh
user@local:~$ git clone https://github.com/mserajnik/element-emotes.git
```

If you are using a different Element instance than https://app.element.io/,
adjust [this line](dist/manifest.json#L15) accordingly.

Finally, load the [`dist`](dist) directory as an
[unpacked extension][load-an-unpacked-extension] to install it.

### Updating

This application follows [semantic versioning][semantic-versioning] and any
breaking changes that require additional attention will be released under a new
major version (e.g., `2.0.0`). Minor version updates (e.g., `1.1.0` or `1.2.0`)
are therefore always safe to simply install.

When necessary, this section will be expanded with upgrade guides for new major
versions.

Before updating, back up any changes you might have made (e.g., if you have
adjusted the Element instance URL in
[`dist/manifest.json`](dist/manifest.json#L15)).

Then, simply update via Git:

```zsh
user@local:~$ cd element-emotes
user@local:element-emotes$ git pull
```

## Usage

### Configuration

The extension is configured entirely via its options page. The following
options are available:

| Option                         | Description                                                                                                                                                                                  | Default value |
|--------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------|
| Emote Server – Emotes URL      | This URL has to point to the [`/emotes`][emotes-path] path of the emote server.                                                                                                              |               |
| Emote Server – Access Key      | This can be left blank if the emote server does not require an access key.                                                                                                                   |               |
| Default Emote Size             | The default emote size when emotes are mixed with text. Has to be a value compatible with the CSS property `font-size`.                                                                      | `2em`         |
| Large Emote Size               | The emote size for standalone emotes (without text in the same message). Has to be a value compatible with the CSS property `font-size`.                                                     | `4em`         |
| Use Frozen Emotes              | If enabled, animated emotes (GIF, APNG) will be frozen when Element is not focused.                                                                                                          | `false`       |
| Use Emote Fuzzy Matching       | Whether to use fuzzy matching for emote suggestions or not. If disabled, simple case-insensitive string matching will be used instead.                                                       | `true`        |
| Emote Suggestion Amount        | The number of emote suggestions shown at the same time.                                                                                                                                      | `10`          |
| Emote Fuzzy Matching Location  | The location factor used for the fuzzy matching relevance score of the emote names. See [here][fuzzy-matching-options] and [here][fuzzy-matching-scoring-theory] to learn how to adjust it.  | `0`           |
| Emote Fuzzy Matching Distance  | The distance factor used for the fuzzy matching relevance score of the emote names. See [here][fuzzy-matching-options] and [here][fuzzy-matching-scoring-theory] to learn how to adjust it.  | `100`         |
| Emote Fuzzy Matching Threshold | The threshold factor used for the fuzzy matching relevance score of the emote names. See [here][fuzzy-matching-options] and [here][fuzzy-matching-scoring-theory] to learn how to adjust it. | `0.6`         |

### Usage in Element

For the extension to work properly, _Enable Emoji suggestions while typing_ has
to be disabled in the Element preferences; otherwise, the default Emoji picker
will still be shown alongside the custom emote picker, leading to conflicts
in particular with the arrow/tab navigation.

Custom emotes will then be suggested (using a fuzzy matcher) by typing `:`
followed by a character. This therefore behaves like and replaces the default
emoji suggestions Element ships with (emoji can still be selected via the emoji
picker next to the message input).

## Develop

You can find the source code of the extension in [`src`](src).  
The production assets in [`dist`](dist) are not excluded from Git to make
installing this extension easier for less tech-savvy people.

To make your own builds, you need to install [Node.js][node-js] (tested with
`>=20.0.0 <22.0.0`).

### Installing dependencies

```zsh
user@local:element-emotes$ npm i
```

### Building

To continuously watch for changes and automatically rebuild (useful for
development):

```zsh
user@local:element-emotes$ npm run watch
```

Or, to make a production build:

```zsh
user@local:element-emotes$ npm run build
```

## Maintainer

[Michael Serajnik][maintainer]

## Contribute

You are welcome to help out!

[Open an issue][issues] or [make a pull request][pull-requests].

## License

[AGPLv3](LICENSE) © Michael Serajnik

[element]: https://element.io/
[emote-server-api]: https://github.com/mserajnik/emote-server#api
[emotes-path]: https://github.com/mserajnik/emote-server#listing-emotes
[fuzzy-matching-options]: https://www.fusejs.io/api/options.html#fuzzy-matching-options
[fuzzy-matching-scoring-theory]: https://www.fusejs.io/concepts/scoring-theory.html
[issues]: https://github.com/mserajnik/element-emotes/issues
[load-an-unpacked-extension]: https://developer.chrome.com/docs/extensions/mv3/getstarted/#unpacked
[maintainer]: https://github.com/mserajnik
[manifest-v3]: https://developer.chrome.com/docs/extensions/mv3/intro/
[node-js]: https://nodejs.org/
[pull-requests]: https://github.com/mserajnik/element-emotes/pulls
[semantic-versioning]: https://semver.org/
