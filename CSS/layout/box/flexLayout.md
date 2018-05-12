# CSS弹性盒模型flex在布局中的应用

&emsp;&emsp;前面已经详细介绍过flex弹性盒模型的[基本语法](http://www.cnblogs.com/xiaohuochai/p/5323146.html)和[兼容写法](http://www.cnblogs.com/xiaohuochai/p/5334936.html)，本文将介绍flex在布局中的应用

&nbsp;

### 元素居中

&emsp;&emsp;【1】伸缩容器上使用主轴对齐justify-content和侧轴对齐align-items

<div>
<pre>&lt;style&gt;
.parent{
    display: flex;
    justify-content: center;
    align-items: center;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent"  style="background-color: lightgrey; height: 100px; width: 200px;"&gt;
    &lt;div class="in" style="background-color: lightblue;"&gt;DEMO&lt;/div&gt;      
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/flexshow/f1.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;【2】在伸缩项目上使用margin:auto

<div>
<pre>&lt;style&gt;
.parent{
    display: flex;
}
.in{
    margin: auto;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent"  style="background-color: lightgrey;height: 100px;width: 200px;"&gt;
    &lt;div class="in" style="background-color: lightblue;"&gt;DEMO&lt;/div&gt;      
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/flexshow/f2.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 两端对齐

<div>
<pre>&lt;style&gt;
.parent{
    display: flex;
    justify-content:space-between
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent"  style="background-color: lightgrey;height: 100px;width: 200px;"&gt;
    &lt;div class="in" style="background-color: lightblue;"&gt;DEMO&lt;/div&gt;
    &lt;div class="in" style="background-color: lightgreen;"&gt;DEMO&lt;/div&gt;
    &lt;div class="in" style="background-color: lightcyan;"&gt;DEMO&lt;/div&gt;
    &lt;div class="in" style="background-color: lightseagreen;"&gt;DEMO&lt;/div&gt;      
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/flexshow/f3.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 底端对齐

<div>
<pre>&lt;style&gt;
.parent{
    display: flex;
    align-items: flex-end;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent"  style="background-color: lightgrey;height: 100px;width: 200px;"&gt;
    &lt;div class="in" style="background-color: lightblue; height:20px;"&gt;DEMO&lt;/div&gt;
    &lt;div class="in" style="background-color: lightgreen; height:30px;"&gt;DEMO&lt;/div&gt;
    &lt;div class="in" style="background-color: lightcyan; height:40px;"&gt;DEMO&lt;/div&gt;
    &lt;div class="in" style="background-color: lightseagreen; height:50px;"&gt;DEMO&lt;/div&gt;      
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/flexshow/f4.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 输入框按钮

<div>
<pre>&lt;style&gt;
.inputBox{
    display: flex;
    width: 250px;
}
.inputBox-ipt{
    flex: 1;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="inputBox"&gt;
  &lt;input class="inputBox-ipt"&gt;
  &lt;button class="inputBox-btn"&gt;按钮&lt;/button&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/flexshow/f5.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 等分布局

<div>
<pre>&lt;style&gt;
body,p{margin: 0;}
.parent{
    display: flex;
}
.child{
    flex:1;
    height: 100px;
}
.child + .child{
    margin-left: 20px;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="child" style="background-color: lightblue;"&gt;1&lt;/div&gt;
    &lt;div class="child" style="background-color: lightgreen;"&gt;2&lt;/div&gt;
    &lt;div class="child" style="background-color: lightsalmon;"&gt;3&lt;/div&gt;
    &lt;div class="child" style="background-color: pink;"&gt;4&lt;/div&gt;                
&lt;/div&gt;    </pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/flexshow/f6.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 多列自适应布局

<div>
<pre>&lt;style&gt;
p{margin: 0;}
.parent{display: flex;}
.left,.center{margin-right: 20px;}
.right{flex: 1;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="left" style="background-color: lightblue;"&gt;
        &lt;p&gt;left&lt;/p&gt;
        &lt;p&gt;left&lt;/p&gt;
    &lt;/div&gt;            
    &lt;div class="center" style="background-color: pink;"&gt;
        &lt;p&gt;center&lt;/p&gt;
        &lt;p&gt;center&lt;/p&gt;
    &lt;/div&gt;            
    &lt;div class="right"  style="background-color: lightgreen;"&gt;
        &lt;p&gt;right&lt;/p&gt;
        &lt;p&gt;right&lt;/p&gt;
    &lt;/div&gt;                    
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/flexshow/f7.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 悬挂布局

<div>
<pre>&lt;style&gt;        
.box{
    display: flex;
    background-color: lightgrey;
    width: 300px;
}
.left{
    margin-right: 20px;
    background-color: lightblue;
    height: 30px;
}
.main{
    flex:1;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="box"&gt;
    &lt;div class="left"&gt;左侧悬挂&lt;/div&gt;
    &lt;div class="main"&gt;主要内容主要内容主要内容主要内容主要内容主要内容主要内容主要内容主要内容主要内容主要内容主要内容主要内容&lt;/div&gt;    
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/css/flexshow/f8.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 全屏布局

<div>
<pre>&lt;style&gt;
body,p{margin: 0;}
body,html,.parent{height: 100%;}
.parent{
    display: flex;
    flex-direction: column;
}
.top,.bottom{
    height: 50px;
}
.middle{
    display: flex;
    flex: 1;
}
.left{
    width: 100px;
    margin-right: 20px;
}
.right{
    flex: 1;
    overflow: auto;
}
.right-in{
    height: 1000px;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" id="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="top" style="background-color: lightblue;"&gt;
        &lt;p&gt;top&lt;/p&gt;
    &lt;/div&gt; 
    &lt;div class="middle" style="background-color: pink;"&gt;
        &lt;div class="left" style="background-color: orange;"&gt;
            &lt;p&gt;left&lt;/p&gt;
        &lt;/div&gt;     
        &lt;div class="right" style="background-color: lightsalmon;"&gt;
            &lt;div class="right-in"&gt;
                &lt;p&gt;right&lt;/p&gt;
            &lt;/div&gt;            
        &lt;/div&gt;                    
    &lt;/div&gt;              
    &lt;div class="bottom" style="background-color: lightgreen;"&gt;
        &lt;p&gt;bottom&lt;/p&gt;
    &lt;/div&gt;        
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/flexshow/f9.html" frameborder="0" width="320" height="240"></iframe>

