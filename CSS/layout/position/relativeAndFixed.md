# 理解CSS相对定位和固定定位

&emsp;&emsp;一般地，说起定位元素是指position不为static的元素，包括relative、absolute和fixed。前面已经详细介绍过absolute绝对定位的[基础](http://www.cnblogs.com/xiaohuochai/p/5312917.html)和[应用](http://www.cnblogs.com/xiaohuochai/p/5315942.html)，这篇博客介绍和梳理相对定位relative和固定定位fixed的相关知识

&nbsp;

### 相对定位

**定义**

&emsp;&emsp;可能理解起来最简单的定位机制就是相对定位了。采用这种机制时，通过使用偏移属性移动定位元素。当元素相对定位时，它会从其正常位置移走，不过，原来所占的空间并不会因此消失。相对定位元素，会为其所有子元素建立一个新的包含块。这个包含块对应于该元素原本所在的位置

&emsp;&emsp;注意：如果相对定位元素遇到过度受限的问题，一个值会重置为另一个值的相反数。bottom总是等于-top，right总是等于-left

<iframe style="width: 100%; height: 361px;" src="https://demo.xiaohuochai.site/css/relative/r1.html" frameborder="0" width="320" height="240"></iframe>

**百分比**

&emsp;&emsp;非常奇怪的是，虽然相对定位的数值型偏移属性是相对于自身的，但其百分比却是相对于包含块的。top和bottom百分比相对于包含块的高度(只是高度height，不包括纵向padding和border)，left和right百分比相对于包含块的宽度(只是宽度width，不包括横向padding和border)

&emsp;&emsp;注意：对于IE7-和firefox浏览器来说，若包含块的高度height为auto，则百分比的top和bottom设置有效果，而其他浏览器则都没有效果&nbsp;

<iframe style="width: 100%; height: 459px;" src="https://demo.xiaohuochai.site/css/relative/r2.html" frameborder="0" width="320" height="240"></iframe>

**特性**

【1】限制范围

&emsp;&emsp;一般地，给绝对定位元素限制范围时，为其父级元素设置相对定位relative，因为相对定位元素不脱离文档流

&emsp;&emsp;注意：相对定位元素可以限制绝对定位，但不能限制固定定位，因为固定定位是相对于视窗定位的

【2】提升层级

&emsp;&emsp;当想要提升元素层级，又不想脱离文档流时，使用相对定位是一个好主意

**行内元素**

&emsp;&emsp;不同于绝对定位元素可以使元素具有块级元素属性，相对定位应用于inline元素后，由于无法改变其行内元素的属性，不具备块级元素属性，无法设置宽高，其上下margin也依然存在问题

<iframe style="width: 100%; height: 557px;" src="https://demo.xiaohuochai.site/css/relative/r3.html" frameborder="0" width="320" height="240"></iframe>

**IE兼容**

&emsp;&emsp;在IE6浏览器下，haslayout下的元素负margin超出父元素的部分会被隐藏掉。这个问题可以通过设置margin负值元素的position属性值为relative来解决。

![hasloayoutPosition](https://pic.xiaohuochai.site/blog/CSS_layout_hasloayoutPosition.gif)

&nbsp;

### 固定定位

&emsp;&emsp;固定定位与绝对定位很类似，元素会完全从文档流中去除，但固定元素的偏移是相对于视窗。

&emsp;&emsp;注意：IE6-浏览器不支持

**特性**

&emsp;&emsp;固定定位与绝对定位的很多特性都类似，具有包裹性、破坏性及去浮动的特性，关于各浏览器中display属性的bug、clip属性的隐藏功能、静态位置跳动以及overflow失效的表现都相同，在此就不再赘述。

**全屏遮罩**

&emsp;&emsp;当页面内容超出页面容器大小出现滚动条时，此时使用absolute全屏遮罩会出现滚动条以外部分没有遮住的情况。因为根元素html的父级是document，document的高度和可视区域一致，也就是与视窗一致，是不包括滚动条以外部分的。

&emsp;&emsp;这时，只能使用fixed固定定位来实现全屏遮罩效果

<div>
<pre>.page{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: pink;
    z-index: -1;
}    
.test{
    width: 2000px;
    height: 200px;
    background-color: lightblue;
}</pre>
</div>
<div>
<pre>&lt;div class="page" id="page"&gt;&lt;/div&gt;
&lt;div class="test"&gt;&lt;/div&gt;    
&lt;button&gt;absolute&lt;/button&gt;
&lt;button&gt;fixed&lt;/button&gt;</pre>
</div>
<div>
<pre>var btns = document.getElementsByTagName('button');
for(var i = 0; i &lt; btns.length; i++){
    btns[i].onclick = function(){
        page.style.position = this.innerHTML;
    }
}</pre>
</div>

//分别点击两个按钮，并拖动横向滚动条查看效果

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/relative/r4.html" frameborder="0" width="320" height="240"></iframe>

