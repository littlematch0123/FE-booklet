# 深入理解滚动scroll

&emsp;&emsp;前面两篇博文分别介绍过[偏移大小](http://www.cnblogs.com/xiaohuochai/p/5828369.html)、[客户区大小](http://www.cnblogs.com/xiaohuochai/p/5830053.html)。本文介绍元素尺寸中内容最多的一部分&mdash;&mdash;滚动scroll

&nbsp;

### 滚动宽高

**scrollHeight**

&emsp;&emsp;scrollHeight表示元素的总高度，包括由于溢出而无法展示在网页的不可见部分

**scrollWidth**

&emsp;&emsp;scrollWidth表示元素的总宽度，包括由于溢出而无法展示在网页的不可见部分

&emsp;&emsp;注意：IE7-浏览器返回值是不准确的

&emsp;&emsp;【1】没有滚动条时，scrollHeight与clientHeight属性结果相等，scrollWidth与clientWidth属性结果相等

<div>
<pre>&lt;div id="test" style="width: 100px;height: 100px;padding: 10px;margin: 10px;border: 1px solid black;"&gt;&lt;/div&gt;
&lt;script&gt;
//120 120
console.log(test.scrollHeight,test.scrollWidth);
//120 120
console.log(test.clientHeight,test.clientWidth);
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;【2】存在滚动条时，但元素设置宽高大于等于元素内容宽高时，scroll和client属性的结果相等

<div>
<pre>&lt;div id="test" style="width: 100px;height: 100px;padding: 10px;margin: 10px;border: 1px solid black;overflow:scroll;font-size:20px;line-height:1;"&gt;
    内容&lt;br&gt;内容&lt;br&gt;
&lt;/div&gt;
&lt;script&gt;
//103(120-17) 103(120-17)
console.log(test.scrollHeight,test.scrollWidth);
//103(120-17) 103(120-17)
console.log(test.clientHeight,test.clientWidth);
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;【3】存在滚动条，但元素设置宽高小于元素内容宽高，即存在内容溢出的情况时，scroll属性大于client属性

&emsp;&emsp;注意：scrollHeight属性存在兼容性问题，chrome和safari浏览器中，scrollHeight包含padding-bottom；而IE和firefox不包含padding-bottom

<div>
<pre>&lt;div id="test" style="width: 100px;height: 100px;padding: 10px;margin: 10px;border: 1px solid black;overflow:scroll;font-size:20px;line-height:200px;"&gt;
    内容&lt;/div&gt;
&lt;script&gt;
//chrome/safari:220(200+10+10)
//firefox/IE:210(200+10)
console.log(test.scrollHeight);
//103(120-17)
console.log(test.clientHeight);
&lt;/script&gt;</pre>
</div>

&nbsp;

### 页面尺寸

&emsp;&emsp;document.documentElement.clientHeight表示页面的可视区域的尺寸，而document.documentElement.scrollHeight表示html元素内容的实际尺寸。但是由于各个浏览器表现不一样，分为以下几种情况

&emsp;&emsp;【1】html元素没有滚动条时，IE和firefox的client和scroll属性始终相同，且返回可视区的尺寸大小；而safari和chrome表现正常，clientHeight返回可视区域大小，而scrollHeight返回元素内容大小

<div>
<pre>//firefox:  755 755
//chrome:   947 8(body元素的margin)
//safari:   744 8(body元素的margin)
//IE:       768 768
console.log(document.documentElement.clientHeight,document.documentElement.scrollHeight)</pre>
</div>

&emsp;&emsp;【2】html元素存在滚动条时，各个浏览器都表现正常。clientHeight返回可视区域大小，而scrollHeight返回元素内容大小

<div>
<pre>&lt;body style="height:1000px"&gt;
&lt;script&gt;
//firefox:  755 1016(1000+8*2)
//chrome:   947 1016(1000+8*2)
//safari:   744 1016(1000+8*2)
//IE:       768 1016(1000+8*2)
console.log(document.documentElement.clientHeight,document.documentElement.scrollHeight)
&lt;/script&gt;</pre>
</div>

**兼容**

&emsp;&emsp;因此要取得文档实际高度时，要取得&lt;html&gt;元素的scrollHeight和clientHeight的最大值

<div>
<pre>var docHeight = Math.max(document.documentElement.scrollHeight,document.documentElement.clientHeight);
var docWidth  = Math.max(document.documentElement.scrollWidth,document.documentElement.clientWidth);</pre>
</div>

&nbsp;

### 滚动长度

**scrollTop**

&emsp;&emsp;scrollTop属性表示被隐藏在内容区域上方的像素数。元素未滚动时，scrollTop的值为0，如果元素被垂直滚动了，scrollTop的值大于0，且表示元素上方不可见内容的像素宽度

**scrollLeft**

&emsp;&emsp;scrollLeft属性表示被隐藏在内容区域左侧的像素数。元素未滚动时，scrollLeft的值为0，如果元素被水平滚动了，scrollLeft的值大于0，且表示元素左侧不可见内容的像素宽度

&emsp;&emsp;当滚动条滚动到内容底部时，符合以下等式

<div>
<pre>scrollHeight == scrollTop  + clientHeight</pre>
</div>
<div>
<pre>&lt;div id="test" style="width: 100px;height: 100px;padding: 10px;margin: 10px;border: 1px solid black;overflow:scroll;font-size:20px;line-height:200px;"&gt;
    内容&lt;/div&gt;
&lt;button id='btn1'&gt;点击&lt;/button&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;script&gt;
btn1.onclick = function(){
    result.innerHTML = 'scrollTop:' + test.scrollTop+';clientHeight:' + test.clientHeight + ';scrollHeight:' + test.scrollHeight
}
&lt;/script&gt;</pre>
</div>

<iframe style="line-height: 1.5; width: 100%; height: 200px;" src="https://demo.xiaohuochai.site/js/scroll/s1.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;与scrollHeight和scrollWidth属性不同的是，scrollLeft和scrollTop是可写的

&emsp;&emsp;注意：为scrollLeft和scrollTop赋值为负值时，并不会报错，而是静默失败

<div>
<pre>&lt;div id="test" style="width: 100px;height: 100px;padding: 10px;margin: 10px;border: 1px solid black;overflow:scroll;font-size:20px;line-height:200px;"&gt;
    内容&lt;/div&gt;
&lt;button id='btn1'&gt;向下滚动&lt;/button&gt;
&lt;button id='btn2'&gt;向上滚动&lt;/button&gt;
&lt;script&gt;
btn1.onclick = function(){test.scrollTop += 10;}
btn2.onclick = function(){test.scrollTop -= 10;}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/js/scroll/s2.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 页面滚动

&emsp;&emsp;理论上，通过document.documentElement.scrollTop和scrollLeft可以反映和控制页面的滚动；但是chrome和safari浏览器是通过document.body.scrollTop和scrollLeft来控制的

<div>
<pre>&lt;body style="height:1000px"&gt;
&lt;button id='btn1' style="position:fixed;top:0;"&gt;点击&lt;/button&gt;
&lt;div id="result" style="position:fixed;top:30px;"&gt;&lt;/div&gt;
&lt;script&gt;
btn1.onclick = function(){
    result.innerHTML = 'html的scrollTop:' + document.documentElement.scrollTop +';body的scrollTop:' + document.body.scrollTop;
}
&lt;/script&gt;    
&lt;/body&gt;</pre>
</div>

<iframe style="line-height: 1.5; width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/scroll/s3.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;所以，页面的滚动高度兼容写法是

<div>
<pre>var docScrollTop = document.documentElement.scrollTop || document.body.scrollTop</pre>
</div>

**回到顶部**

&emsp;&emsp;可以利用scrollTop来实现回到顶部的功能

<div>
<pre>function scrollTop(){
    if((document.body.scrollTop || document.documentElement.scrollTop) != 0){
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
}</pre>
</div>
<div>
<pre>&lt;body style="height:1000px"&gt;
&lt;button id='btn' style="position:fixed"&gt;回到顶部&lt;/button&gt;
&lt;script&gt;
function scrollTop(){
    if((document.body.scrollTop || document.documentElement.scrollTop) != 0){
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
}
btn.onclick = scrollTop;
&lt;/script&gt;
&lt;/body&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/scroll/s4.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;还有两个window的只读属性可以获取整个页面滚动的像素值，它们是pageXOffset和pageYOffset

**pageXOffset**

&emsp;&emsp;pageXOffset表示水平方向上页面滚动的像素值

**pageYOffset**

&emsp;&emsp;pageYOffset表示垂直方向上页面滚动的像素值

&emsp;&emsp;注意：IE8-浏览器不支持

<div>
<pre>&lt;body style="height:1000px"&gt;
&lt;button id='btn1' style="position:fixed;top:0;"&gt;点击&lt;/button&gt;
&lt;div id="result" style="position:fixed;top:30px;"&gt;&lt;/div&gt;
&lt;script&gt;
btn1.onclick = function(){
    result.innerHTML = 'pageYOffset:' + window.pageYOffset;
}
&lt;/script&gt;    
&lt;/body&gt;</pre>
</div>

<iframe style="line-height: 1.5; width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/scroll/s5.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 滚动方法

**scrollTo(x,y)**

&emsp;&emsp;scrollTo(x,y)方法滚动当前window中显示的文档，让文档中由坐标x和y指定的点位于显示区域的左上角

<div>
<pre>&lt;body style="height:1000px"&gt;
&lt;button id='btn' style="position:fixed"&gt;滚动&lt;/button&gt;
&lt;script&gt;
btn.onclick = function(){scrollTo(0,0);}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/scroll/s6.html" frameborder="0" width="320" height="240"></iframe>

**scrollBy(x,y)**

&emsp;&emsp;scrollBy(x,y)方法滚动当前window中显示的文档，x和y指定滚动的相对量

<div>
<pre>&lt;body style="height:1000px"&gt;
&lt;button id='btn1' style="position:fixed"&gt;向下滚动&lt;/button&gt;
&lt;button id='btn2' style="position:fixed;top:40px"&gt;向上滚动&lt;/button&gt;
&lt;script&gt;
btn1.onclick = function(){scrollBy(0,100);}
btn2.onclick = function(){scrollBy(0,-100);}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/scroll/s7.html" frameborder="0" width="320" height="240"></iframe>

【小应用】

&emsp;&emsp;利用scrollBy()加setInterval[计时器](http://www.cnblogs.com/xiaohuochai/p/5773183.html)实现简单的快速滚动功能

<div>
<pre>&lt;body style="height:1000px"&gt;
&lt;button id='btn1' style="position:fixed"&gt;开始滚动&lt;/button&gt;
&lt;button id='btn2' style="position:fixed;top:40px"&gt;停止滚动&lt;/button&gt;
&lt;script&gt;
var timer = 0;
btn1.onclick = function(){
    timer = setInterval(function(){
        scrollBy(0,10);
    },100)}
btn2.onclick = function(){
    clearInterval(timer);
    timer = 0;
}
&lt;/script&gt;    </pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/scroll/s8.html" frameborder="0" width="320" height="240"></iframe>

**scrollIntoView()**

&emsp;&emsp;Element.scrollIntoView方法滚动当前元素，进入浏览器的可见区域

&emsp;&emsp;该方法可以接受一个布尔值作为参数。如果为true，表示元素的顶部与当前区域的可见部分的顶部对齐（前提是当前区域可滚动）；如果为false，表示元素的底部与当前区域的可见部分的尾部对齐（前提是当前区域可滚动）。如果没有提供该参数，默认为true

<div>
<pre>&lt;body style="height:1000px"&gt;
&lt;div id="test" style="height:100px;width:100px;position:absolute;left:0;top:500px;background-color:green"&gt;&lt;/div&gt;
&lt;button id='btn1' style="position:fixed"&gt;滚动到页面开头&lt;/button&gt;
&lt;button id='btn2' style="position:fixed;top:40px"&gt;滚动到页面结尾&lt;/button&gt;
&lt;script&gt;
btn1.onclick = function(){
    test.scrollIntoView();
};
btn2.onclick = function(){
    test.scrollIntoView(false);
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/scroll/s9.html" frameborder="0" width="320" height="240"></iframe>

**scrollIntoViewIfNeeded()**

&emsp;&emsp;scrollIntoViewIfNeeded(true)方法只在当前元素在视口中不可见的情况下，才滚动浏览器窗口或容器元素，最终让它可见。如果当前元素在视口中可见，这个方法什么也不做&nbsp;

&emsp;&emsp;如果将可选的alignCenter参数设置为true，则表示尽量将元素显示在视口中部(垂直方向)

&emsp;&emsp;注意：该方法只有chrome和safari支持

<div>
<pre>&lt;body style="height:1000px"&gt;
&lt;div id="test" style="height:100px;width:100px;position:absolute;left:0;top:500px;background-color:green"&gt;&lt;/div&gt;
&lt;button id='btn' style="position:fixed"&gt;滚动到页面中间&lt;/button&gt;
&lt;script&gt;
btn.onclick = function(){
    test.scrollIntoViewIfNeeded(true)
};
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 150px;" src="https://demo.xiaohuochai.site/js/scroll/s10.html" frameborder="0" width="320" height="240"></iframe>

**scrollByLines(lineCount)**

&emsp;&emsp;scrollByLines(lineCount)方法将元素的内容滚动指定的行髙，lineCount值可以是正值， 也可以是负值

&emsp;&emsp;注意：该方法只有safari支持

<div>
<pre>&lt;div id="test" style="width: 100px;height: 100px;padding: 10px;margin: 10px;border: 1px solid black;overflow:scroll;font-size:20px;line-height:200px;"&gt;
    内容&lt;/div&gt;
&lt;button id='btn1'&gt;向下滚动&lt;/button&gt;
&lt;button id='btn2'&gt;向上滚动&lt;/button&gt;
&lt;script&gt;
btn1.onclick = function(){test.scrollByLines(1);}
btn2.onclick = function(){test.scrollByLines(-1);}
&lt;/script&gt;</pre>
</div>

**scrollByPages(pageCount)**

&emsp;&emsp;scrollByPages(pageCount)方法将元素的内容滚动指定的页面高度，具体高度由元素的高度决定

&emsp;&emsp;注意：该方法只有safari支持

<div>
<pre>&lt;div id="test" style="width: 100px;height: 100px;padding: 10px;margin: 10px;border: 1px solid black;overflow:scroll;font-size:20px;line-height:200px;"&gt;
    内容&lt;/div&gt;
&lt;button id='btn1'&gt;向下滚动&lt;/button&gt;
&lt;button id='btn2'&gt;向上滚动&lt;/button&gt;
&lt;script&gt;
btn1.onclick = function(){test.scrollByPages(1);}
btn2.onclick = function(){test.scrollByPages(-1);}
&lt;/script&gt;</pre>
</div>

&nbsp;

### 滚动事件

&emsp;&emsp;scroll事件是在window对象上发生的，它表示的是页面中相应元素的变化。当然，scroll事件也可以用在有滚动条的元素上

<div>
<pre>&lt;body style="height:1000px"&gt;
&lt;div id="result" style="position:fixed;top:10px;"&gt;&lt;/div&gt;
&lt;script&gt;
window.onscroll = function(){
    result.innerHTML = '页面的scrollTop:' + (document.documentElement.scrollTop||document.body.scrollTop);
}
&lt;/script&gt;    
&lt;/body&gt;</pre>
</div>

<iframe style="line-height: 1.5; width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/scroll/s11.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

## 最后

&emsp;&emsp;本文详细介绍了滚动scroll的知识，基本上囊括了关于滚动现有的所有属性和方法。本文中并未详细介绍滚动条，详细内容[移步至此](http://www.cnblogs.com/xiaohuochai/p/5294409.html)

&emsp;&emsp;下文将以实例的形式，对滚动的属性和方法进行应用，总结回到顶部的多种写法，并尝试优化

&emsp;&emsp;欢迎交流

