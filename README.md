Ultra fast Chinese character counter

cccount
=======

[![Build Status](https://travis-ci.org/jollen/nodejs-cccount.svg?branch=master)](https://travis-ci.org/jollen/nodejs-cccount)
[![npm version](https://img.shields.io/npm/v/nodejs-cccount.svg?style=flat)](https://www.npmjs.com/package/nodejs-cccount)

**cccount** is a Node.js module for calculating Chinese characters.

# Install

```
$ npm i cccount
```

# Synopsis

```
var ccc = require('cccount');

// should be 2 chars
ccc.wchars("您好Hello", function (res) {
	console.log(res); // { lengthChinese: 2 }
});
```

# API

```
cccount.wchars(data, options, callback)
```

* **data** is the article to be caculated.
* **options**
 * **strict** 0 - normal mode, 1 - strict mode
* **callback** is complete callback function

The callback function will be called when the data has finished calculated. The callback function will get a response object.

# License

The MIT License (MIT)