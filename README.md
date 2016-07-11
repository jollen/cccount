Ultra fast Chinese character counter

cccount
=======

[![Build Status](https://travis-ci.org/jollen/cccount.svg?branch=master)](https://travis-ci.org/jollen/cccount)
[![npm version](https://img.shields.io/npm/v/cccount.svg?style=flat)](https://www.npmjs.com/package/cccount)

**cccount** is a Node.js module for calculating Chinese characters.

# Install

```
$ npm i cccount
```

# Synopsis

Example:

```
var ccc = require('cccount');

// should be 2 chars
ccc.wchars("您好Hello", function (res) {
	console.log(res); // { lengthChinese: 2 }
});
```

Output:

```
{ lengthChinese: 2 }
```

# API

```
ccc.wchars(data, [options,] callback)
```

* **data**: the article to be caculated.
* **options**
 * **strict**: ```false``` - normal mode, ```true``` - strict mode
* **callback**: the complete callback function

The callback function will be called when the data has finished calculated. The callback function will get a response object,

* **lengthChinese**: the Chinese characters

Normally, you should run in **normal mode** for performance reason. If your article has some particular Chinese symbols, you can run in **strict mode**.

## Use Cases of cccount

* Publishing platform for caculating and display Chinese characters
* Database schema design for storing Chinese words in the JSON document
* You want to caculate Chinese words for more exact

# License

The MIT License (MIT)
