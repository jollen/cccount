Ultra fast Chinese character counter

nodejs-cccount
=======

[![Build Status](https://travis-ci.org/jollen/nodejs-cccount.svg?branch=master)](https://travis-ci.org/jollen/nodejs-cccount)
[![npm version](https://img.shields.io/npm/v/nodejs-cccount.svg?style=flat)](https://www.npmjs.com/package/nodejs-cccount)

**nodejs-cccount** is a Node.js module for calculating Chinese characters.

# Install

```
$ npm i nodejs-cccount
```

# Synopsis

```
var ccc = require('nodejs-cccount');

// should be 2 chars
ccc.wchars("您好Hello", function (res) {
	console.log(res); // { lengthChinese: 2 }
});
```

# API

```
cccount.wchars(data, [options], callback)
```

* **data**: is the article to be caculated.
* **options**
 * **strict**: '''false''' - normal mode, '''true''' - strict mode
* **callback**: is complete callback function

The callback function will be called when the data has finished calculated. The callback function will get a response object.

# License

The MIT License (MIT)