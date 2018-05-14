# CSS背景效果

&emsp;&emsp;本文将详细介绍CSS背景效果

&nbsp;

### 条纹背景

【双条纹背景】

<div>
<pre>  background:linear-gradient(#fb3 50%, #58a 50%);
  background-size: 100% 30px;</pre>
</div>

&emsp;&emsp;CSS标准规定：如果某个色标的位置值比整个列表中在它之前的色标的位置值都要小，则该色标的位置值会被设置为它前面所有色标位置值的最大值

&emsp;&emsp;因此，第二个色标值可以设置为0

<div>
<pre>  background:linear-gradient(#fb3 50%, #58a 0);
  background-size: 100% 30px;  </pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/css/bgshow/b1.html" frameborder="0" width="320" height="240"></iframe>

【多条纹背景】

&emsp;&emsp;如果要创建超过两种颜色的条纹，也是很容易的

<div>
<pre>background:linear-gradient(#fb3 33.3%, #58a 0, #58a 66.6%, yellowgreen 0);
background-size: 100% 45px;  </pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/css/bgshow/b2.html" frameborder="0" width="320" height="240"></iframe>

【垂直条纹】

&emsp;&emsp;垂直条纹的代码跟水平条纹几乎是一样的，差别主要在于需要在开头加上一个额外的参数来指定渐变的方向，然后把background-size的值颠倒一下

<div>
<pre>  background:linear-gradient(to right,#fb3 50%, #58a 0);
  background-size: 30px 100% ;  </pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/css/bgshow/b3.html" frameborder="0" width="320" height="240"></iframe>

【45度斜向条纹】

&emsp;&emsp;思路如下：单个贴片包含四个条纹，只有这样才能做到无缝拼接

<div>
<pre>  background:linear-gradient(45deg,#fb3 25%, #58a 0,#58a 50%,#fb3 0, #fb3 75%, #58a 0);
  background-size: 30px 30px;  </pre>
</div>

&emsp;&emsp;使用循环渐变更加简单

<div>
<pre>background:repeating-linear-gradient(45deg,#fb3, #fb3 15px, #58a 0,#58a 30px);</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/css/bgshow/b4.html" frameborder="0" width="320" height="240"></iframe>

【任意角度斜向条纹】

<div>
<pre>background:repeating-linear-gradient(60deg,#fb3, #fb3 15px, #58a 0,#58a 30px);</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/css/bgshow/b5.html" frameborder="0" width="320" height="240"></iframe>

【同色系条纹】

&emsp;&emsp;在大多数情况下，我们想要的条纹图案并不是由差异极大的几种颜色组成的，这些颜色往往属于同一色系，只是在明度方面有着轻微的差异&nbsp;

<div>
<pre>background:repeating-linear-gradient(60deg,#79b, #79b 15px, #58a 0,#58a 30px);</pre>
</div>

&emsp;&emsp;但是，这两种颜色之间的关系在代码中并没有体现出来。此外，如果想要改变这个条纹的主色调，甚至需要修改四处

&emsp;&emsp;一种更好的方法是不再为每种条纹单独指定颜色，而是把最深的颜色指定为背景色，同时把半透明白色的条纹叠加在背景色之上来得到浅色条纹

<div>
<pre>  background: #58a;
  background-image:repeating-linear-gradient(30deg,hsla(0,0%,100%,.1), hsla(0,0%,100%,.1) 15px, transparent 0,transparent 30px);  </pre>
</div>

&emsp;&emsp;现在只需要修改一个地方就可以改变所有颜色了。还得到了一个额外的好处，对于那些不支持css渐变的浏览器来说，这里的背景色还起到了回退的作用

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/css/bgshow/b6.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 网格背景

【桌布效果】

&emsp;&emsp;把多个渐变图案组合起来，让它们透过彼此的透明区域显现时，就会形成各种网格。例如，把水平和垂直的条纹叠加起来，得到桌布图案

<div>
<pre>  background: white;
  background-image:linear-gradient(90deg,rgba(200,0,0,.5) 50%, transparent 0),linear-gradient(rgba(200,0,0,.5) 50%, transparent 0);
  background-size: 30px 30px;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/css/bgshow/b8.html" frameborder="0" width="320" height="240"></iframe>

【图纸辅助线】

&emsp;&emsp;某些情况下，希望网格中每个格子的大小可以调整，而网格线条的粗细同时保持固定。例如，类似图纸辅助线的网格

<div>
<pre>  background: #58a;
  background-image:linear-gradient(90deg,white 1px, transparent 0),linear-gradient(white 1px, transparent 0);
  background-size: 30px 30px;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/css/bgshow/b9.html" frameborder="0" width="320" height="240"></iframe>

【蓝图网格】

&emsp;&emsp;甚至可以把两幅不同线宽、不同颜色的网格图案叠加起来，得到一个更加逼真的蓝图网格

<div>
<pre>  background: #58a;
  background-image:linear-gradient(90deg,white 2px, transparent 0),linear-gradient(white 2px, transparent 0),linear-gradient(90deg,hsla(0,0%,100%,0.3) 1px, transparent 0),linear-gradient(hsla(0,0%,100%,0.3) 1px, transparent 0);
  background-size: 75px 75px,75px 75px,15px 15px,15px 15px;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/css/bgshow/b10.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 波点背景

【圆点阵列】

&emsp;&emsp;前面，一直在用线性渐变生成图案。但是，径向渐变同样也是非常实用的，因为它允许创建圆形、椭圆，或是它们的一部分。径向渐变能够创建的最简单的图案是圆点阵列

<div>
<pre>  background: #655;
  background-image:radial-gradient(tan 30%,transparent 0);
  background-size: 30px 30px;  </pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/css/bgshow/b11.html" frameborder="0" width="320" height="240"></iframe>

【波点图案】

&emsp;&emsp;可以生成两层圆点阵列图案，并把它们的背景定位错开，这样就可以得到真正的波点图案

<div>
<pre>  background: #655;
  background-image:radial-gradient(tan 30%,transparent 0),radial-gradient(tan 30%,transparent 0);
  background-size: 30px 30px;
  background-position: 0 0 ,15px 15px;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/css/bgshow/b12.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;为了达到效果，第一层背景的偏移定位值必须是贴片宽高的一半。这意味着如果要改动贴片的尺寸，需要修改四处

&emsp;&emsp;最好使用SASS将它转换成mixin

<div>
<pre>@mixin polka($size,$dot,$base,$accent){
  background: $base;
  background-image:radial-gradient($accent $dot,transparent 0),radial-gradient($accent $dot,transparent 0);
  background-size: $size $size;
  background-position: 0 0 ,$size/2 $size/2;  
}  

@include polka(30px,30%,$655,tan);  </pre>
</div>

&nbsp;

### 棋盘背景

&emsp;&emsp;棋盘图案在很多场景下都会用到。比如说，相对于单调的纯色背景来说，具有细微对比度的棋盘图案可能就是一个有趣的替代品。在各种应用程序的界面中，灰色的棋盘图案已经是用于表示透明色的事实标准

【CSS】

<div>
<pre>  background:#eee;
  background-image: linear-gradient(45deg,#bbb 25%,transparent 0),linear-gradient(45deg,transparent 75%,#bbb 0),linear-gradient(45deg,#bbb 25%,transparent 0),linear-gradient(45deg,transparent 75%,#bbb 0);
  background-size: 30px 30px;
  background-position: 0 0 ,15px 15px,15px 15px,30px 30px;</pre>
</div>

&emsp;&emsp;这段代码还可以稍稍优化，可以把这些处在贴片顶角的三角形两两组合起来(即把第一组和第二组合并为一层渐变，把第三组和第四组合并为一层渐变)，然后还可以把深灰色改成半透明的黑色&mdash;&mdash;这样只需要修改底色就可以改变整个棋盘的色调，不需要单独调整各层渐变的色标了&nbsp;

<div>
<pre>  background:#eee;
  background-image: linear-gradient(45deg,rgba(0,0,0,0.25) 25%,transparent 0,transparent 75%,rgba(0,0,0,0.25) 0),linear-gradient(45deg,rgba(0,0,0,0.25) 25%,transparent 0,transparent 75%,rgba(0,0,0,0.25) 0);
  background-size: 30px 30px;
  background-position: 0 0 ,15px 15px;</pre>
</div>

&emsp;&emsp;下面来使用SASS的mixin来简化代码

<div>
<pre>  @mixin checkerboard($size,$base,$accent:rgba(0,0,0,0.25)){
    background:$base;
    background-image: linear-gradient(45deg,$accent 25%,transparent 0,transparent 75%,$accent 0),linear-gradient(45deg,$accent 25%,transparent 0,transparent 75%,$accent 0);
    background-size: 2*$size 2*$size;
    background-position: 0 0 ,$size $size;    
  }
  @inclue checkerboard(15px,#58a,tan);</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/css/bgshow/b13.html" frameborder="0" width="320" height="240"></iframe>

【SVG】

&emsp;&emsp;这样的代码量不能算少，所以转到SVG方案可能是更好的选择&nbsp;

<div>
<pre>&lt;svg xmlns="http//www.w3.org/2000/svg" width="100" height="100" fill-opacity=".25"&gt;
  &lt;defs&gt;
    &lt;pattern id="pattern1" width=0.2 height=0.2 &gt;
      &lt;rect x="10" width="10" height="10"/&gt;
      &lt;rect y="10" width="10" height="10"/&gt;
    &lt;/pattern&gt;
  &lt;/defs&gt;
   &lt;rect id="rect1" x="0" y="0" width="100" height="100" fill="url(#pattern1)" /&gt;
&lt;/svg&gt;  </pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/css/bgshow/b14.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;可能有人会说，CSS渐变可以节省HTTP请求。但实际上，可以把SVG文件以dataURL的方式内嵌到样式表中

&emsp;&emsp;注意：SVG中的标签的属性值一定要添加引号，否则通过dataURL的方式引入的SVG文件无法显示成功

<div>
<pre>div{
    height: 100px;
    width: 100px;
    background: url('data:image/svg+xml,\
    &lt;svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill-opacity=".25"&gt;\
      &lt;defs&gt;\
        &lt;pattern id="pattern1" width="0.2" height="0.2" &gt;\
          &lt;rect x="10" width="10" height="10"/&gt;\
          &lt;rect y="10" width="10" height="10"/&gt;\
        &lt;/pattern&gt;]\
      &lt;/defs&gt;\
      &lt;rect id="rect1" x="0" y="0" width="100" height="100" fill="url(#pattern1)"/&gt;\
    &lt;/svg&gt;');
}</pre>
</div>

&nbsp;

### 伪随机背景

&emsp;&emsp;重现随机性是一个挑战，因为CSS本身没有提供任何随机功能。以条纹为例子。假设得到不同颜色和不同宽度的垂直条纹，并且不能让人看出贴片平铺时的接缝。第一个想法可能就是创建一个具有四种颜色的条纹图案

<div>
<pre>  background:linear-gradient(90deg,#fb3 15%,#655 0, #655 40%,#ab4 0, #ab4 65%, hsl(20,40%,90%) 0);
  background-size: 80px 100%;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/css/bgshow/b15.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;为了更真实地模拟条纹的随机性，把这组条纹从一个平面拆散为多个图层：一种颜色作为底色，另三种颜色作为条纹，然后再让条纹以不同的间隔进行重复平铺

<div>
<pre>  background: hsl(20,40%,90%);
  background-image:linear-gradient(90deg,#fb3 10px,transparent 0),
  linear-gradient(90deg,#ab4 20px,transparent 0),
  linear-gradient(90deg,#655 20px,transparent 0);
  background-size: 80px 100%,60px 100%,40px 100%;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/css/bgshow/b16.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;因为最顶层贴片的重复规律最容易被察觉，应该把平铺间距最大的贴片安排在最顶层

&emsp;&emsp;这里贴片的尺寸实际上就是所有background-size的最小公倍数，而40、60和80的最小公倍数正是240

&emsp;&emsp;根据这个逻辑，要让这种随机性更加真实，得把贴片的尺寸最大化。为了让最小公倍数最大化，这些数字最好是"相对质数。在这种情况下，它们的最小公倍数就是它们的乘积

&emsp;&emsp;下列代码中，平铺贴片的尺寸现在是41&times;61&times;83=207583像素，比任何屏幕分辨率都要大。这个技巧被定名为&ldquo;蝉原则&rdquo;

<div>
<pre>  background: hsl(20,40%,90%);
  background-image:linear-gradient(90deg,#fb3 11px,transparent 0),
  linear-gradient(90deg,#ab4 23px,transparent 0),
  linear-gradient(90deg,#655 41px,transparent 0);
  background-size: 41px 100%,61px 100%,83px 100%;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/css/bgshow/b17.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 斑马线背景

&emsp;&emsp;下面的斑马线背景是与文本紧密结构的一种背景图案

<div>
<pre>  padding:.5em;
  line-height: 1.5;
  background:beige linear-gradient(rgba(0,0,0,0.2) 50%,transparent 0) content-box 0 0/ auto 3em;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/bgshow/b18.html" frameborder="0" width="320" height="240"></iframe>
