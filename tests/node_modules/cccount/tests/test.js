var ccc = require('cccount');

// should be 0 chars
ccc.chineseCharCount("Hello", function (res) {
	console.log(res);
});

// should be 2 chars
ccc.chineseCharCount("您好", function (res) {
	console.log(res);
});

// should be 2 chars
ccc.chineseCharCount("您好 Hello", function (res) {
	console.log(res);
});


// should be 2 chars
ccc.chineseCharCount("您好Hello", function (res) {
	console.log(res);
});


// should be 109 chars
ccc.chineseCharCount("台灣科技業有一個惡習，「資深工程師未來就是要當主管」，以晉升主管職為職場最高戰略目標，而不是以提升技術品質與能力為主，這就是台灣科技業二十年來一直無法建立軟體實力的一個深層原因。有了這層的管理機制，資深軟體工程師，會更願意往技術領域前進。", function (res) {
	console.log(res);
});

// should be 143 chars
ccc.chineseCharCount("例如，電人電腦搭載微軟作業系統，這是屬於一種軟體授權模式的研發，但是Android手機本質上是一種開放源碼的研發模式。所以，用開發微軟產品的軟體模式，去做Android的產品。結果如何，這需要一點運氣。這通常是第一波出局者。從2009到2011年這三年間，從Android生態系統出局的廠商，幾乎都是屬於這個類型。這些類型的廠商，幾乎因為有過去的一些包袱，觀念一時難以轉變者。", function (res) {
	console.log(res);
});
