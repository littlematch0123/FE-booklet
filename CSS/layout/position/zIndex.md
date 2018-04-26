# 深入理解CSS定位中的堆叠z-index

&emsp;&emsp;对于所有定位，最后都不免遇到两个元素试图放在同一位置上的情况。显然，其中一个必须盖住另一个。但，如何控制哪个元素放在上层，这就引入了属性z-index

&nbsp;

### 定义

 &emsp;&emsp;利用z-index，可以改变元素相互覆盖的顺序。这个属性的名字由坐标系统得来，其中从左向右是x轴，从上到下是y轴。从屏幕到用户是z轴。在这个坐标系中，较高z-index值的元素比较低z-index值的元素离用户更近，这会导致较高z-index值的元素覆盖其他元素，这也称为堆叠或叠放

**z-index**

&emsp;&emsp;值: `<integer>` | auto | inherit

&emsp;&emsp;初始值: auto

&emsp;&emsp;应用于: 定位元素

&emsp;&emsp;继承性: 无

&emsp;&emsp;注意：z-index应用于定位元素是CSS2的规范，到了CSS3标准，z-index的应用范围扩大了不少

&emsp;&emsp;注意：所有整数都可以作为z-index的值，包括负数。如果为元素指定一个负z-index值，会将其移到离读者更远的位置，会移到叠放栈的更低层

&nbsp;

### 堆叠规则

&emsp;&emsp;对于CSS2.1来说，页面元素的堆叠规则如下图所示:

![zIndexRule](https://pic.xiaohuochai.site/blog/CSS_layout_zIndexRule.jpg)

**定位元素的堆叠规则**

&emsp;&emsp;[1]对于定位元素(position不是static的元素)来说，不设置z-index或z-index相同时，后面元素覆盖前面元素

&emsp;&emsp;[2]对于处于同一堆叠上下文中的同一层次的元素来说，默认z-index较大值覆盖z-index较小值

<iframe style="width: 100%; height: 361px;" src="https://demo.xiaohuochai.site/css/zindex/z1.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 堆叠上下文

&emsp;&emsp;一旦为一个元素指定了z-index值(不是auto)，该元素会建立自己的局部堆叠上下文。这意味着，元素的所有后代相对于该祖先元素都有其自己的叠放顺序

&emsp;&emsp;注意：auto值指当前堆叠上下文中生成的栈层次与其父框的层次相同，这个框不会建立新的局部叠放上下文。z-index:auto与z-index:0的值相等，但z-index:0会建立新的局部堆叠上下文

**默认样式**

```
<div class="box1">
    <ul class="list1">
        <li id="one">1</li>
        <li id="two">2</li>
        <li id="three">3</li>
        <li id="four">4</li>
    </ul>
    <ul class="list2">
        <li id="five">5</li>
        <li id="six">6</li>
    </ul>    
</div>
<div class="box2">
    <div id="seven">7</div>
    <div id="eight">8</div>
</div>
```
```
.box1{z-index: 1;}
.box2{z-index: auto;}
.list1{z-index: 2;}
.list2{z-index: 1;}
#one{z-index: -1;}
#two{z-index: 1;}
#three{z-index: 0;}
#four{z-index: auto;}
#five{z-index: 2;}
#six{z-index: 1;}
#seven{z-index: 2;}
#eight{z-index: -1;}
```
```
//堆叠顺序
.box1                  1
.box1 .list1           1,2
.box1 .list1 #one      1,2,-1
.box1 .list1 #two      1,2,1
.box1 .list1 #three    1,2,0
.box1 .list1 #four     1,2,auto
.box1 .list2           1,1
.box1 .list2 #five     1,1,2
.box1 .list2 #six      1,1,1
.box2                  auto
.box2 #seven           auto,2
.box2 #eight           auto,-1
```

&emsp;&emsp;注意：auto,2和auto,-1相当于2和-1，因为auto代表未产生堆叠上下文。则#seven和#eight相当于和它们的父级.box2以及.box1处于同一层次

<iframe style="width: 100%; height: 498px;" src="https://demo.xiaohuochai.site/css/zindex/z2.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;元素不会叠放在其堆叠上下文(即定位父级z-index为数字值)的背景之下，但可以叠放在其内容之下；当元素没有处于堆叠上下文中，元素不会叠放在`<body>`元素的背景之下，但可以叠放在其内容之下

<iframe style="width: 100%; height: 393px;" src="https://demo.xiaohuochai.site/css/zindex/z3.html" frameborder="0" width="320" height="240"></iframe>

### 兼容

【1】IE7-浏览器z-index的默认值是0

&emsp;&emsp;一般地，定位元素的z-index的默认值是auto，而IE7-浏览器定位元素的z-index的默认值是0，二者的区别于IE7-浏览器的定位元素会自动生成堆叠上下文

```
div{
    position: absolute;
    border: 1px solid black;
}    
.div1{
    width: 300px;
    height: 100px;
    background-color: pink;
    z-index: 1;
}
.div2{
    background-color: lightgreen;
    top: 50px;
    left: 50px;
    width: 200px;
    height: 200px;
}
.in2{
    width: 100px;
    height: 150px;
    background-color: lightblue;
    z-index: 2;
    border: none;
}
```
```
<div class="div1"></div>
<div class="div2">
    <div class="in2"></div>
</div>
```

&emsp;&emsp;一般地，div1的堆叠顺序为1;div2的堆叠顺序为auto;in2的堆叠顺序为auto,2相当于2。所以覆盖层次为in2 覆盖 div1 覆盖 div2。但在IE7-浏览器中，div1的堆叠顺序为1;div2的堆叠顺序为0;in2的堆叠顺序为0,2。所以覆盖层次为div1 覆盖 in2 覆盖 div2

&emsp;&emsp;左边为其他浏览器图示，右边为IE7-浏览器图示

<table border="0">
<tbody>
<tr>
<td>
<img src="https://pic.xiaohuochai.site/blog/CSS_layout_ZindexExample1.jpg" alt="ZindexExample1" />
</td>
<td>
<img src="https://pic.xiaohuochai.site/blog/CSS_layout_ZindexExample2.jpg" alt="ZindexExample2" />
</td>
</tr>
</tbody>
</table>

&nbsp;

【2】IE6-浏览器关于z-index的一个怪异bug

&emsp;&emsp;当元素本身浮动且不是定位元素(position不是static)，元素父级是relative，则在IE6-浏览器在无论该元素的父级的z-index如何设置都不起作用

```
.div1{
    position: absolute;
    z-index: 1;
    width: 100px;
    height: 100px;
    background-color: pink;
}
.box{
    position: relative;
    z-index:2;
}
.div2{
    float: left;
    width: 150px;
    height: 50px;
    background-color: lightgreen;
}
```
```
<div class="div1"></div>
<div class="box">
    <div class="div2"></div>    
</div>
```

&emsp;&emsp;左边是IE6浏览器结果，右边是其他浏览器结果

<table border="0">
<tbody>
<tr>
<td>
<img src="https://pic.xiaohuochai.site/blog/CSS_layout_ZindexExample3.jpg" alt="ZindexExample3">
</td>
<td>
<img src="https://pic.xiaohuochai.site/blog/CSS_layout_ZindexExample4.jpg" alt="ZindexExample4"></td>
</tr>
</tbody>
</table>

**解决方法**

&emsp;&emsp;1、元素去除浮动

&emsp;&emsp;2、父级元素的相对定位改成绝对定位

&emsp;&emsp;3、元素添加position属性(static除外)

&emsp;&emsp;以上三个方法任一方法都可以，其实就是在破坏bug成立的条件

&nbsp;

【3】IE6-浏览器下select的z-index无效而遮挡div

&emsp;&emsp;IE6-浏览器下select设置z-index无效，且默认会堆叠在div上

```
.box{
    left: 30px;
    z-index:2;
    position: absolute;
    width: 100px;
    height: 100px;
    background-color: pink;
}
select{
    width: 100px;
    position: absolute;
    z-index:1;
}
```
```
<div class="box"></div>
<select name="select" id="slt1">
    <option value="1">第一项</option>
    <option value="2">第二项</option>
</select>
```

&emsp;&emsp;左边是IE6浏览器结果，右边是其他浏览器结果

<table border="0">
<tbody>
<tr>
<td>
<img src="https://pic.xiaohuochai.site/blog/CSS_layout_ZindexExample5.jpg" alt="zIndexExample5"></td>
<td>
<img src="https://pic.xiaohuochai.site/blog/CSS_layout_ZindexExample6.jpg" alt="zIndexExample6"></td>
</tr>
</tbody>
</table>

**解决方法**

&emsp;&emsp;在IE6-浏览器中，虽然div无法覆盖select，但是iframe可以select。所以可以设置一个与div宽高相同的iframe。让div覆盖iframe，iframe覆盖select，最终达到select被div覆盖的效果

```
iframe{
    left: 30px;
    position: absolute;
    width: 100px;
    height: 100px;
    z-index: 2;
}
```
```
<iframe src="#" frameborder="0"></iframe>
<div class="box"></div>
<select name="select" id="slt1">
    <option value="1">第一项</option>
    <option value="2">第二项</option>
</select>
```

&nbsp;

### CSS3

&emsp;&emsp;CSS3的出现对过去的很多规则发出了挑战。对层叠上下文z-index的影响更加显著，主要包括以下8个属性

&emsp;&emsp;1、z-index值不为auto的[flex](http://www.cnblogs.com/xiaohuochai/p/5323146.html)项(父元素display:flex | inline-flex)

&emsp;&emsp;2、元素的[透明度opacity](http://www.cnblogs.com/xiaohuochai/p/5218459.html#anchor2)值不等于1

&emsp;&emsp;3、元素的[变形transform](http://www.cnblogs.com/xiaohuochai/p/5350254.html)不是none

&emsp;&emsp;4、元素的[mix-blend-mode](http://www.cnblogs.com/xiaohuochai/p/6270139.html#anchor1)值不是normal

&emsp;&emsp;5、元素的[filter](http://www.cnblogs.com/xiaohuochai/p/6270939.html)值不是none

&emsp;&emsp;6、元素的[isolation](http://www.cnblogs.com/xiaohuochai/p/6270139.html#anchor3)值是isolate

&emsp;&emsp;7、[will-change](http://www.cnblogs.com/xiaohuochai/p/6321790.html)指定的属性值为上面的任意一个

&emsp;&emsp;8、元素的-webkit-overflow-scrolling设置为touch
    
&emsp;&emsp;9、元素的mask属性不是none

&emsp;&emsp;设置以上9个属性的任意一个，都和设置absolute类似，层叠上下文z-index会生效。下面以opacity透明度为例，进行说明

<iframe style="width: 100%; height: 468px;" src="https://demo.xiaohuochai.site/css/zindex/z4.html" frameborder="0" width="320" height="240"></iframe>

