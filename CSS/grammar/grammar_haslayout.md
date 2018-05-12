# haslayout详解

### 定义

&emsp;&emsp;haslayout是IE7-浏览器的特有属性。hasLayout是一种只读属性，有两种状态：true或false。当其为true时，代表该元素有自己的布局，否则代表该元素的布局继承于父元素

&emsp;&emsp;注意：通过element.currentStyle.hasLayout可以得出当前元素的hasLayout情况

&nbsp;

### HTML标签

&emsp;&emsp;默认触发hasLayout的有如下HTML标签：

&emsp;&emsp;【1】html,body

&emsp;&emsp;【2】table,tr,th,td

&emsp;&emsp;【3】img

&emsp;&emsp;【4】hr

&emsp;&emsp;【5】input,button,select,textarea,fieldset

&emsp;&emsp;【6】frameset,frame,iframe

&nbsp;

### CSS属性

&emsp;&emsp;可以触发hasLayout的有如下CSS属性：

&emsp;&emsp;【1】display:inline-block

&emsp;&emsp;【2】height/width:除了auto

&emsp;&emsp;【3】float:left/right

&emsp;&emsp;【4】position:absolute

&emsp;&emsp;【5】writing-mode(IE专有属性，设置文本的垂直显示):tb-rl

&emsp;&emsp;【6】zoom(IE专有属性，设置或检索对象的缩放比例):除了normal

&nbsp;

【IE7专有的触发hasLayout的CSS属性】

&emsp;&emsp;【1】min-height/max-height/min-width/max-width:除none

&emsp;&emsp;【2】overflow\overflow-x\overflow-y:除visible

&emsp;&emsp;【3】position:fixed

&nbsp;　

### 用途

&emsp;&emsp;【1】解决IE7-浏览器下父级边框不阻止子级上下margin传递的bug

<div>
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8"&gt;
&lt;title&gt;Document&lt;/title&gt;
&lt;style&gt;
body{
  margin: 0;
}
ul{
    margin: 0;
    padding: 0;
    list-style: none;
}
.list{
    border: 10px solid black;
    background-color: red;
    /*触发hasLayout*/
    /*float:left;*/
}
.in{
    height: 100px;
    width: 100px;
    margin-top: 50px;
    background-color: blue;
}
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;ul class="list"&gt;
    &lt;li class="in"&gt;&lt;/li&gt;
&lt;/ul&gt;
&lt;/body&gt;    
&lt;/html&gt;    </pre>
</div>

&nbsp;

&emsp;&emsp;【2】配合display:inline让块元素模拟inline-block

<div>
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8"&gt;
&lt;title&gt;Document&lt;/title&gt;
&lt;style&gt;
body{
    margin: 0;
}
.box{
    width: 100px;
    height: 100px;
    background-color: red;
    display:inline-block;
    /*配合display:inline触发hasLayout*/
    /*     float:left;
    display:inline; */
}
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div class="box" id="box"&gt;&lt;/div&gt;&lt;span&gt;测试inline-block用&lt;/span&gt;
&lt;/body&gt;    
&lt;/html&gt;            </pre>
</div>

&nbsp;

&emsp;&emsp;【3】解决在IE7-浏览器下LI4px空隙bug(IE7-浏览器下li有高度或宽度或zoom:1，且仅包含内联元素，且内联元素被设置为display:block，li下会多出3px的垂直间距)

<div>
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8"&gt;
&lt;title&gt;Document&lt;/title&gt;
&lt;style&gt;
body{
    margin: 0;
}
ul{
    margin: 0;
    padding: 0;
    list-style: none;
}
.list{
    width: 200px;
    background-color: lightgreen;
}
.in{
    height: 100px;
    background-color: lightblue;
}
.span{
    display: block;
    zoom:1;
}
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;ul class="list"&gt;
    &lt;li class="in"&gt;
        &lt;span class="span"&gt;1231&lt;/span&gt;
    &lt;/li&gt;
    &lt;li class="in"&gt;
        &lt;span class="span"&gt;1232&lt;/span&gt;
    &lt;/li&gt;
&lt;/ul&gt;
&lt;/body&gt;    
&lt;/html&gt;        </pre>
</div>

&nbsp;

&emsp;&emsp;【4】触发浮动元素的父级的hasLayout，浮动元素会被layout元素自动包含，相当于IE7-浏览器下实现清浮动

<div>
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
&lt;meta charset="UTF-8"&gt;
&lt;title&gt;Document&lt;/title&gt;
&lt;style&gt;
body{
    margin: 0;
}
ul{
    margin: 0;
    padding: 0;
    list-style: none;
}
.list{
    background-color: lightgreen;
    height: 200px;
}
.in{
    float: left;
    width: 100px;
    height: 100px;
    border: 1px solid black;
    background-color: lightblue;
}
.test{
    width: 100px;
    height: 150px;
    background-color: yellow;
}
&lt;/style&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;ul class="list"&gt;
    &lt;li class="in"&gt;&lt;/li&gt;
    &lt;li class="in"&gt;&lt;/li&gt;
&lt;/ul&gt;
&lt;div class="test"&gt;测试浮动&lt;/div&gt;
&lt;/body&gt;    
&lt;/html&gt;            
</div>
