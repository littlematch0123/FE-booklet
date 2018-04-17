# HTML骨架结构
    
&emsp;&emsp;一个完整的HTML文档必须包含3个部分：文档声明、文档头部和文档主体。而正是它们构成了HTML的骨架结构。前面已经分别介绍过文档声明和文档头部，本文将详细介绍构成HTML骨架结构的基础元素


<p>&nbsp;</p>

### HTML

&emsp;&emsp;`<html>`元素代表HTML文档的根(root)，其他所有元素都是该元素的后代。`<html>`与`</html>`标签限定了文档的开始点和结束点，在它们之间是文档的头部和主体。文档的头部由`<head>`标签定义，而主体由`<body>`标签定义


<div><img src="https://pic.xiaohuochai.site/blog/HTML_structure_docStruc.jpg" alt="#"></div>


【xmlns】

&emsp;&emsp;xmlns属性用于指派文档的XML命名空间。预设值是"http://www.w3.org/1999/xhtml"，这在XHTML中是必要的，而在HTML中则是可选的


    <html xmlns="http://www.w3.org/1999/xhtml">


<p>&nbsp;</p>

### HEAD

&emsp;&emsp;`<head>`标签用于定义文档的头部，它是所有头部元素的容器。`<head>`大部分不可见，描述了文档的一些基本的属性和信息(可以呈现的是title和icon)。`<head>`元素下的子元素主要包括`<meta>`、`<title>`、`<base>`、`<link>`、`<style>`和`<script>`这六个元素

&emsp;&emsp;`<title>`定义文档的标题，它是head部分中唯一必需的元素

&emsp;&emsp;如果在文档中忽略了`<head>`标签，则大部分浏览器会自动创建一个`<head>`元素

&emsp;&emsp;关于文档头部的更多信息<a href="http://www.cnblogs.com/xiaohuochai/p/6214015.html" target="_blank">移步至此</a>


<p>&nbsp;</p>



### BODY

&emsp;&emsp;`<body>`表示的是HTML文档的主体内容，任何一个HTML文档，只允许存在一个`<body>`元素

【默认样式】

    chrome/firefox/safari/IE8+
        margin:8px;
    IE7-
        margin:15px 10px;


<p>&nbsp;</p>



### 结构

&emsp;&emsp;在sublime编辑器中，输入!，再按住Tab键，就可以生成一个基本的HTML结构，结构如下

    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Document</title>
    </head>
    <body>
    </body>
    </html>  

&emsp;&emsp;在实际中，文档的头部结构常常需要承载一些常用的功能，所以HTML结构较复杂，结构如下

    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8"/>
      <title>Document</title>
      <meta name="keywords" content=""/>
      <meta name="description" content=""/>
      <meta name="viewport" content="width=device-width"/>
      <link rel="stylesheet" href="5/style.css"/>
      <link rel="shortcut icon" href="ico.ico"/>
    </head>
    <body>
    </body>
    </html> 

