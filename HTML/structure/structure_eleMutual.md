# 不常用的3个HTML交互元素：details、summary、dialog

&emsp;&emsp;HTML5不仅新增了语义型区块级元素及表单类元素，也新增了一些其他的功能性元素，这些元素由于浏览器支持等各种原因，并没有被广泛使用

&nbsp;

## 文档描述

&emsp;&emsp;&lt;details&gt;主要用于描述文档或文档某个部分的细节，与&lt;summary&gt;配合使用可以为&lt;details&gt;定义标题。标题是可见的，用户点击标题时，显示出details

&emsp;&emsp;注意：这两个标签只有chrome和opera支持

&nbsp;

### &lt;details&gt;

&emsp;&emsp;该标签仅有一个open属性，用来定义details是否可见(默认为不可见状态)

<div>
<pre>&lt;details&gt;
  &lt;summary&gt;Copyright 2015.&lt;/summary&gt;
  &lt;p&gt;小火柴的蓝色理想&lt;/p&gt;
&lt;/details&gt;    </pre>
</div>

<iframe src="https://demo.xiaohuochai.site/html/struc/s1.html" frameborder="0" width="300" height="100"></iframe>

&nbsp;

## 对话框

&emsp;&emsp;&lt;dialog&gt;标签用来定义对话框或窗口，且该对话框位于窗口的水平居中位置

&nbsp;

### &lt;dialog&gt;

&emsp;&emsp;该标签只有一个open属性，用来定义对话框是否可见(默认为不可见)

&emsp;&emsp;注意：只有chrome和opera支持

<div>
<pre>&lt;button&gt;显示对话框&lt;/button&gt;
&lt;dialog&gt;我是对话框的内容&lt;/dialog&gt;
&lt;script&gt;
var oBtn = document.getElementsByTagName('button')[0];
var oDia = document.getElementsByTagName('dialog')[0]; 
oBtn.onclick = function(){
  console.log(oDia.getAttribute('open'))
  if(!oDia.getAttribute('open')){
    oDia.setAttribute('open','open');
    this.innerHTML ='隐藏文本框';
  }else{
    oDia.removeAttribute('open');
    this.innerHTML = '显示文本框';
  }
}
&lt;/script&gt;</pre>
</div>

<iframe src="https://demo.xiaohuochai.site/html/struc/s2.html" frameborder="0" width="300" height="100"></iframe>