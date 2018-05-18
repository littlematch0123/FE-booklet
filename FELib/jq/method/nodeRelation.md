# jQuery节点关系

&emsp;&emsp;DOM可以将任何HTML描绘成一个由多层节点构成的结构。节点之间的关系构成了层次，而所有页面标记则表现为一个以特定节点为根节点的树形结构。下图表示了[DOM间的节点关系](http://www.cnblogs.com/xiaohuochai/p/5785297.html)，而jQuery也存在类似的方法来描述节点关系

![jq_method1](https://pic.xiaohuochai.site/blog/jq_method1.jpg)

### 后代元素

【children()】

&emsp;&emsp;jQuery是一个集合对象，如果想快速查找合集里面的第一级子元素，此时可以用children()方法

&emsp;&emsp;children()方法允许通过在DOM树中对这些元素的直接子元素进行搜索，并且构造一个新的匹配元素的jQuery对象

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div&gt;
    &lt;i&gt;1&lt;/i&gt;
    &lt;b&gt;2&lt;/b&gt;
    &lt;i&gt;3&lt;/i&gt;
&lt;/div&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('div').children().css('border','1px solid red');    
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/node/n1.html" frameborder="0" width="320" height="240"></iframe>

**children([selector])**

&emsp;&emsp;children()方法可以接受一个用于匹配元素的选择器字符串作为参数

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div&gt;
    &lt;i&gt;1&lt;/i&gt;
    &lt;b&gt;2&lt;/b&gt;
    &lt;i&gt;3&lt;/i&gt;
&lt;/div&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('div').children('i').css('border','1px solid red');    
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/node/n2.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;注意：children()方法只能找出第一级子元素

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="box"&gt;
    &lt;div&gt;
        &lt;i&gt;1&lt;/i&gt;
        &lt;b&gt;2&lt;/b&gt;
        &lt;i&gt;3&lt;/i&gt;
    &lt;/div&gt;    
&lt;/div&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('#box').children().css('border','1px solid red');    
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 70px;" src="https://demo.xiaohuochai.site/jquery/node/n3.html" frameborder="0" width="320" height="240"></iframe>

【find()】

&emsp;&emsp;find()方法通过一个选择器，jQuery对象，或元素过滤，得到当前匹配的元素集合中每个元素的后代，匹配的元素将构造一个新的jQuery对象

&emsp;&emsp;find()和children()方法是相似的，只是children()方法查找子元素，而find()方法查找后代元素

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="box"&gt;
    &lt;div&gt;
        &lt;i&gt;1&lt;/i&gt;
        &lt;b&gt;2&lt;/b&gt;
        &lt;div&gt;3&lt;/div&gt;
    &lt;/div&gt;    
&lt;/div&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('#box').find('div').css('border','1px solid red');    
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 90px;" src="https://demo.xiaohuochai.site/jquery/node/n4.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;注意：find()方法必须有参数才有效。如果想要查找所有后代元素，需要传递参数为'*'

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div id="box"&gt;
    &lt;div&gt;
        &lt;i&gt;1&lt;/i&gt;
        &lt;b&gt;2&lt;/b&gt;
        &lt;i&gt;3&lt;/i&gt;
    &lt;/div&gt;    
&lt;/div&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('#box').find('*').css('border','1px solid red');    
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 70px;" src="https://demo.xiaohuochai.site/jquery/node/n5.html" frameborder="0" width="320" height="240"></iframe>

【contents()】

&emsp;&emsp;contents()方法获得匹配元素集合中每个元素的子元素，包括文字和注释节点，这个方法不接受任何参数

&emsp;&emsp;contents()和children()方法类似，只不过前者包括文本节点以及jQuery对象中产生的HTML元素

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div&gt;
  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed 
  do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  &lt;br /&gt;&lt;br /&gt;
  Ut enim ad minim veniam, quis nostrud exercitation ullamco 
  laboris nisi ut aliquip ex ea commodo consequat.
&lt;/div&gt;
&lt;script&gt;
    console.log($('div').children())//[br, br, prevObject: init[1], context: document]
    console.log($('div').contents())//[text, br, br, text, prevObject: init[1], context: document]
&lt;/script&gt;</pre>
</div>

【contains()】

&emsp;&emsp;contains(container, contained)是一个[工具方法](http://www.cnblogs.com/xiaohuochai/p/6514175.html)，用来检查一个DOM元素是否是另一个DOM元素的后代

&emsp;&emsp;如果第二个参数所提供的DOM元素是第一个参数DOM元素的后裔，那么$.contains()方法返回true，无论是直接的子元素或者是后代元素。否则，返回false

&emsp;&emsp;注意：该方法只支持元素节点，如果第二个参数是一个文本或注释节点，$.contains()将返回 false

<div>
<pre>console.log($.contains( document.documentElement, document.body ));//true
console.log($.contains( document.body, document.documentElement ));//false</pre>
</div>

&nbsp;

### 祖先元素

【parent()】

&emsp;&emsp;parent()方法能够在DOM树中搜索到这些元素的父级元素

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div&gt;
    &lt;i&gt;1&lt;/i&gt;
    &lt;b&gt;2&lt;/b&gt;
    &lt;i&gt;3&lt;/i&gt;
&lt;/div&gt;    
&lt;p&gt;
    &lt;i&gt;1&lt;/i&gt;
    &lt;b&gt;2&lt;/b&gt;
    &lt;i&gt;3&lt;/i&gt;    
&lt;/p&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('i').parent().css('border','1px solid red');    
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/jquery/node/n6.html" frameborder="0" width="320" height="240"></iframe>

**parent([selector])**

&emsp;&emsp;parent()方法可以接受一个用于匹配元素的选择器表达式字符串作为参数进行筛选

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div&gt;
    &lt;i&gt;1&lt;/i&gt;
    &lt;b&gt;2&lt;/b&gt;
    &lt;i&gt;3&lt;/i&gt;
&lt;/div&gt;    
&lt;p&gt;
    &lt;i&gt;1&lt;/i&gt;
    &lt;b&gt;2&lt;/b&gt;
    &lt;i&gt;3&lt;/i&gt;    
&lt;/p&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('i').parent('div').css('border','1px solid red');    
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/jquery/node/n7.html" frameborder="0" width="320" height="240"></iframe>

【parents()】

&emsp;&emsp;与parent()方法不同，parents()方法获取的是祖先元素，而parent()方法获取的是父级元素

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div&gt;
    &lt;i&gt;1&lt;/i&gt;
    &lt;i&gt;&lt;b&gt;2&lt;/b&gt;&lt;/i&gt;
    &lt;i&gt;3&lt;/i&gt;
&lt;/div&gt;    
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('b').parents().css('border','1px solid red');    
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 70px;" src="https://demo.xiaohuochai.site/jquery/node/n8.html" frameborder="0" width="320" height="240"></iframe>

**parents([selector])**

&emsp;&emsp;parents()方法可以接受一个用于匹配元素的选择器表达式字符串作为参数进行筛选

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div&gt;
    &lt;i&gt;1&lt;/i&gt;
    &lt;i&gt;&lt;b&gt;2&lt;/b&gt;&lt;/i&gt;
    &lt;i&gt;3&lt;/i&gt;
&lt;/div&gt;    
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('b').parents('div').css('border','1px solid red');    
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 70px;" src="https://demo.xiaohuochai.site/jquery/node/n9.html" frameborder="0" width="320" height="240"></iframe>

【parentsUntil()】

&emsp;&emsp;parent()方法匹配父元素，parents()方法匹配祖先元素，而parentsUntil()方法则在parents()方法的基础上，确定匹配到哪个祖先元素时停止匹配

**parentsUntil([selector][,filter])**

&emsp;&emsp;parentsUntil()方法接受两个参数。第一个参数是一个选择器字符串、DOM节点或jQuery对象，用于确定到哪个祖先元素时停止匹配，不包括参数中的元素。第二个参数是一个筛选字符串，用于匹配元素的选择器字符串

&emsp;&emsp;当parentsUntil()方法没有参数时，和parents()方法作用相同

【1】没有参数时

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div&gt;
    &lt;i&gt;1&lt;/i&gt;
    &lt;i&gt;&lt;b&gt;2&lt;/b&gt;&lt;/i&gt;
    &lt;i&gt;3&lt;/i&gt;
&lt;/div&gt;    
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('b').parentsUntil().css('border','1px solid red');    
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 70px;" src="https://demo.xiaohuochai.site/jquery/node/n10.html" frameborder="0" width="320" height="240"></iframe>

【2】存在一个参数时

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div&gt;
    &lt;i&gt;1&lt;/i&gt;
    &lt;i&gt;&lt;b&gt;2&lt;/b&gt;&lt;/i&gt;
    &lt;i&gt;3&lt;/i&gt;
&lt;/div&gt;    
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('b').parentsUntil('div').css('border','1px solid red');    
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/node/n11.html" frameborder="0" width="320" height="240"></iframe>

【3】存在两个参数时

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div&gt;
    &lt;i&gt;1&lt;/i&gt;
    &lt;i&gt;&lt;b&gt;2&lt;/b&gt;&lt;/i&gt;
    &lt;i&gt;3&lt;/i&gt;
&lt;/div&gt;    
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('b').parentsUntil('body','div').css('border','1px solid red');    
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 70px;" src="https://demo.xiaohuochai.site/jquery/node/n12.html" frameborder="0" width="320" height="240"></iframe>

【closest(selector)】

&emsp;&emsp;closest()方法从自身元素开始(包括自身元素)，在DOM树中向上遍历，直到找到了与提供的选择器相匹配的元素，返回包含零个或一个元素的jQuery对象

&emsp;&emsp;closest()方法的参数是一个用于匹配元素的选择器字符串、jQuery对象或DOM元素。若匹配，则返回该元素的jQuery对象，否则，返回包含0个元素的jQuery对象&nbsp;

&emsp;&emsp;注意：closest()方法必须接受参数，否则无效

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div&gt;
    &lt;i&gt;1&lt;/i&gt;
    &lt;i&gt;&lt;b&gt;2&lt;/b&gt;&lt;/i&gt;
    &lt;i&gt;3&lt;/i&gt;
&lt;/div&gt;    
&lt;button id="btn1"&gt;按钮一&lt;/button&gt;
&lt;button id="btn2"&gt;按钮二&lt;/button&gt;
&lt;button id="btn3"&gt;按钮三&lt;/button&gt;
&lt;script&gt;
$('#btn1').click(function(){
    $('b').closest('p').css('border','1px solid red');
})
$('#btn2').click(function(){
    $('b').closest('b').css('border','1px solid red');
})
$('#btn3').click(function(){
    $('b').closest('body').css('border','1px solid red');
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 70px;" src="https://demo.xiaohuochai.site/jquery/node/n13.html" frameborder="0" width="320" height="240"></iframe>

### 兄弟元素

【siblings([selector])】

&emsp;&emsp;siblings()方法可以获得匹配元素集合中每个元素的兄弟元素&emsp;&emsp;

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;ul&gt;
   &lt;li&gt;list item 1&lt;/li&gt;
   &lt;li&gt;list item 2&lt;/li&gt;
   &lt;li class="third-item"&gt;list item 3&lt;/li&gt;
   &lt;li&gt;list item 4&lt;/li&gt;
   &lt;li&gt;list item 5&lt;/li&gt;
&lt;/ul&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('.third-item').siblings().css('border','1px solid red');    
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/jquery/node/n14.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;siblings()方法可以接受一个用于匹配元素的选择器字符串作为参数来筛选元素

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;ul&gt;
   &lt;li&gt;list item 1&lt;/li&gt;
   &lt;li&gt;list item 2&lt;/li&gt;
   &lt;li class="third-item"&gt;list item 3&lt;/li&gt;
   &lt;li&gt;list item 4&lt;/li&gt;
   &lt;li&gt;list item 5&lt;/li&gt;
&lt;/ul&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('.third-item').siblings(':contains("1")').css('border','1px solid red');    
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/jquery/node/n15.html" frameborder="0" width="320" height="240"></iframe>

【next([selector])】

&emsp;&emsp;next()方法返回匹配的元素集合中每一个元素紧邻的后面兄弟元素的元素集合

&emsp;&emsp;next()方法接受一个选择器字符串作为参数，只有紧跟着的兄弟元素满足选择器时，才会返回此元素

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div&gt;
    &lt;i&gt;1&lt;/i&gt;
    &lt;b&gt;&lt;i&gt;2&lt;/i&gt;&lt;/b&gt;
    &lt;i&gt;3&lt;/i&gt;
&lt;/div&gt;    
&lt;button id="btn1"&gt;按钮一&lt;/button&gt;
&lt;button id="btn2"&gt;按钮二&lt;/button&gt;
&lt;button id="btn3"&gt;按钮三&lt;/button&gt;
&lt;script&gt;
$('#btn1').click(function(){
    $('b').next().css('border','1px solid red');    
})
$('#btn2').click(function(){
    $('i:contains("2")').next().css('border','1px solid red');    
})
$('#btn3').click(function(){
    $('b').next('b').css('border','1px solid red');    
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/node/n16.html" frameborder="0" width="320" height="240"></iframe>

【nextAll()】

&emsp;&emsp;next()方法表示当前元素的后一个兄弟元素，而nextAll()方法表示当前元素后面的所有兄弟元素

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;ul&gt;
   &lt;li&gt;list item 1&lt;/li&gt;
   &lt;li&gt;list item 2&lt;/li&gt;
   &lt;li class="third-item"&gt;list item 3&lt;/li&gt;
   &lt;li&gt;list item 4&lt;/li&gt;
   &lt;li&gt;list item 5&lt;/li&gt;
&lt;/ul&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('.third-item').nextAll().css('border','1px solid red');    
})
&lt;/script&gt;
</pre>
</div>

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/jquery/node/n17.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;nextAll()方法可以接受一个选择器字符串用于筛选元素

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;ul&gt;
   &lt;li&gt;list item 1&lt;/li&gt;
   &lt;li&gt;list item 2&lt;/li&gt;
   &lt;li class="third-item"&gt;list item 3&lt;/li&gt;
   &lt;li&gt;list item 4&lt;/li&gt;
   &lt;li&gt;list item 5&lt;/li&gt;
&lt;/ul&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('.third-item').nextAll(':contains("4")').css('border','1px solid red');    
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/jquery/node/n18.html" frameborder="0" width="320" height="240"></iframe>

【nextUntil()】

&emsp;&emsp;nextUntil()方法接受两个参数。第一个参数是一个选择器字符串、DOM节点或jQuery对象，用于确定到哪个兄弟元素时停止匹配，不包括参数中的元素。第二个参数是一个筛选字符串，用于匹配元素的选择器表达式字符串

&emsp;&emsp;当nextUntil()方法没有参数时，和nextAll()方法作用相同

【1】没有参数时

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;ul&gt;
   &lt;li&gt;list item 1&lt;/li&gt;
   &lt;li&gt;list item 2&lt;/li&gt;
   &lt;li class="third-item"&gt;list item 3&lt;/li&gt;
   &lt;li&gt;list item 4&lt;/li&gt;
   &lt;li&gt;list item 5&lt;/li&gt;
&lt;/ul&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('.third-item').nextUntil().css('border','1px solid red');    
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/jquery/node/n19.html" frameborder="0" width="320" height="240"></iframe>

【2】有一个参数时

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;ul&gt;
   &lt;li&gt;list item 1&lt;/li&gt;
   &lt;li&gt;list item 2&lt;/li&gt;
   &lt;li class="third-item"&gt;list item 3&lt;/li&gt;
   &lt;li&gt;list item 4&lt;/li&gt;
   &lt;li&gt;list item 5&lt;/li&gt;
&lt;/ul&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('.third-item').nextUntil('li:last').css('border','1px solid red');    
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/jquery/node/n20.html" frameborder="0" width="320" height="240"></iframe>

【3】有两个参数时

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;ul&gt;
   &lt;li&gt;list item 1&lt;/li&gt;
   &lt;li&gt;list item 2&lt;/li&gt;
   &lt;li class="third-item"&gt;list item 3&lt;/li&gt;
   &lt;li&gt;list item 4&lt;/li&gt;
   &lt;li&gt;list item 5&lt;/li&gt;
&lt;/ul&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('.third-item').nextUntil('li:last',':contains("4")').css('border','1px solid red');    
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/jquery/node/n21.html" frameborder="0" width="320" height="240"></iframe>

【prev([selector])】

&emsp;&emsp;prev()方法返回匹配的元素集合中每一个元素紧邻的前面兄弟元素的元素集合

&emsp;&emsp;prev()方法接受一个选择器字符串作为参数，只有前面紧跟着的兄弟元素满足选择器时，才会返回此元素

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;div&gt;
    &lt;i&gt;1&lt;/i&gt;
    &lt;b&gt;&lt;i&gt;2&lt;/i&gt;&lt;/b&gt;
    &lt;i&gt;3&lt;/i&gt;
&lt;/div&gt;    
&lt;button id="btn1"&gt;按钮一&lt;/button&gt;
&lt;button id="btn2"&gt;按钮二&lt;/button&gt;
&lt;button id="btn3"&gt;按钮三&lt;/button&gt;
&lt;script&gt;
$('#btn1').click(function(){
    $('b').prev().css('border','1px solid red');    
})
$('#btn2').click(function(){
    $('i:contains("2")').prev().css('border','1px solid red');    
})
$('#btn3').click(function(){
    $('b').prev('b').css('border','1px solid red');    
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/jquery/node/n22.html" frameborder="0" width="320" height="240"></iframe>

【prevAll()】

&emsp;&emsp;prev()方法表示当前元素的前一个兄弟元素，而prevAll()方法表示当前元素前面的所有兄弟元素

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;ul&gt;
   &lt;li&gt;list item 1&lt;/li&gt;
   &lt;li&gt;list item 2&lt;/li&gt;
   &lt;li class="third-item"&gt;list item 3&lt;/li&gt;
   &lt;li&gt;list item 4&lt;/li&gt;
   &lt;li&gt;list item 5&lt;/li&gt;
&lt;/ul&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('.third-item').prevAll().css('border','1px solid red');    
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/jquery/node/n23.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;prevAll()方法可以接受一个选择器字符串用于筛选元素

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;ul&gt;
   &lt;li&gt;list item 1&lt;/li&gt;
   &lt;li&gt;list item 2&lt;/li&gt;
   &lt;li class="third-item"&gt;list item 3&lt;/li&gt;
   &lt;li&gt;list item 4&lt;/li&gt;
   &lt;li&gt;list item 5&lt;/li&gt;
&lt;/ul&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('.third-item').prevAll(':contains("2")').css('border','1px solid red');    
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/jquery/node/n24.html" frameborder="0" width="320" height="240"></iframe>

【prevUntil()】

&emsp;&emsp;prevUntil()方法接受两个参数。第一个参数是一个选择器字符串、DOM节点或jQuery对象，用于确定到哪个兄弟元素时停止匹配，不包括参数中的元素。第二个参数是一个筛选字符串，用于匹配元素的选择器表达式字符串

&emsp;&emsp;当prevUntil()方法没有参数时，和prevAll()方法作用相同

【1】没有参数时

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;ul&gt;
   &lt;li&gt;list item 1&lt;/li&gt;
   &lt;li&gt;list item 2&lt;/li&gt;
   &lt;li class="third-item"&gt;list item 3&lt;/li&gt;
   &lt;li&gt;list item 4&lt;/li&gt;
   &lt;li&gt;list item 5&lt;/li&gt;
&lt;/ul&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('.third-item').prevUntil().css('border','1px solid red');    
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/jquery/node/n25.html" frameborder="0" width="320" height="240"></iframe>

【2】有一个参数时

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;ul&gt;
   &lt;li&gt;list item 1&lt;/li&gt;
   &lt;li&gt;list item 2&lt;/li&gt;
   &lt;li class="third-item"&gt;list item 3&lt;/li&gt;
   &lt;li&gt;list item 4&lt;/li&gt;
   &lt;li&gt;list item 5&lt;/li&gt;
&lt;/ul&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('.third-item').prevUntil('li:first').css('border','1px solid red');    
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/jquery/node/n26.html" frameborder="0" width="320" height="240"></iframe>

【3】有两个参数时

<div>
<pre>&lt;script src="http://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"&gt;&lt;/script&gt;
&lt;ul&gt;
   &lt;li&gt;list item 1&lt;/li&gt;
   &lt;li&gt;list item 2&lt;/li&gt;
   &lt;li class="third-item"&gt;list item 3&lt;/li&gt;
   &lt;li&gt;list item 4&lt;/li&gt;
   &lt;li&gt;list item 5&lt;/li&gt;
&lt;/ul&gt;
&lt;button id="btn"&gt;按钮&lt;/button&gt;
&lt;script&gt;
$('#btn').click(function(){
    $('.third-item').prevUntil('li:first',':contains("2")').css('border','1px solid red');    
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/jquery/node/n27.html" frameborder="0" width="320" height="240"></iframe>