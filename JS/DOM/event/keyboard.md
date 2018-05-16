# 深入理解DOM事件类型系列第二篇——键盘事件

&emsp;&emsp;鼠标和键盘是电脑端主要的输入设备，上篇介绍了[鼠标事件](http://www.cnblogs.com/xiaohuochai/p/5867195.html)，本文将详细介绍键盘事件

&nbsp;

### 类型

&emsp;&emsp;键盘事件用来描述键盘行为，主要有keydown、keypress、keyup三个事件

**keydown**

&emsp;&emsp;当用户按下键盘上的任意键时触发，如果按住不放的话，会重复触发该事件

<div>
<pre>&lt;div id="test" style="height: 30px;width: 200px;background-color: pink;"&gt;请按下键盘上的任意键&lt;/div&gt;
&lt;button id="reset"&gt;还原&lt;/button&gt;
&lt;script&gt;
reset.onclick = function(){history.go();}
document.onkeydown = function(e){
    if(!test.mark){
        test.innerHTML ='';
    }
    test.mark = 1;
    e = e || event;
    test.innerHTML += e.type;
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 70px;" src="https://demo.xiaohuochai.site/js/keyboard/k1.html" frameborder="0" width="320" height="240"></iframe>

**keypress**

&emsp;&emsp;当用户按下键盘上的字符键时触发，按下功能键时不触发。如果按住不放的话，会重复触发该事件

&emsp;&emsp;注意：关于esc键，各浏览器处理不一致。IE浏览器和firefox浏览器按下esc键时，会触发keypress事件；而chrome/safari/opera这三个webkit内核的浏览器则不会触发

&emsp;&emsp;键盘事件必须绑定在可以获得焦点的元素上。而页面刚加载完成时，焦点处于document元素

&emsp;&emsp;注意：IE浏览器不完全支持绑定在document元素上的keypress事件，只有IE9+浏览器在使用DOM2级事件处理程序时才支持

&emsp;&emsp;所以，以下代码中，只有焦点处于id为'test'的元素上，才会发生keypress事件

<div>
<pre>&lt;button id="test" style="height: 30px;width: 200px;background-color: pink;"&gt;请按下键盘上的任意键&lt;/button&gt;&lt;br&gt;
&lt;button id="reset"&gt;还原&lt;/button&gt;
&lt;script&gt;
reset.onclick = function(){history.go();}
test.focus();
test.onkeypress = function(e){
    if(!test.mark){
        test.innerHTML ='';
    }
    test.mark = 1;
    e = e || event;
    test.innerHTML += e.type;
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 70px;" src="https://demo.xiaohuochai.site/js/keyboard/k2.html" frameborder="0" width="320" height="240"></iframe>

**keyup**

&emsp;&emsp;当用户释放键盘上的键时触发

<div>
<pre>&lt;div id="test" style="height: 30px;width: 200px;background-color: pink;"&gt;请按下键盘上的任意键&lt;/div&gt;
&lt;button id="reset"&gt;还原&lt;/button&gt;
&lt;script&gt;
reset.onclick = function(){history.go();}
document.onkeyup = function(e){
    if(!test.mark){
        test.innerHTML ='';
    }
    test.mark = 1;
    e = e || event;
    test.innerHTML += e.type;
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 70px;" src="https://demo.xiaohuochai.site/js/keyboard/k3.html" frameborder="0" width="320" height="240"></iframe>

**时间间隔**

&emsp;&emsp;系统为了防止按键误被连续按下，所以在第一次触发keydown事件后，有500ms的延迟，才会触发第二次keydown事件

&emsp;&emsp;注意：类似的，keypress事件也存在500ms的时间间隔

<div>
<pre>&lt;button id="btn"&gt;获取间隔时间&lt;/button&gt;
&lt;span&gt;说明：按钮获取焦点后，使用空格键按下一段时间，松开后可获取keydown事件的时间间隔&lt;/span&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;script&gt;
var time = [];
var last=0;
btn.onkeydown = function(e){
    e = e || event;
    time.push(e.timeStamp-last);
    last = e.timeStamp;
}
btn.onclick = function(){
    time.shift();
    result.innerHTML = time.join();
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 90px;" src="https://demo.xiaohuochai.site/js/keyboard/k4.html" frameborder="0" width="320" height="240"></iframe>

### 顺序

&emsp;&emsp;如果用户一直按键不松开，就会连续触发键盘事件，触发的顺序如下

<div>
<pre>1、keydown
2、keypress
3、keydown
4、keypress
5、（重复以上过程）
6、keyup</pre>
</div>
<div>
<pre>&lt;button id="test" style="height: 30px;width: 200px;background-color: pink;"&gt;请按下键盘上的任意键&lt;/button&gt;&lt;br&gt;
&lt;button id="reset"&gt;还原&lt;/button&gt;
&lt;script&gt;
reset.onclick = function(){history.go();}
test.focus();
test.onkeypress =test.onkeydown =test.onkeyup = function(e){
    if(!test.mark){
        test.innerHTML ='';
    }
    test.mark = 1;
    e = e || event;
    test.innerHTML += e.type + ';';
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 70px;" src="https://demo.xiaohuochai.site/js/keyboard/k5.html" frameborder="0" width="320" height="240"></iframe>

### 按键信息

&emsp;&emsp;键盘事件包括keyCode、key、char、keyIdentifier和修改键共5个按键信息

**键码keyCode**

&emsp;&emsp;在发生键盘事件时，event事件对象的键码keyCode属性中会包含一个代码，与键盘上一个特定的键对应。对数字字母字符键，keyCode属性的值与ASCII码中对应大写字母或数字的编码相同

&emsp;&emsp;注意：firfox浏览器不支持keypress事件中的keyCode属性

![keycode](https://pic.xiaohuochai.site/blog/JS_DOM_event_keycode.gif)

&emsp;&emsp;而我们在做游戏时，常用的四个方向按键，左上右下(顺时针)的键码分别是37、38、39、40

<div>
<pre>&lt;div id="test" style="height: 30px;width: 200px;background-color: pink;"&gt;&lt;/div&gt;
&lt;button id="reset"&gt;还原&lt;/button&gt;
&lt;script&gt;
reset.onclick = function(){history.go();}
document.onkeyup = function(e){
    e = e || event;
    test.innerHTML += e.keyCode + ';';
}
&lt;/script&gt;</pre>
</div>

<iframe style="line-height: 1.5; width: 100%; height: 70px;" src="https://demo.xiaohuochai.site/js/keyboard/k6.html" frameborder="0" width="320" height="240"></iframe>

**key**

&emsp;&emsp;key属性是为了取代keyCode而新增的，它的值是一个字符串。在按下某个字符键时，key的值就是相应的文本字符；在按下非字符键时，key的值是相应键的名，默认为空字符串

&emsp;&emsp;注意：IE8-浏览器不支持，而safari浏览器不支持keypress事件中的key属性

<div>
<pre>&lt;div id="test" style="height: 30px;width: 200px;background-color: pink;"&gt;&lt;/div&gt;
&lt;button id="reset"&gt;还原&lt;/button&gt;
&lt;script&gt;
reset.onclick = function(){history.go();}
document.onkeyup = function(e){
    e = e || event;
    test.innerHTML = e.key;
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 70px;" src="https://demo.xiaohuochai.site/js/keyboard/k7.html" frameborder="0" width="320" height="240"></iframe>

**char**

&emsp;&emsp;char属性在按下字符键时的行为与key相同，但在按下非字符键时值为null

&emsp;&emsp;注意：该属性只有IE9+浏览器支持

**keyIdentifier**

&emsp;&emsp;keyIdentifier属性在按下非字符键的情况下与key的值相同。对于字符键，keyIdentifier返回一个格式类似&ldquo;U+0000&rdquo;的字符串，表示Unicode值

&emsp;&emsp;注意：该属性只有chrome/safari/opera浏览器支持

<div>
<pre>&lt;div id="test" style="height: 30px;width: 200px;background-color: pink;"&gt;&lt;/div&gt;
&lt;button id="reset"&gt;还原&lt;/button&gt;
&lt;script&gt;
reset.onclick = function(){history.go();}
document.onkeyup = function(e){
    e = e || event;
    test.innerHTML = e.keyIdentifier;
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 70px;" src="https://demo.xiaohuochai.site/js/keyboard/k8.html" frameborder="0" width="320" height="240"></iframe>

**兼容**

&emsp;&emsp;一般地，使用key属性和keyCode属性来实现兼容处理。key属性IE8-浏览器不支持，而keyCode属性无法区分大小写字母

<div>
<pre>var handler = function(e){
    var CompatibleKey;
    e = e || event;
    //支持key属性
    if(e.key != undefined){
        CompatibleKey = e.key;
    }else{
        //当按键是数字或大写字母时
        if(e.keyCode&gt;47 &amp;&amp; e.keyCode&lt;58 || e.keyCode&gt;64 &amp;&amp; e.keyCode&lt;91){
            CompatibleKey =String.fromCharCode(e.keyCode);
        }else{
            //当案按键是方向按键时
            switch(e.keyCode){
                case 37:
                    CompatibleKey = 'ArrowLeft';
                    break;
                case 38:
                    CompatibleKey = 'ArrowUp';
                    break;
                case 39:
                    CompatibleKey = 'ArrowRight';
                    break;
                case 40:
                    CompatibleKey = 'ArrowDown';
                    break;
            }
        }    
    }
}</pre>
</div>

**修改键**

&emsp;&emsp;修改键在鼠标事件中介绍过，在键盘事件中也存在修改键

&emsp;&emsp;修改键就是Shift、Ctrl、Alt和Meta(在Windows键盘中是Windows键，在苹果机中是Cmd键)。DOM为此规定了4个属性，表示这些修改键的状态：shiftKey、ctrlKey、altKey和metaKey。这些属性中包含的都是布尔值，如果相应的键被按下了，则值为true；否则值为false

<div>
<pre>&lt;div id="box" style="height:30px;width:300px;background:pink;"&gt;&lt;/div&gt;
&lt;script&gt;
document.onkeyup=function(e){
    e = e || event;
       if(e.shiftKey){box.innerHTML = 'shiftKey;'}
       if(e.ctrlKey){box.innerHTML = 'ctrlKey;'}
       if(e.altKey){box.innerHTML = 'altKey;'}
       if(e.metaKey){box.innerHTML = 'metaKey;'}
}
document.onkeydown = function(){
    return false;
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/keyboard/k9.html" frameborder="0" width="320" height="240"></iframe>

### 应用

【1】提示大写

&emsp;&emsp;在输入框中输入字符时，如果大写模式开启，提示此时为大写模式。提示大写并不是说当前输出的是大写字母，而是说当前caps lock大写按键被按下

&emsp;&emsp;注意：大写有两种实现方式：一种是在capslock开启的情况下，另一种是输入字符时，同时按下shift键

<div>
<pre>&lt;input id="test"&gt;
&lt;span id="tips"&gt;&lt;/span&gt;
&lt;script&gt;
test.onkeydown = function(e){
    e = e || event;
    //兼容IE8-浏览器，因为IE8-浏览器不支持在定时器中传递事件对象e
    var shiftKey = e.shiftKey;
    var keyCode = e.keyCode;
    //通过定时器延迟来获取当前输入字符值
    setTimeout(function(){
        var value = test.value.slice(-1);
        //如果没有按下shift键，并且当前为大写字母，或者按下shift键，且当前为小写字母
        if(!shiftKey &amp;&amp; /[A-Z]/.test(value) || shiftKey &amp;&amp; /[a-z]/.test(value)){
            tips.innerHTML = '当前为大写模式';
            setTimeout(function(){
                tips.innerHTML = '';
            },400)
        }                
    })
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/keyboard/k10.html" frameborder="0" width="320" height="240"></iframe>

【2】过滤输入

&emsp;&emsp;只能输入数字，输入其他字符没有效果

<div>
<pre>&lt;input id="test"&gt;
&lt;span id="tips"&gt;只能输入数字&lt;/span&gt;
&lt;script&gt;
test.onkeydown = function(e){
    e = e || event;
    //利用定时器，获取实时输入值
    setTimeout(function(){
        //当输入值中包含非数字时
        if(/[^0-9]/.test(test.value)){
            //只输出数字值
            test.value = String(/\d*/.exec(test.value));
        }
    })
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/keyboard/k11.html" frameborder="0" width="320" height="240"></iframe>

