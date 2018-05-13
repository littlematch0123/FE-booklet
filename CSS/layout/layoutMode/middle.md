# CSS实现垂直居中的5种思路

&emsp;&emsp;相对于[水平居中](http://www.cnblogs.com/xiaohuochai/p/5437503.html)，人们对于垂直居中略显为难，大部分原因是[vertical-align](http://www.cnblogs.com/xiaohuochai/p/5271217.html#anchor2)不能正确使用。实际上，实现垂直居中也是围绕几个思路展开的。本文将介绍关于垂直居中的5种思路

&nbsp;

### line-height

【思路一】： 行高line-height实现单行文本垂直居中

 &emsp;&emsp;行内流传着一种说法，单行文本垂直居中要将高度和[行高](http://www.cnblogs.com/xiaohuochai/p/5271217.html#anchor1)设置成相同的值，但高度其实没必要设置。实际上，文本本身就在一行中居中显示。在不设置高度的情况下，行高撑开高度

<div>
<pre>&lt;style&gt;
.test{
    line-height: 50px;
    background-color: lightblue;
}    
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="test"&gt;测试文字&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 160px;" src="https://demo.xiaohuochai.site/css/lineheight/l6.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### vertical-align&nbsp;

【思路二】：设置vertical-align:middle实现垂直居中

【1】设置父元素的display为[table-cell](http://www.cnblogs.com/xiaohuochai/p/5202761.html#anchor9)

&emsp;&emsp;通过为table-cell元素设置vertical-align:middle，可使其子元素均实现垂直居中。这和表格里单元格的垂直居中是类似的

&emsp;&emsp;注意：若要IE7-浏览器支持，则可以将其改为&lt;table&gt;表格结构

&emsp;&emsp;注意：设置为table-cell的div不能使用[浮动](http://www.cnblogs.com/xiaohuochai/p/5243735.html)或[绝对定位](http://www.cnblogs.com/xiaohuochai/p/5312917.html)，因为浮动或绝对定位会使元素具有块级元素特性，从而丧失了table-cell元素具有的垂直对齐的功能。若需要浮动或绝对定位处理，则需要外面再套一层div

<div>
<pre>&lt;style&gt;
.parent{
  display: table-cell;
  vertical-align: middle;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: gray;height: 100px;"&gt;
    &lt;div class="child" style="background-color: lightblue;"&gt;我是有点长的有点长的有点长的有点长的测试文字&lt;/div&gt;   
&lt;/div&gt;  </pre>
</div>

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/ycenter/y2.html" frameborder="0" width="320" height="240"></iframe>

【2】若子元素是图片，通过设置父元素的行高来代替高度，且设置父元素的font-size为0

 &emsp;&emsp;vertical-align:middle的解释是元素的中垂点与父元素的基线加1/2父元素中字母X的高度对齐。由于字符X在em框中并不是垂直居中的，且各个字体的字符X的高低位置不一致。所以，当字体大小较大时，这种差异就更明显。当font-size为0时，相当于把字符X的字体大小设置为0，于是可以实现完全的垂直居中

<div>
<pre>&lt;style&gt;
.parent{
  line-height: 100px;
  font-size: 0;
}
.child{
  vertical-align: middle;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgray;width:200px;"&gt;
    &lt;img class="child" src="http://sandbox.runjs.cn/uploads/rs/26/ddzmgynp/img1.gif" width="50%" alt="test"&gt;  
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 260px;" src="https://demo.xiaohuochai.site/css/lineheight/l8.html" frameborder="0" width="320" height="240"></iframe>

【3】通过新增元素来实现垂直居中的效果

 &emsp;&emsp;新增元素设置高度为父级高度，宽度为0，且同样设置垂直居中vertical-align:middle的inline-block元素。由于两个元素之间空白被解析，所以需要在父级设置font-size:0，在子级再将font-size设置为所需值；若结构要求不严格，则可以将两个元素一行显示，则不需要设置font-size:0

<div>
<pre>&lt;style&gt;
.parent{
  height: 100px;
  font-size: 0;
}
.child{
  display: inline-block;
  font-size: 20px;
  vertical-align: middle;
}
.childSbling{
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgray; width:200px;"&gt;
  &lt;div class="child" style="background-color: lightblue;"&gt;我是比较长的比较长的多行文字&lt;/div&gt;
  &lt;i class="childSbling"&gt;&lt;/i&gt; 
&lt;/div&gt; </pre>
</div>

<iframe style="width: 100%; height: 230px;" src="https://demo.xiaohuochai.site/css/lineheight/l9.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### absolute

【思路三】：通过绝对定位实现垂直居中

【1】配合translate()位移函数

 &emsp;&emsp;translate函数的百分比是相对于自身高度的，所以top:50%配合translateY(-50%)可实现居中效果

&emsp;&emsp;注意：IE9-浏览器不支持

&emsp;&emsp;注意：若子元素的高度已知，translate()函数也可替换为margin-top: 负的高度值

<div>
<pre>&lt;style&gt;
.parent{
  position:relative;
}
.child{
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgray; height:100px;"&gt;
  &lt;div class="child" style="background-color: lightblue;"&gt;测试文字&lt;/div&gt;
&lt;/div&gt;  </pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/ycenter/y5.html" frameborder="0" width="320" height="240"></iframe>

【2】若子元素定高，结合绝对定位的盒模型属性，实现居中效果

<div>
<pre>&lt;style&gt;
.parent{
  position: relative;
}
.child{
 position: absolute;
 top: 0;
 bottom: 0;
 margin: auto 0;
 height: 50px;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgray; height:100px;"&gt;
  &lt;div class="child" style="background-color: lightblue;"&gt;测试文字&lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/ycenter/y6.html" frameborder="0" width="320" height="240"></iframe>

&lt;关于增加div层级的说明&gt;

&emsp;&emsp;在[水平居中对齐](http://www.cnblogs.com/xiaohuochai/p/5437503.html)中，元素外层套一层div并设置absolute，元素设置负margin-left或者relative的负left属性，可以实现水平居中的效果。但由于[margin](http://www.cnblogs.com/xiaohuochai/p/5202597.html#anchor3)是相对于包含块宽度的，这样margin-top:-50%得到的是宽度而不是高度的-50%，所以不可行；对于[relative](http://www.cnblogs.com/xiaohuochai/p/5321487.html#anchor1)的百分比取值而言，在包含块高度为auto的情况下，chrome、safari和IE8+浏览器都不支持设置元素的百分比top值，所以也不可行

&nbsp;

### flex

【思路四】：使用弹性盒模型flex实现垂直居中

&emsp;&emsp;注意：IE9-浏览器不支持

【1】在[伸缩容器](http://www.cnblogs.com/xiaohuochai/p/5323146.html#anchor4)上设置侧轴对齐方式align-items: center

<div>
<pre>&lt;style&gt;
.parent{
  display: flex;
  align-items: center;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: gray; height: 100px;"&gt;
    &lt;div class="child" style="background-color: lightblue;"&gt;测试文字&lt;/div&gt;   
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/ycenter/y7.html" frameborder="0" width="320" height="240"></iframe>

【2】在[伸缩项目](http://www.cnblogs.com/xiaohuochai/p/5323146.html#anchor5)上设置margin: auto 0

<div>
<pre>&lt;style&gt;
.parent{
  display: flex;
}
.child{
  margin: auto 0;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: gray; height: 100px;"&gt;
    &lt;div class="child" style="background-color: lightblue;"&gt;测试文字&lt;/div&gt;   
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/ycenter/y8.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### grid

【思路五】: 使用栅格布局grid实现垂直居中

&emsp;&emsp;注意：IE10-浏览器不支持

【1】在网格容器上设置align-items或align-content

<div>
<pre>&lt;style&gt;
.parent{
  display:grid;
  align-items:center;
 /*align-content:center;*/
} 
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: gray; height: 100px;"&gt;
    &lt;div class="child" style="background-color: lightblue;"&gt;测试文字&lt;/div&gt;   
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/ycenter/y9.html" frameborder="0" width="320" height="240"></iframe>

【2】在网格项目中设置align-self或者margin: auto&nbsp;0

<div>
<pre>&lt;style&gt;
.parent{
  display:grid;
} 
.child{
  align-self:center;
 /*margin: auto 0;*/
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: gray; height: 100px;"&gt;
    &lt;div class="child" style="background-color: lightblue;"&gt;测试文字&lt;/div&gt;   
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/ycenter/y10.html" frameborder="0" width="320" height="240"></iframe>
