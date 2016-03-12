var ccc = require('../index');
var fs = require('fs');

fs.readFile('./tests/sample.md', 'utf8', function (err, data) {
	if (err) throw err;

	var data = data+data; // 2 times the data length
	var data = data+data; // 2 times the data length again
	var data = data+data; // More and more data
	var data = data+data; // For performance test
	var data = data+data;
	var data = data+data;
	var data = data+data;
	var data = data+data; // Done. There are about 1 million chineses words.

	// Normal mode.
	ccc.wchars(data, function (res) {
		console.log(res);
	});

	// Strict mode.
	ccc.wchars(data, {strict: true}, function (res) {
		console.log(res);
	});
});
