# CSS等高布局的7种方式

&emsp;&emsp;等高布局是指子元素在父元素中高度相等的布局方式。等高布局的实现包括伪等高和真等高，伪等高只是看上去等高而已，真等高是实实在在的等高。本文将介绍边框模拟、负margin这两种伪等高以及table实现、absolute实现、flex实现、grid实现和js判断这五种真等高布局

&nbsp;

## 伪等高

### 边框模拟

&emsp;&emsp;因为元素边框和元素高度始终是相同高度，用元素的边框颜色来伪装左右两个兄弟元素的背景色。然后将左右两个透明背景的元素使用absolute覆盖在中间元素的左右边框上，实现视觉上的等高效果

&emsp;&emsp;注意：左右两侧元素的内容高度不能大于中间元素内容高度，否则无法撑开容器高度

<div>
<pre>&lt;style&gt;
body,p{margin: 0;}
.parent{
    position: relative;
}
.center{
    box-sizing:border-box;
    padding: 0 20px;
    background-clip: content-box;
    border-left: 210px solid lightblue;
    border-right: 310px solid lightgreen;
}
.left{
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
}
.right{
    position: absolute;
    top: 0;
    right: 0;
    width: 300px;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="left"&gt;
        &lt;p&gt;left&lt;/p&gt;
    &lt;/div&gt;  
    &lt;div class="center" style="background-color: pink;"&gt;
        &lt;p&gt;center&lt;/p&gt;
        &lt;p&gt;center&lt;/p&gt;
    &lt;/div&gt;          
    &lt;div class="right"&gt;
        &lt;p&gt;right&lt;/p&gt;
    &lt;/div&gt;        
&lt;/div&gt;</pre>
</div>

<iframe style="line-height: 1.5; width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/css/denggao/d1.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 负margin

&emsp;&emsp;因为背景是在padding区域显示的，设置一个大数值的padding-bottom，再设置相同数值的负的margin-bottom，使背景色铺满元素区域，又符合元素的盒模型的计算公式，实现视觉上的等高效果

&emsp;&emsp;注意：如果页面中使用&lt;a&gt;锚点跳转时，将会隐藏部分文字信息

&emsp;&emsp;注意：如果页面中的背景图片定位到底部，将会看不到背景图片

<div>
<pre>&lt;style&gt;
body,p{margin: 0;}
.parent{
    overflow: hidden;
}
.left,.centerWrap,.right{
    float: left;
    width: 50%;
    padding-bottom: 9999px;
    margin-bottom: -9999px;
}
.center{
    margin: 0 20px;
}
.left,.right{
    width: 25%;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="left" style="background-color: lightblue;"&gt;
        &lt;p&gt;left&lt;/p&gt;
    &lt;/div&gt;  
    &lt;div class="centerWrap"&gt;
        &lt;div class="center" style="background-color: pink;"&gt;
            &lt;p&gt;center&lt;/p&gt;
            &lt;p&gt;center&lt;/p&gt;
        &lt;/div&gt;         
    &lt;/div&gt;

    &lt;div class="right" style="background-color: lightgreen;"&gt;
        &lt;p&gt;right&lt;/p&gt;
    &lt;/div&gt;        
&lt;/div&gt;</pre>
</div>

<iframe style="line-height: 1.5; width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/css/denggao/d2.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

## 真等高

### table

&emsp;&emsp;table元素中的table-cell元素默认就是等高的

<div>
<pre>&lt;style&gt;
body,p{margin: 0;}
.parent{
    display: table;
    width: 100%;
    table-layout: fixed;
}
.left,.centerWrap,.right{
    display: table-cell;
}
.center{
    margin: 0 20px;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="left" style="background-color: lightblue;"&gt;
        &lt;p&gt;left&lt;/p&gt;
    &lt;/div&gt;  
    &lt;div class="centerWrap"&gt;
        &lt;div class="center" style="background-color: pink;"&gt;
            &lt;p&gt;center&lt;/p&gt;
            &lt;p&gt;center&lt;/p&gt;
        &lt;/div&gt;         
    &lt;/div&gt; 
    &lt;div class="right" style="background-color: lightgreen;"&gt;
        &lt;p&gt;right&lt;/p&gt;
    &lt;/div&gt;        
&lt;/div&gt;</pre>
</div>

<iframe style="line-height: 1.5; width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/css/denggao/d3.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### absolute

&emsp;&emsp;设置子元素的top:0;bottom:0;使得所有子元素的高度都和父元素的高度相同，实现等高效果

<div>
<pre>&lt;style&gt;
body,p{margin: 0;}
.parent{
    position: relative;
    height: 40px;
}
.left,.center,.right{
    position: absolute;
    top: 0;
    bottom: 0;
}
.left{
    left: 0;
    width: 100px;
}
.center{
    left: 120px;
    right: 120px;
}
.right{
    width: 100px;
    right: 0;
}
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
    &lt;div class="right" style="background-color: lightgreen;"&gt;
        &lt;p&gt;right&lt;/p&gt;
    &lt;/div&gt;        
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/denggao/d4.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### flex

&emsp;&emsp;flex中的伸缩项目默认都拉伸为父元素的高度，也实现了等高效果

<div>
<pre>&lt;style&gt;
body,p{margin: 0;}
.parent{
    display: flex;
}
.left,.center,.right{
    flex: 1;
}
.center{
    margin: 0 20px;
}
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
    &lt;div class="right" style="background-color: lightgreen;"&gt;
        &lt;p&gt;right&lt;/p&gt;
    &lt;/div&gt;        
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/denggao/d5.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### grid

<div>
<pre>&lt;style&gt;
body,p{margin: 0;}
.parent{
    display: grid;
    grid-auto-flow: column;
    grid-gap:20px;
}
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
    &lt;div class="right" style="background-color: lightgreen;"&gt;
        &lt;p&gt;right&lt;/p&gt;
    &lt;/div&gt;        
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/denggao/d6.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### js

&emsp;&emsp;当子元素高度不同时，进行js判断，增加较低子元素的padding-bottom，使得各个子元素实现等高效果

<div>
<pre>&lt;style&gt;
body,p{margin: 0;}
.parent{overflow: hidden;}
.left,.center,.right{
    float: left;
    width: 25%;
}    
.center{
    width: 50%;
    padding: 0 20px;
    background-clip: content-box;
    box-sizing: border-box;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" id="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="left" style="background-color: lightblue;"&gt;
        &lt;p&gt;left&lt;/p&gt;
    &lt;/div&gt;  
    &lt;div class="center" style="background-color: pink;"&gt;
        &lt;p&gt;center&lt;/p&gt;
        &lt;p&gt;center&lt;/p&gt;
    &lt;/div&gt;          
    &lt;div class="right" style="background-color: lightgreen;"&gt;
        &lt;p&gt;right&lt;/p&gt;
    &lt;/div&gt;        
&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
function getCSS(obj,style){
    if(window.getComputedStyle){
        return getComputedStyle(obj)[style];
    }
    return obj.currentStyle[style];
}
var oParent = document.getElementById('parent');
var oLeft = oParent.getElementsByTagName('div')[0];
var oCenter = oParent.getElementsByTagName('div')[1];
var oRight = oParent.getElementsByTagName('div')[2];
function eqHeight(obj1,obj2){
    var oDis = obj1.clientHeight - obj2.clientHeight;
    if(oDis &gt; 0){
        obj2.style.paddingBottom = parseFloat(getCSS(obj2,'padding-bottom')) + oDis + 'px';
    }else{
        obj1.style.paddingBottom = parseFloat(getCSS(obj1,'padding-bottom')) +  Math.abs(oDis) + 'px';
    }
}
eqHeight(oLeft,oCenter);
eqHeight(oLeft,oRight);
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/denggao/d7.html" frameborder="0" width="320" height="240"></iframe>
