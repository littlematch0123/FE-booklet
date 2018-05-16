# 深入理解DOM节点操作

&emsp;&emsp;一般地，提起操作会想到&ldquo;增删改查&rdquo;这四个字，而DOM节点操作也类似地对应于此，接下来将详细介绍DOM的节点操作方法

&nbsp;

### 前提

&emsp;&emsp;DOM提供节点操作的方法是因为DOM节点关系指针都是只读的

&emsp;&emsp;下列代码中想通过修改myUl的父级节点来修改其节点关系，但由于parentNode属性是只读的，所以修改无效，在IE8-浏览器下甚至会报错

<div>
<pre>&lt;div id="myDiv"&gt;&lt;/div&gt;
&lt;ul id="myUl"&gt;
    &lt;li id="myli"&gt;&lt;/li&gt;
&lt;/ul&gt;
&lt;script&gt;
console.log(myUl.parentNode);//&lt;body&gt;
myUl.parentNode = myDiv;
//标准浏览器下，依然返回&lt;body&gt;；而IE8-浏览器则会报错
console.log(myUl.parentNode);
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;DOM节点操作方法包括创建节点、插入节点、删除节点、替换节点、查看节点和复制节点。查看节点指的是查看节点之间的关系，在[节点关系部分](http://www.cnblogs.com/xiaohuochai/p/5785297.html)已经做过详细介绍，就不再赘述

&nbsp;

### 创建节点

**createElement()**

&emsp;&emsp;document.createElement()方法可以创建新元素。这个方法接受一个参数，即要创建元素的标签名，这个标签名在HTML文档中不区分大小写

<div>
<pre>var oDiv = document.createElement("div");
console.log(oDiv);//&lt;div&gt;</pre>
</div>

&emsp;&emsp;IE8-浏览器可以为这个方法传入完整的元素标签，也可以包含属性

<div>
<pre>var oDiv = document.createElement('&lt;div id="box"&gt;&lt;/div&gt;');
console.log(oDiv.id);//'box'</pre>
</div>

&emsp;&emsp;利用这种方法可以避开IE7-浏览器在动态创建元素的下列问题

&emsp;&emsp;1、不能设置动态创建的&lt;iframe&gt;元素的name特性

&emsp;&emsp;2、不能通过表单的reset()方法重设动态创建的&lt;input&gt;元素

&emsp;&emsp;3、动态创建的type特性值为"reset"的&lt;button&gt;元素重设不了表单

&emsp;&emsp;4、动态创建的一批name相同的单选按钮彼此毫无关系。name值相同的一组单选按钮本来应该用于表示同一选项的不同值，但动态创建的一批这种单选按钮之间却没有这种关系

<div>
<pre>var iframe = document.createElement("&lt;iframe name = 'myframe'&gt;&lt;/iframe&gt;");
var input = document.createElement("&lt;input type='checkbox'&gt;);
var button = document.createElement("&lt;button type = 'reset'&gt;&lt;/button&gt;");
var radio1 = document.createElement("&lt;input type='radio' name ='choice' value = '1'&gt;");
var radio2 = document.createElement("&lt;input type='radio' name ='choice' value = '2'&gt;");</pre>
</div>

&emsp;&emsp;所有节点都有一个ownerDocument的属性，指向表示整个文档的文档节点document；在使用createElement()方法创建新元素的同时，也为新元素设置了ownerDocument属性

<div>
<pre>&lt;div id="myDiv"&gt;&lt;/div&gt;
&lt;script&gt;
console.log(myDiv.ownerDocument);//document
var newDiv = document.createElement('div');
console.log(newDiv.ownerDocument);//document
console.log(newDiv.ownerDocument === myDiv.ownerDocument);//true
&lt;/script&gt;</pre>
</div>

&nbsp;

### 插入节点

**appendChild()**

&emsp;&emsp;appendChild()方法用于向childNodes列表的末尾添加一个节点，并返回新增节点。添加节点后，childNodes中的新增节点、父节点和以前的最后一个子节点的关系指针都会相应地得到更新

<div>
<pre>&lt;div id="box"&gt;&lt;/div&gt;
&lt;script&gt;
var oBox = document.getElementById('box');
var newNode = document.createElement('ul');
var returnedNode = oBox.appendChild(newNode);
console.log(returnedNode.nodeName);//UL
console.log(returnedNode == newNode);//true
console.log(returnedNode == oBox.lastChild);//true
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;如果插入的节点已经是文档的一部分了，那结果就是将该节点从原来的位置转移到新位置

<div>
<pre>&lt;body&gt;
&lt;div id="oldDiv"&gt;第一个div&lt;/div&gt;
&lt;div id="newDiv"&gt;第二个div&lt;/div&gt;
&lt;button id="btn"&gt;变换位置&lt;/button&gt;
&lt;script&gt;
btn.onclick = function(){
    document.body.appendChild(newDiv);
}    
&lt;/script&gt;
&lt;/body&gt;</pre>
</div>

<iframe style="width: 100%; height: 80px;" src="https://demo.xiaohuochai.site/js/nodeOperation/n1.html" frameborder="0" width="320" height="240"></iframe>

**insertBefore()**

&emsp;&emsp;insertBefore()方法接收两个参数：要插入的节点和作为参照的节点。插入节点后，被插入的节点会变成参照节点的前一个兄弟节点(previousSibling)，同时被方法返回。如果参照节点是null，则insertBefore()与appendChild()方法执行相同的操作。同样地，如果插入的节点已经是文档的一部分了，那结果就是将该节点从原来的位置转移到新位置

<div>
<pre>referenceNode.parentNode.insertBefore(newNode,referenceNode);</pre>
</div>
<div>
<pre>&lt;ul id="myUl" style="border:1px solid black;"&gt;
    &lt;li id="myLi"&gt;
        &lt;div id='oldDiv'&gt;oldDiv&lt;/div&gt;
    &lt;/li&gt;    
&lt;/ul&gt;
&lt;button id="btn1"&gt;插入oldDiv的前面&lt;/button&gt;
&lt;button id="btn2"&gt;插入myUl的前面&lt;/button&gt;
&lt;button id="btn3"&gt;插到oldDiv的里面&lt;/button&gt;
&lt;script&gt;
var oDiv = document.createElement('div');
oDiv.innerHTML = 'newDiv';
btn1.onclick = function(){
    console.log(myLi.insertBefore(oDiv,oldDiv));//&lt;div&gt;newDiv&lt;/div&gt;
}
btn2.onclick = function(){
    console.log(document.body.insertBefore(oDiv,myUl));//&lt;div&gt;newDiv&lt;/div&gt;
}
btn3.onclick = function(){
    console.log(oldDiv.insertBefore(oDiv,null));//&lt;div&gt;newDiv&lt;/div&gt;
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 110px;" src="https://demo.xiaohuochai.site/js/nodeOperation/n2.html" frameborder="0" width="320" height="240"></iframe>

【小效果】

<div>
<pre>&lt;ul class="list" id="list"&gt;
    &lt;li class="in"&gt;1&lt;/li&gt;
    &lt;li class="in"&gt;2&lt;/li&gt;
    &lt;li class="in"&gt;3&lt;/li&gt;
    &lt;li class="in"&gt;4&lt;/li&gt;
    &lt;li class="in"&gt;5&lt;/li&gt;
    &lt;li class="in"&gt;6&lt;/li&gt;        
&lt;/ul&gt;
&lt;script&gt;
var oList = document.getElementById('list');
//新增一个li元素
var oAdd = document.createElement('li');
//设置新增元素的css样式
oAdd.className = "in";
oAdd.style.cssText = 'background-color:red;border-radius:50%';
//添加到oList中
oList.insertBefore(oAdd,null);
var num = -1;
var max = oList.children.length;
function incrementNumber(){
    num++;
    //oList.getElementsByTagName('li')[max]相当于null，所以不报错
    oList.insertBefore(oAdd,oList.getElementsByTagName('li')[num]);    
    if(num == max){
        num = -1;
    }    
    if(num == 0){
        num = 1;
    }
    setTimeout(incrementNumber,1000);
}
setTimeout(incrementNumber,1000);
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 150px;" src="https://demo.xiaohuochai.site/js/nodeOperation/n3.html" frameborder="0" width="320" height="240"></iframe>

**insertAfter()**

&emsp;&emsp;由于不存在insertAfter()方法，如果要插在当前节点的某个子节点后面，可以用insertBefore()和appendChild()封装方法

<div>
<pre>function insertAfter(newElement,targetElement){
    var parent = targetElement.parentNode;
    if(parent.lastChild == targetElement){
        parent.appendChild(newElement);
    }else{
        parent.insertBefore(newElement,targetElement.nextSibling)
    }
}</pre>
</div>
<div>
<pre>&lt;div id='oldDiv'&gt;old&lt;/div&gt;
&lt;button id="btn"&gt;增加节点&lt;/button&gt;
&lt;script&gt;
function insertAfter(newElement,targetElement){
    var parent = targetElement.parentNode;
    if(parent.lastChild == targetElement){
       return parent.appendChild(newElement);
    }else{
       return parent.insertBefore(newElement,targetElement.nextSibling)
    }
}    
var newDiv = document.createElement('div');
newDiv.innerHTML = 'new';
btn.onclick = function(){
    insertAfter(newDiv,oldDiv);
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 80px;" src="https://demo.xiaohuochai.site/js/nodeOperation/n4.html" frameborder="0" width="320" height="240"></iframe>

**insertAdjacentHTML()**

&emsp;&emsp;insertAdjacentHTML()方法作为终级办法，相当于前面三个方法的综合。该方法接收两个参数：插入的位置和要插入的HTML文本

&emsp;&emsp;第一个参数必须是下列值之一，且这些值都必须是小写形式：

<div>
<pre>   "beforebegin"    　 在当前元素之前插入一个紧邻的同级元素
　　"afterbegin"    　　在当前元素之下插入一个新的子元素或在第一个子元素之前再插入新的子元素
　　"beforeend"        在当前元素之下插入一个新的子元素或在最后一个子元素之后再插入新的子元素
　　"afterend"         在当前元素之后插入一个紧邻的同级元素</pre>
</div>

&emsp;&emsp;第二个参数是一个HTML字符串，如果浏览器无法解析字符串，就会抛出错误

&emsp;&emsp;注意：该方法无返回值

![insertAdjacentHTML](https://pic.xiaohuochai.site/blog/JS_DOM_node_insertAdjacentHTML.jpg)

<div>
<pre>&lt;div id='target' style="border: 1px solid black;"&gt;This is the element content&lt;/div&gt;
&lt;button&gt;beforebegin&lt;/button&gt;
&lt;button&gt;afterbegin&lt;/button&gt;
&lt;button&gt;beforeend&lt;/button&gt;
&lt;button&gt;afterend&lt;/button&gt;
&lt;script&gt;
var btns = document.getElementsByTagName('button');
for(var i = 0 ; i &lt; 4; i++){
    btns[i].onclick = function(){
        var that = this;
        target.insertAdjacentHTML(that.innerHTML,'&lt;span id="test"&gt;测试&lt;/span&gt;')    
    }
}
&lt;/script&gt;    </pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/nodeOperation/n5.html" frameborder="0" width="320" height="240"></iframe>

### 移除节点

**removeChild()**

&emsp;&emsp;removeChild()方法接收一个参数，即要移除的节点，被移除的节点成为方法的返回值

<div>
<pre>&lt;div id="myDiv"&gt;等待移除的节点&lt;/div&gt;
&lt;button id="btn"&gt;移除节点&lt;/button&gt;
&lt;script&gt;
btn.onclick = function(){
    document.body.removeChild(myDiv);
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/js/nodeOperation/n6.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;下面代码可以移除当前节点的所有子节点

<div>
<pre>var element = document.getElementById("top");
while (element.firstChild) {
  element.removeChild(element.firstChild);
}</pre>
</div>

【小效果】

<div>
<pre>&lt;button id="btn"&gt;开始删除节点&lt;/button&gt;
&lt;ul class="list" id="list"&gt;
    &lt;li class="in"&gt;1&lt;/li&gt;
    &lt;li class="in"&gt;2&lt;/li&gt;
    &lt;li class="in"&gt;3&lt;/li&gt;
    &lt;li class="in"&gt;4&lt;/li&gt;
    &lt;li class="in"&gt;5&lt;/li&gt;
    &lt;li class="in"&gt;6&lt;/li&gt;        
&lt;/ul&gt;
&lt;script&gt;
var oList = document.getElementById('list');
function incrementNumber(){
    //获取oList中子元素的个数
    var len = oList.getElementsByTagName('li').length;
    //如果长度不为0
    if(len){
        //删除最后一个子元素
        oList.removeChild(oList.getElementsByTagName('li')[len-1]);
        //再次调用计时器
        setTimeout(incrementNumber,1000);    
    }
}
btn.onclick = function(){
    //1s后执行函数incrementNumber
    setTimeout(incrementNumber,1000);    
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/js/nodeOperation/n7.html" frameborder="0" width="320" height="240"></iframe>

**remove()**

&emsp;&emsp;相比于removeChild()，remove()方法不太常见，但是却非常简单。该方法不用调用其父节点，直接在当前节点使用remove()方法就可以删除该节点，无返回值

&emsp;&emsp;remove()方法常用于删除[元素节点](http://www.cnblogs.com/xiaohuochai/p/5819638.html)和[文本节点](http://www.cnblogs.com/xiaohuochai/p/5815193.html)，不可用于[特性节点](http://www.cnblogs.com/xiaohuochai/p/5820076.html)

&emsp;&emsp;注意：IE浏览器不支持该方法

<div>
<pre>&lt;div id="test" title='div'&gt;123&lt;/div&gt;
&lt;script&gt;
//文本节点
console.log(test.childNodes[0]);//'123'
test.childNodes[0].remove();
console.log(test.childNodes[0]);//undefined
//特性节点
console.log(test.attributes.title);//'div'
//报错，remove()方法无法用于删除特性节点
try{test.attributes[0].remove()}catch(e){
    console.log('error');
}
//元素节点
console.log(test);
test.remove();
&lt;/script&gt;</pre>
</div>

&nbsp;

### 替换节点

**replaceChild()**

&emsp;&emsp;replaceChild()接收的两个参数是要插入的节点和要替换的节点，要替换的节点将由这个方法返回并从文档树中移除，同时由要插入的节点占据其位置

<div>
<pre>oldChild.parentNode.replaceChild(newChild, oldChild);</pre>
</div>
<div>
<pre>&lt;div id="div1"&gt;1&lt;/div&gt;
&lt;div id="div2"&gt;2&lt;/div&gt;
&lt;div id="div3"&gt;3&lt;/div&gt;
&lt;button id="btn1"&gt;新增节点替换(4替换2)&lt;/button&gt;
&lt;button id="btn2"&gt;原有节点替换(3替换1)&lt;/button&gt;
&lt;script&gt;
btn2.onclick = function(){
    document.body.replaceChild(div3,div1);
}
btn1.onclick = function(){
    var div4 = document.createElement('div');
    div4.innerHTML = '4';
    document.body.replaceChild(div4,div2);
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/js/nodeOperation/n8.html" frameborder="0" width="320" height="240"></iframe>

【小效果】

<div>
<pre>&lt;button id="btn"&gt;开始替换节点&lt;/button&gt;
&lt;ul class="list" id="list"&gt;
    &lt;li class="in"&gt;1&lt;/li&gt;
    &lt;li class="in"&gt;2&lt;/li&gt;
    &lt;li class="in"&gt;3&lt;/li&gt;
    &lt;li class="in"&gt;4&lt;/li&gt;
    &lt;li class="in"&gt;5&lt;/li&gt;
    &lt;li class="in"&gt;6&lt;/li&gt;        
&lt;/ul&gt;
&lt;script&gt;
var oList = document.getElementById('list');
//新增一个li元素
var oAdd = document.createElement('li');
//设置新增元素的css样式
oAdd.className = "in";
oAdd.style.cssText = 'background-color:red;border-radius:50%';
btn.onclick = function(){
    //1s后oAdd替换第0个li
    setTimeout(function(){
        oList.replaceChild(oAdd,document.getElementsByTagName('li')[0]);
        //1s后执行incrementNumber函数
        setTimeout(incrementNumber,1000);    
    },1000);    
}
function incrementNumber(){
    //获取oList中第1个li
    var oLi1 = document.getElementsByTagName('li')[1];
    //若存在则进行替换处理
    if(oLi1){
         oList.replaceChild(oAdd,oLi1);
         setTimeout(incrementNumber,1000);        
    }
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/js/nodeOperation/n9.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 复制节点

**cloneNode()**

&emsp;&emsp;cloneNode方法用于克隆一个节点。它接受一个布尔值作为参数，表示是否执行深复制。在参数为true时，执行深复制，也就是复制节点及整个子节点树。在参数为false的情况下，执行浅复制，即复制节点本身。复制后返回的节点副本属于文档所有，但并没有为它指定父节点。若参数为空，也相当于false　

&emsp;&emsp;注意：cloneNode()方法不会复制添加到DOM节点中的javascript属性，例如事件处理程序等。这个方法只复制特性和子节点，其他一切都不会复制

<div>
<pre>&lt;ul id="list"&gt;
    &lt;li&gt;1&lt;/li&gt;
    &lt;li&gt;2&lt;/li&gt;
    &lt;li&gt;3&lt;/li&gt;
    &lt;li&gt;4&lt;/li&gt;
    &lt;li&gt;5&lt;/li&gt;
    &lt;li&gt;6&lt;/li&gt;        
&lt;/ul&gt;
&lt;script&gt;
var oList = document.getElementById('list');
oList.index = 0;
var deepList = oList.cloneNode(true);
//成功复制了子节点
console.log(deepList.children.length);//6
//但并没有复制属性
console.log(deepList.index);//undefined
var shallowList = oList.cloneNode();
//浅复制不复制子节点
console.log(shallowList.children.length);//0
&lt;/script&gt;</pre>
</div>
