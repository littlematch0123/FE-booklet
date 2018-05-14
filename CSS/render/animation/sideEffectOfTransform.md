# 变形transform的副作用

&emsp;&emsp;变形`transform`本来是一个用来处理移动、旋转、缩放和倾斜等基本操作的CSS3属性，但该属性除了完成其本职工作之后，还对普通元素造成了意想不到的影响，本文将详细介绍transform对元素造成的四个副作用


<p>&nbsp;</p>


### z-index



&emsp;&emsp;在定位中的堆叠`z-index`中曾经提到过，CSS3的出现对过去的很多规则发出了挑战，对层叠上下文z-index的影响更加显著，其中就包括元素的变形`transform`不是none的情况

&emsp;&emsp;元素的变形`transform`不是none使该元素可以使用堆叠`z-index`，从而可以覆盖普通流元素和低级别的定位元素


&emsp;&emsp;在下面例子中，show2和show1都是普通元素，show2通过设置margin负值，覆盖了show1。但是，通过改变show1的'transform'属性可以改变其层叠效果

<iframe style="width: 100%; height: 200px" src="https://demo.xiaohuochai.site/css/transformsideEffect/t1.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


<p>&nbsp;</p>



### fixed


&emsp;&emsp;固定定位fixed使元素相对于视窗进行定位，不随着页面滚动条的滚动而滚动。但是，如果在固定定位元素的父级设置`transform`不为none，则会将固定定位降级为绝对定位absolute

&emsp;&emsp;兼容性：IE浏览器无此表现，依然保持fixed状态

&emsp;&emsp;注意：在chrome浏览器下，将固定定位元素父级的`transform`属性设置为none，可能会使元素从静态位置移动到left:0、top:0的位置

<iframe style="width: 100%; height: 160px" src="https://demo.xiaohuochai.site/css/transformsideEffect/t2.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


<p>&nbsp;</p>


### overflow


&emsp;&emsp;对于溢出`overflow`失效的情况发生在overflow在绝对定位元素及其包含块之间，如下所示

<iframe style="width: 100%; height: 230px;" src="https://demo.xiaohuochai.site/css/transformsideEffect/t3.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;给设置`overflow`的元素使用`transform`或在设置`overflow`的元素与溢出元素之间的元素设置`transform`，可以解决`overflow`失效的问题

&emsp;&emsp;兼容性：在chrome和safari浏览器下，只有设置`overflow`的元素与溢出元素之间的元素设置`transform`时，才有效；而IE9+和firefox浏览器，对于以上两种设置都有效


&emsp;&emsp;注意：在chrome浏览器下，将元素的`transform`属性设置为none，可能会使元素从静态位置移动到left:0、top:0的位置


<iframe style="width: 100%; height: 180px" src="https://demo.xiaohuochai.site/css/transformsideEffect/t4.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


<p>&nbsp;</p>


### 定位父级

&emsp;&emsp;一般地，绝对定位元素设置宽度百分比时，参照的是定位父级。定位父级是第一个position值为非static值的祖先元素。但是，如果祖先元素中存在设置了`transform`元素不为none的元素，也可以成为定位父级

&emsp;&emsp;以下为例子中的HTML结构，当`.transform`元素设置`transform:scale(1)`时，该元素成为定位父级，否则`.parent`元素是定位父级

    <div class="parent" style="position:relative;width: 200px;height: 30px;">
        <div class="transform" style="width: 80px;height: 80px;">
            <div class="test" style="position:absolute;width:100%"></div>
        </div>
    </div>


<iframe style="width: 100%; height: 180px" src="https://demo.xiaohuochai.site/css/transformsideEffect/t5.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>
