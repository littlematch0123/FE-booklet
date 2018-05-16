# 深入理解DOM事件类型系列第五篇——文本事件

&emsp;&emsp;如果DOM结构发生变化，触发的是[变动事件](http://www.cnblogs.com/xiaohuochai/p/5873289.html)；如果文本框中的文本发生变化，触发的是文本事件

&emsp;&emsp;HTML5为input控件新增了很多type属性，大大增加了input控件的应用场景。其中一个是[type="range"](http://www.cnblogs.com/xiaohuochai/p/5179909.html#anchor2-7)的input控件，可以通过拖动游标改变value值，但并不是所有浏览器都可以实时显示，除了IE10+浏览器

<div>
<pre>&lt;input type="range" min="0" max="10" step="0.5" value="6" /&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/text/t1.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;那么哪些文本事件可以实时监测游标变化呢？本文将以此为引子详细介绍文本事件

&nbsp;

### change

&emsp;&emsp;说起文本变化，最先想到的可能就是change事件

&emsp;&emsp;对于&lt;input&gt;和&lt;textarea&gt;元素，在它们失去焦点且value值改变时触发；对于&lt;select&gt;元素，在其选项改变时触发

<div>
<pre>&lt;input id="test" value="请改变内容并移除焦点"&gt;
&lt;script&gt;
test.onchange = function(){
    test.style.backgroundColor = 'pink';
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/text/t2.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;只有在IE浏览器下，change事件对游标实时变化起作用；其他浏览器下，必须松开鼠标后，change事件才起作用

<div>
<pre>&lt;input id="test" type="range" min="0" max="10" value="6" /&gt;
&lt;span id="result"&gt;&lt;/span&gt;
&lt;script&gt;
test.onchange = function(){
    result.innerHTML = test.value;
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/text/t3.html" frameborder="0" width="320" height="240"></iframe>

### textInput

&emsp;&emsp;DOM3级事件引人了一个新事件&mdash;&mdash;textInput，用来替代[keypress事件](http://www.cnblogs.com/xiaohuochai/p/5870702.html#anchor1)。当用户在可编辑区域中输入字符时，就会触发这个事件

&emsp;&emsp;注意：该事件只支持DOM2级事件处理程序，且只有chrome和safari浏览器支持

&emsp;&emsp;textInput与keypress事件有两点不同

&emsp;&emsp;【1】textInput事件只会在用户按下能够输入实际字符的键时才会被触发，而keypress事件则在按下那些能够影响文本显示的键时也会触发(如回车键)

&emsp;&emsp;【2】任何可以获得焦点的元素都可以触发keypress事件，但只有可编辑区域才能触发textInput事件

<div>
<pre>&lt;button id="test"&gt;按钮&lt;/button&gt;
&lt;script&gt;
//控制台只输出1，不输出2
test.onkeypress = function(){console.log(1);}
test.addEventListener('textInput',function(){console.log(2)})
&lt;/script&gt;</pre>
</div>
<div>
<pre>&lt;input id="test"&gt;
&lt;script&gt;
//控制台以1-2的顺序输出
test.onkeypress = function(){console.log(1);}
test.addEventListener('textInput',function(){console.log(2)})
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;由于textInput事件主要考虑的是字符，因此它的event对象中还包含一个dada属性，这个属性的值就是用户输入的字符

&emsp;&emsp;比如用户在小写模式下，按下了S键，data值就是's'，而如果在大写模式下按下该键，data的值就是'S'

<div>
<pre>&lt;input id="test"&gt;&lt;span id="result"&gt;&lt;/span&gt;
&lt;script&gt;
test.addEventListener('textInput',function(e){
    e = e || event;
    result.innerHTML = e.data;
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/text/t4.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;由于&lt;input type="range"&gt;的游标并不是可编辑区域，所以，textInput事件对游标变化无作用

&nbsp;

### input

&emsp;&emsp;文本事件中，除了textInput事件，还有一个input事件

&emsp;&emsp;HTML5新增了一个input事件，只要输入框内容发生变化就会立即触发，但通过javascript改变value时不会触发

&emsp;&emsp;所以这事件与change事件的区别就是不需要移除焦点就可以触发

&emsp;&emsp;注意：该事件IE8-浏览器不支持

<div>
<pre>&lt;input id="test"&gt;
&lt;script&gt;
test.oninput = function(){
    this.style.background = 'pink';
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/text/t5.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;该事件可以在chrome/safari/firefox/IE9浏览器中，实时监测游标的变化

<div>
<pre>&lt;input type="range" id="input"&gt;&lt;span id="result"&gt;&lt;/span&gt;
&lt;script&gt;
    input.oninput = function(){
        result.innerHTML = this.value;
    }
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/text/t6.html" frameborder="0" width="320" height="240"></iframe>

### propertychange

&emsp;&emsp;IE有一个专有事件叫propertychange事件，该事件会在设置disable="true"时失效。propertychange触发函数只有一个默认参数，是所有可以触发属性的集合。该事件是在触发对象改变任何属性时都会触发

&emsp;&emsp;注意：IE11浏览器不支持

<div>
<pre>&lt;input type="range" id="input"&gt;&lt;span id="data"&gt;&lt;/span&gt;
&lt;script&gt;
    input.onpropertychange = function(){
        data.innerHTML = this.value;
    }
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/text/t7.html" frameborder="0" width="320" height="240"></iframe>

### 兼容

&emsp;&emsp;如果要使游标变化实现全浏览器兼容，使用input和change事件可以实现

<div>
<pre>&lt;input type="range" id="test"&gt;&lt;span id="result"&gt;&lt;/span&gt;
&lt;script&gt;
//通过userAgent检测IE浏览器
function isIE(){
    var ua = navigator.userAgent;
    //检测Trident引擎，IE8+
    if(/Trident/.test(ua)){
        //IE11+
        if(/rv:(\d+)/.test(ua)){
            return RegExp["$1"];
        }    
        //IE8-IE10    
        if(/MSIE (\d+)/.test(ua)){
            return RegExp["$1"];
        }        
    }
    //检测IE标识，IE7-
    if(/MSIE (\d+)/.test(ua)){
        return RegExp["$1"];
    }    
}
//IE浏览器
if(isIE()){
    test.onchange = function(){
        result.innerHTML = this.value;
    }
//其他浏览器
}else{
    test.oninput = function(){
        result.innerHTML = this.value;
    }
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/text/t8.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

## 最后

&emsp;&emsp;如果只考虑游标，而不考虑IE9-浏览器退化成文本框的情况，使用mousemove事件就可以实现实时监控数据变化的需求

