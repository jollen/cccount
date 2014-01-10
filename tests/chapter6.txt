# 第6章：學會 Array

Array（陣列）是一種表示資料（Data）的重要結構，這是程式設計的初學者最重要的一堂課。

## 初始化陣列

初始化陣列時，直接把值指定 (= assign) 給陣列元素即可，例如：

~~~~~~~~
<?php

$names[0] = "Jollen"
$names[1] = "Jordan"
$names[2] = "Kitty"
$names["howmany"] = 3;

?>
~~~~~~~~

PHP 還有另外一個自動設定元素的特異功能：

~~~~~~~~
<?php

$names[] = "Jollen"
$names[] = "Jordan"
$names[] = "Kitty"
$names["howmany"] = 3;

?>
~~~~~~~~

等於上面的初始化方法，陣列自動由第 0 個元素開始做配置。要注意的是，PHP 和 Perl/C 一樣，陣列的元素都是由 0開始。

## enumeric array 與 associative array

在上面的例子中，我們看到：

~~~~~~~~
$names[3] = "Kitty"
~~~~~~~~

是以 3 這個數值做索引 (index)，類似這種以數字做索引的陣列稱為 enumeric array 或 scalar array。

另外一個例子：

~~~~~~~~
$names["howmany"] = 3;
~~~~~~~~

陣列元素是以 "howmany" 字串做索引，類似這種以字串做索引的陣列我們稱為 associative array。

我們可以利用 array() 這個語法 (並非函數) 來建立多維的 enumeric array 或 associative array。這部份於後文說明。

## 陣列的 key

另外，我們稱 enumeric array 或 associative array 的索引為 key。因此，在前例中，元素 3 的 key 為 “howmany”；再之前一個例子，”Kitty” 的 key 為 3。

合法的 key 其型態應該是 integer 或 string。

## 多維陣列

多維陣列的初始化與一維陣列方法相同，例如：

~~~~~~~~
<?php

$alpha[0][0] = "A";
$alpha[0][1] = "B";
$alpha[1][0] = "C";
$alpha[1][1] = "D";

?>
~~~~~~~~

這種寫法等於：

~~~~~~~~
<?php

$alpha[0][] = "A";
$alpha[0][] = "B";
$alpha[1][] = "C";
$alpha[1][] = "D";

?>
~~~~~~~~

還記得嗎，這類的陣列稱為 enumeric array。請判斷底下這個陣列是屬於那一種陣列：

~~~~~~~~
<?php

$names["VIP"][] = "yii";
$names["VIP"][] = "yu";
$names["VIP"][] = "stevench";
$names["VIP"][] = "discman";
$names["VIP"][] = "miller";

?>
~~~~~~~~

$names["VIP"] 看成是陣列的名稱，所以這個陣列等於：

~~~~~~~~
<?php

$names["VIP"][0] = "yii";
$names["VIP"][1] = "yu";
$names["VIP"][2] = "stevench";
$names["VIP"][3] = "discman";
$names["VIP"][4] = "miller";

?>
~~~~~~~~

是屬於 enumeric array。另外一個例子，請判斷底下這個陣列是屬於何者：

~~~~~~~~
<?php

$names[0]["王大明"] = "yii";
$names[1]["廖小民"] = "yu";
$names[2]["秦小恒"] = "stevench";
$names[3]["簡大同"] = "discman";
$names[4]["李小平"] = "miller";

?>
~~~~~~~~

我們之所以獨立出章節來討論 array，是因為這是 PHP 很重要的一個主題，在 Data Structure 課程裡，array 也是重要的一個題目。

下一節整理出 PHP 主要的陣列函數群，在完成這一章的課程後，我們就要進入實作演練的階段了。

## 陣列的內部指標

PHP 裡的陣列事實上是利用資料結構中的雙向鍵結串列來維護的，因此我們可以利用 next() 與 pre() 函數將陣列的內部指標往前或往後一個元素。陣列裡的指標除了利用 PHP 提供的函數外，外界無法直接去改變陣列的內部指標。

## PHP 陣列函數群整理

### array() 函數

~~~~~~~~
array array(...);
~~~~~~~~

這是一個 PHP 的語法，用來建立一個陣列。array() 依給定的參數傳回陣列。

範例 1：

~~~~~~~~
$name = array("Jollen", "Paul", "Ketty");
~~~~~~~~

這樣的寫法等於：

~~~~~~~~
$name[0] = "Jollen";
$name[1] = "Paul";
$name[2] = "Ketty";
~~~~~~~~

範例 2：

~~~~~~~~
$name = array("one" => "一", "two" => "二");
~~~~~~~~

這樣的寫法等於：

~~~~~~~~
$name["one"] = "一";
$name["two"] = "二";
~~~~~~~~

範例 3：

~~~~~~~~
<?php

$fruits = array
(
    "fruits"  => array("a"=>"orange","b"=>"banana","c"=>"apple"),
    "numbers" => array(1, 2, 3, 4, 5, 6),
    "holes"   => array("first", 5 => "second", "third")
);

?>
~~~~~~~~

注意 array() 亦可為巢狀式，上面為建立一個二維陣列的範例。此例相當於：

~~~~~~~~
<?php

$fruits["fruits"]["a"] = "orange";
$fruits["fruits"]["b"] = "banana";
$fruits["fruits"]["c"] = "apple";

$fruits["numbers"][0] = 1;
$fruits["numbers"][1] = 2;
$fruits["numbers"][2] = 3;
$fruits["numbers"][3] = 4;
$fruits["numbers"][4] = 5;
$fruits["numbers"][5] = 6;

$fruits["holes"][0] = "first";  --+
$fruits["holes"][5] = "second";   |---- 注意事項第二點
$fruits["holes"][6] = "third";  --+

?>
~~~~~~~~

在範例 3 裡，有幾件值得注意的事：

1. 未指定陣列索引值時，自動由 0 開始索引
2. 索引值接續前一個的值開始。

另外要提的是，array() 實際上並不是一個函數，而是 PHP 用來產生標準 array 初值設定的語法，例如：

~~~~~~~~
$a = array(100, 200);
~~~~~~~~

實際上是由 PHP 處理成：

~~~~~~~~
$a[0] = 100;
$a[1] = 200;
~~~~~~~~

相關函數：list(), range(), array_pad()

### array_walk() 函數

~~~~~~~~
int array_walk(array arr, string func);
~~~~~~~~

將參數 arr 陣列裡的元素一個一個傳給 func 函數，做為第一個參數，當 func 函數要求的參數超過一個時，每當 array_walk 呼叫 func 時，就會產生 warning。如果不想要 warning 訊息，可在 array_walk() 函數前加上 '@'，即使用 @array_walk()，其它 PHP 函數也有相同的用法。

利用 array_walk 函數，當 func 改變傳入的參數值時，原陣列的內容也會跟著改變。

範例：

~~~~~~~~
<?php

$fruits = array("a"=>"orange","b"=>"banana","c"=>"apple");

function test_alter( $item1 ) {
   $item1 = 'bogus';
}

function test_print( $item2 ) {
   echo "$item2 ";
}

array_walk( $fruits, 'test_print' );	// 印出 orange banana apple
array_walk( $fruits, 'test_alter' );	/* array 的值被改變成：
                                           $fruits["a"] = "bogus";
                                           $fruits["b"] = "bogus";
                                           $fruits["c"] = "bogus"; */
array_walk( $fruits, 'test_print' );	/* 因為 array 的值已被改變，所以印出
                                            bogus bogus bogus */

?>
~~~~~~~~

相關函數：each(), list()

### arsort() 函數

~~~~~~~~
void arsort(array array);
~~~~~~~~

將陣列做反向排序 (z->a)，元素的索引值也會跟改變。主要用在排序 associative array。

範例：

~~~~~~~~
<?php

$fruits = array("d"=>"lemon","a"=>"orange","b"=>"banana","c"=>"apple");
arsort($fruits);
for(reset($fruits); $key = key($fruits); next($fruits)) {
    echo "fruits[$key] = ".$fruits[$key]."\n";
}

?>
~~~~~~~~

輸出結果：

~~~~~~~~
fruits[a] = orange 
fruits[d] = lemon 
fruits[b] = banana 
fruits[c] = apple 
~~~~~~~~

相關函數：asort(), rsort(), ksort(), sort()

### assort() 函數

~~~~~~~~
void asort(array array);
~~~~~~~~

和 arsort 一樣，不過是依 a->z 的字母次序做排序。主要是用來對 associative array 做排序。

範例：

~~~~~~~~
<?php

$fruits = array("d"=>"lemon","a"=>"orange","b"=>"banana","c"=>"apple");
asort($fruits);
for(reset($fruits); $key = key($fruits); next($fruits)) {
    echo "fruits[$key] = ".$fruits[$key]."\n";
}

?>
~~~~~~~~

輸出結果：

~~~~~~~~
fruits[c] = apple 
fruits[b] = banana 
fruits[d] = lemon 
fruits[a] = orange 
~~~~~~~~

相關函數：arsort(), rsort(), ksort(), sort()

### array_count_values() 函數

~~~~~~~~
array array_count_values ( array input);
~~~~~~~~

計算 array 裡各元素的出現頻率。傳回的結果為另一個 array，並以原來 array (input) 的值 (value) 當做 key，其值則是出現次數。

範例：

~~~~~~~~
<?php

$arr = array(1, 2, 2, 3, “Hello”, “Hello”, “World”);
$arr_c = array_count_values($arr);
print $arr_c;

?>
~~~~~~~~

輸出結果：

~~~~~~~~
Array ( [1] => 1 [2] => 2 [3] => 1 [Hello] => 2 [World] => 1 )
~~~~~~~~

輸出結果 ($arr_c) 表示 $arr 陣列裡的元素 1 出現一次、元素 2 出現二次、元素、元素 3 出現一次、元素 “Hello” 出現二次、元素 “World” 出現一次。

PHP 4.0.0 以上版本才支援 array_count_values() 函數。

### array_diff() 函數

~~~~~~~~
array array_diff ( array array1, array array2 [, array ...]);
~~~~~~~~

找尋 array1 裡沒有在其它 array (array2…arrayN) 出現過的元素。

範例：

~~~~~~~~
<?php

$arr1 = array ("green", "white", "red", "blue", "green");
$arr2 = array ("green", "blue", "red");
$result = array_diff($arr1, $arr2);
print_r($result);

?>
~~~~~~~~

輸出結果：

~~~~~~~~
Array ( [1] => white )
~~~~~~~~

請勿使用 PHP 4.0.4 版本的 array_diff() 函數，該版本的 array_diff() 函數有問題。

相關函數：array_intersect()

### array_filter() 函數

~~~~~~~~
array array_filter ( array input [, mixed callback]);
~~~~~~~~

利用 callback 函數來過瀘 array 的內容，當 callback 函數傳回 TRUE 時，則保留該元素，否則去除該元素。最後的結果會以 array 型態傳回，原先的 array 內容並不會有所改變。

範例：

~~~~~~~~
<pre>
<?php

function filter1($val)
{
   return (strlen($val) == 5); //只保留字串長度為 5 bytes 的元素
}

function filter2($val)
{
   return (strlen($val) < 5); //只保留字串長度小於 5 bytes 的元素
}

$arr1 = array ("green", "white", "red", "blue", "green");
$arr2 = array ("green", "blue", "red");

$result1 = array_filter($arr1, "filter1");
$result2 = array_filter($arr2, "filter2");

print_r($arr1);
print_r($arr2);
print_r($result1);
print_r($result2);

?>
</pre>
~~~~~~~~

輸出結果：

~~~~~~~~
Array
(
    [0] => green
    [1] => white
    [2] => red
    [3] => blue
    [4] => green
)
Array
(
    [0] => green
    [1] => blue
    [2] => red
)
Array
(
    [0] => green
    [1] => white
    [4] => green
)
Array
(
    [1] => blue
    [2] => red
)
~~~~~~~~

PHP 4.0.6 以上版本才支援 array_filter() 函數。

相關函數：array_map(), array_reduce()

### array_flip() 函數

~~~~~~~~
array array_flip(array trans);
~~~~~~~~

將 array 反相，即將 key 換成 value，value 換成 key。原來的 value 必須要能符合當 key 的條件 (必須是 integer 或 string)，如果交換後有相同 key 的元素，則該 key 的值以最後一個元素的值為主。

範例：

~~~~~~~~
<pre>
<?php

$arr = array("A" => "a", "B" => "b", "C" => "c", "D" => "c");
$arr_flip = array_flip($arr);

print_r($arr);
print_r($arr_flip);

?>
</pre>
~~~~~~~~

輸出結果：

~~~~~~~~
Array
(
    [A] => a
    [B] => b
    [C] => c
    [D] => c
)
Array
(
    [a] => A
    [b] => B
    [c] => D
)
~~~~~~~~

### array_intersect() 函數

~~~~~~~~
array array_intersect ( array array1, array array2 [, array ...]);
~~~~~~~~

逐一列出 array1 陣列裡，在其它每個陣列 (array1…arrayN) 都有出現的元素。

範例：

~~~~~~~~
<pre>
<?php

$arr1 = array("green", "white", "red", "blue", "green");
$arr2 = array("green", "blue", "red");
$arr3 = array("red");

$result1 = array_intersect($arr1, $arr2, $arr3);
$result2 = array_intersect($arr1, $arr2);

print_r($arr1);
print_r($arr2);
print_r($result1);
print_r($result2);

?>
</pre>
~~~~~~~~

輸出結果：

~~~~~~~~
Array
(
    [0] => green
    [1] => white
    [2] => red
    [3] => blue
    [4] => green
)
Array
(
    [0] => green
    [1] => blue
    [2] => red
)
Array
(
    [2] => red
)
Array
(
    [0] => green
    [2] => red
    [3] => blue
    [4] => green
)
~~~~~~~~

請勿使用 PHP 4.0.4 版本的 array_intersect() 函數，該版本的 array_intersect() 函數有問題。

相關函數：array_diff()

### array_key_exists() 函數

~~~~~~~~
bool array_key_exists(mixed key, array search);
~~~~~~~~

檢查指定的 key 是否存在 search 陣列裡。假如存在的話，則傳回 TRUE，否則傳回 FALSE。

範例：

~~~~~~~~
<?php

$arr = array("A" => "a", "B" => "b", "C" => "c", "D" => "c");
if (array_key_exists("B", $arr)) {
   echo "The key 'B' is in the array.<br>\n";
}

?>
~~~~~~~~

輸出結果：

~~~~~~~~
The key 'B' is in the array.
~~~~~~~~

PHP 4.1.0 以上的版本才支援 array_key_exists() 函數；PHP 4.0.6 的版本請使用 key_exists() 函數。

相關函數：isset()

### array_keys() 函數

~~~~~~~~
array array_keys ( array input [, mixed search_value]);
~~~~~~~~

傳回 input 陣列的所有 key，如果指定 search_value 參數的話，則是只傳回值為 search_value 的 key。

範例：

~~~~~~~~
<pre>
<?php

$arr = array("A" => "a", "B" => "b", "C" => "c", "D" => "c");

$result1 = array_keys($arr);
$result2 = array_keys($arr, "c");
$result3 = array_keys($arr, "d");

print_r($result1);
print_r($result2);
print_r($result3);

?>
</pre>
~~~~~~~~

輸出結果：

~~~~~~~~
Array
(
    [0] => A
    [1] => B
    [2] => C
    [3] => D
)
Array
(
    [0] => C
    [1] => D
)
Array
(
)
~~~~~~~~

相關函數：array_values()

### array_map() 函數

~~~~~~~~
array array_map(mixed callback, array arr1 [, array arr2...]);
~~~~~~~~

將 arr1..arrN 陣列裡的每個元素都以 callback 函數處理後取代。

範例：

~~~~~~~~
<pre>
<?php

function cube($val)
{
   return $val*$val*$val;
}

$arr = array(1, 3, 5, 7, 9);
$result = array_map("cube", $arr);

print_r($result);

?>
</pre>
~~~~~~~~

輸出結果：

~~~~~~~~
Array
(
    [0] => 1
    [1] => 27
    [2] => 125
    [3] => 343
    [4] => 729
)
~~~~~~~~

PHP 4.0.6 以上的版本才支援 array_map() 函數。

相關函數：array_filter(), array_reduce()

### array_merge() 函數

~~~~~~~~
array array_merge(array array1, array array2 [, array ...]);
~~~~~~~~

合併二個以上的陣列。

範例：

~~~~~~~~
<pre>
<?php

$arr1 = array(1, 3, 5, 7, 9);
$arr2 = array("A", "B", "C", "D");

$result = array_merge($arr1, $arr2);
print_r($result);

?>
</pre>
~~~~~~~~

輸出結果：

~~~~~~~~
Array
(
    [0] => 1
    [1] => 3
    [2] => 5
    [3] => 7
    [4] => 9
    [5] => A
    [6] => B
    [7] => C
    [8] => D
)
~~~~~~~~

相關函數：array_merge_recursive()


### array_merge_recursive() 函數

以遞迴 (recursive) 方式合併二個以上的陣列。請看底下的範例即可清楚明白 array_merge() 與 array_merge_recursive() 二個函數的差別。

範例：

~~~~~~~~
<pre>
<?php

$arr1 = array(1, 3, 5, 7, "final" => 9);
$arr2 = array("A", "B", "C", "final" => "D");

$result1 = array_merge($arr1, $arr2);
$result2 = array_merge_recursive($arr1, $arr2);

print_r($result1);
print_r($result2);

?>
</pre>
~~~~~~~~

輸出結果：

~~~~~~~~
Array
(
    [0] => 1
    [1] => 3
    [2] => 5
    [3] => 7
    [final] => D
    [4] => A
    [5] => B
    [6] => C
)
Array
(
    [0] => 1
    [1] => 3
    [2] => 5
    [3] => 7
    [final] => Array
        (
            [0] => 9
            [1] => D
        )

    [4] => A
    [5] => B
    [6] => C
)
~~~~~~~~

相關函數：array_merge()

### array_multisort() 函數

~~~~~~~~
bool array_multisort(array ar1 [, mixed arg [, mixed ... [, array ...]]]);
~~~~~~~~

多個陣列或多維陣列的排序函數，第一個參數必須是一個陣列，第二個之後的參數可以接排序方法或比較方法，或是其它陣列。

可指定的排序方法如下：

1. SORT_ASC – 以遞增方式排序
2. SORT_DESC – 以遞減方式排序

可指定的比較方法如下：

1. SORT_REGULAR – 以一般方式比較
2. SORT_NUMERIC – 以數字方式比較
3. SORT_STRING – 以字串方式比較

array_multisort() 函數執行成功則傳回 TRUE，否則傳回 FALSE。

範例：

~~~~~~~~
<pre>
<?php

$arr = array(9, 1, 3, 15, 7, 40);

array_multisort($arr, SORT_ASC, SORT_NUMERIC);

print_r($arr);

?>
</pre>
~~~~~~~~

輸出結果：

~~~~~~~~
Array
(
    [0] => 1
    [1] => 3
    [2] => 7
    [3] => 9
    [4] => 15
    [5] => 40
)
~~~~~~~~

### array_pad() 函數

~~~~~~~~
array array_pad(array input, int pad_size, mixed pad_value);
~~~~~~~~

將 input 陣列以 pad_value 增加到 pad_size 大小，並傳回一個新陣列。如果 pad_size 大於 0，則將 pad_value 加到 input 陣列的後面；如果 pad_size 小於 0，則將 pad_value 加到 input 陣列的前面。

如果 pad_size 小於或等於原來的 input 陣列，則不執行任何動作。

範例：

~~~~~~~~
<pre>
<?php

$arr = array(9, 1, 3);

// 將 0 加到 $arr 後面，使得 $arr 的大小為 5 個元素
$result1 = array_pad($arr, 5, 0);

// 將 7 加到 $arr 前面，使得 $arr 的大小為 10 個元素
$result2 = array_pad($arr, -10, 5);

// 沒有執行任何動作
$result3 = array_pad($arr, 2, 0);

print_r($result1);
print_r($result2);
print_r($result3);

?>
</pre>
~~~~~~~~

輸出結果：

~~~~~~~~
Array
(
    [0] => 9
    [1] => 1
    [2] => 3
    [3] => 0
    [4] => 0
)
Array
(
    [0] => 5
    [1] => 5
    [2] => 5
    [3] => 5
    [4] => 5
    [5] => 5
    [6] => 5
    [7] => 9
    [8] => 1
    [9] => 3
)
Array
(
    [0] => 9
    [1] => 1
    [2] => 3
)
~~~~~~~~

### array_pop() 函數

~~~~~~~~
mixed array_pop(array array);
~~~~~~~~

由陣列裡 pop 出一個元素。即取出陣列的最後一個元素，若成功取得一個元素，若原來的陣列長度減少一個元素並傳回該元素值。

範例：

~~~~~~~~
<pre>
<?php

$arr = array(9, 1, 3, 7, 8);

print_r($arr);

$last = array_pop($arr);

echo "Pop: $last\n";

print_r($arr);

?>
</pre>
~~~~~~~~

輸出結果：

~~~~~~~~
Array
(
    [0] => 9
    [1] => 1
    [2] => 3
    [3] => 7
    [4] => 8
)
Pop: 8
Array
(
    [0] => 9
    [1] => 1
    [2] => 3
    [3] => 7
)
~~~~~~~~

相關函數：array_push()

### array_push() 函數

~~~~~~~~
int array_push(array array, mixed var [, mixed ...]);
~~~~~~~~

相對於 array_pop，將數個值 push 到陣列裡。

範例：

~~~~~~~~
<pre>
<?php

$arr = array(9, 1, 3, 7, 8);

print_r($arr);

$last = array_push($arr, 20, 30, 40);

echo "Push: 20 30 40\n";

print_r($arr);

?>
</pre>
~~~~~~~~

輸出結果：

~~~~~~~~
Array
(
    [0] => 9
    [1] => 1
    [2] => 3
    [3] => 7
    [4] => 8
)
Push: 20 30 40
Array
(
    [0] => 9
    [1] => 1
    [2] => 3
    [3] => 7
    [4] => 8
    [5] => 20
    [6] => 30
    [7] => 40
)
~~~~~~~~

相關函數：array_pop(), array_shift(), array_unshift()

### array_rand() 函數

~~~~~~~~
mixed array_rand(array input [, int num_req]);
~~~~~~~~

以亂數方式由 input 陣列取出 num_req 個元素，未指定 num_req 的話則只傳回一個元素。

範例：

~~~~~~~~
<pre>
<?php

// 別忘了設定亂數種子
srand((float)microtime()*10000000);

$arr = array(1, 2, 3, 4, 5, 6, 7, 8, 9);
$element = array_rand($arr);
$result = array_rand($arr, 3);

echo "Element: $element\n";
print_r($result);

?>
</pre>
~~~~~~~~

輸出結果範例：

~~~~~~~~
Element: 2
Array
(
    [0] => 8
    [1] => 5
    [2] => 3
)
~~~~~~~~

### array_reverse() 函數

~~~~~~~~
array array_reverse(array array [, bool preserve_keys]);
~~~~~~~~

將陣列反序，指定 perserve_keys 為 TRUE 的話表示保留 key 與 value 的關係，即連同 key 一起做反序的動作。

範例：

~~~~~~~~
<pre>
<?php

$arr = array(1, 2, 3, 4, 5, 6);

$result1 = array_reverse($arr);
$result2 = array_reverse($arr, TRUE);

print_r($result1);
print_r($result2);

?>
</pre>
~~~~~~~~

輸出結果：

~~~~~~~~
Array
(
    [0] => 6
    [1] => 5
    [2] => 4
    [3] => 3
    [4] => 2
    [5] => 1
)
Array
(
    [5] => 6
    [4] => 5
    [3] => 4
    [2] => 3
    [1] => 2
    [0] => 1
)
~~~~~~~~

PHP 4.0.3 以上的版本才能使用 perserve_keys 參數。

### array_reduce() 函數

~~~~~~~~
mixed array_reduce(array input, mixed callback [, mixed initial]);
~~~~~~~~

initial 的型態是 mixed。以迭代方式將陣列的每個元素依序傳給 callback 函數，最後則傳回一個迭代後的值。若指定 initial 的值，則 initial 為迭代的初始值。

迭代計算 (iterative) 是將最後的計算結果，連同下一個等待計算的值再傳入迭代函數，計算出另一個最後的計算結果；依此計算，最後會得到一個值。

範例：

~~~~~~~~
<?php

function sum($v, $w) {
    $v += $w;
    return $v;
}

$a = array(1, 2, 3, 4, 5);

$b = array_reduce($a, "sum");
$c = array_reduce($a, "sum", -100);

echo "b = $b, c = $c<br>\n";

?>
~~~~~~~~

輸出結果：

~~~~~~~~
b = 15, c = -85
~~~~~~~~

PHP 4.0.5 以上的版本才支援 array_reduce() 函數。

相關函數：array_filter(), array_map()

### array_shift() 函數

~~~~~~~~
mixed array_shift(array input);
~~~~~~~~

將陣列的第一個元素傳回，並向左移動一個元素單位。如果陣列為空陣列，則傳回 NULL。

範例：

~~~~~~~~
<pre>
<?php

$arr = array(1, 2, 3, 4, 5);

$c = array_shift($arr);

echo "Element returned: $c\n";
print_r($arr);

?>
</pre>
~~~~~~~~

輸出結果：

~~~~~~~~
Element returned: 1
Array
(
    [0] => 2
    [1] => 3
    [2] => 4
    [3] => 5
)
~~~~~~~~

相關函數：array_unshift(), array_push(), and array_pop()

### array_slice() 函數

~~~~~~~~
array array_slice(array input, int offset [, int length]);
~~~~~~~~

由陣列的 offset 位置開始，傳回 length 個元素。如果 offset 為正數，則啟始位置由陣列開頭 (由 0 開始) 算起；如果 offset 為負數，則啟始位置由陣列的尾端算起 (最後一個數為 -1，倒數第二個數為 –2，依此類推)。

如果 length 為正數，則傳回 length 個元素；如果 length 為負數，則傳回由 offset 開始到最後往前 length 個數之間的所有元素。如果未指定 length 參數，則傳回由 offset 開始之後的所有元素。

如果 offset 為 0，表示由陣列第一個元素開始。

範例：

~~~~~~~~
<pre>
<?php

$arr = array(1, 2, 3, 4, 5);

$arr1 = array_slice($arr, 3, 2);
print_r($arr1);

$arr2 = array_slice($arr, -2, 1);
print_r($arr2);

$arr3 = array_slice($arr, 1, -1);
print_r($arr3);

// 由 -4 即 2 開始 (5 為 -1), 傳回
// 到 3 之間的所有元素。
// (由 5 往前 2 個數, 即 3)
$arr4 = array_slice($arr, -4, -2);
print_r($arr4);

$arr5 = array_slice($arr, 0);
print_r($arr5);

?>
</pre>
~~~~~~~~

輸出結果：

~~~~~~~~
Array
(
    [0] => 4
    [1] => 5
)
Array
(
    [0] => 4
)
Array
(
    [0] => 2
    [1] => 3
    [2] => 4
)
Array
(
    [0] => 2
    [1] => 3
)
Array
(
    [0] => 1
    [1] => 2
    [2] => 3
    [3] => 4
    [4] => 5
)
~~~~~~~~

相關函數：array_splice()


### array_splice() 函數

~~~~~~~~
array array_splice(array input, int offset [, int length [, array replacement]]);
~~~~~~~~

array_splice() 函數與 array_slice() 函數的用途很像。array_splice() 函數一樣會傳回取出的元素，而且原來的 input 陣列也容也會跟著改變。如果指定 replacement 陣列，則「所有取出」的元素原來位置會以 replacement 陣列取代後再傳回。

相對於 array_slice() 函數，同樣的範例改用 array_splice() 函數後，輸出結果如下。

範例：

~~~~~~~~
<pre>
<?php

$arr = array(1, 2, 3, 4, 5);

$arr1 = array_splice($arr, 3, 2);
print_r($arr1);

$arr2 = array_splice($arr, -2, 1);
print_r($arr2);

$arr3 = array_splice($arr, 1, -1);
print_r($arr3);

// 由 -4 即 2 開始 (5 為 -1), 傳回
// 到 3 之間的所有元素。
// (由 5 往前 2 個數, 即 3)
$arr4 = array_splice($arr, -4, -2);
print_r($arr4);

$arr5 = array_splice($arr, 0);
print_r($arr5);

?>
</pre>
~~~~~~~~

輸出結果：

~~~~~~~~
Array
(
    [0] => 4
    [1] => 5
)
Array
(
    [0] => 2
)
Array
(
)
Array
(
)
Array
(
    [0] => 1
    [1] => 3
)
~~~~~~~~

會得到這樣的結果是因為 array_splice() 函數會將 $arr 陣列的內容改變，因此如果要得到與 array_slice() 函數範例相同的結果，程式必須修改成底下這樣：

~~~~~~~~
<pre>
<?php

$arr = array(1, 2, 3, 4, 5);
$arr1 = array_splice($arr, 3, 2);
print_r($arr1);

$arr = array(1, 2, 3, 4, 5);
$arr2 = array_splice($arr, -2, 1);
print_r($arr2);

$arr = array(1, 2, 3, 4, 5);
$arr3 = array_splice($arr, 1, -1);
print_r($arr3);

$arr = array(1, 2, 3, 4, 5);
$arr4 = array_splice($arr, -4, -2);
print_r($arr4);

$arr = array(1, 2, 3, 4, 5);
$arr5 = array_splice($arr, 0);
print_r($arr5);

?>
</pre>
~~~~~~~~

最後輸出的結果就會和 array_slice() 函數的範例一樣。而每次 $arr 陣列的內容就會是「取出後剩下」的元素。

請看底下的輸出結果：

~~~~~~~~
Array
(
    [0] => 1
    [1] => 2
    [2] => 3
)
Array
(
    [0] => 1
    [1] => 2
    [2] => 3
    [3] => 5
)
Array
(
    [0] => 1
    [1] => 5
)
Array
(
    [0] => 1
    [1] => 4
    [2] => 5
)
Array
(
)
~~~~~~~~

如果指定 replacement 陣列的話，取出後的位置就會以 replacement 陣列取代，並成為 $arr 陣列的內容。

請看底下的範例：

~~~~~~~~
<pre>
<?php

// 原來 4 被取代成 hello world
$arr = array(1, 2, 3, 4, 5);
$arr2 = array_splice($arr, -2, 1, array("hello", "world"));
print_r($arr);

// 原來 2 3 4 被取代成 hello world
$arr = array(1, 2, 3, 4, 5);
$arr3 = array_splice($arr, 1, -1, array("hello", "world"));
print_r($arr);

?>
</pre>
~~~~~~~~

輸出結果：

~~~~~~~~
Array
(
    [0] => 1
    [1] => 2
    [2] => 3
    [3] => hello
    [4] => world
    [5] => 5
)
Array
(
    [0] => 1
    [1] => hello
    [2] => world
    [3] => 5
)
~~~~~~~~

相關函數：array_slice()

### array_sum() 函數

~~~~~~~~
mixed array_sum(array input);
~~~~~~~~

計算陣列裡的所有元素和。

範例：

~~~~~~~~
<?php

$arr = array(1, 2, 3, 4, 5);
$sum = array_sum($arr);

echo "sum = $sum<br>\n";

?>
~~~~~~~~

輸出結果：

~~~~~~~~
sum = 15
~~~~~~~~

PHP 4.0.4 以上的版本才支援 array_sum() 函數。

### array_unique() 函數

~~~~~~~~
array array_unique(array array);
~~~~~~~~

去除陣列裡重覆的元素，並傳回去除重覆元素後的新陣列。陣列裡若有重覆的元素，則保留第一次出現的元素。

範例：

~~~~~~~~
<pre>
<?php

$arr = array(3, 2, 5, 4, 10, 9, 3, 2, 1, 2, 3, 4, 5);

print_r($arr);
$result = array_unique($arr);
print_r($result);

?>
</pre>
~~~~~~~~

輸出結果 (請注意 key 的關係)：

~~~~~~~~
Array
(
    [0] => 3
    [1] => 2
    [2] => 5
    [3] => 4
    [4] => 10
    [5] => 9
    [6] => 3
    [7] => 2
    [8] => 1
    [9] => 2
    [10] => 3
    [11] => 4
    [12] => 5
)
Array
(
    [0] => 3
    [1] => 2
    [2] => 5
    [3] => 4
    [4] => 10
    [5] => 9
    [8] => 1
)
~~~~~~~~

請勿使用 PHP 4.0.4 版本的 array_unique() 函數，該版本的 array_unique() 函數有問題。

### array_unshift() 函數

~~~~~~~~
int array_unshift(array array, mixed var [, mixed ...]);
~~~~~~~~

將數個元素加到陣列的開頭，傳回成功附加的元素個數。

範例：

~~~~~~~~
<pre>
<?php

$arr = array("hello", "world");
print_r($arr);

array_unshift($arr, "check", "it out!");
print_r($arr);

?>
</pre>
~~~~~~~~

輸出結果：

~~~~~~~~
Array
(
    [0] => hello
    [1] => world
)
Array
(
    [0] => check
    [1] => it out!
    [2] => hello
    [3] => world
)
~~~~~~~~

相關函數：array_shift(), array_push(), array_pop()

### array_values() 函數

~~~~~~~~
array array_values(array input);
~~~~~~~~

以陣列型態傳回 input 陣列的所有元素值。

範例：

~~~~~~~~
<pre>
<?php

$arr = array("name1" => "jordan",
             "name2" => "hellen",
             "name3" => "peter");

$val = array_values($arr);
print_r($val);

?>
</pre>
~~~~~~~~

輸出結果：

~~~~~~~~
Array
(
    [0] => jordan
    [1] => hellen
    [2] => peter
)
~~~~~~~~

相關函數：array_keys()

### array_search() 函數

~~~~~~~~
mixed array_search(mixed needle, array haystack [, bool strict]);
~~~~~~~~

在 haystack 陣列裡搜尋 needle 值，如果找到的話則傳回 needle 值的 key，否則傳回 FALSE。指定 strict 為 TRUE 的話，表示連型態都必須符合才算。

範例：

~~~~~~~~
<?php

$arr = array("name1" => "jordan",
             "name2" => "hellen",
             "name3" => "peter");

$key = array_search("jordan", $arr, TRUE);
echo "found jordan at $key<br>\n";

?>
~~~~~~~~

輸出結果：

~~~~~~~~
found jordan at name1
~~~~~~~~

PHP 4.0.5 以上的版本才支援 array_search() 函數。

相關函數：in_array()

### count() 函數

~~~~~~~~
int count(mixed var);
~~~~~~~~

傳回 var (通常為陣列) 的元素個數，非陣列的變數則只有一個元素。

沒果沒有這個 var 變數，則傳回 0；如果 var 不是陣列，則傳回 1。

相關函數：sizeof(), isset(), is_array()

### current() 函數

~~~~~~~~
mixed current(array array);
~~~~~~~~

傳回目前陣列裡的指標所指元素的「值」。每一個陣列都有一個內部的指標，指向其中的一個元素。陣列的所有元素利用雙向串列連接，這個指標便指向目前的元素。一開始這個指標是指到陣列的第一個元素，利用其它函數存取陣列時，便會改變這個指標，current() 便是傳回目前所指的陣列元素的值，但不會改變這個指標的位置。

傳回指標指向陣列的範圍之外的位置，便傳回 false。有一種情況要特別小心，當元素的值為 0 或是空字串 "" 時，也會傳回 false，此時可改用 echo() 函數。

相關函數：end(), next(), prev(), reset()

### each() 函數

~~~~~~~~
array each(array array);
~~~~~~~~

傳回目前陣列指標所指元素的 key/value 對，並且將指標指向下一個元素。傳回的結果是一個四個元素的陣列，分別是：

- 0/key 存放 key 資料，1/value 存放 value 值

例如傳回的 $a 陣列，我們可利用：

~~~~~~~~
$a[0] 或
$a["key"]
~~~~~~~~

來索引目前陣列指標指的元素的 key 值，利用：

~~~~~~~~
$a[1] 或
$a["value"]
~~~~~~~~

來索引目前陣列指標指的元素的 value 值

範例：

~~~~~~~~
<?php

$foo = array( "bob", "fred", "jussi", "jouni" );
$bar = each( $foo );

?>
~~~~~~~~

傳回結果 (非輸出結果)：

~~~~~~~~
$bar[0] = 0 
$bar[1] = 'bob' 
$bar["key"] = 0 
$bar["value"] = 'bob' 
~~~~~~~~

範例：

~~~~~~~~
<?php

$foo = array( "Robert" => "Bob", "Seppo" => "Sepi" );
end($foo);	// 將 $foo 的內部指標指向陣列的最後一個元素
$bar = each( $foo );	// 目前的指標指向最後一個元素，即 $foo["Seppo"] = "Sepi"

?>
~~~~~~~~

傳回結果 (非輸出結果)：

~~~~~~~~
$bar[0] = 'Seppo' 
$bar[1] = 'Sepi' 
$bar["key"] = 'Seppo' 
$bar["value"] = 'Sepi'
~~~~~~~~

通常 echo() 可和 list() 搭配使用，例如，列出 $HTTP_POST_VARS 環境變數的所有元素內容：

~~~~~~~~
<?php

while ( list( $key, $val ) = each( $HTTP_POST_VARS ) ) {
   echo "$key => $val<br>";
}

?>
~~~~~~~~

相關函數：key(), list(), current(), reset(), next(), prev()

### end() 函數

~~~~~~~~
end(array array);
~~~~~~~~

將陣列指標指向陣列的最後一個元素。

相關函數：current(), each(), end(), next(), reset()

### in_array() 函數

~~~~~~~~
bool in_array(mixed needle, array haystack [, bool strict]);
~~~~~~~~

傳回 TRUE 假如在 haystack 陣列裡找到 needle 值的話，否則傳回 FALSE。指定 strict 為 TRUE 的話，表示連型態都必須符合才算。

範例：

~~~~~~~~
<?php

$arr = array("name1" => "jordan",
             "name2" => "hellen",
             "name3" => "peter");

if (in_array("jordan", $arr, TRUE))
   echo "found jordan!";

?>
~~~~~~~~

輸出結果：

~~~~~~~~
found jordan!
~~~~~~~~

needle 必須是一個值，PHP 4.2.0 開始才能傳入一個陣列。

相關函數：array_search()

### key() 函數

~~~~~~~~
mixed key(array array);
~~~~~~~~

傳回 associative array 內部指標 (index) 所指元素的 key。

相關函數：current(), next() 

### ksort() 函數

~~~~~~~~
int ksort(array array);
~~~~~~~~

依陣列的 key 來做排序的工作，對於 associative array 很有用。

範例：

~~~~~~~~
<?php

$fruits = array("d"=>"lemon","a"=>"orange","b"=>"banana","c"=>"apple");
ksort($fruits);
for(reset($fruits); $key = key($fruits); next($fruits)) {
    echo "fruits[$key] = ".$fruits[$key]."\n";
}

?>
~~~~~~~~

輸出結果：

~~~~~~~~
fruits[a] = orange 
fruits[b] = banana 
fruits[c] = apple 
fruits[d] = lemon 
~~~~~~~~

相關函數：asort(), arsort(), sort(), rsort()

### list() 函數

~~~~~~~~
void list(...);
~~~~~~~~

list() 並不是一個 function，而是像 array() 一樣，屬於 PHP 的語法。list() 用來一次給定多個值給多個變數。

範例：

~~~~~~~~
<table>
 <tr>
  <th>Employee name</th>
  <th>Salary</th>
 </tr>

<?php

$result = mysql($conn, "SELECT id, name, salary FROM employees");
while (list($id, $name, $salary) = mysql_fetch_row($result)) {
    print(" <tr>\n".
          "  <td><a href=\"info.php3?id=$id\">$name</a></td>\n".
          "  <td>$salary</td>\n".
          " </tr>\n");
}

?>

</table>
~~~~~~~~

相關函數：each(), array()

### next() 函數

~~~~~~~~
mixed next(array array);
~~~~~~~~

傳回下一個陣列指標所指的值，注意是先把指標往下移，再傳回值。如果元素的值是 0 或 "" (空字串)，則傳回 false。當指標已指向陣列尾段，無法再往下移時，則傳回 false。

可利用 echo() 函數來觀察陣列中是否有 0 或 ""。

相關函數：current(), end(), prev(), reset() 

### pos() 函數

~~~~~~~~
mixed pos(array array);
~~~~~~~~

作用和 current() 函數相同。

相關函數：end(), next(), prev(), reset()

### prev() 函數

~~~~~~~~
mixed prev(array array);
~~~~~~~~

將陣列內部指標往前移前一位後，再傳回元素的值。

相關函數：current(), end() next(), reset()

### reset() 函數

~~~~~~~~
mixed reset(array array);
~~~~~~~~

將陣列的指標初始化，即移到第一個元素的位置，並且傳回第一個元素的值。

相關函數：current(), each(), next() prev() and reset() 

### rsort() 函數

~~~~~~~~
void rsort(array array);
~~~~~~~~

將陣列做反向排序 (z->a)。

範例：

~~~~~~~~
<?php

$fruits = array("lemon","orange","banana","apple");
rsort($fruits);
for(reset($fruits); ($key,$value) = each($fruits); ) {
    echo "fruits[$key] = ".$value."\n";
}

?>
~~~~~~~~

輸出結果：

~~~~~~~~
fruits[0] = orange 
fruits[1] = lemon 
fruits[2] = banana 
fruits[3] = apple 
~~~~~~~~

相關函數：arsort(), asort(), ksort(), sort() and usort(). 

### sizeof() 函數

~~~~~~~~
int sizeof(array array);
~~~~~~~~

傳入一個陣列，傳回陣列的元素個數。

相關函數：count() 

### sort() 函數

~~~~~~~~
void sort(array array);
~~~~~~~~

將陣列做 a->z 的排序，不會考慮 key 與 index，即只將元素的值做排序，不更動 key 與 index 的值，請參考範例。

範例：

~~~~~~~~
<?php

$fruits = array("lemon","orange","banana","apple");
sort($fruits);
for(reset($fruits); $key = key($fruits); next($fruits)) {
    echo "fruits[$key] = ".$fruits[$key]."\n";
}

?>
~~~~~~~~

輸出結果：

~~~~~~~~
fruits[0] = apple 
fruits[1] = banana 
fruits[2] = lemon 
fruits[3] = orange 
~~~~~~~~

相關函數：arsort(), asort(), ksort(), rsort(), usort()

### uasort() 函數

~~~~~~~~
void uasort(array array, function cmp_function);
~~~~~~~~

依 cmp_function 使用者自定的函數來排序陣列，並且維護陣列的 key 與 value 的關係，主要是用來對 associative array 做排序的工作。

cmp_function 是使用者自定用來做陣列間大小比對的函數。

### uksort() 函數

~~~~~~~~
void uksort(array array, function cmp_function);
~~~~~~~~

對陣列的 key 做排序的工作，陣列元素的比對採用使用者自定的 cmp_function 函數。

範例：

~~~~~~~~
<?php

function mycompare($a, $b) {   
    if ($a == $b) return 0;
    return ($a > $b) ? -1 : 1;
}
$a = array(4 => "four", 3 => "three", 20 => "twenty", 10 => "ten");
uksort($a, mycompare);
while(list($key, $value) = each($a)) {
    echo "$key: $value\n";
}

?>
~~~~~~~~

輸出結果：

~~~~~~~~
20: twenty 
10: ten 
4: four 
3: three 
~~~~~~~~

相關函數：arsort(), asort(), uasort(), ksort(), rsort(), sort()

### usort() 函數

~~~~~~~~
void usort(array array, function cmp_function);
~~~~~~~~

將陣列元素的值做大小排序的工作，元素間的大小比對使用自定的 cmp_function 函數，陣列的 key 不會被維護，即只搬動陣列的元素，不改變 key 的位置。

範例：

~~~~~~~~
<?php

function cmp($a,$b) {   
    if ($a == $b) return 0;
    return ($a > $b) ? -1 : 1;
}
$a = array(3,2,5,6,1);
usort($a, cmp);
while(list($key,$value) = each($a)) {
    echo "$key: $value\n";
}

?>
~~~~~~~~

輸出結果：

~~~~~~~~
0: 6 
1: 5 
2: 3 
3: 2 
4: 1 
~~~~~~~~

相關函數：arsort(), asort(), ksort(), rsort(), sort()

