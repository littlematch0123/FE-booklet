# CSS选择器的新用法

&emsp;&emsp;现在，预处理器(如[sass](http://www.cnblogs.com/xiaohuochai/p/6242257.html))似乎已经成为开发CSS的标配，正如几年前[jQuery](http://www.cnblogs.com/xiaohuochai/p/6489658.html)是开发JS的标配一样。JS的querySelector借鉴了jQuery的选择器思想，CSS选择器也借鉴了预处理器的变量定义、选择器嵌套、代码块重用等常用功能。本文将详细介绍CSS选择器的新用法

&nbsp;

### 变量

&emsp;&emsp;一般地，我们在进行web开发时，会有一套变量定义规范，以sass为例，如下所示

```
// 颜色定义规范
$color-background : #222
$color-background-d : rgba(0, 0, 0, 0.3)
$color-highlight-background : #333

//字体定义规范
$font-size-small : 12px
$font-size-medium : 14px
$font-size-large : 18px
```

&emsp;&emsp;而CSS变量的语法如下

【声明变量】

&emsp;&emsp;变量必须以`--`开头。例如--example-variable: 20px，意思是将20px赋值给--example-varibale变量

&emsp;&emsp;可以将声明变量的语句置于任何元素内，如果要设置全局变量，则可以设置为:root、body或html

```
:root{--bgColor:#000;}
```

&emsp;&emsp;变量声明就像普通的样式声明语句一样，也可以使用内联样式

```
<body style="--bgColor:#000">
```

【使用变量】

&emsp;&emsp;使用var()函数使用变量，并且可以被使用在任意的地方。例如：var(--example-variable)会返回--example-variable所对应的值

```
<body style="--bgColor:#000;">
    <div style="width: 100px;height: 100px;background-color: var(--bgColor)"></div>    
</body>
```

&emsp;&emsp;var()函数还有一个可选参数，用来设置默认值，当变量无法取得值时，则使用默认值

```
<div style="width: 100px;height: 100px;background-color: var(--bgColor,pink)"></div>   
```

&emsp;&emsp;注意：关于CSS变量的详细用法[移步至此](http://www.cnblogs.com/xiaohuochai/p/7182771.html)

&nbsp;

### @apply

&emsp;&emsp;介绍@apply之前，先介绍一下sass中的混合宏@mixin，指可以重用的代码块

&emsp;&emsp;比如，常见的文字溢出隐藏重用

```
@mixin overflow-ellipsis{
    overflow:hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  };
div {
    @include  overflow-ellipsis;
}
```

&emsp;&emsp;而应用规则集@apply也是实现类似的功能。与var()相比，@apply是引用样式的集合，而var()是引用一个单独的样式值

```
:root{
  --overflow-ellipsis:{
    overflow:hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  };
}
.title{
  width:200px;
  @apply --overflow-ellipsis;
}
```

&nbsp;

### 自定义选择器

&emsp;&emsp;自定义选择器通过`@custom-selector`来定义，后面跟随一个`:--`接着是自定义选择器的名称，后面是需要定义的选择器，多个用逗号隔开

```
@custom-selector :--heading h1, h2, h3, h4, h5, h6;
```

&emsp;&emsp;这样，:--heading就成为一个可以使用的选择器

```
:--heading{
  margin: 0;
}
h1, h2, h3, h4, h5, h6｛
   margin: 0; 
｝
```

&emsp;&emsp;上面两段代码的效果相同

&nbsp;

### 选择器嵌套

&emsp;&emsp;CSS规则包含许多重复的内容

```
table.colortable td {
  text-align:center;
}
table.colortable td.c {
  text-transform:uppercase;
}
table.colortable td:first-child, table.colortable td:first-child+td {
  border:1px solid black;
}
table.colortable th {
  text-align:center;
  background:black;
  color:white;
}
```

&emsp;&emsp;使用嵌套语法后，代码如下

```
table.colortable {
  &amp; td {
    text-align:center;
    &amp;.c { text-transform:uppercase }
    &amp;:first-child, &amp;:first-child + td { border:1px solid black }
  }
  &amp; th {
    text-align:center;
    background:black;
    color:white;
  }
}
```

&emsp;&emsp;当使用嵌套样式规则时，必须能够引用由父规则匹配的元素; 毕竟是整个嵌套点。为了达到这个目的，这个规范定义了一个新的选择器，即嵌套选择器，写成ASCII符号＆

&emsp;&emsp;当在嵌套样式规则的选择器中使用时，嵌套选择器表示由父规则匹配的元素。在任何其他情况下使用时，它什么都不代表。（也就是说，它是有效的，但不匹配任何元素）

&emsp;&emsp;注意：&amp;嵌套选择符的两种错误写法如下所示

```
.foo {
  color: red;
  .bar &amp; { color:blue; }
}
.foo {
  color: red;
  &amp;.bar, .baz { color: blue; }
}
```

【@nest】

&emsp;&emsp;为了解决上面的嵌套选择符&amp;的脆弱，可以使用@nest选择符，@nest可适用范围更广，只要与嵌套选择符&amp;共同作用即可

```
.foo {
  color: red;
  @nest &amp; > .bar {
    color: blue;
  }
}
//等价于
   .foo { color: red; }
   .foo > .bar { color: blue; }
   ```
```
.foo {
  color: red;
  @nest .parent &amp; {
    color: blue;
  }
}
//等价于
   .foo { color: red; }
   .parent .foo { color: blue; }
   ```
```
.foo {
  color: red;
  @nest :not(&amp;) {
    color: blue;
  }
}
//等价于
   .foo { color: red; }
   :not(.foo) { color: blue; }
   ```

&emsp;&emsp;注意：@nest选择符的两种错误写法如下所示

```
.foo {
  color: red;
  @nest .bar {
    color: blue;
  }
}
.foo {
  color: red;
  @nest &amp; .bar, .baz {
    color: blue;
  }
}
```

&nbsp;

## 最后

&emsp;&emsp;遗憾地是，除了CSS变量variable可以在新版本chrome下使用外，其他CSS选择器的新用法目前都没有浏览器支持。但是，CSS后处理器postcss中的cssnext插件可以解决所有问题

&emsp;&emsp;就像[cssnext官网](http://cssnext.io/)说的一样，今天就开始使用明天的CSS语法

