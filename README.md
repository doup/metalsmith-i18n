#metalsmith-i18n

Use `__()` and `__n()` in your templates for translating your strings. Based on the [i18n](https://github.com/mashpie/i18n-node) library.

##Installation

    $ npm install --save metalsmith-i18n

##Usage

Add the plugin with the required options. This will add `__` and `__n` methods to each file:

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

##Options

**default** `String` (required): Default locale for the translations.

**locales** `Array` (required): List of supported locales. A JSON file for each locale will be created automatically in the locales directory.

**directory** `String` (required): Path to the locales directory relative to the Metalsmith working directory.

##Tests

`npm test` to run the tests.

##Licensed under MIT

Copyright (c) 2015, Asier Illarramendi <asier@illarra.com>

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
