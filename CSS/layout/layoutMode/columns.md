# CSS多列布局

&emsp;&emsp;CSS新增了多列布局特性，可以让浏览器确定何时结束一列和开始下一列，无需任何额外的标记。简单来说，就是CSS3多列布局可以自动将内容按指定的列数排列，这种特性实现的布局效果和报纸、杂志类排版非常相似。本文将详细介绍CSS多列布局的基本属性和用法

&nbsp;

### 列宽

&emsp;&emsp;column-width主要用于给元素指定最优的列宽度，实际列宽可能会更宽或更窄。如果不设置高度，文字将自动撑满整列，且最后一列的标点会溢出到容器外

&emsp;&emsp;注意：IE10+和chrome浏览器支持标准写法，而firefox、safari浏览器及移动端android、IOS需要添加前缀

column-width

&emsp;&emsp;值: auto | &lt;length&gt;

&emsp;&emsp;初始值: auto

&emsp;&emsp;应用于: block、inline-block、table-cell(firefox不支持为table-cell设置该属性)

&emsp;&emsp;继承性: 无

&emsp;&emsp;注意：column-width不可为0和负值；当column-width的值为auto或column-width的值大于元素宽度width一半时，没有分列效果(更准确地，由其他属性来决定)

<iframe style="width: 100%; height: 408px;" src="https://demo.xiaohuochai.site/css/column/c1.html" frameborder="0" width="320" height="240"></iframe>

### 列数

&emsp;&emsp;column-count主要用于给元素指定允许的最大列数

&emsp;&emsp;注意：IE10+和chrome浏览器支持标准写法，而firefox、safari浏览器及移动端android、IOS需要添加前缀

column-count

&emsp;&emsp;值: auto | &lt;length&gt;

&emsp;&emsp;初始值: auto

&emsp;&emsp;应用于: block、inline-block、table-cell(firefox不支持为table-cell设置该属性)

&emsp;&emsp;继承性: 无

&emsp;&emsp;注意：column-count不可为0和负值；当column-count的值为auto时，默认没有分列效果(更准确地，由其他属性来决定)

<iframe style="width: 100%; height: 441px;" src="https://demo.xiaohuochai.site/css/column/c2.html" frameborder="0" width="320" height="240"></iframe>

### 列间距

&emsp;&emsp;列间距column-gap用于定义相邻两列之间的空白间距

&emsp;&emsp;注意：IE10+和chrome浏览器支持标准写法，而firefox、safari浏览器及移动端android、IOS需要添加前缀

column-gap

&emsp;&emsp;值: normal | &lt;length&gt;

&emsp;&emsp;初始值: normal

&emsp;&emsp;应用于: block、inline-block、table-cell

&emsp;&emsp;继承性: 无

&emsp;&emsp;注意：column-gap的normal值默认情况下相当于1em。column-gap值不可为负值

<iframe style="width: 100%; height: 474px;" src="https://demo.xiaohuochai.site/css/column/c3.html" frameborder="0" width="320" height="240"></iframe>

### 列rule

&emsp;&emsp;该属性用于绘制位于列间距水平中心的线条。该样式由column-rule-width、column-rule-style、column-rule-color这三条样式组成

&emsp;&emsp;注意：IE10+和chrome浏览器支持标准写法，而firefox、safari浏览器及移动端android、IOS需要添加前缀

column-rule

&emsp;&emsp;值: &lt;column-rule-width&gt; || &lt;column-rule-style&gt; || &lt;column-rule-color&gt;

&emsp;&emsp;标准中说column-rule类似于border，但实际更类似于outline，因为该样式并不占据实际的物理尺寸。[outline详细情况移步至此](http://www.cnblogs.com/xiaohuochai/p/5277416.html)

&emsp;&emsp;注意：如果column-rule-width的宽度大于column-gap的宽度，则可能会显示在列框内容中

<iframe style="width: 100%; height: 530px;" src="https://demo.xiaohuochai.site/css/column/c4.html" frameborder="0" width="320" height="240"></iframe>

### 跨列

&emsp;&emsp;column-span属性用来定义子元素是否跨列

&emsp;&emsp;注意：firefox不支持该属性，IE10+和chrome浏览器支持标准写法，而safari浏览器及移动端android、IOS需要添加前缀

column-span

&emsp;&emsp;值: none | all

&emsp;&emsp;初始值: none

&emsp;&emsp;应用于: block元素、table-cell元素(只有safari支持为table-cell设置该属性)

&emsp;&emsp;继承性: 无

<div>
<pre>none: 默认不跨列
all: 跨越所有列</pre>
</div>

&emsp;&emsp;注意：当跨列元素被绝对定位(包括固定定位)或浮动后，跨列将不生效

&emsp;&emsp;注意：当跨列元素与column-rule的修饰线重叠时，在IE和safari中，跨列元素将覆盖修饰线，而chrome浏览器存在bug，跨列元素的文本覆盖修饰线，但跨列元素的背景可能会消失。

<iframe style="width: 100%; height: 551px;" src="https://demo.xiaohuochai.site/css/column/c5.html" frameborder="0" width="320" height="240"></iframe>

### 列填充

&emsp;&emsp;在列布局中，有时由于内容不足，多列中的最后列往往没有足够内容填充，这时要实现所有列都具有相同高度的效果，需要使用列填充属性column-fill

column-fill

&emsp;&emsp;值: auto | balance

&emsp;&emsp;初始值: auto

&emsp;&emsp;应用于: block、inline-block

&emsp;&emsp;继承性: 无

<div>
<pre>auto: 默认各列高度随内容变化而变化
balance: 各列高度根据内容最多的一列进行统一</pre>
</div>

&emsp;&emsp;注意：目前只有firefox支持带前缀的column-fill属性

<iframe style="width: 100%; height: 377px;" src="https://demo.xiaohuochai.site/css/column/c6.html" frameborder="0" width="320" height="240"></iframe>

### 多列

&emsp;&emsp;一般地，我们只关心是否分列以及列宽多少，对列间距并不考虑。于是，column这个column-width和column-count的复合属性就得到了比较广泛的使用

columns: column-width || column-count

&emsp;&emsp;注意：由于column-width和column-count这两个值的单位不同，所以顺序无关

&emsp;&emsp;要知道，多列布局主要由列宽、列间距、列数及元素宽度影响，其布局等式是

<div>
<pre>     元素宽度 = 列数 * 列宽 + (列数-1)*列间距 &lt;=&gt; 列数*(列宽+列间距) - 列间距 =<span> 元素宽度
     或者， 列数 = (元素宽度+列间距)/(列宽+<span>列间距)
     或者， 列宽 = (元素宽度+列间距)/列数 - 列间距</pre>
</div>

&emsp;&emsp;此等式中，列间距为定值，其他三个值为可变值，以下是各个值推算情况，其中N为实际列数，W为实际列宽

【1】如果元素宽度为auto，且列宽和列数都不是auto

&emsp;&emsp;则 N = column-count W = column-width;

【2】如果列宽为auto，但列数不是auto，元素宽度不为auto

&emsp;&emsp;则 N = column-count W = max(0,(元素宽度 - ((N-1)*列间距))/N)

【3】如果列宽不为auto，但列数是auto，元素宽度不为auto

&emsp;&emsp;则 N = max(1,floor((元素宽度 + 列间距) / (列宽 + 列间距 )) W = ((元素宽度 + 列间距) / N) - 列间距

【4】如果列宽和列数都不是auto，元素宽度不为auto

&emsp;&emsp;则 N = min(列宽 , floor((元素宽度 + 列间距) / (列宽 + 列间距))) W = ((元素宽度 + 列间距) / N) - 列间距

&emsp;&emsp;注意：若列数为小数，只保留整数部分

&emsp;&emsp;注意：所有的情况都是先推算出实际列数，再由实际列数推算实际列宽

<iframe style="width: 100%; height: 430px;" src="https://demo.xiaohuochai.site/css/column/c7.html" frameborder="0" width="320" height="240"></iframe>

