# 两列布局中单列定宽单列自适应布局的6种思路

&emsp;&emsp;说起自适应布局方式，单列定宽单列自适应布局是最基本的布局形式。本文将从float、inline-block、table、absolute、flex和grid这六种思路来详细说明如何巧妙地实现布局

&nbsp;

### float

【思路一】float

&emsp;&emsp;说起两列布局，最常见的就是使用[float](http://www.cnblogs.com/xiaohuochai/p/5243735.html)来实现。float浮动布局的缺点是浮动后会造成文本环绕等效果，以及需要及时[清除浮动](http://www.cnblogs.com/xiaohuochai/p/5248981.html)。如果各浮动元素的高度不同时，可能会出犬牙交错的效果

【1】float + margin

&emsp;&emsp;将定宽的一列使用float，而自适应的一列使用计算后的margin

<div>
<pre>&lt;style&gt;
p{margin: 0;}
.parent{overflow: hidden;zoom: 1;}
.left{float: left;width: 100px;}    
.right{margin-left: 120px;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="left" style="background-color: lightblue;"&gt;
        &lt;p&gt;left&lt;/p&gt;
    &lt;/div&gt;
    &lt;div class="right"  style="background-color: lightgreen;"&gt;
        &lt;p&gt;right&lt;/p&gt;
        &lt;p&gt;right&lt;/p&gt;
    &lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="line-height: 1.5; width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/buju1/b1.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;缺点1：IE6-浏览器下3像素bug，具体表现在右侧首行文字会向右偏移3px。解决办法是在left元素上设置margin-right: -100px

![IE6Of3px](https://pic.xiaohuochai.site/blog/CSS_layout_IE6Of3px.gif)

&emsp;&emsp;缺点2：当右侧容器中有元素[清除浮动](http://www.cnblogs.com/xiaohuochai/p/5248981.html)时，会使该元素不与左侧浮动元素同行，从而出现文字下沉现象

![IE6Of3px2](https://pic.xiaohuochai.site/blog/CSS_layout_IE6Of3px2.gif)

【2】float + margin + (fix)

&emsp;&emsp;(fix)代表增加结构，为了解决上述方法中的两个缺点，可以通过增加结构来实现。自适应的一列外侧增加一层结构.rightWrap并设置浮动。要实现自适应效果，.rightWrap宽度必须设置为100%。若不设置，float后的元素宽度将由内容撑开。同时再配合[盒模型](http://www.cnblogs.com/xiaohuochai/p/5202597.html)属性的计算，设置计算后的[负](http://www.cnblogs.com/xiaohuochai/p/5314289.html)[margin](http://www.cnblogs.com/xiaohuochai/p/5314289.html)值，使两列元素在同一行显示。同时两列之间的间距由.right的margin值确定。由于右侧元素会层叠在左侧元素之上，.left需要使用[relative](http://www.cnblogs.com/xiaohuochai/p/5321487.html)来提升层级

<div>
<pre>&lt;style&gt;
p{margin: 0;}
.parent{overflow: hidden;zoom: 1;}
.left{position: relative;float: left;width: 100px;}    
.rightWrap{float: left;width: 100%;margin-left: -100px;}
.right{margin-left: 120px;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="left" style="background-color: lightblue;"&gt;
        &lt;p&gt;left&lt;/p&gt;
    &lt;/div&gt;
    &lt;div class="rightWrap" style="background-color: pink;"&gt;
        &lt;div class="right"  style="background-color: lightgreen;"&gt;
            &lt;p&gt;right&lt;/p&gt;
            &lt;p&gt;right&lt;/p&gt;
        &lt;/div&gt;        
    &lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/buju1/b2.html" frameborder="0" width="320" height="240"></iframe>

【3】float + margin + calc

&emsp;&emsp;除了增加结构的方法外，还可以使用calc()

&emsp;&emsp;注意：IE8-、android4.3-、IOS5.1-不支持，android4.4+只支持加减运算

<div>
<pre>&lt;style&gt;
p{margin: 0;}
.parent{overflow: hidden;zoom: 1;}
.left{float: left;width: 100px;margin-right: 20px;}    
.right{float: left;width: calc(100% - 120px);}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="left" style="background-color: lightblue;"&gt;
        &lt;p&gt;left&lt;/p&gt;
    &lt;/div&gt;
    &lt;div class="right"  style="background-color: lightgreen;"&gt;
        &lt;p&gt;right&lt;/p&gt;
        &lt;p&gt;right&lt;/p&gt;
    &lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/buju1/b3.html" frameborder="0" width="320" height="240"></iframe>

【4】float + overflow

&emsp;&emsp;还可以使用overflow属性来触发[bfc](http://www.cnblogs.com/xiaohuochai/p/5248536.html)，来阻止浮动造成的文字环绕效果。由于使用overflow不会改变元素的宽度属性，所以不需要重新设置宽度。由于设置overflow:hidden并不会触发IE6-浏览器的haslayout属性，所以需要设置zoom:1来兼容IE6-浏览器

<div>
<pre>&lt;style&gt;
p{margin: 0;}
.parent{overflow: hidden;zoom: 1;}
.left{ float: left;width: 100px;margin-right: 20px;}    
.right{overflow: hidden;zoom: 1;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="left" style="background-color: lightblue;"&gt;
        &lt;p&gt;left&lt;/p&gt;
    &lt;/div&gt;
    &lt;div class="right"  style="background-color: lightgreen;"&gt;
        &lt;p&gt;right&lt;/p&gt;
        &lt;p&gt;right&lt;/p&gt;
    &lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/buju1/b4.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### inline-block

【思路二】inline-block

&emsp;&emsp;inline-block内联块布局的主要缺点是需要设置垂直对齐方式[vertical-align](http://www.cnblogs.com/xiaohuochai/p/5271217.html#anchor2)，则需要处理换行符解析成空格的间隙问题。IE7-浏览器不支持给块级元素设置inline-block属性，兼容代码是display:inline;zoom:1;

【1】inline-block + margin + calc

&emsp;&emsp;一般来说，要解决inline-block元素之间的间隙问题，要在父级设置font-size为0，然后在子元素中将font-size设置为默认大小

&emsp;&emsp;注意：IE8-、android4.3-、IOS5.1-不支持，android4.4+只支持加减运算

<div>
<pre>&lt;style&gt;
p{margin: 0;}
.parent{font-size: 0;}
.left{display:inline-block;vertical-align:top;width:100px;margin-right:20px;font-size:16px;}
.right{display:inline-block;vertical-align:top;width:calc(100% - 120px);font-size:16px;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="left" style="background-color: lightblue;"&gt;
        &lt;p&gt;left&lt;/p&gt;
    &lt;/div&gt;
    &lt;div class="right"  style="background-color: lightgreen;"&gt;
        &lt;p&gt;right&lt;/p&gt;
        &lt;p&gt;right&lt;/p&gt;
    &lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/buju1/b5.html" frameborder="0" width="320" height="240"></iframe>

【2】inline-block + margin + (fix)

<div>
<pre>&lt;style&gt;
p{margin: 0;}
.parent{font-size: 0;}
.left{position:relative;display:inline-block;vertical-align:top;width:100px;font-size:16px;}
.rightWrap{display:inline-block;vertical-align:top;width:100%;margin-left: -100px;font-size:16px;}
.right{margin-left: 120px;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="left" style="background-color: lightblue;"&gt;
        &lt;p&gt;left&lt;/p&gt;
    &lt;/div&gt;
    &lt;div class="rightWrap" style="background-color: pink;"&gt;
        &lt;div class="right"  style="background-color: lightgreen;"&gt;
            &lt;p&gt;right&lt;/p&gt;
            &lt;p&gt;right&lt;/p&gt;
        &lt;/div&gt;        
    &lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/buju1/b6.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### table

【思路三】table

&emsp;&emsp;使用[table](http://www.cnblogs.com/xiaohuochai/p/5008466.html)布局的缺点是元素被设置为table后，内容撑开宽度，所以需要设置width:100%。若要兼容IE7-浏览器，需要改为&lt;table&gt;结构。由于table-cell元素无法设置margin，若需要在元素间设置间距，需要增加结构

<div>
<pre>&lt;style&gt;
p{margin: 0;}
.parent{display:table;width: 100%;table-layout: fixed;}
.left,.rightWrap{display:table-cell;}
.left{width: 100px;}
.right{margin-left: 20px;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="left" style="background-color: lightblue;"&gt;
        &lt;p&gt;left&lt;/p&gt;
    &lt;/div&gt;
    &lt;div class="rightWrap" style="background-color: pink;"&gt;
        &lt;div class="right"  style="background-color: lightgreen;"&gt;
            &lt;p&gt;right&lt;/p&gt;
            &lt;p&gt;right&lt;/p&gt;
        &lt;/div&gt;        
    &lt;/div&gt;    
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/buju1/b7.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### absolute

【思路四】absolute

&emsp;&emsp;[absolute](http://www.cnblogs.com/xiaohuochai/p/5312917.html)布局的缺点是由于父元素需要设置为[relative](http://www.cnblogs.com/xiaohuochai/p/5321487.html#anchor1)，且子元素设置为absolute，所以父元素的高度并不是由子元素撑开的，需要单独设置。

&emsp;&emsp;注意：IE6-不支持相对的偏移属性同时设置

<div>
<pre>&lt;style&gt;
p{margin: 0;}
.parent{position: relative;width:100%;height:40px;}
.left{position: absolute;left:0;width:100px;}
.right{position: absolute;left:120px;right:0;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="left" style="background-color: lightblue;"&gt;
        &lt;p&gt;left&lt;/p&gt;
    &lt;/div&gt;
    &lt;div class="right"  style="background-color: lightgreen;"&gt;
        &lt;p&gt;right&lt;/p&gt;
        &lt;p&gt;right&lt;/p&gt;
    &lt;/div&gt;        
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/buju1/b8.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### flex

【思路五】flex

&emsp;&emsp;[flex](http://www.cnblogs.com/xiaohuochai/p/5323146.html)弹性盒模型是非常强大的布局方式。但由于其性能消耗较大，适合于局部小范围的布局

&emsp;&emsp;注意：IE9-浏览器不支持

<div>
<pre>&lt;style&gt;
p{margin: 0;}
.parent{display: flex;}
.left{width:100px;margin-right: 20px;}
.right{flex:1;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="left" style="background-color: lightblue;"&gt;
        &lt;p&gt;left&lt;/p&gt;
    &lt;/div&gt;
    &lt;div class="right"  style="background-color: lightgreen;"&gt;
        &lt;p&gt;right&lt;/p&gt;
        &lt;p&gt;right&lt;/p&gt;
    &lt;/div&gt;        
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/buju1/b9.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### grid

【思路六】: 使用栅格布局grid实现

&emsp;&emsp;注意：IE10-浏览器不支持

<div>
<pre>&lt;style&gt;
p{margin: 0;}
.parent{display: grid;grid-template-columns: 100px 1fr;grid-gap:20px}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="left" style="background-color: lightblue;"&gt;
        &lt;p&gt;left&lt;/p&gt;
    &lt;/div&gt;
    &lt;div class="right"  style="background-color: lightgreen;"&gt;
        &lt;p&gt;right&lt;/p&gt;
        &lt;p&gt;right&lt;/p&gt;
    &lt;/div&gt;        
&lt;/div&gt;    </pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/buju1/b10.html" frameborder="0" width="320" height="240"></iframe>
