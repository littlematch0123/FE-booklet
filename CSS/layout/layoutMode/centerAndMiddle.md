# CSS实现水平垂直同时居中的6种思路

&emsp;&emsp;[水平居中](http://www.cnblogs.com/xiaohuochai/p/5437503.html)和[垂直居中](http://www.cnblogs.com/xiaohuochai/p/5438791.html)已经单独介绍过，本文将介绍水平垂直同时居中的6种思路

&nbsp;

### 水平对齐+行高

【思路一】text-align + line-height实现单行文本水平垂直居中

<div>
<pre>&lt;style&gt;
.test{
    text-align: center;
    line-height: 100px;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="test" style="background-color: lightblue;width: 200px;"&gt;测试文字&lt;/div&gt;   </pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/xycenter/x1.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 水平+垂直对齐

【思路二】text-align + vertical-align

【1】在父元素设置[text-align](http://www.cnblogs.com/xiaohuochai/p/5325063.html#anchor2)和[vertical-align](http://www.cnblogs.com/xiaohuochai/p/5271217.html#anchor2)，并将父元素设置为[table-cell](http://www.cnblogs.com/xiaohuochai/p/5202761.html#anchor9)元素，子元素设置为[inline-block](http://www.cnblogs.com/xiaohuochai/p/5202761.html#anchor3)元素

　　注意：若兼容IE7-浏览器，将结构改为[&lt;table&gt;](http://www.cnblogs.com/xiaohuochai/p/5008466.html)结构来实现table-cell的效果；用display:inline;[zoom:1](http://www.cnblogs.com/xiaohuochai/p/4845314.html#anchor3);来实现inline-block的效果

<div>
<pre>&lt;style&gt;
.parent{
    display: table-cell;
    text-align: center;
    vertical-align: middle;
}
.child{
    display: inline-block;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: gray; width:200px; height:100px;"&gt;
  &lt;div class="child" style="background-color: lightblue;"&gt;测试文字&lt;/div&gt;
&lt;/div&gt; </pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/xycenter/x2.html" frameborder="0" width="320" height="240"></iframe>

【2】若子元素是[图像](http://www.cnblogs.com/xiaohuochai/p/5008341.html)，可不使用table-cell，而是其父元素用[行高](http://www.cnblogs.com/xiaohuochai/p/5271217.html#anchor1)替代高度，且[字体大小](http://www.cnblogs.com/xiaohuochai/p/4986285.html#anchor3)设为0。子元素本身设置vertical-align:middle

<div>
<pre>&lt;style&gt;
.parent{
    text-align: center;
    line-height: 100px;
    font-size: 0;
}
.child{
    vertical-align: middle;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: gray; width:200px; "&gt;
  &lt;img class="child" src="http://sandbox.runjs.cn/uploads/rs/26/ddzmgynp/img1.gif" width="50%" alt="test"&gt;
&lt;/div&gt;  </pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/xycenter/x3.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### margin+垂直对齐

【思路三】margin + vertical-align

&emsp;&emsp;要想在父元素中设置vertical-align，须设置为table-cell元素；要想让[margin](http://www.cnblogs.com/xiaohuochai/p/5202597.html#anchor3):0 auto实现水平居中的块元素内容撑开宽度，须设置为table元素。而table元素是可以嵌套在tabel-cell元素里面的，就像一个单元格里可以嵌套一个表格

&emsp;&emsp;注意：若兼容IE7-浏览器，需将结构改为&lt;table&gt;结构

<div>
<pre>&lt;style&gt;
.parent{
    display:table-cell;
    vertical-align: middle;
}
.child{
    display: table;
    margin: 0 auto;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgray; width:200px; height:100px; "&gt;
  &lt;div class="child" style="background-color: lightblue;"&gt;测试文字&lt;/div&gt;
&lt;/div&gt;  </pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/xycenter/x4.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 绝对定位

【思路四】使用absolute

【1】利用[绝对定位](http://www.cnblogs.com/xiaohuochai/p/5312917.html)元素的[盒模型特性](http://www.cnblogs.com/xiaohuochai/p/5289143.html#anchor5)，在[偏移属性](http://www.cnblogs.com/xiaohuochai/p/5289143.html#anchor3)为确定值的基础上，设置margin:auto

<div>
<pre>&lt;style&gt;
.parent{
    position: relative;
}
.child{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 50px;
    width: 80px;
    margin: auto;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgray; width:200px; height:100px; "&gt;
  &lt;div class="child" style="background-color: lightblue;"&gt;测试文字&lt;/div&gt;
&lt;/div&gt;  </pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/xycenter/x5.html" frameborder="0" width="320" height="240"></iframe>

【2】利用绝对定位元素的偏移属性和[translate()函数](http://www.cnblogs.com/xiaohuochai/p/5350254.html#anchor2)的自身偏移达到水平垂直居中的效果

&emsp;&emsp;注意：IE9-浏览器不支持

<div>
<pre>&lt;style&gt;
.parent{
    position: relative;
}
.child{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgray; width:200px; height:100px; "&gt;
  &lt;div class="child" style="background-color: lightblue;"&gt;测试文字&lt;/div&gt;
&lt;/div&gt;  </pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/xycenter/x6.html" frameborder="0" width="320" height="240"></iframe>

【3】在子元素宽高已知的情况下，可以配合[margin负值](http://www.cnblogs.com/xiaohuochai/p/5314289.html)达到水平垂直居中效果

<div>
<pre>&lt;style&gt;
.parent{
    position: relative;
}
.child{
    position: absolute;
    top: 50%;
    left: 50%;
    width: 80px;
    height: 60px;
    margin-left: -40px;
    margin-top: -30px;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgray; width:200px; height:100px; "&gt;
  &lt;div class="child" style="background-color: lightblue;"&gt;测试文字&lt;/div&gt;
&lt;/div&gt;  </pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/xycenter/x7.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### flex

【思路五】使用flex

&emsp;&emsp;注意：IE9-浏览器不支持

【1】在[伸缩项目](http://www.cnblogs.com/xiaohuochai/p/5323146.html#anchor5)上使用margin:auto

<div>
<pre>&lt;style&gt;
.parent{
    display: flex;
}
.child{
    margin: auto;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgray; width:200px; height:100px; "&gt;
  &lt;div class="child" style="background-color: lightblue;"&gt;测试文字&lt;/div&gt;
&lt;/div&gt;  </pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/xycenter/x8.html" frameborder="0" width="320" height="240"></iframe>

【2】在[伸缩容器](http://www.cnblogs.com/xiaohuochai/p/5323146.html#anchor4)上使用主轴对齐justify-content和侧轴对齐align-items

<div>
<pre>&lt;style&gt;
.parent{
    display: flex;
    justify-content: center;
    align-items: center;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgray; width:200px; height:100px; "&gt;
  &lt;div class="child" style="background-color: lightblue;"&gt;测试文字&lt;/div&gt;
&lt;/div&gt;  </pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/xycenter/x9.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### grid

【思路六】使用grid

&emsp;&emsp;注意：IE10-浏览器不支持

【1】在网格项目中设置justify-self、align-self或者margin: &nbsp;auto

<div>
<pre>&lt;style&gt;
.parent{
    display: grid;
}
.child{
    align-self: center;
    justify-self: center;
/*     margin: auto; */
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgray; width:200px; height:100px; "&gt;
  &lt;div class="child" style="background-color: lightblue;"&gt;测试文字&lt;/div&gt;
&lt;/div&gt; </pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/xycenter/x10.html" frameborder="0" width="320" height="240"></iframe>

【2】在网格容器上设置justify-items、align-items或justify-content、align-content

<div>
<pre>&lt;style&gt;
.parent{
    display: grid;
    align-items: center;
    justify-items: center;
    /* align-content: center; */
    /* justify-content: center; */
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgray; width:200px; height:100px; "&gt;
  &lt;div class="child" style="background-color: lightblue;"&gt;测试文字&lt;/div&gt;
&lt;/div&gt; </pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/xycenter/x11.html" frameborder="0" width="320" height="240"></iframe>

