# CSS混合模式

&emsp;&emsp;<a href="http://www.cnblogs.com/xiaohuochai/p/5304619.html" target="_blank">层叠上下文z-index</a>只是解决两个元素覆盖，谁离用户更近的问题。而CSS混合模式，则是处理两个元素覆盖部分如何混合的问题。如果了解photoshop的话，对这种现象应该不陌生。CSS3有两个与混合模式相关的属性：`mix-blend-mode`和`background-blend-mode`，本文将详细介绍CSS混合模式




<p>&nbsp;</p>


### 元素混合

&emsp;&emsp;元素混合mix-blend-mode应用于两个元素之间的混合

<p><strong>mix-blend-mode</strong></p>

&emsp;&emsp;初始值: normal

&emsp;&emsp;应用于: 所有元素

&emsp;&emsp;继承性: 无

&emsp;&emsp;值: normal(正常) | multiply(正片叠底) | screen(滤色) | overlay(叠加) | darken(变暗) | lighten(变亮) | color-dodge(颜色减淡) | color-burn(颜色加深) | hard-light(强光) | soft-light(柔光) | difference(差值) | exclusion(排除) | hue(色相) | saturation(饱和度) | color(颜色) | luminosity
(亮度) | initial(初始) | inherit(继承) | unset(复原)

&emsp;&emsp;兼容性: IE浏览器、android4.4-不支持，safari和IOS需要添加-webkit-前缀

&emsp;&emsp;注意：该元素会创建层叠上下文，z-index属性有效



<iframe style="width: 100%; height: 180px" src="https://demo.xiaohuochai.site/css/mode/m1.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


### 背景混合

&emsp;&emsp;背景混合background-blend-mode应用于一个元素的多背景图或背景图与背景颜色之间的混合

<p><strong>background-blend-mode</strong></p>

&emsp;&emsp;初始值: normal

&emsp;&emsp;应用于: 所有元素

&emsp;&emsp;继承性: 无

&emsp;&emsp;值: normal(正常) | multiply(正片叠底) | screen(滤色) | overlay(叠加) | darken(变暗) | lighten(变亮) | color-dodge(颜色减淡) | color-burn(颜色加深) | hard-light(强光) | soft-light(柔光) | difference(差值) | exclusion(排除) | hue(色相) | saturation(饱和度) | color(颜色) | luminosity
(亮度) | initial(初始) | inherit(继承) | unset(复原)

&emsp;&emsp;兼容性: IE浏览器、android4.4-不支持，safari和IOS需要添加-webkit-前缀

<iframe style="width: 100%; height: 180px" src="https://demo.xiaohuochai.site/css/mode/m2.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>



<p>&nbsp;</p>


### 隔离

&emsp;&emsp;隔离isolation的作用是创建一个堆叠上下文stacking context，主要用于与mix-blend-mode属性一起使用时，将混合模式只应用于某一个元素或某一组元素

<p><strong>isolation</strong></p>

&emsp;&emsp;初始值: auto

&emsp;&emsp;应用于: 所有元素

&emsp;&emsp;继承性: 无

&emsp;&emsp;值: auto | isolate(创建新的堆叠上下文) | initial | inherit | unset

    <style>
    body{background-color: gray;}
    .test1,.test2{display: inline-block;width: 100px;height: 100px;border:1px solid black;}
    .test2{isolation: isolate;}
    .in{width: 50px;height: 50px;background-color: red;mix-blend-mode: screen;}
    </style>
    </head>
    <body>
    <div class="test1">
        <div class="in"></div>
    </div>
    <div class="test2">
        <div class="in"></div>
    </div>

<iframe style="width: 100%; height: 150px" src="https://demo.xiaohuochai.site/css/mode/m3.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

&emsp;&emsp;如果不使用`isolation: isolate`创建堆叠上下文，由于`.test1`和`.test2`背景颜色透明，则`.in`会和`<body>`背景颜色混合，成为粉色。使用`isolation: isolate`后，`.test2`从`<body>`中隔离出来，不与`<body>`的背景进行混合，从而保留其原先的红色

&emsp;&emsp;注意：由于`isolation: isolate`的作用就是创建堆叠上下文，所以只要能<a href="http://www.cnblogs.com/xiaohuochai/p/5304619.html#anchor5" target="_blank">创建堆叠上下文</a>，就可以实现隔离的效果，所以，类似地，relative、filter等样式也可以实现类似效果

