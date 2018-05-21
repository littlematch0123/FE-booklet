# CSS Why

&emsp;&emsp;对于CSS，要知其然，还要知其所以然。本文将介绍CSS各部分出现的原因，仅限个人理解，如有不妥，欢迎交流

&nbsp;

### Why CSS

&emsp;&emsp;早期的大多数网站标记几乎完全由表格和font元素组成，且对于所要表现的内容不能传达任何实际含义，使文档可用性降低，且不易于维护。于是1995年，W3C发布了CSS草案，试图解决结构与样式混杂的问题

&emsp;&emsp;1、如果考虑结构与样式彻底分离，且样式表可能用于多个HTML文件，使用[外部样式表](http://www.cnblogs.com/xiaohuochai/p/4842562.html#anchor1)

&emsp;&emsp;2、如果样式表仅用于当前页面，且减少[HTTP](http://www.cnblogs.com/xiaohuochai/p/6392010.html)请求数量，使用[内部样式表](http://www.cnblogs.com/xiaohuochai/p/4842562.html#anchor2)

&emsp;&emsp;3、如果只是想为单个元素指定一些样式，可以使用HTML的style属性来设置一个[行间样式](http://www.cnblogs.com/xiaohuochai/p/4842562.html#anchor3)

&nbsp;

### Why 选择器

&emsp;&emsp;通过[CSS选择器](http://www.cnblogs.com/xiaohuochai/p/4979514.html)，向文档中的一组元素类型应用某些规则

&emsp;&emsp;1、通配选择器选择所有元素

&emsp;&emsp;2、元素选择器按照HTML标签来选择元素

&emsp;&emsp;3、类选择器通过定义类名来选择一类元素

&emsp;&emsp;4、ID选择器选择特定ID的元素

&emsp;&emsp;5、属性选择器根据元素的属性及属性值来选择元素

&emsp;&emsp;6、后代选择器通过HTML层级关系来选择元素

&emsp;&emsp;7、分组选择器将具有相同规则的元素合并设置

&nbsp;

### Why 层叠

&emsp;&emsp;CSS（cascading style sheets）中文翻译过来是层叠样式表，最基本的一个特性就是[层叠](http://www.cnblogs.com/xiaohuochai/p/4984509.html)。冲突的声明通过层叠进行排序，由此确定最终的文档表示

&emsp;&emsp;在下面的例子，元素选择器div和类选择器.test都可以选择出&lt;div class="test"&gt;&lt;/div&gt;，这就发生了冲突。由于类选择器的特殊性大于元素选择器，所以通过层叠进行排序，最终该元素的样式为{height: 200px;} ，如果去掉&nbsp;.test{height: 200px;} &nbsp;这条规则，则元素的样式为{height: 100px;}

<div>
<pre>&lt;style&gt;
div{height: 100px;}
.test{height: 200px;}    
&lt;/style&gt;
&lt;div class="test"&gt;&lt;/div&gt;</pre>
</div>

&nbsp;

### Why 解析顺序

&emsp;&emsp;为什么CSS选择器的解析顺序是从右到左呢？先给结论，因为更快

&emsp;&emsp;如果正向解析，例如「div div p em」，首先要检查当前元素到 html 的整条路径，找到最上层的 div，再往下找，如果遇到不匹配就必须回到最上层那个 div，往下再去匹配选择器中的第一个 div，回溯若干次才能确定匹配与否，效率很低

&emsp;&emsp;逆向匹配则不同，如果当前的 DOM 元素是 div，而不是 selector 最后的 em，那只要一步就能排除。只有在匹配时，才会不断向上找父节点进行验证　

&emsp;&emsp;正向解析是在试错，而逆向匹配则是在挑选正确的元素。因为匹配的情况远远低于不匹配的情况，所以逆向匹配带来的优势是巨大的

&nbsp;

### Why Hack

&emsp;&emsp;[CSS Hack](http://www.cnblogs.com/xiaohuochai/p/6383384.html)是实现浏览器样式兼容的兜底办法，能不用就尽量不要使用。但是，针对一些浏览器的bug，比如老版本IE的bug，有时使用CSS Hack是不得已而为之的做法

&emsp;&emsp;比如，对于IE6-浏览器主要使用下划线_和中划线-这两种字符实现hack。如下所示，在IE6浏览器中，div的文本颜色为蓝色，其他浏览器则为红色

<div>
<pre>div{
color:red;
_color:blue;
}</pre>
</div>

&nbsp;

### Why 伪类和伪元素

&emsp;&emsp;个人认为，[伪类](http://www.cnblogs.com/xiaohuochai/p/5518943.html)和[伪元素](http://www.cnblogs.com/xiaohuochai/p/5021121.html)是对HTML元素的一个扩展，通过它们可以丰富元素的样式表现

&emsp;&emsp;伪类即假的类，类似于通过添加一个实际的类来达到效果，比如常见的hover鼠标悬停效果

<div>
<pre>a:hover{background-color:lightblue;}/*浅蓝，鼠标悬停*/</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/css/base/b12.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;伪元素即假的元素，类似于通过添加一个实际的元素才能达到。当然，添加的不是元素，而是生成内容，生成内容主要指由浏览器创建的内容，比如:before和:after

![beforeAndAfter](https://pic.xiaohuochai.site/blog/CSS_grammer_beforeAndAfter.gif)

&nbsp;

### Why 单位

&emsp;&emsp;从广义上讲，单位是一个相对概念，其为事物坐标系中的坐标轴中能构成个体的抽象概念。长度单位是指丈量空间距离上的基本单元，是CSS为了规范长度而制定的基本单位。

&emsp;&emsp;为了更好的丈量和表示页面的长度，CSS规定了绝对长度单位、字体相关的长度单位、视口相关的长度单位

【绝对长度单位】

&emsp;&emsp;绝对长度单位代表一个物理测量，包括像素px(pixels)、英寸in(inches)、英寸in(inches)、英寸in(inches)、英寸in(inches)、1/4毫米q(quarter-millimeters)、点pt(points)、派卡pc(picas)

&emsp;&emsp;在web上，像素px是典型的度量单位，很多其他长度单位直接映射成像素。最终，他们被按照像素处理

<div>
<pre><span>1in = 2.54cm = 96px　
1cm = 10mm = 96px/2.54 = 37.8px
1mm = 0.1cm = 3.78px
1q = 1/4mm = 0.945px
1pt = 1/72in = =0.0139in = 1/72*2.54cm = 1/72*96px = 1.33px
1pc = 12pt = 1/6in = 1/6*96px = 16px</pre>
</div>

【字体相关的长度单位】

&emsp;&emsp;字体相关的相对长度单位包括em、ex、ch、rem

&emsp;&emsp;em表示元素的font-size属性的计算值，如果用于font-size属性本身，相对于父元素的font-size；若用于其他属性，相对于本身元素的font-size

&emsp;&emsp;rem是相对于根元素html的font-size属性的计算值

&emsp;&emsp;ex是指所用字体中小写x的高度。但不同字体x的高度可能不同。实际上，很多浏览器取em值一半作为ex值

&emsp;&emsp;ch与ex类似，被定义为数字0的宽度。当无法确定数字0宽度时，取em值的一半作为ch值

【视口相关的长度单位】

&emsp;&emsp;视口相关的长度值相对于初始包含块的大小。当初始包含块的宽高变化时，他们都会相应地缩放。然而，当根元素的overflow值为auto时，任何滚动条会假定不存在

&emsp;&emsp;关于视口相关的单位有vh、vw、vmin、vmax4个单位

<div>
<pre><span>vh:布局视口高度的 1/100
vw:布局视口宽度的 1/100
vmin:布局视口高度和宽度之间的最小值的 1/100
vmax:布局视口高度和宽度之间的最大值的 1/100</pre>
</div>

&nbsp;

### Why 盒模型

&emsp;&emsp;[盒模型](http://www.cnblogs.com/xiaohuochai/p/5202597.html)是CSS布局的基础，它描述了一个元素在文档布局中所占的空间大小。而且，每个框影响着其他元素框的位置和大小

![box](https://pic.xiaohuochai.site/blog/CSS_grammer_box.png)

【box-sizing】

&emsp;&emsp;在CSS中[盒模型](http://www.cnblogs.com/xiaohuochai/p/5202597.html)被分为两种，第一种是W3C的标准模型，第二种是IE怪异盒模型。不同之处在于后者的宽高定义的是可见元素框的尺寸，而不是元素框的内容区尺寸。目前对于浏览器大多数元素都是基于W3C标准的盒模型，但对于表单form中的部分元素还是基于IE的怪异盒模型，如input里的radio、checkbox、button等元素，如果给其设置border和padding它们也只会往元素盒内延伸

&emsp;&emsp;在W3C的标准模型下，宽度和高度仅仅包含了内容宽度，除去了边框和内边距两个区域，这样为web设计师处理效果带来了不少麻烦。为了解决这个问题，CSS3新增了一个盒模型属性box-sizing，能够事先定义盒模型的尺寸解析方式

<iframe style="width: 100%; height: 340px;" src="https://demo.xiaohuochai.site/css/box/b33.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### Why margin重叠

&emsp;&emsp;在网页布局中，因为margin重叠的原因，我们常常把margin作为一个&ldquo;问题样式&rdquo;而尽量少地使用它。但实际上，它是在很大的作用的

&emsp;&emsp;HTML文档创建的初衷只是用来展示信息的。HTML文档只使用默认样式的前提下，如果上下margin不发生重叠，则会出现以下几个问题：1、连续段落或列表之类，如果没有margin重叠，首尾项间距会和其他兄弟元素呈现1:2的关系，排版不自然；2、web中任何地方嵌套或直接放入任何裸div，都会影响原生的布局，与web设计原则相违背；3、遗落的空的任意多个p标签，会影响原来的阅读排版

&emsp;&emsp;所以，我们要善用重叠，可以在列表项中同时使用margin-top和margin-bottom。这样，使页面结构更具有健壮性，最后一个元素移除或位置调换，都不会破坏原生的布局

**【-webkit-margin-collapse】**

<div>
<pre>-webkit-margin-collapse: &lt;collapse&gt;(默认重叠) | &lt;discard&gt;(取消) | &lt;separate&gt;(分隔)</pre>
</div>

&emsp;&emsp;该属性用于设置margin是否重叠，作用于发生margin重叠的两个元素之一。如果，两个都使用该属性，一个设置为discard，一个设置为separate，则最终效果为重叠collase

<iframe style="width: 100%; height: 380px" src="https://demo.xiaohuochai.site/css/margin/m66.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

&nbsp;

### Why auto

&emsp;&emsp;理解[视觉格式化](http://www.cnblogs.com/xiaohuochai/p/6252163.html)，可以确定得到的效果是应该显示的正确效果，还是浏览器兼容性的bug。视觉格式化中比较重要的一个概念就是auto，auto值是用来弥补实际值与所需总和的差距

【为什么块级元素的宽度默认撑满父级元素】

&emsp;&emsp;因为块级元素width默认值为auto，而margin、border和padding默认值都为0，依据块级元素框的水平总和等于父元素的width的计算公式，块级元素的宽度width默认等于包含块也就是父元素的宽度width

【为什么块级元素设置宽度后，默认居左显示】

&emsp;&emsp;因为为块级元素设置宽度后，而margin、border和padding默认值都为0，依据块级元素框的水平总和等于父元素的width的计算公式。 这种情况，叫做格式化属性过分受限(overconstrained)，此时总会把margin-right强制为auto，从而使居左显示，margin-right来补足剩余的宽度

【为什么固定宽度的块级元素设置margin:auto可以实现水平居中显示】

&emsp;&emsp;同样依据块级元素框的水平总和等于父元素的width的计算公式，border、padding为0，设置固定宽度后，margin-left和margin-right平分剩余的宽度

【为什么块级元素的高度默认为元素自身高度】

&emsp;&emsp;个人认为，这与浏览器先从左到右，再从上到下的渲染机制有关。这种渲染机制决定了宽度值是确定的，高度值是元素自身高度。如果高度值也是确定的，即视口高度，则每渲染一个块级元素，就要占满整个屏幕大小，无疑是一个灾难；所以，浏览器在保证足够宽的情况下，就需要尽量小的高度，这个尽量小的高度就是元素自身高度

【为什么块级元素设置margin:auto无法实现垂直居中显示】

&emsp;&emsp;浏览器对于margin-top、margin-bottom为auto时，会自动将其重置为0。如果要实现垂直居中，可以利用calc()自己计算，如果height为100px，border为0，padding为10px，包含块的高度为200px，则margin-top = calc((200px - 100px - 10px -10px) / 2)

&emsp;&emsp;注意：要考虑垂直方向上的margin重叠问题

【为什么图片设置margin:auto不可以实现水平居中显示】

&emsp;&emsp;图片无法水平居中，类似于块级元素无法垂直居中。因为图片的宽度width默认是自身宽度，左右margin设置为auto，会被重置为0；如果要实现水平居中显示，把图片display设置为block即可

&nbsp;

### Why 行高和垂直对齐

&emsp;&emsp;普通流下，块级元素的布局主要基础是盒模型，而行内元素(包括inline-block元素)的布局则主要依靠line-height和vertical-align

&emsp;&emsp;line-height行高是指文本行基线之间的距离。vertical-align用来设置垂直对齐方式，所有垂直对齐的元素都会影响行高

【为什么inline-block元素会存在底部空隙】

&emsp;&emsp;inline-block元素在块级元素中留空隙是因为图像的默认垂直对齐方式是基线对齐(基线对齐在原理上相当于图像底边与匿名文本大写英文字母X的底边对齐)；而匿名文本是有行高的，继承父级元素设置的行高，默认为normal(chrome下为font-size的1.334倍)，所以X的底边距离行框的底边有一段距离，这段距离就是图像留出的空隙

&emsp;&emsp;于是，解决这个问题有以下3种解决办法

&emsp;&emsp;1、设置display:block，因为垂直对齐方式只能作用于替换元素和行内元素，更改为块级元素，会使垂直对齐方式失效

&emsp;&emsp;2、设置父级的line-height: 0，这样使匿名文本与行框的距离为0

&emsp;&emsp;3、设置vertical-align为top/middle/bottom

【为什么行内元素垂直margin无效】

&emsp;&emsp;因为行内元素垂直布局主要是通过行高line-height和垂直对齐vertical-align来影响的，垂直margin并不会影响它们，所以不会影响垂直布局。而在显示方式，margin区域不会显示元素背景，所以也不会影响自身元素的显示，所以行内元素垂直margin无效

&nbsp;

### Why 浮动

&emsp;&emsp;[浮动](http://www.cnblogs.com/xiaohuochai/p/5243735.html)最早的使用是出自&lt;img src="#" align="right"&gt;，用于文本环绕图片的排版处理。如今浮动作为CSS中常用的布局方式

&emsp;&emsp;浮动元素脱离普通流，然后按照指定方向，向左或者向右移动，碰到父级边界或者另外一个浮动元素停止。浮动具有以下4个特性：

&emsp;&emsp;1、浮动流：正常流中元素一个接一个排列；浮动元素也构成浮动流

&emsp;&emsp;2、块级框：浮动元素自身会生成一个块级框，不论这个元素本身是什么，使浮动元素周围的外边距不会合并

&emsp;&emsp;3、包裹性：浮动元素的包含块是指其最近的块级祖先元素，后代浮动元素不应该超出包含块的上、左、右边界。若不设置包含块的高度，包含块若浮动，则包含块会延伸，进而包含其所有后代浮动元素；若不设置包含块的宽度，包含块若浮动，则包含块宽度由后代浮动元素撑开

&emsp;&emsp;4、破坏性：浮动动元素脱离正常流，并破坏了自身的行框属性，使其包含块元素的高度塌陷，使浮动框旁边的行框被缩短，从而给浮动框留出空间，行框围绕浮动框重新排列

【为什么需要清除浮动】

&emsp;&emsp;[清浮动](http://www.cnblogs.com/xiaohuochai/p/5248981.html)，其实就是解决浮动元素的包含块高度塌陷的问题

&emsp;&emsp;对于标准浏览器来说，清浮动其实就两种方法，一种是在浮动元素下面添加新元素设置clear属性；另一种是触发包含块的BFC，使其包含浮动元素

&nbsp;

### Why BFC

&emsp;&emsp;经常地，我们使用[BFC](http://www.cnblogs.com/xiaohuochai/p/5248536.html)来清除浮动，但实际上BFC还有很多其他的用途

&emsp;&emsp;在解释BFC之前，先说一下文档流。我们常说的文档流其实分为定位流、浮动流和普通流三种。而普通流其实就是指BFC中的FC。FC是formatting context的首字母缩写，直译过来是格式化上下文，它是页面中的一块渲染区域，有一套渲染规则，决定了其子元素如何布局，以及和其他元素之间的关系和作用。常见的FC有BFC、IFC，还有GFC和FFC。BFC是block formatting context，也就是块级格式化上下文，是用于布局块级盒子的一块渲染区域

&emsp;&emsp;满足下列条件之一就可触发BFC

&emsp;&emsp;1、根元素，即HTML元素

&emsp;&emsp;2、float的值不为none

&emsp;&emsp;3、overflow的值不为visible

&emsp;&emsp;4、display的值为inline-block、table-cell、table-caption

&emsp;&emsp;5、position的值为absolute或fixed

&emsp;&emsp;BFC是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面元素，反之亦然。经常使用BFC实现以下3个用途

&emsp;&emsp;1、阻止元素被浮动元素覆盖

&emsp;&emsp;&lt;说明&gt;通过改变内容为BFC背景为红色的盒子的属性值，使其成为BFC，以此阻止被绿色的浮动盒子覆盖

<iframe style="line-height: 1.5; width: 100%; height: 437px;" src="https://demo.xiaohuochai.site/css/bfc/b1.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;2、包含浮动元素

&emsp;&emsp;&lt;说明&gt;通过改变高度塌陷的黑色边框的盒子的属性值，使其成为BFC，以此来包含绿色的浮动盒子&nbsp;

<iframe style="width: 100%; height: 349px;" src="https://demo.xiaohuochai.site/css/bfc/b2.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;3、属于同一个BFC的两个相邻块级子元素的上下margin会发生重叠，(设置writing-mode:tb-rl时，水平margin会发生重叠)。所以当两个相邻块级子元素分属于不同的BFC时可以阻止margin重叠

&emsp;&emsp;&lt;说明&gt;淡红色背景的块级盒子二的外面包一个div，通过改变此div的属性使红色盒子与绿色盒子分属于两个不同的BFC，以此来阻止margin重叠&nbsp;

<iframe style="width: 100%; height: 453px;" src="https://demo.xiaohuochai.site/css/bfc/b3.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### Why 定位

&emsp;&emsp;CSS有三种基本的布局机制：普通流、浮动流和定位流。利用定位，可以准确地定义元素框相对于其正常位置应该出现的位置，或者相对于父元素、另一个元素甚至浏览器窗口本身的位置

&emsp;&emsp;当元素绝对定位时，会从文档流中完全删除。元素位置相对于最近的已定位祖先元素，如果元素没有已定位的祖先元素，那么它的位置相对于初始包含块document，其边界根据偏移属性放置。元素定位后生成一个块级框，而不论原来它在正常流中生成何种类型的框。定位元素不会流入其他元素的内容，反之亦然

&emsp;&emsp;当元素相对定位时，它会从其正常位置移走，不过，原来所占的空间并不会因此消失。相对定位元素，会为其所有子元素建立一个新的包含块。这个包含块对应于该元素原本所在的位置

&emsp;&emsp;固定定位与绝对定位很类似，元素会完全从文档流中去除，但固定元素的偏移是相对于视窗

【为什么clip属性无效】

&emsp;&emsp;[绝对定位](http://www.cnblogs.com/xiaohuochai/p/5312917.html)或固定定位元素才可以使用[clip](http://www.cnblogs.com/xiaohuochai/p/5285752.html)属性。绝对定位元素常配合clip属性达到元素隐藏的效果

<div>
<pre>.hide{
    position:absolute;
    clip: rect(0,0,0,0);
}</pre>
</div>

【为什么静态位置的元素会发生跳动】

&emsp;&emsp;对于居中对齐的行内元素来说，将元素设置为absolute或fixed会发生[静态位置](http://www.cnblogs.com/xiaohuochai/p/5312917.html#anchor5)跳动问题。而relative或static则不会有此问题。这是因为元素默认的居中对齐是元素的内容中线对应父级块级元素中线，而当元素绝对定位或固定定位之后，定位元素左边界将与其父级块级元素的中线对齐

<iframe style="width: 100%; height: 218px;" src="https://demo.xiaohuochai.site/css/absolute/a7.html" frameborder="0" width="320" height="240"></iframe>

【为什么overflow属性会失效】

&emsp;&emsp;当overflow在绝对定位元素和其包含块之间时，绝对定位元素不会被父级overflow属性剪裁

<iframe style="width: 100%; height: 295px;" src="https://demo.xiaohuochai.site/css/absolute/a8.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;解决办法就是有两种， 一种是让overflow元素自身成为包含块，给父级设置position:absolute或fixed或relative；另一种是设置overflow元素的子元素为包含块，在绝对定位元素和overflow元素之间增加一个元素并设置position:absolute或fixed或relative

&nbsp;

### Why z-index

&emsp;&emsp;对于所有定位，最后都不免遇到两个元素试图放在同一位置上的情况。显然，其中一个必须盖住另一个。但，如何控制哪个元素放在上层，这就引入了属性[z-index](http://www.cnblogs.com/xiaohuochai/p/5304619.html)

&emsp;&emsp;利用z-index，可以改变元素相互覆盖的顺序。这个属性的名字由坐标系统得来，其中从左向右是x轴，从上到下是y轴。从屏幕到用户是z轴。在这个坐标系中，较高z-index值的元素比较低z-index值的元素离用户更近，这会导致较高z-index值的元素覆盖其他元素，这也称为堆叠或叠放

&emsp;&emsp;对于CSS2.1来说，页面元素的堆叠规则如下图所示

![zIndex](https://pic.xiaohuochai.site/blog/CSS_grammer_zIndex.jpg)

&emsp;&emsp;对于定位元素(position不是static的元素)来说，不设置z-index或z-index相同时，后面元素覆盖前面元素；对于处于同一堆叠上下文中的同一层次的元素来说，默认z-index较大值覆盖z-index较小值

&emsp;&emsp;一旦为一个元素指定了z-index值(不是auto)，该元素会建立自己的局部堆叠上下文。这意味着，元素的所有后代相对于该祖先元素都有其自己的叠放顺序

&emsp;&emsp;注意：auto值指当前堆叠上下文中生成的栈层次与其父框的层次相同，这个框不会建立新的局部叠放上下文。z-index:auto与z-index:0的值相等，但z-index:0会建立新的局部堆叠上下文

&emsp;&emsp;CSS3的出现对过去的很多规则发出了挑战。对层叠上下文z-index的影响更加显著，主要包括以下8个属性&nbsp;

&emsp;&emsp;1、z-index值不为auto的[flex](http://www.cnblogs.com/xiaohuochai/p/5323146.html)项(父元素display:flex | inline-flex)

&emsp;&emsp;2、元素的[透明度opacity](http://www.cnblogs.com/xiaohuochai/p/5218459.html#anchor2)值不等于1

&emsp;&emsp;3、元素的[变形transform](http://www.cnblogs.com/xiaohuochai/p/5350254.html)不是none

&emsp;&emsp;4、元素的[mix-blend-mode](http://www.cnblogs.com/xiaohuochai/p/6270139.html#anchor1)值不是normal

&emsp;&emsp;5、元素的[filter](http://www.cnblogs.com/xiaohuochai/p/6270939.html)值不是none

&emsp;&emsp;6、元素的[isolation](http://www.cnblogs.com/xiaohuochai/p/6270139.html#anchor3)值是isolate

&emsp;&emsp;7、[will-change](http://www.cnblogs.com/xiaohuochai/p/6321790.html)指定的属性值为上面的任意一个

&emsp;&emsp;8、元素的-webkit-overflow-scrolling设置为touch

&emsp;&emsp;9、元素的mask属性不是none

&emsp;&emsp;设置以上9个属性的任意一个，都和设置absolute类似，层叠上下文z-index会生效

&nbsp;

### Why 溢出

&emsp;&emsp;当一个元素固定为某个特定大小，但内容在元素中放不下。此时可以利用[溢出(overflow)](http://www.cnblogs.com/xiaohuochai/p/5289653.html)来控制这种情况

&emsp;&emsp;overflow-x和overflow-y的属性原本是IE浏览器独自拓展的属性，后来被CSS3采用，并标准化。overflow-x主要用来定义对水平方向内容溢出的剪切，而overflow-y主要用来定义对垂直方向内容溢出的剪切

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/overflow/o2.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;当overflow设置为auto或scroll或hidden时可以触发BFC，使得overflow可以实现一些相关应用

【为什么会出现滚动条】

&emsp;&emsp;滚动条和overflow是紧密相关的。只有当父级的overflow的值是auto或scroll，并且元素的内容超出元素区域时，才有可能出现滚动条


&emsp;&emsp;无论什么浏览器，默认滚动条均来自&lt;html&gt;，而不是&lt;body&gt;。因为&lt;body&gt;元素默认有8px的margin。若滚动条来自&lt;body&gt;元素，则滚动条与页面则应该有8px的间距，实际上并没有间距，所以滚动条来自&lt;html&gt;元素

&emsp;&emsp;chrome/firefox/IE浏览器的默认滚动条宽度是17px，safari浏览器则是21px

&nbsp;

### Why flex

&emsp;&emsp;CSS3引入了一种新的布局模型&mdash;&mdash;[flex布局](http://www.cnblogs.com/xiaohuochai/p/5323146.html)。flex是flexible box的缩写，一般称之为弹性盒模型。flex布局提供一种更加有效的方式来进行容器内的项目布局，以适应各种类型的显示设备和各种尺寸的屏幕&nbsp;

![flex](https://pic.xiaohuochai.site/blog/CSS_grammer_flex.png)

&emsp;&emsp;伸缩容器默认存在两条轴: 水平的主轴(main axis) 和垂直的侧轴(cross axis)

&emsp;&emsp;注意：主轴方向不一定是水平的，它主要取决于justify-content属性

&emsp;&emsp;主轴起点叫main start，主轴终点叫main end；侧轴起点叫cross start，侧轴终点叫cross end

&emsp;&emsp;伸缩项目默认沿主轴排列。单个伸缩项目占据的主轴空间叫main size ，占据的侧轴空间叫cross size

&emsp;&emsp;注意：伸缩项目的main size和cross size主要由宽度或高度决定

&emsp;&emsp;利用flex可以简单的实现各种布局形式，详细情况[移步至此](http://www.cnblogs.com/xiaohuochai/p/5460201.html)

&nbsp;

### Why 多列布局

&emsp;&emsp;浮动作为常见排版方式只是不得已为之的行为，最初只是用来实现图文混排，也最好只用于图文混排，而不是更复杂的布局结构

&emsp;&emsp;定位用于对元素的精准定位布局

&emsp;&emsp;个人认为，flex布局提供的灵活布局方式可以用来替代被泛滥使用的浮动布局

&emsp;&emsp;而多列布局则提供了类似于报纸、杂志类的排版方式

&emsp;&emsp;CSS新增了多列布局特性，可以让浏览器确定何时结束一列和开始下一列，无需任何额外的标记。简单来说，就是CSS3多列布局可以自动将内容按指定的列数排列，这种特性实现的布局效果和报纸、杂志类排版非常相似

<iframe style="width: 100%; height: 430px;" src="https://demo.xiaohuochai.site/css/column/c7.html" frameborder="0" width="320" height="240"></iframe>
