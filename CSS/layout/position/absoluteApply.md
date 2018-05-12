# CSS绝对定位的应用

&emsp;&emsp;之前的博客文章已经详细介绍过绝对定位的基础知识，由于它的用途实在广泛，于是单独为其写这篇关于其应用的博客。[关于绝对定位的基础知识移步至此](http://www.cnblogs.com/xiaohuochai/p/5312917.html)

&nbsp;

## 静态位置

&emsp;&emsp;当元素绝对定位后，若该元素的格式化属性不发生变化，则该元素处于静态位置。[关于绝对定位元素格式化的相关内容移步至此](http://www.cnblogs.com/xiaohuochai/p/5289143.html#anchor5)。元素的静态位置是指元素在正常流中原本的位置，更确切的讲，顶端的静态位置是从包含块的上边界到假想框的上外边距边界之间的距离。假想框是假设元素position属性为static时元素的第一个框。

**应用**

&emsp;&emsp;以下是基于绝对定位静态位置的应用

### 跟随图标

&emsp;&emsp;图标使用不依赖定位父级的absolute和margin属性进行定位，这样，当文本的字符个数改变时，图标的位置可以自适应

<div class="cnblogs_code">
<pre>div{
    height: 20px;
    width: 500px;
    line-height: 20px;
    margin-bottom: 30px;
}    
i{
    position: absolute;
    width: 28px;
    height: 11px;
    margin: -6px 0 0 2px;
    background: url('http://sandbox.runjs.cn/uploads/rs/26/ddzmgynp/hot.gif');
}</pre>
</div>
<div class="cnblogs_code">
<pre>&lt;div&gt;长度可变文字&lt;i&gt;&lt;/i&gt;&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/css/absoluteshow/a1.html" frameborder="0" width="320" height="240"></iframe>

### 视频提示

&emsp;&emsp;一般在视频图片上的边角上都会有"自制"、"最新"、"1080p"等诸如此类的提示。使用不依赖的绝对定位属性，可以让父级元素不设置relative，拓展性更强

<div class="cnblogs_code">
<pre>i{
    position: absolute;
    width:40px;
    text-align: center;
    height: 18px;
    line-height: 18px;
    font-style: normal;
    background-color: orange;
    color: white;
    padding: 2px;
}    
.box{
    height: 200px;
    width: 200px;
    border: 2px solid gray;
}
.in{
    width: 100%;
    height: 100%;
    line-height: 100px;
    background-color: pink;
    display:inline-block;
}
.rt{
    margin-left: -44px;
}
.lb{
    margin-top: -22px;
}
.rb{
    float: right;
    margin-top: -22px;
    margin-left: -44px;
}</pre>
</div>
<div class="cnblogs_code">
<pre>&lt;div class="box"&gt;
    &lt;i class="lt"&gt;自制&lt;/i&gt;
    &lt;div class="in"&gt;测试内容&lt;/div&gt;&lt;!--
    --&gt;&lt;i class="rt"&gt;独家&lt;/i&gt;
    &lt;i class="lb"&gt;1080p&lt;/i&gt;
    &lt;span style="width: 100%;display:inline-block"&gt;&lt;/span&gt;&lt;!--
    --&gt;&lt;i class="rb"&gt;最新&lt;/i&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 240px;" src="https://demo.xiaohuochai.site/css/absoluteshow/a2.html" frameborder="0" width="320" height="240"></iframe>

### 下拉菜单

&emsp;&emsp;一般地，下拉菜单作为一个组件需要使用在各种场景中，如果给组件添加relative属性，则降低了其利用率

<div class="cnblogs_code">
<pre>body{
    margin: 0;
}    
ul{
    margin: 0;
    padding: 0;
    list-style: none;
}
input{
    padding: 0;
    border: 0;
}
.box{
    width: 200px;
    height: 38px;
    border: 2px solid gray;
}
.con{
    overflow: hidden;
}
.input{
    float: left;
    width: 160px;
    height: 38px;
}
.search{
    width: 38px;
    height: 38px;
    float: right;
    background: url('http://sandbox.runjs.cn/uploads/rs/26/ddzmgynp/search.png') 0 -38px;
}
.list{
    display:none;
    position: absolute;
    width: 158px;
    border: 1px solid #e6e8e9; 
    overflow: hidden;
}
.in{
    line-height: 30px;
    border-bottom: 1px solid lightblue;
    cursor:pointer;
    text-indent: 1em;
}
.in:hover{
    background-color: #f9f9f9;
}</pre>
</div>
<div class="cnblogs_code">
<pre>&lt;div class="box"&gt;
    &lt;div class="con"&gt;
        &lt;input class="input" id="input"&gt;
        &lt;a href="javascript:;" class="search"&gt;&lt;/a&gt;
    &lt;/div&gt;
    &lt;ul class="list" id="list"&gt;
        &lt;li class="in"&gt;选项一&lt;/li&gt;
        &lt;li class="in"&gt;选项二&lt;/li&gt;
        &lt;li class="in" style="margin-bottom: -1px"&gt;选项三&lt;/li&gt;
    &lt;/ul&gt;        
&lt;/div&gt;</pre>
</div>
<div class="cnblogs_code">
<pre>input.onfocus = function(){
    list.style.display = 'block';
}
input.onblur = function(){
    list.style.display = 'none';
}</pre>
</div>

<iframe style="line-height: 1.5; width: 100%; height: 140px;" src="https://demo.xiaohuochai.site/css/absoluteshow/a3.html" frameborder="0" width="320" height="240"></iframe>

### 边缘对齐

&emsp;&emsp;很多网站都使用了边缘对齐，但好多都是用页面宽度计算出来的，当宽度变化时需要重新计算。而无依赖的绝对定位利用静态位置，无需计算就可将其位置确定，且拓展性好

<div class="cnblogs_code">
<pre>body{
    margin: 0;
}
ul{
    margin: 0;
    padding: 0;
    list-style: none;
}
.box{
    width: 200px;
    height: 100px;
    border: 2px solid black;
    background-color: lightgreen;
}    
.out{
    text-align: right;
}
.list{
    position: absolute;
    margin: 10px 0 0 2px;
    display: inline-block;
}
.in{
    text-align: center;
    width: 20px;
    line-height: 20px;
    margin-top: 4px;
    background-color: pink;
    border-radius: 50%;
}</pre>
</div>
<div class="cnblogs_code">
<pre>&lt;div class="box"&gt;
    &lt;div class="out"&gt;
        &lt;!-- 对于safari浏览器需要添加空格&amp;nbsp;来触发右对齐，其他浏览器则不需要--&gt;
        &amp;nbsp;
        &lt;ul class="list"&gt;
            &lt;li class="in"&gt;一&lt;/li&gt;
            &lt;li class="in"&gt;二&lt;/li&gt;
            &lt;li class="in"&gt;三&lt;/li&gt;
        &lt;/ul&gt;        
    &lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="line-height: 1.5; width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/absoluteshow/a4.html" frameborder="0" width="320" height="240"></iframe>

### 星号

&emsp;&emsp;在很多注册或登录页面中，存在用`*`表示的必填项。`*`和`*`号对齐，文字和文字对齐。这种情况使用静态位置的绝对定位比较合适

<div class="cnblogs_code">
<pre>body{
    margin: 0;
}
ul{
    margin: 0;
    padding: 0;
    list-style: none;
}
i{
    font-style: normal;
    color: red;
    position:absolute;
    margin-left: -10px;
}
.list{
    width: 100px;
    padding-left: 20px;
    border: 2px solid black;
    line-height: 2;
}</pre>
</div>
<div class="cnblogs_code">
<pre>&lt;ul class="list"&gt;
    &lt;li class="in"&gt;
        &lt;i&gt;*&lt;/i&gt;&lt;span&gt;手机号&lt;/span&gt;
    &lt;/li&gt;
    &lt;li class="in"&gt;
        &lt;span&gt;用户名&lt;/span&gt;
    &lt;/li&gt;
    &lt;li class="in"&gt;
        &lt;i&gt;*&lt;/i&gt;&lt;span&gt;密码&lt;/span&gt;
    &lt;/li&gt;
&lt;/ul&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/absoluteshow/a5.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

## 偏移属性

&emsp;&emsp;当使用偏移属性时，绝对定位元素将相对于包含块进行定位。一般地，我们仅仅使用偏移属性中的两个，且这两个属性不对立。但实际上，对立的偏移属性如left和right可以同时使用，甚至4个偏移属性都可以同时使用，并且可以达到一些意想不到的效果。以下基于绝对定位偏移属性的应用

**应用**

### 全屏自适应

&emsp;&emsp;实现一个距离屏幕右侧200px的全屏自适应的容器层

<div class="cnblogs_code">
<pre>.box{
    position: absolute;
    top: 0;
    left: 0;
    right: 200px;
    bottom: 0;
    background-color: pink;
}</pre>
</div>
<div class="cnblogs_code">
<pre>&lt;div class="box"&gt;&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/absoluteshow/a6.html" frameborder="0" width="320" height="240"></iframe>

### 左右半区翻图

&emsp;&emsp;一些选项卡中存在左右半区的翻图效果，点击左覆盖区切换到上一张图片，点击右覆盖区切换到下一张图片

<div class="cnblogs_code">
<pre>ul{
    margin: 0;
    padding: 0;
    list-style: none;
}
.box{
    position: relative;
    width: 300px;
    height: 200px;
    border: 2px solid lightgray;
    text-align: center;
    font: 40px/200px '宋体';
    color: white;
    overflow: hidden;
}
.list{
    position: absolute;
    width: 400%;
    left: 0;
    top: 0;
    bottom: 0;
    transition: left 1s;
}
.in{
    float: left;
    width: 25%;
    background-color: lightgreen;
}
.l,.r{
    position: absolute;
    opacity: 0;
    top: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.1);
    cursor: pointer;
}
.l{
    left: 0;
    right: 50%;
}
.r{
    left: 50%;
    right: 0;
}
.l:hover,.r:hover{
    opacity: 1;
    transition: 1s;
}</pre>
</div>
<div class="cnblogs_code">
<pre>&lt;div class="box"&gt;
    &lt;ul class="list" id="list"&gt;
        &lt;li class="in"&gt;第1个&lt;/li&gt;
        &lt;li class="in"&gt;第2个&lt;/li&gt;
        &lt;li class="in"&gt;第3个&lt;/li&gt;
        &lt;li class="in"&gt;第4个&lt;/li&gt;
    &lt;/ul&gt;
    &lt;div class="l" id="l"&gt;&amp;lt;&lt;/div&gt;
    &lt;div class="r" id="r"&gt;&amp;gt;&lt;/div&gt;
&lt;/div&gt;</pre>
</div>
<div class="cnblogs_code">
<pre>var index = 0;
var children = list.children;
l.onclick = function(){
    if(index &gt; 0){
        index --;
        move(index);
    }
}
r.onclick = function(){
    if(index &lt; children.length -1){
        index++;
        move(index);
    }
}
function move(index){
    list.style.left = '-' + index*100 + '%';
}</pre>
</div>

<iframe style="width: 100%; height: 220px;" src="https://demo.xiaohuochai.site/css/absoluteshow/a7.html" frameborder="0" width="320" height="240"></iframe>

### 九宫格

&emsp;&emsp;利用绝对定位的偏移属性可以制作宽高自适应的九宫格效果

<div class="cnblogs_code">
<pre>ul{
    margin: 0;
    padding: 0;
    list-style: none;
}    
.list{
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
}
.in{
    position: relative;
    float: left;
    height: 33.3%;
    width: 33.3%;
    background-color: pink;
}
.in:before{
    content: '';
    position: absolute;
    left: 10px;
    right: 10px;
    top: 10px;
    bottom: 10px;
    background-color: lightblue;
    border-radius: 10px;
}
.in:after{
    content: attr(data-value);
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    height: 30px;
    margin: auto;
    text-align: center;
    font:bold 24px/30px  '宋体';
}</pre>
</div>
<div class="cnblogs_code">
<pre>&lt;ul class="list"&gt;
    &lt;li class="in" data-value='1'&gt;&lt;/li&gt;
    &lt;li class="in" data-value='2'&gt;&lt;/li&gt;
    &lt;li class="in" data-value='3'&gt;&lt;/li&gt;
    &lt;li class="in" data-value='4'&gt;&lt;/li&gt;
    &lt;li class="in" data-value='5'&gt;&lt;/li&gt;
    &lt;li class="in" data-value='6'&gt;&lt;/li&gt;
    &lt;li class="in" data-value='7'&gt;&lt;/li&gt;
    &lt;li class="in" data-value='8'&gt;&lt;/li&gt;
    &lt;li class="in" data-value='9'&gt;&lt;/li&gt;
&lt;/ul&gt;</pre>
</div>

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/absoluteshow/a8.html" frameborder="0" width="320" height="240"></iframe>

### 等高布局

&emsp;&emsp;利用overflow清除浮动的BFC的包裹性，形成一个看似等高的布局，再利用绝对定位模拟出背景和间隔线

<div class="cnblogs_code">
<pre>.box{
    width: 80%;
    margin: auto;
    border: 1px solid gray;
    overflow: hidden;
    position: relative;
    background-color: lightgreen;
}
.l{
    box-sizing:border-box;
    float: left;
    width: 25%;
    position: relative;
}
.r{
    box-sizing:border-box;
    float: right;
    width: 75%;
    padding: 10px;
    height: 100%;
}
.con{
    position: absolute;
    background-color: lightblue;
    border-right: 1px solid #ccc;
    height: 9999px;
    width: 100%;
}
.show{
    padding: 10px;
    position: relative;
}</pre>
</div>
<div class="cnblogs_code">
<pre>&lt;div class="box"&gt;
    &lt;div class="l"&gt;
        &lt;div class="con"&gt;&lt;/div&gt;
        &lt;div class="show"&gt;测试文字&lt;br&gt;测试文字&lt;br&gt;&lt;/div&gt;
    &lt;/div&gt;
    &lt;div class="r"&gt;测试文字&lt;br&gt;测试文字&lt;br&gt;测试文字&lt;br&gt;&lt;/div&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/css/absoluteshow/a9.html" frameborder="0" width="320" height="240"></iframe>

### 整体布局

&emsp;&emsp;整体布局的思路就是利用绝对定位元素的偏移属性来替代固定定位，首先让&lt;page&gt;元素满屏起到&lt;body&gt;元素的作用，然后各个模块各居其位。如果有其他的一些整体的页面遮罩，则与&lt;page&gt;元素平级

<div class="cnblogs_code">
<pre>html,body{
    height: 100%;
}
body{
    margin: 0;
}
.page{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
}
header,footer{
    position: absolute;
    left: 0;
    right: 0;
    height: 50px;
}
header{
    top: 0;
    background-color: lightgreen;
}
footer{
    bottom: 0;
    background-color: lightcoral;
}
aside{
    position: absolute;
    left: 0;
    top: 50px;
    bottom: 50px;
    width: 250px;
    background-color: lightblue;
}
.content{
    position: absolute;
    top: 50px;
    bottom: 50px;
    left: 250px;
    right: 0;
    overflow: auto;
    background-color: pink;
}</pre>
</div>
<div class="cnblogs_code">
<pre>&lt;div class="page"&gt;
    &lt;div class="content"&gt;
        &lt;div style="height: 1000px"&gt;内容区&lt;/div&gt;
    &lt;/div&gt;
    &lt;aside&gt;侧边栏&lt;/aside&gt;
    &lt;header&gt;头部&lt;/header&gt;
    &lt;footer&gt;底部&lt;/footer&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/absoluteshow/a10.html" frameborder="0" width="320" height="240"></iframe>

