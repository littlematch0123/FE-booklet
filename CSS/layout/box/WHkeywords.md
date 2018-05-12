# CSS3四个自适应关键字——fill-available、max-content、min-content、fit-content

&emsp;&emsp;一般地，有两种自适应：撑满空闲空间与收缩到内容尺寸。CSS3将这两种情况分别定义为'fill-available'和'fit-content'。除此之外&nbsp;，还新增了更细粒度的'min-content'和'max-content'。这四个关键字可用于设置宽高属性。本文将详细介绍CSS3中的这四个自适应关键字

&emsp;&emsp;注意：IE浏览器不支持，webkit内核浏览器需添加-webkit-前缀

&nbsp;

### fill-available

&emsp;&emsp;width:fill-available表示撑满可用空间

&emsp;&emsp;举例来说，页面中一个&lt;div&gt;元素，该&lt;div&gt;元素的width表现就是fill-available自动填满剩余的空间

&emsp;&emsp;出现fill-available关键字值的价值在于，可以让元素的100%自动填充特性不仅仅在block水平元素上，也可以应用在其他元素

&emsp;&emsp;下面的例子中，inline-block元素宽度撑满了可用宽度

<div>
<pre>&lt;style&gt;
div{
  background-color: pink;
  display:inline-block;
  width:-webkit-fill-available;
}
&lt;/style&gt;
&lt;div&gt;小火柴的蓝色理想&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/auto/a1.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;类似地，高度也有此特性

&emsp;&emsp;下面的例子中，div元素高度撑满了可用高度

<div>
<pre>&lt;style&gt;
div.inner{
  background-color: pink;
  height:-webkit-fill-available;
}
&lt;/style&gt;
&lt;div style="height: 100px;"&gt;
  &lt;div class="inner"&gt;小火柴的蓝色理想&lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/css/auto/a2.html" frameborder="0" width="320" height="240"></iframe>

【等高布局】

&emsp;&emsp;于是，利用fill-available可以轻松地实现等高布局

<div>
<pre>&lt;style&gt;
.inner{
  width:100px;
  height:-webkit-fill-available;
  margin:0 10px;
  display: inline-block;
  vertical-align: middle;
  background-color: pink;
}
&lt;/style&gt;
&lt;div style="height: 100px;"&gt;
  &lt;div class="inner"&gt;HTML&lt;/div&gt;
  &lt;div class="inner"&gt;CSS&lt;/div&gt;
  &lt;div class="inner"&gt;JS&lt;br&gt;jQyery&lt;br&gt;Vue&lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/css/auto/a3.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### fit-content

&emsp;&emsp;width:fit-content表示将元素宽度收缩为内容宽度

&emsp;&emsp;下面是一个实例

<div>
<pre>&lt;style&gt;
div{
  background-color: pink;
  width:-webkit-fit-content;
}
&lt;/style&gt;
&lt;div&gt;小火柴的蓝色理想&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/auto/a4.html" frameborder="0" width="320" height="240"></iframe>

【水平居中】

&emsp;&emsp;`width:fit-content`可以实现元素收缩效果的同时，保持原本的block水平状态，于是，就可以直接使用`margin:auto`实现元素向内自适应同时的居中效果了

<div>
<pre>&lt;style&gt;
div{
  background-color: pink;
  width:-webkit-fit-content;
  margin:auto;
}
&lt;/style&gt;
&lt;div&gt;小火柴的蓝色理想&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/auto/a5.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;类似地，高度也有此特性，但不常用

&nbsp;

### min-content

&emsp;&emsp;width:min-content表示采用内部元素最小宽度值最大的那个元素的宽度作为最终容器的宽度

&emsp;&emsp;首先，要明白这里的&ldquo;最小宽度值&rdquo;是什么意思。替换元素，例如图片的最小宽度值就是图片呈现的宽度，对于文本元素，如果全部是中文，则最小宽度值就是一个中文的宽度值；如果包含英文，因为默认英文单词不换行，所以，最小宽度可能就是里面最长的英文单词的宽度

<div>
<pre>&lt;style&gt;
.outer{
  width:-webkit-min-content;
}
&lt;/style&gt;
&lt;div class="outer"&gt;
  &lt;div style="height:10px;width:100px;background:lightgreen"&gt;&lt;/div&gt;
  &lt;div style="background-color: pink;"&gt;小火柴的蓝色理想&lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 80px;" src="https://demo.xiaohuochai.site/css/auto/a6.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### max-content

&emsp;&emsp;width:max-content表示采用内部元素宽度值最大的那个元素的宽度作为最终容器的宽度。如果出现文本，则相当于文本不换行

<div>
<pre>&lt;style&gt;
.outer{
  width:-webkit-max-content;
  border:1px solid black;
}
&lt;/style&gt;
&lt;div class="outer"&gt;
  &lt;div style="height:10px;width:100px;background:lightgreen"&gt;&lt;/div&gt;
  &lt;div style="background-color: pink;"&gt;小火柴的蓝色理想小火柴的蓝色理想小火柴的蓝色理想小火柴的蓝色理想小火柴的蓝色理想小火柴的蓝色理想小火柴的蓝色理想小火柴的蓝色理想小火柴的蓝色理想小火柴的蓝色理想小火柴的蓝色理想小火柴的蓝色理想小火柴的蓝色理想小火柴的蓝色理想小火柴的蓝色理想小火柴的蓝色理想小火柴的蓝色理想小火柴的蓝色理想小火柴的蓝色理想小火柴的蓝色理想小火柴的蓝色理想&lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 80px;" src="https://demo.xiaohuochai.site/css/auto/a7.html" frameborder="0" width="320" height="240"></iframe>
