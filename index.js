// Released under MIT license
// Copyright (c) 2013 Jollen Chen

exports._wchars = function(src, cb) {
	var chineseSymbolTable,
		contentFiltered;

	var unicodeContent,
		unicodeContentNoChinese;

	var res = {};

	// setup the general used chinese symbols
	// this is the often used symbols in all Chinese articles
	chineseSymbolTable = '，︳〉、╴︿。︴﹀．﹏「‧（」；）﹁：︵﹂？︶『！｛』︰｝﹃…︷﹄‥︸﹙﹐〔﹚﹑〕﹛﹒︹﹜·︺﹝﹔【﹞﹕】‘﹖︻’﹗︼“｜《”-》〝︱︽〞—︾‵〈′';

	// filter the content in progress: strip all spaces
	contentFiltered = src.replace(/\s/g, '');

	// filter the content in progress: 
	// 		open RegExp instances to strip all Chinese symbols
	for (var i = 0; i < chineseSymbolTable.length; i++) {
		var regex = new RegExp(chineseSymbolTable.substr(i, 1), "ig");
		contentFiltered = contentFiltered.replace(regex, '');
	}

	// prepare a new copy to start counting
	unicodeContent = escape(contentFiltered);

	// strip
	unicodeContentNoChinese = unicodeContent.replace(/%u\w{4}/gi, '');

	// strip
	unicodeEnglish = unicodeContentNoChinese.replace(/%\w{2}/gi, '');

	// calculate Chinese characters
	// '我' is one characters, which says 'I'
	// '我是' is two characters, which says 'I am'
	// '我是學生' is four characters, which says 'I am a student'
	var lengthEnglish = unicodeEnglish.length;
	var lengthEnglishSymbols = (unicodeContentNoChinese.length - lengthEnglish) / 3;
	var lengthChinese = contentFiltered.length - lengthEnglish - lengthEnglishSymbols;
	
	res = {
		lengthChinese: lengthChinese
	};

	cb(res);
}

exports.wchars = function(src, options, cb) {
	var contentFiltered = src
		, unicodeContent
		, unicodeContentNoChinese
		, res = {};

	if (typeof options === 'function') {
		cb = options;
		options = {
			strict: 0
		}
	}

	if (typeof options.strict === 'undefined')
		options.strict = 0;

	// This table lists all the Chinese symbols.
	// All the symbols are ，︳〉、╴︿。︴﹀．﹏「‧（」；）﹁：︵﹂？︶『！｛』︰｝﹃…︷﹄‥︸﹙﹐〔﹚﹑〕﹛﹒︹﹜·︺﹝﹔【﹞﹕】‘﹖︻’﹗︼“｜《”-》〝︱︽〞—︾‵〈′
	
	// This is the often used symbols.
	// The order of this table is optimized for performance purpose.
	var chineseSymbolTable = '，。；﹑：「」（）？﹐﹖！﹙﹚《》【】╴—〔〕『』｛｝﹛﹜”〝〞〈〉﹔︰﹕﹗‵′、“…';

	// Rarely used symbols will only be caculated when running in strict mode.
	if (options.strict === 1) {
		chineseSymbolTable += '｜︳︱︿︴﹀．﹏‧﹃︷﹄‥︸·﹒︹︺﹝﹞‘’︻︼︽︾﹁︵﹂︶';
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