# 深入理解javascript中的焦点管理

&emsp;&emsp;焦点作为javascript中的一个重要功能，基本上和页面交互都离不开焦点。但却少有人对焦点管理系统地做总结归纳。本文就javascript中的焦点管理作详细介绍

&nbsp;

### 焦点元素

&emsp;&emsp;到底哪些元素可以获得焦点呢？默认情况下，只有表单元素可以获得焦点。因为只有表单元素可以交互

<div>
<pre>&lt;input type="text" value="223"&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/focus/f1.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;让非表单元素获得焦点也是有办法的，先将tabIndex属性设置为-1，再调用focus()方法

<div>
<pre>&lt;div id="test" style="height:30px;width:100px;background:lightgreen"&gt;div&lt;/div&gt;
&lt;button id="btn"&gt;div元素获得焦点&lt;/button&gt;
&lt;script&gt;
btn.onclick = function(){
    test.tabIndex = -1;
    test.focus();    
}
test.onfocus = function(){
    this.style.background = 'pink';
}
&lt;/script&gt;</pre>
</div>

<iframe style="line-height: 1.5; width: 100%; height: 80px;" src="https://demo.xiaohuochai.site/js/focus/f2.html" frameborder="0" width="320" height="240"></iframe>

**activeElement**

&emsp;&emsp;document.activeElement属性用于管理DOM焦点，保存着当前获得焦点的元素

&emsp;&emsp;注意：该属性IE浏览器不支持

<div>
<pre>&lt;div id="test" style="height:30px;width:100px;background:lightgreen"&gt;div&lt;/div&gt;
&lt;button id="btn"&gt;div元素获得焦点&lt;/button&gt;
&lt;script&gt;
console.log(document.activeElement);//&lt;body&gt;
btn.onclick = function(){
    console.log(document.activeElement);//&lt;button&gt;
    test.tabIndex = -1;
    test.focus();    
    console.log(document.activeElement);//&lt;div&gt;
}
&lt;/script&gt;</pre>
</div>

&nbsp;

### 获得焦点

&emsp;&emsp;元素获得焦点的方式有4种，包括页面加载、用户输入(按tab键)、focus()方法和autofocus属性

【1】页面加载

&emsp;&emsp;默认情况下，文档刚刚加载完成时，document.activeElement中保存的是body元素的引用。文档加载期间，document.activeElement的值为null

<div>
<pre>&lt;script&gt;
console.log(document.activeElement);//null
&lt;/script&gt;
&lt;body&gt;
&lt;script&gt;
console.log(document.activeElement);//&lt;body&gt;
&lt;/script&gt;
&lt;/body&gt;</pre>
</div>

【2】用户输入(按tab键)

&emsp;&emsp;用户通常可以使用tab键移动焦点，使用空格键激活焦点。比如，如果焦点在一个链接上，此时按一下空格键，就会跳转到该链接

&emsp;&emsp;说到tab键，就不能不提到tabindex属性。tabindex属性用来指定当前HTML元素节点是否被tab键遍历，以及遍历的优先级

&emsp;&emsp;1、如果tabindex=-1，tab键跳过当前元素

&emsp;&emsp;2、如果tabindex=0，表示tab键将遍历当前元素。如果一个元素没有设置tabindex，默认值就是0

&emsp;&emsp;3、如果tabindex大于0，表示tab键优先遍历。值越大，就表示优先级越小

&emsp;&emsp;下列代码中，使用tab键时，button获得焦点的顺序是2、5、1、3

<div>
<pre>&lt;div id="box"&gt;
    &lt;button tabindex= "3"&gt;1&lt;/button&gt;
    &lt;button tabindex= "1"&gt;2&lt;/button&gt;
    &lt;button tabindex= "0"&gt;3&lt;/button&gt;
    &lt;button tabindex= "-1"&gt;4&lt;/button&gt;
    &lt;button tabindex= "2"&gt;5&lt;/button&gt;    
&lt;/div&gt;
&lt;script&gt;
box.onkeyup = function(){
    document.activeElement.style.background = 'pink';
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/focus/f3.html" frameborder="0" width="320" height="240"></iframe>

【3】focus()

&emsp;&emsp;focus()方法用于将浏览器的焦点设置到表单字段，即激活表单字段，使其可以响应键盘事件

&emsp;&emsp;注意：前面介绍过，若非表单元素，设置为tabIndex为-1，也可以获取焦点

<div>
<pre>&lt;span id="test1" style="height:30px;width:100px;"&gt;span&lt;/span&gt;
&lt;input id="test2" value="input"&gt;
&lt;button id="btn1"&gt;span元素获得焦点&lt;/button&gt;
&lt;button id="btn2"&gt;input元素获得焦点&lt;/button&gt;
&lt;script&gt;
btn1.onclick = function(){test1.tabIndex=-1;test1.focus();}
btn2.onclick = function(){test2.focus();}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/focus/f4.html" frameborder="0" width="320" height="240"></iframe>

**【4】autofocus**

&emsp;&emsp;HTML5表单字段新增了autofocus属性，只要设置这个属性，不用javascript就能自动把焦点移动到相应字段　

&emsp;&emsp;注意：该属性只能用于表单元素，普通元素即使设置tabIndex="-1"也不生效

<div>
<pre>&lt;input autofocus value="abc"&gt;</pre>
</div>

**hasFocus()**

&emsp;&emsp;document.hasFocus()方法返回一个布尔值，表示当前文档之中是否有元素被激活或获得焦点。通过检测文档是否获得了焦点，可以知道是不是正在与页面交互

<div>
<pre>console.log(document.hasFocus());//true
//在两秒钟内点击其他标签页，使焦点离开当前页面
setTimeout(function(){
    console.log(document.hasFocus());//false
},2000);</pre>
</div>

&nbsp;

### 失去焦点

&emsp;&emsp;如果使用javascript使元素失去焦点，那么就要使用blur()方法

&emsp;&emsp;blur()方法的作用是从元素中移走焦点。在调用blur()方法时，并不会把焦点转移到某个特定的元素上；仅仅是将焦点从调用这个方法的元素上面移走而已

<div>
<pre>&lt;input id="test" type="text" value="123"&gt;
&lt;button id="btn1"&gt;input元素获得焦点&lt;/button&gt;
&lt;button id="btn2"&gt;input元素失去焦点&lt;/button&gt;
&lt;script&gt;
btn1.onclick = function(){test.focus();}
btn2.onclick = function(){test.blur();}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/focus/f5.html" frameborder="0" width="320" height="240"></iframe>

### 焦点事件

&emsp;&emsp;焦点事件会在页面获得或失去焦点时触发。利用这些事件并与document.hasFocus()方法及 document.activeElement属性配合，可以知晓用户在页面上的行踪

&emsp;&emsp;焦点事件共包括下面4个

**blur**

&emsp;&emsp;blur事件在元素失去焦点时触发。这个事件不会冒泡

**focus**

&emsp;&emsp;focus事件在元素获得焦点时触发。这个事件不会冒泡

**focusin**

&emsp;&emsp;focusin事件在元素获得焦点时触发。这个事件与focus事件等价，但它冒泡

**focusout**

&emsp;&emsp;focusour事件在元素失去焦点时触发。这个事件与blur事件等价，但它冒泡

&emsp;&emsp;注意：关于focusin和focusout事件，除了IE浏览器支持DOM0级事件处理程序，其他浏览器都只支持DOM2级事件处理程序

<div>
<pre>&lt;div id="box"style="display:inline-block;padding:25px;background-color:lightgreen;"&gt;
    &lt;div id="boxIn" style="height: 50px;width: 50px;background-color:pink;"&gt;123&lt;/div&gt;
&lt;/div&gt;
&lt;button id="btn1"&gt;内容为123的div元素获取焦点&lt;/button&gt;
&lt;button id="btn2"&gt;内容为123的div元素失去焦点&lt;/button&gt;
&lt;button id="reset"&gt;还原&lt;/button&gt;
&lt;script&gt;
reset.onclick = function(){history.go();}
//focus()方法
btn1.onclick = function(){
    boxIn.tabIndex= -1;
    boxIn.focus();
}
//blur()方法
btn2.onclick = function(){
    boxIn.blur();
}
//focusin事件
if(boxIn.addEventListener){
    boxIn.addEventListener('focusin',handler)    
}else{
    boxIn.onfocusin = handler;
}
function handler(){
    this.style.backgroundColor ='lightblue';
}
if(box.addEventListener){
    box.addEventListener('focusin',handler)    
}else{
    box.onfocusin = handler;
}    
//blur事件
function fnBlur(){
    this.style.backgroundColor = 'orange';
}
boxIn.onblur = fnBlur;
box.onblur = fnBlur;
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;由运行结果可知，focusin事件可冒泡；而blur事件不可冒泡

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/js/focus/f6.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;焦点事件常用于表单展示及验证

&emsp;&emsp;比如，获取焦点时，修改背景颜色；失去焦点时，还原背景颜色并验证

<div>
<pre>&lt;div id="box"&gt;
    &lt;input id="input1" type="text" placeholder="只可以输入数字"&gt;
    &lt;input id="input2" type="text" placeholder="只可以输入汉字"&gt;    
    &lt;span id="tips"&gt;&lt;/span&gt;
&lt;/div&gt;
&lt;script&gt;
if(box.addEventListener){
    box.addEventListener('focusin',fnIn);
    box.addEventListener('focusout',fnOut);
}else{
    box.onfocusin = fnIn;
    box.onfocusout = fnOut;
}
function fnIn(e){
    e = e || event;
    var target = e.target || e.srcElement;
    target.style.backgroundColor = 'lightgreen';
}
function fnOut(e){
    e = e || event;
    var target = e.target || e.srcElement;
    target.style.backgroundColor = 'initial';
    //如果是验证数字的文本框
    if(target === input1){
        if(!/^\d*$/.test(target.value.trim())){
            target.focus();
            tips.innerHTML = '只能输入数字，请重新输入'
            setTimeout(function(){
                tips.innerHTML = ''
            },500);
        }
    }
    //如果是验证汉字的文本框
    if(target === input2){
        if(!/^[\u4e00-\u9fa5]*$/.test(target.value.trim())){
            target.focus();
            tips.innerHTML = '只能输入汉字，请重新输入'
            setTimeout(function(){
                tips.innerHTML = ''
            },500);
        }
    }    
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/js/focus/f7.html" frameborder="0" width="320" height="240"></iframe>

