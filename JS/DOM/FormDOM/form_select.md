# 深入理解表单脚本系列第三篇——选择文本

&emsp;&emsp;表单是最早用来与用户交互的工具，具有丰富的控件和属性。基本上，它们通过各种控件和属性就可以解决大部分问题。但还有一些问题还是需要表单脚本来实现的，比如本文将要说到的选择文本

&nbsp;

### select()

&emsp;&emsp;select()方法用于选择文本框(指type为text的input元素和textarea元素)中的所有文本，该方法不接受参数，且无返回值

<div>
<pre>&lt;input id="text" value="123"&gt;
&lt;button id="btn"&gt;选择文本&lt;/button&gt;
&lt;script&gt;
btn.onclick = function(){
    text.select();
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/html/formobj/f8.html" frameborder="0" width="320" height="240"></iframe>

### select事件

&emsp;&emsp;与select()方法对应的，是一个select事件。在选择了文本框中的文本时，就会触发select事件

&emsp;&emsp;不过关于什么时间触发select事件有分歧。IE8-浏览器中，只要用鼠标选择了一个字符，未释放鼠标前，就可以触发select事件；而其他浏览器中，要释放鼠标才会触发

<div>
<pre>&lt;input id="text" value="123"&gt;
&lt;script&gt;
text.onselect = function(){
    this.style.backgroundColor = 'pink';
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/html/formobj/f9.html" frameborder="0" width="320" height="240"></iframe>

### 取得选择文本

&emsp;&emsp;虽然通过select事件可以知道用户什么时候选择了文本，但仍然不知道用户选择了什么文本。HTML5通过一些扩展方案解决了这个问题，以便更顺利地取得选择的文本。该规范采取的办法是添加两个属性：selectionStart和selectionEnd。这两个属性中保存的是基于0的数值，表示所选择文本的范围(即文本选区开头和结尾的偏移量)

<div>
<pre>function getSelectedText(textbox){
    return textbox.value.substring(textbox.selectionStart,textbox.selectionEnd);
}</pre>
</div>

&emsp;&emsp;因为substring()方法基于字符串的偏移量执行操作，所以将selectionStart和selectionEnd直接传给它就可以取得选中的文本

&emsp;&emsp;注意：IE8-浏览器不支持

&emsp;&emsp;IE8-浏览器有一个document.selection对象，其中保存着用户在整个文档范围内选择的文本信息；也就是说，无法确定用户选择的是页面中哪个部位的文本。不过，在与select事件一起使用的时候，可以假定是用户选择了文本框中的文本，因而触发了该事件。要取得选择的文本，首先必须创建一个范围，然后再将文本从其中提取出来

<div>
<pre>function getSelectedText(textbox){
    if (typeof textbox.selectionStart == "number"){
        return textbox.value.substring(textbox.selectionStart,textbox.selectionEnd);
    }else if(document.selection){
        return document.selection.createRange().text;
    }
}</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/html/formobj/f10.html" frameborder="0" width="320" height="240"></iframe>

### setSelectionRange()

&emsp;&emsp;setSelectionRange()方法用于选择文本框中的部分文本，这个方法接收两个参数：要选择的第一个字符的索引和要选择的最后一个字符之后的字符的索引(类似于[substring()](http://www.cnblogs.com/xiaohuochai/p/5612962.html#anchor5)方法的两个参数)

&emsp;&emsp;firefox浏览器使用该方法，可以选择文本，但却没有获取焦点；而其他浏览器使用该方法可以自动获取焦点

&emsp;&emsp;注意：IE8-浏览器不支持

<div>
<pre>&lt;input id="text" value="1234567890"&gt;
&lt;button id="btn"&gt;选择前3个字符&lt;/button&gt;
&lt;script&gt;
btn.onclick = function(){
    text.focus();
    text.setSelectionRange(0,3)    
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/html/formobj/f11.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;IE8-浏览器支持使用范围选择部分文本。要选择文本框中的部分文本，必须首先使用createTextRange()方法创建一个范围，并将其放在恰当的位置上。然后，再使用moveStart()和moveEnd()这两个范围方法将范围移动到位

&emsp;&emsp;不过，在调用这两个方法以前，还必须使用collapse()将范围折叠到文本框的开始位置。此时，moveStart()将范围的起点和终点移动到了相同的位置，只要再给moveEnd()传入要选择的字符总数即可。最后一步，就是使用范围的select()方法选择文本

<div>
<pre>&lt;input id="text" value="1234567890"&gt;
&lt;button id="btn"&gt;选择前3个字符&lt;/button&gt;
&lt;script&gt;
btn.onclick = function(){
    var range = text.createTextRange();
    range.collapse(true);
    range.moveStart('character',0);
    range.moveEnd('character',3);
    range.select();
}
&lt;/script&gt;</pre>
</div>

**兼容**　

<div>
<pre>function selectText(textbox, startIndex, stopIndex){
    if(textbox.setSelectionRange){
        textbox.setSelectionRange(startIndex, stopIndex);
    } else if(textbox.createTextRange){
        var range = textbox.createTextRange();
        range.collapse(true);
        range.moveStart('character',startIndex);
        range.moveEnd('character',stopIndex);
        range.select();
    }
    textbox.focus();
}</pre>
</div>
