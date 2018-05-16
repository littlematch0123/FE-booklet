# 深入理解客户区尺寸client

&emsp;&emsp;关于元素尺寸，一般地，有偏移大小offset、客户区大小client和滚动大小scroll。前文已经介绍过[偏移属性](http://www.cnblogs.com/xiaohuochai/p/5828369.html)，后文将介绍[scroll滚动大小](http://www.cnblogs.com/xiaohuochai/p/5831640.html)，本文主要介绍客户区大小client

![client](https://pic.xiaohuochai.site/blog/JS_DOM_size_client.jpg)

&nbsp;

### 客户区大小

&emsp;&emsp;客户区大小client指的是元素内容及其内边距所占据的空间大小

**clientHeight**

&emsp;&emsp;clientHeight属性返回元素节点的客户区高度

<div>
<pre>clientHeight = padding-top + height + padding-bottom</pre>
</div>

**clientWidth**

&emsp;&emsp;clientWidth属性返回元素节点的客户区宽度

<div>
<pre>clientWidth = padding-left + width + padding-right</pre>
</div>
<div>
<pre>&lt;div id="test" style="width: 100px;height: 100px;padding: 10px;margin: 10px;border: 1px solid black;"&gt;&lt;/div&gt;
&lt;script&gt;
//120(10+100+10)
console.log(test.clientHeight);
console.log(test.clientWidth);
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;注意：滚动条宽度不计算在内

<div>
<pre>&lt;div id="test" style="width: 100px;height: 100px;padding: 10px;margin: 10px;border: 1px solid black;overflow:scroll"&gt;&lt;/div&gt;
&lt;script&gt;
//103(120-17)，滚动条宽度为17px
console.log(test.clientHeight);
console.log(test.clientWidth);
&lt;/script&gt;</pre>
</div>
<div>
<pre>&lt;div id="test" style="width:100px;margin: 10px;border: 1px solid black;overflow:scroll;font-size:20px;line-height:1;height:100px"&gt;
    内容&lt;br&gt;内容&lt;br&gt;内容&lt;br&gt;内容&lt;br&gt;内容&lt;br&gt;内容&lt;br&gt;
&lt;/div&gt;
&lt;script&gt;
//83(100-17)
console.log(test.clientHeight);
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;当height和纵向padding的和为0(以及小于17px的情况)时，如果仍然存在滚动条，各浏览器表现不一样

<div>
<pre>&lt;div id="test" style="width: 100px;height:0;margin: 10px;border: 1px solid black;overflow:scroll"&gt;&lt;/div&gt;
&lt;script&gt;
//chrome/safari:-17(0-17)
//firefox/IE:0
console.log(test.clientHeight);
&lt;/script&gt;</pre>
</div>
<div>
<pre>&lt;div id="test" style="width: 100px;height:10px;margin: 10px;border: 1px solid black;overflow:scroll"&gt;&lt;/div&gt;
&lt;script&gt;
//chrome/safari:-7(10-17)
//firefox/IE:0
console.log(test.clientHeight);
&lt;/script&gt;</pre>
</div>

**bug**

&emsp;&emsp;如果设置overflow:scroll，使得滚动条始终存在，当不设置高度height值时，各个浏览器表现不一样。firefox存在一个最小高度为34px的垂直滚动条，IE7-浏览器存在一个最小高度为19px的垂直滚动条，而其他浏览器的垂直滚动条无最小高度　

&emsp;&emsp;所以，当clientHeight的值小于34px时，firefox会返回34；当clientHeight的值小于19px时，IE7-会返回19

<div>
<pre>&lt;div id="test" style="width: 100px;margin: 10px;border: 1px solid black;overflow:scroll"&gt;&lt;/div&gt;
&lt;script&gt;
//chrome/IE8+/safari:0(因为height和padding都是0)
//firefox:34(设置overflow:scroll之后，默认存在一个高34px的垂直滚动条)
//IE7-:19(默认存在一个高19px的垂直滚动条)
console.log(test.clientHeight);
&lt;/script&gt;</pre>
</div>
<div>
<pre>&lt;div id="test" style="width: 100px;margin: 10px;border: 1px solid black;font-size:20px;line-height:1;overflow:scroll"&gt;内容&lt;/div&gt;
&lt;script&gt;
//chrome/IE8+/safari:20(20*1)
//firefox:34(20&lt;34)
//IE7-:20(20&gt;19)
console.log(test.clientHeight);
&lt;/script&gt;</pre>
</div>
<div>
<pre>&lt;div id="test" style="width: 100px;padding-top:20px;margin: 10px;border: 1px solid black;font-size:20px;line-height:1;overflow:scroll"&gt;内容&lt;/div&gt;
&lt;script&gt;
//chrome/IE8+/safari:40(20*1+20)
//firefox:40(40&gt;34)
//IE7-:40(40&gt;19)
console.log(test.clientHeight);
&lt;/script&gt;</pre>
</div>

**clientLeft**

&emsp;&emsp;clientLeft属性返回左边框的宽度

**clientTop**

&emsp;&emsp;clientTop属性返回上边框的宽度

<div>
<pre>&lt;div id="test" style="width: 100px;height: 100px;padding: 10px;margin: 10px;border: 1px solid black;"&gt;&lt;/div&gt;
&lt;script&gt;
//1 1
console.log(test.clientLeft);
console.log(test.clientTop);
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;注意：如果display为inline时，clientLeft属性和clientTop属性都返回0

<div>
<pre>&lt;div id="test" style="display:inline;width: 100px;height: 100px;padding: 10px;margin: 10px;border: 1px solid black;"&gt;&lt;/div&gt;
&lt;script&gt;
//0 0
console.log(test.clientLeft);
console.log(test.clientTop);
&lt;/script&gt;</pre>
</div>

&nbsp;

### 页面大小

&emsp;&emsp;常用document.documentElement的client属性来表示页面大小(不包含滚动条宽度)

&emsp;&emsp;注意：在IE7-浏览器中，&lt;html&gt;元素默认存在垂直滚动条

<div>
<pre>&lt;body style="overflow:scroll"&gt;
&lt;script&gt;
//1903(1920-17)
console.log(document.documentElement.clientWidth);
//930(947-17)
console.log(document.documentElement.clientHeight);
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;另一对常用的表示页面大小的属性是window.innerHeight和innerWidth属性(包含滚动条宽度)

&emsp;&emsp;innerHeight和innerWidth表示的是浏览器窗口大小减去菜单栏、地址栏等剩余的页面尺寸，由于滚动条是属于页面的，所以包含滚动条

&emsp;&emsp;注意：IE8-浏览器不支持innerHeight和innerWidth属性

<div>
<pre>&lt;body style="overflow:scroll"&gt;
&lt;script&gt;
//1920
console.log(window.innerWidth);
//947
console.log(window.innerHeight);
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;如果没有滚动条，这两类属性在电脑端表示同样的值，但是却表示不同的含义。在移动端，innerWidth和innerHeight表示的是视觉视口，即用户正在看到的网站的区域；而document.documentElement.clientWidth和clientHeight表示的是布局视口，指CSS布局的尺寸。详细情况[移步至此](http://www.cnblogs.com/xiaohuochai/p/5496995.html)

&emsp;&emsp;注意：页面的客户区大小和页面的实际大小是不同的，页面的实际大小将由后文的[scroll滚动大小](http://www.cnblogs.com/xiaohuochai/p/5831640.html)来表示

&nbsp;

### 注意事项

&emsp;&emsp;【1】所有客户区client属性都是只读的

<div>
<pre>&lt;div id="test" style="width: 100px;height: 100px;padding: 10px;margin: 10px;border: 1px solid black;"&gt;&lt;/div&gt;
&lt;script&gt;
console.log(test.clientHeight);
//IE8-浏览器会报错，其他浏览器则静默失败
test.clientHeight = 10;
console.log(test.clientHeight);
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;【2】如果给元素设置了display:none，则客户区client属性都为0

<div>
<pre>&lt;div id="test" style="width: 100px;height: 100px;padding: 10px;margin: 10px;border: 1px solid black;display:none;"&gt;&lt;/div&gt;
&lt;script&gt;
console.log(test.clientHeight);//0
console.log(test.clientTop);//0
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;【3】每次访问客户区client属性都需要重新计算，重复访问需要耗费大量的性能，所以要尽量避免重复访问这些属性。如果需要重复访问，则把它们的值保存在变量中，以提高性能

<div>
<pre>&lt;div id="test" style="width: 100px;height: 100px;padding: 10px;margin: 10px;border: 1px solid black;"&gt;&lt;/div&gt;      
&lt;script&gt;
console.time("time");
for(var i = 0; i &lt; 100000; i++){
    var a = test.clientHeight;
}
console.timeEnd('time');//66.798ms
&lt;/script&gt;</pre>
</div>
<div>
<pre>&lt;div id="test" style="width: 100px;height: 100px;padding: 10px;margin: 10px;border: 1px solid black;"&gt;&lt;/div&gt;         
&lt;script&gt;
console.time("time");
var a = test.clientHeight;
for(var i = 0; i &lt; 100000; i++){
    var b = a;
}
console.timeEnd('time');//1.705ms
&lt;/script&gt;</pre>
</div>
