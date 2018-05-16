# 深入理解DOM事件类型系列第一篇——鼠标事件

&emsp;&emsp;鼠标事件是web开发中最常用的一类事件，毕竟鼠标是最主要的定位设备。本文将详细介绍鼠标事件的内容

&nbsp;

### 类型

&emsp;&emsp;鼠标事件共10类，包括click、contextmenu、dblclick、mousedown、mouseup、mousemove、mouseover、mouseout、mouseenter和mouseleave

<div>
<pre>click         当用户按下并释放鼠标按键或其他方式&ldquo;激活&rdquo;元素时触发
contextmenu   可以取消的事件，当上下文菜单即将出现时触发。当前浏览器在鼠标右击时显示上下文菜单
dblclick      当用户双击鼠标时触发
mousedown     当用户按下鼠标按键时触发
mouseup       当用户释放鼠标按键时触发
mousemove     当用户移动鼠标时触发
mouseover     当鼠标进入元素时触发。relatedTarget(在IE中是fromElement)指的是鼠标来自的元素
mouseout      当鼠标离开元素时触发。relatedTarget(在IE中是toElement)指的是鼠标要去往的元素
mouseenter    类似mouseover，但不冒泡。IE将其引入，HTML5将其标准化，但尚未广泛实现
mouseleave    类似mouseout，但不冒泡。IE将其引入，HTML5将其标准化，但尚未广泛实现</pre>
</div>

**冒泡**

&emsp;&emsp;页面上的所有元素都支持鼠标事件，除了mouseenter和mouseleave事件外，所有的鼠标事件都会冒泡

&emsp;&emsp;注意：safari浏览器不支持mouseenter和mouseleave事件

<div>
<pre>&lt;button id="test" style="height: 30px;width: 200px;"&gt;&lt;/button&gt;
&lt;script&gt;
//鼠标移入移出按钮时，显示false，表示不冒泡
test.onmouseenter = test.onmouseleave =function(e){
    test.innerHTML += e.bubbles;//false
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/mouse/m1.html" frameborder="0" width="320" height="240"></iframe>

<div>
<pre>&lt;button id="test" style="height: 30px;width: 200px;"&gt;&lt;/button&gt;
&lt;script&gt;
//鼠标移入移出按钮时，显示true，表示冒泡
test.onmouseover = test.onmouseout =function(e){
    test.innerHTML += e.bubbles;//true
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/mouse/m2.html" frameborder="0" width="320" height="240"></iframe>

### 顺序

【1】鼠标移入时，触发mouseover、mouseenter和mousemove事件

&emsp;&emsp;IE浏览器会先触发一次mousemove事件，再触发mouseover和mouseenter事件，再触发多次mousemove事件

&emsp;&emsp;而其他浏览器都是先触发mouseover和mouseenter事件，再触发多次mousemove事件

<div>
<pre>&lt;div id="box" style="height:30px;width:200px;background:pink;"&gt;&lt;/div&gt;
&lt;button id="reset"&gt;还原&lt;/button&gt;
&lt;script&gt;
reset.onclick = function(){history.go();}
var oBox = document.getElementById('box');
oBox.onmouseover = oBox.onmouseenter=oBox.onmousemove =function(e){
    e = e || event;
    box.innerHTML += e.type+ ';';
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 80px;" src="https://demo.xiaohuochai.site/js/mouse/m3.html" frameborder="0" width="320" height="240"></iframe>

【2】鼠标移出时，触发mousemove、mouseleave和mouseout事件

&emsp;&emsp;所有浏览器的顺序都是(1)mousemove、(2)mouseout和(3)mouseleave事件

<div>
<pre>&lt;div id="box" style="height:30px;width:200px;background:pink;"&gt;&lt;/div&gt;
&lt;button id="reset"&gt;还原&lt;/button&gt;
&lt;script&gt;
reset.onclick = function(){history.go();}
var oBox = document.getElementById('box');
oBox.onmouseleave = oBox.onmouseout=oBox.onmousemove =function(e){
    e = e || event;
    box.innerHTML += e.type+ ';';
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 80px;" src="https://demo.xiaohuochai.site/js/mouse/m4.html" frameborder="0" width="320" height="240"></iframe>

【3】双击鼠标时，触发mousedown、mouseup、click、dblclick事件

&emsp;&emsp;一般地，浏览器的顺序是(1)mousedown、(2)mouseup、(3)click、(4)mousedown、(5)mouseup、(6)click、(7)dblclick

&emsp;&emsp;但IE8-浏览器有一个小bug，在双击事件中，它会跳过第二个mousedown和click事件，顺序为(1)mousedown、(2)mouseup、(3)click、(4)mouseup、(5)dblclick

<div>
<pre>&lt;div id="box" style="height:30px;width:200px;background:pink;"&gt;&lt;/div&gt;
&lt;button id="reset"&gt;还原&lt;/button&gt;
&lt;script&gt;
reset.onclick = function(){history.go();}
var oBox = document.getElementById('box');
oBox.onclick = oBox.ondblclick  = oBox.onmousedown = oBox.onmouseup=function(e){
    e = e || event;
    box.innerHTML += e.type+ ';';
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 80px;" src="https://demo.xiaohuochai.site/js/mouse/m5.html" frameborder="0" width="320" height="240"></iframe>

【4】点击鼠标右键时，触发mousedown、mouseup、contextmenu事件

&emsp;&emsp;一般地，浏览器的顺序是(1)mousedown、(2)mouseup、(3)contextmenu

&emsp;&emsp;但safari浏览器有一个小bug，它不触发mouseup事件，顺序为(1)mousedown、(2)contextmenu

<div>
<pre>&lt;div id="box" style="height:30px;width:200px;background:pink;"&gt;&lt;/div&gt;
&lt;button id="reset"&gt;还原&lt;/button&gt;
&lt;script&gt;
reset.onclick = function(){history.go();}
var oBox = document.getElementById('box');
oBox.oncontextmenu  = oBox.onmousedown = oBox.onmouseup=function(e){
    e = e || event;
    box.innerHTML += e.type+ ';';
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 80px;" src="https://demo.xiaohuochai.site/js/mouse/m6.html" frameborder="0" width="320" height="240"></iframe>

【5】嵌套元素的移入移出时，触发mouseover、mouseenter、mouseleave、mouseout事件

&emsp;&emsp;从父级元素进入子级元素时，顺序为:(1)父级元素的mouseout、(2)子级元素的mouseover、(3)父级元素的mouseover、(4)子级元素的mouseenter

&emsp;&emsp;从子级元素进入父级元素时，顺序为:(1)子级元素的mouseout、(2)父级元素的mouseout、(3)子级元素的mouseleave、(4)父级元素的mouseover

<div>
<pre>&lt;div id="box" style="padding: 50px;width: 100px;background:pink;"&gt;
    &lt;div id="inner" style="height: 100px;width: 100px;background-color: lightblue;"&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;button id="reset"&gt;还原&lt;/button&gt;
&lt;script&gt;
reset.onclick = function(){history.go();}
inner.onmouseout=inner.onmouseleave=inner.onmouseover=inner.onmouseenter=box.onmouseout=box.onmouseleave=box.onmouseover=box.onmouseenter= function(e){
    inner.innerHTML += e.currentTarget.id.slice(0,1)  + ':' +e.type.slice(5) + ';';
}
&lt;/script&gt;</pre>
</div>

<iframe style="line-height: 1.5; width: 100%; height: 260px;" src="https://demo.xiaohuochai.site/js/mouse/m7.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;从上面的结果可以看出mouseover、mouseout和mouseleave、mouseenter事件的区别

&emsp;&emsp;1、mouseover、mouseout是冒泡的，而mouseleave和mouseenter是不冒泡的

&emsp;&emsp;2、从父级元素进入子级元素时，不会触发父级元素的mouseleave事件

&emsp;&emsp;3、从子级元素进入父级元素时，不会触发父级元素的mouseenter事件

&nbsp;

## 事件对象

&emsp;&emsp;鼠标事件对象提供了丰富的信息，接下来将按照功能分类介绍

### 坐标位置

&emsp;&emsp;关于坐标位置，事件对象提供了clientX/Y、pageX/Y、screenX/Y、x/y、offsetX/Y、layerX/Y这6对信息

**clientX/Y与x/y**

&emsp;&emsp;clientX/Y表示鼠标指针在可视区域中的水平和垂直坐标

&emsp;&emsp;x/y与clientX/Y相同，但有兼容问题。firefox浏览器不支持x/y，且IE7-浏览器把视口的左上角坐标设置为(2,2)，其他浏览器则将(0,0)作为起点坐标，所以存在(2,2)的差距

<div>
<pre>&lt;div id="box" style="height:100px;width:200px;background:pink;"&gt;&lt;/div&gt;
&lt;script&gt;
box.onmousemove=function(e){
    e = e || event;
    box.innerHTML = 'clientX:' + e.clientX +';clientY:'+e.clientY + '&lt;br&gt;x:' + e.x + ';y:' + e.y;
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/js/mouse/m8.html" frameborder="0" width="320" height="240"></iframe>

**screenX/Y**

&emsp;&emsp;screenX/Y表示鼠标指针相对于屏幕的水平和垂直坐标

<div>
<pre>&lt;div id="box" style="height:100px;width:200px;background:pink;"&gt;&lt;/div&gt;
&lt;script&gt;
box.onmousemove=function(e){
    e = e || event;
    box.innerHTML = 'clientX:' + e.clientX +';clientY:'+e.clientY + '&lt;br&gt;screenX:' + e.screenX + ';screenY:' + e.screenY;
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/js/mouse/m9.html" frameborder="0" width="320" height="240"></iframe>

**pageX/Y与layerX/Y**

&emsp;&emsp;pageX/Y表示相对于页面的水平和垂直坐标，它与clientX/clientY的区别是不随滚动条的位置变化

&emsp;&emsp;layerX/Y与pageX/Y相同

<div>
<pre>&lt;body style="height:2000px;"&gt;
&lt;div id="box" style="height:100px;width:300px;background:pink;"&gt;&lt;/div&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;script&gt;
var oBox = document.getElementById('box');
oBox.onmousemove=function(e){
    e = e || event;
    result.innerHTML = 'clientX:' + e.clientX +';clientY:'+e.clientY + '&lt;br&gt;pageX:' + e.pageX + ';pageY:' + e.pageY;
}
&lt;/script&gt;
&lt;/body&gt; </pre>
</div>

<iframe style="width: 100%; height: 150px;" src="https://demo.xiaohuochai.site/js/mouse/m10.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;注意：IE8-浏览器不支持pageX/Y和layerX/Y，不过可以根据scrollTop/Left和clientX/Y计算出来

**兼容**　

<div>
<pre>handler = function(e){
    e = e || event;
    if(e.pageX == undefined){
        e.pageX = e.clientX + document.documentElement.scrollLeft
    }
    if(e.pageY == undefined){
        e.pageY = e.clientY + document.documentElement.scrollTop 
    }
}</pre>
</div>

**offsetX/Y**

&emsp;&emsp;offsetX/Y表示相对于定位父级的水平和垂直坐标

&emsp;&emsp;当页面无定位元素时，body是元素的定位父级。由于body的默认margin是8px，所以offsetX/Y与clientX/Y差(8,8)

<div>
<pre>&lt;div id="box" style="height:100px;width:300px;background:pink;"&gt;&lt;/div&gt;
&lt;script&gt;
var oBox = document.getElementById('box');
oBox.onmousemove=function(e){
    e = e || event;
    oBox.innerHTML = 'clientX:' + e.clientX +';clientY:'+e.clientY + '&lt;br&gt;offsetX:' + e.offsetX + ';offsetY:' + e.offsetY;
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/js/mouse/m11.html" frameborder="0" width="320" height="240"></iframe>

### 修改键

&emsp;&emsp;虽然鼠标事件主要是使用鼠标来触发的，但在按下鼠标时键盘上的某些键的状态也可以影响到所要采取的操作

&emsp;&emsp;这些修改键就是Shift、Ctrl、Alt和Meta(在Windows键盘中是Windows键，在苹果机中是Cmd键)，它们经常被用来修改鼠标事件的行为

&emsp;&emsp;DOM为此规定了4个属性，表示这些修改键的状态：shiftKey、ctrlKey、altKey和metaKey。这些属性中包含的都是布尔值，如果相应的键被按下了，则值为true；否则值为false

&emsp;&emsp;注意：IE8-浏览器不支持metaKey属性

&emsp;&emsp;下面通过点击事件，来测试是否在点击的时候按下了这些修改键

<div>
<pre>&lt;div id="box" style="height:30px;width:300px;background:pink;"&gt;&lt;/div&gt;
&lt;script&gt;
box.onclick=function(e){
    e = e || event;
    box.innerHTML = '';
       if(e.shiftKey){box.innerHTML += 'shiftKey;'}
       if(e.ctrlKey){box.innerHTML += 'ctrlKey;'}
       if(e.altKey){box.innerHTML += 'altKey;'}
       if(e.metaKey){box.innerHTML += 'metaKey;'}
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/mouse/m12.html" frameborder="0" width="320" height="240"></iframe>

### 相关元素

&emsp;&emsp;relatedTarget属性返回事件的次要相关节点。对于那些没有次要相关节点的事件，该属性返回null

&emsp;&emsp;对mouseover事件而言，事件的主目标target是获得光标的元素，而相关元素relatedTarget就是那个失去光标的元素

&emsp;&emsp;下表列出不同事件的target属性和relatedTarget属性含义

<div>
<pre>事件名称    　　target属性       relatedTarget属性
focusin       接受焦点的节点    丧失焦点的节点
focusout    　丧失焦点的节点    接受焦点的节点
mouseenter    将要进入的节点    将要离开的节点
mouseleave    将要离开的节点    将要进入的节点
mouseout      将要离开的节点    将要进入的节点
mouseover     将要进入的节点    将要离开的节点
dragenter     将要进入的节点    将要离开的节点
dragexit      将要离开的节点    将要进入的节点</pre>
</div>

&emsp;&emsp;IE8-浏览器不支持target和relatedTarget属性

**兼容**

&emsp;&emsp;target可以用srcElement属性替代，relatedTarget可以用toElement属性替代　

&emsp;&emsp;注意：firefox浏览器不支持srcElement和toElement属性

&emsp;&emsp;下列代码中， div元素的mouseover事件是从&lt;body&gt;移入到&lt;div&gt;中

<div>
<pre>&lt;div id="box" style="height:100px;width:400px;background:pink;"&gt;&lt;/div&gt;
&lt;button id="reset"&gt;还原&lt;/button&gt;
&lt;script&gt;
reset.onclick = function(){history.go();}
box.onmouseover=function(e){
    e = e || event;
    box.innerHTML = 'target:' + (e.target||e.srcElement) +'&lt;br&gt;relatedTarget:'+(e.relatedTarget||e.toElement) ;
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 160px;" src="https://demo.xiaohuochai.site/js/mouse/m13.html" frameborder="0" width="320" height="240"></iframe>

### 鼠标按键

&emsp;&emsp;button和buttons属性返回事件鼠标按键信息

**button**

&emsp;&emsp;button属性返回一个数值，表示按下了鼠标哪个键

&emsp;&emsp;注意：若不阻止右键默认行为，safari浏览器无法表示按下右键

<div>
<pre>-1     表示没有按下按键
0      表示按下左键
1      表示按下滚轮
2      表示按下右键</pre>
</div>

**buttons**

&emsp;&emsp;buttons属性返回一个3个比特位的值，表示同时按下了哪些键。它用来处理同时按下多个鼠标键的情况

&emsp;&emsp;注意：safari浏览器不支持buttons属性

<div>
<pre>1     二进制为001，表示按下左键
2     二进制为010，表示按下右键
4     二进制为100，表示按下滚轮</pre>
</div>

&emsp;&emsp;所以，同时按下左键和右键，buttons的二进制为011，表示3；同时按下左键和滚轮，buttons的二进制为101，表示5；同时按下右键和滚轮，buttons的二进制为110，表示6

<div>
<pre>&lt;div id="box" style="height:30px;width:200px;background:pink;"&gt;&lt;/div&gt;
&lt;script&gt;
box.onmouseup=function(e){
    e = e || event;
    box.innerHTML = 'button:' + e.button + ';buttons:' + e.buttons;
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/mouse/m14.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;但，IE8-浏览器的button属性的值与标准的button属性有很大差异

<div>
<pre>0:表示没有按下按钮
1:表示按下了左键
2:表示按下了右键
3:表示同时按下了左、右键
4:表示按下了滚轮
5:表示同时按下了左键和滚轮
6:表示同时按下了右键和滚轮
7:表示同时按下了左键、右键和滚轮</pre>
</div>

**兼容**

&emsp;&emsp;此时，无法使用能力检测来确定差异，可以通过hasFeature()方法来检测，关于hasFeature()方法的详细信息[移步至此](http://www.cnblogs.com/xiaohuochai/p/4853121.html)

<div>
<pre>var hasMouse = document.implementation.hasFeature('MouseEvents','2.0');
//IE8-浏览器返回false,其他浏览器true
console.log(hasMouse);</pre>
</div>
<div>
<pre>&lt;div id="box" style="height:30px;width:200px;background:pink;"&gt;&lt;/div&gt;
&lt;script&gt;
box.onmouseup=function(e){
    e = e || event;
    var Compatiblebutton;
    //IE8-浏览器
    if(!document.implementation.hasFeature('MouseEvents','2.0')){
        switch(e.button){
            case 1:
                Compatiblebutton = 0;
                break;
            case 2:
                Compatiblebutton = 2;
                break;                
            case 4:
                Compatiblebutton = 1;
                break;
        }
    }else{
        Compatiblebutton = e.button;
    }
    box.innerHTML = 'button:' + Compatiblebutton;
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/mouse/m15.html" frameborder="0" width="320" height="240"></iframe>

### 滚轮事件

&emsp;&emsp;对于滚轮事件，有类似的滚动事件scroll，但是滚动事件不兼容IE8-浏览器，详细情况[移步至此](http://www.cnblogs.com/xiaohuochai/p/5831640.html#anchor6)

&emsp;&emsp;滚轮事件与滚动事件不同，滚动事件必须有滚动条，才可以实现。而滚动事件是滚动鼠标滚轮触发的事件，与是否有滚动条无关

&emsp;&emsp;IE6首先实现了鼠标滚轮mousewheel事件，当用户通过滚动与页面交互、在垂直方向上滚动页面时，会触发mousewheel事件。最终会冒泡到document(IE8-)或window(标准)

&emsp;&emsp;注意：这个事件可以在任何元素上触发

&emsp;&emsp;滚轮事件中有一个wheelDelta属性，当用户向前滚动鼠标滚轮时，wheelDelta是120的倍数；当用户向后滚动鼠标滚轮时，wheelDelta是-120的倍数

<div>
<pre>&lt;div id="box" style="height:100px;width:200px;background:pink;"&gt;&lt;/div&gt;
&lt;script&gt;
box.onmousewheel=function(e){
    e = e || event;
    box.innerHTML = e.wheelDelta;
    if(e.wheelDelta &gt;0){
        box.style.backgroundColor = 'lightblue';
    }else{
        box.style.backgroundColor = 'lightgreen';
    }
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/js/mouse/m16.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;firefox浏览器不支持mousewheel事件，它支持DOMMouseScroll事件，而有关鼠标滚轮的信息则保存在detail属性中，当向前滚动鼠标滚轮时，这个属性的值是-3的倍数，当向后滚动鼠标滚轮时，这个属性的值是3的倍数

&emsp;&emsp;注意：该事件仅支持DOM2级事件处理程序的写法

<div>
<pre>&lt;div id="box" style="height:100px;width:200px;background:pink;"&gt;&lt;/div&gt;
&lt;script&gt;
box.addEventListener('DOMMouseScroll',function(e){
    e = e || event;
    console.log(e)
    box.innerHTML = e.detail;
    if(e.detail &gt;0){
        box.style.backgroundColor = 'lightblue';
    }else{
        box.style.backgroundColor = 'lightgreen';
    }
})
&lt;/script&gt; </pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/js/mouse/m17.html" frameborder="0" width="320" height="240"></iframe>

**兼容**

<div>
<pre>var handler = function(e){
    var getWheelDelta;
    e = e || event;
    if(e.wheelDelta){
        getWheelDelta = e.wheelDelta;
    }else{
        getWheelDelta = -e.detail * 40;
    }
}</pre>
</div>
<div>
<pre>&lt;body style="height:2000px"&gt;
&lt;p style="position: fixed"&gt;滚动滚轮将显示滚动值&lt;/p&gt;
&lt;div id="test" style="position: fixed"&gt;&lt;/div&gt;
&lt;script&gt;
var wheel = function(e){
    e = e || event;
    if(e.wheelDelta){
        test.innerHTML = e.wheelDelta;
    }else{
        test.innerHTML = -e.detail * 40;
    }
}
document.body.onmousewheel = wheel;
document.body.addEventListener('DOMMouseScroll',wheel,false);    
&lt;/script&gt;    
&lt;/body&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/js/mouse/m18.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 移动设备

&emsp;&emsp;由于移动设备没有鼠标，所以与电脑端有一些不同之处。移动设备尽量使用移动端事件，而不要使用鼠标事件

&emsp;&emsp;【1】不支持dblclick双击事件。在移动设备中双击浏览器窗口会放大画面

&emsp;&emsp;【2】单击元素会触发mousemove事件

&emsp;&emsp;【3】两个手指放在屏幕上且页面随手指移动而滚动时会触发mousewheel和scroll事件

&nbsp;

&emsp;&emsp;欢迎交流

