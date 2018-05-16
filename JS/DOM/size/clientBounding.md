# 深入理解元素视图的3个方法

&emsp;&emsp;前面介绍了[offset偏移](http://www.cnblogs.com/xiaohuochai/p/5828369.html)、[client客户区](http://www.cnblogs.com/xiaohuochai/p/5830053.html)和[scroll滚动](http://www.cnblogs.com/xiaohuochai/p/5831640.html)，这三部分主要从属性的角度来对元素尺寸信息进行获取和修改。本文主要介绍元素视图的三个方法，包括getBoundingClientRect()、getClientRects()和elementFromPoint()

&nbsp;

### getBoundingClientRect()

&emsp;&emsp;判断一个元素的尺寸和位置最简单的方法就是使用getBoundingClientRect()

&emsp;&emsp;Element.getBoundingClientRect()方法返回一个对象，该对象提供当前元素节点的大小、它相对于视口(viewport)的位置等信息。但是，各个浏览器返回的对象包含的属性不相同

<div>
<pre>firefox: top left right bottom width height x y(其中，x=left，y=top)
chrome/safari/IE9+:top left right bottom width height
IE8-:  top left right bottom</pre>
</div>

&emsp;&emsp;问题来了，该方法返回的width和height是客户区宽高client，还是滚动宽高scroll，或者是偏移宽高offset，或者是设置宽高呢

<div>
<pre>&lt;div id="test" style="width: 100px;height: 100px;padding: 10px;line-height: 200px;border:1px solid black;overflow:scroll"&gt;内容&lt;/div&gt;    
&lt;script&gt;
//chrome/safari: 220(10+200+10)
//firefox/IE: 210(10+200)
console.log(test.scrollHeight)
//103(100+10+10-17)
console.log(test.clientHeight)
//122(100+10+10+1+1)
console.log(test.offsetHeight)
//122(100+10+10+1+1)
console.log(test.getBoundingClientRect().height)
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;由代码结果看出，该方法返回的宽高是偏移宽高offset

<div>
<pre>Element.getBoundingClientRect().width =  border-left-width + padding-left + width + padding-right + border-right-width
Element.getBoundingClientRect().height =  border-top-width + padding-top + height + padding-bottom + border-bottom-width</pre>
</div>

&emsp;&emsp;下面来分析top、left、right、bottom这四个值

&emsp;&emsp;top: &nbsp; 元素顶部相对于视口的纵坐标

&emsp;&emsp;left: &nbsp;元素左边界相对视口的横坐标

&emsp;&emsp;right: 元素右边界相对视口的横坐标

&emsp;&emsp;bottom:元素底部相对于视口的纵坐标

<div>
<pre>bottom = top + height
right = left + width</pre>
</div>

&emsp;&emsp;注意：该方法的所有属性值都没有单位，且给定的是元素在页面中相对于视口的位置

&emsp;&emsp;问题又来了，相对于视口和相对于页面有什么区别。理论上，与absolute和fixed的区别类似，但表现上与它们正相反。发生滚动时，fixed元素保持不动是为了保持与视口的原始距离；而发生滚动时，getBoundingClientRect()方法的top、left、right、bottom这四个值相应的发生改变，是因为元素位置移动了，与视口距离自然也改变了

**bug**

&emsp;&emsp;IE7-浏览器把视口的左上角坐标设置为(2,2)，其他浏览器则将(0,0)作为起点坐标

<div>
<pre>&lt;body style="margin:0"&gt;
&lt;div id="test" style="width: 100px;height: 50px;padding: 10px;line-height: 200px;overflow:scroll;border:1px solid black"&gt;内容&lt;/div&gt;    
&lt;script&gt;
//chrome/firefox/safari/IE8+ 0 72(50+10+10+1+1)
//IE7- 2 74(72+2)
console.log(test.getBoundingClientRect().top,test.getBoundingClientRect().bottom)
//chrome/firefox/safari/IE8+ 0 122(100+10+10+1+1)
//IE71 2 124(122+2)
console.log(test.getBoundingClientRect().left,test.getBoundingClientRect().right)
&lt;/script&gt;
&lt;/body&gt;</pre>
</div>

**兼容**

&emsp;&emsp;可以利用IE7-浏览器中特性节点的specified属性实现浏览器识别

<div>
<pre>function getBoundingClientRect(obj){
    var temp = obj.getBoundingClientRect();
    //IE7-浏览器
    if(Boolean(obj.attributes[0]) &amp;&amp; !obj.attributes[0].specified){
        return{
            left: temp.left -2,
            top: temp.top -2,
            right: temp.right -2,
            bottom: temp.bottom -2
        }
    }else{
        return temp;
    }    
}</pre>
</div>

&nbsp;

### getClientRects()

&emsp;&emsp;getClientRects()方法与getBoundingClientRect()不同，该方法是一个返回元素的数个矩形区域的类数组对象。每个类数组对象的参数与getBoundingClientRect()方法相同，每个矩形都有bottom、height、left、right、top和width六个属性，表示它们相对于视口的四个坐标，以及本身的高度和宽度

&emsp;&emsp;如果应用于块级元素，则getClientRects()[0]和getBoundingClientRect()的属性返回相同的值，且IE7-浏览器在getClientRects()方法中，同样存在视口左上角坐标被设置为(2,2)的bug

<div>
<pre>&lt;body style="margin:0"&gt;
&lt;div id="test" style="width: 100px;height: 50px;padding: 10px;line-height: 200px;overflow:scroll;border:1px solid black"&gt;内容&lt;/div&gt;    
&lt;script&gt;
//其他浏览器返回0 0， IE7-浏览器返回 2 2 
console.log(test.getClientRects()[0].top,test.getBoundingClientRect().top)
//其他浏览器返回0 0， IE7-浏览器返回 2 2 
console.log(test.getClientRects()[0].left,test.getBoundingClientRect().left)
//72(50+10+10+1+1) 72
console.log(test.getClientRects()[0].height,test.getBoundingClientRect().height)
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;实际上，该方法主要用于内联元素，内联元素有多少行，该方法返回的对象有多少个成员。这个方法主要用于判断行内元素是否换行，以及行内元素的每一行的位置偏移

<div>
<pre>&lt;body style="margin:0"&gt;
&lt;div style="width:100px;"&gt;&lt;span id="el"&gt;
Hello World
Hello World
Hello World
&lt;/span&gt;&lt;/div&gt;
&lt;script&gt;
console.log(el.getClientRects().length); // 3
console.log(el.getClientRects()[0].left); // 0
console.log(el.getClientRects()[0].right); // 88
console.log(el.getClientRects()[0].bottom); // 17
console.log(el.getClientRects()[0].height); // 16
console.log(el.getClientRects()[0].width); // 88
&lt;/script&gt;
&lt;/body&gt;</pre>
</div>

&nbsp;

### elementFromPoint()

&emsp;&emsp;getBoundingClientRect(x,y)方法使我们能在视口中判定元素的位置。但有时我们想反过来，判定在视口中的指定位置上有什么元素。这可以用Document对象的elementFromPoint()方法来判定。传递X和Y坐标(相对于视口)，该方法选择在指定坐标的最上层和最里层的Element对象。如果指定的点在视口以外，elementFromPoint()返回null

&emsp;&emsp;注意：最上层是指[z-index](http://www.cnblogs.com/xiaohuochai/p/5304619.html)最大的元素；最里层是指最里层的子元素

&emsp;&emsp;这个方法可以用来检测元素是否发生重叠或是碰撞

<div>
<pre>&lt;body style="margin:0"&gt;
&lt;div id="test" style="width: 100px;height: 100px;"&gt;
    &lt;span id="span1"&gt;123&lt;/span&gt;
&lt;/div&gt;
&lt;script&gt;
console.log(document.elementFromPoint(2,2).id); //span1
&lt;/script&gt;</pre>
</div>
