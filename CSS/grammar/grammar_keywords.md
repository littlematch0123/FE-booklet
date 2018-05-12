# 样式关键字initial、inherit、unset、revert和all

&emsp;&emsp;在CSS中，有4个关键字理论上可以应用于任何的CSS属性，它们是initial(初始)、inherit(继承)、unset(未设置)、revert(还原)。而all的取值只能是以上这4个关键字。本文将介绍initial、inherit、unset、revert和all

&nbsp;

### initial

&emsp;&emsp;表示元素属性的初始默认值(该默认值由官方CSS规范定义)

&emsp;&emsp;兼容性: IE不支持

&emsp;&emsp;注意：[关于各属性的初始默认值移步至此](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference)

<div>
<pre>//display在官方CSS规范中定义的默认值是inline
&lt;style&gt;
.test{display: initial;}
&lt;/style&gt;
&lt;div class="box"&gt;
    &lt;div class="test"&gt;测试一&lt;/div&gt;&lt;span&gt;文字&lt;/span&gt;
    &lt;br&gt;
    &lt;div &gt;测试二&lt;/div&gt;&lt;span&gt;文字&lt;/span&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="line-height: 1.5; width: 100%; height: 80px;" src="https://demo.xiaohuochai.site/css/base/b6.html" frameborder="0" width="320" height="240"></iframe>

### inherit

&emsp;&emsp;表示元素的直接父元素对应属性的计算值

&emsp;&emsp;兼容性: IE7-不支持

<div>
<pre>&lt;style&gt;
.box{
    border: 1px solid black;
    padding: 10px;
    width: 100px;
}
.test{
    border: inherit;
    height: 30px;
}
&lt;/style&gt;
&lt;div class="box"&gt;
    &lt;div class="test"&gt;测试一&lt;/div&gt;
&lt;/div&gt;
&lt;div class="box"&gt;
    &lt;div class="in"&gt;
        &lt;div class="test"&gt;测试二&lt;/div&gt;        
    &lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/css/base/b7.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### unset

&emsp;&emsp;unset相对于initial和inherit而言，相对复杂一点。表示如果该属性默认可继承，则值为inherit；否则值为initial。实际上，设置unset相当于不设置

&emsp;&emsp;兼容性: IE不支持，safari9-不支持，ios9.2-不支持，android4.4.4-不支持

【常用默认可继承样式】

<div>
<pre>color
cursor
direction
font
letter-spacing
line-height
list-style
text-align
text-indent
text-shadow
text-transform
white-space
word-break
word-spacing
word-wrap
writing-mode</pre>
</div>
<div>
<pre>//内容为测试一的元素和内容为测试二的元素的样式是一样的
&lt;style&gt;
.box{
    border: 1px solid black;
    padding: 10px;
    width: 100px;
    color: red;
}
.test1{
    border: unset;
    color: unset;
}
&lt;/style&gt;
&lt;div class="box"&gt;
    &lt;div class="test"&gt;测试一&lt;/div&gt;
    &lt;div&gt;测试二&lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 80px;" src="https://demo.xiaohuochai.site/css/base/b8.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### revert

&emsp;&emsp;表示样式表中定义的元素属性的默认值。若用户定义样式表中显式设置，则按此设置；否则，按照浏览器定义样式表中的样式设置；否则，等价于unset&nbsp;

&emsp;&emsp;兼容性: 只有safari9.1+和ios9.3+支持

&nbsp;

### all

&emsp;&emsp;表示重设除unicode-bidi和direction之外的所有CSS属性的属性值，取值只能是initial、inherit、unset和revert

&emsp;&emsp;兼容性: IE不支持，safari9-不支持，ios9.2-不支持，android4.4-不支持

<div>
<pre>&lt;style&gt;
.test{
    border: 1px solid black;
    padding: 20px;
    color: red;
}
.in{
/*  all: initial;
    all: inherit;
    all: unset;
    all: revert; */
}
&lt;/style&gt;
&lt;div class="test"&gt;
    &lt;div class="in"&gt;测试文字&lt;/div&gt;            
&lt;/div&gt;</pre>
</div>

&emsp;&emsp;【1】当all:initial时，.in的所有属性都取默认值

<div>
<pre>border:none;padding:0;color:black;</pre>
</div>

&emsp;&emsp;【2】当all:inherit时，.in的所有属性都取父元素继承值

<div>
<pre>border:1px solid black;padding:20px;color:red;</pre>
</div>

&emsp;&emsp;【3】当all:unset时，.in的所有属性都相当于不设置值，默认可继承的继承，不可继承的保持默认值

<div>
<pre>border:none;padding:0;color:red;</pre>
</div>

<iframe style="width: 100%; height: 220px;" src="https://demo.xiaohuochai.site/css/base/b9.html" frameborder="0" width="320" height="240"></iframe>

