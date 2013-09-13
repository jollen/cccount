// Released under MIT license
// Copyright (c) 2013 Jollen Chen

exports.chineseCharCount = function(src, cb) {
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
	for(var i = 0; i < chineseSymbolTable.length; i++) {
		var regex = new RegExp(chineseSymbolTable.substr(i, 1), "ig");
		contentFiltered = contentFiltered.replace(regex, '');
	}

	// prepare a new copy to start counting
	unicodeContent = escape(contentFiltered);

	// strip
	unicodeContentNoChinese = unicodeContent.replace(/%u\w{4}/gi, '');

	// strip
	unicodeEnglish = unicodeContentNoChinese.replace(/%\w{2}/gi, '');

	// calculator Chinese characters
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
