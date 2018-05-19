# Bootstrap自动定位浮标

&emsp;&emsp;Affix 插件主要功能就是通过插件给某个元素（需要固定的元素）添加或删除position:fixed，实现元素在浏览器窗口的粘性固定效果。本文将详细介绍Bootstrap自动定位浮标

&nbsp;

### 基本用法

&emsp;&emsp;首先，来看一个苹果官网对自动定位浮标的应用

![bs_plug11](https://pic.xiaohuochai.site/blog/bs_plug11.gif)

&emsp;&emsp;从上面的git图中可知，Macbook一栏滚动到一定高度时，固定在窗口顶部便不再移动

&emsp;&emsp;Affix 插件可以对任何元素进行固定定位，其中比较简单的方法，就是通过自定义属性&nbsp;data&nbsp;来触发。其主要包括两个参数：

&emsp;&emsp;1、data-spy：取值 affix，表示元素是固定不变的。

&emsp;&emsp;2、data-offset：整数值，比如 90，表示元素 top 和 bottom 的值都是 90px，其包括两种方式：data-offset-top&nbsp;和&nbsp;data-offset-bottom

&emsp;&emsp;data-offset-top&nbsp;用来设置元素距离顶部的距离。比如 90，表示元素距离顶部 90px，当用户从顶部向下拖动滚动条，当滚动的距离大于 90px 时，affix 元素不再滚动，就会固定在浏览器窗口顶部

&emsp;&emsp;data-offset-bottom&nbsp;刚好与 data-offset-top 相反

<div>
<pre>&lt;div data-spy="affix" data-offset="90"&gt;affix元素&lt;/div&gt;
&lt;!-- 等价 --&gt;
&lt;div data-spy="affix" data-offset-top="90" data-offset-bottom="90"&gt;affix元素&lt;/div&gt;</pre>
</div>

【设置CSS】

&emsp;&emsp;在使用Affix插件时，必须通过 CSS 定位内容。Affix插件在三种 class 之间切换，每种 class 都呈现了特定的状态：_&nbsp;.affix、.affix-top 和 .affix-bottom_

&emsp;&emsp;1、在开始时，插件添加&nbsp;**.affix-top**&nbsp;来指示元素在它的最顶端位置。这个时候不需要任何的 CSS 定位　

&emsp;&emsp;2、当滚动经过添加了Affix的元素时，应触发实际的Affix。此时&nbsp;**.affix**&nbsp;会替代&nbsp;**.affix-top**，同时设置&nbsp;**position: fixed**（由 Bootstrap 的 CSS 代码提供）

&emsp;&emsp;这时，需要手动设置.affix，如.affix{top:0;}表示停止在窗口顶部

&emsp;&emsp;3、如果定义了底部偏移，当滚动到达该位置时，应把&nbsp;**.affix**&nbsp;替换为&nbsp;**.affix-bottom**。由于偏移是可选的，假如设置了该偏移，则要求同时设置适当的 CSS。在这种情况下，请在必要的时候添加&nbsp;**position: absolute;**

<div>
<pre>&lt;style&gt;
.test{width: 100%;height: 50px;background-color:lightgreen;}
.affix{top:0px;}
&lt;/style&gt;
&lt;/head&gt;
&lt;body style="height:1000px;" &gt;
&lt;div style="height:100px"&gt;&lt;/div&gt;
&lt;div data-spy="affix" data-offset="100" class="test"&gt;&lt;/div&gt;
&lt;/body&gt;</pre>
</div>

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/bootstrap/affix/a1.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### JS触发

&emsp;&emsp;有时候，使用该插件，其顶部和底部的高度不一定是固定的，所以在初始化时使用声明式用法不太合适。这时，使用javascript用法就显得比较灵活了，因为它不仅支持传入数字型的offset，还支持传入能够动态计算offset的function函数

<div>
<pre>&lt;script&gt;
$('#myAffix').affix({
  offset: {
    top:100,
    bottom: function () {
      return (this.bottom = $('footer').outerHeight(true))
    }
  }
})    
&lt;/script&gt;</pre>
</div>

【事件】

&emsp;&emsp;affix组件提供了6种事件，即affix和affixed各对应于3种状态(普通、top、bottom)时的事件

<div>
<pre>affix.bs.affix    在定位结束之前立即触发
affixed.bs.affix    在定位结束之后立即触发
affix-top.bs.affix    在定位元素应用affixed-top效果之前立即触发
affixed-top.bs.affix    在定位元素应用affixed-top效果之后立即触发
affix-bottom.bs.affix    在定位元素应用affixed-bottom效果之前立即触发
affixed-bottom.bs.affix    在定位元素应用affixed-bottom效果之后立即触发</pre>
</div>
<div>
<pre>&lt;style&gt;
.test{width: 100%;height: 50px;background-color:lightgreen;}
header{height: 100px;}
.affix{top:0px;}
&lt;/style&gt;
&lt;/head&gt;
&lt;body style="height:1000px;"&gt;
&lt;header&gt;&lt;/header&gt;
&lt;div data-spy="affix" class="test"&gt;&lt;/div&gt;
&lt;script&gt;
$(function(){
    $('.test').affix({
        offset:{
            top:function(){
                return (this.top = $('header').outerHeight(true))
            }
        }
    }).on('affix.bs.affix',function(){
        $(this).html('我被固定在窗口顶部');
    }).on('affix-top.bs.affix',function(){
        $(this).html('我正跟随滚动条滚动');
    })
})    
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/bootstrap/affix/a2.html" frameborder="0" width="320" height="240"></iframe>

