# 深入理解line-height与vertical-align

&emsp;&emsp;line-height、font-size、vertical-align是设置行内元素布局的关键属性。这三个属性是相互依赖的关系，改变行间距离、设置垂直对齐等都需要它们的通力合作。在[CSS字体](http://www.cnblogs.com/xiaohuochai/p/4986285.html#anchor3)里面已经详细介绍了font-size的相关内容，本文将主要介绍line-height与vertical-align。本文涉及到的术语解释参考[CSS](http://www.cnblogs.com/xiaohuochai/p/6252163.html)[视觉格式化](http://www.cnblogs.com/xiaohuochai/p/6252163.html)

&nbsp;

### 行高

【定义】

&emsp;&emsp;line-height行高是指文本行基线之间的距离。行高line-height实际上只影响行内元素和其他行内内容，而不会直接影响块级元素，也可以为一个块级元素设置line-height，但这个值只是应用到块级元素的内联内容时才会有影响。在应用到块级元素时，line-height定义了元素文本基线之间的最小距离，即最小行高

&emsp;&emsp;注意：如果块级元素中的某一个子级内联元素设置的行高比最小行高大，则行框以设置行高来渲染；如果小，则以最小行高来渲染。因为，每一个子级内联元素的行高都是行内框的高度，只有一行中所有的行内元素(包括代表父级元素的匿名文本)，最大的行内框高度才能成为整行的行高。下面会有详细解释

&emsp;&emsp;值: &lt;length&gt; | &lt;percentage&gt; | &lt;number&gt; | normal | inherit

&emsp;&emsp;初始值: normal(通常line-height:normal的值为font-size值的1.2倍)

&emsp;&emsp;应用于: 所有元素

&emsp;&emsp;继承性: 有

&emsp;&emsp;百分数: 相对于元素的字体大小font-size

![lineHeight](https://pic.xiaohuochai.site/blog/CSS_layout_lineHeight.jpg)

<iframe style="width: 100%; height: 320px;" src="https://demo.xiaohuochai.site/css/lineheight/l1.html" frameborder="0" width="320" height="240"></iframe>

【术语】

&emsp;&emsp;要深入理解line-height，需要理解关于行框构建的常用术语。

**内容区**

&emsp;&emsp;对于行内非替换元素或匿名文本某一部分，font-size确定了内容区的高度

<div><img src="https://pic.xiaohuochai.site/blog/CSS_layout_emFrame.jpg" alt="emFrame"></div>

**行内框**

&emsp;&emsp;内容区加上行间距等于行内框。如果一个行内非替换元素的font-size为15px，line-height为21px，则相差6px。用户代理将这6像素一分为二，将其一半分别应用到内容区的顶部和底部，这就得到了行内框

<div><img src="https://pic.xiaohuochai.site/blog/CSS_layout_contentBox.jpg" alt="contentBox"></div>

&nbsp;

&emsp;&emsp;当line-height小于font-size时，行内框实际上小于内容区

<div><img src="https://pic.xiaohuochai.site/blog/CSS_layout_littleInrowFrame.jpg" alt="littleInrowFrame"></div>

**行框**

&emsp;&emsp;行框定义为行中最高行内框的顶端到最低行内框底端之间的距离，而且各行框的顶端挨着上一行行框的底端

<div><img src="https://pic.xiaohuochai.site/blog/CSS_layout_rowFrame.jpg" alt="rowFrame"></div>


**框属性**

&emsp;&emsp;内边距、外边距和边框不影响行框的高度，即不影响行高

&emsp;&emsp;行内元素的边框边界由font-size而不是line-height控制

&emsp;&emsp;外边距不会应用到行内非替换元素的顶端和底端

&emsp;&emsp;margin-left、padding-left、border-left应用到元素的开始处；而margin-right、padding-right、border-right应用到元素的结尾处

<iframe style="width: 100%; height: 370px;" src="https://demo.xiaohuochai.site/css/lineheight/l2.html" frameborder="0" width="320" height="240"></iframe>

【替换元素】

&emsp;&emsp;行内替换元素需要使用line-height值，从而在垂直对齐时能正确地定位元素。因为vertical-align的百分数值是相对于元素的line-height来计算的。对于垂直对齐来说，图像本身的高度无关紧要，关键是line-height的值

&emsp;&emsp;默认地，行内替换元素位于基线上。如果向替换元素增加下内边距、外边距或边框，内容区会上移。替换元素的基线是正常流中最后一个行框的基线。除非，该替换元素内容为空或者本身的overflow属性值不是visible，这种情况下基线是margin底边缘

&nbsp;

### 垂直对齐

【定义】

&emsp;&emsp;vertical-align用来设置垂直对齐方式，所有垂直对齐的元素都会影响行高

&emsp;&emsp;值: baseline | sub | super | top | text-top | middle | bottom | text-bottom | &lt;length&gt; | &lt;percentage&gt; | inherit

&emsp;&emsp;初始值: baseline

&emsp;&emsp;应用于: 行内元素、替换元素、表单元格

&emsp;&emsp;继承性: 无

&emsp;&emsp;百分数: 相对于元素的行高line-height

&emsp;&emsp;注意：IE7-浏览器中vertical-align的百分比值不支持小数行高，且取baseline、middle、text-bottom等值时与标准浏览器在展示效果不一样，常用的解决办法是将行内元素设置display:inline-block

<div>
<pre>vertical-align:baseline(元素的基线与父元素的基线对齐)
vertical-align:sub(降低元素的基线到父元素合适的下标位置)
vertical-align:super(升高元素的基线到父元素合适的上标位置)
vertical-align:bottom(把对齐的子元素的底端与行框底端对齐)
vertical-align:text-bottom(把元素的底端与父元素内容区域的底端对齐)
vertical-align:top(把对齐的子元素的顶端与行框顶端对齐)
vertical-align:text-top(把元素的顶端与父元素内容区域的顶端对齐)
vertical-align:middle(元素的中垂点与父元素的基线加1/2父元素中字母X的高度对齐)
vertical-align:(+-n)px(元素相对于基线上下偏移npx)
vertical-align:x%(相对于元素的line-height值)
vertical-align:inherit(从父元素继承vertical-align属性的值)</pre>
</div>

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/lineheight/l3.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;注意：&lt;sub&gt;和&lt;sup&gt;默认携带样式vertical-align:sub/super

<iframe style="width: 100%; height: 466px;" src="https://demo.xiaohuochai.site/css/lineheight/l4.html" frameborder="0" width="320" height="240"></iframe>

【inline-block底部空隙】

&emsp;&emsp;inline-block元素在块级元素中留空隙就是因为图像的默认垂直对齐方式是基线对齐(基线对齐在原理上相当于图像底边与匿名文本大写英文字母X的底边对齐)；而匿名文本是有行高的，继承父级元素设置的行高，默认为normal(即font-size的1.2倍)，所以X的底边距离行框有一段距离，这段距离就是图像留出的空隙

&emsp;&emsp;于是，解决这个问题有以下几个解决办法

&emsp;&emsp;1、display:block

&emsp;&emsp;因为垂直对齐方式只能作用于替换元素和行内元素，更改为块级元素，会使垂直对齐方式失效

&emsp;&emsp;2、父级的line-height: 0

&emsp;&emsp;这样使匿名文本与行框的距离为0

&emsp;&emsp;3、vertical-align: top/middle/bottom

<iframe style="width: 100%; height: 372px;" src="https://demo.xiaohuochai.site/css/lineheight/l5.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 应用

**【1】单行文本水平垂直居中**

<div>
<pre>div{
    line-height: 100px;
    width: 100px;
    text-align: center;
    border: 1px solid black;
}</pre>
</div>
<div>
<pre>&lt;div&gt;测试文字&lt;/div&gt;</pre>
</div>

&emsp;&emsp;注意：好多地方都写着单行文本垂直居中是将高度和行高设置成一样的值，但高度其实是没有必要设置的。仅仅设置行高就可以，文字在一行中本身就是垂直居中显示的

<iframe style="width: 100%; height: 160px;" src="https://demo.xiaohuochai.site/css/lineheight/l6.html" frameborder="0" width="320" height="240"></iframe>

**【2】图片近似垂直居中**

<div>
<pre>div{
    line-height: 200px;
    text-align: center;
}
img{
    vertical-align: middle;
}</pre>
</div>
<div>
<pre>&lt;div&gt;
    &lt;img src="#" alt="#"&gt;
&lt;/div&gt;</pre>
</div>

&emsp;&emsp;由于字符X在em框中并不是垂直居中的，且各个字体的字符X的高低位置不一致。所以，当字体大小较大时，这种差异就更明显

&emsp;&emsp;注意：IE7浏览器在写块级元素包含行内元素时一定要写成换行写法，而不要写在一行

<div>
<pre>//正确1
&lt;div&gt;
    &lt;img src="#" alt="#"&gt;
&lt;/div&gt;
//正确2
&lt;div&gt;&lt;img src="#" alt="#"&gt;&lt;!-- 这里要折行或空格 --&gt;
&lt;/div&gt;
//错误
&lt;div&gt;&lt;img src="#" alt="#"&gt;&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 352px;" src="https://demo.xiaohuochai.site/css/lineheight/l7.html" frameborder="0" width="320" height="240"></iframe>

**【3】图片完全垂直居中**

&emsp;&emsp;在方法2的基础上设置块级元素的font-size为0，则可以设置图片完全垂直居中

<div>
<pre>div{
    line-height: 200px;
    text-align: center;
    font-size: 0;
}
img{
    vertical-align: middle;
}</pre>
</div>
<div>
<pre>&lt;div&gt;
    &lt;img src="#" alt="#"&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 260px;" src="https://demo.xiaohuochai.site/css/lineheight/l8.html" frameborder="0" width="320" height="240"></iframe>

**【4】多行文本水平垂直居中**

&emsp;&emsp;由于方法3设置font-size为0的局限性，块级元素里面无法放置文本。方法4主要通过新增元素来实现垂直居中效果，该方法也可用于图片的水平垂直居中

<div>
<pre>div{
    height: 100px;
    width: 200px;
    background-color: pink;
    text-align: center;
}
span{
    display:inline-block;
    vertical-align: middle;
    line-height: 20px;
    width: 100px;
}    
i{
    display: inline-block;
    height: 100%;
    vertical-align: middle;
}</pre>
</div>
<div>
<pre>    &lt;div&gt;
        &lt;i&gt;&lt;/i&gt;&lt;span&gt;我是特别长的特别长的特别长的特别长的多行文字&lt;/span&gt;
    &lt;/div&gt;    </pre>
</div>

<iframe style="width: 100%; height: 230px;" src="https://demo.xiaohuochai.site/css/lineheight/l9.html" frameborder="0" width="320" height="240"></iframe>

**【5】图标和文本对齐**

**1、使用长度负值**

<div>
<pre>img{
    vertical-align: -5px;
}</pre>
</div>

&emsp;&emsp;根据实践经验，20*20像素的图标后面跟14px的文字，vertical-align设置为-5px可以达到比较好的对齐效果

**2、使用文本底部对齐**

<div>
<pre>img{
    vertical-align: text-bottom;
}</pre>
</div>

&emsp;&emsp;使用baseline会使图标偏上；使用top/bottom会受到其他行内元素影响造成定位偏差；使用middle需要恰好的字体大小且兼容性不高；使用text-bottom较合适，不受行高及其他内联元素影响

<iframe style="width: 100%; height: 306px;" src="https://demo.xiaohuochai.site/css/lineheight/l10.html" frameborder="0" width="320" height="240"></iframe>
