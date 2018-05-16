# 深入理解DOM事件机制系列第三篇——事件对象

&emsp;&emsp;在触发DOM上的某个事件时，会产生一个事件对象event，这个对象中包含着所有与事件有关的信息。所有浏览器都支持event对象，但支持方式不同。本文将详细介绍事件对象

&nbsp;

### 获取事件对象

&emsp;&emsp;【1】一般地，event对象是事件程序的第一个参数

&emsp;&emsp;注意：IE8-浏览器不支持

<div>
<pre>//IE8-浏览器输出undefined，其他浏览器则输出事件对象[object MouseEvent]
&lt;div id="box" style="height:30px;width:200px;background:pink;"&gt;&lt;/div&gt;
&lt;script&gt;
var oBox = document.getElementById('box');
oBox.onclick = function(a){
    box.innerHTML = a;
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/eventObject/e1.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;【2】另一种方法是直接使用event变量

&emsp;&emsp;注意：firefox浏览器不支持

<div>
<pre>//firefox浏览器输出undefined,其他浏览器则输出事件对象[object MouseEvent]  
&lt;div id="box" style="height:30px;width:200px;background:pink;"&gt;&lt;/div&gt;
&lt;script&gt;
var oBox = document.getElementById('box');
oBox.onclick = function(){
    box.innerHTML = event;
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/eventObject/e2.html" frameborder="0" width="320" height="240"></iframe>

**兼容**

&emsp;&emsp;于是，对于获取事件对象的常见兼容写法如下

<div>
<pre>&lt;div id="box" style="height:30px;width:200px;background:pink;"&gt;&lt;/div&gt;
&lt;script&gt;
var oBox = document.getElementById('box');
oBox.onclick = function(e){
    e = e || event;
    box.innerHTML = e;
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/eventObject/e3.html" frameborder="0" width="320" height="240"></iframe>

## 属性和方法

&emsp;&emsp;事件对象包含与创建它的特定事件有关的属性和方法。触发的事件类型不一样，可用的属性和方法也不一样。不过，所有事件都有些共有的属性和方法

### 事件类型

&emsp;&emsp;事件有很多类型，事件对象中的type属性表示被触发的事件类型

<div>
<pre>&lt;div id="box" style="height:30px;width:200px;background:pink;"&gt;&lt;/div&gt;
&lt;script&gt;
//鼠标移入时，显示mouseover；移出时，显示mouseout；点击时，显示click
var oBox = document.getElementById('box');
oBox.onclick = oBox.onmouseout =oBox.onmouseover =function(e){
    e = e || event;
    box.innerHTML = e.type;
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/eventObject/e4.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;通过点击或按tab键将焦点切换到button按钮上可以触发focus事件

<div>
<pre>&lt;button id="box" style="height:30px;width:200px;background:pink;"&gt;&lt;/button&gt;
&lt;script&gt;
var oBox = document.getElementById('box');
oBox.onfocus = function(e){
    e = e || event;
    box.innerHTML = e.type;
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/eventObject/e5.html" frameborder="0" width="320" height="240"></iframe>

### 事件目标

&emsp;&emsp;关于事件目标，共有currentTarget、target和srcElement这三个属性

**currentTarget**

&emsp;&emsp;currentTarget属性返回事件当前所在的节点，即正在执行的监听函数所绑定的那个节点

&emsp;&emsp;注意：IE8-浏览器不支持

&emsp;&emsp;一般地，currentTarget与事件中的this指向相同。但在attachEvent()事件处理程序中，this指向window，[详细信息移步至此](http://www.cnblogs.com/xiaohuochai/p/5859674.html#anchor4)

<div>
<pre>&lt;style&gt;
.in{height: 30px;background-color: lightblue;margin:0 10px;}
&lt;/style&gt;
&lt;ul id="box"&gt;
    &lt;li class="in"&gt;1&lt;/li&gt;
    &lt;li class="in"&gt;2&lt;/li&gt;
&lt;/ul&gt;
&lt;script&gt;
box.onclick = function(e){
    e = e || event;
    var tags =  box.getElementsByTagName('li');
    tags[0].innerHTML = e.currentTarget;
    tags[1].innerHTML = (e.currentTarget === this);
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 90px;" src="https://demo.xiaohuochai.site/js/eventObject/e6.html" frameborder="0" width="320" height="240"></iframe>

**target**

&emsp;&emsp;currentTarget属性返回事件正在执行的监听函数所绑定的节点，而target属性返回事件的实际目标节点

&emsp;&emsp;注意：IE8-浏览器不支持

&emsp;&emsp;以下代码中，点击该实际目标节点时，颜色变品红；移出时，颜色变浅蓝

<div>
<pre>&lt;style&gt;
#box{background-color: lightblue;}
.in{height: 30px;}
&lt;/style&gt;
&lt;ul id="box"&gt;
    &lt;li class="in"&gt;1&lt;/li&gt;
    &lt;li class="in"&gt;2&lt;/li&gt;
&lt;/ul&gt;
&lt;script&gt;
box.onclick = function(e){
    e = e || event;
    e.target.style.backgroundColor = 'pink';
}
box.onmouseout = function(e){
    e = e || event;
    e.target.style.backgroundColor = 'lightblue';
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 90px;" src="https://demo.xiaohuochai.site/js/eventObject/e7.html" frameborder="0" width="320" height="240"></iframe>

**srcElement**

&emsp;&emsp;srcElement属性与target属性功能一致

&emsp;&emsp;注意：firefox浏览器不支持

<div>
<pre>&lt;style&gt;
#box{background-color: lightblue;}
.in{height: 30px;}
&lt;/style&gt;
&lt;ul id="box"&gt;
    &lt;li class="in"&gt;1&lt;/li&gt;
    &lt;li class="in"&gt;2&lt;/li&gt;
&lt;/ul&gt;
&lt;script&gt;
box.onclick = function(e){
    e = e || event;
    e.srcElement.style.backgroundColor = 'pink';
}
box.onmouseout = function(e){
    e = e || event;
    e.srcElement.style.backgroundColor = 'lightblue';
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 90px;" src="https://demo.xiaohuochai.site/js/eventObject/e8.html" frameborder="0" width="320" height="240"></iframe>

**兼容**　

<div>
<pre>var handler = function(e){
    e = e || event;
    var target = e.target || e.srcElement;
}</pre>
</div>

&nbsp;

### 事件代理

&emsp;&emsp;由于事件会在[冒泡阶段](http://www.cnblogs.com/xiaohuochai/p/5859476.html#anchor2)向上传播到父节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件。这种方法叫做事件的代理(delegation)，也叫事件委托

&emsp;&emsp;事件代理应用事件目标的target和srcElement属性完成。利用事件代理，可以提高性能及降低代码复杂度

&emsp;&emsp;有一个需求，一个&lt;ul&gt;中有5个&lt;li&gt;，移入时变浅蓝，移出时变品红

&emsp;&emsp;下面分别用常规方法和事件代理方法来实现

<div>
<pre>&lt;style&gt;
#box{background-color: pink;}
.in{height: 30px;}
&lt;/style&gt;
&lt;ul id="box"&gt;
    &lt;li class="in"&gt;1&lt;/li&gt;
    &lt;li class="in"&gt;2&lt;/li&gt;
    &lt;li class="in"&gt;3&lt;/li&gt;
    &lt;li class="in"&gt;4&lt;/li&gt;
    &lt;li class="in"&gt;5&lt;/li&gt;
&lt;/ul&gt;
&lt;script&gt;
//常规方法
var tags = box.getElementsByTagName('li');
for(var i = 0; i &lt; tags.length; i++){
    tags[i].onmouseover = function(e){
        this.style.backgroundColor = 'lightblue';
    }
    tags[i].onmouseout = function(e){
        this.style.backgroundColor = 'pink';
    }
}
&lt;/script&gt;
&lt;script&gt;
//事件代理方法
box.onmouseover = function(e){
    e = e || event;
    var target = e.target || e.srcElement;
    target.style.backgroundColor = 'lightblue';
}
box.onmouseout = function(e){
    e = e || event;
    var target = e.target || e.srcElement;
    target.style.backgroundColor = 'pink';
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 190px;" src="https://demo.xiaohuochai.site/js/eventObject/e9.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;如果可行的话，也可以考虑为document添加一个事件处理程序，用以处理页面上发生的某种特定类型的事件。这样做与采取传统的做法相比有以下优点：

&emsp;&emsp;1、document对象很快就可以访问，而且可以在页面生命周期的任何时间点上为它添加事件处理程序，而无需等待[DOMContentLoaded](http://www.cnblogs.com/xiaohuochai/p/6375372.html#anchor6)或[load事件](http://www.cnblogs.com/xiaohuochai/p/6375372.html#anchor1)。换句话说，只要可单击的元素呈现在页面上，就可以立即具备适当的功能

&emsp;&emsp;2、在页面中设置事件处理程序所需的时间更少。只添加一个事件处理程序所需的DOM引用更少，所花的时间也更少

&emsp;&emsp;3、整个页面占用的内存空间更少，能够提升整体性能

&emsp;&emsp;最适合使用事件委托技术的事件包括click、mousedown、mouseup、keydown、keyup和keypress

下面封装一个可以使用事件委托的事件绑定函数

```
function bindEvent(elem,type,selector,fn){
  if(fn == null){
    fn = selector;
    selector = null;
  }
  elem.addEventListener(type,function(e){
    var target;
    if(selector){
      target = e.target;
      if(target.matches(selector)){
        fn.call(target,e);
      }
    }else{
      fn(e);
    }
  })
}
```

&nbsp;

### 事件冒泡

&emsp;&emsp;事件冒泡是[事件流](http://www.cnblogs.com/xiaohuochai/p/5859476.html)的第三个阶段，通过事件冒泡可以在这个阶段对事件做出响应

&emsp;&emsp;关于冒泡，事件对象中包含bubbles、cancelBubble、stopPropagation()和stopImmediatePropagation()这四个相关的属性和方法

**bubbles**

&emsp;&emsp;bubbles属性返回一个布尔值，表示当前事件是否会冒泡。该属性为只读属性

&emsp;&emsp;发生在文档元素上的大部分事件都会冒泡，但focus、blur和scroll事件不会冒泡。所以，除了这三个事件bubbles属性返回false外，其他事件该属性都为true

<div>
<pre>&lt;button id="test" style="height: 30px;width: 200px;"&gt;&lt;/button&gt;
&lt;script&gt;
//点击按钮时，按钮内容为true，说明click事件默认可冒泡
test.onclick = function(e){
    test.innerHTML =e.bubbles;//true
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/eventObject/e10.html" frameborder="0" width="320" height="240"></iframe>

<div>
<pre>&lt;div id="test" style="height: 50px;width: 200px;overflow:scroll;background:pink;line-height:60px;"&gt;内容&lt;/div&gt;
&lt;script&gt;
//滚动时，div内容变成false，说明scroll事件默认不可冒泡
test.onscroll = function(e){
    test.innerHTML =e.bubbles;//false
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/eventObject/e11.html" frameborder="0" width="320" height="240"></iframe>

**stopPropagation()**

&emsp;&emsp;stopPropagation()方法表示取消事件的进一步捕获或冒泡，无返回值

&emsp;&emsp;注意：IE8-浏览器不支持

<div>
<pre>&lt;button id="test" style="height: 30px;width: 200px;"&gt;&lt;/button&gt;
&lt;script&gt;
//点击按钮时，按钮内容为'button'，因为阻止了&lt;button&gt;向&lt;body&gt;的冒泡
test.onclick = function(e){
    e = e || event;
    e.stopPropagation();
    test.innerHTML +='button\n';
}
document.body.onclick = function(e){
    test.innerHTML += 'body\n'
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/eventObject/e12.html" frameborder="0" width="320" height="240"></iframe>

**stopImmediatePropagation()**

&emsp;&emsp;stopImmediatePropagation()方法不仅可以取消事件的进一步捕获或冒泡，而且可以阻止同一个事件的其他监听函数被调用，无返回值

&emsp;&emsp;注意：IE8-浏览器不支持

&emsp;&emsp;使用stopIPropagation()方法，可以阻止冒泡，但无法阻止同一事件的其他监听函数被调用

<div>
<pre>&lt;button id="test" style="height: 30px;width: 200px;"&gt;&lt;/button&gt;
&lt;script&gt;
//使用stopIPropagation()方法，&lt;button&gt;内部变为'button'，且背景颜色变成浅蓝
test.addEventListener('click',function(e){
    e = e || event;
    e.stopPropagation();
    test.innerHTML +='button\n';    
})
test.addEventListener('click',function(e){
    e = e || event;
    test.style.background = 'lightblue';    
})
document.body.onclick = function(e){
    test.innerHTML += 'body\n'
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/eventObject/e13.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;使用stopImmediatePropagation()方法，即可以阻止冒泡，也可以阻止同一事件的其他监听函数被调用

<div>
<pre>&lt;button id="test" style="height: 30px;width: 200px;"&gt;&lt;/button&gt;
&lt;script&gt;
//使用stopImmediatePropagation()方法，&lt;button&gt;内部变为'button'，且背景颜色不变
test.addEventListener('click',function(e){
    e = e || event;
    e.stopImmediatePropagation();
    test.innerHTML +='button\n';    
})
test.addEventListener('click',function(e){
    e = e || event;
    test.style.background = 'lightblue';    
})
document.body.onclick = function(e){
    test.innerHTML += 'body\n'
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/eventObject/e14.html" frameborder="0" width="320" height="240"></iframe>

**cancelBubble**

&emsp;&emsp;cancelBubble属性只能用于阻止冒泡，无法阻止捕获阶段。该值可读写，默认值是false。当设置为true时，cancelBubble可以取消事件冒泡

&emsp;&emsp;注意：该属性全浏览器支持，但并不是标准写法

<div>
<pre>&lt;button id="test" style="height: 30px;width: 200px;"&gt;&lt;/button&gt;
&lt;script&gt;
test.onclick = function(e){
    e = e || event;
    e.cancelBubble = true;
    test.innerHTML +='button\n';
}
document.body.onclick = function(e){
    test.innerHTML += 'body\n'
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/eventObject/e15.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;当使用stopIPropagation()方法或stopImmediatePropagation()方法时，关于cancelBubble值的变化，各浏览器表现不同

<div>
<pre>//chrome/safari/opera中，cancelBubble的值为false
//IE9+/firefox中，cancelBubble的值为true
&lt;button id="test" style="height: 30px;width: 200px;"&gt;&lt;/button&gt;
&lt;script&gt;
test.onclick = function(e){
    e = e || event;
    e.stopPropagation();
    test.innerHTML = e.cancelBubble;
}
&lt;/script&gt;    </pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/eventObject/e16.html" frameborder="0" width="320" height="240"></iframe>

**兼容**

<div>
<pre>var handler = function(e){
    e = e || event;
    if(e.stopPropagation){
        e.stopPropagation();
    }else{
        e.cancelBubble = true;
    }
}</pre>
</div>

&nbsp;

### 事件流

**eventPhase**

&emsp;&emsp;eventPhase属性返回一个整数值，表示事件目前所处的事件流阶段

&emsp;&emsp;0表示事件没有发生，1表示捕获阶段，2表示目标阶段，3表示冒泡阶段

&emsp;&emsp;注意：IE8-浏览器不支持

【1】以下代码返回2，表示处于目标阶段

<div>
<pre>&lt;button id="test" style="height: 30px;width: 200px;"&gt;&lt;/button&gt;
&lt;script&gt;
test.onclick = function(e){
    e = e || event;
    test.innerHTML = e.eventPhase;
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/eventObject/e17.html" frameborder="0" width="320" height="240"></iframe>

【2】以下代码返回1，表示处于捕获阶段

<div>
<pre>&lt;button id="test" style="height: 30px;width: 200px;"&gt;&lt;/button&gt;
&lt;script&gt;
document.addEventListener('click',function(e){
    e = e || event;
    test.innerHTML = e.eventPhase;
},true);
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/eventObject/e18.html" frameborder="0" width="320" height="240"></iframe>

【3】以下代码返回3，表示处于冒泡阶段

<div>
<pre>&lt;button id="test" style="height: 30px;width: 200px;"&gt;&lt;/button&gt;
&lt;script&gt;
document.addEventListener('click',function(e){
    e = e || event;
    test.innerHTML = e.eventPhase;
},false);
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/eventObject/e19.html" frameborder="0" width="320" height="240"></iframe>

### 取消默认行为

&emsp;&emsp;常见的默认行为有点击链接后，浏览器跳转到指定页面；或者按一下空格键，页面向下滚动一段距离

&emsp;&emsp;关于取消默认行为的属性包括cancelable、defaultPrevented、preventDefault()和returnValue

**使用**

&emsp;&emsp;1、在DOM0级事件处理程序中取消默认行为，使用returnValue、preventDefault()和return false都有效

&emsp;&emsp;2、在DOM2级事件处理程序中取消默认行为，使用return false无效

&emsp;&emsp;3、在IE事件处理程序中取消默认行为，使用preventDefault()无效

&emsp;&emsp;点击下列锚点时，会自动打开博客园首页

<div>
<pre>&lt;a id="test" href="http://www.cnblogs.com" target="_blank"&gt;链接&lt;/a&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/eventObject/e20.html" frameborder="0" width="320" height="240"></iframe>

**cancelable**

&emsp;&emsp;cancelable属性返回一个布尔值，表示事件是否可以取消。该属性为只读属性。返回true时，表示可以取消。否则，表示不可取消

&emsp;&emsp;注意：IE8-浏览器不支持

<div>
<pre>&lt;a id="test" href="#"&gt;链接&lt;/a&gt;
&lt;script&gt;
test.onclick= function(e){
    e = e || event;
    test.innerHTML = e.cancelable;
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/eventObject/e21.html" frameborder="0" width="320" height="240"></iframe>

**preventDefault()**

&emsp;&emsp;preventDefault()方法取消浏览器对当前事件的默认行为，无返回值

&emsp;&emsp;注意：IE8-浏览器不支持

<div>
<pre>&lt;a id="test" href="http://www.cnblogs.com"&gt;链接&lt;/a&gt;
&lt;script&gt;
test.onclick= function(e){
    e = e || event;
    e.preventDefault();
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/eventObject/e22.html" frameborder="0" width="320" height="240"></iframe>

**returnValue**

&emsp;&emsp;returnValue属性可读写，默认值是true，但将其设置为false就可以取消事件的默认行为，与preventDefault()方法的作用相同

&emsp;&emsp;注意：firefox和IE9+浏览器不支持

<div>
<pre>&lt;a id="test" href="http://www.cnblogs.com"&gt;链接&lt;/a&gt;
&lt;script&gt;
test.onclick= function(e){
    e = e || event;
    e.returnValue = false;
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/eventObject/e23.html" frameborder="0" width="320" height="240"></iframe>

**兼容**

<div>
<pre>var handler = function(e){
    e = e || event;
    if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue = false;
    }
}</pre>
</div>

**return false**

&emsp;&emsp;除了以上方法外，取消默认事件还可以使用return false

<div>
<pre>&lt;a id="test" href="http://www.cnblogs.com"&gt;链接&lt;/a&gt;
&lt;script&gt;
test.onclick= function(e){
    return false;
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/eventObject/e24.html" frameborder="0" width="320" height="240"></iframe>

**defaultPrevented**

&emsp;&emsp;defaultPrevented属性表示默认行为是否被阻止，返回true时表示被阻止，返回false时，表示未被阻止

&emsp;&emsp;注意：IE8-浏览器不支持

<div>
<pre>&lt;a id="test" href="http://www.cnblogs.com"&gt;链接&lt;/a&gt;
&lt;script&gt;
test.onclick= function(e){
    e = e || event;
    if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue = false;
    }
    test.innerHTML = e.defaultPrevented;
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/eventObject/e25.html" frameborder="0" width="320" height="240"></iframe>

