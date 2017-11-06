# 伪类

　　伪类经常与伪元素混淆，[伪元素](http://www.cnblogs.com/xiaohuochai/p/5021121.html)的效果类似于通过添加一个实际的元素才能达到，而伪类的效果类似于通过添加一个实际的类来达到。实际上css3为了区分两者，已经明确规定了伪类用一个冒号来表示，而伪元素则用两个冒号来表示。本文将详细介绍伪类的详细知识

&nbsp;

### 锚点

　　关于锚点&lt;a&gt;，有常见的5个伪类，分别是:link,:hover,:active,:focus,:visited

<div class="cnblogs_code">
<pre>a:link{background-color:pink;}/*品红，未访问*/</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="{{book.demo}}/css/base/b32.html" frameborder="0" width="320" height="240"></iframe>

<div class="cnblogs_code">
<pre>a:hover{background-color:lightblue;}/*浅蓝，鼠标悬停*/</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="{{book.demo}}/css/base/b33.html" frameborder="0" width="320" height="240"></iframe>

<div class="cnblogs_code">
<pre>a:active{background-color:lightgreen;}/*浅绿，正被点击*/</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="{{book.demo}}/css/base/b34.html" frameborder="0" width="320" height="240"></iframe>

<div class="cnblogs_code">
<pre>a:focus{background-color:lightgrey;}/*浅灰，拥有焦点*/</pre>
</div>

<iframe style="line-height: 1.5; width: 100%; height: 40px;" src="{{book.demo}}/css/base/b35.html" frameborder="0" width="320" height="240"></iframe>

<div class="cnblogs_code">
<pre>a:visited{color:orange;}/*字体颜色为橙色，已被访问*/
/*[注意]visited伪类只能设置字体颜色、边框颜色、outline颜色的样式*/</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="{{book.demo}}/css/base/b36.html" frameborder="0" width="320" height="240"></iframe>

**伪类顺序**

　　对于伪类顺序，有一个口诀是love-hate，代表着伪类的顺序是link、visited、focus、hover、active。但是否伪类的顺序只能如此呢？为什么是这个顺序呢？

　　CSS层叠中有一条法则十分重要，就是后面覆盖前面，所以伪类的顺序是需要精心考虑的。

　　【1】link和visited必须在最前面，且没有先后顺序，否则link或visited的效果将被覆盖

　　[注意]link和visited称为静态伪类，只能应用于超链接

　　【2】hover、active、focus这三个伪类必须是focus、hover、active的顺序，因为在focus状态下，也需要触发hover和active，而要触发active一定要先触发hover，所以active要放在hover后面

　　[注意]hover、active、focus称为动态伪类，可应用于任何元素，但IE7-浏览器不支持:focus，:hover和:active在IE6-浏览器下只支持给&lt;a&gt;设置

　　所以最终的顺序只有两种:link、visited、focus、hover、active或visited、link、focus、hover、active

<div class="cnblogs_code">
<pre>a:link{background-color:pink;}/*品红，未访问*/
a:visited{color:orange;}/*字体颜色为橙色，已被访问*/
a:focus{background-color:lightgrey;}/*浅灰，拥有焦点*/
a:hover{background-color:lightblue;}/*浅蓝，鼠标悬停*/
a:active{background-color:lightgreen;}/*浅绿，正被点击*/</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="{{book.demo}}/css/base/b37.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### UI元素伪类

　　UI元素伪类包括:enabled、:disabled、:checked三个，主要针对于HTML中的form元素，IE8-浏览器不支持

<div class="cnblogs_code">
<pre>:enabled    可用状态
:disabled   不可用状态
:checked    选中状态    </pre>
</div>
<div class="cnblogs_code">
<pre>input:enabled{
    border: 1px solid black;
    background-color: transparent;
}
input:disabled{
    border: none;
    background-color: gray;
}
input:checked{
    outline: 2px solid lightblue;
}</pre>
</div>
<div class="cnblogs_code">
<pre>&lt;button onclick = "btn.disabled = false;"&gt;按钮可用&lt;/button&gt;
&lt;button onclick = "btn.disabled = true;"&gt;按钮不可用&lt;/button&gt;
&lt;input type="button" id="btn" value="按钮"&gt;
&lt;br&gt;
&lt;label&gt;Male&lt;input type="radio" name="sex" /&gt;&lt;/label&gt;
&lt;label&gt;Female&lt;input type="radio" name="sex"  /&gt;&lt;/label&gt;</pre>
</div>

　　[注意]input和:和enabled之间都不可以有空格

<iframe style="width: 100%; height: 60px;" src="{{book.demo}}/css/base/b38.html" frameborder="0" width="320" height="240"></iframe>

### 结构伪类

　　结构伪类可分为以下3种情况，IE8-浏览器不支持

　　//以下情况都是E为父元素，F为子元素

【1】:nth-child(n)、:nth-last-child(n)、first-child、last-child、:only-child

<div class="cnblogs_code">
<pre>E F:nth-child(n)           选择父元素的第n个子元素
E F:nth-last-child(n)      选择父元素的倒数第n个子元素
E F:first-child            父元素的第一个子元素，与E F:nth-child(1)等同
E F:last-child             父元素的最后一个子元素，与E F:nth-last-child(1)等同
E F:only-child             选择父元素中只包含一个子元素</pre>
</div>

　　[注意]:first-child和:last-child只有IE6-浏览器不支持

　　n可以是整数(从1开始)，也可以是公式，也可以是关键字(even、odd)

<div class="cnblogs_code">
<pre>p:first-child    　　 代表的并不是&lt;p&gt;的第一个子元素，而是&lt;p&gt;元素是某元素的第一个子元素
p &gt; i:first-child    匹配所有&lt;p&gt;元素中的第一个&lt;i&gt;元素
p:first-child i 　　  匹配所有作为第一个子元素的&lt;p&gt;元素中的所有&lt;i&gt;元素</pre>
</div>
<div class="cnblogs_code">
<pre>li:nth-child(odd){color: red;} 
li:nth-last-child(3){color: green;}
li:first-child{color: blue;}
li:last-child{color: yellow;}
div:only-child{background-color:lightgrey;}</pre>
</div>
<div class="cnblogs_code">
<pre>&lt;ul&gt;
    &lt;li&gt;&lt;div&gt;第一个DIV&lt;/div&gt;&lt;/li&gt;
    &lt;li&gt;&lt;div&gt;第二个DIV&lt;/div&gt;&lt;/li&gt;
    &lt;li&gt;&lt;div&gt;第三个DIV&lt;/div&gt;&lt;/li&gt;
    &lt;li&gt;&lt;div&gt;第四个DIV&lt;/div&gt;&lt;/li&gt;
    &lt;li&gt;&lt;div&gt;第五个DIV&lt;/div&gt;&lt;/li&gt;
    &lt;li&gt;&lt;div&gt;第六个DIV&lt;/div&gt;&lt;/li&gt;        
&lt;/ul&gt;</pre>
</div>

<iframe style="width: 100%; height: 160px;" src="{{book.demo}}/css/base/b39.html" frameborder="0" width="320" height="240"></iframe>

【2】:nth-of-type(n)、:nth-last-of-type(n)、:first-of-type、:last-of-type、:only-of-type

<div class="cnblogs_code">
<pre>E F:nth-of-type(n)          选择父元素的具有指定类型的第n个子元素
E F:nth-last-of-type(n)     选择父元素的具有指定类型的倒数第n个子元素
E F:first-of-type           选择父元素中具有指定类型的第1个子元素，与E F:nth-of-type(1)相同
E F:last-of-type         　  选择父元素中具有指定类型的最后1个子元素，与E F:nth-last-of-type(1)相同
E F:only-of-type        　　 选择父元素中只包含一个同类型的子元素</pre>
</div>
<div class="cnblogs_code">
<pre>.box div:nth-of-type(even){color: red;} 
.box p:nth-last-of-type(3){color: green;}
.box div:first-of-type{color: blue;}
.box p:last-of-type{color: yellow;}
.box div:only-of-type{color: pink;}</pre>
</div>
<div class="cnblogs_code">
<pre>&lt;div class="box"&gt;
    &lt;div&gt;第一个div&lt;/div&gt;
    &lt;p&gt;第一个p&lt;/p&gt;
    &lt;div&gt;第二个div&lt;/div&gt;
    &lt;p&gt;第二个p&lt;/p&gt;
    &lt;div class="in"&gt;第三个div&lt;/div&gt;
    &lt;p&gt;第三个p&lt;/p&gt;
&lt;/div&gt;
&lt;div class="box"&gt;
    &lt;div&gt;第四个div&lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 260px;" src="{{book.demo}}/css/base/b40.html" frameborder="0" width="320" height="240"></iframe>

【3】:root、:not、:empty、:target

<div class="cnblogs_code">
<pre>:root        　选择文档的根元素
:not         　选择除某个元素之外的所有元素
:empty         选择没有子元素的元素，而且该元素也不包含任何文本节点
:target     　 匹配锚点对应的目标元素</pre>
</div>

　　[注意]:not选择器常用于导航之间的竖线处理，如li:not(:last-of-type)

<div class="cnblogs_code">
<pre>:root{color:red;}
div:not{background-color: lightgrey;}
p:empty{height:30px;width:30px;background:pink;}
:target{color:blue;}</pre>
</div>
<div class="cnblogs_code">
<pre>&lt;body&gt;
    &lt;a href="#test"&gt;测试&lt;/a&gt;
    &lt;div&gt;第一个div&lt;/div&gt;
    &lt;p&gt;第一个p&lt;/p&gt;
    &lt;div id="test"&gt;第二个div&lt;/div&gt;
    &lt;p&gt;第二个p&lt;/p&gt;
    &lt;p&gt;&lt;/p&gt;    
&lt;/body&gt;</pre>
</div>

<iframe style="width: 100%; height: 230px;" src="{{book.demo}}/css/base/b41.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 其他

【1】:lang()　　  匹配某个语言，IE7-浏览器不支持

<div class="cnblogs_code">
<pre>p:lang(en) 匹配语言为"en"的&lt;p&gt;</pre>
</div>

【2】不仅可以使用单一伪类，也可以伪类结合使用

 　　[注意]顺序无关

<div class="cnblogs_code">
<pre>div:hover:first-child{background-color: lightgreen;}
div:last-of-type:active{background-color: lightblue;}    </pre>
</div>
<div class="cnblogs_code">
<pre>    &lt;div&gt;第一个div&lt;/div&gt;
    &lt;div&gt;第二个div&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="{{book.demo}}/css/base/b42.html" frameborder="0" width="320" height="240"></iframe>

