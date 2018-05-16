# 深入理解javascript选择器API系列第一篇——4种元素选择器

&emsp;&emsp;说到最常见的DOM应用，恐怕就要数取得特定的某个或某组元素的引用了。DOM定义了许多方式来选取元素，包括getElementById()、getElementsByTagName()、getElementsByName()和document.all4种。接下来，将对这4种方法进行详细介绍

&nbsp;

### getElementById()

&emsp;&emsp;任何HTML元素可以有一个id属性，在文档中该值必须唯一

&emsp;&emsp;注意：若浏览器中出现多个id名的情况，CSS样式对所有该id名的元素都生效，但javascript脚本仅对第一个出现该id名的元素生效

![getElementById](https://pic.xiaohuochai.site/blog/JS_DOM_node_getElementById.gif)

&emsp;&emsp;getElementById()该方法接收一个参数：要取得元素的id，若找到则返回该元素，若不存在则返回null

<div>
<pre>&lt;div id="myDiv"&gt;&lt;/div&gt;
&lt;script&gt;
var div1 = document.getElementById('myDiv');
var div2 = document.getElementById('mydiv');
console.log(div1);//&lt;div id="myDiv"&gt;&lt;/div&gt;
console.log(div2);//null
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;关于getElementById()方法，IE7-浏览器有两个bug

&emsp;&emsp;【1】该方法对匹配元素的ID不区分大小写

<div>
<pre>&lt;div id="myDiv" style="height:20px;"&gt;&lt;/div&gt;
&lt;script&gt;
var div1 = document.getElementById('mydiv');
//在标准浏览器下报错，但在IE7-浏览器下，id为'myDiv'的元素的背景颜色变为品红色
div1.style.backgroundColor = 'pink';
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;【2】表单元素的name属性也会被当作ID属性识别出来。因此为了避免这种问题，最好不让表单元素的name属性和其他元素的ID属性相同

<div>
<pre>&lt;button name="test"&gt;0&lt;/button&gt;
&lt;script&gt;
var myDiv = document.getElementById('test');
//在标准浏览器下报错，但在IE7-浏览器中会输出0
console.log(myDiv.innerHTML);
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;注意：如果在HTML文档中元素中存在某id属性，并且如果Window对象没有此名字的属性， Window对象会赋予一个属性，它的名字是id属性的值，而它们的值指向表示文档元素的HTMLElement对象，因此，元素ID隐式地成为了全局变量，与getElementById(id)方法的效果相同

<div>
<pre>&lt;div id="test"&gt;&lt;/div&gt;
&lt;button id="btn"&gt;按钮一&lt;/button&gt;
&lt;button id="location"&gt;按钮二&lt;/button&gt;
&lt;script&gt;
var oBtn = document.getElementById('btn');    
var oDiv = document.getElementById('test');    
oBtn.onclick = function(){
    //通过getElementById()方法获取id为test的对象
    oDiv.style.height='10px';
    //通过id属性获取相同的对象
    test.style.backgroundColor ='pink';
}
//由于location本身就是window对象下的属性，已经被占用，所以无法表示id=location的元素
location.onclick = function(){
    alert(2);
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/js/getElement/g1.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;在IE浏览器中，HTML某些元素如果有name属性，也与id属性相同，隐式地成为全局变量，包括：

<div>
<pre>&lt;a&gt; &lt;embed&gt; &lt;form&gt; &lt;iframe&gt; &lt;img&gt; &lt;object&gt;</pre>
</div>

&emsp;&emsp;id是唯一的，但name属性并不是唯一的。具有该名称的隐式全局变量会引用一个类数组对象，包括所有该命名的元素

<div>
<pre>&lt;a href="#" name="test"&gt;a元素1&lt;/a&gt;
&lt;a href="#" name="test"&gt;a元素2&lt;/a&gt;
&lt;div id="test"&gt;div元素&lt;/div&gt;
&lt;script&gt;
//IE浏览器中，两个a元素和一个div元素字体都变成红色
for(var i = 0; i &lt; test.length; i++){
    test[i].style.color = 'red';
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/js/getElement/g2.html" frameborder="0" width="320" height="240"></iframe>

【丢失的this】

&emsp;&emsp;document.getElementById这个方法名实在有点过长，可以用一个短的函数来代替它

```
var getId = function(id){
  return document.getElementById(id);
}
```
&emsp;&emsp;但是，为什么不能用下面这种更简单的形式呢？
```
var getId =  document.getElementById;
getId('div1');
```
&emsp;&emsp;上面的这段代码中会抛出异常

![getElementById2](https://pic.xiaohuochai.site/blog/JS_DOM_Node_getElementById2.png)

&emsp;&emsp;这是因为document.getElementById方法的内部实现需要用到this，这个this本来被期望指向document，当getElementById方法作为document对象的属性被调用时，方法内部的this确实指向document。但当用getId来引用document.getElementById之后，再调用getId，此时就成了普通函数调用，函数内部的this指向了window，而不是document

&emsp;&emsp;代码修改如下，可以取得id为'div1'的元素

```
<div id="div1"></div>
<script>
  var getId = document.getElementById;
  console.log(getId.call(document,'div1'));
</script>  
```
&emsp;&emsp;或者，可以这样修改

```
 var getId = document.getElementById.bind(document);
```
&emsp;&emsp;最终结果如下

![getElementById3](https://pic.xiaohuochai.site/blog/JS_DOM_Node_getElementById3.png)


&nbsp;

### getElementsByTagName()

&emsp;&emsp;getElementsByTagName()方法接收一个参数，即要取得元素的标签名，而返回的是包含0或多个元素的类数组对象HTMLCollection。可以使用方括号语法或item()方法来访问类数组对象中的项，length属性表示对象中元素的数量

<div>
<pre>&lt;div&gt;元素一&lt;/div&gt;
&lt;div&gt;元素二&lt;/div&gt;
&lt;script&gt;
var divs = document.getElementsByTagName('div');
divs[0].style.color = 'red';
divs.item(1).style.backgroundColor = 'pink';
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/js/getElement/g3.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;注意：通过getElementsByTagName()方法取得的类数组对象有一个namedItem()方法，可以通过元素的name属性取得集合中的第一个值。safari和IE不支持该方法

<div>
<pre>&lt;div&gt;元素一&lt;/div&gt;
&lt;div name='test'&gt;元素二&lt;/div&gt;
&lt;div name='test'&gt;元素三&lt;/div&gt;
&lt;script&gt;
var divs = document.getElementsByTagName('div');
divs.namedItem('test').style.color = 'red';
&lt;/script&gt;</pre>
</div>

<iframe style="line-height: 1.5; width: 100%; height: 80px;" src="https://demo.xiaohuochai.site/js/getElement/g4.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;getElementsByTagName()方法可以用于document对象，也可以用于element元素对象，用于调用该方法的元素的后代元素

<div>
<pre>&lt;ul id='myUl'&gt;
    &lt;li&gt;1&lt;/li&gt;
    &lt;li&gt;2&lt;/li&gt;
&lt;/ul&gt;
&lt;script&gt;
var oUl = document.getElementById('myUl');
var lis = oUl.getElementsByTagName('li');
lis[0].style.color = 'red';
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 70px;" src="https://demo.xiaohuochai.site/js/getElement/g5.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### getElementsByName()

&emsp;&emsp;getElementsByName()方法会返回带有给定name特性的所有元素

<div>
<pre>&lt;button name='test'&gt;按钮一&lt;/button&gt;
&lt;button name='test'&gt;按钮二&lt;/button&gt;
&lt;script&gt;
var button = document.getElementsByName('test');
button[0].style.color = 'red';
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/js/getElement/g6.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;关于getElementsByName()方法，IE浏览器与其他浏览器相比，有三个不同之处

&emsp;&emsp;【1】IE9-浏览器只支持在表单元素上使用getElementsByName()方法

<div>
<pre>&lt;div name='test'&gt;元素一&lt;/div&gt;
&lt;div name='test'&gt;元素二&lt;/div&gt;
&lt;script&gt;
//标准浏览器下，元素一颜色变为红色，但在IE9-浏览器下会报错
var divs = document.getElementsByName('test');
divs[0].style.color = 'red';
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/js/getElement/g7.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;【2】IE9-浏览器中使用getElementsByName()方法也会返回id属性匹配的元素。因此，不要将name和id属性设置为相同的值

<div>
<pre>&lt;button name='test'&gt;按钮一&lt;/button&gt;
&lt;button name='test'&gt;按钮二&lt;/button&gt;
&lt;button id="test"&gt;按钮三&lt;/button&gt;
&lt;script&gt;
//标准浏览器下，按钮三不变色，但IE9-浏览器下，按键三也变成红色
var buttons = document.getElementsByName('test');
for(var i = 0; i &lt; buttons.length; i++){
    buttons[i].style.color = 'red';
}
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/js/getElement/g8.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;【3】如果对getElementsByName()方法取得的类数组对象使用namedItem()方法，因为每一项的name属性都相同，所以只会返回第一项

&emsp;&emsp;注意：只有IE8&mdash;&mdash;IE11浏览器支持

<div>
<pre>&lt;button name='test'&gt;按钮一&lt;/button&gt;
&lt;button name='test'&gt;按钮二&lt;/button&gt;
&lt;script&gt;
var buttons = document.getElementsByName('test');
buttons.namedItem('test').style.color = 'red';
&lt;/script&gt;</pre>
</div>

&nbsp;

### document.all

&emsp;&emsp;在DOM标准化之前，IE4就引入了document.all[]集合来表示文档中的所有元素

<div>
<pre>&lt;div&gt;div&lt;/div&gt;
&lt;button&gt;按钮&lt;/button&gt;
&lt;script&gt;
console.log(document.all);//[html, head, meta, title, body, div, button, script]
//标准浏览器返回8，而IE8-浏览器返回9，由于它把文档声明&lt;!DOCTYPE html&gt;识别为注释，且把注释识别为元素，所以多1个
console.log(document.all.length);
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;现在document.all方法已经弃用，要取得类似效果，可以使用document.getElementsByTagName('*')方法，*表示匹配所有元素

<div>
<pre>&lt;div&gt;div&lt;/div&gt;
&lt;button&gt;按钮&lt;/button&gt;
&lt;script&gt;
console.log(document.getElementsByTagName('*'));//[html, head, meta, title, body, div, button, script]
//标准浏览器返回8，而IE8-浏览器返回9，由于它把文档声明&lt;!DOCTYPE html&gt;识别为注释，且把注释识别为元素，所以多1个
console.log(document.getElementsByTagName('*').length);
&lt;/script&gt;</pre>
</div>

&nbsp;

## 最后

&emsp;&emsp;getElementsByName()方法并不常用，再加上已经废弃的document.all。实际上，常用的获取元素的方法就getElementById()和getElementsByTagName()两种。getElementsByClassName()不也是吗？确实是，但它和querySelector()等方法都是HTML5扩充的新方法，兼容性不是很好，这些新方法将在续篇进行详细介绍

&emsp;&emsp;欢迎交流

