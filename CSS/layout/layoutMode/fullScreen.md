# CSS全屏布局的6种方式

&emsp;&emsp;全屏布局在实际工作中是很常用的，比如管理系统、监控平台等。本文将介绍关于全屏布局的6种思路

&nbsp;

### float

【1】float + calc

&emsp;&emsp;通过calc()函数计算出.middle元素的高度，并设置子元素高度为100%

<div>
<pre>&lt;style&gt;
body,p{margin: 0;}
body,html,.parent{height: 100%;}
.middle{
    overflow: hidden;
    height: calc(100% - 100px);
}
.left{
    float: left;
    width: 100px;
    margin-right: 20px;
    height: 100%;
}
.right{
    overflow: auto;
    height: 100%;
}
.right-in{
    height: 1000px;
}
.top,.bottom{height:50px;}
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

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/quanpin/q1.html" frameborder="0" width="320" height="240"></iframe>

【2】float + absolute + (fix)

&emsp;&emsp;通过增加结构来提高兼容性，.middle元素设置100%的高度，.top和.bottom设置absolute覆盖在.middle上

<div>
<pre>&lt;style&gt;
body,p{margin: 0;}
body,html,.parent{height: 100%;}
.top,.bottom{
    position: absolute;
    height:50px;
    left: 0;
    right: 0;
}
.top{top: 0;}
.bottom{bottom: 0;}
.middleWrap{
    height: 100%;
    overflow: hidden;
}
.middle{
    overflow: hidden;
    height: 100%;
    margin: 50px 0;
}
.left{
    float: left;
    width: 100px;
    margin-right: 20px;
    height: 100%;
}
.right{
    overflow: auto;
    height: 100%;
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
    &lt;div class="middleWrap"&gt;
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
    &lt;/div&gt; 
    &lt;div class="bottom" style="background-color: lightgreen;"&gt;
        &lt;p&gt;bottom&lt;/p&gt;
    &lt;/div&gt;        
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/quanpin/q2.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### inline-block

【1】inline-block + calc

<div>
<pre>&lt;style&gt;
body,p{margin: 0;}
body,html,.parent{height: 100%;}
.middle{
    height: calc(100% - 100px);
    font-size: 0;
}
.left,.right{
    display: inline-block;
    vertical-align: top;
    font-size: 16px;
}
.left{
    width: 100px;
    margin-right: 20px;
    height: 100%;
}
.right{
    width: calc(100% - 120px);
    height: 100%;
    overflow: auto;
}
.right-in{
    height: 1000px;
}
.top,.bottom{height: 50px;}
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

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/quanpin/q3.html" frameborder="0" width="320" height="240"></iframe>

【2】inline-block + absolute + (fix)

<div>
<pre>&lt;style&gt;
body,p{margin: 0;}
body,html,.parent{height: 100%;}
.top,.bottom{
    position: absolute;
    left: 0;
    right: 0;
    height: 50px;
}
.top{top: 0;}
.bottom{bottom: 0;}
.middleWrap{
    height: 100%;
    font-size: 0;
    overflow: hidden;
}
.middle{
    position: relative;
    height: 100%;
    margin: 50px 0;
    overflow: hidden;
}
.left,.rightWrap{
    display: inline-block;
    vertical-align: top;
    font-size: 16px;
}
.left{
    position: absolute;
    width: 100px;
    margin-right: 20px;
    height: 100%;
}
.rightWrap{
    width: 100%;
    height: 100%;
}
.right{
    height: 100%;
    margin-left: 120px;
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
    &lt;div class="middleWrap"&gt;
        &lt;div class="middle" style="background-color: pink;"&gt;
            &lt;div class="left" style="background-color: orange;"&gt;
                &lt;p&gt;left&lt;/p&gt;
            &lt;/div&gt;
            &lt;div class="rightWrap"&gt;
                &lt;div class="right" style="background-color: lightsalmon;"&gt;
                    &lt;div class="right-in"&gt;
                        &lt;p&gt;right&lt;/p&gt;
                    &lt;/div&gt;
                &lt;/div&gt;                
            &lt;/div&gt;
        &lt;/div&gt;         
    &lt;/div&gt;
    &lt;div class="bottom" style="background-color: lightgreen;"&gt;
        &lt;p&gt;bottom&lt;/p&gt;
    &lt;/div&gt;        
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/quanpin/q4.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### table

&emsp;&emsp;水平方向子元素的间距可以用border实现。所有浏览器都不支持给table-cell元素设置overflow属性。firefox和IE11浏览器不支持给table-cell元素的设置100%高度的子元素设置overflow属性

<div>
<pre>&lt;style&gt;
body,p{margin: 0;}
body,html,.parent{height: 100%;}
.top,.bottom{
    position: absolute;
    width: 100%;
    height: 50px;
}
.bottom{bottom: 0;}
.middleWrap{
    height: 100%;
    overflow: hidden;
}
.middle{
    width: 100%;
    height: 100%;
    display: table;    
    margin: 50px 0;
    table-layout: fixed;
}
.left{
    display: table-cell;
    width: 120px;
    border-right: 20px solid lightgray;
}
.rightWrap{
    display: table-cell;
    height: 100%;
}
.right{
    height: 100%;
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
    &lt;div class="middleWrap"&gt;
        &lt;div class="middle" style="background-color: pink;"&gt;
            &lt;div class="left" style="background-color: orange;"&gt;
                &lt;p&gt;left&lt;/p&gt;
            &lt;/div&gt;     
            &lt;div class="rightWrap"&gt;
                &lt;div class="right" style="background-color: lightsalmon;"&gt;
                    &lt;div class="right-in"&gt;
                        &lt;p&gt;right&lt;/p&gt;
                    &lt;/div&gt;            
                &lt;/div&gt;                    
            &lt;/div&gt;   
        &lt;/div&gt;         
    &lt;/div&gt;    
    &lt;div class="bottom" style="background-color: lightgreen;"&gt;
        &lt;p&gt;bottom&lt;/p&gt;
    &lt;/div&gt;        
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/quanpin/q5.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### absolute

<div>
<pre>&lt;style&gt;
body,p{margin: 0;}
body,html,.parent{height: 100%;}
.top,.middle,.bottom{
    position: absolute;
    left: 0;
    right: 0;
}
.top{
    top: 0;
    height: 50px;
}
.bottom{
    bottom: 0;
    height: 50px;
}
.middle{
    top: 50px;
    bottom: 50px;
}
.left,.right{
    position: absolute;
    top: 0;
    bottom: 0;
}
.left{
    width:100px;
}
.right{
    left: 120px;
    right: 0;
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

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/quanpin/q6.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### flex

&emsp;&emsp;flex常用于小范围的布局，使用全屏布局时会因为性能问题，出现卡顿现象。如果要使用全屏自适应布局，则只有flex才能达到效果

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

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/quanpin/q7.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### grid

<div>
<pre>&lt;style&gt;
body,p{margin: 0;}
body,html,.parent{height: 100%;}
.parent{
    display: grid;
    grid-template-rows:50px auto 50px;
}
.middle{
    overflow:hidden;
    display:grid;
    grid-template-columns: 100px 1fr;
    grid-gap:20px;
}
.right{
    overflow:auto;
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

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/quanpin/q8.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 总结

&emsp;&emsp;全屏布局实际上就是[两列](http://www.cnblogs.com/xiaohuochai/p/5454232.html)或[三列自适应布局](http://www.cnblogs.com/xiaohuochai/p/5455905.html)的扩展形式。由于实现的是全屏效果，高度实际上是固定的，所以思路并没有[等高布局](http://www.cnblogs.com/xiaohuochai/p/5457127.html)局限。水平方向元素之间的间距根据实际情况使用margin、padding、border都可以实现

