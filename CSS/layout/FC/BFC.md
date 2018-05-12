# 深入理解BFC

### 定义

&emsp;&emsp;在解释BFC之前，先说一下文档流。我们常说的文档流其实分为定位流、浮动流和普通流三种。而普通流其实就是指BFC中的FC。FC是formatting context的首字母缩写，直译过来是格式化上下文，它是页面中的一块渲染区域，有一套渲染规则，决定了其子元素如何布局，以及和其他元素之间的关系和作用。常见的FC有BFC、IFC，还有GFC和FFC。BFC是block formatting context，也就是块级格式化上下文，是用于布局块级盒子的一块渲染区域

&nbsp;

### 触发条件

&emsp;&emsp;满足下列条件之一就可触发BFC

&emsp;&emsp;【1】根元素，即HTML元素

&emsp;&emsp;【2】float的值不为none

&emsp;&emsp;【3】overflow的值不为visible

&emsp;&emsp;【4】display的值为inline-block、table-cell、table-caption

&emsp;&emsp;【5】position的值为absolute或fixed

&nbsp;

### 作用

&emsp;&emsp;BFC是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面元素，反之亦然。它与普通的块框类似，但不同之处在于:

&emsp;&emsp;【1】可以阻止元素被浮动元素覆盖

&emsp;&emsp;&lt;说明&gt;通过改变内容为BFC背景为红色的盒子的属性值，使其成为BFC，以此阻止被绿色的浮动盒子覆盖

<iframe style="line-height: 1.5; width: 100%; height: 437px;" src="https://demo.xiaohuochai.site/css/bfc/b1.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;【2】可以包含浮动元素

&emsp;&emsp;&lt;说明&gt;通过改变高度塌陷的黑色边框的盒子的属性值，使其成为BFC，以此来包含绿色的浮动盒子

<iframe style="width: 100%; height: 349px;" src="https://demo.xiaohuochai.site/css/bfc/b2.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;【3】属于同一个BFC的两个相邻块级子元素的上下margin会发生重叠，(设置writing-mode:tb-rl时，水平margin会发生重叠)。所以当两个相邻块级子元素分属于不同的BFC时可以阻止margin重叠

&emsp;&emsp;&lt;说明&gt;淡红色背景的块级盒子二的外面包一个div，通过改变此div的属性使红色盒子与绿色盒子分属于两个不同的BFC，以此来阻止margin重叠

<iframe style="width: 100%; height: 453px;" src="https://demo.xiaohuochai.site/css/bfc/b3.html" frameborder="0" width="320" height="240"></iframe>

