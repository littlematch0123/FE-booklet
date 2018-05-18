# jQuery状态选择器

&emsp;&emsp;过滤选择器的内容非常多，本文介绍过滤选择器的最后一部分&mdash;&mdash;状态选择器

&nbsp;

### 焦点状态

**:focus**

&emsp;&emsp;:focus选择器选择当前获得焦点的元素

<div>
<pre>&lt;div&gt;
   &lt;button&gt;btn1&lt;/button&gt;
   &lt;button&gt;btn2&lt;/button&gt;
   &lt;button&gt;btn3&lt;/button&gt;
&lt;/div&gt;
&lt;script&gt;    
document.onclick = function(){
    $(':focus').css('color','red');
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/jquery/selector/s28.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;对应于CSS选择器[:focus](http://www.cnblogs.com/xiaohuochai/p/5518943.html#anchor1)

<div>
<pre>:focus{color:red}</pre>
</div>

&emsp;&emsp;如果用javascript实现类似效果

<div>
<pre>var tags = document.getElementsByTagName('*');
for(var i = 0; i &lt; tags.length; i++){
    tags[i].onfocus = function(){
        this.style.color = 'red';
    }
}</pre>
</div>

&nbsp;

### 哈希状态

**:target**

&emsp;&emsp;:target选择器用于匹配锚点对应的目标元素

<div>
<pre>&lt;div&gt;
    &lt;a href="#test"&gt;锚点&lt;/a&gt;
    &lt;div id="test"&gt;变色&lt;/div&gt;
&lt;/div&gt;
&lt;script&gt;
window.location = '#test';
$(':target').css('color','red');
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/selector/s29.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;对应的CSS选择器是:target选择器，用于匹配锚点对应的目标元素

<div>
<pre>:target{color:red;}</pre>
</div>

&nbsp;

### 动画状态

**:animated**

&emsp;&emsp;:animated选择器选择所有正在执行动画效果的元素

<div>
<pre>&lt;button id="btn"&gt;run&lt;/button&gt;
&lt;div id="mover" style="height:30px;width: 30px;background-color: green;"&gt;&lt;/div&gt;
&lt;script&gt;
function animateIt() {
  $("#mover").slideToggle("slow", animateIt);
}
animateIt();
btn.onclick = function(){
     $("div:animated").css('background-color','red');
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 70px;" src="https://demo.xiaohuochai.site/jquery/selector/s30.html" frameborder="0" width="320" height="240"></iframe>

### 显隐状态

**:hidden**

&emsp;&emsp;:hidden选择器选择所有隐藏的元素，返回集合元素

**隐藏**

&emsp;&emsp;元素不可见并不是隐藏，元素被认为隐藏有以下几种情况：

&emsp;&emsp;【1】display:none

&emsp;&emsp;【2】表单元素的type='hidden'

&emsp;&emsp;【3】宽度和高度都设置为0

&emsp;&emsp;【4】祖先元素是隐藏的

&emsp;&emsp;注意：元素visibility: hidden或opacity: 0被认为是可见的，因为他们仍然占据布局空间

**:visible**

&emsp;&emsp;:visible选择器选择所有可见的元素，如果元素占据文档一定的空间，元素被认为是可见的

&emsp;&emsp;注意：隐藏元素上做动画，元素被认为是可见的，直到动画结束

<div>
<pre>&lt;button id="btn1"&gt;$('#test :hidden')&lt;/button&gt;
&lt;button id="btn2"&gt;$('#test :visible')&lt;/button&gt;
&lt;button id="reset"&gt;还原&lt;/button&gt;
&lt;div id="test"&gt;
    &lt;div&gt;
        &lt;div style="display:none;"&gt;hidden&lt;/div&gt;  
        &lt;div&gt;visible&lt;/div&gt; 
    &lt;/div&gt;
    &lt;form&gt;
        &lt;input type="hidden" /&gt;
        &lt;input/&gt;
    &lt;/form&gt;   
&lt;/div&gt;
&lt;script&gt;
reset.onclick = function(){history.go();}
btn1.onclick = function(){this.innerHTML = '有'+$('#test :hidden').length+'个隐藏元素'}
btn2.onclick = function(){this.innerHTML = '有'+$('#test :visible').length+'个可见元素'}
&lt;/script&gt; </pre>
</div>

<iframe style="width: 100%; height: 90px;" src="https://demo.xiaohuochai.site/jquery/selector/s31.html" frameborder="0" width="320" height="240"></iframe>