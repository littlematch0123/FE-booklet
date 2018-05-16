# 深入理解javascript描述元素内容的5个属性

<div>
<pre>&lt;p&gt;This is a &lt;i&gt;simple&lt;/i&gt; document&lt;/p&gt;</pre>
</div>

&emsp;&emsp;上面这行代码中，&lt;p&gt;元素的内容是什么呢？答案一：内容是HTML字符串"This is a &lt;i&gt;simple&lt;/i&gt; document"；答案二：内容是纯文本字符串"This is a simple document"；答案三：内容是一个Text文本节点、一个包含了Text文本子节点的Element元素节点和另外一个Text文本节点

&emsp;&emsp;三个答案都正确，不同的答案从不同的角度描述了元素内容。本文将详细介绍描述元素内容的5个属性

&nbsp;

### innerHTML

&emsp;&emsp;innerHTML属性可读可写。在读模式下，返回与调用元素的所有子节点(包括元素、注释和文本节点)对应的HTML标记；在写模式下，innerHTML会根据指定的值创建新的DOM树，然后用这个DOM树完全替换调用元素原先的所有子节点

&emsp;&emsp;注意：IE8-浏览器会将所有标签转换成大写形式，且不包含空白文本节点；而其他浏览器则原样返回

<div>
<pre>&lt;p id="test"&gt;This is a &lt;i&gt;simple&lt;/i&gt; document&lt;/p&gt;
&lt;script&gt;
console.log(test.innerHTML);//'This is a &lt;i&gt;simple&lt;/i&gt; document'
test.innerHTML = 123;
console.log(test.innerHTML);//'123'    
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;如果将innerHTML属性设为空，等于删除所有它包含的所有节点

<div>
<pre>&lt;p id="test"&gt;This is a &lt;i&gt;simple&lt;/i&gt; document&lt;/p&gt;
&lt;script&gt;
test.innerHTML = '';
console.log(test.childNodes.length);//0
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;注意：在IE9-浏览器中，不支持innerHTML的属性有:&lt;col&gt;、&lt;colgroup&gt;、&lt;frameset&gt;、&lt;head&gt;、&lt;html&gt;、&lt;style&gt;、&lt;table&gt;、&lt;tbody&gt;、&lt;thead&gt;、&lt;tfoot&gt;、&lt;tr&gt;。在IE8-浏览器中&lt;title&gt;元素也没有该属性

<div>
<pre>&lt;table id="test"&gt;&lt;/table&gt;
&lt;script&gt;
test.innerHTML = '1'
//在IE9-浏览器中报错，其他浏览器返回1
console.log(test.innerHTML);
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;无论什么时候，只要使用innerHTML从外部插入HTML，都应该首先以可靠的方式处理HTML。IE浏览器提供了window.toStaticHTML()方法，这个方法接收一个参数，即一个HTML字符串；返回一个经过无害处理后的版本&mdash;&mdash;从源HTML中删除所有脚本节点和事件处理程序属性

<div>
<pre>var text = "&lt;a href='#' onclick = 'alert(\"hi\");'&gt;Click Me&lt;/a&gt;";
var sanitized = window.toStaticHTML(text);
//只有IE支持
console.log(sanitized);//&lt;a href="#"&gt;Click Me&lt;/a&gt;</pre>
</div>

**效率**

&emsp;&emsp;在元素上设置innerHTML属性调用了Web浏览器的解析器，通常设置innerHTML效率非常髙，甚至在指定的值需要解析时效率也是相当不错

<div>
<pre>&lt;ul id="test1"&gt;&lt;/ul&gt;
&lt;ul id="test2"&gt;&lt;/ul&gt;
&lt;script&gt;
console.time("time");
for(var i = 0; i &lt; 10000;i++){
    var oLi = document.createElement('li');
    test1.appendChild(oLi);   
}
//15.842ms
console.timeEnd('time');
/****************************/
console.time("time");
var sHtml = '';
for(var i = 0; i &lt; 10000; i++){
    sHtml += '&lt;li&gt;&lt;/li&gt;';
}
test2.innerHTML = sHtml;
//5.373ms
console.timeEnd('time');
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;从上面可以看出，使用innerHTML比appendChild()的性能高出不少

&emsp;&emsp;注意：对innerHTML属性用&ldquo;+=&rdquo;操作符重复追加一小段文本通常效率低下，因为它既要序列化又要解析

<div>
<pre>&lt;ul id="test"&gt;&lt;/ul&gt;
&lt;script&gt;
console.time("time");
for(var i = 0; i &lt; 10000; i++){
    test.innerHTML += '&lt;li&gt;&lt;/li&gt;';
}
//time: 50416.330ms
console.timeEnd('time');
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;可以看出，对innerHTML属性使用'+='操作符的性能严重低下，所以一定不要这么使用

&nbsp;

### outerHTML

&emsp;&emsp;outerHTML同样可读可写，与innerHTML相比，它包含被查询元素的开始和结束标签。在读模式下outerHTML返回调用它的元素及所有子节点的HTML标签；在写模式下，outerHTML会根据指定的HTML字符串创建新的DOM子树，然后用这个DOM子树完全替换调用元素&nbsp;

&emsp;&emsp;注意：IE8-浏览器会将所有标签转换成大写形式，且不包含空白文本节点；而其他浏览器则原样返回

<div>
<pre>&lt;p id="test"&gt;This is a &lt;i&gt;simple&lt;/i&gt; document&lt;/p&gt;
&lt;script&gt;
console.log(test.outerHTML);//&lt;p id="test"&gt;This is a &lt;i&gt;simple&lt;/i&gt; document&lt;/p&gt;
test.outerHTML = '&lt;div id="test"&gt;&lt;/div&gt;';
console.log(test.outerHTML);//'&lt;div id="test"&gt;&lt;/div&gt;'
&lt;/script&gt;</pre>
</div>

&nbsp;

### innerText

&emsp;&emsp;innerText属性可以操作元素中包含的所有文本内容，包括子文档树中的文本。在通过innerText读取值时，它会按照由浅入深地顺序，将子文档树中的所有文本拼接起来。在通过innerText写入值时，结果会删除元素的所有子节点，插入包含相应文本值的文本节点

<div>
<pre>&lt;p id="test"&gt;This is a &lt;i&gt;simple&lt;/i&gt; document&lt;/p&gt;
&lt;script&gt;
console.log(test.innerText);//'This is a simple document'
test.innerText = '&lt;div id="test"&gt;&lt;/div&gt;';
console.log(test.innerText);//'&lt;div id="test"&gt;&lt;/div&gt;'
//即使在innerText中设置元素节点，最终也只是作为字符串内部的文本显示
console.log(test.childNodes[0].nodeType);//3
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;因此，设置innerText属性只会生成当前节点的一个子文本节点Text。因此，可以利用将innerText设置为等于innerText来去掉所有HTML标签

<div>
<pre>&lt;p id="test"&gt;This is a &lt;i&gt;simple&lt;/i&gt; document&lt;/p&gt;
&lt;script&gt;
console.log(test.innerHTML);//'This is a &lt;i&gt;simple&lt;/i&gt; document'
test.innerText = test.innerText;
console.log(test.innerHTML);//'This is a simple document'
&lt;/script&gt;</pre>
</div>

【兼容】

&emsp;&emsp;在早期的firefox浏览器中不支持innerText属性，有下列兼容代码

<div>
<pre>if(!'innerText' in document.body){
    HTMLElement.prototype.__defineGetter__('innerText',function(){
        return this.textContent;
    });
    HTMLElement.prototype.__defineSetter__('innerText',function(s){
        return this.textContent = s;
    });    
}</pre>
</div>

&nbsp;

### outerText

&emsp;&emsp;在读取文本值时，outerText与innerText的结果完全一样，但在写模式下，outerText不只是替换调用它的元素的子节点，而是会替换整个元素

<div>
<pre>&lt;p id="test"&gt;This is a &lt;i&gt;simple&lt;/i&gt; document&lt;/p&gt;
&lt;script&gt;
console.log(test.outerText);//'This is a simple document'
test.outerText = '123';
console.log(document.body.childNodes[0]);//'  123'
//报错，因为&lt;p&gt;元素已经被替换为'123'，不再存在了
console.log(test.outerText);
&lt;/script&gt;</pre>
</div>

&nbsp;

### textContent

&emsp;&emsp;textContent属性与innerText属性类似，该属性可读写。在读模式下，返回当前节点和它的所有后代节点的文本内容；在写模式下，结果会删除元素的所有子节点，插入包含相应文本值的文本节点

&emsp;&emsp;注意：IE8-浏览器不支持该属性

<div>
<pre>&lt;p id="test"&gt;This is a &lt;i&gt;simple&lt;/i&gt; document&lt;/p&gt;
&lt;script&gt;
console.log(test.textContent);//'This is a simple document'
test.textContent = '&lt;div id="test"&gt;&lt;/div&gt;';
console.log(test.textContent);//'&lt;div id="test"&gt;&lt;/div&gt;'
//即使在textContent中设置元素节点，最终也只是作为字符串内部的文本显示
console.log(test.childNodes[0].nodeType);//3
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;与innerText不同的是，textContent属性不仅属于元素节点ElementNode，而是属于所有节点Node

<div>
<pre>&lt;p id="test"&gt;This is a &lt;i&gt;simple&lt;/i&gt; document&lt;/p&gt;
&lt;script&gt;
var oText = test.childNodes[0];
console.log(oText.textContent);//'This is a '
console.log(oText.innerText);//undefined
&lt;/script&gt;</pre>
</div>

&nbsp;

## 最后

&emsp;&emsp;在firefox以前的版本中不支持innerText和outerText，但是随着firefox的更新换代，这两个属性也开始支持。所以，上面的5个属性的兼容问题都来源于IE8-浏览器。IE8-浏览器不支持textContent属性，IE8-浏览器在使用innerHTML和outerHTML属性时，会将所有标签转换成大写形式，且不包含空白文本节点

&emsp;&emsp;上面5个属性中，常用的是innerHTML、outerHTML和innerText这3个

![nodeContent](https://pic.xiaohuochai.site/blog/JS_DOM_node_nodeContent.jpg)

