# 深入理解DOM节点类型第三篇——注释节点和文档类型节点

&emsp;&emsp;把注释节点和文档类型节点放在一起是因为IE8-浏览器的一个bug。IE8-浏览器将标签名为"!"的元素视作注释节点，所以文档声明也被视作注释节点。本文将详细介绍这两部分的内容

&nbsp;

### 注释节点

**【特征】**

&emsp;&emsp;注释在DOM中是通过Comment类型来表示，注释节点的三个node属性&mdash;&mdash;nodeType、nodeName、nodeValue分别是8、'#comment'和注释的内容，其父节点parentNode可能是Document或Element，注释节点没有子节点

<div>
<pre>&lt;body&gt;&lt;!-- 我是注释--&gt;
&lt;script&gt;
var oComment = document.body.firstChild;
//#comment 8 我是注释
console.log(oComment.nodeName,oComment.nodeType,oComment.nodeValue)
//&lt;body&gt; []
console.log(oComment.parentNode,oComment.childNodes)
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;注意：所有浏览器都识别不出位于&lt;/html&gt;后面的注释

<div>
<pre>&lt;!-- --&gt;
&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;script&gt;
console.log(document.childNodes.length);//3
console.log(document.firstChild,document.lastChild)//&lt;!-- --&gt; &lt;html&gt;
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;    
&lt;!-- --&gt;    </pre>
</div>

**【属性和方法】**

&emsp;&emsp;注释节点Comment与[文本节点Text](http://www.cnblogs.com/xiaohuochai/p/5815193.html)继承自相同的基类，因此它拥有除了splitText()之外的所有字符串操作方法。与Text类型相似，也可以通过nodeValue或data属性来取得注释的内容

**data**

&emsp;&emsp;注释节点的data属性与nodeValue属性相同

**length**

&emsp;&emsp;注释节点的length属性保存着节点字符的数目，而且nodeValue.length、data.length也保存着相同的值

<div>
<pre>&lt;body&gt;&lt;!--我是注释--&gt;
&lt;script&gt;
var oComment = document.body.firstChild;
//我是注释   我是注释  true
console.log(oComment.nodeValue,oComment.data,oComment.data == oComment.nodeValue);
//4 4 4
console.log(oComment.length,oComment.nodeValue.length,oComment.data.length);
&lt;/script&gt;
&lt;/body&gt;</pre>
</div>

**createComment()**

&emsp;&emsp;createComment()方法用于创建注释节点，这个方法接收一个参数&mdash;&mdash;要插入节点中的注释文本

<div>
<pre>var oComment = document.createComment('hello world!');
var oBase = document.body.firstChild;
document.body.insertBefore(oComment,oBase);
//&lt;!--hello world!--&gt;
console.log(document.body.firstChild);</pre>
</div>

**appendData()**

&emsp;&emsp;appendData(text)方法将text添加到节点的末尾

<div>
<pre>&lt;body&gt;&lt;!--我是注释--&gt;
&lt;script&gt;
var oComment = document.body.firstChild;
console.log(oComment.data);//我是注释
console.log(oComment.appendData('test'));//undefined
console.log(oComment.data);//我是注释test
&lt;/script&gt;
&lt;/body&gt;</pre>
</div>

**deleteData()**

&emsp;&emsp;deleteData(offset,count)方法从offset指定的位置开始删除count个字符

<div>
<pre>&lt;body&gt;&lt;!--我是注释--&gt;
&lt;script&gt;
var oComment = document.body.firstChild;
console.log(oComment.data);//我是注释
console.log(oComment.deleteData(0,1));//undefined
console.log(oComment.data);//是注释
&lt;/script&gt;
&lt;/body&gt;</pre>
</div>

**insertData()**

&emsp;&emsp;insertData(offset,text)方法在offset指定的位置插入text　

<div>
<pre>&lt;body&gt;&lt;!--我是注释--&gt;
&lt;script&gt;
var oComment = document.body.firstChild;
console.log(oComment.data);//我是注释
console.log(oComment.insertData(1,"test"));//undefined
console.log(oComment.data);//我test是注释
&lt;/script&gt;
&lt;/body&gt;</pre>
</div>

**replaceData()**

&emsp;&emsp;replaceData(offset,count,text)方法用text替换从offset指定的位置开始到offset+count处为止处的文本

<div>
<pre>&lt;body&gt;&lt;!--我是注释--&gt;
&lt;script&gt;
var oComment = document.body.firstChild;
console.log(oComment.data);//我是注释
console.log(oComment.replaceData(1,1,"test"));//undefined
console.log(oComment.data);//我test注释
&lt;/script&gt;
&lt;/body&gt;</pre>
</div>

**substringData()**

&emsp;&emsp;substringData(offset,count)方法提取从offset指定的位置开始到offset+count为止处的字符串

<div>
<pre>&lt;body&gt;&lt;!--我是注释--&gt;
&lt;script&gt;
var oComment = document.body.firstChild;
console.log(oComment.data);//我是注释
console.log(oComment.substringData(1,1));//是
console.log(oComment.data);//我是注释
&lt;/script&gt;
&lt;/body&gt;    </pre>
</div>

&nbsp;

### 文档类型节点

【特征】

&emsp;&emsp;文档类型节点DocumentType的三个node属性&mdash;&mdash;nodeType、nodeName、nodeValue分别是10、doctype的名称和null，其父节点parentNode是Document，文档类型节点没有子节点

&emsp;&emsp;文档类型节点有一个快捷写法是document.doctype，但是该写法IE8-浏览器不支持

<div>
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;script&gt;
//IE8-浏览器不支持document.doctype
var oDoctype = document.doctype;
if(oDoctype){
    // html 10 null
    console.log(oDoctype.nodeName,oDoctype.nodeType,oDoctype.nodeValue);
    //#document []
    console.log(oDoctype.parentNode,oDoctype.childNodes)
}
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;  </pre>
</div>

【属性】

&emsp;&emsp;文档类型节点DocumentType对象有3个属性:name、entities、notations

**name**

&emsp;&emsp;name表示文档类型的名称，与nodeName的属性相同

**entities**

&emsp;&emsp;entities表示由文档类型描述的实体的NamedNodeMap对象

**notations**

&emsp;&emsp;notations表示由文档类型描述的符号的NamedNodeMap对象

&emsp;&emsp;通常浏览器中的文档使用的都是HTML或XHTML文档类型，因而entites和notations都是空列表(列表中的项来自行内文档类型声明)

<div>
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;script&gt;
//IE8-浏览器不支持document.doctype
var oDoctype = document.doctype;
if(oDoctype){
    console.log(oDoctype.name,oDoctype.name=== oDoctype.nodeName);//html true
    console.log(oDoctype.entities,oDoctype.notations);//undefined undefined
}
&lt;/script&gt;
&lt;/body&gt; 
&lt;/html&gt;</pre>
</div>

【IE8-Bug】

&emsp;&emsp;IE8-浏览器将标签名为"!"的元素视作注释节点，所以文档声明也被视作注释节点

<div>
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;script&gt;
var oDoctype = document.firstChild;
//IE8-浏览器返回8，其他浏览器返回10
console.log(oDoctype.nodeType);
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
</div>
