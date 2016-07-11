// Released under MIT license
// Copyright (c) 2013 Jollen Chen

exports.wchars = function(src, options, cb) {
	var contentFiltered = src
		, unicodeContent
		, unicodeContentNoChinese
		, res = {};

	if (typeof options === 'function') {
		cb = options;
		options = {
			strict: false
		}
	}

	if (typeof options.strict === 'undefined')
		options.strict = false;

	// This table lists all the Chinese symbols.
	// All the symbols are ，︳〉、╴︿。︴﹀．﹏「‧（」；）﹁：︵﹂？︶『！｛』︰｝﹃…︷﹄‥︸﹙﹐〔﹚﹑〕﹛﹒︹﹜·︺﹝﹔【﹞﹕】‘﹖︻’﹗︼“｜《”-》〝︱︽〞—︾‵〈′
	
	// This is the often used symbols.
	// The order of this table is optimized for performance purpose.
	var chineseSymbolTable = '，。；﹑：「」（）【】？！﹙﹚《》╴—〔〕『』｛｝﹛﹜”〝〞〈〉﹔︰﹕﹗‵′、“…';

	// Rarely used symbols will only be caculated when running in strict mode.
	if (options.strict === true) {
		chineseSymbolTable += '﹖﹐｜︳︱︿︴﹀．﹏‧﹃︷﹄‥︸·﹒︹︺﹝﹞‘’︻︼︽︾﹁︵﹂︶';
	}

	// 1. Strip all spaces.
	contentFiltered = contentFiltered.replace(/\s/g, '');

	// 2. Create RegExp instances to strip Chinese symbols.
	for (var i = 0; i < chineseSymbolTable.length; i++) {
		var regex = new RegExp(chineseSymbolTable.substr(i, 1), "ig");
		contentFiltered = contentFiltered.replace(regex, '');
	}

	// Prepare a new copy to start counting
	unicodeContent = escape(contentFiltered);

	// Strip
	unicodeContentNoChinese = unicodeContent.replace(/%u\w{4}/gi, '');

	// Strip
	unicodeEnglish = unicodeContentNoChinese.replace(/%\w{2}/gi, '');

	// Calculate Chinese characters.
	// For example
	//  - '我' is one characters, which says 'I'
	//  - '我是' is two characters, which says 'I am'
	//  - '我是學生' is four characters, which says 'I am a student'
	var lengthEnglish = unicodeEnglish.length;
	var lengthEnglishSymbols = (unicodeContentNoChinese.length - lengthEnglish) / 3;
	var lengthChinese = contentFiltered.length - lengthEnglish - lengthEnglishSymbols;
	
	res = {
		lengthChinese: lengthChinese
	};

	cb(res);
}