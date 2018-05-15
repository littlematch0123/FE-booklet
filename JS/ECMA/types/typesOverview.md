# javascript中15种原生对象类型系统综述

&emsp;&emsp;在编程语言中，能够表示并操作的值的类型称做数据类型，编程语言最基本的特性就是能够支持多种数据类型。javascript拥有强大的类型系统，主要包括原生对象、宿主对象和浏览器拓展对象，本文主要介绍15种原生对象类型系统

![typesOverview](https://pic.xiaohuochai.site/blog/JS_ECMA_grammer_typesOverview.jpg)

### 原生对象(15种)

&emsp;&emsp;原生对象分为两类：[原始类型](http://www.cnblogs.com/xiaohuochai/p/5108837.html)(primitive type)和[对象类型](http://www.cnblogs.com/xiaohuochai/p/5108837.html)(object type)。原始类型又分为两类，一类是空值，一类是包装对象；对象类型也可以分为两类：一类是构造器对象，一类是单体内置对象

&nbsp;

**空值(2种)**

&emsp;&emsp;与其他语言不同，javascript表示空值的值有两个，分别是[undefined](http://www.cnblogs.com/xiaohuochai/p/5665637.html#anchor2)和[null](http://www.cnblogs.com/xiaohuochai/p/5665637.html#anchor3)。逻辑上，undefined表示原始类型的空值，null表示对象类型的空值

**包装对象(3种)**

&emsp;&emsp;[字符串string](http://www.cnblogs.com/xiaohuochai/p/5599529.html)、[数字number](http://www.cnblogs.com/xiaohuochai/p/5586166.html)、[布尔值boolean](http://www.cnblogs.com/xiaohuochai/p/5616641.html)虽然属于原始类型。但是，由于其[包装对象](http://www.cnblogs.com/xiaohuochai/p/5584647.html)的性质，可以调用属性和方法

**构造器对象(9种)**

&emsp;&emsp;普通的对象是命名值的无序集合，但是通过不同的构造器，javascript定义了功能各异的多种对象，包括[对象Object](http://www.cnblogs.com/xiaohuochai/p/5741616.html)、[函数Function](http://www.cnblogs.com/xiaohuochai/p/5702813.html)、[日期Date](http://www.cnblogs.com/xiaohuochai/p/5663102.html)、[数组Array](http://www.cnblogs.com/xiaohuochai/p/5679605.html)、[错误Error](http://www.cnblogs.com/xiaohuochai/p/5677490.html)、[正则RegExp](http://www.cnblogs.com/xiaohuochai/p/5612230.html)

&emsp;&emsp;注意：如果显式地使用new 构造器函数来定义包装对象，那么[字符串String](http://www.cnblogs.com/xiaohuochai/p/5599529.html)、[数字number](http://www.cnblogs.com/xiaohuochai/p/5586166.html)、[布尔值boolean](http://www.cnblogs.com/xiaohuochai/p/5616641.html)也属于构造器对象

**单体内置对象(4种)**

&emsp;&emsp;单体内置对象包括[Math](http://www.cnblogs.com/xiaohuochai/p/5658452.html)、[JSON](http://www.cnblogs.com/xiaohuochai/p/5887754.html)、全局对象和[arguments](http://www.cnblogs.com/xiaohuochai/p/5706289.html#anchor1)这四种。它们不需声明或者使用构造器构造，直接在相应场景使用即可

