# CSS编码技巧

&emsp;&emsp;本文将从DRY、currentColor、inherit和合理使用简写这几方面来详细介绍CSS编码技巧

&nbsp;

### DRY

&emsp;&emsp;DRY，即don`t repeat yourself，尽量减少代码重复

&emsp;&emsp;在软件开发中，保持代码的DRY和可维护性是最大的挑战之一，而这句话对CSS也是适用的。在实践中，代码可维护性的最大要素是尽量减少改动时要编辑的地方

&emsp;&emsp;灵活的CSS通常更容易扩展。在写出基础样式之后，只用极少的代码就可以扩展出不同的变体，因为仅需覆盖一些变量就可以了

&emsp;&emsp;下面这段代码在可维护性方面存在一些问题

<div>
<pre>&lt;style&gt;
div{
    width:100px;
    padding:6px 16px;
    border:1px solid #446d88;
    background:#58a linear-gradient(#77aebb,#58a);
    border-radius:4px;
    box-shadow:0 1px 5px gray;
    color:white;
    text-shadow:0 -1px 1px #335166;
    font-size:20px
    line-height 30px;
}  
&lt;/style&gt;
&lt;div&gt;YES&lt;/div&gt;  </pre>
</div>

&emsp;&emsp;效果如下

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/standard/s1.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;下面来对上面糟糕的代码一一修复

&emsp;&emsp;1、如果决定改变字号，就得同时调整行高，因为这两个属性都写成了绝对值。当某些值相互依赖时，它们的相互关系要用代码表达出来

<div>
<pre>font-size:20px;
line-height:1.5;</pre>
</div>

&emsp;&emsp;2、如果把这些长度值都改成em单位，那这些效果的值就可以都变成可缩放的了，而且是依赖字号进行缩放

<div>
<pre>padding:.3em .8em;
border:1px solid #446d88;
background:#58a linear-gradient(#77aebb,#58a);
border-radius:.2em;
box-shadow:0 .05em .25em gray;
color:white;
text-shadow:0 -.05em .05em #335166;
font-size:125%;
line-height:1.5;</pre>
</div>

&emsp;&emsp;3、颜色是另一个重要的变数。如果要改变颜色，可能需要覆盖四条声明(border-color、background、box-shadow和text-shadow)

&emsp;&emsp;其实只要把半透明的黑色或白色叠加在主色调上，即可产生主色调的亮色和暗色变体，这样就能简单地化解这个难题了

<div>
<pre>padding:.3em .8em;
border:1px solid rgba(0,0,0,0.1);
background:#58a linear-gradient(hsla(0,0%,100%,.2),transparent);
border-radius:.2em;
box-shadow:0 .05em .25em rgba(0,0,0,0.5);
color:white;
text-shadow:0 -.05em .05em rgba(0,0,0,0.5);
font-size:125%;
line-height:1.5;</pre>
</div>

&emsp;&emsp;现在只需要覆盖background-color属性，就可以得到不同颜色版本的按钮了　

<div>
<pre>.no{background-color: #c00;}
.ok{background-color: #6b0;}</pre>
</div>

<iframe style="width: 100%; height: 150px;" src="https://demo.xiaohuochai.site/css/standard/s2.html" frameborder="0" width="320" height="240"></iframe>

【代码易维护vs代码量少】

&emsp;&emsp;有时候，代码易维护和代码量少不可兼得。比如，为一个元素添加一道10px宽的边框，但左侧不加边框

<div>
<pre>border-width : 10px 10px 10px 0;</pre>
</div>

&emsp;&emsp;只要这一条声明就可以搞定了，但如果日后要改动边框的宽度，需要同时改三个地方。如果把它拆成两条声明的话，改起来就容易多了，而且可读性或许更好一些

<div>
<pre>border-width: 1px;
border-left-width: 0;</pre>
</div>

&nbsp;

### currentColor

&emsp;&emsp;在CSS3中，得到了一个特殊的颜色关键字currentColor，它是从SVG那里借鉴来的。这个关键字并没有绑定到一个固定的颜色值，而是一直被解析为color。实际上，这个特性让它成为了CSS中有史以来的第一个变量。虽然功能很有限，但它真的是个变量

&emsp;&emsp;举个例子，让所有的水平分割线自动与文本的颜色保持一致。有了currentcolor之后，只需要这样写

<div>
<pre>hr{background:currentColor;}</pre>
</div>

&nbsp;

### 继承

&emsp;&emsp;inherit可以用在任何CSS属性中，而且它总是绑定到父元素的计算值(对伪元素来说，则会取生成该伪元素的宿主元素)

&emsp;&emsp;举例来说，要把表单元素的字体设定为与页面的其他部分相同，并不需要重复指定字体瞩性，只需利用inherit的特性即可

<div>
<pre>input,select,button{font:inherit;}</pre>
</div>

&emsp;&emsp;与此类似，要把超链接的颜色设定为页面中其他文本相同，也是用inherit

<div>
<pre>a{color:inherit;}</pre>
</div>

&nbsp;

### 合理使用简写

&emsp;&emsp;以下两行CSS代码并不是等价的

<div>
<pre>background : rebeccapurple
background-color : rebeccapurple</pre>
</div>

&emsp;&emsp;不要害怕使用简写属性。合理使用简写是一种良好的防卫性编码方式，可以抵御未来的风险。当然，如果要明确地去覆盖某个具体的展开式属性并保留其他相关样式，那就需用展开式属性

<div>
<pre>background: url(tr.png) no-repeat top right / 2em 2em,
            url(br.png) no-repeat bottom right / 2em 2em,
            url(b1.png) no-repeat bottom left / 2em 2em;</pre>
</div>

&emsp;&emsp;可以简写为

<div>
<pre>background : ur1(tr.png) top right,
             url(br.png) bottom right,
             url(b1.png) bottom left;
background-size : 2em 2em;
background-repeat : no-repeat;</pre>
</div>

