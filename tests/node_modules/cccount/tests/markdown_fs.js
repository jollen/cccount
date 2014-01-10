var ccc = require('cccount');
var fs = require('fs');

// should be exactly 313 chars
fs.readFile('chapter1.md', 'utf8', function (err, data) {
	if (err) throw err;

	ccc.chineseCharCount(data, function (res) {
		console.log(res);
	});
});
