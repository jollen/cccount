cccount
=======

A nodejs module for calculating Chinese characters.

# Install

```
$ npm i cccount
```

# Synopsis

```
var ccc = require('cccount');

// should be 2 chars
ccc.chineseCharCount("您好Hello", function (res) {
	console.log(res);
});
```
# API

To create a new cccount object: var ccc = require('cccount');

```
var ccc = require('cccount');
```

## cccount.chineseCharCount(data, function (res) {})

- The parameter *data* is the article.
- The callback will be executed once the data has been calculated. The callback will be passed a JSON object, the *res*:

```
{ lengthChinese: 313 }
```
