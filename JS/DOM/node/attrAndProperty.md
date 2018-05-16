# 区分元素特性attribute和对象属性property

&emsp;&emsp;其实attribute和property两个单词，翻译出来都是属性，但是《javascript高级程序设计》将它们翻译为特性和属性，以示区分。本文将详细介绍特性和属性的不同之处

&nbsp;

### 定义

&emsp;&emsp;元素特性attribute是指HTML元素标签的特性

&emsp;&emsp;下面的id、class、title、a都是特性，其中a叫做自定义特性

<div>
<pre>&lt;div id="id1" class="class1" title="title1" a='a1'&gt;&lt;/div&gt;</pre>
</div>

&emsp;&emsp;对象属性property是指元素节点的属性

&emsp;&emsp;下面的id、title、b都是属性，其中b叫做自定义属性

<div>
<pre>&lt;div id="test"&gt;&lt;/div&gt;
&lt;script&gt;
test.id = 'id2';
test.title = 'title2';
test.b = 'b2';
&lt;/script&gt;</pre>
</div>

&nbsp;

### 共有

&emsp;&emsp;id、title等既是属性，也是特性。修改属性，其对应的特性会发生改变；修改特性，属性也会改变

&emsp;&emsp;【1】修改元素特性(以title为例)

<div>
<pre>&lt;div id="test" title='123'&gt;测试内容&lt;/div&gt;
&lt;script&gt;
console.log(test.title);//123
document.onclick = function(){
    test.setAttribute('title','456');
    console.log(test.title);//456    
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/attrAndPro/a1.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;【2】修改对象属性

<div>
<pre>&lt;div id="test" title='123'&gt;测试内容&lt;/div&gt;
&lt;script&gt;
console.log(test.getAttribute('title'));//123
document.onclick = function(){
    test.title = '456';
    console.log(test.getAttribute('title'));//456    
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/js/attrAndPro/a2.html" frameborder="0" width="320" height="240"></iframe>

### 例外

&emsp;&emsp;class和for这两个元素特性是例外，因为class和for是[保留字](http://www.cnblogs.com/xiaohuochai/p/5543930.html#anchor4)，无法直接在对象属性中使用。所以在对象属性中，class变成了className，而for变成了htmlFor

&emsp;&emsp;【1】class

<div>
<pre>&lt;div id="test" class="class1"&gt;测试内容&lt;/div&gt;
&lt;script&gt;
console.log(test.getAttribute('class'));//'class1'
console.log(test.className);//'class1'
console.log(test.class);//undefined
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;【2】for

<div>
<pre>&lt;label id="test" for="input"&gt;&lt;/label&gt;
&lt;script&gt;
console.log(test.getAttribute('for'));//'input'
console.log(test.htmlFor);//'input'
console.log(test.for);//undefined
&lt;/script&gt;</pre>
</div>

&nbsp;

### 特殊

&emsp;&emsp;style和onclick是两个特殊的特性，它们虽然有对应的属性名，但属性值与通过getAttribute()返回的值并不相同

&emsp;&emsp;【1】style

&emsp;&emsp;通过getAttribute()访问时，返回的style特性值中包含的是CSS文本，而通过属性来访问它则会返回一个CSSStyleDeclaration对象

<div>
<pre>&lt;div id="test" style="height: 100px;width: 100px;"&gt;&lt;/div&gt;
&lt;script&gt;
console.log(test.getAttribute('style'));//'height: 100px;width: 100px;'
//{0: "height", 1: "width", alignContent: "", alignItems: "", alignSelf: ""&hellip;}
console.log(test.style);
console.log(typeof test.style);//'object'
console.log(test.style.height);//'100px'
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;【2】onclick

&emsp;&emsp;如果通过getAttribute()访问，会返回相应代码的字符串。而访问onclick属性时，会返回一个javascript函数

&emsp;&emsp;注意：其他事件处理程序也类似

<div>
<pre>&lt;div id="test" onclick = "alert(1)"&gt;测试内容&lt;/div&gt;
&lt;script&gt;    
console.log(test.getAttribute('onclick'));//'alert(1)'
console.log(test.onclick);//'function onclick(event) {alert(1)}'
console.log(typeof test.onclick);//'function'
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;注意：如果通过对象属性设置onclick属性，则不会有对应的元素特性

<div>
<pre>&lt;div id="test"&gt;测试内容&lt;/div&gt;
&lt;script&gt;
test.onclick = function(){
    alert(1);
}    
console.log(test.getAttribute('onclick'));//null
console.log(test.onclick);//'function onclick(event) {alert(1)}'
console.log(typeof test.onclick);//'function'
&lt;/script&gt;</pre>
</div>

&nbsp;

### 自定义

&emsp;&emsp;【1】自定义特性

&emsp;&emsp;自定义特性用来在HTML元素上绑定一些额外的信息。但是自定义特性无法在对象属性中有所体现

<div>
<pre>&lt;div id="test" index='1'&gt;&lt;/div&gt;
&lt;script&gt;
console.log(test.getAttribute('index'));//'1'
console.log(test.index);//undefined    
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;HTML5新增了数据集属性dataset(规范的自定义特性)，用于存储页面或应用程序的私有定制数据。数据集属性以'data-'为前缀，可以使用javascript中对象属性dataset访问data-*的值

&emsp;&emsp;由于元素特性的值以'-'做间隔，在对象属性中将转换为首字母大写的形式

<div>
<pre>data-index-one -&gt; dataset.indexOne</pre>
</div>

&emsp;&emsp;所以，元素特性的值一定不要出现大写，否则对象属性会解释出错

&emsp;&emsp;注意：IE10-浏览器不支持dataset

<div>
<pre>&lt;div id="test" data-index-one="1"&gt;&lt;/div&gt;
&lt;script&gt;
console.log(test.getAttribute('data-index-one'));//'1'
console.log(test['data-index-one']);//undefined
console.log(test.dataset.indexOne);//'1'
&lt;/script&gt;</pre>
</div>

【兼容代码】

<div>
<pre>function getDataSet(element){
    if(element.dataset){
        return element.dataset;
    }
    var attrs= element.attributes;
    var len = attrs.length;
    var data = {};
    for(var i=0;i&lt;len;i++){
        var sName = attrs[i].name;
        var sValue = attrs[i].value;
        if(sName.substring(0,5)==="data-"){
            var tempName = sName.slice(5).replace(/-([A-Za-z])/g,function(item,item1){
                return item1.toUpperCase();
            });
            data[tempName] = sValue;
        }   
    }
    return data;
}
var dataset = getDataSet(box);</pre>
</div>

&emsp;&emsp;【2】自定义属性

&emsp;&emsp;自定义属性在javascript中非常常用，是一种常用的编程技术。但元素特性上并不会有所体现

<div>
<pre>&lt;div id="test"&gt;&lt;/div&gt;
&lt;script&gt;
test.index = 1;
console.log(test.index);//1
console.log(test.getAttribute('index'));//null
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;注意：可以使用数据集属性的逆向操作来实现自定义属性向元素特性的对应&nbsp;

<div>
<pre>&lt;div id="test"&gt;&lt;/div&gt;
&lt;script&gt;
test.dataset.index = 1;
console.log(test.getAttribute('data-index'));//1
&lt;/script&gt;</pre>
</div>

&nbsp;

### 混淆

&emsp;&emsp;IE7-浏览器下会混淆元素特性attribute和对象属性property。在下列情况下，IE7-浏览器通过getAttribute()返回的值与对象属性相同

&emsp;&emsp;【1】class

&emsp;&emsp;设置对象属性className，在IE7-浏览器下，访问元素特性时，参数也设置为className才有效

&emsp;&emsp;注意：for也有类似效果，不再赘述

<div>
<pre>&lt;div id="test"&gt;&lt;/div&gt;
&lt;script&gt;
test.className = 'class1';
//IE7-浏览器返回'class1'，其他浏览器返回null
console.log(test.getAttribute('className'));

//IE7-浏览器返回null，其他浏览器返回'class1'
console.log(test.getAttribute('class'));
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;【2】style

&emsp;&emsp;IE7-浏览器通过getAttribute()方法返回的元素特性与对象属性一样，都是CSSStyleDeclaration对象

&emsp;&emsp;注意：click等事件处理程序也有类似效果，不再赘述

<div>
<pre>&lt;div id="test" style="width: 100px;"&gt;&lt;/div&gt;
&lt;script&gt;
//IE7-浏览器下，返回CSSStyleDeclaration对象；其他浏览器返回'width: 100px;'
console.log(test.getAttribute('style'));
//IE7-浏览器下，返回true；其他浏览器返回false
console.log(test.getAttribute('style') === test.style);
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;【3】自定义

&emsp;&emsp;在IE8-浏览器下，自定义特性会自动对应为对象属性，自定义属性也会自动对应为元素特性

<div>
<pre>&lt;div id="test" a='a1'&gt;&lt;/div&gt;
&lt;script&gt;
test.b = 'b1';
//IE7-浏览器返回'a1'，其他浏览器返回undefined
console.log(test.a);
//IE7-浏览器返回'b1'，其他浏览器返回null
console.log(test.getAttribute('b'));
&lt;/script&gt;</pre>
</div>

&nbsp;

### 总结

&emsp;&emsp;对象节点对于HTML标签元素说来，是元素DOM化的结果。与此相对应，对象属性也是元素特性的DOM化结果

&emsp;&emsp;由于javascript中保留字的限制，存在class和for这两种例外情况

&emsp;&emsp;与普通的元素特性不同，通过style实现的脚本化CSS机制和通过onclick等实现的事件处理机制是DOM的两大功能，它们被DOM实现为对象，而不仅仅是普通的字符串

&emsp;&emsp;自定义特性和自定义属性非常有用，但却没有对应关系。HTML5新增的数据集属性dataset建立了两者的联系

&emsp;&emsp;最后，IE7-浏览器对元素特性和对象属性有所混淆。如果网站仍然需要兼容IE7-浏览器，就要非常小心

&emsp;&emsp;欢迎交流

