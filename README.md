# requirejs-prune-bundle-output

[![NPM version](https://badge.fury.io/js/requirejs-prune-bundle-output.png)](http://badge.fury.io/js/requirejs-prune-bundle-output)
[![devDependency Status](https://david-dm.org/prantlf/requirejs-prune-bundle-output/dev-status.svg)](https://david-dm.org/prantlf/requirejs-prune-bundle-output#info=devDependencies)

Deletes all files from the RequireJS bundle output directory, which do not start with the bundle name (`<bundle>.js` and `<bundle>.js.map`).

### Table of Contents

- [Synopsis](#synopsis)
- [Installation](#installation-and-getting-started)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)

## Synopsis

```js
  // Delete minified file copies that were concatenated to the bundle.
  onModuleBundleComplete: function (data) {
    const pruneBundleOutput = nodeRequire('requirejs-prune-bundle-output')
    pruneBundleOutput('../output', data.name)
  },
```
## Installation

This module can be installed in your project using [NPM] or [Yarn]. Make sure, that you use [Node.js] version 6 or newer.

```sh
npm i -D requirejs-prune-bundle-output
```

```sh
yarn add requirejs-prune-bundle-output
```

## Documentation

[RequireJS] copies and minifies all source file to the output directory. However, when module bundles are used, only the bundle is needed to be deployed as the build output.

Let us have the following project structure, where the list of bundled modules is included in each component as `index.js`:

```txt
sources
  ├── animals
  │   ├── animal.js
  │   ├── cat.js
  │   ├── dog.js
  │   ├── counter.js
  │   └── index.js
  ├── loader
  │   └── index.js
  └── places
     ├── garden.js
     └── index.js
```

With the following build configuration:

```js
  modules: [
    { name: 'loader/index' },
    { name: 'animals/index', exclude: [ 'loader/index' ] },
    { name: 'places/index', exclude: [ 'loader/index', 'animals/index' ] }
  ],
  dir: '../output'
```

When built by `r.js`, the following output will appear in the target directory:

```txt
output
  ├── loader
  │   ├── index.js
  │   └── index.js.map
  ├── animals
  │   ├── animal.js
  │   ├── cat.js
  │   ├── dog.js
  │   ├── counter.js
  │   ├── index.js
  │   └── index.js.map
  └── places
      ├── garden.js
      ├── index.js
      └── index.js.map
```

All files except for `index.js*` should be removed before deploying the project output. When calling `pruneBundleOutput` from the bundle completion callback:

```js
  modules: [
    { name: 'loader/index' },
    { name: 'animals/index', exclude: [ 'loader/index' ] },
    { name: 'places/index', exclude: [ 'loader/index', 'animals/index' ] }
  ],
  dir: '../output',
  onModuleBundleComplete: function (data) {
    const pruneBundleOutput = nodeRequire('requirejs-prune-bundle-output')
    pruneBundleOutput('../output', data.name)
  },
```

The extra files will be removed from the directories with the output bundles, leaving only the files to deploy:

```txt
output
  ├── loader
  │   ├── index.js
  │   └── index.js.map
  ├── animals
  │   ├── index.js
  │   └── index.js.map
  └── places
      ├── index.js
      └── index.js.map
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality.

## License

Copyright (c) 2019 Ferdinand Prantl

Licensed under the MIT license.

[Node.js]: http://nodejs.org/
[NPM]: https://www.npmjs.com/
[Yarn]: https://yarnpkg.com/
[RequireJS]: https://requirejs.org/
