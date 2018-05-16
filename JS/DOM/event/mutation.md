# 深入理解DOM事件类型系列第三篇——变动事件

&emsp;&emsp;变动(mutation)事件能在DOM中的某一部分发生变化时给出提示，这类事件非常有用，但都只能使用DOM2级事件处理程序，且由于浏览器兼容性不好，所以用的不广泛

&nbsp;

### 删除节点

&emsp;&emsp;删除节点时，涉及到DOMNodeRemoved、DOMNodeRemovedFromDocument和DOMSubtreeModified这三个事件，下面将详细介绍

**DOMNodeRemoved**

&emsp;&emsp;在使用removeChild()或replacechild()从DOM中删除节点时，会触发DOMNodeRemoved事件。而event.relatedNode属性中包含着对目标节点父节点的引用。在这个事件触发时，节点尚未从其父节点删除，因此其parentNode属性仍然指向父节点。该事件会冒泡

&emsp;&emsp;注意：IE8-浏览器不支持

<div>
<pre>&lt;div id="box" style="height: 30px;width: 100px;"&gt;
    &lt;div id="inBox"&gt;1&lt;/div&gt;
&lt;/div&gt;
&lt;button id="btn"&gt;删除子节点&lt;/button&gt;
&lt;script&gt;
inBox.addEventListener('DOMNodeRemoved',function(e){
    e = e || event;
    e.relatedNode.style.background = 'lightblue';
});
btn.onclick = function(){
    box.removeChild(inBox);
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 80px;" src="https://demo.xiaohuochai.site/js/mutation/m1.html" frameborder="0" width="320" height="240"></iframe>

**DOMNodeRemovedFromDocument**

&emsp;&emsp;如果被移除的节点包含子节点，那么在其所有子节点以及这个被移除的节点上会相继触发DOMNodeRemovedFromDocument事件，这个事件不会冒泡，目标target指向被移除的节点

&emsp;&emsp;注意：该事件只有chrome/safari/opera浏览器支持

<div>
<pre>&lt;div id="box" style="height: 30px;width: 100px;"&gt;
    &lt;div id="inBox"&gt;1&lt;/div&gt;
&lt;/div&gt;
&lt;button id="btn"&gt;删除子节点&lt;/button&gt;
&lt;script&gt;
inBox.addEventListener('DOMNodeRemovedFromDocument',function(e){
    e = e || event;
    console.log(e.target.innerHTML)//1
});
btn.onclick = function(){
    box.removeChild(inBox);
}
&lt;/script&gt;</pre>
</div>

**DOMSubtreeModified**

&emsp;&emsp;在DOM结构中发生任何变化时都会触发DOMSubtreeModified事件，该事件在其他任何事件触发后都会触发

&emsp;&emsp;该事件的目标是被移除节点的父节点

&emsp;&emsp;注意：IE8-浏览器不支持

<div>
<pre>&lt;div id="box" style="height: 30px;width: 100px;"&gt;
    &lt;div id="inBox"&gt;1&lt;/div&gt;
&lt;/div&gt;
&lt;button id="btn"&gt;删除子节点&lt;/button&gt;
&lt;script&gt;
box.addEventListener('DOMSubtreeModified',function(e){
    e = e || event;
    console.log(e.type)//DOMSubtreeModified
});
btn.onclick = function(){
    box.removeChild(inBox);
}
&lt;/script&gt;</pre>
</div>

**顺序**

&emsp;&emsp;删除节点时，事件触发的先后顺序是DOMNodeRemoved事件、DOMNodeRemovedFromDocument事件和DOMSubtreeModified事件

<div>
<pre>&lt;div id="box" style="height: 30px;width: 100px;"&gt;
    &lt;div id="inBox"&gt;1&lt;/div&gt;
&lt;/div&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;button id="btn"&gt;删除子节点&lt;/button&gt;
&lt;script&gt;
inBox.addEventListener('DOMNodeRemoved',handler);
box.addEventListener('DOMSubtreeModified',handler);
inBox.addEventListener('DOMNodeRemovedFromDocument',handler);
function handler(e){
    e = e || event;
    result.innerHTML += e.type + ';';
}
btn.onclick = function(){
    box.removeChild(inBox);
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 90px;" src="https://demo.xiaohuochai.site/js/mutation/m2.html" frameborder="0" width="320" height="240"></iframe>

### 插入节点

&emsp;&emsp;插入节点时涉及到DOMNodeInserted事件、DOMNodeInsertedIntoDocument事件及DOMSubtreeModified事件，下面将详细介绍

**DOMNodeInserted**

&emsp;&emsp;在使用appendChild()、replaceChild()或insertBefore()向DOM中插入节点时，首先触发DOMNodeInserted事件

&emsp;&emsp;这个事件的目标是被插入的节点，而event.relatedNode属性中包含一个对父节点的引用

&emsp;&emsp;在这个事件触发时，节点已经被插入到了新的父节点中。这个事件是冒泡的，因此可以在DOM的各个层次上处理它

&emsp;&emsp;注意：IE8-浏览器不支持

<div>
<pre>&lt;div id="box" style="height: 30px;width: 100px;"&gt;
&lt;/div&gt;
&lt;button id="btn"&gt;插入节点&lt;/button&gt;
&lt;script&gt;
box.addEventListener('DOMNodeInserted',function(e){
    e = e || event;
    e.relatedNode.style.background = 'lightblue';
});
btn.onclick = function(){
    document.body.appendChild(box);
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 80px;" src="https://demo.xiaohuochai.site/js/mutation/m3.html" frameborder="0" width="320" height="240"></iframe>

**DOMNodeInsertedIntoDocument**

&emsp;&emsp;在新插入的节点上面会触发DOMNodeInsertedIntoDocument事件。这个事件不冒泡，因此必须在插入节点之前为它添加这个事件处理程序。这个事件的目标是被插入的节点

&emsp;&emsp;注意：该事件只有chrome/safari/opera浏览器支持

<div>
<pre>&lt;div id="box" style="height: 30px;width: 100px;"&gt;
&lt;/div&gt;
&lt;button id="btn"&gt;插入节点&lt;/button&gt;
&lt;script&gt;
box.addEventListener('DOMNodeInsertedIntoDocument',function(e){
    e = e || event;
    box.style.background = 'lightblue';
});
btn.onclick = function(){
    document.body.appendChild(box);
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 80px;" src="https://demo.xiaohuochai.site/js/mutation/m4.html" frameborder="0" width="320" height="240"></iframe>

**顺序**

&emsp;&emsp;插入节点时，事件触发的先后顺序是DOMNodeInserted事件、DOMNodeInsertedIntoDocument事件和DOMSubtreeModified事件　

<div>
<pre>&lt;div id="box" style="height: 30px;width: 100px;"&gt;
&lt;/div&gt;
&lt;div id="outer"&gt;&lt;/div&gt;
&lt;div id="result"&gt;&lt;/div&gt;
&lt;button id="btn"&gt;插入子节点&lt;/button&gt;
&lt;script&gt;
box.addEventListener('DOMNodeInserted',handler);
outer.addEventListener('DOMSubtreeModified',handler);
box.addEventListener('DOMNodeInsertedIntoDocument',handler);
function handler(e){
    e = e || event;
    result.innerHTML += e.type + ';';
}
btn.onclick = function(){
    outer.appendChild(box);
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 90px;" src="https://demo.xiaohuochai.site/js/mutation/m5.html" frameborder="0" width="320" height="240"></iframe>

### 特性节点

**DOMAttrmodified**

&emsp;&emsp;当特性被修改后，DOMAttrmodified事件被触发

&emsp;&emsp;注意：该事件只有firefox和IE8+浏览器支持

<div>
<pre>&lt;div id="box" title="123" style="height: 30px;width: 100px;"&gt;&lt;/div&gt;
&lt;button id="btn"&gt;修改特性&lt;/button&gt;
&lt;script&gt;
box.addEventListener('DOMAttrModified',handler);
function handler(e){
    e = e || event;
    box.innerHTML = e.type;
}
btn.onclick = function(){
    box.setAttribute('title','abc');
}
&lt;/script&gt;</pre>
</div>

&nbsp;

### 文本节点

**DOMCharacterDataModified**

&emsp;&emsp;当文本节点的值发生变化时，触发DOMCharacterDataModified事件

&emsp;&emsp;注意：该方法只有chrome/safari/opera浏览器支持

<div>
<pre>&lt;div id="box"  style="height: 30px;width: 100px;"&gt;abc&lt;/div&gt;
&lt;button id="btn"&gt;修改文本&lt;/button&gt;
&lt;script&gt;
box.addEventListener('DOMCharacterDataModified',handler);
function handler(e){
    e = e || event;
    console.log(e)
    box.style.background = 'pink';
}
btn.onclick = function(){
    box.innerHTML = '123';
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 80px;" src="https://demo.xiaohuochai.site/js/mutation/m6.html" frameborder="0" width="320" height="240"></iframe>

## 最后

&emsp;&emsp;上面7个变动事件，浏览器兼容性都不是太好。唯三过得去就是DOMNodeInserted、DOMNodeRemoved和DOMSubtreeModified这三个事件，不兼容IE8-浏览器

