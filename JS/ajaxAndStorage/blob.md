# Blob

&emsp;&emsp;Blob是计算机界通用术语之一，全称写作：BLOB(binary large object)，表示二进制大对象。MySql/Oracle数据库中，就有一种Blob类型，专门存放二进制数据。在javascript中，Blob通常表示二进制数据，不过它们不一定非得是大量数据，Blob也可以表示一个小型文本文件的内容。本文将详细介绍Blob

&nbsp;

### 构造函数

**Blob(array[, options])**

&emsp;&emsp;Blob()构造函数返回一个新的Blob对象，blob的内容由参数数组中给出的值的串联组成

&emsp;&emsp;注意:IE9-浏览器不支持

&emsp;&emsp;参数array是一个由ArrayBuffer、ArrayBufferView、Blob、DOMString等对象构成的Array，或者其他类似对象的混合体，它将会被放进Blob

&emsp;&emsp;参数options是一个可选项，它可能会指定如下两种属性：

&emsp;&emsp;1、类型，默认值为""，它代表了将会被放入到blob中的数组内容的MIME类型

&emsp;&emsp;2、结束符，默认值为"transparent"，它代表包含行结束符\n的字符串如何被输出。它是以下两个值中的一个："native"，代表行结束符会被更改为适合宿主操作系统文件系统的惯例，或者"transparent"，代表会保持blob中保存的结束符不变

<div>
<pre>var aFileParts = ['&lt;a id="a"&gt;&lt;b id="b"&gt;hey!&lt;/b&gt;&lt;/a&gt;']; 
var oMyBlob = new Blob(aFileParts, {type : 'text/html'}); 
console.log(oMyBlob);//Blob {size: 32, type: "text/html"}</pre>
</div>

&nbsp;

### 属性和方法

&emsp;&emsp;Blob是不透明的，能对它们进行直接操作的就只有获取它们的大小(以字节为单位)、MIME类型以及将它们分割成更小的Blob

&emsp;&emsp;Blob.size(只读):返回Blob对象中所包含数据的大小(字节)

&emsp;&emsp;Blob.type(只读):一个字符串，表明该Blob对象所包含数据的MIME类型。如果类型未知，则该值为空字符串

<div>
<pre>var myBlob = new Blob([1,2,3],{type:'text/plain'});
console.log(myBlob);//Blob {size: 3, type: "text/plain"}
console.log(myBlob.size);//3
console.log(myBlob.type);//'text/plain'</pre>
</div>

**Blob.slice([start[, end[, contentType]]])**

&emsp;&emsp;slice()方法返回一个新的Blob对象，包含了源Blob对象中指定范围内的数据

<div>
<pre>var subblob = blob.slice(0,1024, "text/plain");//Blob中前1KB视为文本
var last = blob.slice(blob.size-1024, 1024);//Blob中最后1KB视为无类型</pre>
</div>

&emsp;&emsp;Web浏览器可以将Blob存储到内存中或者磁盘上，Blob可以表示非常大的数据块(比如视频文件)，如果事先不用slice()方法将它们分割成为小数据块的话，无法存储在主内存中。正是因为Blob可以表示非常大的数据块，并且它可能需要磁盘的访问权限，所以使用它们的API是异步的(在Worker线程中有提供相应的同步版本)

&nbsp;

### 文件作为Blob

&emsp;&emsp;在使用Blob之前，首先必须要获取Blob。其中一种方式就是把文件作为Blob

&emsp;&emsp;&lt;input type="file"&gt;元素最初是用于在HTML表单中实现文件上传的。浏览器总是很小心地实现该元素，目的是为了只允许上传用户显式选择的文件。脚本是无法将该元素的value属性设置成一个文件名的，这样它们就无法实现将用户电脑上任意的文件进行上传。现在，浏览器已经对该元素进行了扩展，允许客户端可以访问用户选择的文件了
&emsp;&emsp;注意:允许客户端脚本读取选择的文件内容不会引发安全问题，它和允许这些文件上传到服务器的安全级别是一样的

&emsp;&emsp;在支持本地文件访问的浏览器中，&lt;input type="file"&gt;元素上的files属性则是一个FileList对象。该对象是一个类数组对象，其元素要么是0，要么是用户选择的多个File对象。一个File对象就是一个Blob，除此之外，还多了name和lastModifiedDate属性

<div>
<pre>&lt;script&gt;
//输出选中的文件列表相关的信息
function fileinfo(files) {
    for(var i = 0; i &lt; files.length; i++) {//files是一个类数组对象
        var f = files[i];
        //a.txt 86 text/plain Mon Sep 19 2016 11:07:43 GMT+0800 (中国标准时间)
        console.log(f.name,    //只是名字：没有路径
                    f.size, f.type,    //size和type是Blob的属性
                    f.lastModifiedDate);    //修改时间
    }
}
&lt;/script&gt;
&lt;input type="file"  onchange="fileinfo(this.files)"/&gt; </pre>
</div>

&nbsp;

### 下载Blob

&emsp;&emsp;在实际Web应用中，Blob更多是图片二进制形式的上传与下载，虽然其可以实现几乎任意文件的二进制传输

&emsp;&emsp;第二种获取Blob的形式是通过XHR下载Blob

<div>
<pre>var xhr = new XMLHttpRequest();    //创建一个新的XHR对象 
xhr.open('GET','p5.gif');            //指定要获取内容的URL
xhr.responseType = 'blob';        //以Blob的形式
xhr.onload = function(){         //onload 比onreadystatechange更容易
    //Blob {size: 944, type: "image/gif"} 
    console.log(xhr.response);  //response返回的就是Blob对象    
}                                
xhr.send(null);                    //发送请求</pre>
</div>

&nbsp;

### Blob URL

&emsp;&emsp;前面介绍了如何获取或者创建Blob。下面来介绍如何对获取或者创建的Blob进行操作。其中最简单的就是可以创建一个URL来指向该Blob。随后，可以以一般的URL形式在任何地方使用该URL：在D0M中、在样式表中、甚至可以作为XMLHttpRequest的目标

【createObjectURL()】

&emsp;&emsp;使用createObjectURL()函数可以创建一个Blob URL。URL.createObjectURL()静态方法会创建一个DOMString，它的URL表示参数中的对象。这个URL的生命周期和创建它的窗口中的document绑定。这个新的URL对象表示着指定的File对象或者Blob对象

<div>
<pre>objectURL = URL.createObjectURL(blob);</pre>
</div>

&emsp;&emsp;传递一个Blob给createObjectURL()方法会返回一个URL(以普通字符串形式)。该URL以blob://开始，紧跟着是一小串文本字符串，该字符串用不透明的唯一标识符来标识Blob

<div>
<pre>var xhr = new XMLHttpRequest();     
xhr.open('GET','test/p5.gif');    
xhr.responseType = 'blob';    
xhr.onload = function(){ 
    //blob:http://127.0.0.1/539ae798-70db-44db-b216-fc932b358285
    console.log(URL.createObjectURL(xhr.response));
}    
xhr.send(null);</pre>
</div>

&emsp;&emsp;注意:blob://URL和data://URL是不同的，data://URL会对内容进行编码。blob://URL只是对浏览器存储在内存中或者磁盘上的Blob的一个简单引用

【file URL】

&emsp;&emsp;blob://URL和file://URL也是不同的，file://URL直接指向本地文件系统中的一个文件，仅暴露了文件的路径、浏览目录的许可等，除此之外任何内容都会带来安全问题的

&emsp;&emsp;Blob URL和创建它们的脚本拥有同样的源。这使得它们比file://URL更加灵活，由于file://URL是非同源的，因此要在Web应用中使用它们相对比较麻烦。Blob://URL只有在同源的文档中才是有效的。比如，如果将一个Blob URL通过postMessage()传递给一个非同源窗口，则该URL对于该窗口来说是没有任何意义的

&emsp;&emsp;Blob URL并不是永久有效的。一旦用户关闭了或者离开了包含创建Blob URL脚本的文 档，该Blob URL就失效了。比如，将Blob URL保存到本地存储器中，然后当用户开始一个新的Web应用会话的时再使用它，是不可能的

【URL.revokeObjectURL()】

&emsp;&emsp;URL.revokeObjectURL()静态方法用来释放一个之前通过调用URL.createObjectURL() 创建的已经存在的URL对象。当结束使用某个URL对象时，应该通过调用这个方法来让浏览器知道不再需要保持这个文件的引用了

<div>
<pre>window.URL.revokeObjectURL(objectURL);</pre>
</div>

&emsp;&emsp;参数objectURL是一个DOMString，表示通过调用URL.createObjectURL()方法产生的URL对象

&emsp;&emsp;之所以提供这样的方式，是因为这和内存管理问题有关。一旦使用之后，Blob就不再需要了，应当回收它。但是，如果Web浏览器正维护创建的Blob和Blob URL之间的映射关系，那么即使该Blob已经不用了，也不会被回收。javascript解释器无法跟踪字符串的使用情况，如果URL仍然是有效的，那么它只能认为该URL可能还在用。这就意味着，在手动撤销该URL之前，是不会将其回收的

