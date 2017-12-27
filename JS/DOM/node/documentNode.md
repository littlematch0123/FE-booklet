# 深入理解DOM节点类型第七篇——文档节点DOCUMENT

　　文档节点document，隶属于表示浏览器的window对象，它表示网页页面，又被称为根节点。本文将详细介绍文档节点document的内容

&nbsp;

### 特征

　　文档节点的三个node属性&mdash;&mdash;nodeType、nodeValue、nodeName分别是9、'#document'和null

　　由于它是根节点，所以其父节点parentNode指向null，ownerDocument也指向null

<div class="cnblogs_code">
<pre>console.log(document.nodeType);//9
console.log(document.nodeValue);//null
console.log(document.nodeName);//'#document'
console.log(document.parentNode);//null
console.log(document.ownerDocument);//null</pre>
</div>

&nbsp;

### 快捷访问

**子节点**

【1】&lt;html&gt;

　　document.documentElement属性始终指向HTML页面中的&lt;html&gt;元素　

<div class="cnblogs_code">
<pre>console.log(document.documentElement.nodeName);//'HTML'</pre>
</div>

【2】&lt;body&gt;

　　document.body属性指向&lt;body&gt;元素

<div class="cnblogs_code">
<pre>console.log(document.body.nodeName);//'BODY'</pre>
</div>

【3】&lt;!DOCTYPE&gt;

　　document.doctype属性指向&lt;!DOCTYPE&gt;标签

　　[注意]IE8-不识别，输出null，因为IE8-浏览器将其识别为[注释节点](http://www.cnblogs.com/xiaohuochai/p/5815801.html#anchor1)

<div class="cnblogs_code">
<pre>console.log(document.doctype.nodeName);//'html'</pre>
</div>

【4】&lt;head&gt;

　　document.head属性指向文档的&lt;head&gt;元素

　　[注意]IE8-浏览器下不支持

<div class="cnblogs_code">
<pre>console.log(document.head.nodeName);//'HEAD'</pre>
</div>

**文档信息**

【1】title

　　&lt;title&gt;元素显示在浏览器窗口的标题栏或标签页上，document.title包含着&lt;title&gt;元素中的文本，这个属性可读可写

<div class="cnblogs_code">
<pre>console.log(document.title);//Document
document.title="test";
console.log(document.title);//test</pre>
</div>

【2】URL、domain、referrer

　　URL：页面的完整地址

　　domain：domain与URL是相互关联的，包含页面的域名

　　referrer：表示链接到当前页面的上一个页面的URL，在没有来源页面时，可能为空

　　[注意]上面这些信息都来自请求的HTTP头部，只不过可以通过这三个属性在javascript中访问它而已

<div class="cnblogs_code">
<pre>console.log(document.URL);//http://www.cnblogs.com/xiaohuochai/
console.log(document.domain);//www.cnblogs.com
console.log(document.referrer);//http://home.cnblogs.com/followees/</pre>
</div>

　　在这3个属性中，只有domain是可以设置的。但由于安全方面的限制，也并非可以给domain设罝任何值。如果URL中包含一个子域名，例如home.cnblogs.com,那么就只能将domain设置为"cnblogs.com"。不能将这个属性设置为URL中不包含的域

<div class="cnblogs_code">
<pre>document.domain = 'cnblogs.com';//"cnblogs.com"
//Uncaught DOMException: Failed to set the 'domain' property on 'Document': 'qq.com' is not a suffix of 'cnblogs.com'
document.domain = 'qq.com';</pre>
</div>

【3】baseURI

　　document.baseURI返回&lt;base&gt;标签中的URL，如果没有设置&lt;base&gt;，则该值与document.URL相同

<div class="cnblogs_code">
<pre>console.log(document.baseURI);'//http://www.cnblogs.com/xiaohuochai/'

&lt;base href="http://www.baidu.com"&gt; 
&lt;script&gt;
console.log(document.baseURI);//'http://www.baidu.com/'
&lt;/script&gt;</pre>
</div>

【4】字符集charset

　　document.charset表示文档中实际使用的字符集

<div class="cnblogs_code">
<pre>console.log(document.charset);//'UTF-8'</pre>
</div>

【5】defaultView

　　document.defaultView保存着一个指针，指向拥有给定文档的窗口或框架。IE8-浏览器不支持defaultView属性，但IE中有一个等价的属性名叫parentWindow。所以要确定文档的归属窗口，其兼容写法为：　　

<div class="cnblogs_code">
<pre>var parentWindow = document.defaultView || document.parentWindow;//Window</pre>
</div>

【6】兼容模式compatMode

　　document.compatMode表示文档的模式，在标准模式下值为"CSS1Compat"，在兼容模式下值为"BackCompat"

<div class="cnblogs_code">
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8"&gt;
&lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;script&gt;
console.log(document.compatMode)//CSS1Compat
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;  </pre>
</div>
<div class="cnblogs_code">
<pre>&lt;html lang="en"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8"&gt;
&lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;script&gt;
console.log(document.compatMode)//BackCompat
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt; </pre>
</div>

【7】文档模式documentMode

　　document.documentMode属性表示当前的文档模式

　　[注意]该属性只有IE11-浏览器支持

<div class="cnblogs_code">
<pre>//IE11返回11，IE10返回10，IE9返回9，IE8返回8，IE7返回7，IE6返回6
console.log(document.documentMode);</pre>
</div>

【8】时间戳lastModified

　　document.lastModified属性返回当前文档最后修改的时间戳，格式为字符串

<div class="cnblogs_code">
<pre>console.log(document.lastModified); //09/02/2016 15:36:15</pre>
</div>

**节点集合**

【1】anchors

　　document.anchors包含文档中所有带name特性的&lt;a&gt;元素

<div class="cnblogs_code">
<pre>&lt;a href= "#" name="a1"&gt;a1&lt;/a&gt;
&lt;a href= "#" name="a2"&gt;a2&lt;/a&gt;
&lt;a href= "#" &gt;3&lt;/a&gt;
&lt;script&gt;
console.log(document.anchors.length)//2
&lt;/script&gt;</pre>
</div>

【2】links

　　document.links包含文档中所有带href特性的&lt;a&gt;元素

<div class="cnblogs_code">
<pre>&lt;a href="#"&gt;1&lt;/a&gt;
&lt;a href="#"&gt;2&lt;/a&gt;
&lt;a&gt;3&lt;/a&gt;
&lt;script&gt;
console.log(document.links.length)//2
&lt;/script&gt;</pre>
</div>

【3】forms

　　document.forms包含文档中所有的&lt;form&gt;元素，与document.getElementsByTagName("form")结果相同

<div class="cnblogs_code">
<pre>&lt;form action="#"&gt;1&lt;/form&gt;
&lt;form action="#"&gt;2&lt;/form&gt;
&lt;script&gt;
console.log(document.forms.length)//2
&lt;/script&gt;</pre>
</div>

【4】images

　　document.images包含文档中所有的&lt;img&gt;元素，与document.getElementsByTagName('img')结果相同

<div class="cnblogs_code">
<pre>&lt;img src="#" alt="#"&gt;
&lt;img src="#" alt="#"&gt;
&lt;script&gt;
console.log(document.images.length)//2
&lt;/script&gt;</pre>
</div>

【5】scripts

　　document.scripts属性返回当前文档的所有脚本(即script标签)

<div class="cnblogs_code">
<pre>&lt;script&gt;
console.log(document.scripts.length)//1
&lt;/script&gt;</pre>
</div>

　　以上五个属性返回的都是HTMLCollection对象实例

　　[注意]关于HTMLCollection等动态集合的详细信息[移步至此](http://www.cnblogs.com/xiaohuochai/p/5827389.html)

<div class="cnblogs_code">
<pre>console.log(document.links instanceof HTMLCollection); // true
console.log(document.images instanceof HTMLCollection); // true
console.log(document.forms instanceof HTMLCollection); // true
console.log(document.anchors instanceof HTMLCollection); // true
console.log(document.scripts instanceof HTMLCollection); // true</pre>
</div>

　　由于HTMLCollection实例可以用HTML元素的id或name属性引用，因此如果一个元素有id或name属性，就可以在上面这五个属性上引用

<div class="cnblogs_code">
<pre>&lt;form name="myForm"&gt;
&lt;script&gt;
console.log(document.myForm === document.forms.myForm); // true    
&lt;/script&gt;</pre>
</div>

&nbsp;

### 文档写入方法

　　将输出流写入到网页的能力有4个方法：write()、writeln()、open()、close()

**write()和writeln()**

　　write()和writeln()方法都接收一个字符串参数，即要写入到输出流中的文本

　　write()会原样写入，而writeln()则在字符串的末尾添加一个换行符(\n)，但换行符会被页面解析为空格

　　在页面被加载的过程中，可以使用这两个方法向页面中动态地加入内容

<div class="cnblogs_code">
<pre>&lt;button id="btn"&gt;替换内容&lt;/button&gt;
&lt;script&gt;
btn.onclick = function(){
    document.write('123');
    document.writeln('abc');
    document.write('456');
}    
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/dom/d1.html" frameborder="0" width="320" height="240"></iframe>

**open()和close()**

　　open()和close()方法分别用于打开和关闭网页的输出流

　　open()方法实际上等于清除当前文档

<div class="cnblogs_code">
<pre>&lt;button id="btn"&gt;清除内容&lt;/button&gt;
&lt;script&gt;
btn.onclick = function(){
    document.open();
}    
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/dom/d2.html" frameborder="0" width="320" height="240"></iframe>

　　close()方法用于关闭open方法所新建的文档。一旦关闭，write方法就无法写入内容了。如果再调用write方法，就等同于又调用open方法，新建一个文档，再写入内容。所以，实际上，close()只是和open()方法配套使用而已

<div class="cnblogs_code">
<pre>&lt;button id="btn"&gt;替换内容&lt;/button&gt;
&lt;script&gt;
//相当于'123'又把'1'覆盖了
btn.onclick = function(){
    document.open();
    document.write('1');
    document.close();
    document.write('123');
}    
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/dom/d3.html" frameborder="0" width="320" height="240"></iframe>

　　一般地，先使用open()方法用于新建一个文档，然后使用write()和writeln()方法写入文档，最后使用close()方法，停止写入

<div class="cnblogs_code">
<pre>&lt;button id="btn"&gt;替换内容&lt;/button&gt;
&lt;script&gt;
btn.onclick = function(){
    document.open();
    document.writeln('hello');
    document.write('world');
    document.close();    
}
&lt;/script&gt;    </pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/dom/d4.html" frameborder="0" width="320" height="240"></iframe>

　　[注意]如果是在页面加载期间使用write()和writeln()方法，则不需要用到这两个方法&nbsp;

<div class="cnblogs_code">
<pre>&lt;button id="btn"&gt;内容&lt;/button&gt;
&lt;script&gt;
document.writeln('hello');
document.write('world');
&lt;/script&gt;    </pre>
</div>

&nbsp;

## 最后

　　节点类型系列终于完结了

　　DOM共有[12种节点类型](http://www.cnblogs.com/xiaohuochai/p/5785189.html)。其中，常用的有Element[元素节点](http://www.cnblogs.com/xiaohuochai/p/5819638.html)、Attribute[特性节点](http://www.cnblogs.com/xiaohuochai/p/5820076.html)、Text[文本节点](http://www.cnblogs.com/xiaohuochai/p/5815193.html)、Comment[注释节点](http://www.cnblogs.com/xiaohuochai/p/5815801.html)、Document[文档节点](http://www.cnblogs.com/xiaohuochai/p/5821803.html)和DocumentFragment[文档片段节点](http://www.cnblogs.com/xiaohuochai/p/5816048.html)

　　欢迎交流

