![o Logo](https://unpkg.com/o@1.1.3/logo.png)

# o
common object helper functions written in TypeScript which can be used in [NodeJS](https://nodejs.org/en/) and the browser (supports ES6).

[![Build Status](https://travis-ci.org/hammy2899/o.svg?branch=master)](https://travis-ci.org/hammy2899/o)
[![Coverage Status](https://coveralls.io/repos/github/hammy2899/o/badge.svg?branch=master)](https://coveralls.io/github/hammy2899/o?branch=master)
[![npm version](https://img.shields.io/npm/v/o.svg)](https://www.npmjs.com/package/o)
[![license](https://img.shields.io/github/license/hammy2899/o.svg)](https://github.com/hammy2899/o/blob/master/LICENSE.md)


### Installation

#### [NPM](https://npmjs.com)
```bash
$ npm install o
```

#### [Yarn](https://yarnpkg.com)
```bash
$ yarn add o
```

### Usage

#### TypeScript
```typescript
import * as o from 'o';
// or require specific functions
import { is, empty } from 'o';
```

#### NodeJS
```javascript
const o = require('o');
// or require specific functions
const { is, empty } = require('o');
```

#### Browser

##### ES6
```javascript
import './o.min.js';
```

##### CDN/Script
```html
<script
  type="application/javascript"
  src="https://cdn.jsdelivr.net/npm/o@2.0.0/dist/o.min.js"
/>
```

### Example usage

```javascript
const a = {
  a: 1,
  b: 2,
  c: {
    d: 3,
    e: 4,
  },
};

is(a); // => true
empty(a); // => false
has(a, 'a'); // => true
has(a, 'd'); // => false
has(a, 'c.d'); // => true

const b = set(a, 'f', 5);
get(b, 'f'); // => 5
```

For more examples and a list of all functions view the [documentation page](https://o.hammy2899.dev).

### Documentation

You can view the [documentation here](https://o.hammy2899.dev), docs are generated by [TypeDoc](https://typedoc.org).

### Contributing

All functions are documented with [TypeDoc](https://typedoc.org) and are fully commented explaining how they works. If you want to
contribute feel free to open a PR. When you open a PR please set the base branch as [`develop`](https://github.com/hammy2899/o/tree/develop) and please make sure `yarn test` and `yarn lint` both pass
with no errors and if any tests fail or any linting issues are raised please fix them accordingly.
