# CSS画出的图

## 简单图形

### 矩形

<div>
<pre>div{
    width: 100px;
    height: 100px;
    background-color: red;
}</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/css/shape/s1.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 圆形

<div>
<pre>div{
    width: 100px;
    height: 100px;
    background-color: red;
    border-radius: 50%;
}</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/css/shape/s2.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 椭圆

【整个椭圆】

<div>
<pre>div{
    width: 100px;
    height: 50px;
    background-color: red;
    border-radius: 50%;
}</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/css/shape/s3.html" frameborder="0" width="320" height="240"></iframe>

【半椭圆或半圆】

<div>
<pre>div{
  width: 100px;
  height: 100px;
  background:red;
  border-radius:50% /100% 100% 0 0 ;
}</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/css/shape/s4.html" frameborder="0" width="320" height="240"></iframe>

【四分之一椭圆】

<div>
<pre>div{
  width: 100px;
  height: 100px;
  background:red;
  border-radius:100% 0 0 0 ;
}</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/css/shape/s5.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 三角形

【直角三角形】

<div>
<pre>div{
    width: 0;
    height: 0;
    border: 50px solid transparent;
    border-bottom-color: red;
}</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/css/shape/s6.html" frameborder="0" width="320" height="240"></iframe>

【正三角形】

<div>
<pre>div{
    width: 0;
    height: 0;
    border: 50px solid transparent;
    border-width: 86.6px 50px;
    border-bottom-color: red;
}</pre>
</div>

<iframe style="width: 100%; height: 200px;" src="https://demo.xiaohuochai.site/css/shape/s7.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 平行四边形

【基本图形】

<div>
<pre>div{
    margin-left: 50px;
    width: 100px;
    height: 100px;
    background-color: red;
    transform: skew(30deg);
}</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/css/shape/s8.html" frameborder="0" width="320" height="240"></iframe>

【改进版本】

&emsp;&emsp;上面的代码中，不仅形状发生了变形，内容也发生了变形。有两种方法改进

&emsp;&emsp;1、元素嵌套

<div>
<pre>.outer{
  margin-left:20px;
  width: 100px;
  height: 100px;
  background:red;
  transform:skewX(-30deg);
}  
.inner{
   transform:skewX(30deg);
}
&lt;/style&gt;
&lt;div class="outer"&gt;
  &lt;div class="inner"&gt;小火柴&lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/css/shape/s9.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;2、伪元素

&emsp;&emsp;把所有样式都应用到伪元素上，然后再对伪元素进行变形

<div>
<pre>div{
  position:relative; 
  margin-left:20px;
  width: 100px;
  height: 100px;
  text-indent: 30px; 
}  
div::before{
  content:'';
  position:absolute;
  top: 0;right: 0;left: 0;bottom: 0;
  transform:skewX(-30deg);
  background:red; 
  z-index:-1;
}</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/css/shape/s10.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 梯形

【基本版本】

<div>
<pre>div{
    width: 50px;
    border: 50px solid transparent;
    border-bottom-color: red;
}</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/css/shape/s11.html" frameborder="0" width="320" height="240"></iframe>

【增强版本】

&emsp;&emsp;上面的代码虽然简单且巧妙，但无法在图形内容填充文本。下面是比较复杂的增强版本&nbsp;

<div>
<pre>div{
  height: 100px;
  width: 200px;
  line-height: 100px;
  position:relative;
  display:inline-block;
  text-align: center;
  color:white;
  padding: .5em 1em .35em;
}
div:before{
  content:'';
  position:absolute;
  top: 0;right: 0;bottom: 0;left: 0;
  z-index:-1;
  background:#58a;
  transform:scaleY(1.3) perspective(.5em) rotateX(5deg);
  transform-origin: bottom;
}</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/css/shape/s12.html" frameborder="0" width="320" height="240"></iframe>

【梯形选项卡】

<div>
<pre>&lt;style&gt;
a{
  width: 120px;
  text-align: center;
  text-decoration: none;
  color:inherit;
  font-size: 20px
}
nav &gt; a{
  position:relative;
  display:inline-block;
  padding:.3em .1em 0;
}
nav &gt; a:before{
  content:'';
  position:absolute;
  top: 0;right: 0;left: 0;bottom: 0;
  z-index:-1;
  background:#ccc;
  border:1px solid black;
  border-radius: .5em .5em 0 0 ;
  box-shadow: 0 .15em white inset;
  transform:scaleY(1.3) perspective(.5em) rotateX(5deg);
  transform-origin: bottom;
}
&lt;/style&gt;
&lt;nav&gt;
  &lt;a href="#"&gt;HTML&lt;/a&gt;
  &lt;a href="#"&gt;CSS&lt;/a&gt;
  &lt;a href="#"&gt;Javascript&lt;/a&gt;
&lt;/nav&gt;</pre>
</div>

<iframe style="width: 100%; height: 70px;" src="https://demo.xiaohuochai.site/css/shape/s13.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

## 复杂图形

### 多角星

【五角星】

&emsp;&emsp;一个大三角形底部掏掉一个小三角形；两个前面的相同图形叠压

&emsp;&emsp;经计算，五角星的夹角为36度，若小三角形的侧边为a，则大三角形的侧边为2a(1+sin18)，两个三角形共同的底边为2a(sin54)

<div>
<pre>
&lt;div class="box"&gt;
	&lt;div class="in"&gt;&lt;/div&gt; 
	&lt;div class="in"&gt;&lt;/div&gt;	
&lt;/div&gt;
</pre>
</div>
<div>
<pre>.box{
    position: relative;
}
.in{ 
    margin-left: 100px;
    position: relative; 
    width: 0px; 
    border: 10px solid transparent; 
    border-width: 249px 81px;
    border-bottom-color: red; 
    position: absolute;
} 
.in:after{
    content: "";
    position:absolute;
    border: 10px solid transparent;
    border-width: 59px 81px;
    border-bottom-color: white;
    top: 133px;
    left: -81px;
}
.in:last-child{
    top: 100px;
    left: -134px;
    transform: rotate(-73deg);
}</pre>
</div>

<iframe style="width: 100%; height: 520px;" src="https://demo.xiaohuochai.site/css/shape/s14.html" frameborder="0" width="320" height="240"></iframe>

【六角星】

&emsp;&emsp;两个三角形叠压

<div>
<pre>div{
    position: relative;
    width: 0;
    border: 50px solid transparent;
    border-width: 50px 43.4px;
    border-bottom-color: red;
}
div:after{
    position: absolute;
    content:"";
    width: 0;
    border: 50px solid transparent;
    border-width: 50px 43.4px;
    border-top-color: red;
    top: 16px;
    left: -42px;
}</pre>
</div>

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/css/shape/s15.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 多边形

【六边形】

&emsp;&emsp;两个梯形拼接

<div>
<pre>div{
    position: relative;
    width: 50px;
    border: 50px solid transparent;
    border-bottom-color: red;
}
div:after{
    position: absolute;
    content:"";
    width: 50px;
    border: 50px solid transparent;
    border-top-color: red;    
    top:50px;
    left: -50px;
}</pre>
</div>

<iframe style="width: 100%; height: 200px;" src="https://demo.xiaohuochai.site/css/shape/s16.html" frameborder="0" width="320" height="240"></iframe>

【八边形】

<div>
<pre>.outer{
  width:100px;
  height: 100px;
  transform:rotate(45deg);
  overflow: hidden;
}  
.inner{
  width:100%;
  height: 100%;
  transform:rotate(-45deg);
  background:red;
}</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/css/shape/s17.html" frameborder="0" width="320" height="240"></iframe>

【菱形】

<div>
<pre>&lt;style&gt;
.outer{
  margin:50px 0 0 50px;
  width:100px;
  height: 100px;
  transform:rotate(45deg);
  overflow: hidden;
}  
.inner{
  width:100%;
  height: 100%;
  transform:rotate(-45deg) scale(1.42);
  background:red;
}
&lt;/style&gt;</pre>
</div>

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/css/shape/s18.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 桃心

&emsp;&emsp;创建一个方形div，分别用css控制div的两个伪元素平移到正方形相邻两边，圆形与边中点重合。最后将总的div旋转45度

<div>
<pre>&lt;style&gt;
div{
    display:inline-block;
    margin:50px;
    height: 100px;
    width: 100px;
    background-color: red;
    transform: rotate(-45deg);
}
div:before,div:after{
    display:block;
    content:"";
    width: 100px;
    height: 100px;
    background-color: red;
    border-radius: 50%;
    margin-top:-50%;
}
div:after{
    margin-left:50%;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div&gt;&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 220px;" src="https://demo.xiaohuochai.site/css/shape/s19.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 切角效果

【单角】

<div>
<pre>background: linear-gradient(-45deg,transparent 5%,#58a 0);</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/css/shape/s20.html" frameborder="0" width="320" height="240"></iframe>

【双角】

<div>
<pre>  background: linear-gradient(-45deg,transparent 5%,#58a 0) right,linear-gradient(45deg,transparent 5%,#58a 0) left;
  background-size:50% 100%;
  background-repeat:no-repeat;</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/css/shape/s21.html" frameborder="0" width="320" height="240"></iframe>

【四角】

<div>
<pre>  background: linear-gradient(-135deg,transparent 5%,#58a 0) top right,linear-gradient(135deg,transparent 5%,#58a 0) top left,linear-gradient(-45deg,transparent 5%,#58a 0) bottom right,linear-gradient(45deg,transparent 5%,#58a 0) bottom left;
  background-size:50% 50%;
  background-repeat:no-repeat;</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/css/shape/s22.html" frameborder="0" width="320" height="240"></iframe>

【弧形切角】

<div>
<pre>  background: radial-gradient(circle at top right,transparent 5%,#58a 0) top right,radial-gradient(circle at top left,transparent 5%,#58a 0) top left,radial-gradient(circle at bottom right,transparent 5%,#58a 0) bottom right,radial-gradient(circle at bottom left,transparent 5%,#58a 0) bottom left;
  background-size:50% 50%;
  background-repeat:no-repeat;</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/css/shape/s23.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 折角效果

<div>
<pre>background:linear-gradient(to left bottom,transparent 50%,rgba(0,0,0,0.4) 0) no-repeat 100% 0 /2em 2em,linear-gradient(-135deg,transparent 1.414em ,#58a 0);</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/css/shape/s24.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 饼图效果

&emsp;&emsp;饼图在网页中的运用极为普遍，比如简单的统计图表、进度指示器、定时器等

【静态效果】

<div>
<pre>&lt;style&gt;
@keyframes spin{
  to{transform: rotate(.5turn);}
}
@keyframes bg{50%{background:#655;}}
.pie{
  width: 100px;line-height: 100px;
  position:relative;
  background-color: yellowgreen;
  border-radius: 50%;
  color:transparent;
  text-align:center;
  background-image: linear-gradient(to right, transparent 50%,#655 0);
}
.pie:before{
  content:'';
  position:absolute;
  top: 0;left: 50%;
  width: 50%;height: 100%;
  border-radius: 0 100% 100% 0 /50%;
  background-color: inherit;
  transform-origin: left;
  animation: spin 50s linear infinite,bg 100s step-end infinite;
  animation-play-state:paused;
  animation-delay:inherit;
}
&lt;/style&gt;
&lt;div class="pie" style="animation-delay:-20s"&gt;20%&lt;/div&gt;
&lt;div class="pie" style="animation-delay:-90s"&gt;90%&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/css/shape/s25.html" frameborder="0" width="320" height="240"></iframe>

【动态效果】

<div>
<pre>&lt;style&gt;
@keyframes spin{
  to{transform: rotate(.5turn);}
}
@keyframes bg{50%{background:#655;}}
.pie{
  width: 100px;height: 100px;
  position:relative;
  background-color: yellowgreen;
  border-radius: 50%;
  background-image: linear-gradient(to right, transparent 50%,#655 0);
}
.pie:before{
  content:'';
  position:absolute;
  top: 0;left: 50%;
  width: 50%;height: 100%;
  border-radius: 0 100% 100% 0 /50%;
  background-color: inherit;
  transform-origin: left;
  animation: spin 3s linear infinite,bg 6s step-end infinite;
  animation-play-state: paused;
}
.pie:hover:before{
  animation-play-state: running;
}
&lt;/style&gt;
&lt;div class="pie"&gt;&lt;/div&gt;</pre>
</div>

&emsp;&emsp;鼠标移入时，饼图发生移动

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/css/shape/s26.html" frameborder="0" width="320" height="240"></iframe>

【SVG实现】

&emsp;&emsp;让圆形的周长接近于100，方便计算。r = 100/(2*PI) = 16

<div>
<pre>&lt;style&gt;
@keyframes fillup{to{stroke-dasharray:100 100;}}
svg{
  width: 100px;
  height: 100px;
  transform: rotate(-90deg);
  background: yellowgreen;
  border-radius: 50%;
}
circle{
  fill:yellowgreen;
  stroke:#655;
  stroke-width:32;
  stroke-dasharray: 0 100;
  animation: fillup 5s linear infinite;
}
&lt;/style&gt;
&lt;svg viewbox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"&gt;
  &lt;circle r=16 cx=16 cy=16&gt;&lt;/circle&gt;
&lt;/svg&gt;</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/css/shape/s27.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

## 最后

&emsp;&emsp;除了使用CSS画图之后，实现各种形状更简单的方法是使用[clip-path路径裁剪样式](http://www.cnblogs.com/xiaohuochai/p/7509225.html)

&emsp;&emsp;欢迎交流

