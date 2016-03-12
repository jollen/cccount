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
ccc.wchars(data, [options,] callback)
```

* **data**: the article to be caculated.
* **options**
 * **strict**: ```false``` - normal mode, ```true``` - strict mode
* **callback**: the complete callback function

The callback function will be called when the data has finished calculated. The callback function will get a response object.

Normally, you should run in **normal mode** for performance reason. If your article has some particular Chinese symbols, you can run in **strict mode**.

## Use Cases of nodejs-cccount

* Publishing platform for caculating and display Chinese words
* Database schema design for storing Chinese words in the JSON document
* You want to caculate Chinese words for more exact

# License

The MIT License (MIT)