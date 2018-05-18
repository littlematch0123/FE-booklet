# jQuery设计思想

&emsp;&emsp;在深入了解jQuery的各个细节之前，需要对jQuery的设计思想有一个大致的了解。在遇到问题时， 知道应该使用jQuery的哪一个功能，然后迅速从手册中找到具体的用法。本文将详细介绍jQuery的设计思想

&nbsp;

### 选择元素

&emsp;&emsp;jQuery的基本设计思想和主要用法，就是"选择某个网页元素，然后对其进行某种操作"。这是它区别于其他javascript库的根本特点

&emsp;&emsp;使用jQuery的第一步，往往就是将一个选择表达式，放进构造函数jQuery()(简写为$)，然后得到被选中的元素

【模拟CSS选择元素】

```
$(document) //选择整个文档对象
$('#myId') //选择ID为myId的网页元素
$('div.myClass') // 选择class为myClass的div元素
$('input[name=first]') // 选择name属性等于first的input元素
```

【特有表达式选择】

```
$('a:first') //选择网页中第一个a元素
$('tr:odd') //选择表格的奇数行
$('#myForm :input') // 选择表单中的input元素
$('div:visible') //选择可见的div元素
$('div:gt(2)') // 选择所有的div元素，除了前三个
$('div:animated') // 选择当前处于动画状态的div元素
```

【多种筛选方法】

```
$('div').has('p'); // 选择包含p元素的div元素
$('div').not('.myClass'); //选择class不等于myClass的div元素
$('div').filter('.myClass'); //选择class等于myClass的div元素
$('div').first(); //选择第1个div元素
$('div').eq(5); //选择第6个div元素
```

&nbsp;

### 写法

【方法函数化】

&emsp;&emsp;在原生javascript中，赋值操作符用的比较多。而在jQuery中，多使用函数传参的方式，也就是方法函数化

```
//原生
window.onload = function(){};
//jQuery
$(function(){});

//原生
div.onclick = function(){};
//jQuery
div.click(function(){});

//原生
div.innerHTML = '123';
//jQuery
div.html('123');
```

【链式操作】

&emsp;&emsp;选中网页元素以后，可以对它进行一系列操作，并且所有操作可以连接在一起，以链条的形式写出来

```
$('div').find('h3').eq(2).html('Hello');
```

&emsp;&emsp;分解开来，就是下面这样：

```
$('div') //找到div元素
.find('h3') //选择其中的h3元素
.eq(2) //选择第3个h3元素
.html('Hello'); //将它的内容改为Hello
```

&emsp;&emsp;这是jQuery最令人称道、最方便的特点。它的原理在于每一步的jQuery操作，返回的都是一个jQuery对象，所以不同操作可以连在一起

&emsp;&emsp;jQuery还提供了.end()方法，使得结果集可以后退一步

```
$('div')
.find('h3')
.eq(2)
.html('Hello')
.end() //退回到选中所有的h3元素的那一步
.eq(0) //选中第一个h3元素
.html('World'); //将它的内容改为World
```

【取赋值合体】

&emsp;&emsp;操作网页元素，最常见的需求是取得它们的值，或者对它们进行赋值。jQuery使用同一个函数来完成取值(getter)和赋值(setter)，即"取值器"与"赋值器"合一。到底是取值还是赋值，由函数的参数决定

```
$('h1').html(); //html()没有参数，表示取出h1的值
$('h1').html('Hello'); //html()有参数Hello，表示对h1进行赋值
```

&emsp;&emsp;常见的取值和赋值函数如下

```
.html() 取出或设置html内容
.text() 取出或设置text内容
.attr() 取出或设置某个属性的值
.width() 取出或设置某个元素的宽度
.height() 取出或设置某个元素的高度
.val() 取出某个表单元素的值
```

&emsp;&emsp;需要注意的是，如果结果集包含多个元素，那么赋值的时候，将对其中所有的元素赋值；取值的时候，则是只取出第一个元素的值

&emsp;&emsp;注意：.text()例外，它取出所有元素的text内容