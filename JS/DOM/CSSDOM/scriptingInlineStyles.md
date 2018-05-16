# 深入理解脚本化CSS系列第一篇——脚本化行内样式

&emsp;&emsp;脚本化CSS，通俗点说，就是使用javascript来操作[CSS](http://www.cnblogs.com/xiaohuochai/p/5249139.html)。[引入CSS](http://www.cnblogs.com/xiaohuochai/p/4842562.html)有3种方式：外部样式，内部样式和行间样式。本文将主要介绍脚本化行间样式

&nbsp;

### 基本用法

&emsp;&emsp;[行间样式](http://www.cnblogs.com/xiaohuochai/p/4842562.html#anchor3)又叫内联样式，使用[HTML](http://www.cnblogs.com/xiaohuochai/p/5203223.html)的style属性进行设置

<div>
<pre>&lt;div style="height: 40px;width: 40px;background-color: blue;"&gt;&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/js/CSSDOM/c1.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;[element元素节点](http://www.cnblogs.com/xiaohuochai/p/5819638.html)提供style属性，用来操作CSS行间样式，style属性指向cssStyleDeclaration对象

&emsp;&emsp;注意：IE7-浏览器不支持cssStyleDeclaration对象

<div>
<pre>&lt;div id="test" style="height: 40px;width: 40px;background-color: blue;"&gt;&lt;/div&gt;
&lt;script&gt;
//IE7-浏览器返回报错，其他浏览器返回true
console.log(test.style instanceof CSSStyleDeclaration);
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;style属性用来读写页面元素的行内CSS样式

&emsp;&emsp;如果读取没有设置过的行间样式将返回空字符串''

&emsp;&emsp;如果设置的行间样式不符合预定格式，并不会报错，而是静默失败

&emsp;&emsp;注意：IE8-浏览器支持给属性设置值时不带单位

<div>
<pre>&lt;div id="test" style="height: 40px;width: 40px;background-color: blue;"&gt;&lt;/div&gt;
&lt;script&gt;
console.log(test.style.height);//'40px'
test.style.height = '30px';
console.log(test.style.height);//'30px'
test.style.height = '20';
//IE8-浏览器返回'20px'，因为IE8-浏览器支持给属性设置值时不带单位；而其他浏览器仍然返回'30px'
console.log(test.style.height);
console.log(test.style.position);//''
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;如果一个CSS属性名包含一个或多个连字符，CSSStyleDeclaration属性名的格式应该是移除连字符，将每个连字符后面紧接着的字母大写

<div>
<pre>&lt;div id="test" style="height: 40px;width: 40px;background-color: blue;"&gt;&lt;/div&gt;
&lt;script&gt;
console.log(test.style.backgroundColor);//'blue'
&lt;/script&gt;</pre>
</div>

**float**

&emsp;&emsp;理论上，有一个不能直接转换的CSS属性是[float](http://www.cnblogs.com/xiaohuochai/p/5243735.html)。因为，float是javascript中的[保留字](http://www.cnblogs.com/xiaohuochai/p/5543930.html#anchor4)，不能用作属性名　

&emsp;&emsp;但实际上，经过测试，直接使用float在各个浏览器中都有效

<div>
<pre>&lt;div id="test" style="float:left"&gt;&lt;/div&gt;
&lt;script&gt;
console.log(test.style.float);//'left'
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;作为推荐，要访问float属性，应该使用cssFloat

&emsp;&emsp;注意：IE8-浏览器不支持cssFloat，但IE浏览器支持styleFloat

<div>
<pre>&lt;div id="test" style="float:left"&gt;&lt;/div&gt;
&lt;script&gt;
//IE8-浏览器返回undefined，其他浏览器返回'left'
console.log(test.style.cssFloat);//'left'
//IE浏览器返回'left'，其他浏览器返回undefined
console.log(test.style.styleFloat);
&lt;/script&gt;</pre>
</div>

**特性操作**

&emsp;&emsp;其实，如果操作行间样式，可以使用元素节点的[特性操作方法](http://www.cnblogs.com/xiaohuochai/p/5819638.html#anchor3)hasAttribute()、getAttribute()、setAttribute()、removeAttribute()等，来操作style属性

<div>
<pre>&lt;div id="test" style="height: 40px;width: 40px;"&gt;&lt;/div&gt;
&lt;script&gt;
console.log(test.hasAttribute('style'));//true
console.log(test.getAttribute('style'));//'height: 40px;width: 40px;'
test.setAttribute('style','height:10px;');
console.log(test.getAttribute('style'));//'height:10px;'
test.removeAttribute('style');
console.log(test.hasAttribute('style'));//false
console.log(test.getAttribute('style'));//null
&lt;/script&gt;</pre>
</div>

&nbsp;

### 属性

**cssText**

&emsp;&emsp;通过cssText属性能够访问到style特性中的CSS代码。在读模式下，cssText返回浏览器对style特性中CSS代码的内部表示；在写模式中，赋给cssText的值会重写整个style特性的值

&emsp;&emsp;设置cssText是为元素应用多项变化最快捷的方法，因为可以一次性应用所有变化

&emsp;&emsp;注意：IE8-浏览器返回的属性名是全大写的

<div>
<pre>&lt;div id="test" style="height: 40px;width: 40px;"&gt;&lt;/div&gt;
&lt;script&gt;
//IE8-浏览器返回'HEIGHT: 40px; WIDTH: 40px;'，其他浏览器返回'height: 40px; width: 40px;'
console.log(test.style.cssText);
test.style.cssText= 'height:20px';
//IE8-浏览器返回'HEIGHT: 20px;'，其他浏览器返回'height: 20px;'
console.log(test.style.cssText);
&lt;/script&gt;</pre>
</div>

**length**

&emsp;&emsp;length属性返回内联样式中的样式个数

&emsp;&emsp;注意：IE8-浏览器不支持

<div>
<pre>&lt;div id="test" style="height: 40px;width: 40px;"&gt;&lt;/div&gt;
&lt;script&gt;
console.log(test.style.length);//2
&lt;/script&gt;</pre>
</div>

**parentRule**

&emsp;&emsp;parentRule属性表示CSS信息的CSSRule对象

&emsp;&emsp;注意：IE8-浏览器不支持

<div>
<pre>&lt;div id="test" style="height: 40px;width: 40px;"&gt;&lt;/div&gt;
&lt;script&gt;
//IE8-浏览器返回undefined，其他浏览器返回null
console.log(test.style.parentRule);
&lt;/script&gt;</pre>
</div>

&nbsp;

### 方法

**item()**

&emsp;&emsp;item()方法返回给定位置的CSS属性的名称，也可以使用方括号语法

&emsp;&emsp;注意：IE8-浏览器不支持item()方法，只支持方括号语法

<div>
<pre>&lt;div id="test" style="height: 40px;width: 40px;background-color: pink;"&gt;&lt;/div&gt;
&lt;script&gt;
//IE9+浏览器返回'width'，IE8-浏览器报错，其他浏览器返回'height'
console.log(test.style.item(0));
//IE9+浏览器返回'width'，IE8-浏览器返回'WIDTH'，其他浏览器返回'height'
console.log(test.style[0])
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;由上面代码可知，IE浏览器返回值与其他浏览器有差异

**getPropertyValue()**

&emsp;&emsp;getPropertyValue()方法返回给定属性的字符串值

&emsp;&emsp;注意：IE8-浏览器不支持

<div>
<pre>&lt;div id="test" style="height: 40px;width: 40px;background-color: pink;"&gt;&lt;/div&gt;
&lt;script&gt;
//IE8-浏览器报错，其他浏览器返回'pink'
console.log(test.style.getPropertyValue('background-color'));
console.log(test.style.backgroundColor);//'pink'
console.log(test.style['background-color']);//'pink'
console.log(test.style['backgroundColor']);//'pink'
&lt;/script&gt;</pre>
</div>

**getPropertyCSSValue()**

&emsp;&emsp;getPropertyCSSValue()方法返回包含两个属性的CSSRule类型，这两个属性分别是cssText和cssValueType。其中cssText属性的值与getPropertyValue()返回的值相同，而cssValueType属性则是一个数值常量，表示值的类型：0表示继承的值，1表示基本的值，2表示值列表，3表示自定义的值

&emsp;&emsp;注意：该方法只有safari支持

<div>
<pre>&lt;div id="test" style="height: 40px;width: 40px;background-color: pink;"&gt;&lt;/div&gt;
&lt;script&gt;
//cssText:"rgb(255, 192, 203)" cssValueType: 1 primitiveType: 25
console.log(test.style.getPropertyCSSValue('background-color'));
console.log(test.style.getPropertyCSSValue('background'));//null
&lt;/script&gt;</pre>
</div>

**getPropertyPriority()**

&emsp;&emsp;如果给定的属性使用了!important设置，则返回"important"；否则返回空字符串

&emsp;&emsp;注意：IE8-浏览器不支持

<div>
<pre>&lt;div id="test" style="height: 40px!important;width: 40px;background-color: pink;"&gt;&lt;/div&gt;
&lt;script&gt;
console.log(test.style.getPropertyPriority('height'));//'important'
console.log(test.style.getPropertyPriority('width'));//''
&lt;/script&gt;</pre>
</div>

**setProperty()**

&emsp;&emsp;setProperty(propertyName,value,priority)方法将给定属性设置为相应的值，并加上优先级标志("important"或一个空字符串)，该方法无返回值

&emsp;&emsp;注意：IE8-浏览器不支持

<div>
<pre>&lt;div id="test" style="height: 40px;width: 40px;background-color: pink;"&gt;&lt;/div&gt;
&lt;script&gt;
console.log(test.style.height);//'40px'
test.style.setProperty('height','20px','important');
console.log(test.style.height);//'20px'
test.style.setProperty('height','30px');
//safari浏览器返回'20px'，设置过!important后，再设置非important的属性值则无效
//其他浏览器返回'30px'
console.log(test.style.height);
&lt;/script&gt;</pre>
</div>

**removeProperty()**

&emsp;&emsp;removeProperty()方法从样式中删除给定属性，并返回被删除属性的属性值

&emsp;&emsp;注意：IE8-浏览器不支持

<div>
<pre>&lt;div id="test" style="height: 40px;width: 40px;background-color: pink;"&gt;&lt;/div&gt;
&lt;script&gt;
console.log(test.style.height);//'40px'
console.log(test.style.removeProperty('height'));//'40px'
console.log(test.style.height);//''
console.log(test.style.width);//'40px'
test.style.width = '';
console.log(test.style.width);//''
&lt;/script&gt;</pre>
</div>

**模块侦测**

&emsp;&emsp;CSS的规格发展太快，新的模块层出不穷。不同浏览器的不同版本，对CSS模块的支持情况都不一样。有时候，需要知道当前浏览器是否支持某个模块，这就叫做&ldquo;CSS模块的侦测&rdquo;

&emsp;&emsp;一个比较普遍适用的方法是，判断某个DOM元素的style对象的某个属性值是否为字符串。如果该CSS属性确实存在，会返回一个字符串。即使该属性实际上并未设置，也会返回一个空字符串。如果该属性不存在，则会返回undefined

<div>
<pre>&lt;div id="test"&gt;&lt;/div&gt;
&lt;script&gt;
//IE9-浏览器和safari返回undefined，其他浏览器都返回''，所以IE9-浏览器和safari不支持animation
console.log(test.style.animation)    
//IE和firefox浏览器返回undefined，chrome和safari浏览器都返回''，所以IE和firefox浏览器不支持WebkitAnimation
console.log(test.style.WebkitAnimation)
&lt;/script&gt;</pre>
</div>

**CSS.supports()**

&emsp;&emsp;CSS.supports()方法返回一个布尔值，表示是否支持某条CSS规则

&emsp;&emsp;注意：safari和IE浏览器不支持

<div>
<pre>&lt;script&gt;
//chrome和firefox浏览器返回true，其他浏览器报错
console.log(CSS.supports('transition','1s'));
&lt;/script&gt;</pre>
</div>
