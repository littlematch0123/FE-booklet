# 元素显示隐藏的9种思路

&emsp;&emsp;在网页制作中，元素的显示隐藏是非常常见的需求。本文将介绍元素显示隐藏的9种思路

&nbsp;

### display

&emsp;&emsp;对于元素显隐来说，最常见就是[display](http://www.cnblogs.com/xiaohuochai/p/5202761.html):none | display:block，但是使用这种方法有个问题，元素的display属性在隐藏前并不都是block，还有可能是inline、inline-block等

&emsp;&emsp;注意：如果要适用于任何元素需要提前储存元素的display值

<div>
<pre>&lt;button id="show"&gt;显示&lt;/button&gt;
&lt;button id="hide"&gt;隐藏&lt;/button&gt;
&lt;div id="test" style="background:lightblue;width:100px;height:60px;margin-top: 10px;"&gt;测试文字&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
show.onclick = function(){
    test.style.display = 'block';
}    
hide.onclick = function(){
    test.style.display = 'none';
}
&lt;/script&gt;    </pre>
</div>

<iframe style="width: 100%; height: 110px;" src="https://demo.xiaohuochai.site/css/showhide/s1.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### visibility

&emsp;&emsp;[visibility](http://www.cnblogs.com/xiaohuochai/p/5296829.html):hidden与display:none作为隐藏元素的两种方式，常常被人们拿来比较。其实区别很简单，前者不脱离文档流，保留隐藏之前元素占据的物理区域；而后者则脱离文档流，如果重新显示则需要页面的重新绘制。还有一点区别却很少人提到，如果父级设置display:none;子级设置display:block也不会显示；而如果父级设置visibility:hidden;子级设置visibility:visible时子级会显示出来

&emsp;&emsp;注意：visilibity可应用[transition](http://www.cnblogs.com/xiaohuochai/p/5347930.html)属性。因为visibility是离散步骤，在0到1数字范围之内，0表示隐藏，1表示显示。visibility:hidden可以看成visibility:0；visibility:visible可以看成visibility:1。于是，visibility应用transition等同于0~1之间的过渡效果。实际上，只要visibility的值大于0就是显示的。由于这个现象，我们可以利用transition实现元素的延时显示隐藏

<div>
<pre>&lt;button id="show"&gt;显示&lt;/button&gt;
&lt;button id="hide"&gt;隐藏&lt;/button&gt;
&lt;div id="test" style="background:lightblue;width:100px;height:60px;margin-top: 10px;"&gt;测试文字&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
show.onclick = function(){
    test.style.transition = 'none';
    test.style.visibility = 'visible';
}    
hide.onclick = function(){
    test.style.transition = 'visibility 0.2s 0.5s';
    test.style.visibility = 'hidden';
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 110px;" src="https://demo.xiaohuochai.site/css/showhide/s2.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### hidden

&emsp;&emsp;可能有些人不太熟悉，HTML有个hidden[全局属性](http://www.cnblogs.com/xiaohuochai/p/5033039.html)，专门用于显示隐藏元素，与display:none的作用类似，元素隐藏时脱离文档流，无法接受javascript事件

&emsp;&emsp;注意：IE10-不支持test.hidden='hidden'写法，只支持test.setAttribute('hidden','hidden')写法

<div>
<pre>&lt;button id="show"&gt;显示&lt;/button&gt;
&lt;button id="hide"&gt;隐藏&lt;/button&gt;
&lt;div id="test" style="background:lightblue;width:100px;height:60px;margin-top: 10px;"&gt;测试文字&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
show.onclick = function(){
    test.removeAttribute('hidden');
    /*test.hidden = '';*/
}    
hide.onclick = function(){
    test.setAttribute('hidden','hidden');
    /*test.hidden = 'hidden';*/
}
&lt;/script&gt;    </pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/showhide/s3.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### opacity

&emsp;&emsp;对于元素显隐，[opacity](http://www.cnblogs.com/xiaohuochai/p/5218459.html)的使用频率也挺多。opacity的好处是，即使opacity为0的元素，仍然可以接受javascript事件，这是display:none和visiblity:hidden所不具备的。

<div>
<pre>&lt;button id="show"&gt;显示&lt;/button&gt;
&lt;button id="hide"&gt;隐藏&lt;/button&gt;
&lt;button id="reset"&gt;还原&lt;/button&gt;
&lt;div id="test" style="background:lightblue;width:100px;height:60px;margin-top: 10px;"&gt;测试文字&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
show.onclick = function(){
    test.style.transition = 'none';
    test.style.opacity = '1';
}    
hide.onclick = function(){
    test.style.transition = 'opacity 0.2s';
    test.style.opacity = '0';
}
test.onclick = function(){
    this.style.width = '200px';
}
reset.onclick = function(){
    history.go();
}
&lt;/script&gt;    </pre>
</div>

<iframe style="width: 100%; height: 110px;" src="https://demo.xiaohuochai.site/css/showhide/s4.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### overflow

&emsp;&emsp;CSS中有一个属性是[overflow](http://www.cnblogs.com/xiaohuochai/p/5289653.html)，overflow:hidden代表着溢出隐藏。我们可以利用父级的overflow:hidden配合父级的height:0或width:0来实现元素的显隐

&emsp;&emsp;注意：当设置overflow的元素在绝对定位元素和其包含块之间的时候，overflow属性会失效

<div>
<pre>&lt;style&gt;
#testWrap{
    height: 70px;
    transition: height 1s;
    overflow: hidden;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;button id="show"&gt;显示&lt;/button&gt;
&lt;button id="hide"&gt;隐藏&lt;/button&gt;
&lt;div id="testWrap"&gt;
    &lt;div id="test" style="background:lightblue;width:100px;height:60px;margin-top: 10px;"&gt;测试内容&lt;/div&gt;        
&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
show.onclick = function(){
    testWrap.style.height = '70px';
}    
hide.onclick = function(){
    testWrap.style.height = '0';
}
&lt;/script&gt;    </pre>
</div>

<iframe style="line-height: 1.5; width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/showhide/s5.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### clip

&emsp;&emsp;CSS裁剪[clip](http://www.cnblogs.com/xiaohuochai/p/5285752.html)这个属性平时用的不多，当clip:rect(top,right,bottom,left)中的top&gt;=bottom，或者left&gt;=right时，可实现元素的隐藏效果，效果类似于visibility:hidden

&emsp;&emsp;注意：clip属性只能应用在绝对定位元素上

<div>
<pre>&lt;button id="show"&gt;显示&lt;/button&gt;
&lt;button id="hide"&gt;隐藏&lt;/button&gt;
&lt;div id="test" style="background:lightblue;width:100px;height:60px;margin-top: 10px;"&gt;测试内容&lt;/div&gt;    </pre>
</div>
<div>
<pre>&lt;script&gt;
show.onclick = function(){
    test.style.position ='static';
    test.style.clip = 'auto';
}    
hide.onclick = function(){
    test.style.position ='absolute';
    test.style.clip = 'rect(0 0 0 0)';
}
&lt;/script&gt;    </pre>
</div>

<iframe style="width: 100%; height: 110px;" src="https://demo.xiaohuochai.site/css/showhide/s6.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### transform

&emsp;&emsp;CSS变形[transform](http://www.cnblogs.com/xiaohuochai/p/5350254.html)是一些效果的集合，主要是移动、旋转、缩放和倾斜这四种基本操作，还可以通过设置matrix矩阵来实现更复杂的效果。通过不同的变形函数可以实现元素显隐效果

&emsp;&emsp;注意：IE9-浏览器不支持，safari3.1-8、android2.1-4.4.4、IOS3.2-8.4都需要添加前缀

【1】scale

&emsp;&emsp;transform:scale(0)时，元素被隐藏

<div>
<pre>&lt;button id="show"&gt;显示&lt;/button&gt;
&lt;button id="hide"&gt;隐藏&lt;/button&gt;
&lt;div id="test" style="background:lightblue;width:100px;height:60px;margin-top: 10px;transition: 0.5s;"&gt;测试内容&lt;/div&gt;    </pre>
</div>
<div>
<pre>&lt;script&gt;
show.onclick = function(){
    test.style.transform ='scale(1)';
}    
hide.onclick = function(){
    test.style.transform ='scale(0)';
}
&lt;/script&gt;    </pre>
</div>

<iframe style="width: 100%; height: 110px;" src="https://demo.xiaohuochai.site/css/showhide/s7.html" frameborder="0" width="320" height="240"></iframe>

【2】rotate

&emsp;&emsp;transform:rotateX(90deg)时，元素被隐藏

<div>
<pre>&lt;button id="show"&gt;显示&lt;/button&gt;
&lt;button id="hide"&gt;隐藏&lt;/button&gt;
&lt;div id="test" style="background:lightblue;width:100px;height:60px;margin-top: 10px;transition: 0.5s;"&gt;测试内容&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
show.onclick = function(){
    test.style.transform ='rotateX(0)';
}    
hide.onclick = function(){
    test.style.transform ='rotateX(90deg)';
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 110px;" src="https://demo.xiaohuochai.site/css/showhide/s8.html" frameborder="0" width="320" height="240"></iframe>

【3】skew

&emsp;&emsp;transform:skew(90deg)时，元素被隐藏

<div>
<pre>&lt;button id="show"&gt;显示&lt;/button&gt;
&lt;button id="hide"&gt;隐藏&lt;/button&gt;
&lt;div id="test" style="background:lightblue;width:100px;height:60px;margin-top: 10px;transition: 0.5s;"&gt;测试内容&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
show.onclick = function(){
    test.style.transform ='skew(0)';
}    
hide.onclick = function(){
    test.style.transform ='skew(90deg)';
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 110px;" src="https://demo.xiaohuochai.site/css/showhide/s9.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 覆盖

&emsp;&emsp;利用定位元素可以覆盖普通流元素的特性。为元素的before伪元素设置相同的尺寸，通过控制[伪元素](http://www.cnblogs.com/xiaohuochai/p/5021121.html)的定位属性，实现显隐效果

<div>
<pre>&lt;style&gt;
#test:hover:before{
    content: "";
    position: absolute;
    width: 100px;
    height: 60px;
    background-color: white;
}    
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div style="background:lightblue;width:100px;height:60px;margin-top: 10px;"&gt;测试内容&lt;/div&gt;</pre>
</div>

//鼠标移入移出会出现元素的显隐效果

<iframe style="width: 100%; height: 90px;" src="https://demo.xiaohuochai.site/css/showhide/s10.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 偏移

&emsp;&emsp;元素显示隐藏的另一种常见思路是偏移，将元素移动到视窗范围外，也可以实现等价的显隐效果

【1】margin-top

&emsp;&emsp;利用[负margin](http://www.cnblogs.com/xiaohuochai/p/5314289.html)将元素移出视窗外，要注意的是设置负margin的元素并没有脱离普通流，后续元素会跟着一起移动

<div>
<pre>&lt;button id="show"&gt;显示&lt;/button&gt;
&lt;button id="hide"&gt;隐藏&lt;/button&gt;
&lt;div id="test" style="background:lightblue;width:100px;height:60px;margin-top: 10px;transition: 0.5s;"&gt;测试内容&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
show.onclick = function(){
    test.style.marginTop ='10px';
}    
hide.onclick = function(){
    test.style.marginTop ='-9999px';
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 110px;" src="https://demo.xiaohuochai.site/css/showhide/s11.html" frameborder="0" width="320" height="240"></iframe>

【2】left

&emsp;&emsp;通过设置[相对定位](http://www.cnblogs.com/xiaohuochai/p/5321487.html)或[绝对定位](http://www.cnblogs.com/xiaohuochai/p/5312917.html)元素的[偏移](http://www.cnblogs.com/xiaohuochai/p/5289143.html)属性，将元素移动到视窗外

<div>
<pre>&lt;style&gt;
#test{
    position: relative;
/*  position: absolute; */
}    
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;button id="show"&gt;显示&lt;/button&gt;
&lt;button id="hide"&gt;隐藏&lt;/button&gt;
&lt;div id="test" style="background:lightblue;width:100px;height:60px;margin-top: 10px;transition: 0.5s;"&gt;测试内容&lt;/div&gt;    </pre>
</div>
<div>
<pre>&lt;script&gt;
show.onclick = function(){
    test.style.left ='0';
}    
hide.onclick = function(){
    test.style.left ='-9999px';
}
&lt;/script&gt;    </pre>
</div>

<iframe style="width: 100%; height: 110px;" src="https://demo.xiaohuochai.site/css/showhide/s12.html" frameborder="0" width="320" height="240"></iframe>

【3】translate

<div>
<pre>&lt;button id="show"&gt;显示&lt;/button&gt;
&lt;button id="hide"&gt;隐藏&lt;/button&gt;
&lt;div id="test" style="background:lightblue;width:100px;height:60px;margin-top: 10px;transition: 0.5s;"&gt;测试内容&lt;/div&gt;    </pre>
</div>
<div>
<pre>&lt;script&gt;
show.onclick = function(){
    test.style.transform ='translate(0,0)';
}    
hide.onclick = function(){
    test.style.transform ='translate(-9999px,-9999px)';
}
&lt;/script&gt;    </pre>
</div>

<iframe style="width: 100%; height: 110px;" src="https://demo.xiaohuochai.site/css/showhide/s13.html" frameborder="0" width="320" height="240"></iframe>
