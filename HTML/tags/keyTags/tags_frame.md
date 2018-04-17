# 古老的框架

&emsp;&emsp;框架&lt;frame&gt;已经被废弃，而内嵌框架&lt;iframe&gt;依然在使用。通过使用框架，可以在同一个窗口显示不止一个页面。每份HTML文档称为一个框架，并且每个框架都独立于其他的框架

&nbsp;

### &lt;frameset&gt;

&emsp;&emsp;框架结构标签(也称为框架集)定义如何将窗口分割成框架，每个frameset定义了一系列行或列

&emsp;&emsp;注意：不能将&lt;body&gt;标签与&lt;frameset&gt;标签同时使用

【属性】

&emsp;&emsp;cols 定义框架集列的数目和尺寸

&emsp;&emsp;rows 定义框架集行的数目和尺寸

<div>
<pre>&lt;frameset rows="150,300,150"&gt;
&lt;frameset rows="25%,50%,25%"&gt;
&lt;frameset cols="100, *"&gt;
&lt;frameset rows="*, 100, *"&gt;
&lt;frameset cols="10%, 3*, *, *"&gt;</pre>
</div>

&nbsp;

### &lt;frame&gt;

&emsp;&emsp;框架标签定义了放置在每个框架中的HTML文档

【属性】

&emsp;&emsp;src 规定在框架中显示的文档的URL

&emsp;&emsp;name 规定框架的名称，用于在javascript中引用元素或作为链接的目标

&emsp;&emsp;noresize 指定用户无法调整框架大小

&emsp;&emsp;longdesc 指向带有框架内容长描述的页面

&emsp;&emsp;scroll

<div>
<pre>scroll="auto"//默认，需要时显示滚动条
scroll="yes"//始终显示滚动条
scroll="no"//从不显示滚动条</pre>
</div>

&emsp;&emsp;frameborder

<div>
<pre>frameborder="0"//无边框
frameborder="1"//(默认，有边框)    </pre>
</div>
<div>
<pre>&lt;frame src="frame_a.htm" frameborder="0" name="frame1" scrolling="yes"  noresize="noresize"  longdesc="w3school.txt" /&gt;</pre>
</div>
<div>
<pre>&lt;frameset cols="25%,75%"&gt;
   &lt;frame src="frame_a.htm"&gt;
   &lt;frame src="frame_b.htm"&gt;
&lt;/frameset&gt;</pre>
</div>
<div>
<pre>&lt;frameset rows="50%,50%"&gt;
    &lt;frame src="/example/html/frame_a.html"&gt;
    &lt;frameset cols="25%,75%"&gt;
        &lt;frame src="/example/html/frame_b.html"&gt;
        &lt;frame src="/example/html/frame_c.html"&gt;
    &lt;/frameset&gt;
&lt;/frameset&gt;</pre>
</div>

![frame1](https://pic.xiaohuochai.site/blog/HTML_tags_frame1.jpg)


![frame2](https://pic.xiaohuochai.site/blog/HTML_tags_frame2.jpg)


&nbsp;

### &lt;iframe&gt;

&emsp;&emsp;内联框架用于在网页中显示网页。iframe标签可以很方便地创建框架，但由于创建一个框架意味着要创建一个完整的页面环境，很耗费资源；因此能不用就尽量不用

【属性】

&emsp;&emsp;src 规定在内联框架中显示的文档的URL

&emsp;&emsp;name 规定内联框架的名称，用于在javascript中引用元素或作为链接的目标

&emsp;&emsp;height 规定iframe的高度

&emsp;&emsp;width 规定iframe的宽度

&emsp;&emsp;longdesc 指向带有内联框架内容长描述的页面(已废弃)

&emsp;&emsp;frameborder(已废弃)

<div>
<pre>frameborder="0"//无边框
frameborder="1"//(默认，有边框)    </pre>
</div>

&emsp;&emsp;scrolling(已废弃)

<div>
<pre>scrolling="auto"//默认，需要时显示滚动条
scrolling="yes"//始终显示滚动条
scrolling="no"//从不显示滚动条</pre>
</div>

&emsp;&emsp;seamless 规定iframe看上去像是包含文档的一部分，设置该属性后，iframe无边框或滚动条

&emsp;&emsp;sandbox 启用对&lt;iframe&gt;中内容的限制，可以用空格分隔多个属性值(IE9-不支持)

<div>
<pre>sandbox=""//应用所有的限制
sandbox="allow-same-origin"//允许iframe内容被视为与包含文档有相同的来源
sandbox="allow-top-navigation"//允许iframe内容从包含文档导航加载内容
sandbox="allow-forms"//允许表单提交
sandbox="allow-scripts"//允许脚本执行</pre>
</div>

&emsp;&emsp;srcdoc 规定在iframe中显示的页面的HTML内容(IE浏览器不支持)，若浏览器支持srcdoc属性，则将显示srcdoc属性的内容；否则将显示src属性中规定的文件

<div>
<pre>&lt;iframe srcdoc="&lt;p&gt;Hello world!&lt;/p&gt;" src="/demo/demo_iframe_srcdoc.html"&gt;
&lt;/iframe&gt;</pre>
</div>


![frame3](https://pic.xiaohuochai.site/blog/HTML_tags_frame3.jpg)


![frame4](https://pic.xiaohuochai.site/blog/HTML_tags_frame4.jpg)


&nbsp;


### target属性

&emsp;&emsp;要了解框架之间的关系，就必须了解target属性

&emsp;&emsp;target属性表示链接打开方式

&emsp;&emsp;&emsp;1、_self 当前窗口（默认）

&emsp;&emsp;&emsp;2、_blank 新窗口

&emsp;&emsp;&emsp;3、_parent 父框架集

&emsp;&emsp;&emsp;4、_top 整个窗口

&emsp;&emsp;&emsp;5、_framename 指定框架

<div>
<pre>//外层框架
&lt;frameset cols = "20%, *"&gt;
    &lt;frame src="left.html"&gt;
    &lt;frame src="right.html"&gt;
&lt;/frameset&gt;
//里层框架
&lt;frameset rows = "50%,*"&gt;
    &lt;frame src="top.html"&gt;
    &lt;frame src="bottom.html" name="bottom"&gt;        
&lt;/frameset&gt;
//锚点页
&lt;ul class="list"&gt;
    &lt;li class="in"&gt;&lt;a href="chap1.html" target="_self"&gt;chap1(_self)&lt;/a&gt;&lt;/li&gt;
    &lt;li class="in"&gt;&lt;a href="chap2.html" target="_blank"&gt;chap2(_blank)&lt;/a&gt;&lt;/li&gt;
    &lt;li class="in"&gt;&lt;a href="chap3.html" target="_parent"&gt;chap3(_parent)&lt;/a&gt;&lt;/li&gt;
    &lt;li class="in"&gt;&lt;a href="chap4.html" target="_top"&gt;chap4(_top)&lt;/a&gt;&lt;/li&gt;    
    &lt;li class="in"&gt;&lt;a href="chap5.html" target="bottom"&gt;chap5(framename)&lt;/a&gt;&lt;/li&gt;
&lt;/ul&gt;</pre>
</div>

![frame5](https://pic.xiaohuochai.site/blog/HTML_tags_a_frame.gif)


&nbsp;

### 框架脚本

&emsp;&emsp;如果页面中包含框架，则每个框架都拥有自己的window对象，并且保存在frames集合中。在frames集合中，可以通过数值索引(从0开始，从左至右，从上到下)或者框架名称来访问相应的window对象。每个window对象都有一个name属性，其中包含框架的名称

<div>
<pre>&lt;frameset rows = "40%,*"&gt;
    &lt;frame src="https://cli.im/" name="topFrame"&gt;
    &lt;frameset cols = "50%,50%"&gt;
        &lt;frame src="https://shimo.im/" name="leftFrame"&gt;
        &lt;frame src="https://www.w3cplus.com" name="rightFrame"&gt;
    &lt;/frameset&gt;
&lt;/frameset&gt;</pre>
</div>

<iframe src="https://demo.xiaohuochai.site/html/frame/f22.html" frameborder="0" width="100%" height="350"></iframe>

&emsp;&emsp;top对象始终指向最高(最外)层的框架，也就是浏览器窗口。使用它可以确保在一个框架中正确地访问另一个框架。因为对于在一个框架中编写的任何代码来说，其中的window对象指向的都是那个框架的特定实例，而非最髙层的框架。下图展示了在最髙层窗口中，通过代码来访问前面例子中每个框架的不同方式

![frame6](https://pic.xiaohuochai.site/blog/HTML_tags_frame6.png)

&emsp;&emsp;与top相对的另一个window对象是parent。顾名思义，parent(父)对象始终指向当前框架的直接上层框架。在某些情况下，parent有可能等于top。但在没有框架的情况下，parent一定等于top(此时它们都等于window)

<div>
<pre>&lt;frameset rows = "40%,*"&gt;
    &lt;frame src="top.html" name="topFrame"&gt;
    &lt;frameset cols = "50%,50%"&gt;
        &lt;frame src="left.html" name="leftFrame"&gt;
        &lt;frame src="right.html" name="rightFrame"&gt;
    &lt;/frameset&gt;
&lt;/frameset&gt;</pre>
</div>
<div>
<pre>&lt;!-- right.html--&gt;
&lt;frameset cols = "50%,50%"&gt;
    &lt;frame src="red.html" name="redFrame"&gt;
    &lt;frame src="blue.html" name="blueFrame"&gt;
&lt;/frameset&gt;
&lt;/head&gt;</pre>
</div>

&emsp;&emsp;浏览器在加载完第一个框架集以后，会继续将第二个框架集加载到rightFrame中。如果代码位于redFrame(或blueFrame)中，那么parent对象指向的就是rightFrame。可是，如果代码位于topFrame中，则parent指向的是top，因为topFrame的直接上层框架就是最外层框架

![frame7](https://pic.xiaohuochai.site/blog/HTML_tags_frame7.png)

&emsp;&emsp;注意：除非最高层窗口是通过window.open()打开的，否则其window对象的name属性不会包含任何值

&emsp;&emsp;与框架有关的最后一个对象是self，它始终指向window。实际上，self和window对象可以互换使用。引入self对象的目的只是为了与top和parent对象对应起来，因此它不格外包含其他值

&emsp;&emsp;所有这些对象都是window对象的属性，可以通过window.parent、window.top等形式来访问。同时，这也意味着可以将不同层次的window对象连缀起来，例如window.parent.parent.frames[0]

&emsp;&emsp;在使用框架的情况下，浏览器中会存在多个Global对象。在每个框架中定义的全局变量会自动成为框架中window对象的属性。由于每个window对象都包含原生类型的构造函数，因此每个框架都有一套自己的构造函数，这些构造函数一一对应，但并不相等。例如，top.Object并不等于top.frames[0].Object。这个问题会影响到对跨框架传递的对象使用instanceof操作符。最典型的影响就是[数组的类型检测](http://www.cnblogs.com/xiaohuochai/p/5680833.html)

&nbsp;

### iframe脚本

&emsp;&emsp;通过getElementById()等方法获得的是iframe的DOM节点，而并非iframe的window。使用contextWindow属性可以获得iframe节点的包含的window对象，或者使用contentDocument属性获得包含的document对象

&emsp;&emsp;注意：IE7-浏览器不支持contentDocument属性

&emsp;&emsp;如果使用frames[序号]或者frames[name]获得的就是iframe的Window对象

<div>
<pre>&lt;iframe id = "frameID" name="frameName" src="top.html"&gt;&lt;/iframe&gt;
&lt;script&gt;
var frameID = document.getElementById('frameID');
var frameWindow = frameID.contentWindow;
var frameDocument = frameID.contentDocument;
//&lt;iframe&gt; window document
console.log(frameID,frameWindow,frameDocument);

//window window
console.log(frames[0],frames.frameName);
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;iframe元素遵守同源政策，只有当父页面与框架页面来自同一个域名，两者之间才可以用脚本通信

&emsp;&emsp;iframe窗口内部，使用window.parent引用父窗口。如果当前页面没有父窗口，则window.parent属性返回自身。因此，可以通过window.parent是否等于window.self，判断当前窗口是否为iframe窗口

<div>
<pre>if (window.parent !== window.self) {
  // 当前窗口是子窗口
}</pre>
</div>

&emsp;&emsp;iframe嵌入窗口的window对象，有一个frameElement属性，返回它在父窗口中的DOM节点。对于那么非嵌入的窗口，该属性等于null

<div>
<pre>&lt;!-- 父网页--&gt;
&lt;iframe id = "frameID" name="frameName" src="top.html"&gt;&lt;/iframe&gt;
&lt;script&gt;
var num = 10;
&lt;/script&gt;</pre>
</div>
<div>
<pre>&lt;!-- 子网页 --&gt;
&lt;script&gt;
var num = 5;
console.log(window.parent.num,window.top.num,window.self.num);//10 10 5
console.log(window.frameElement);//&lt;iframe&gt;
&lt;/script&gt;    </pre>
</div>

&emsp;&emsp;window对象的frames属性返回一个类似数组的对象，成员是所有子窗口的window对象。可以使用这个属性，实现窗口之间的互相引用。比如，frames[0]返回第一个子窗口，frames[1].frames[2]返回第二个子窗口内部的第三个子窗口，parent.frames[1]返回父窗口的第二个子窗口

&emsp;&emsp;注意：window.frames每个成员的值，是框架内的窗口(即框架的window对象)，而不是iframe标签在父窗口的DOM节点。如果要获取每个框架内部的DOM树，需要使用window.frames[0].document的写法

&emsp;&emsp;另外，如果iframe元素设置了name或id属性，那么属性值会自动成为全局变量，并且可以通过window.frames属性引用，返回子窗口的window对象

