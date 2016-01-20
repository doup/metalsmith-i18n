> **NOTE: This plugin is not working correctly on Handlebars, Mustache and probably other template engines**. Jade works fine and probably other template engines which support calling directly on properties should work. [See #3](https://github.com/doup/metalsmith-i18n/issues/3)

# metalsmith-i18n

[![Build Status](https://travis-ci.org/doup/metalsmith-i18n.svg?branch=master)](https://travis-ci.org/doup/metalsmith-i18n)

Use `__()` and `__n()` in your templates for translating your strings. Based on the [i18n](https://github.com/mashpie/i18n-node) library.

## Installation

    $ npm install --save metalsmith-i18n

## Usage

Add the plugin with the required options (it also accepts [`i18n` module](https://github.com/mashpie/i18n-node) options). This will add `__` and `__n` methods to each file:

```javascript
var i18n = require('metalsmith-i18n');

Metalsmith(__dirname)
    .use(i18n({
        default:   'es',
        locales:   ['en', 'es'],
        directory: 'locales'
    }))

```

If the file has a `locale` property this will be used by default, otherwise it'll fallback to the given `default` locale:

```
---
locale: en
---

Some content.
```

Just call `__` or `__n` in your templates (depending on your templating engine):

```
<%= __('hello') %>
${__('hello')}
```

When calling `__` or `__n` the locale can be overriden:

```
__('key', { locale: 'en' })
__n('key_n', 'key_n', 3, { locale: 'en' })
```

You can see more usage examples in `test/index.js`.

## Options

**default** `String` (required): Default locale for the translations.

**locales** `Array` (required): List of supported locales. A JSON file for each locale will be created automatically in the locales directory.

**directory** `String` (required): Path to the locales directory relative to the Metalsmith working directory.

## Tests

`npm test` to run the tests.

## License

The MIT License (MIT)

Copyright (c) 2015 Asier Illarramendi <asier@illarra.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
