# CSS遮罩效果和毛玻璃效果

&emsp;&emsp;本文将详细介绍CSS遮罩效果和毛玻璃效果

&nbsp;

## 遮罩效果

### 普通遮罩

&emsp;&emsp;一般地，处理全屏遮罩的方法是使用额外标签

<div>
<pre>&lt;style&gt;
.overlay{
  position:fixed;
  top: 0;right: 0;left: 0;bottom: 0;
  background:rgba(0,0,0,0.8);
}
.lightbox{
  position:absolute;
  top: 0;right: 0;left: 0;bottom: 0;
  margin:auto;
  z-index:1;
  width: 100px;
  height: 100px;
  background-color: white;
}
&lt;/style&gt;
&lt;div class="overlay"&gt;&lt;/div&gt;
&lt;div class="lightbox"&gt;&lt;/div&gt;</pre>
</div>

&emsp;&emsp;效果如下

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/frostedglass/f1.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 阴影遮罩

&emsp;&emsp;对于简单的应用场景和产品原型来说，我们可以利用box-shadow来达到调暗背景的效果

<div>
<pre>box-shadow: 0 0 0 999px rgba(0,0,0,0.8);</pre>
</div>

&emsp;&emsp;这个初步的解决方案有一个明显的问题，就是它无法在较大的屏幕分辨率(如&gt;2000px)下正常工作。要么加大数字来缓解这个问题，要么换用视口单位来一劳永逸地解决它，只有这样才能确保"遮罩层"总是可以覆盖(至超出)视口

<div>
<pre>box-shadow: 0 0 0 50vmax rgba(0,0,0,0.8);</pre>
</div>

&emsp;&emsp;这个技巧非常简洁易用，但它存在两个非常严重的问题，从而制约了其使用场景

&emsp;&emsp;1、由于遮罩层的尺寸是与视口相关，而不是与页面相关的，滚动页面时，遮罩层的边缘就露出来了，除非给它加上position：fixed这个样式，或者页面并没有长到需要滚动的程度

&emsp;&emsp;2、这种效果无法防止用户的鼠标与页面的其他部分发生交互

<div>
<pre>&lt;style&gt;
.lightbox{
  position:absolute;
  top: 0;right: 0;left: 0;bottom: 0;
  margin:auto;
  z-index:1;
  width: 100px;
  height: 100px;
  background-color: white;
  box-shadow: 0 0 0 50vmax rgba(0,0,0,0.8);
}
&lt;/style&gt;
&lt;div class="lightbox"&gt;&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/frostedglass/f2.html" frameborder="0" width="320" height="240"></iframe>&nbsp;

### 模糊遮罩

&emsp;&emsp;把关键元素之外的一切都模糊掉，用来配合(或取代)阴影效果，这个效果的真实感更强，因为它营造出了"景深效果。视线聚焦在距离较近的物体上时，远处的背景就是虚化的

<div>
<pre>filter:blur(5px);</pre>
</div>

&emsp;&emsp;下面是一个实例，鼠标移出弹出框时， 模糊消失

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/frostedglass/f3.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

## 毛玻璃效果

&emsp;&emsp;下面来逐步实现毛玻璃效果

&nbsp;

### 半透明颜色

&emsp;&emsp;半透明颜色最初的使用场景之一就是作为背景。将其叠放在照片类或其他花哨的背层之上，可以减少对比度，确保文本的可读性

&emsp;&emsp;下面是一个实例

<div>
<pre>&lt;style&gt;
.outer{
  position:relative;
  height: 200px;
  width: 200px;
   background: hsl(20,40%,90%);
  background-image:linear-gradient(90deg,#fb3 11px,transparent 0),
  linear-gradient(90deg,#ab4 23px,transparent 0),
  linear-gradient(90deg,#655 41px,transparent 0);
  background-size: 41px 100%,61px 100%,83px 100%;
}
.inner{
  position:absolute;
  top: 0;right: 0;left: 0;bottom: 0;
  font: bold 20px/1.5 '宋体';
  height: 160px;
  width: 180px;
  margin:auto;
  background:hsla(0,0%,100%,.3);
}
&lt;/style&gt;
&lt;div class="outer"&gt;
  &lt;div class="inner"&gt;前端入门容易精通难，说的是前端，更指javascript&lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 230px;" src="https://demo.xiaohuochai.site/css/frostedglass/f4.html" frameborder="0" width="320" height="240"></iframe>

【增大不透明度】

&emsp;&emsp;设置为30%的不透明度，文字难以看清。当然，可以通过提升不透明度来增加文本可读性，但效果整个效果就没有那么生动了

<div>
<pre>background:hsla(0,0%,100%,.6);</pre>
</div>

<iframe style="width: 100%; height: 230px;" src="https://demo.xiaohuochai.site/css/frostedglass/f5.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 模糊处理

&emsp;&emsp;在传统的平面设计中，通常把文本层所覆盖的那部分图片区域作模糊处理。模糊的背景看起来不那么花哨，因此在它之上的文本就相对比较易读了。过去，由于模糊运算的性能消耗极其巨大，以致于这个技巧在网页设计中鲜有用武之地。不过，随着GPU的不断进化以及硬件加速的不断普及，眼下这个技巧已经逐渐流行起来

【父元素模糊】

&emsp;&emsp;如果直接对父元素设置模糊，则文本本身也会被模糊处理

<div>
<pre>&lt;style&gt;
.outer{
  position:relative;
  height: 200px;
  width: 200px;
   background: hsl(20,40%,90%);
  background-image:linear-gradient(90deg,#fb3 11px,transparent 0),
  linear-gradient(90deg,#ab4 23px,transparent 0),
  linear-gradient(90deg,#655 41px,transparent 0);
  background-size: 41px 100%,61px 100%,83px 100%;
  filter:blur(5px);
}
.inner{
  position:absolute;
  top: 0;right: 0;left: 0;bottom: 0;
  font:  20px/1.5 '宋体';
  height: 160px;
  width: 180px;
  margin:auto;
  background:hsla(0,0%,100%,.6);
}
&lt;/style&gt;
&lt;div class="outer"&gt;
  &lt;div class="inner"&gt;前端入门容易精通难，说的是前端，更指javascript&lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 230px;" src="https://demo.xiaohuochai.site/css/frostedglass/f6.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;【伪元素模糊】

&emsp;&emsp;因此，对一个伪元素进行处理，然后将其定位到元素的下层

<div>
<pre>&lt;style&gt;
.outer{
  position:relative;
  height: 200px;
  width: 200px;
  z-index:1;
  background: hsl(20,40%,90%);
  background-image:linear-gradient(90deg,#fb3 11px,transparent 0),
  linear-gradient(90deg,#ab4 23px,transparent 0),
  linear-gradient(90deg,#655 41px,transparent 0);
  background-size: 41px 100%,61px 100%,83px 100%;   
}
.inner:before{
  content:'';
  position:absolute;
  top: 0;right: 0;left: 0;bottom: 0;
  filter:blur(5px);
  background: rgba(255,0,0,0.5);
  z-index:-1;
}
.inner{
  position:absolute;
  top: 0;right: 0;left: 0;bottom: 0;
  font:  20px/1.5 '宋体';
  height: 160px;
  width: 180px;
  margin:auto;
  background:hsla(0,0%,100%,.3);
}
&lt;/style&gt;
&lt;div class="outer"&gt;
  &lt;div class="inner"&gt;前端入门容易精通难，说的是前端，更指javascript&lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 230px;" src="https://demo.xiaohuochai.site/css/frostedglass/f7.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 背景复制

&emsp;&emsp;下面复制父级元素的背景来替换半透明的红色。如果保证毛玻璃下的背景正好与父元素背景的图案相吻合呢？使用fixed即可，将父元素和伪元素的背景设置为相同，且都相对于视口设置，可实现目标

<div>
<pre>&lt;style&gt;
.outer{
  position:relative;
  height: 200px;
  width: 200px;
  z-index:1;
  background: hsl(20,40%,90%) fixed;
  background-image:linear-gradient(90deg,#fb3 11px,transparent 0),
  linear-gradient(90deg,#ab4 23px,transparent 0),
  linear-gradient(90deg,#655 41px,transparent 0);
  background-size: 41px 100%,61px 100%,83px 100%;   
}
.inner:before{
  content:'';
  position:absolute;
  top: 0;right: 0;left: 0;bottom: 0;
  filter:blur(5px);
  background: hsl(20,40%,90%) fixed;
  background-image:linear-gradient(90deg,#fb3 11px,transparent 0),
  linear-gradient(90deg,#ab4 23px,transparent 0),
  linear-gradient(90deg,#655 41px,transparent 0);
  background-size: 41px 100%,61px 100%,83px 100%;
  z-index:-1;
}
.inner{
  position:absolute;
  top: 0;right: 0;left: 0;bottom: 0;
  font:  20px/1.5 '宋体';
  height: 160px;
  width: 180px;
  margin:auto;
  background:hsla(0,0%,100%,.3);
}
&lt;/style&gt;
&lt;div class="outer"&gt;
  &lt;div class="inner"&gt;前端入门容易精通难，说的是前端，更指javascript&lt;/div&gt;
&lt;/div&gt;</pre>
</div>

&emsp;&emsp;效果如下

<iframe style="width: 100%; height: 230px;" src="https://demo.xiaohuochai.site/css/frostedglass/f8.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 样式封装

&emsp;&emsp;毛玻璃样式封装如下

<div>
<pre>.frostedglass{
  width: 100px;  
  height: 100px;  
  font-size:16px;
  /*计算值为 height - width*top*2*/
  line-height: 70px;
  z-index:1;
  border-radius:50%;    
  position:relative;
  overflow: hidden;
  text-align:center;  
  background: hsl(20,40%,90%) fixed;
  background-image:linear-gradient(90deg,#fb3 11px,transparent 0),
  linear-gradient(90deg,#ab4 23px,transparent 0),
  linear-gradient(90deg,#655 41px,transparent 0);
  background-size: 41px 100%,61px 100%,83px 100%;   
}
.frostedglass-inner:before{
  content:'';
  position:absolute;
  top: 0;right: 0;left: 0;bottom: 0;
  filter:blur(5px);
  background: hsl(20,40%,90%) fixed;
  background-image:linear-gradient(90deg,#fb3 11px,transparent 0),
  linear-gradient(90deg,#ab4 23px,transparent 0),
  linear-gradient(90deg,#655 41px,transparent 0);
  background-size: 41px 100%,61px 100%,83px 100%;
  z-index:-1;
}
.frostedglass-inner{
  position:absolute;
  top: 15%;right: 15%;left: 15%;bottom: 15%;
  background:hsla(0,0%,100%,.3);
}    </pre>
</div>

&emsp;&emsp;下面是一个例子

<div>
<pre>&lt;div class="frostedglass"&gt;
  &lt;div class="frostedglass-inner"&gt;前端开发&lt;/div&gt;
&lt;/div&gt; 
&lt;div class="frostedglass"&gt;
  &lt;div class="frostedglass-inner"&gt;HTML&lt;/div&gt;
&lt;/div&gt;  </pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/css/frostedglass/f9.html" frameborder="0" width="320" height="240"></iframe>

