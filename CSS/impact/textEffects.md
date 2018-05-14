# CSS文本效果

&emsp;&emsp;本文将详细介绍CSS文本效果

&nbsp;

### 凸版印刷效果

&emsp;&emsp;这种效果尤其适用于中等亮度背景配上深色文字的场景；但它也可用于深色底、浅色字的场景，只要文字不是黑色并且背景不是纯黑或纯白就行

【浅色背景深色文本】

<div>
<pre>  background:hsl(210,13%,60%);
  color:hsl(210,13%,30%);
  text-shadow:0 .03em .03em hsla(0,0%,100%,.8);</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/word/w1.html" frameborder="0" width="320" height="240"></iframe>

【深色背景浅色文本】&nbsp;

<div>
<pre>  background:hsl(210,13%,40%);
  color:hsl(210,13%,75%);
  text-shadow:0 -1px 1px black;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/word/w2.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 空心字效果

<div>
<pre>  color:white;
  text-shadow:1px 1px black,-1px -1px black,1px -1px black,-1px 1px black;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/word/w3.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 发光效果

<div>
<pre>  background:#203;
  color:#ffc;
  text-shadow:0 0 .1em,0 0 .3em;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/word/w4.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 模糊效果

<div>
<pre>div{
  width:200px;
  background:#203;
  color:transparent;
  text-shadow:0 0 .1em white,0 0 .3em white;
  transition:.5s;
}
div:hover{
  color:white;
}  </pre>
</div>

&emsp;&emsp;鼠标移入后，文字由模糊变清晰

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/word/w5.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 凸起效果

&emsp;&emsp;文字凸起(伪3D)效果的主要思路就是使用一长串累加的投影，不设模糊并以1px的跨度逐渐错开，使颜色逐渐变暗，然后在底部加一层强烈模糊的暗投影，从而模拟完整的立体效果

<div>
<pre>  background:#58a;
  color:white;
  text-shadow:0 1px hsl(0,0%,85%),0 2px hsl(0,0%,80%),0 3px hsl(0,0%,75%),0 4px hsl(0,0%,70%),0 5px hsl(0,0%,65%),0 5px 10px black;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/word/w6.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 闪烁效果

<div>
<pre>@keyframes blink-smooth{50%{color:transparent;}}
div{
  animation:.5s blink-smooth infinite alternate linear;
}</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/word/w7.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 打字效果

&emsp;&emsp;有些时候，希望一段文本中的字符逐个显现，模拟出一种打字的效果。这个效果在技术类网站中尤为流行，用等宽字体可以营造出一种终端命令行的感觉

&emsp;&emsp;核心思路就是让容器的宽度成为动画的主体把所有文本包裹在这个容器中，然后让它的宽度从0开始以步进动画的方式、一个字一个字地扩张到它应有的宽度

&emsp;&emsp;这个方法是局限的，它并不适用于多行文本

<div>
<pre>@keyframes typing{0%{width:0;}}
@keyframes caret{50%{border-color:transparent;}}
div{
  width:9em;
  animation:typing 4s steps(9) infinite ,caret .5s steps(1) infinite;
  white-space: nowrap;
  overflow: hidden;
  border-right:1px solid;
}</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/word/w8.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 环形文字

【SVG】

&emsp;&emsp;使用SVG来实现环形文字较为简单

<div>
<pre>&lt;style&gt;
div{width: 100px;height: 100px;border:1px solid black;}
svg{margin-left: -20px;}
&lt;/style&gt;
&lt;div&gt;
  &lt;svg height="100" version="1.1" xmlns="http://www.w3.org/2000/svg" &gt;
    &lt;path id="my_path"  d="M 50 50 a 20 20, 0, 1, 1, 0 1 Z" fill="none"/&gt;
    &lt;text&gt;
      &lt;textPath xlink:href="#my_path"&gt;小火柴的蓝色理想&lt;/textPath&gt;
    &lt;/text&gt;
  &lt;/svg&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/css/word/w9.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 文字融合

&emsp;&emsp;模糊滤镜叠加对比度滤镜可以产生融合效果

&emsp;&emsp;注意：文字融合的思路来自[chokcoco](https://home.cnblogs.com/u/coco1s/)的博文[CSS滤镜技巧与细节](http://www.cnblogs.com/coco1s/p/7519460.html)

&emsp;&emsp;1、[模糊滤镜](http://www.cnblogs.com/xiaohuochai/p/6270939.html#anchor10)`filter: blur()`： 给图像设置高斯模糊效果

&emsp;&emsp;2、[对比度滤镜](http://www.cnblogs.com/xiaohuochai/p/6270939.html#anchor9)`filter: contrast()`： 调整图像的对比度

&emsp;&emsp;当它们同时使用时，产生了奇妙的融合现象，通过对比度滤镜把高斯模糊的模糊边缘给隐藏，利用高斯模糊实现融合效果

<div>
<pre>&lt;style&gt;
.box{filter: contrast(20);background: #fff;overflow: hidden;}
.left,.right{float: left;width: 100px;height: 100px;border-radius: 50%;filter: blur(6px);}
.left{background-color: black;}
.right{background-color: red;margin-left:-20px;}
&lt;/style&gt;
&lt;div class="box"&gt;
    &lt;div class="left"&gt;&lt;/div&gt;
    &lt;div class="right"&gt;&lt;/div&gt;    
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/css/word/w10.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;为其中一个元素添加动画后，效果更明显

<div>
<pre>&lt;style&gt;
.box{filter: contrast(20);background: #fff;overflow: hidden;padding:10px;}
.left,.right{display:inline-block;width: 100px;height: 100px;border-radius: 50%;filter: blur(6px);}
.left{background-color: black;position:absolute;left:0;animation: move 2s infinite alternate;}
@keyframes move{100%{left:250px;}}
.right{background-color: red;margin-left:120px;}
&lt;/style&gt;
&lt;div class="box"&gt;
    &lt;div class="left"&gt;&lt;/div&gt;
    &lt;div class="right"&gt;&lt;/div&gt;    
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 150px;" src="https://demo.xiaohuochai.site/css/word/w11.html" frameborder="0" width="320" height="240"></iframe>

【文字显隐效果】

&emsp;&emsp;首先，利用blur()和contrast()实现一个文字显隐效果

<div>
<pre>&lt;style&gt;
.box{filter: contrast(1);background: #fff;overflow: hidden;padding:10px;font:bold 20px/20px '宋体';}
.text{filter:blur(0px);transition:1s;}
.box:hover{filter: contrast(20);}
.box:hover .text{filter:blur(3px);}
&lt;/style&gt;
&lt;div class="box"&gt;
    &lt;span class="text"&gt;小火柴的蓝色理想&lt;/span&gt;
&lt;/div&gt;</pre>
</div>

&emsp;&emsp;鼠标移入后，文字消失；移出后，文字恢复

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/word/w12.html" frameborder="0" width="320" height="240"></iframe>

【文字融合】

&emsp;&emsp;下面来配合[字符间距letter-spacing](http://www.cnblogs.com/xiaohuochai/p/5325063.html#anchor4)来实现文字融合效果

<div>
<pre>&lt;style&gt;
.box{filter: contrast(1);background: #fff;overflow: hidden;padding:10px;font:bold 20px/20px '宋体';}
.text{filter:blur(0px);transition:1s;}
.box:hover{filter: contrast(20);}
.box:hover .text{filter:blur(3px);letter-spacing: -1em}
&lt;/style&gt;
&lt;div class="box"&gt;
    &lt;span class="text"&gt;小火柴的蓝色理想&lt;/span&gt;
&lt;/div&gt;</pre>
</div>

&emsp;&emsp;鼠标移入后，文字融合；移出后，文字恢复

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/word/w13.html" frameborder="0" width="320" height="240"></iframe>

