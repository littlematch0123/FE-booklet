# 三栏式布局(所谓的圣杯和双飞翼)

&emsp;&emsp;常常听说圣杯布局和双飞翼布局，以为是两个很高级的语汇。但实际上，他们只是三栏式布局的两种布局方法而已。本文将介绍三栏式布局的4种思路

&nbsp;

### float

【1】圣杯布局

&emsp;&emsp;圣杯布局使用float、负margin和relative，不需要添加额外标签。.main元素设置padding，为两侧定宽元素留出位置。内容元素设置100%宽度，占据中间位置。而两侧定宽元素通过设置负margin和relative的偏移属性配合，到达相应位置

&emsp;&emsp;缺点:&nbsp;并没有实现等高布局；使用了相对定位，扩展性不好

<div>
<pre>&lt;style&gt;
body,p{margin: 0;}
.top,.bottom{
    height: 30px;
}
.middle{
    padding: 0 120px;
    overflow: hidden;
}
.main{
    width: 100%;
    float: left;
}
.left,.right{
    float: left;
    width: 100px;    
    position: relative;
}
.left{
    margin-left: -100%;
    left: -120px;
}
.right{
    margin-left: -100px;
    right: -120px;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" id="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="top" style="background-color: lightblue;"&gt;
        &lt;p&gt;top&lt;/p&gt;
    &lt;/div&gt;  
    &lt;div class="middle" style="background-color: pink;"&gt;
        &lt;div class="main" style="background-color: lightcoral;"&gt;
            &lt;p&gt;main&lt;/p&gt;
            &lt;p&gt;main&lt;/p&gt;
        &lt;/div&gt;
        &lt;div class="left" style="background-color: orange;"&gt;
            &lt;p&gt;left&lt;/p&gt;
        &lt;/div&gt;
        &lt;div class="right" style="background-color: lightsalmon;"&gt;
               &lt;p&gt;right&lt;/p&gt;
        &lt;/div&gt;
    &lt;/div&gt;          
    &lt;div class="bottom" style="background-color: lightgreen;"&gt;
        &lt;p&gt;bottom&lt;/p&gt;
    &lt;/div&gt;        
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 110px;" src="https://demo.xiaohuochai.site/css/buju4/b1.html" frameborder="0" width="320" height="240"></iframe>

【2】双飞翼布局

&emsp;&emsp;双飞翼布局在圣杯布局的基础上，通过为.main元素外添加一层div结构，不使用相对定位。在.main元素上设置margin。两侧的定宽列通过负margin来占据.main元素的margin区域

&emsp;&emsp;缺点:&nbsp;并没有实现等高布局，增加了html结构

<div>
<pre>&lt;style&gt;
body,p{margin: 0;}
.top,.bottom{height: 30px;}
.middle{overflow: hidden;}
.mainWrap{
    width: 100%;
    float: left;
}
.main{margin: 0 120px;}
.left,.right{
    float: left;
    width: 100px;    
}
.left{margin-left: -100%;}
.right{margin-left: -100px;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" id="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="top" style="background-color: lightblue;"&gt;
        &lt;p&gt;top&lt;/p&gt;
    &lt;/div&gt;  
    &lt;div class="middle" style="background-color: pink;"&gt;
        &lt;div class="mainWrap"&gt;
            &lt;div class="main" style="background-color: lightcoral;"&gt;
                &lt;p&gt;main&lt;/p&gt;
                &lt;p&gt;main&lt;/p&gt;
            &lt;/div&gt;            
        &lt;/div&gt;
        &lt;div class="left" style="background-color: orange;"&gt;
            &lt;p&gt;left&lt;/p&gt;
        &lt;/div&gt;
        &lt;div class="right" style="background-color: lightsalmon;"&gt;
               &lt;p&gt;right&lt;/p&gt;
        &lt;/div&gt;
    &lt;/div&gt;          
    &lt;div class="bottom" style="background-color: lightgreen;"&gt;
        &lt;p&gt;bottom&lt;/p&gt;
    &lt;/div&gt;        
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 110px;" src="https://demo.xiaohuochai.site/css/buju4/b2.html" frameborder="0" width="320" height="240"></iframe>

【3】float + box-sizing + background-clip

&emsp;&emsp;.main元素的border区域为两侧定宽列的所在区域，实现伪等高效果；设置.main的padding和background-clip来实现元素间隔。两侧元素通过负margin调整到.main元素的border区域

&emsp;&emsp;缺点:&nbsp;兼容性不好

<div>
<pre>&lt;style&gt;
body,p{margin: 0;}
.top,.bottom{height: 30px;}
.middle{overflow: hidden;}
.main{
    float: left;
    width: 100%;
    border-left: 100px solid lightgrey;
    border-right: 100px solid lightgrey;
    padding: 0 20px;
    background-clip: content-box;
    box-sizing: border-box;
}
.left,.right{
    float: left;
    width: 100px;    
}
.left{margin-left: -100%;}
.right{margin-left: -100px;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" id="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="top" style="background-color: lightblue;"&gt;
        &lt;p&gt;top&lt;/p&gt;
    &lt;/div&gt;  
    &lt;div class="middle" style="background-color: pink;"&gt;
        &lt;div class="main" style="background-color: lightcoral;"&gt;
            &lt;p&gt;main&lt;/p&gt;
            &lt;p&gt;main&lt;/p&gt;
        &lt;/div&gt;            
        &lt;div class="left" &gt;
            &lt;p&gt;left&lt;/p&gt;
        &lt;/div&gt;
        &lt;div class="right" &gt;
               &lt;p&gt;right&lt;/p&gt;
        &lt;/div&gt;
    &lt;/div&gt;          
    &lt;div class="bottom" style="background-color: lightgreen;"&gt;
        &lt;p&gt;bottom&lt;/p&gt;
    &lt;/div&gt;        
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 110px;" src="https://demo.xiaohuochai.site/css/buju4/b3.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### absolute

&emsp;&emsp;设置子元素的top:0;bottom:0;使得所有子元素的高度都和父元素的高度相同，实现等高效果

&emsp;&emsp;缺点: 需要为.middle元素设置高度，扩展性较差

<div>
<pre>&lt;style&gt;
body,p{margin: 0;}
.top,.bottom{height: 30px;}
.middle{
    position: relative;
    height: 40px;
}
.left,.right,.main{
    position: absolute;
    top: 0;
    bottom: 0;
}
.left{width: 100px;}
.right{
    width: 100px;
    right: 0;
}
.main{
    left: 120px;
    right: 120px;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" id="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="top" style="background-color: lightblue;"&gt;
        &lt;p&gt;top&lt;/p&gt;
    &lt;/div&gt;  
    &lt;div class="middle" style="background-color: pink;"&gt;
        &lt;div class="main" style="background-color: lightcoral;"&gt;
            &lt;p&gt;main&lt;/p&gt;
            &lt;p&gt;main&lt;/p&gt;
        &lt;/div&gt;              
        &lt;div class="left" style="background-color: lightseagreen;" &gt;
            &lt;p&gt;left&lt;/p&gt;
        &lt;/div&gt;
        &lt;div class="right" style="background-color: lightcyan;" &gt;
               &lt;p&gt;right&lt;/p&gt;
        &lt;/div&gt;
    &lt;/div&gt;          
    &lt;div class="bottom" style="background-color: lightgreen;"&gt;
        &lt;p&gt;bottom&lt;/p&gt;
    &lt;/div&gt;        
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 110px;" src="https://demo.xiaohuochai.site/css/buju4/b4.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### flex

&emsp;&emsp;flex中的伸缩项目默认都拉伸为父元素的高度，可实现等高效果。通过改变伸缩项目的order，可以实现元素顺序调换的效果

&emsp;&emsp;缺点: 兼容性不高

<div>
<pre>&lt;style&gt;
body,p{margin: 0;}
.top,.bottom{height: 30px;}
.middle{display: flex;}
.left,.right{width: 100px;}
.right{order: 2;}
.main{
    order: 1;
    flex: 1;
    margin: 0 20px;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" id="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="top" style="background-color: lightblue;"&gt;
        &lt;p&gt;top&lt;/p&gt;
    &lt;/div&gt;  
    &lt;div class="middle" style="background-color: pink;"&gt;
        &lt;div class="main" style="background-color: lightcoral;"&gt;
            &lt;p&gt;main&lt;/p&gt;
            &lt;p&gt;main&lt;/p&gt;
        &lt;/div&gt;              
        &lt;div class="left" style="background-color: lightseagreen;" &gt;
            &lt;p&gt;left&lt;/p&gt;
        &lt;/div&gt;
        &lt;div class="right" style="background-color: lightcyan;" &gt;
               &lt;p&gt;right&lt;/p&gt;
        &lt;/div&gt;
    &lt;/div&gt;          
    &lt;div class="bottom" style="background-color: lightgreen;"&gt;
        &lt;p&gt;bottom&lt;/p&gt;
    &lt;/div&gt;        
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 110px;" src="https://demo.xiaohuochai.site/css/buju4/b5.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### grid

<div>
<pre>&lt;style&gt;
body,p{margin: 0;}
.top,.bottom{height: 30px;}
.middle{display:grid;grid-template-columns:100px 1fr 100px;grid-gap:20px;}
.main{grid-area:1/2/2/3;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div class="parent" id="parent" style="background-color: lightgrey;"&gt;
    &lt;div class="top" style="background-color: lightblue;"&gt;
        &lt;p&gt;top&lt;/p&gt;
    &lt;/div&gt;  
    &lt;div class="middle" style="background-color: pink;"&gt;
        &lt;div class="main" style="background-color: lightcoral;"&gt;
            &lt;p&gt;main&lt;/p&gt;
            &lt;p&gt;main&lt;/p&gt;
        &lt;/div&gt;              
        &lt;div class="left" style="background-color: lightseagreen;" &gt;
            &lt;p&gt;left&lt;/p&gt;
        &lt;/div&gt;
        &lt;div class="right" style="background-color: lightcyan;" &gt;
               &lt;p&gt;right&lt;/p&gt;
        &lt;/div&gt;
    &lt;/div&gt;          
    &lt;div class="bottom" style="background-color: lightgreen;"&gt;
        &lt;p&gt;bottom&lt;/p&gt;
    &lt;/div&gt;        
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 110px;" src="https://demo.xiaohuochai.site/css/buju4/b6.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 总结

&emsp;&emsp;由于限定了主要内容元素在html结构中位于前面，通过css样式改变将其位置调换到中间的前提，所以思路并不是很多。float浮动流的元素可以通过负margin调换位置；absolute绝对定位流的元素可以通过偏移属性调换位置；flex弹性盒模型可以通过order属性调换位置；grid通过grid-area调换位置。而处于正常流中的元素除了使用relative外，使用负margin是无法调换位置的，所以table、inline-block等布局方式在此前提下不是很实用。
