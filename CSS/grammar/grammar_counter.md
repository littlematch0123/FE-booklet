# 深入理解CSS计数器

&emsp;&emsp;我们对计数器已经不陌生了，有序列表中的列表项标志就是计数器。

&nbsp;

### 创建计数器

&emsp;&emsp;创建计数器的基础包括两个方面，一是能重置计数器的起点，二是能将其递增一定的量。

**counter-reset**

<div>
<pre>counter-reset:none;(默认)
counter-reset:&lt;identifier&gt;&lt;integer&gt;
//&lt;identifier&gt;是计数器标识符，是创作人员自己起的一个名字
//&lt;integer&gt;是重置的数字</pre>
</div>
<div>
<pre>counter-reset: c1 4;//表示将c1的计数器重置为4
counter-reset: c1 4 c2 0 c3 -5;//表示将c1重置为4,将c2重置为0,将c3重置为-5
couter-reset: c1;//将c1重置为0</pre>
</div>

 &emsp;&emsp;注意：如果不设置&lt;integer&gt;，则默认重置为0

**counter-increment**

<div>
<pre>counter-increment:none;(默认)
counter-increment:&lt;identifier&gt;&lt;integer&gt;
//&lt;identifier&gt;是计数器标识符，是创作人员自己起的一个名字
//&lt;integer&gt;是递增的数字</pre>
</div>
<div>
<pre>counter-increment: c1 4;//表示将c1计数器的递增设为4    
counter-reset: c1 4 c2 0 c3 -5;//表示将c1递增设为4,将c2递增设为0,将c3递增设为-5    
couter-increment: c1;//将c1计数器的递增设为1</pre>
</div>

&emsp;&emsp;注意：如果不设置&lt;integer&gt;，则默认递增为1

&nbsp;

### 使用计数器

&emsp;&emsp;具体使用计数器需要结合使用content属性和counter()函数

**counter()函数**

&emsp;&emsp;counter()函数接受两个参数，而且两参数之间用逗号(,)来分隔，第一个参数是计数器标识符，第二个参数设置计数器风格(可省略)，与列表中list-style-type值相同。同样的，可以使用多个counter()函数。

<div>
<pre>content: counter(c1,upper-roman);//表示使用大写罗马字母格式的计数器c1     </pre>
</div>

&emsp;&emsp;【关于计数器风格详见下面演示框】

&emsp;&emsp;&nbsp;&lt;演示框&gt;点击下列相应属性值可进行演示

<iframe style="width: 100%; height: 340px;" src="https://demo.xiaohuochai.site/css/base/b45.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### DEMO

**简单计数器演示**

&emsp;&emsp;&lt;演示框&gt;点击下列相应属性值可进行演示

<iframe style="width: 100%; height: 250px;" src="https://demo.xiaohuochai.site/css/base/b46.html" frameborder="0" width="320" height="240"></iframe>

**层级目录演示**

<div>
<pre>
&lt;div id="oShow"&gt;
    &lt;h2&gt;第一章&lt;/h2&gt;
    &lt;h3&gt;第一部分&lt;/h3&gt;
    &lt;p&gt;第一节&lt;/p&gt;
    &lt;p&gt;第二节&lt;/p&gt;
    &lt;h3&gt;第二部分&lt;/h3&gt;
    &lt;p&gt;第一节&lt;/p&gt;                
    &lt;h2&gt;第二章&lt;/h2&gt;
    &lt;h3&gt;第一部分&lt;/h3&gt;
    &lt;p&gt;第一节&lt;/p&gt;
    &lt;p&gt;第二节&lt;/p&gt;
    &lt;h3&gt;第二部分&lt;/h3&gt;
    &lt;p&gt;第一节&lt;/p&gt;                
    &lt;h2&gt;第三章&lt;/h2&gt;
    &lt;h3&gt;第一部分&lt;/h3&gt;
    &lt;p&gt;第一节&lt;/p&gt;
    &lt;p&gt;第二节&lt;/p&gt;
    &lt;h3&gt;第二部分&lt;/h3&gt;
    &lt;p&gt;第一节&lt;/p&gt;                
&lt;/div&gt;    </pre>
</div>
<div>
<pre>body,h2,h3,p{
    margin: 0;
}    
#oShow{
    counter-reset: c2;
}
#oShow h2{
    counter-reset: c3 cp;
    counter-increment: c2;
}
#oShow h3{
    counter-increment: c3;    
    counter-reset: cp;
    text-indent: 2em;
}
#oShow p{
    counter-increment: cp; 
    text-indent: 4em;   
}
#oShow h2:before{
    content: counter(c2);
}
#oShow h3:before{
    content: counter(c2) '.' counter(c3);
}
#oShow p:before{
    content: counter(c2) '.'  counter(c3)  '.' counter(cp);    
}</pre>
</div>

<iframe style="width: 100%; height: 440px;" src="https://demo.xiaohuochai.site/css/base/b43.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;&lt;演示框&gt;点击下列相应属性值可进行演示

<iframe style="width: 100%; height: 660px;" src="https://demo.xiaohuochai.site/css/base/b44.html" frameborder="0" width="320" height="240"></iframe>
