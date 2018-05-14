# 纹理文本

&emsp;&emsp;本文将通过多种方式实现纹理文本的效果

&nbsp;

### 背景裁切

&emsp;&emsp;对于实现纹理文本的效果，脑海中最直接能想到的办法可能是[背景裁切background-clip](http://www.cnblogs.com/xiaohuochai/p/5221936.html#anchor7)

&emsp;&emsp;使用[线性渐变](http://www.cnblogs.com/xiaohuochai/p/5370446.html)来填充文本背景

<div>
<pre>&lt;style&gt;
.box-with-text { background-image: linear-gradient(135deg,hsl(50, 100%, 70%), hsl(320, 100%, 50%)); -webkit-text-fill-color: transparent; -webkit-background-clip: text; background-size: cover;font:bolder 100px/100px Impact;position:absolute;}
&lt;/style&gt;
&lt;div class="box-with-text"&gt;match&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/vein/v1.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;下面使用一张枫叶的背景，来制作纹理文本

<div>
<pre>&lt;style&gt;
.box-with-text { background-image: url(http://7xpdkf.com1.z0.glb.clouddn.com/runjs/img/leaf.jpg); -webkit-text-fill-color: transparent; -webkit-background-clip: text; background-size: cover;font:bolder 100px/100px Impact;position:absolute;}
&lt;/style&gt;
&lt;div class="box-with-text"&gt;match&lt;/div&gt;
</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/vein/v2.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;当然了，放一张动态gif图，也是没问题的

<div>
<pre>&lt;style&gt;
.box-with-text { background: url(http://7xpdkf.com1.z0.glb.clouddn.com/runjs/img/fire.gif) 0 -130px /cover; -webkit-text-fill-color: transparent; -webkit-background-clip: text; font:bolder 100px/100px Impact;position:absolute;}
&lt;/style&gt;
&lt;div class="box-with-text"&gt;match&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/vein/v3.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;如果想要让填充动起来，可以通过[animation](http://www.cnblogs.com/xiaohuochai/p/5391663.html)移动背景的位置和尺寸来添加动画

<div>
<pre>&lt;style&gt;
@keyframes stripes {100% {background-position: 0 -50px;}}
.box-with-text {animation: stripes 2s linear infinite;background:linear-gradient(crimson 50%, #aaa 50%) 0 0/ 100% 50px ; -webkit-text-fill-color: transparent; -webkit-background-clip: text; font:bolder 100px/100px Impact;position:absolute;}
&lt;/style&gt;
&lt;div class="box-with-text"&gt;match&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/vein/v4.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;使用background-clip背景裁切的技术，文本可以被选中。但是，由于只有webkit内核的浏览器支持，因此并不是跨浏览器的好方案

&nbsp;

### SVG

&emsp;&emsp;如果要对文本纹理做更精密的设置，且考虑浏览器兼容性，最好的方案还是使用[SVG文本](http://www.cnblogs.com/xiaohuochai/p/7478261.html)

&emsp;&emsp;首先，可以通过[SVG动画](http://www.cnblogs.com/xiaohuochai/p/7498684.html)，来实现文本纹理的动态效果

<div>
<pre>&lt;svg height="100" xmlns="http://www.w3.org/2000/svg" id="svg"&gt;
  &lt;defs&gt;
    &lt;style&gt;
     .text{font:bolder 100px/100px Impact;} 
    &lt;/style&gt;  
    &lt;radialGradient id="Gradient1"&gt;
      &lt;animate attributeName="r" values="0%;150%;100%;0%" dur="5" repeatCount="indefinite" /&gt;
      &lt;stop offset="0%" stop-color="#fff"&gt;
        &lt;animate attributeName="stop-color" values="#333;#FFF;#FFF;#333" dur="5" repeatCount="indefinite" /&gt;
      &lt;/stop&gt;
      &lt;stop offset="100%" stop-color="rgba(55,55,55,0)"/&gt;
    &lt;/radialGradient&gt;
  &lt;/defs&gt;  
  &lt;text class="text" dominant-baseline="hanging" y="10" x="0" fill="url(#Gradient1)"&gt;match&lt;/text&gt;
&lt;/svg&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/vein/v5.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;使用[SVG图案pattern](http://www.cnblogs.com/xiaohuochai/p/7497096.html)，可以实现更精细的纹理动画效果

<div>
<pre>&lt;svg height="100" xmlns="http://www.w3.org/2000/svg" id="svg"&gt;
  &lt;defs&gt;
    &lt;style&gt;
      .text{font:bolder 100px/100px Impact;}   
      @keyframes stroke {
        50% {
          stroke-width:30;
          stroke-opacity: .5;
        }
      } 
      .g-spots circle{stroke-width: 0;animation: stroke 2s infinite;}
      .g-spots circle:nth-child(1) {animation-delay: -0.4s;}
      .g-spots circle:nth-child(2) {animation-delay: -1.2s;}
    &lt;/style&gt;  
  &lt;pattern id="p-spots" width="0.12" height="0.2"&gt;
    &lt;g class="g-spots"&gt;
      &lt;circle r="10" cx="10" cy="5" fill="#3F0B1B" stroke="#3F0B1B" /&gt;
      &lt;circle r="10" cx="25" cy="20" fill="#CF423C" stroke="#CF423C"/&gt; 
    &lt;/g&gt;
  &lt;/pattern&gt;
  &lt;/defs&gt;  
  &lt;text class="text" dominant-baseline="hanging" y="10" x="0" stroke="url(#p-spots)" fill="none" stroke-width="5" stroke-opacity="0.5"&gt;match&lt;/text&gt;
&lt;/svg&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/vein/v6.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;如果想实现虚线动画的效果，则需要使用SVG文本的虚线描边

<div>
<pre>&lt;svg height="100" xmlns="http://www.w3.org/2000/svg" id="svg"&gt;
  &lt;defs&gt;
    &lt;style&gt;
      @keyframes stroke {100% { stroke-dashoffset: -400;}}    
      .text{font:bolder 100px/100px Impact;} 
      .use-text{fill: none;stroke-width: 6;stroke-dasharray: 70 330;stroke-dashoffset: 0;animation: stroke 6s infinite linear;}
      .use-text:nth-child(5n+1){stroke: pink;animation-delay: -1.2s;}
      .use-text:nth-child(5n+2){stroke: lightblue;animation-delay: -2.4s;}
      .use-text:nth-child(5n+3){stroke: lightgreen;animation-delay: -3.6s;}
      .use-text:nth-child(5n+4){stroke: orange;animation-delay: -4.8s;}
      .use-text:nth-child(5n+5){stroke: tan;animation-delay: -6s;}
    &lt;/style&gt;  
  &lt;/defs&gt;  
  &lt;symbol id="s-text"&gt;
    &lt;text class="text" dominant-baseline="hanging" y="10" x="0" &gt;match&lt;/text&gt;
  &lt;/symbol&gt;  
  &lt;use xlink:href="#s-text" class="use-text"&gt;&lt;/use&gt;
  &lt;use xlink:href="#s-text" class="use-text"&gt;&lt;/use&gt;
  &lt;use xlink:href="#s-text" class="use-text"&gt;&lt;/use&gt;
  &lt;use xlink:href="#s-text" class="use-text"&gt;&lt;/use&gt;
  &lt;use xlink:href="#s-text" class="use-text"&gt;&lt;/use&gt;  
&lt;/svg&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/vein/v7.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 混合模式

&emsp;&emsp;使用CSS3的新属性[混合模式](http://www.cnblogs.com/xiaohuochai/p/6270139.html)中的元素混合mix-blend-mode属性也可以实现类似的效果。元素混合mix-blend-mode应用于两个元素之间的混合，这时就需要将文字和纹理效果分开为两个元素

<div>
<pre>&lt;style&gt;
.box-with-text { background-image: linear-gradient(135deg,hsl(50, 100%, 70%), hsl(320, 100%, 50%)); background-size: cover;font:bolder 100px/100px Impact;position:absolute;}
.text{mix-blend-mode: lighten; background:white;}
&lt;/style&gt;
&lt;div class="box-with-text"&gt;&lt;span class="text"&gt;match&lt;/span&gt;&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/vein/v8.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;关于背景为图片的效果就不再赘述，和backgroung-clip方法类似

&emsp;&emsp;但是，由于它是两个元素的混合，而不仅仅是应用背景样式。因此，其甚至可以将视频作为纹理

<div>
<pre>&lt;style&gt;
.box{position:relative;height:100px;overflow: hidden;}
.box-with-text { mix-blend-mode: lighten; background:white;font:bolder 100px/100px Impact;position:absolute;height: 200px;width: 280px;}
&lt;/style&gt;
&lt;div class="box"&gt;
  &lt;video class="box-with-text" src="http://7xpdkf.com1.z0.glb.clouddn.com/runjs/img/sunshine.mp4" width="280" height="100" autoplay loop&gt;&lt;/video&gt;
  &lt;div class="box-with-text"&gt;match&lt;/div&gt;  
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/vein/v9.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;当然，还可以是有声动画

<div>
<pre>&lt;style&gt;
.box{position:relative;height:100px;overflow: hidden;}
.box-with-text { mix-blend-mode: lighten; background:white;font:bolder 100px/100px Impact;position:absolute;height: 176px;width: 320px;}
&lt;/style&gt;
&lt;div class="box"&gt;
  &lt;video id="video1" class="box-with-text" src="http://7xpdkf.com1.z0.glb.clouddn.com/mov.mp4" width="320" height="100" loop&gt;&lt;/video&gt;
  &lt;div class="box-with-text"&gt;match&lt;/div&gt;  
&lt;/div&gt;
&lt;button onclick = 'video1.play()'&gt;播放&lt;/button&gt;
&lt;button onclick = 'video1.pause()'&gt;暂停&lt;/button&gt;</pre>
</div>

<iframe style="width: 100%; height: 150px;" src="https://demo.xiaohuochai.site/css/vein/v10.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;虽然混合模式有更大的自由度，但是由于其是CSS3的属性，IE浏览器、android4.4-不支持，safari和IOS需要添加-webkit-前缀。浏览器兼容性并不是很好

