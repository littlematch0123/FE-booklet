# 深入理解javascript中的富文本编辑

&emsp;&emsp;一说起富文本，人们第一印象就是像使用word一样，在网页上操作文档。实际上差不多就是这样。富文本编辑，又称为WYSIWYG (What You See Is What You Get所见即所得)，指在网页中编辑富文本内容。本文将详细介绍如何通过javascript实现富文本编辑

&nbsp;

### 方式

&emsp;&emsp;有两种编辑富文本的方式，一种是使用iframe元素，另一种是使用contenteditable属性

【1】iframe

&emsp;&emsp;在页面中嵌入一个包含空HTML页面的[iframe](http://www.cnblogs.com/xiaohuochai/p/5047343.html#anchor3)。通过设置designMode属性，这个空白的HTML页面可以被编辑，而编辑对象则是该页面&lt;body&gt;元素的HTML代码

&emsp;&emsp;designMode属性有两个可能的值："off"(默认值)和"on"。在设置为"on"时，整个文档都会变得可以编辑

&emsp;&emsp;只有在页面完全加载之后才能设置designMode属性。因此，在包含页面中，需要使用onload事件处理程序

&emsp;&emsp;注意：此方法必须在服务器端才能执行，否则会提示跨域安全提示

<div>
<pre>&lt;iframe name="wysiwyg" src="wysiwyg.html" style="height: 100px;width: 100px;"&gt;&lt;/iframe&gt;    
&lt;script&gt;
window.onload = function(){
    frames['wysiwyg'].document.designMode = 'on';
}
&lt;/script&gt;</pre>
</div>

【2】contenteditable

&emsp;&emsp;把contenteditable属性应用给页面中的任何元素，然后用户立即就可以编辑该元素

&emsp;&emsp;设置document.designMode='on'时，页面的任意位置都可以编辑；使用contenteditable='true'则只对具体元素和其包含的元素起作用

&emsp;&emsp;注意：一定要区分contenteditable和contentEditable。contenteditable是元素的特性，而contentEditable是对象的属性

<div>
<pre>&lt;div id="wysiwyg" style="height: 100px;width: 100px;border:1px solid black"&gt;&lt;/div&gt;
&lt;button id="btn1"&gt;打开富文本编辑&lt;/button&gt;
&lt;button id="btn2"&gt;关闭富文本编辑&lt;/button&gt;    
&lt;script&gt;
btn1.onclick = function(){wysiwyg.contentEditable = true;}
btn2.onclick = function(){wysiwyg.contentEditable = false;}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 150px;" src="https://demo.xiaohuochai.site/html/fuwenben/f1.html" frameborder="0" width="320" height="240"></iframe>

### 命令

&emsp;&emsp;与富文本编辑器交互的主要方式，就是使用document.execCommand()。这个方法可以对文档执行预定义的命令，而且可以应用大多数格式

&emsp;&emsp;document.execCommand(String aCommandName, Boolean aShowDefaultUI, String aValueArgument)方法需要传递3个参数

&emsp;&emsp;aCommandName表示要执行的命令名称，不可省略

&emsp;&emsp;aShowDefaultUI表示是否展示用户界面，默认为false，可省略

&emsp;&emsp;aValueArgument表示额外参数值，默认为null，可省略

&emsp;&emsp;注意：为了确保浏览器兼容性，第二个参数应始终设置为false，因为firefox在该参数为true时抛出错误

**段落格式**

<div>
<pre>居中        　　document.execCommand('justifyCenter');
左对齐     　　 document.execCommand('justifyLeft');
右对齐         document.execCommand('justifyRight');
添加缩进    　　document.execCommand('indent');
去掉缩进    　　document.execCommand('outdent');</pre>
</div>
<div>
<pre>&lt;div id="wysiwyg" style="height: 100px;width: 300px;border:1px solid black" contenteditable&gt;测试内容&lt;/div&gt;
&lt;button data-name="justifyCenter"&gt;居中&lt;/button&gt;
&lt;button data-name="justifyLeft"&gt;左对齐&lt;/button&gt;
&lt;button data-name="justifyRight"&gt;右对齐&lt;/button&gt;
&lt;button data-name="indent"&gt;添加缩进&lt;/button&gt;
&lt;button data-name="outdent"&gt;去掉缩进&lt;/button&gt;    
&lt;script&gt;
var btns = document.getElementsByTagName('button');
for(var i = 0; i &lt; btns.length; i++){
    btns[i].onclick = function(){
        document.execCommand(this.getAttribute('data-name'));
    }
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 150px;" src="https://demo.xiaohuochai.site/html/fuwenben/f2.html" frameborder="0" width="320" height="240"></iframe>

**文本格式**

<div>
<pre>字体类型    　　document.execCommand('fontname',false,sFontName)
字体大小    　　document.execCommand('fontsize',false,sFontSize)
字体颜色    　　document.execCommand('forecolor',false,sFontColor)
背景色         document.execCommand('backColor',false,sBackColor)
加粗        　 document.execCommand('bold');
斜体        　 document.execCommand('italic');
下划线         document.execCommand('underline');</pre>
</div>
<div>
<pre>&lt;div id="wysiwyg" style="height: 100px;width: 300px;border:1px solid black" contenteditable&gt;测试内容&lt;/div&gt;
&lt;button data-name="fontname" data-value="宋体"&gt;宋体&lt;/button&gt;
&lt;button data-name="fontsize" data-value="5"&gt;大字体&lt;/button&gt;
&lt;button data-name="forecolor" data-value="red"&gt;红色字体&lt;/button&gt;
&lt;button data-name="backColor" data-value="lightgreen"&gt;浅绿背景&lt;/button&gt;
&lt;button data-name="bold"&gt;加粗&lt;/button&gt;
&lt;button data-name="italic"&gt;斜体&lt;/button&gt;    
&lt;button data-name="underline"&gt;下划线&lt;/button&gt;        
&lt;script&gt;
var btns = document.getElementsByTagName('button');
for(var i = 0; i &lt; btns.length; i++){
    btns[i].onclick = function(){
        document.execCommand(this.getAttribute('data-name'),false,this.getAttribute('data-value'));
    }
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 150px;" src="https://demo.xiaohuochai.site/html/fuwenben/f3.html" frameborder="0" width="320" height="240"></iframe>

**编辑**

<div>
<pre>复制        　　document.execCommand('copy');
剪切        　　document.execCommand('cut');
粘贴        　　document.execCommand('paste');(经测试无效)
全选        　　document.execCommand('selectAll');    
删除        　　document.execCommand('delete');
后删除         document.execCommand('forwarddelete');
清空格式    　　document.execCommand('removeFormat');
前进一步    　　document.execCommand('redo');
后退一步    　　document.execCommand('undo');
打印       　　 document.execCommand('print');(对firefox无效)</pre>
</div>
<div>
<pre>&lt;div id="wysiwyg" style="height: 100px;width: 300px;border:1px solid black" contenteditable&gt;测试内容&lt;/div&gt;
&lt;button data-name="copy"&gt;复制&lt;/button&gt;
&lt;button data-name="cut"&gt;剪切&lt;/button&gt;    
&lt;button data-name="paste"&gt;粘贴&lt;/button&gt;    
&lt;button data-name="selectAll"&gt;全选&lt;/button&gt;
&lt;button data-name="delete"&gt;删除&lt;/button&gt;    
&lt;button data-name="forwarddelete"&gt;后删除&lt;/button&gt;    
&lt;button data-name="removeFormat"&gt;清空格式&lt;/button&gt;
&lt;button data-name="redo"&gt;前进一步&lt;/button&gt;    
&lt;button data-name="undo"&gt;后退一步&lt;/button&gt;
&lt;button data-name="print"&gt;打印&lt;/button&gt;    
&lt;script&gt;
var btns = document.getElementsByTagName('button');
for(var i = 0; i &lt; btns.length; i++){
    btns[i].onclick = function(){
        document.execCommand(this.getAttribute('data-name'));
    }
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 150px;" src="https://demo.xiaohuochai.site/html/fuwenben/f4.html" frameborder="0" width="320" height="240"></iframe>

**插入**

<div>
<pre>插入标签    　　 document.execCommand('formatblock',false,elementName);
插入&lt;hr&gt;    　　document.execCommand('inserthorizontalrule');
插入&lt;ol&gt;    　　document.execCommand('insertorderedlist');
插入&lt;ul&gt;    　　document.execCommand('insertunorderedlist');
插入&lt;p&gt;        document.execCommand('insertparagraph');
插入图像   　　 document.execCommand('insertimage',false,URL);
增加链接   　　 document.execCommand('createlink',false,URL);
删除链接   　　 document.execCommand('unlink');</pre>
</div>
<div>
<pre>&lt;div id="wysiwyg" style="height: 100px;width: 300px;border:1px solid black;overflow:auto" contenteditable&gt;测试内容&lt;/div&gt;
&lt;button data-name="formatblock" data-value="div"&gt;插入div&lt;/button&gt;
&lt;button data-name="inserthorizontalrule"&gt;插入hr&lt;/button&gt;    
&lt;button data-name="insertorderedlist"&gt;插入ol&lt;/button&gt;    
&lt;button data-name="insertunorderedlist"&gt;插入ul&lt;/button&gt;
&lt;button data-name="insertparagraph"&gt;插入p&lt;/button&gt;    
&lt;button data-name="insertimage" data-value="http://files.cnblogs.com/files/xiaohuochai/zan.gif"&gt;插入图像&lt;/button&gt;    
&lt;button data-name="createlink" data-value="www.cnblogs.com/xiaohuochai"&gt;增加链接&lt;/button&gt;
&lt;button data-name="unlink"&gt;删除链接&lt;/button&gt;    
&lt;script&gt;
var btns = document.getElementsByTagName('button');
for(var i = 0; i &lt; btns.length; i++){
    btns[i].onclick = function(){
        document.execCommand(this.getAttribute('data-name'),false,this.getAttribute('data-value'));
    }
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 150px;" src="https://demo.xiaohuochai.site/html/fuwenben/f5.html" frameborder="0" width="320" height="240"></iframe>

### 选区

【getSelection()】

&emsp;&emsp;在富文本编辑器中，使用getSelection()方法，可以确定实际选择的文本。这个方法是window对象和document对象的属性，调用它会返回一个表示当前选择文本的Selection对象。每个Selection对象都有下列属性

&emsp;&emsp;注意：IE8-浏览器不支持

<div>
<pre>anchorNode：选区起点所在的节点
anchorOffset：在到达选区起点位置之前跳过的anchorNode中的字符数量
focusNode：选区终点所在的节点
focusOffset：focusNode中包含在选区之内的字符数量
isCollapsed：布尔值，表示选区的起点和终点是否重合
rangeCount：选区中包含的DOM范围的数量</pre>
</div>

&emsp;&emsp;Selection对象的这些属性并没有包含多少有用的信息。好在，该对象的下列方法提供了更多信息，并且支持对选区的操作

<div>
<pre>addRange(range)：将指定的DOM范围添加到选区中
collapse(node,offset)：将选区折叠到指定节点中的相应的文本偏移位置
collapseToEnd()：将选区折叠到终点位置
collapseToStart()：将选区折叠到起点位置
containsNode(node)：确定指定的节点是否包含在选区中
deleteFromDocument()：从文档中删除选区中的文本，与document.execCommand("delete",false,null)命令的结果相同
extend(node,offset)：通过将focusNode和focusOffset移动到指定的值来扩展选区
getRangeAt(index)：返回索引对应的选区中的DOM范围
removeAllRanges()：从选区中移除所有DOM范围。实际上，这样会移除选区，因为选区中至少要有一个范围
reomveRange(range)：从选区中移除指定的DOM范围
selectAllChildren(node)：清除选区并选择指定节点的所有子节点
toString()：返回选区所包含的文本内容</pre>
</div>

&emsp;&emsp;Selection对象的这些方法都极为实用，它们利用了[DOM范围](http://www.cnblogs.com/xiaohuochai/p/6387710.html)来管理选区。由于可以直接操作选择文本的DOM表现，因此访问DOM范围与使用execCommand()相比，能够对富文本编辑器进行更加细化的控制。下面来看一个例子

<div>
<pre>var selection = document.getSelection();
//取得选择的文本
var selectionText = selection.toString();
//取得代表选区的范围
var range = selection.getRangeAt(0);
//突出显示选择的文本
var span = document.createElement("span");
span.style.backgroundColor = "yellow";
range.surroundContents(span);</pre>
</div>

&emsp;&emsp;以上代码会为富文本编辑器中被选择的文本添加黄色的背景。这里使用了默认选区中的DOM范围，通过surroundContents()方法将选区添加到了带有黄色背景的&lt;span&gt;元素中

&emsp;&emsp;HTML5将getSelection()方法纳入了标准，IE8-浏览器不支持DOM范围，但可以通过它支持的selection对象操作选择的文本。IE中的selection对象是document的属性，要取得富文本编辑器中选择的文本，首先必须创建一个文本范围，然后再像下面这样访问其text属性

<div>
<pre>var range = document.selection.createRange();
var selectedText = range.text;</pre>
</div>

&emsp;&emsp;虽然使用IE的文本范围来执行HTML操作并不像使用DOM范围那么可靠，但也不失为一种有效的途径。要像前面使用DOM范围那样实现相同的文本高亮效果，可以组合使用htmlText属性和pasteHTML()方法

<div>
<pre>var range = document.selection.createRange();
range.pasteHTML("&lt;span style=\"background-color:yellow\"&gt;" + range.htmlText+"&lt;/span&gt;");</pre>
</div>

&emsp;&emsp;以上代码通过htmlText取得了当前选区中的HTML，然后将其放在了一对&lt;span&gt;标签中，最后又使用pasteHTML()将结果重新插入到了选区中

&nbsp;

### 表单提交

&emsp;&emsp;因为富文本编辑不是使用表单控件实现的，因此富文本编辑器中的HTML不会被自动提交给服务器，而需要手工来提取并提交HTML。为此，通常可以添加一个隐藏的表单字段，让它的值等于从iframe或使用contenteditable属性的元素中提取出的HTML。具体来说，就是在提交表单之前提取出HTML，并将其插入到隐藏的字段中。下面就是通过表单的onsubmit事件处理程序实现上述操作的代码

<div>
<pre>form.onsubmit = function(e){
    e = e || event;
    var target = e.target || e.srcElement;
    target.elements["comments"].value = frames["richedit"].document.body.innerHTML;
}</pre>
</div>

&emsp;&emsp;在此，通过文档主体的innerHTML属性取得了iframe中的HTML，然后将其插入到了名为"comments"的表单字段中。这样可以确保恰好在提交表单之前填充"comments"字段。如果在代码中通过submit()来手工提交表单，那么一定不要忘记事先执行上面的操作。对于contenteditable元素，也可以执行类似操作

<div>
<pre>form.onsubmit = function(e){
    e = e || event;
    var target = e.target || e.srcElement;
    target.elements["comments"].value = document.getElementById('wysiwyg').innerHTML;
}</pre>
</div>

&nbsp;

## 最后

&emsp;&emsp;实现一个富文本编辑器，看似容易，但实际上是一个大工程

&emsp;&emsp;给大家推荐几款不错的在线富文本编辑器

&emsp;&emsp;[widgEditor](http://www.themaninblue.com/experiment/widgEditor/)

&emsp;&emsp;[wangeditor](http://www.wangeditor.com/)

&emsp;&emsp;[ueditor](http://ueditor.baidu.com/website/onlinedemo.html)

&emsp;&emsp;欢迎交流

