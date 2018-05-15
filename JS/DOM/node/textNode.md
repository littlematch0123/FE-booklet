# 深入理解DOM节点类型第二篇——文本节点Text

&emsp;&emsp;文本节点顾名思义指向文本的节点，网页上看到的文字内容都属于文本节点。该节点简单直观，本文将详细介绍该部分内容

&nbsp;

### 特征

&emsp;&emsp;文本节点由Text类型表示，包含的是纯文本内容，但文本节点是对象类型

<div>
<pre>&lt;div id="box"&gt;内容&lt;/div&gt;
&lt;script&gt;
    console.log(box.firstChild);//"内容"
    console.log(typeof box.firstChild);//'object'
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;纯文本内容中的HTML字符会被转义，关于转义字符的详细情况[移步至此](http://www.cnblogs.com/xiaohuochai/p/5003281.html#anchor7)

<div>
<pre>&lt;div id="box"&gt;&amp;lt;内容&amp;gt;&lt;/div&gt;
&lt;script&gt;
    console.log(box.firstChild);//"&lt;内容&gt;""
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;文本节点的三个node属性&mdash;&mdash;nodeType、nodeName、nodeValue分别是3、'#text'和节点所包含的文本，其父节点parentNode指向包含该文本节点的元素节点，文本节点没有子节点

&emsp;&emsp;注意：DOM树中共存在12种节点类型，详细情况[移步至此](http://www.cnblogs.com/xiaohuochai/p/5785189.html)

<div>
<pre>&lt;div id="box"&gt;test&lt;/div&gt;
&lt;script&gt;
var oTxt = box.firstChild;
console.log(oTxt.nodeType);//3
console.log(oTxt.nodeValue);//test
console.log(oTxt.nodeName);//'#text'
console.log(oTxt.parentNode);//&lt;div&gt;
console.log(oTxt.childNodes);//[]
&lt;/script&gt;</pre>
</div>

&nbsp;

### 空白文本节点

&emsp;&emsp;关于文本节点，遇到最多的兼容问题是空白文本节点问题。IE8-浏览器不识别空白文本节点，而其他浏览器会识别空白文本节点

<div>
<pre>&lt;div id="box"&gt;
    &lt;div&gt;1&lt;/div&gt;
&lt;/div&gt;
&lt;script&gt;
//标准浏览器输出[text, div, text]，text表示空白文本节点
//IE8-浏览器输出[div]，并不包含空白文本节点
console.log(box.childNodes);    
&lt;/script&gt;</pre>
</div>

&nbsp;

### 属性

**data**

&emsp;&emsp;文本节点的data属性与nodeValue属性相同

<div>
<pre>&lt;div id="box"&gt;test&lt;/div&gt;
&lt;script&gt;
var oBox = document.getElementById('box');
var oTest = oBox.firstChild;
//test test true
console.log(oTest.nodeValue,oTest.data,oTest.data === oTest.nodeValue);
&lt;/script&gt;</pre>
</div>

**wholeText**

&emsp;&emsp;wholeText属性将当前Text节点与毗邻的Text节点，作为一个整体返回。大多数情况下，wholeText属性的返回值，与data属性和textContent属性相同。但是，某些特殊情况会有差异

&emsp;&emsp;注意：IE8-浏览器不支持

<div>
<pre>&lt;div id="test"&gt;123&lt;/div&gt;
&lt;script&gt;
console.log(test.firstChild.wholeText);//123
console.log(test.firstChild.data);//123
//以索引1为指定位置分割为两个文本节点
test.firstChild.splitText(1);
console.log(test.firstChild.wholeText);//123
console.log(test.firstChild.data);//1
&lt;/script&gt;</pre>
</div>

**length**

&emsp;&emsp;文本节点的length属性保存着节点字符的数目，而且nodeValue.length、data.length也保存着相同的值

<div>
<pre>&lt;div id="box"&gt;test&lt;/div&gt;
&lt;script&gt;
var oBox = document.getElementById('box');
var oTest = oBox.firstChild;
//4 4 4
console.log(oTest.length,oTest.nodeValue.length,oTest.data.length);
&lt;/script&gt;</pre>
</div>

&nbsp;

### 方法

**createTextNode()**

&emsp;&emsp;createTextNode()方法用于创建文本节点，这个方法接收一个参数&mdash;&mdash;要插入节点中的文本

<div>
<pre>&lt;div id="box"&gt;123&lt;/div&gt;
&lt;script&gt;
var oBox = document.getElementById('box');
var oText = document.createTextNode('&lt;strong&gt;hello&lt;/strong&gt; world!');
oBox.appendChild(oText);
//'123&amp;lt;strong&amp;gt;hello&amp;lt;/strong&amp;gt; world!'
console.log(oBox.innerHTML);
//此时，页面中有两个文本节点
console.log(oBox.childNodes.length);
&lt;/script&gt;</pre>
</div>

**normalize()**

&emsp;&emsp;normalize()方法的作用是合并相邻的文本节点，该方法在文本节点的父节点&mdash;&mdash;元素节点上调用

&emsp;&emsp;注意：IE9+浏览器无法正常使用该方法

<div>
<pre>&lt;div id="box"&gt;0&lt;/div&gt;
&lt;script&gt;
var oText1 = document.createTextNode('1');
var oText2 = document.createTextNode('2');
box.appendChild(oText1);
box.appendChild(oText2);
console.log(box.childNodes);//[text, text, text]
console.log(box.childNodes.length);//3
box.normalize();
//IE9+浏览器返回[text,text]，而其他浏览器返回[text]
console.log(box.childNodes);
//IE9+浏览器返回'01'，而其他浏览器返回'012'
console.log(box.childNodes[0]);
//IE9+浏览器返回2，使用该方法时只能将所有的文本节点减1；其他浏览器正常，返回2
console.log(box.childNodes.length);//1
&lt;/script&gt;</pre>
</div>

**splitText()**

&emsp;&emsp;与normalize()方法作用相反，splitText()方法将一个文本节点分成两个文本节点，即按照指定的位置分割nodeValue值。原来的文本节点将包含从开始到指定位置之前的内容。这个方法会返回一个新文本节点，包含剩下的文本。splitText()方法返回的节点与原节点的parentNode相同&nbsp;

<div>
<pre>&lt;div id="box"&gt;123&lt;/div&gt;
&lt;script&gt;
var oBox = document.getElementById('box');
var newNode = oBox.firstChild.splitText(1);
console.log(newNode,newNode === oBox.lastChild);//'23' true
console.log(oBox.firstChild);//'1'
&lt;/script&gt;</pre>
</div>

**appendData()**

&emsp;&emsp;appendData(text)方法将text添加到节点的末尾，该方法无返回值

<div>
<pre>&lt;div id="box"&gt;123&lt;/div&gt;
&lt;script&gt;
var oBox = document.getElementById('box');
var oText = oBox.firstChild;
console.log(oText.appendData('4'));//undefined
console.log(oText.data);//'1234'
console.log(oBox.childNodes.length);//1
&lt;/script&gt;</pre>
</div>

**deleteData()**

&emsp;&emsp;deleteData(offset,count)方法从offset指定的位置开始删除count个字符，无返回值

<div>
<pre>&lt;div id="box"&gt;123&lt;/div&gt;
&lt;script&gt;
var oBox = document.getElementById('box');
var oText = oBox.firstChild;
console.log(oText.deleteData(0,2));//undefined
console.log(oText.data);//'3'
console.log(oBox.childNodes.length);//1
&lt;/script&gt;</pre>
</div>

**insertData()**

&emsp;&emsp;insertData(offset,text)方法在offset指定的位置插入text，无返回值

<div>
<pre>&lt;div id="box"&gt;123&lt;/div&gt;
&lt;script&gt;
var oBox = document.getElementById('box');
var oText = oBox.firstChild;
console.log(oText.insertData(1,'test'));//undefined
console.log(oText.data);//'1test23'
console.log(oBox.childNodes.length);//1
&lt;/script&gt;</pre>
</div>

**replaceData()**

&emsp;&emsp;replaceData(offset,count,text)方法用text替换从offset指定位置开始到offset+count为止的文本，无返回值

<div>
<pre>&lt;div id="box"&gt;123&lt;/div&gt;
&lt;script&gt;
var oBox = document.getElementById('box');
var oText = oBox.firstChild;
console.log(oText.replaceData(1,1,"test"));//undefined
console.log(oText.data);//'1test3'
console.log(oBox.childNodes.length);//1
&lt;/script&gt;</pre>
</div>

**substringData()**

&emsp;&emsp;substringData(offset,count)方法提取从offset指定的位置开始到offset+count为止处的字符串，并返回该字符串。原来的文本节点无变化

<div>
<pre>&lt;div class="box" id="box"&gt;123&lt;/div&gt;
&lt;script&gt;
var oBox = document.getElementById('box');
var oText = oBox.firstChild;
console.log(oText.substringData(1,1));//'2'
console.log(oText);//'123'
&lt;/script&gt;</pre>
</div>

&nbsp;

### 性能

&emsp;&emsp;通过上面的方法介绍，我们会发现，文本节点的操作与[字符串的操作方法](http://www.cnblogs.com/xiaohuochai/p/5612962.html)相当类似。一般地，我们获取文本都用innerHTML，然后再去字符串的操作方法去操作。下面对两者的性能进行对比分析

&emsp;&emsp;【1】首先，对replaceData()和replace()这两个方法进行比较。replace()方法又分为两个方法，一个是在循环中直接对innerHTML进行赋值；另一个是在循环中对变量进行赋值，最后再赋值给innerHTML

<div>
<pre>&lt;div id="box"&gt;123&lt;/div&gt;
&lt;script&gt;
var oBox = document.getElementById('box');
var oText = oBox.firstChild;    
var str = oBox.innerHTML;
function stringTest1(){
    for(var i = 0; i &lt; 1000000; i++){
        oBox.innerHTML = str.replace(1,Math.floor(Math.random() * 9 + 1));
    }   
}
var start1 = Date.now();
stringTest1();
var stop1 = Date.now();
result1 = stop1 - start1;
console.log('str1',result1)//2351
/*********************************/
function stringTest2(){
    for(var i = 0; i &lt; 1000000; i++){
        str.innerHTML = str.replace(1,Math.floor(Math.random() * 9 + 1));
    }   
}
var start2 = Date.now();
stringTest2();
oBox.innerHTML = str;
var stop2 = Date.now();
result2 = stop2 - start2;
console.log('str2',result2)//408
/*********************************/
function dataTest1(){
    for(var i = 0; i &lt; 1000000; i++){
        oText.replaceData(1,1,Math.floor(Math.random() * 9 + 1))    
    }  
}
var start3 = Date.now();
dataTest1();
var stop3 = Date.now();
result3 = stop3 - start3;
console.log('data',result3)//327
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;从结果中可以看出，在100万次的循环中，直接操作innerHTML开销较大，操作文本节点的的开销最小

&emsp;&emsp;【2】对substring()和substringData()方法进行比较，这两种方法都用于提取子串

<div>
<pre>&lt;div id="box"&gt;123&lt;/div&gt;
&lt;script&gt;
var oBox = document.getElementById('box');
var oText = oBox.firstChild;    
var str = oBox.innerHTML;
function stringTest(){
    for(var i = 0; i &lt; 10000000; i++){
       str.substring(Math.floor(Math.random() * 2),2);
    }   
}
var start = Date.now();
stringTest();
var stop = Date.now();
result = stop - start;
console.log('str',result)//364
/*********************************/
function dataTest(){
    for(var i = 0; i &lt; 10000000; i++){
       oText.substringData(Math.floor(Math.random() * 2),1);
    }   
}
var start = Date.now();
dataTest();
var stop = Date.now();
result = stop - start;
console.log('str',result)//1195
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;从结果中可以看出，在1000万次的循环中，使用substringData()方法比substring()方法的开销较大

&nbsp;

## 最后

&emsp;&emsp;元素的文本可以看成字符串，也可以看成节点

&emsp;&emsp;除了字符串操作方法，也可以使用[正则](http://www.cnblogs.com/xiaohuochai/p/5612230.html)或者文本节点方法

&emsp;&emsp;思路广一点，解决问题时才更自如一点

&emsp;&emsp;以上

