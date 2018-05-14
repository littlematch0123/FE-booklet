# CSS滤镜

&emsp;&emsp;CSS滤镜filter用于模糊、锐化、元素变色等操作， 通常适用于图片、背景等。本文将详细介绍CSS滤镜filter

<p>&nbsp;</p>


### 语法
<p><strong>filter</strong></p>

&emsp;&emsp;初始值: none

&emsp;&emsp;应用于: 所有元素

&emsp;&emsp;继承性: 无

&emsp;&emsp;值: none | blur() | brightness() | contrast() | drop-shadow() | grayscale() | hue-rotate() | invert() | opacity() | saturate() | sepia() | url()


&emsp;&emsp;兼容性: IE浏览器及android4.3-浏览器不支持，android4.4+需要添加-webkit-前缀

&emsp;&emsp;注意：使用空格分隔多个滤镜。滤镜通常使用百分比(如：75%)，也可以使用小数来表示(如：0.75)

 
<p>&nbsp;</p>


### 灰度

<p><strong>grayscale</strong></p>

&emsp;&emsp;通过使用灰度grayscale，会把图片变成灰色。值为100%则完全转为灰度图像，值为0%图像无变化，默认是0


<iframe style="width: 100%; height: 220px" src="https://demo.xiaohuochai.site/css/filter/f1.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>



<p>&nbsp;</p>

### 饱和度

<p><strong>saturate</strong></p>

&emsp;&emsp;值为0%则是完全不饱和，值为100%则图像无变化。超过100%的值是允许的，表示更高的饱和度。若值未设置，值默认是1

 <iframe style="width: 100%; height: 220px" src="https://demo.xiaohuochai.site/css/filter/f2.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


 <p>&nbsp;</p>
 
 
### 褐色

<p><strong>sepia</strong></p>

&emsp;&emsp;使用sepia将图像转换为深褐色。值为100%完全是深褐色的，值为0%图像无变化。若未设置，值默认是0


<iframe style="width: 100%; height: 220px" src="https://demo.xiaohuochai.site/css/filter/f3.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


<p>&nbsp;</p>
 
 
### 色相

<p><strong>hue-rotate</strong></p>

&emsp;&emsp;通过hue-rotate给图像应用色相旋转。"angle"一值设定图像会被调整的色环角度值。值为0deg，则图像无变化。若值未设置，默认值是0deg。该值虽然没有最大值，但超过360deg的值相当于又绕一圈

<iframe style="width: 100%; height: 220px" src="https://demo.xiaohuochai.site/css/filter/f4.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>



<p>&nbsp;</p>

### 反色

<p><strong>invert</strong></p>

&emsp;&emsp;通过invert反转输入图像。100%表示完全反转，值为0%则图像无变化。若值未设置，值默认是0

<iframe style="width: 100%; height: 220px" src="https://demo.xiaohuochai.site/css/filter/f5.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


<p>&nbsp;</p>


### 透明度

<p><strong>opacity</strong></p>

&emsp;&emsp;通过opacity表示图像的透明程度。值为0%则是完全透明，值为100%则图像无变化。若值未设置，值默认是1。该函数与已有的opacity属性很相似，不同之处在于通过filter，一些浏览器为了提升性能会提供硬件加速


<iframe style="width: 100%; height: 220px" src="https://demo.xiaohuochai.site/css/filter/f6.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


<p>&nbsp;</p>


### 亮度

<p><strong>brightness</strong></p>

&emsp;&emsp;通过调整亮度brightness使其看起来更亮或更暗。如果值是0%，图像会全黑。值是100%，则图像无变化。值超过100%也是可以的，图像会比原来更亮。如果没有设定值，默认是1

<iframe style="width: 100%; height: 220px" src="https://demo.xiaohuochai.site/css/filter/f7.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


<p>&nbsp;</p>

### 对比度

<p><strong>contrast</strong></p>

&emsp;&emsp;图像的对比度contrast，值是0%的话，图像会全灰。值是100%，图像不变。值可以超过100%，意味着会运用更低的对比度。若没有设置值，默认是1

<iframe style="width: 100%; height: 220px" src="https://demo.xiaohuochai.site/css/filter/f8.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>



<p>&nbsp;</p>

### 模糊

<p><strong>blur</strong></p>

&emsp;&emsp;通过blur给图像设置高斯模糊。"radius"一值设定高斯函数的标准差，或者是屏幕上以多少像素融在一起，所以值越大越模糊。如果没有设定值，则默认是0；这个参数可设置css长度值，但不接受百分比值

<iframe style="width: 100%; height: 220px" src="https://demo.xiaohuochai.site/css/filter/f9.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


<p>&nbsp;</p>

### 阴影

<p><strong>drop-shadow</strong></p>

&emsp;&emsp;drop-shadow(h-shadow v-shadow blur spread color)用来给图像设置一个阴影效果。阴影是合成在图像下面，可以有模糊度的，可以以特定颜色画出的遮罩图的偏移版本。函数接受`<shadow>`(在CSS3背景中定义)类型的值，除了"inset"关键字是不允许的。该函数与已有的box-shadow属性很相似；不同之处在于，通过滤镜，一些浏览器为了更好的性能会提供硬件加速


`<shadow>`参数如下：

    <offset-x><offset-y>(必须)   这是设置阴影偏移量的两个<length>值。<offset-x>设定水平方向距离，<offset-y>设定垂直距离。如果两个值都是0，则阴影出现在元素正后面
    <blur-radius>(可选)          这是第三个<length>值。值越大，越模糊，则阴影会变得更大更淡。不允许负值。若未设定，默认是0(则阴影的边界很锐利)
    <spread-radius>(可选)        这是第四个<length>值。正值会使阴影扩张和变大，负值会使阴影缩小。若未设定，默认是0(阴影会与元素一样大小)
    <color>(可选)                查看<color>该值可能的关键字和标记。若未设定，颜色值会应用color属性的值。另外，如果颜色值省略，WebKit中阴影是透明的

<iframe style="width: 100%; height: 300px" src="https://demo.xiaohuochai.site/css/filter/f10.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

&emsp;&emsp;虽然drop-shadow不支持内阴影，但它可以实现不规则图像的阴影，而box-shadow则无法实现

&emsp;&emsp;注意：关于盒子阴影的详细信息<a href="http://www.cnblogs.com/xiaohuochai/p/6244492.html#anchor5" target="_blank">移步至此</a>



    <style>
    body{background-color: gray;}
    .box{width: 260px;margin: 20px; padding: 20px;background-color: #fff;position: relative;font-size: 24px;line-height: 40px;}
    .cor{position: absolute;left: -29px; top:27px;border: 15px solid transparent;border-right-color: #fff;}
    .box-shadow{box-shadow: 5px 5px 10px black;}
    .drop-shadow{filter: drop-shadow(5px 5px 10px black);}
    </style>

    <div class="box box-shadow">
        <i class="cor"></i>
        box-shadow
    </div>
    <div class="box drop-shadow">
        <i class="cor"></i>
        filter: drop-shadow
    </div>

<iframe style="width: 100%; height: 230px" src="https://demo.xiaohuochai.site/css/filter/f11.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
