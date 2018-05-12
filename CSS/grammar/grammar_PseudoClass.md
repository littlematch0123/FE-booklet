# 深入理解CSS伪类

&emsp;&emsp;伪类经常与伪元素混淆，[伪元素](http://www.cnblogs.com/xiaohuochai/p/5021121.html)的效果类似于通过添加一个实际的元素才能达到，而伪类的效果类似于通过添加一个实际的类来达到。实际上css3为了区分两者，已经明确规定了伪类用一个冒号来表示，而伪元素则用两个冒号来表示。本文将详细介绍伪类的详细知识

&nbsp;

### 锚点

&emsp;&emsp;关于锚点`<a>`，有常见的5个伪类，分别是:link、:hover、:active、:focus、:visited


```
a:link{background-color:pink;}/*品红，未访问*/
```

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/css/base/b32.html" frameborder="0" width="320" height="240"></iframe>


```
a:hover{background-color:lightblue;}/*浅蓝，鼠标悬停*/
```

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/css/base/b33.html" frameborder="0" width="320" height="240"></iframe>


```
a:active{background-color:lightgreen;}/*浅绿，正被点击*/
```

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/css/base/b34.html" frameborder="0" width="320" height="240"></iframe>


```
a:focus{background-color:lightgrey;}/*浅灰，拥有焦点*/
```

<iframe style="line-height: 1.5; width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/css/base/b35.html" frameborder="0" width="320" height="240"></iframe>


```
a:visited{color:orange;}/*字体颜色为橙色，已被访问*/
/*注意:visited伪类只能设置字体颜色、边框颜色、outline颜色的样式*/
```

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/css/base/b36.html" frameborder="0" width="320" height="240"></iframe>

**伪类顺序**

&emsp;&emsp;对于伪类顺序，有一个口诀是love-hate，代表着伪类的顺序是link、visited、focus、hover、active。但是否伪类的顺序只能如此呢？为什么是这个顺序呢？

&emsp;&emsp;CSS层叠中有一条法则十分重要，就是后面覆盖前面，所以伪类的顺序是需要精心考虑的。

&emsp;&emsp;【1】link和visited必须在最前面，且没有先后顺序，否则link或visited的效果将被覆盖

&emsp;&emsp;注意:link和visited称为静态伪类，只能应用于超链接

&emsp;&emsp;【2】hover、active、focus这三个伪类必须是focus、hover、active的顺序，因为在focus状态下，也需要触发hover和active，而要触发active一定要先触发hover，所以active要放在hover后面

&emsp;&emsp;注意:hover、active、focus称为动态伪类，可应用于任何元素，但IE7-浏览器不支持:focus，:hover和:active在IE6-浏览器下只支持给`<a>`设置

&emsp;&emsp;所以最终的顺序只有两种:link、visited、focus、hover、active或visited、link、focus、hover、active


```
a:link{background-color:pink;}/*品红，未访问*/
a:visited{color:orange;}/*字体颜色为橙色，已被访问*/
a:focus{background-color:lightgrey;}/*浅灰，拥有焦点*/
a:hover{background-color:lightblue;}/*浅蓝，鼠标悬停*/
a:active{background-color:lightgreen;}/*浅绿，正被点击*/
```

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/css/base/b37.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### UI元素伪类

&emsp;&emsp;UI元素伪类包括:enabled、:disabled、:checked三个，主要针对于HTML中的form元素，IE8-浏览器不支持


```
:enabled    可用状态
:disabled   不可用状态
:checked    选中状态    
```

```
input:enabled{
    border: 1px solid black;
    background-color: transparent;
}
input:disabled{
    border: none;
    background-color: gray;
}
input:checked{
    outline: 2px solid lightblue;
}
```

```
<button onclick = "btn.disabled = false;">按钮可用</button>
<button onclick = "btn.disabled = true;">按钮不可用</button>
<input type="button" id="btn" value="按钮">
<br>
<label>Male<input type="radio" name="sex" /></label>
<label>Female<input type="radio" name="sex"  /></label>
```

&emsp;&emsp;注意:`input`和`:`和`enabled`之间都不可以有空格

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/base/b38.html" frameborder="0" width="320" height="240"></iframe>

### 结构伪类

&emsp;&emsp;结构伪类可分为以下3种情况，IE8-浏览器不支持

&emsp;&emsp;//以下情况都是E为父元素，F为子元素

【1】:nth-child(n)、:nth-last-child(n)、first-child、last-child、:only-child


```
E F:nth-child(n)           选择父元素的第n个子元素
E F:nth-last-child(n)      选择父元素的倒数第n个子元素
E F:first-child            父元素的第一个子元素，与E F:nth-child(1)等同
E F:last-child             父元素的最后一个子元素，与E F:nth-last-child(1)等同
E F:only-child             选择父元素中只包含一个子元素
```

&emsp;&emsp;注意::first-child和:last-child只有IE6-浏览器不支持

&emsp;&emsp;n可以是整数(从1开始)，也可以是公式，也可以是关键字(even、odd)


```
p:first-child     代表的并不是<p>的第一个子元素，而是<p>元素是某元素的第一个子元素
p > i:first-child    匹配所有<p>元素中的第一个<i>元素
p:first-child i 　　  匹配所有作为第一个子元素的<p>元素中的所有<i>元素
```

```
li:nth-child(odd){color: red;} 
li:nth-last-child(3){color: green;}
li:first-child{color: blue;}
li:last-child{color: yellow;}
div:only-child{background-color:lightgrey;}
```

```
<ul>
    <li><div>第一个DIV</div></li>
    <li><div>第二个DIV</div></li>
    <li><div>第三个DIV</div></li>
    <li><div>第四个DIV</div></li>
    <li><div>第五个DIV</div></li>
    <li><div>第六个DIV</div></li>        
</ul>
```

<iframe style="width: 100%; height: 160px;" src="https://demo.xiaohuochai.site/css/base/b39.html" frameborder="0" width="320" height="240"></iframe>

【2】:nth-of-type(n)、:nth-last-of-type(n)、:first-of-type、:last-of-type、:only-of-type


```
E F:nth-of-type(n)          选择父元素的具有指定类型的第n个子元素
E F:nth-last-of-type(n)     选择父元素的具有指定类型的倒数第n个子元素
E F:first-of-type           选择父元素中具有指定类型的第1个子元素，与E F:nth-of-type(1)相同
E F:last-of-type         　  选择父元素中具有指定类型的最后1个子元素，与E F:nth-last-of-type(1)相同
E F:only-of-type        　　 选择父元素中只包含一个同类型的子元素
```

```
.box div:nth-of-type(even){color: red;} 
.box p:nth-last-of-type(3){color: green;}
.box div:first-of-type{color: blue;}
.box p:last-of-type{color: yellow;}
.box div:only-of-type{color: pink;}
```

```
<div class="box">
    <div>第一个div</div>
    <p>第一个p</p>
    <div>第二个div</div>
    <p>第二个p</p>
    <div class="in">第三个div</div>
    <p>第三个p</p>
</div>
<div class="box">
    <div>第四个div</div>
</div>
```

<iframe style="width: 100%; height: 260px;" src="https://demo.xiaohuochai.site/css/base/b40.html" frameborder="0" width="320" height="240"></iframe>

【3】:root、:not、:empty、:target


```
:root        　选择文档的根元素
:not         　选择除某个元素之外的所有元素
:empty         选择没有子元素的元素，而且该元素也不包含任何文本节点
:target     　 匹配锚点对应的目标元素
```

&emsp;&emsp;注意:`:not选择器`常用于导航之间的竖线处理，如li:not(:last-of-type)


```
:root{color:red;}
div:not{background-color: lightgrey;}
p:empty{height:30px;width:30px;background:pink;}
:target{color:blue;}
```

```
<body>
    <a href="#test">测试</a>
    <div>第一个div</div>
    <p>第一个p</p>
    <div id="test">第二个div</div>
    <p>第二个p</p>
    <p></p>    
</body>
```

<iframe style="width: 100%; height: 230px;" src="https://demo.xiaohuochai.site/css/base/b41.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 其他

【1】:lang()&emsp;&emsp;匹配某个语言，IE7-浏览器不支持


```
p:lang(en) 匹配语言为"en"的<p>
```

【2】不仅可以使用单一伪类，也可以伪类结合使用

&emsp;&emsp;注意:顺序无关


```
div:hover:first-child{background-color: lightgreen;}
div:last-of-type:active{background-color: lightblue;}    
```

```
    <div>第一个div</div>
    <div>第二个div</div>
```

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/css/base/b42.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 速查表

&emsp;&emsp;下面是伪类的速查表

```
/* Logical Combinations */
:matches() /*:any()*/   /* 匹配 集合内指定 的元素 */
:not()                  /* 排除 满足指定关系 的元素 */
:has()                  /* 匹配 满足指定关系 的元素*/

/* Linguistic Pseudo-classes */
:dir()                  /* 匹配 设置dir(文字书写方向)属性 的元素 */
:lang()                 /* 匹配 设置lang(定义元素语言)属性 的元素 */

/* Location Pseudo-classes */
:any-link               /* 匹配 任意有链接锚点 的元素*/
:link                   /* 匹配 未处于访问记录中 的链接 */
:visited                /* 匹配 处于访问记录中 的链接 */
:target                 /* 匹配 URL指向的锚点 的元素 */
:scope                  /* 匹配 设置scoped属性的style标签 的作用域 */

/* User Action Pseudo-classes */
:hover                  /* 匹配 处于鼠标悬停状态 的元素 */
:active                 /* 匹配 处于激活状态 的元素 */
:focus                  /* 匹配 处于聚焦状态 的元素 */
:focus-ring             /* 匹配 处于聚焦状态元素 的UA样式(聚焦轮廓) */
:focus-within           /* 匹配 子节点处于聚焦状态 的元素 */
:drop                   /* 匹配 处于拖拽状态 的元素 */
:drop()                 /* 匹配 处于指定拖拽状态 的元素 */

/* Time-dimensional Pseudo-classes */
:current                /* 匹配 处于当前状态 的定义了timeline属性的元素 */
:past                   /* 匹配 处于过去状态 的定义了timeline属性的元素 */
:future                 /* 匹配 处于将来状态 的定义了timeline属性的元素 */

/* Resource State Pseudos */
:playing                /* 匹配 处于播放状态 的元素 */
:paused                 /* 匹配 处于暂停状态 的元素 */

/* The Input Pseudo-classes */
:enabled                /* 匹配 可以编辑 的元素 */
:disabled               /* 匹配 禁止编辑 的元素 */
:read-only              /* 匹配 内容只读 的元素 */
:read-write             /* 匹配 内容可编辑 的元素 */
:placeholder-shown      /* 匹配 显示字段占位符文本 的元素 */
:default                /* 匹配 页面载入默认选中 的元素 */

:checked                /* 匹配 选中状态 的元素 */
:indeterminate          /* 匹配 模糊状态 的元素 */

:valid                  /* 匹配 输入内容通过类型验证 的元素 */
:invalid                /* 匹配 输入内容无法通过类型验证 的元素 */
:in-range               /* 匹配 输入数值符合范围 的元素 */
:out-of-range           /* 匹配 输入数值溢出范围 的元素 */
:required               /* 匹配 设置必填属性 的元素 */
:optional               /* 匹配 可选字段 的元素 */
:user-invalid           /* 匹配 用户输入内容未通过验证 的元素 */

/* Tree-Structural pseudo-classes */
:root                   /* 匹配 文档树 的根元素*/
:empty                  /* 匹配 无子节点 的元素 */
:blank                  /* 匹配 仅包含空格或者换行符 的元素 */

:nth-child(n)           /* 匹配 符合元素集合中指定位置 的元素 */
:nth-last-child(n)      /* 反序匹配 符合元素集合内指定位置 的元素 */
:first-child            /* 匹配 符合元素集合内首个 的元素 */
:last-child             /* 匹配 符合元素集合内末尾 的元素 */
:only-child             /* 匹配 无兄弟节点 的元素 */

:nth-of-type(n)         /* 匹配 符合元素集合中同类型指定位置 的元素 */
:nth-last-of-type(n)    /* 反序匹配 符合元素集合中同类型指定位置 的元素 */
:first-of-type          /* 匹配 每个在元素集合中初次出现 的元素 */
:last-of-type           /* 匹配 每个在元素集合中末次出现 的元素 */
:only-of-type           /* 匹配 无同类兄弟节点 的元素*/

/* Fullscreen API */
:fullscreen             /* 匹配 全屏显示模式中 的元素 */

/* Page Selectors */
:first                  /* 打印文档时首页的样式 */
:left                   /* 打印文档时左侧的样式 */
:right                  /* 打印文档时右侧的样式 */
```