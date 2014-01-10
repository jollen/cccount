var ccc = require('cccount');
var fs = require('fs');

// should be exactly 313 chars
fs.readFile('1.txt', 'utf8', function (err, data) {
	if (err) throw err;

	ccc.chineseCharCount(data, function (res) {
		console.log(res);
	});
});
