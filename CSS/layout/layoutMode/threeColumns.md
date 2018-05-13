# CSS三列布局

&emsp;&emsp;前面已经介绍过[单列定宽单列自适应](http://www.cnblogs.com/xiaohuochai/p/5452865.html)和[两列自适应](http://www.cnblogs.com/xiaohuochai/p/5454232.html)的两列布局。本文介绍三列布局，分为两侧定宽中间自适应、两列定宽一侧自适应、中间定宽两侧自适应、一侧定宽两列自适应和三列自适应这五种情况

&nbsp;

### 两侧定宽中间自适应

**思路一: float**

【1】float + margin + calc

<div>
<pre>&lt;style&gt;
p{margin: 0;}
.parent{overflow: hidden;}
.left,.right{float: left;width: 100px;}
.center{float: left; width:calc(100% - 240px);margin: 0 20px;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="left" style="background-color: lightblue;"&gt;
        &lt;p&gt;left&lt;/p&gt;
    &lt;/div&gt;    
    &lt;div class="center" style="background-color: pink;"&gt;
        &lt;p&gt;center&lt;/p&gt;
        &lt;p&gt;center&lt;/p&gt;
    &lt;/div&gt;    
    &lt;div class="right"  style="background-color: lightgreen;"&gt;
        &lt;p&gt;right&lt;/p&gt;
    &lt;/div&gt;        
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/buju3/b1.html" frameborder="0" width="320" height="240"></iframe>

【2】float + margin + (fix)

<div>
<pre>&lt;style&gt;
p{margin: 0;}
.parent{overflow: hidden;}
.left,.right{position: relative;float: left;width: 100px;}
.centerWrap{float: left; width:100%; margin: 0 -100px;}
.center{margin: 0 120px;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="left" style="background-color: lightblue;"&gt;
        &lt;p&gt;left&lt;/p&gt;
    &lt;/div&gt;            
    &lt;div class="centerWrap" style="background-color: red;"&gt;
        &lt;div class="center" style="background-color: pink;"&gt;
            &lt;p&gt;center&lt;/p&gt;
            &lt;p&gt;center&lt;/p&gt;
        &lt;/div&gt;        
    &lt;/div&gt;
    &lt;div class="right"  style="background-color: lightgreen;"&gt;
        &lt;p&gt;right&lt;/p&gt;
    &lt;/div&gt;            
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/buju3/b2.html" frameborder="0" width="320" height="240"></iframe>

**思路二: inline-block**

【1】inline-block + margin + calc

<div>
<pre>&lt;style&gt;
p{margin: 0;}
.parent{font-size: 0;}
.left,.right,.center{display:inline-block; vertical-align: top;font-size: 16px;}
.left,.right{width: 100px;}
.center{width: calc(100% - 240px); margin: 0 20px;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="left" style="background-color: lightblue;"&gt;
        &lt;p&gt;left&lt;/p&gt;
    &lt;/div&gt;            
    &lt;div class="center" style="background-color: pink;"&gt;
        &lt;p&gt;center&lt;/p&gt;
        &lt;p&gt;center&lt;/p&gt;
    &lt;/div&gt;        
    &lt;div class="right"  style="background-color: lightgreen;"&gt;
        &lt;p&gt;right&lt;/p&gt;
    &lt;/div&gt;            
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/buju3/b3.html" frameborder="0" width="320" height="240"></iframe>

【2】inline-block + margin + (fix)

<div>
<pre>&lt;style&gt;
p{margin: 0;}
.parent{font-size: 0;}
.left,.right,.centerWrap{display:inline-block; vertical-align: top;font-size: 16px;}
.left,.right{width: 100px;position:relative;}
.centerWrap{width: 100%; margin: 0 -100px;}
.center{margin: 0 120px;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="left" style="background-color: lightblue;"&gt;
        &lt;p&gt;left&lt;/p&gt;
    &lt;/div&gt;    
    &lt;div class="centerWrap" style="background-color: orange;"&gt;
        &lt;div class="center" style="background-color: pink;"&gt;
            &lt;p&gt;center&lt;/p&gt;
            &lt;p&gt;center&lt;/p&gt;
        &lt;/div&gt;        
    &lt;/div&gt;        
    &lt;div class="right"  style="background-color: lightgreen;"&gt;
        &lt;p&gt;right&lt;/p&gt;
    &lt;/div&gt;            
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/buju3/b4.html" frameborder="0" width="320" height="240"></iframe>

**思路三: table**

<div>
<pre>&lt;style&gt;
p{margin: 0;}
.parent{display: table; width: 100%;table-layout: fixed;}
.left,.right,.centerWrap{display:table-cell;}
.left,.right{width: 100px;}
.center{margin: 0 20px;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="left" style="background-color: lightblue;"&gt;
        &lt;p&gt;left&lt;/p&gt;
    &lt;/div&gt;    
    &lt;div class="centerWrap" style="background-color: orange;"&gt;
        &lt;div class="center" style="background-color: pink;"&gt;
            &lt;p&gt;center&lt;/p&gt;
            &lt;p&gt;center&lt;/p&gt;
        &lt;/div&gt;        
    &lt;/div&gt;        
    &lt;div class="right"  style="background-color: lightgreen;"&gt;
        &lt;p&gt;right&lt;/p&gt;
    &lt;/div&gt;            
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/buju3/b5.html" frameborder="0" width="320" height="240"></iframe>

**思路四: absolute**

<div>
<pre>&lt;style&gt;
p{margin: 0;}
.parent{position: relative;height:40px;}
.left,.right,.center{position: absolute;}
.left{left: 0;width:100px;}
.right{right: 0;width: 100px;}
.center{left: 120px; right: 120px;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="left" style="background-color: lightblue;"&gt;
        &lt;p&gt;left&lt;/p&gt;
    &lt;/div&gt;    
    &lt;div class="center" style="background-color: pink;"&gt;
        &lt;p&gt;center&lt;/p&gt;
        &lt;p&gt;center&lt;/p&gt;
    &lt;/div&gt;                
    &lt;div class="right"  style="background-color: lightgreen;"&gt;
        &lt;p&gt;right&lt;/p&gt;
    &lt;/div&gt;            
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/buju3/b6.html" frameborder="0" width="320" height="240"></iframe>

**思路五: flex**

<div>
<pre>&lt;style&gt;
p{margin: 0;}
.parent{display: flex;}
.left,.right{width: 100px;}
.center{flex: 1; margin: 0 20px;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="left" style="background-color: lightblue;"&gt;
        &lt;p&gt;left&lt;/p&gt;
    &lt;/div&gt;    
    &lt;div class="center" style="background-color: pink;"&gt;
        &lt;p&gt;center&lt;/p&gt;
        &lt;p&gt;center&lt;/p&gt;
    &lt;/div&gt;                
    &lt;div class="right"  style="background-color: lightgreen;"&gt;
        &lt;p&gt;right&lt;/p&gt;
    &lt;/div&gt;            
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/buju3/b7.html" frameborder="0" width="320" height="240"></iframe>

**思路六: grid**

<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="left" style="background-color: lightblue;"&gt;
        &lt;p&gt;left&lt;/p&gt;
    &lt;/div&gt;    
    &lt;div class="center" style="background-color: pink;"&gt;
        &lt;p&gt;center&lt;/p&gt;
        &lt;p&gt;center&lt;/p&gt;
    &lt;/div&gt;                
    &lt;div class="right"  style="background-color: lightgreen;"&gt;
        &lt;p&gt;right&lt;/p&gt;
    &lt;/div&gt;            
&lt;/div&gt;</pre>
</div>


<div>
<pre>&lt;style&gt;
p{margin: 0;}
.parent{display: grid;grid-template-columns:100px 1fr 100px; grid-gap:20px;}
&lt;/style&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/buju3/b8.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 两列定宽一侧自适应

&emsp;&emsp;这种布局与单列定宽单列自适应布局非常相似

**思路一: float**

【1】float + margin

&emsp;&emsp;缺点是IE6-浏览器的3px的bug，以及当自适应列中有元素清除浮动时，会使该元素不与左侧浮动元素同行，从而出现文字下沉现象

<div>
<pre>&lt;style&gt;
p{margin: 0;}
.parent{overflow: hidden;}
.left,.center{float: left;width: 100px;margin-right: 20px;}
.right{margin-left: 240px;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="left" style="background-color: lightblue;"&gt;
        &lt;p&gt;left&lt;/p&gt;
    &lt;/div&gt;    
    &lt;div class="center" style="background-color: pink;"&gt;
        &lt;p&gt;center&lt;/p&gt;
    &lt;/div&gt;                
    &lt;div class="right"  style="background-color: lightgreen;"&gt;
        &lt;p&gt;right&lt;/p&gt;
        &lt;p&gt;right&lt;/p&gt;
    &lt;/div&gt;            
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/buju3/b9.html" frameborder="0" width="320" height="240"></iframe>

【2】float + margin + calc

<div>
<pre>&lt;style&gt;
p{margin: 0;}
.parent{overflow: hidden;}
.left,.center{float: left;width: 100px;margin-right: 20px;}
.right{float: left; width: calc(100% - 240px);}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="left" style="background-color: lightblue;"&gt;
        &lt;p&gt;left&lt;/p&gt;
    &lt;/div&gt;    
    &lt;div class="center" style="background-color: pink;"&gt;
        &lt;p&gt;center&lt;/p&gt;
    &lt;/div&gt;                
    &lt;div class="right"  style="background-color: lightgreen;"&gt;
        &lt;p&gt;right&lt;/p&gt;
        &lt;p&gt;right&lt;/p&gt;
    &lt;/div&gt;            
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/buju3/b10.html" frameborder="0" width="320" height="240"></iframe>

【3】float + margin + (fix)

<div>
<pre>&lt;style&gt;
p{margin: 0;}
.parent{overflow: hidden;}
.left,.center{position: relative; float: left;width: 100px;margin-right: 20px;}
.rightWrap{float: left; width: 100%; margin-left: -240px;}
.right{margin-left:240px;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="left" style="background-color: lightblue;"&gt;
        &lt;p&gt;left&lt;/p&gt;
    &lt;/div&gt;    
    &lt;div class="center" style="background-color: pink;"&gt;
        &lt;p&gt;center&lt;/p&gt;
    &lt;/div&gt;        
    &lt;div class="rightWrap"&gt;
        &lt;div class="right"  style="background-color: lightgreen;"&gt;
            &lt;p&gt;right&lt;/p&gt;
            &lt;p&gt;right&lt;/p&gt;
        &lt;/div&gt;            
    &lt;/div&gt;            
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/buju3/b11.html" frameborder="0" width="320" height="240"></iframe>

【4】float + overflow

<div>
<pre>&lt;style&gt;
p{margin: 0;}
.parent{overflow: hidden;}
.left,.center{position: relative; float: left;width: 100px;margin-right: 20px;}
.right{overflow: hidden;zoom:1;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="left" style="background-color: lightblue;"&gt;
        &lt;p&gt;left&lt;/p&gt;
    &lt;/div&gt;    
    &lt;div class="center" style="background-color: pink;"&gt;
        &lt;p&gt;center&lt;/p&gt;
    &lt;/div&gt;        
    &lt;div class="right"  style="background-color: lightgreen;"&gt;
        &lt;p&gt;right&lt;/p&gt;
        &lt;p&gt;right&lt;/p&gt;
    &lt;/div&gt;                        
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/buju3/b12.html" frameborder="0" width="320" height="240"></iframe>

**思路二: inline-block**

【1】inline-block + margin + calc

<div>
<pre>&lt;style&gt;
p{margin: 0;}
.parent{font-size: 0;}
.left,.right,.center{display:inline-block; vertical-align: top;font-size: 16px;}
.left,.center{width: 100px;margin-right:20px;}
.right{width: calc(100% - 240px);}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="left" style="background-color: lightblue;"&gt;
        &lt;p&gt;left&lt;/p&gt;
    &lt;/div&gt;    
    &lt;div class="center" style="background-color: pink;"&gt;
        &lt;p&gt;center&lt;/p&gt;
    &lt;/div&gt;        
    &lt;div class="right"  style="background-color: lightgreen;"&gt;
        &lt;p&gt;right&lt;/p&gt;
        &lt;p&gt;right&lt;/p&gt;
    &lt;/div&gt;                        
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/buju3/b13.html" frameborder="0" width="320" height="240"></iframe>

【2】inline-block + margin + (fix)

<div>
<pre>&lt;style&gt;
p{margin: 0;}
.parent{font-size: 0;}
.left,.rightWrap,.center{display:inline-block; vertical-align: top;font-size: 16px;}
.left,.center{position: relative;width: 100px;margin-right:20px;}
.rightWrap{width:100%; margin-left: -240px;}
.right{margin-left: 240px;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="left" style="background-color: lightblue;"&gt;
        &lt;p&gt;left&lt;/p&gt;
    &lt;/div&gt;    
    &lt;div class="center" style="background-color: pink;"&gt;
        &lt;p&gt;center&lt;/p&gt;
    &lt;/div&gt;        
    &lt;div class="rightWrap" style="background-color: green;"&gt;
        &lt;div class="right"  style="background-color: lightgreen;"&gt;
            &lt;p&gt;right&lt;/p&gt;
            &lt;p&gt;right&lt;/p&gt;
        &lt;/div&gt;        
    &lt;/div&gt;            
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/buju3/b14.html" frameborder="0" width="320" height="240"></iframe>

**思路三: table**

<div>
<pre>&lt;style&gt;
p{margin: 0;}
.parent{display: table; width: 100%;table-layout: fixed;}
.leftWrap,.centerWrap,.right{display:table-cell;}
.leftWrap,.centerWrap{width: 120px;}
.left,.center{margin-right: 20px;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="leftWrap"&gt;
        &lt;div class="left" style="background-color: lightblue;"&gt;
            &lt;p&gt;left&lt;/p&gt;
        &lt;/div&gt;        
    &lt;/div&gt;
    &lt;div class="centerWrap"&gt;
        &lt;div class="center" style="background-color: pink;"&gt;
            &lt;p&gt;center&lt;/p&gt;
        &lt;/div&gt;        
    &lt;/div&gt;
    &lt;div class="right"  style="background-color: lightgreen;"&gt;
        &lt;p&gt;right&lt;/p&gt;
        &lt;p&gt;right&lt;/p&gt;
    &lt;/div&gt;            
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/buju3/b15.html" frameborder="0" width="320" height="240"></iframe>

**思路四: absolute**

<div>
<pre>&lt;style&gt;
p{margin: 0;}
.parent{position: relative;width:100%;height:40px;}
.left{position: absolute;left:0;width:100px;}
.center{position: absolute;left:120px;width: 100px;}
.right{position: absolute;left:240px; right:0;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="left" style="background-color: lightblue;"&gt;
        &lt;p&gt;left&lt;/p&gt;
    &lt;/div&gt;        
    &lt;div class="center" style="background-color: pink;"&gt;
        &lt;p&gt;center&lt;/p&gt;
    &lt;/div&gt;        
    &lt;div class="right"  style="background-color: lightgreen;"&gt;
        &lt;p&gt;right&lt;/p&gt;
        &lt;p&gt;right&lt;/p&gt;
    &lt;/div&gt;            
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/buju3/b16.html" frameborder="0" width="320" height="240"></iframe>

**思路五: flex**

<div>
<pre>&lt;style&gt;
p{margin: 0;}
.parent{display: flex;}
.left,.center{width:100px;margin-right:20px;}
.right{flex:1;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="left" style="background-color: lightblue;"&gt;
        &lt;p&gt;left&lt;/p&gt;
    &lt;/div&gt;        
    &lt;div class="center" style="background-color: pink;"&gt;
        &lt;p&gt;center&lt;/p&gt;
    &lt;/div&gt;        
    &lt;div class="right"  style="background-color: lightgreen;"&gt;
        &lt;p&gt;right&lt;/p&gt;
        &lt;p&gt;right&lt;/p&gt;
    &lt;/div&gt;            
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/buju3/b17.html" frameborder="0" width="320" height="240"></iframe>

**思路六: grid**

<div>
<pre>&lt;style&gt;
p{margin: 0;}
.parent{display: grid;grid-template-columns:100px 100px 1fr; grid-gap:20px;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="left" style="background-color: lightblue;"&gt;
        &lt;p&gt;left&lt;/p&gt;
    &lt;/div&gt;    
    &lt;div class="center" style="background-color: pink;"&gt;
        &lt;p&gt;center&lt;/p&gt;
        &lt;p&gt;center&lt;/p&gt;
    &lt;/div&gt;                
    &lt;div class="right"  style="background-color: lightgreen;"&gt;
        &lt;p&gt;right&lt;/p&gt;
    &lt;/div&gt;            
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/buju3/b18.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 中间定宽两侧自适应布局

**思路一: float**

<div>
<pre>&lt;style&gt;
p{margin: 0;}
.parent{overflow: hidden;}
.left{float: left;margin-right: 20px;}
.center{float: left;width: 100px;margin-right: 20px;}
.right{overflow: hidden;}
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
    &lt;/div&gt;    
    &lt;div class="right"  style="background-color: lightgreen;"&gt;
        &lt;p&gt;right&lt;/p&gt;
        &lt;p&gt;right&lt;/p&gt;
    &lt;/div&gt;                    
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/buju3/b19.html" frameborder="0" width="320" height="240"></iframe>

**思路二: table**

<div>
<pre>&lt;style&gt;
p{margin: 0;}
.parent{display: table; width: 100%;}
.leftWrap{display: table-cell; width: 0.1%;}
.centerWrap{display: table-cell;width: 120px;}
.left,.center{margin-right: 20px;}
.right{display:table-cell;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="leftWrap"&gt;
        &lt;div class="left" style="background-color: lightblue;"&gt;
            &lt;p&gt;left&lt;/p&gt;
            &lt;p&gt;left&lt;/p&gt;
        &lt;/div&gt;            
    &lt;/div&gt;
    &lt;div class="centerWrap"&gt;
        &lt;div class="center" style="background-color: pink;"&gt;
            &lt;p&gt;center&lt;/p&gt;
        &lt;/div&gt;            
    &lt;/div&gt;
    &lt;div class="right"  style="background-color: lightgreen;"&gt;
        &lt;p&gt;right&lt;/p&gt;
        &lt;p&gt;right&lt;/p&gt;
    &lt;/div&gt;                    
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/buju3/b20.html" frameborder="0" width="320" height="240"></iframe>

**思路三: flex**

<div>
<pre>&lt;style&gt;
p{margin: 0;}
.parent{display: flex;}
.left{margin-right: 20px;}
.center{width: 100px;margin-right: 20px;}
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
    &lt;/div&gt;            
    &lt;div class="right"  style="background-color: lightgreen;"&gt;
        &lt;p&gt;right&lt;/p&gt;
        &lt;p&gt;right&lt;/p&gt;
    &lt;/div&gt;                    
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/buju3/b21.html" frameborder="0" width="320" height="240"></iframe>

**思路四: grid**

<div>
<pre>&lt;style&gt;
p{margin: 0;}
.parent{display: grid;grid-template-columns:auto 100px 1fr; grid-gap:20px;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="left" style="background-color: lightblue;"&gt;
        &lt;p&gt;left&lt;/p&gt;
    &lt;/div&gt;    
    &lt;div class="center" style="background-color: pink;"&gt;
        &lt;p&gt;center&lt;/p&gt;
        &lt;p&gt;center&lt;/p&gt;
    &lt;/div&gt;                
    &lt;div class="right"  style="background-color: lightgreen;"&gt;
        &lt;p&gt;right&lt;/p&gt;
    &lt;/div&gt;            
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/buju3/b22.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 一侧定宽两列自适应

**思路一: float**

<div>
<pre>&lt;style&gt;
p{margin: 0;}
.parent{overflow: hidden;}
.left{float: left;width: 100px;margin-right: 20px;}
.center{float: left;margin-right: 20px;}
.right{overflow: hidden;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="left" style="background-color: lightblue;"&gt;
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

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/buju3/b23.html" frameborder="0" width="320" height="240"></iframe>

**思路二: table**

<div>
<pre>&lt;style&gt;
p{margin: 0;}
.parent{display: table; width: 100%;}
.leftWrap{display: table-cell; width: 120px;}
.centerWrap{display: table-cell;width: 0.1%;}
.left,.center{margin-right: 20px;}
.right{display:table-cell;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="leftWrap"&gt;
        &lt;div class="left" style="background-color: lightblue;"&gt;
            &lt;p&gt;left&lt;/p&gt;
        &lt;/div&gt;            
    &lt;/div&gt;
    &lt;div class="centerWrap"&gt;
        &lt;div class="center" style="background-color: pink;"&gt;
            &lt;p&gt;center&lt;/p&gt;
            &lt;p&gt;center&lt;/p&gt;
        &lt;/div&gt;            
    &lt;/div&gt;
    &lt;div class="right"  style="background-color: lightgreen;"&gt;
        &lt;p&gt;right&lt;/p&gt;
        &lt;p&gt;right&lt;/p&gt;
    &lt;/div&gt;                    
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/buju3/b24.html" frameborder="0" width="320" height="240"></iframe>

**思路三: flex**

<div>
<pre>&lt;style&gt;
p{margin: 0;}
.parent{display: flex;}
.left{width: 100px;margin-right: 20px;}
.center{margin-right: 20px;}
.right{flex: 1;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="left" style="background-color: lightblue;"&gt;
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

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/buju3/b25.html" frameborder="0" width="320" height="240"></iframe>

**思路四: grid**

<div>
<pre>&lt;style&gt;
p{margin: 0;}
.parent{display: grid;grid-template-columns:100px auto 1fr; grid-gap:20px;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="left" style="background-color: lightblue;"&gt;
        &lt;p&gt;left&lt;/p&gt;
    &lt;/div&gt;    
    &lt;div class="center" style="background-color: pink;"&gt;
        &lt;p&gt;center&lt;/p&gt;
        &lt;p&gt;center&lt;/p&gt;
    &lt;/div&gt;                
    &lt;div class="right"  style="background-color: lightgreen;"&gt;
        &lt;p&gt;right&lt;/p&gt;
    &lt;/div&gt;            
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/buju3/b26.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 三列自适应

**思路一: float**

<div>
<pre>&lt;style&gt;
p{margin: 0;}
.parent{overflow: hidden;}
.left,.center{float: left;margin-right: 20px;}
.right{overflow: hidden;}
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

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/buju3/b27.html" frameborder="0" width="320" height="240"></iframe>

**思路二: table**

<div>
<pre>&lt;style&gt;
p{margin: 0;}
.parent{display: table; width: 100%;}
.leftWrap,.centerWrap{display: table-cell;width: 0.1%;}
.left,.center{margin-right: 20px;}
.right{display:table-cell;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="leftWrap"&gt;
        &lt;div class="left" style="background-color: lightblue;"&gt;
            &lt;p&gt;left&lt;/p&gt;
            &lt;p&gt;left&lt;/p&gt;
        &lt;/div&gt;            
    &lt;/div&gt;
    &lt;div class="centerWrap"&gt;
        &lt;div class="center" style="background-color: pink;"&gt;
            &lt;p&gt;center&lt;/p&gt;
            &lt;p&gt;center&lt;/p&gt;
        &lt;/div&gt;            
    &lt;/div&gt;
    &lt;div class="right"  style="background-color: lightgreen;"&gt;
        &lt;p&gt;right&lt;/p&gt;
        &lt;p&gt;right&lt;/p&gt;
    &lt;/div&gt;                    
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/buju3/b28.html" frameborder="0" width="320" height="240"></iframe>

**思路三: flex**

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

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/buju3/b29.html" frameborder="0" width="320" height="240"></iframe>

**思路四: grid**

<div>
<pre>&lt;style&gt;
p{margin: 0;}
.parent{display: grid;grid-template-columns:auto auto 1fr; grid-gap:20px;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="left" style="background-color: lightblue;"&gt;
        &lt;p&gt;left&lt;/p&gt;
    &lt;/div&gt;    
    &lt;div class="center" style="background-color: pink;"&gt;
        &lt;p&gt;center&lt;/p&gt;
        &lt;p&gt;center&lt;/p&gt;
    &lt;/div&gt;                
    &lt;div class="right"  style="background-color: lightgreen;"&gt;
        &lt;p&gt;right&lt;/p&gt;
    &lt;/div&gt;            
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/buju3/b30.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 总结

&emsp;&emsp;三列布局类似于大号的两列布局。无论是什么布局方式，无外乎需要应用[float](http://www.cnblogs.com/xiaohuochai/p/5243735.html)、[inline-block](http://www.cnblogs.com/xiaohuochai/p/5202761.html#anchor3)、[table](http://www.cnblogs.com/xiaohuochai/p/5008466.html)、[absolute](http://www.cnblogs.com/xiaohuochai/p/5312917.html)、[flex](http://www.cnblogs.com/xiaohuochai/p/5323146.html)、[grid](http://www.cnblogs.com/xiaohuochai/p/7083153.html)这6种布局属性，然后再配合[负margin](http://www.cnblogs.com/xiaohuochai/p/5314289.html)、calc()函数、[bfc](http://www.cnblogs.com/xiaohuochai/p/5248536.html)、增加结构等来实现布局

&emsp;&emsp;自适应包括两种情况：一种是宽度由内容撑开，一种是宽度自动撑满父元素剩余宽度

&emsp;&emsp;可实现宽度由内容撑开的属性有： float、inline、inline-block、table、table-cell、absolute、fixed、flex、grid

&emsp;&emsp;可实现宽度自动撑满父元素剩余宽度的属性有： overflow(配合float)、table、flex、grid

