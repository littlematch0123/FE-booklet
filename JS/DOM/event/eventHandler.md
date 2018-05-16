# 深入理解DOM事件机制系列第二篇——事件处理程序

&emsp;&emsp;事件处理程序又叫事件侦听器，实际上就是事件的绑定函数。事件发生时会执行函数中相应代码。事件处理程序有HTML事件处理程序、DOM0级事件处理程序、DOM2级事件处理程序和IE事件处理程序四类，下面将详细介绍该部分内容

&nbsp;

### HTML事件处理程序

&emsp;&emsp;某个元素支持的每种事件，都可以使用一个与相应事件处理程序同名的HTML特性来指定。这个特性的值应该是能够执行的javascript代码

&emsp;&emsp;在事件处理程序函数内部，this值等于事件的目标元素

<div>
<pre>&lt;div id="box" style="height:30px;width:200px;background-color:pink;"onclick = "this.innerHTML+= '1';"&gt;&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/eventHandler/e1.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;在HTML中定义的事件处理程序也可以调用在页面其他地方定义的脚本

<div>
<pre>&lt;div id="box" style="height:30px;width:200px;background-color:pink;"onclick = "test()"&gt;&lt;/div&gt;
&lt;script&gt;
    function test(){box.innerHTML+= '1';}    
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/eventHandler/e2.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;HTML事件处理程序会创建一个封装着元素属性值的函数。这个函数中有一个局部变量event，也就是事件对象。通过event变量，可以直接访问事件对象，不用自己定义它，也不用从函数的参数列表中获取

<div>
<pre>&lt;div id="box" style="height:30px;width:200px;background-color:pink;"onclick = "this.innerHTML+= event.type;"&gt;&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/eventHandler/e3.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;在事件处理程序函数内部，可以像访问局部变量一样访问document及该元素本身的成员。如此一来，事件处理程序要访问自己的属性就简单多了

<div>
<pre>&lt;button id="box" value="test" style="height:30px;width:200px;background-color:pink;"onclick = "this.innerHTML+= value;"&gt;&lt;/button&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/eventHandler/e4.html" frameborder="0" width="320" height="240"></iframe>

【扩展】

&emsp;&emsp;下列这种情况输出的是空字符串''，如果与预想结果不一致，请[移步至此](http://www.cnblogs.com/xiaohuochai/p/4851210.html)

<div>
<pre>&lt;script&gt;
var value=123;
&lt;/script&gt;
&lt;button style="height:30px;width:200px;background-color:pink;"onclick = "this.innerHTML+= value;"&gt;&lt;/button&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/eventHandler/e5.html" frameborder="0" width="320" height="240"></iframe>

**缺点**

【1】时差问题

&emsp;&emsp;因为用户可能会有HTML元素一出现在页面上时就触发相应的事件，但当时的事件处理程序有可能尚不具备执行条件，就会报错

<div>
<pre>&lt;button style="height:30px;width:200px;background-color:pink;"onclick = "this.innerHTML+= val;"&gt;&lt;/button&gt;
&lt;script src="http://www.qq.com/test.js"&gt;&lt;/script&gt;
&lt;script&gt;
var val=123;
&lt;/script&gt;</pre>
</div>

【2】耦合问题

&emsp;&emsp;客户端编程的通用风格是保持HTML内容和javaScript行为分离，所以应该避免使用HTML事件处理程序属性，因为这些属性直接混合了javascript和HTML，且不易扩展

&nbsp;

### DOM0级事件处理程序

&emsp;&emsp;通过javascript指定事件处理程序的传统方式，就是将一个函数赋值给一个事件处理程序属性。这种为事件处理程序赋值的方法是在第四代Web浏览器中出现的，而且至今仍然为所有现代浏览器所支持。原因一是简单，二是具有跨浏览器的优势

&emsp;&emsp;每个元素都有自己的事件处理程序属性，这些属性通常全部小写，将这种属性的值设置为一个函数，就可以指定事件处理程序

&emsp;&emsp;注意：以DOM0级方式添加的事件处理程序会在事件流的冒泡阶段被处理

<div>
<pre>&lt;div id="box" style="height:30px;width:200px;background-color:pink;"&gt;&lt;/div&gt;
&lt;script&gt;
box.onclick = function(){this.innerHTML += '1';}    
&lt;/script&gt;    </pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/eventHandler/e6.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;可以通过将事件处理程序属性设置为null来删除事件处理程序

<div>
<pre>box.onclick = null;</pre>
</div>

**缺点**

&emsp;&emsp;DOM0级事件处理程序的缺点是围绕着每个事件目标对于每种事件类型只能添加一个事件处理程序

&nbsp;

### DOM2级事件处理程序

&emsp;&emsp;DOM2级事件处理程序定义了两个方法用于处理指定和删除事件处理程序的操作：addEventListener()和removeEventListener()

&emsp;&emsp;所有DOM节点中都包含这两个方法，并且它们都接受3个参数：要处理的事件名、作为事件处理程序的函数和一个布尔值。最后的布尔值参数如果是true，表示在捕获阶段调用事件处理程序；如果是false，表示在冒泡阶段调用事件处理程序。若最后的布尔值不填写，则和false效果一样

&emsp;&emsp;注意：IE8-浏览器不支持DOM2级事件处理程序

&emsp;&emsp;使用DOM2级事件处理程序的好处是可以添加多个事件处理程序，并按照他们添加的顺序触发

&emsp;&emsp;以下代码以1-2的顺序输出

<div>
<pre>&lt;div id="box" style="height:30px;width:200px;background-color:pink;"&gt;&lt;/div&gt;
&lt;script&gt;
box.addEventListener('click',function(){this.innerHTML += '1'},false);
box.addEventListener('click',function(){this.innerHTML += '2'},false);    
&lt;/script&gt;    </pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/eventHandler/e7.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;以下代码以2-1的顺序输出

<div>
<pre>&lt;div id="box" style="height:30px;width:200px;background-color:pink;"&gt;&lt;/div&gt;
&lt;script&gt;
setTimeout(function(){
box.addEventListener('click',function(){this.innerHTML += '1'},false);    
},16);
box.addEventListener('click',function(){this.innerHTML += '2'},false);    
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/eventHandler/e8.html" frameborder="0" width="320" height="240"></iframe>

**参数**

&emsp;&emsp;如果希望向监听函数传递参数，可以用匿名函数包装一下监听函数

<div>
<pre>&lt;div id="box" style="height:30px;width:200px;background-color:pink;"&gt;&lt;/div&gt;
&lt;script&gt;
box.addEventListener("click",function(){
    test('123');
},false);
function test(x){box.innerHTML += x;}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/eventHandler/e9.html" frameborder="0" width="320" height="240"></iframe>

**移除**

&emsp;&emsp;通过addEventListener()添加的事件处理程序只能使用removeEventListener()来移除，移除时传入的参数与添加处理程序时使用的参数相同。这意味着，addEventListener()添加的匿名函数将无法移除

&emsp;&emsp;以下无效

<div>
<pre>&lt;div id="box" style="height:30px;width:200px;background-color:pink;"&gt;&lt;/div&gt;
&lt;script&gt;
box.addEventListener("click",function(){
    this.innerHTML += '1'
},false);
box.removeEventListener('click',function(){
    this.innerHTML += '1'
},false);    
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/eventHandler/e10.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;以下有效

<div>
<pre>&lt;div id="box" style="height:30px;width:200px;background-color:pink;"&gt;&lt;/div&gt;
&lt;script&gt;
var handle = function(){this.innerHTML += '1'};
box.addEventListener("click",handle,false);
box.removeEventListener('click',handle,false);    
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/eventHandler/e11.html" frameborder="0" width="320" height="240"></iframe>

### IE事件处理程序

&emsp;&emsp;IE实现了与DOM中类似的两个方法：attachEvent()和detachEvent()。这两个方法接受相同的两个参数：事件处理程序名称与事件处理程序函数。由于IE8-浏览器只支持事件冒泡，所以通过attachEvent()添加的事件处理程序都会被添加到事件冒泡阶段

&emsp;&emsp;attachEvent()方法的第一个参数是"onclick"，而非DOM的addEventListener()方法中的"click"

<div>
<pre>&lt;div id="box" style="height:30px;width:200px;background-color:pink;"&gt;&lt;/div&gt;
&lt;script&gt;
box.attachEvent('onclick',function(){this.innerHTML += '1';});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/eventHandler/e12.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;注意：attachEvent()方法只冒泡到document，且IE10-浏览器支持

<div>
<pre>&lt;div id="box" style="height:30px;width:200px;background-color:pink;"&gt;&lt;/div&gt;
&lt;button id="reset"&gt;还原&lt;/button&gt;
&lt;script&gt;
//IE10-浏览器返回div body html document
//其他浏览器报错
reset.onclick = function(){history.go();}
box.attachEvent('onclick',function(){box.innerHTML += 'div\n';});
document.body.attachEvent('onclick',function(){box.innerHTML += 'body\n';});
document.documentElement.attachEvent('onclick',function(){box.innerHTML += 'html\n';});
document.attachEvent('onclick',function(){box.innerHTML += 'document\n';});
window.attachEvent('onclick',function(){box.innerHTML += 'window\n';});
&lt;/script&gt;    </pre>
</div>

<iframe style="width: 100%; height: 80px;" src="https://demo.xiaohuochai.site/js/eventHandler/e13.html" frameborder="0" width="320" height="240"></iframe>

**this**

&emsp;&emsp;与其他三个事件处理程序不同，IE事件处理程序的this指向window，而非被绑定事件的元素

<div>
<pre>&lt;!-- &lt;div&gt; --&gt;
&lt;div id="box" style="height:100px;width:300px;background-color:pink;"
onclick = "console.log(this)"&gt;&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;div id="box" style="height:100px;width:300px;background-color:pink;"&gt;&lt;/div&gt;
&lt;script&gt;
box.onclick= function(){
    console.log(this);//&lt;div&gt;
}
&lt;/script&gt;</pre>
</div>
<div>
<pre>&lt;div id="box" style="height:100px;width:300px;background-color:pink;"&gt;&lt;/div&gt;
&lt;script&gt;
box.addEventListener('click',function(){
    console.log(this);//&lt;div&gt;
});
&lt;/script&gt;</pre>
</div>
<div>
<pre>&lt;div id="box" style="height:100px;width:300px;background-color:pink;"&gt;&lt;/div&gt;
&lt;script&gt;
box.attachEvent('onclick',function(){
    console.log(this);//window
});
&lt;/script&gt;</pre>
</div>

**顺序**

&emsp;&emsp;使用attachEvent()方法添加的事件处理程序的触发顺序是有区别的。IE9、10浏览器是按正序执行的，而IE8-浏览器则是按倒序执行的

<div>
<pre>&lt;div id="box" style="height:30px;width:100px;background-color:pink;"&gt;&lt;/div&gt;
&lt;script&gt;
box.attachEvent('onclick',function(){
    box.innerHTML += '1';
});
box.attachEvent('onclick',function(){
    box.innerHTML += '2';
});
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/eventHandler/e14.html" frameborder="0" width="320" height="240"></iframe>

**移除**

&emsp;&emsp;使用attachEvent()添加的事件可以通过detachEvent()来移除，条件是必须提供相同的参数。与DOM方法一样，这也意味着添加的匿名函数将不能被移除。不过，只要能够将对相同函数的引用传给detachEvent()，就可以移除相应的事件处理程序

&emsp;&emsp;以下无效

<div>
<pre>&lt;div id="box" style="height:30px;width:200px;background-color:pink;"&gt;&lt;/div&gt;
&lt;script&gt;
box.attachEvent("onclick",function(){
    box.innerHTML += '1'
},false);
box.detachEvent('onclick',function(){
    box.innerHTML += '1'
},false);    
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;以下有效

<div>
<pre>&lt;div id="box" style="height:30px;width:200px;background-color:pink;"&gt;&lt;/div&gt;
&lt;script&gt;
var handle = function(){box.innerHTML += '1'};
box.attachEvent("onclick",handle,false);
box.detachEvent('onclick',handle,false);    
&lt;/script&gt;    </pre>
</div>

&nbsp;

### 总结

&emsp;&emsp;由于IE8-浏览器不支持addEventListener()方法，所以需要配合attachEvent()方法来实现全浏览器的事件绑定兼容写法。同时，由于attachEvent()方法中的this指向window，所以需要对this进行显式修改

<div>
<pre>function addEvent(target,type,handler){
    if(target.addEventListener){
        target.addEventListener(type,handler,false);
    }else{
        target.attachEvent('on'+type,function(event){
            return handler.call(target,event);
        });
    }
}</pre>
</div>

**调用顺序**

&emsp;&emsp;如果浏览器同时出现这四种事件处理程序，那么它们的调用顺序在各浏览器中表现并不一致　

<div>
<pre>&lt;div id="box" style="height:100px;width:100px;background:pink;" onclick = "this.innerHTML +='html\n'"&gt;&lt;/div&gt;
&lt;script&gt;
if(box.addEventListener){
    box.addEventListener('click',function(){this.innerHTML += 'DOM2级\n'})
}    
if(box.attachEvent){
    box.attachEvent('onclick',function(){box.innerHTML +='IE\n'})
}
box.onclick = function(){
    this.innerHTML += 'DOM0级\n';
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 80px;" src="https://demo.xiaohuochai.site/js/eventHandler/e15.html" frameborder="0" width="320" height="240"></iframe>

【相同点】

&emsp;&emsp;如果同时出现HTML事件处理程序和DOM0级事件处理程序，DOM0级会覆盖HTML事件处理程序

【不同点】

&emsp;&emsp;chrome/opera/safari等webkit内核的浏览器会按照事件处理程序出现的顺序来排列，所以结果为：DOM2级 DOM0级

&emsp;&emsp;firefox浏览器和IE浏览器会将DOM0级事件优先调用

&emsp;&emsp;所以firefox和IE11浏览器结果为：DOM0级 DOM2级

&emsp;&emsp;IE9、10浏览器结果为：DOM0级 DOM2级 IE

&emsp;&emsp;IE8-浏览器结果为：DOM0级 IE

