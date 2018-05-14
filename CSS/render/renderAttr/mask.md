# CSS遮罩mask

&emsp;&emsp;CSS遮罩是[2008年4月](https://www.webkit.org/blog/181/css-masks)由苹果公司添加到webkit引擎中的。遮罩提供一种基于像素级别的，可以控制元素透明度的能力，类似于png24位或png32位中的alpha透明通道的效果。本文将详细介绍CSS遮罩mask

### 概述

&emsp;&emsp;遮罩mask的功能就是使用透明的图片或渐变遮罩元素的背景。于是，遮罩mask与背景background非常类似，除了没有color子属性，背景background剩下的6个子属性，mask都有

&emsp;&emsp;遮罩mask是一个复合属性，包括mask-image、mask-mode、mask-repeat、mask-position、mask-clip、mask-origin、mask-size、mask-composite这8个属性

&emsp;&emsp;注意：IE浏览器不支持，webkit内核的浏览器(包括chrome、safari、IOS、android)需要添加-webkit-前缀。要特别注意的是，firefox浏览器也支持webkit-mask属性

【mask-image】

&emsp;&emsp;默认值为none，值为透明图片，或透明渐变

【mask-repeat】

&emsp;&emsp;默认值为repeat，可选值与background-repeat相同，详细情况[移步至此](http://www.cnblogs.com/xiaohuochai/p/5221936.html#anchor3)

【mask-position】

&emsp;&emsp;默认值为0 0，可选值与background-position相同，详细情况[移步至此](http://www.cnblogs.com/xiaohuochai/p/5221936.html#anchor4)

【mask-clip】

&emsp;&emsp;默认值为border-box，可选值与background-clip相同，详细情况[移步至此](http://www.cnblogs.com/xiaohuochai/p/5221936.html#anchor7)

【mask-origin】

&emsp;&emsp;默认值为border-box，可选值与background-origin相同，详细情况[移步至此](http://www.cnblogs.com/xiaohuochai/p/5221936.html#anchor6)

【mask-size】

&emsp;&emsp;默认值为auto，可选值与background-size相同，详细情况[移步至此](http://www.cnblogs.com/xiaohuochai/p/5221936.html#anchor8)

【mask-mode】

&emsp;&emsp;默认值为match-source，可选值为alpha、luminance、match-source，或者它们的组合

【mask-composite】

&emsp;&emsp;默认值为add，可选值为add、subtract、intersect、exclude

&emsp;&emsp;注意：只有firefox支持mask-mode和mask-composite

&nbsp;

### 实例

<div class="cnblogs_code">
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8"&gt;
&lt;title&gt;Document&lt;/title&gt;
&lt;style&gt;
.wrap{
    position:absolute;
    width: 400px;
    border:1px solid black;
}
#mask{
    height: 300px;
    background:url(http://sandbox.runjs.cn/uploads/rs/142/wat3wtnz/dongzhi.jpg) lightblue;
    -webkit-mask:  url(http://sandbox.runjs.cn/uploads/rs/142/wat3wtnz/mask.png) no-repeat;
    animation: 2s maskPosition infinite alternate ;
}
#mask:hover{
    animation: none;
}
@keyframes maskPosition{
    0%{-webkit-mask-position:0 0;}
    100%{-webkit-mask-position:100% 100%;}
}
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div class="wrap"&gt;
    &lt;div id="mask"&gt;&lt;/div&gt;    
&lt;/div&gt;
&lt;script&gt;
var oBox = document.getElementById('mask');
oBox.onmousemove = function(e){
    e = e || event;
    oBox.style.WebkitMaskPosition=(e.clientX-50)+"px "+ (e.clientY-50)+"px";
}    
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
</div>

<iframe style="width: 100%; height: 320px;" src="https://demo.xiaohuochai.site/css/mask/m1.html" frameborder="0" width="320" height="240"></iframe>
