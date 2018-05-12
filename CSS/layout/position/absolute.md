# 深入理解CSS绝对定位absolute

&emsp;&emsp;前面已经介绍了定位的[偏移](http://www.cnblogs.com/xiaohuochai/p/5289143.html)和[层叠](http://www.cnblogs.com/xiaohuochai/p/5304619.html)，例子中大量的应用了绝对定位。因为相较于相对定位和固定定位，绝对定位在实际中应用频率更高、应用场景更广泛。本文将介绍使用绝对定位时的具体细节

&nbsp;

### 定义

&emsp;&emsp;当元素绝对定位时，会从文档流中完全删除。元素位置相对于最近的已定位祖先元素，如果元素没有已定位的祖先元素，那么它的位置相对于初始包含块document，其边界根据偏移属性放置。元素定位后生成一个块级框，而不论原来它在正常流中生成何种类型的框。定位元素不会流入其他元素的内容，反之亦然。

&emsp;&emsp;注意：如果文档可滚动，绝对定位元素会随着它滚动，因为元素最终会相对于正常流的某一部分定位。

&emsp;&emsp;//滚动滚动条时会发现，绝对定位元素会随着其滚动，但固定定位不会

<iframe style="width: 100%; height: 200px;" src="https://demo.xiaohuochai.site/css/absolute/a1.html" frameborder="0" width="320" height="240"></iframe>

### 特性

&emsp;&emsp;absolute和float都可以触发元素的BFC属性，且都具有包裹性和破坏性，所以对于一些应用场景，这两个属性可以进行替换。[关于float属性的详细信息移步至此](http://www.cnblogs.com/xiaohuochai/p/5243735.html)

【1】包裹性

&emsp;&emsp;元素绝对定位后，会为其后代元素建立一个包含块。且若该绝对定位元素不设置宽度，宽度由内容撑开。

&emsp;&emsp;注意：浮动的包含块会延伸，进而包含所有后代浮动元素，但绝对定位的包含块并不会包含后代的定位元素，只是作为后代定位元素的定位父级

<iframe style="width: 100%; height: 318px;" src="https://demo.xiaohuochai.site/css/absolute/a2.html" frameborder="0" width="320" height="240"></iframe>

【2】破坏性

&emsp;&emsp;元素绝对定位后，会脱离文档流，若父级不设置高度，则父级高度塌陷；若父级为行内元素，无其他内容，则父级宽度也将塌陷

&emsp;&emsp;//父级元素有10px的padding，且背景颜色为天蓝色

<iframe style="width: 100%; height: 397px;" src="https://demo.xiaohuochai.site/css/absolute/a3.html" frameborder="0" width="320" height="240"></iframe>

【3】去浮动

&emsp;&emsp;元素绝对定位后，元素原来的浮动效果将失效

<iframe style="width: 100%; height: 227px;" src="https://demo.xiaohuochai.site/css/absolute/a4.html" frameborder="0" width="320" height="240"></iframe>

【4】偏移特性

&emsp;&emsp;如果使用top、right、bottom、left这4个偏移特性来描述元素4个边的放置位置，那么元素的高度和宽度将由这些偏移隐含确定，元素将会拉伸

&emsp;&emsp;使用偏移属性拉伸的绝对定位元素，其内部元素支持百分比width/height值。通常情况下，元素高度百分比要想起作用，需要父级窗口的高度值不是auto；但是如果容器由绝对定位拉伸形成，百分比高度值也是支持的

<iframe style="width: 100%; height: 489px;" src="https://demo.xiaohuochai.site/css/absolute/a5.html" frameborder="0" width="320" height="240"></iframe>

### display

&emsp;&emsp;当元素绝对定位后，元素可以改变display属性，但各浏览器解析不一致

&emsp;&emsp;【1】IE8+浏览器解析正常

&emsp;&emsp;【2】firefox和safari浏览器只有切换为display:none时才会重新渲染，其他值相互切换时无效

&emsp;&emsp;【3】chrome浏览器切换到display:inline时渲染无效，其他值相互切换时渲染正常

&emsp;&emsp;【4】IE7-浏览器将绝对定位的元素全部渲染为inline-block元素，只有切换为display:none时才会重新渲染，其他值相互切换时无效

&emsp;&emsp;注意：解决IE7-浏览器绝对定位元素渲染为inline-block元素的bug很简单，只需要在绝对定位的元素外面套一个空的&lt;div&gt;即可

<div>
<pre>&lt;div&gt;
    &lt;div style="position:absolute"&gt;&lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="line-height: 1.5; width: 100%; height: 242px;" src="https://demo.xiaohuochai.site/css/absolute/a6.html" frameborder="0" width="320" height="240"></iframe>

### clip

&emsp;&emsp;绝对定位或固定定位元素才可以使用clip属性。绝对定位元素常配合clip属性达到元素隐藏的效果。[关于clip属性的详细信息移步至此](http://www.cnblogs.com/xiaohuochai/p/5285752.html)

<div>
<pre>.hide{
    position:absolute;
    clip: rect(0,0,0,0);
}</pre>
</div>

&nbsp;

### 静态位置

&emsp;&emsp;当元素绝对定位后，若该元素的格式化属性不发生变化，则该元素处于静态位置。[关于绝对定位元素格式化的相关内容移步至此](http://www.cnblogs.com/xiaohuochai/p/5289143.html#anchor5)。元素的静态位置是指元素在正常流中原本的位置，更确切的讲，顶端的静态位置是从包含块的上边界到假想框的上外边距边界之间的距离。假想框是假设元素position属性为static时元素的第一个框。

&emsp;&emsp;但对于居中对齐的行内元素来说，将元素设置为absolute或fixed会发生静态位置跳动问题。而relative或static则不会有此问题。这是因为元素默认的居中对齐是元素的内容中线对应父级块级元素中线，而当元素绝对定位或固定定位之后，定位元素左边界将与其父级块级元素的中线对齐。

<iframe style="width: 100%; height: 218px;" src="https://demo.xiaohuochai.site/css/absolute/a7.html" frameborder="0" width="320" height="240"></iframe>

### overflow

&emsp;&emsp;当overflow在绝对定位元素和其包含块之间时，绝对定位元素不会被父级overflow属性剪裁。[关于overflow失效解决方法移步至此](http://www.cnblogs.com/xiaohuochai/p/5289653.html#anchor3)

<iframe style="width: 100%; height: 295px;" src="https://demo.xiaohuochai.site/css/absolute/a8.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;可以应用绝对定位元素的overflow属性失效实现按钮外置的效果

<div>
<pre>.box{
    width: 100px;
    height: 100px;
    overflow: auto;
}    
.in{
    width: 100%;
    display: inline-block;
    height: 200px;
    background-color: pink;
}
.close{
    position:absolute;
    margin: 0 0 0 -20px;
    font-size: 20px;
    line-height: 20px;
    border: 2px solid;
    border-radius: 50%;
    cursor:pointer;
}</pre>
</div>
<div>
<pre>&lt;div class="box"&gt;
    &lt;div class="in"&gt;测试内容&lt;/div&gt;&lt;!--             
     --&gt;&lt;span class="close"&gt;&amp;times;&lt;/span&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/absolute/a9.html" frameborder="0" width="320" height="240"></iframe>

