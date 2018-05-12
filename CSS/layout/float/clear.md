# CSS清浮动

&emsp;&emsp;人们经常谈起清浮动，其实就是解决浮动元素的包含块高度塌陷的问题

&nbsp;

### 定义

**clear 清除**

&emsp;&emsp;值: left | right | both | none | inherit

&emsp;&emsp;初始值: none

&emsp;&emsp;应用于: 块级元素(块级元素指block元素，不包括inline-block元素)

&emsp;&emsp;继承性: 无

<div>
<pre>left:左侧不允许存在浮动元素
right:右侧不允许存在浮动元素
both:左右两侧不允许存在浮动元素
none:允许左右两侧存在浮动元素</pre>
</div>

&emsp;&emsp;注意：设置clear属性的元素并不能改变浮动元素，而只能改变自身

&emsp;&emsp;CSS2.1引入了一个清除区域，清除区域是在元素上外边距之上增加的额外间隔，不允许任何浮动元素进入这个范围，这意味着元素设置clear属性时，它的外边距不改变

<iframe style="width: 100%; height: 269px;" src="https://demo.xiaohuochai.site/css/float/f7.html" frameborder="0" width="320" height="240"></iframe>

### 方法

&emsp;&emsp;对于标准浏览器来说，清浮动其实就两种方法，一种是在浮动元素下面添加新元素设置clear属性；另一种是触发包含块的BFC，使其包含浮动元素。而对于IE7-浏览器，则用到其特有属性haslayout

**【1】clear属性**

&emsp;&emsp;1、&lt;div style="clear:both"&gt;&lt;/div&gt;

&emsp;&emsp;&lt;注意&gt;并不是很适用，若包含块为&lt;ul&gt;，则子元素只能为&lt;li&gt;，则在&lt;li&gt;后面添加&lt;div&gt;元素不合适

&emsp;&emsp;2、&lt;br style="clear:both"&gt;

&emsp;&emsp;&lt;注意&gt;虽然clear属性只应用于块级元素，但在除IE7-以外的其他浏览器都可以将clear属性应用于&lt;br&gt;元素

&emsp;&emsp;3、为浮动元素的after伪元素设置clear属性
```
　　.clear:after{content:""; display: block; clear: both;}
```
&emsp;&emsp;&lt;注意&gt;IE7-浏览器不支持after伪元素

**【2】BFC**

&emsp;&emsp;1、float: left/right

&emsp;&emsp;2、position:absolute/fixed

&emsp;&emsp;3、display:inline-block/table-cell/table-caption/flex

&emsp;&emsp;4、overflow:hidden/scroll/auto

&emsp;&emsp;[关于BFC的详细信息移步至此](http://www.cnblogs.com/xiaohuochai/p/5248536.html)

**【3】IE7-**

&emsp;&emsp;关于IE7-浏览器有一个其特有的属性haslayout，当触发包含块的haslayout时，浮动元素被layout元素自动包含

&emsp;&emsp;1、display:inline-block

&emsp;&emsp;2、height/width:除auto外

&emsp;&emsp;3、float: left/right

&emsp;&emsp;4、position: absolute

&emsp;&emsp;5、writing-mode: tb-rl

&emsp;&emsp;6、zoom: 除normal外

&emsp;&emsp;[关于haslayout的详细信息移步至此](http://www.cnblogs.com/xiaohuochai/p/4845314.html)

&nbsp;

### 兼容

&emsp;&emsp;在所有浏览器中都兼容的清浮动方案如下：

<div>
<pre>.clear:after{content:""; display: block; clear: both;}
.clear{zoom: 1;}</pre>
</div>

&nbsp;　　除了清除浮动外，常常也需要解决[外边距margin重叠](http://www.cnblogs.com/xiaohuochai/p/6255046.html#anchor1)的问题。这时，清除浮动和解决margin重叠的代码如下

<div>
<pre>.clear:before,.clear:after{content:"";display:table;}
.clear:after{clear:both;}
.clear{zoom:1}</pre>
</div>

