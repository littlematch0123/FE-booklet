# CSS边框效果

&emsp;&emsp;本文将详细介绍CSS边框效果

&nbsp;

### 半透明边框

<div>
<pre>  border:10px solid hsla(0, 0%, 100%,.5);
  background-clip:padding-box;</pre>
</div>

<iframe style="width: 100%; height: 110px;" src="https://demo.xiaohuochai.site/css/bordershow/b1.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 缝边效果

<div>
<pre>  outline: 1px white dashed;
  outline-offset:-10px;
  border-radius:4%;
  background:#795548;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/css/bordershow/b2.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 边框内圆角

&emsp;&emsp;思路如下：为元素设置圆角，外层设置轮廓outline。圆角与直角之间的空隙用阴影补齐，阴影的尺寸为圆角半径的一半

<div>
<pre>  border-radius:10px;
  background: tan;
  outline:10px solid #655;
  box-shadow:0 0 0 5px #655;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/css/bordershow/b3.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 信封边框

&emsp;&emsp;信封边框有两种实现思路：

&emsp;&emsp;1、使用背景渐变

<div>
<pre>  padding:1em;
  border: 1em solid transparent;
  background: linear-gradient(white,white) padding-box,repeating-linear-gradient(-45deg, red 0, red 12.5%, transparent 0, transparent 25%, #58a 0, #58a 37.5%, transparent 0, transparent 50%) 0/5em 5em; </pre>
</div>

&emsp;&emsp;2、使用边框图片

<div>
<pre>  padding:1em;
  border: 1em solid transparent;
  border-image:repeating-linear-gradient(-45deg, red 0, red 1em, transparent 0, transparent 2em, #58a 0, #58a 3em, transparent 0, transparent 4em)  16;</pre>
</div>

&emsp;&emsp;效果如下

<iframe style="width: 100%; height: 150px;" src="https://demo.xiaohuochai.site/css/bordershow/b4.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 脚注效果

&emsp;&emsp;由于使用了currentColor，它会根据color属性的变化而自动适应

<div>
<pre>  padding-top:1em;
  border-top: .2em solid transparent;
  border-image: 100% 0 0 linear-gradient(90deg,currentColor 4em,transparent 0);</pre>
</div>

<iframe style="width: 100%; height: 70px;" src="https://demo.xiaohuochai.site/css/bordershow/b5.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 蚂蚁线

<div>
<pre>@keyframes ants{100%{background-position:100%;}}
div{
  width:200px;
  height: 70px;
  border: 1px solid transparent;
  background: linear-gradient(white,white) padding-box,repeating-linear-gradient(-45deg, black 0, black 25%, white 0, white 50%) 0/.6em .6em; 
  animation:ants 12s linear infinite;
}  </pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/css/bordershow/b6.html" frameborder="0" width="320" height="240"></iframe>

