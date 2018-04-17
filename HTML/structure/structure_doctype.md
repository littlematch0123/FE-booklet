# HTML文档声明

&emsp;&emsp;HTML文档通常以类型声明开始，该声明将帮助浏览器确定其尝试解析和显示的HTML文档类型。本文将详细介绍文档声明DOCTYPE



<p>&nbsp;</p>


### 特点

&emsp;&emsp;文档声明必须是HTML文档的第一行、且顶格显示，对大小写不敏感。因为任何放在DOCTYPE前面的东西，比如批注或XML声明，会令IE9或更早期的浏览器触发怪异模式(后面的渲染模式会介绍)

&emsp;&emsp;由于文档类型声明不是标签，因此不应具有关闭标签

<p>&nbsp;</p>



### 版本

<table class="table">
<tbody>
<tr><th style="width: 40%;">版本</th><th>年份</th></tr>
<tr>
<td>HTML</td>
<td>1991</td>
</tr>
<tr>
<td>HTML+</td>
<td>1993</td>
</tr>
<tr>
<td>HTML 2.0</td>
<td>1995</td>
</tr>
<tr>
<td>HTML 3.2</td>
<td>1996</td>
</tr>
<tr>
<td>HTML 4.01</td>
<td>1999</td>
</tr>
<tr>
<td>XHTML 1.0</td>
<td>2000</td>
</tr>
<tr>
<td>HTML5</td>
<td>2014</td>
</tr>
</tbody>
</table>

<div><img src="https://pic.xiaohuochai.site/blog/HTML_structure_doctype.jpg" alt="#"></div>


<p>&nbsp;</p>


### 声明

<p><strong>HTML5</strong></p>

    <!DOCTYPE html>

&emsp;&emsp;在HTML5之前，文档声明一般有三种类型：严格型strict、过渡型transitional、框架frameset

&emsp;&emsp;严格型DTD包含所有HTML元素和属性，但不包含展示性的和弃用的元素(如font)；而过渡型或宽松型(loose)则包含展示性和启用的元素

<p><strong>HTML4.01</strong></p>

    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN"
    "http://www.w3.org/TR/html4/strict.dtd">        
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
    <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" "http://www.w3.org/TR/html4/frameset.dtd">　

<p><strong>XHTML1.0</strong></p>


    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">        
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN"  "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">

<strong>XHTML1.1 等同于XHTML1.0 Strict</strong>

    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">    

【DTD】

&emsp;&emsp;DTD称为文档类型定义，它可以定义合法的XML文档构建模块，它使用一系列合法的元素来定义文档的结构。在HTML中，DTD使用XML定义了HTML标签规范

&emsp;&emsp;由于HTML5不基于SGML，所以不需要引用DTD。但是需要doctype来启用标准模式(后面的渲染模式会介绍)。HTML5的语法元素来自SGML、HTML、XHTML1.X，使它成为一种有自己规则的合成语言

&emsp;&emsp;HTML、XML和SGML这三者的关系并不容易区分。HTML是SGML的一个实例，它的DTD作为标准被固定下来，因此，HTML不能作为定义其它置标语言的元语言。XML是SGML的一个子集，严格地讲，XML也还是SGML。与HTML不同的是，XML有DTD，因而也可以像SGML那样作为元语言，来定义其它文件系统或置标语言。如果把置标语言分为元置标语言和实例置标语言的话，SGML和XML都是元置标语言，而HTML和由XML派生的XHTML都是实例置标语言

&emsp;&emsp;注意：关于DTD的更多信息[移步至此](http://www.w3school.com.cn/tags/html_ref_dtd.asp)

<p>&nbsp;</p>

### 渲染模式

&emsp;&emsp;在很久以前的网络上，页面通常有两种版本：为网景(Netscape)的Navigator准备的版本以及为微软(Microsoft)的Internet Explorer准备的版本。当W3C创立网络标准后，为了不破坏当时既有的网站，浏览器不能直接起用这些标准。因此，浏览器采用了两种模式，用以把能符合新规范的网站和老旧网站区分开。

&emsp;&emsp;浏览器排版引擎有三种模式：怪异模式(Quirks mode)、接近标准模式(Almost standards mode)以及标准模式(Standards mode)。在怪异模式下，排版会模拟Navigator4与Internet Explorer 5的非标准行为。为了支持在网络标准被广泛采用前，就已经建好的网站，这么做是必要的。在标准模式下，行为即由HTML与CSS的规范描述的行为。在接近标准模式下，只有少数的怪异行为被实现

&emsp;&emsp;对HTML文档来说，浏览器使用文档开头的DOCTYPE来决定用怪异模式处理或标准模式处理。如果文档中没有DOCTYPE将触发文档的怪异模式。怪异模式最明显的影响是会触发怪异盒模型。在CSS中盒模型被分为两种，第一种是W3C的标准模型，第二种是怪异盒模型。不同之处在于怪异盒模型的宽高定义的是可见元素框的尺寸，而不是元素框的内容区尺寸

