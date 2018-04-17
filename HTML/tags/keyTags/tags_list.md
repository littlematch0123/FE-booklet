# 了解HTML列表

&emsp;&emsp;从某种意义上讲，不是描述性文本的任何内容都可以认为是列表。人口普查、太阳系、餐馆菜单等都可以表示为一个列表或列表的列表。列表分为无序列表、有序列表和定义列表三种

&nbsp;

### 无序列表

&emsp;&emsp;无序列表(unorder list)缩写为ul，即无数值排序项的集合，且它们在列表中的顺序是没有意义的。通常情况下，无序列表项的头部可以是几种形式，如一个点，一个圆形或方形。头部的风格并不是在页面的HTML描述定义，但在其相关的CSS可以用list-style-type属性

【默认样式】　

<div>
<pre>//IE7-浏览器margin-left: 30pt;
ul{
    margin: 16px 0;
    padding-left: 40px;
    list-style-type: disc;
}</pre>
</div>
<div>
<pre>&lt;ul&gt;
    &lt;li&gt;Coffee&lt;/li&gt;
    &lt;li&gt;Milk&lt;/li&gt;
&lt;/ul&gt;</pre>
</div>

&nbsp;

### 有序列表

&emsp;&emsp;有序列表(order list)简写为ol，表示多个有序列表项。通常情况下，有序列表中显示在项前面的编号(a preceding numbering)，可以是任何形式的，如数字、字母或罗马数字甚至简单的点。 在网页的 HTML 描述中并没有定义编号的样式，但可以用相关的CSS定义，使用 list-style-type 属性

【默认样式】

<div>
<pre>//IE7-浏览器margin-left: 30pt;
ol{
    margin: 16px 0;
    padding-left: 40px;
    list-style-type: decimal;
}</pre>
</div>
<div>
<pre>&lt;ol&gt;
    &lt;li&gt;Coffee&lt;/li&gt;
    &lt;li&gt;Milk&lt;/li&gt;
&lt;/ol&gt;</pre>
</div>

【属性】

&emsp;&emsp;HTML5为ol新增了两个属性：reversed和start

&emsp;&emsp;1、reversed

&emsp;&emsp;&emsp;降序(IE和safari不支持)

&emsp;&emsp;2、start

&emsp;&emsp;&emsp;有序列表的起始项(没有start属性的CSS替代方案)

<div>
<pre>&lt;ol reversed start="2"&gt;
  &lt;li&gt;咖啡&lt;/li&gt;
  &lt;li&gt;牛奶&lt;/li&gt;
  &lt;li&gt;茶&lt;/li&gt;
  &lt;li&gt;可乐&lt;/li&gt;
  &lt;li&gt;酒&lt;/li&gt;    
&lt;/ol&gt;</pre>
</div>

![ol](https://pic.xiaohuochai.site/blog/HTML_tags_ol.gif)

**marker**

&emsp;&emsp;marker表示ol或ul中li的列表项标志，虽然list-style样式只能应用于display的值为list-item的元素，但由于该样式可继承，所以竟然将其应用在ol或ul，然后通过继承，使所有的li都获取设置的list-style样式。如果给某一个li设置list-style样式，将覆盖其从父级继承的list-style样式

<div>
<pre>list-style(列表项标志复合样式):list-style-type list-style-image list-style-position</pre>
</div>

&emsp;&emsp;1、list-style-type：列表项标志类型

&emsp;&emsp;2、list-style-image：列表项标志图像

&emsp;&emsp;3、list-style-position：列表项标志位置

&emsp;&emsp;注意：当list-style-image不为none时，list-style-type值将被覆盖；通常提供一个作为&ldquo;后路&rdquo;的标志类型，应付图像未能加载的意外情况

&emsp;&emsp;&lt;演示框&gt;点击下列相应属性值可进行演示

<iframe src="https://demo.xiaohuochai.site/html/list/l111.html" frameborder="0" width="100%" height="400"></iframe>

&emsp;&emsp;注意：IE7-浏览器不支持属性值 "decimal-leading-zero"、"lower-greek"、"lower-latin"、"upper-latin"、"armenian"、"georgian"

&nbsp;

### 定义列表

&emsp;&emsp;定义列表(define list)简写是dl，是一个包含术语定义以及描述的列表，通常用于展示词汇表或者元数据(键-值对列表)

&emsp;&emsp;定义元素(define list title)用于在一个定义列表中声明一个术语。该元素仅能作为dl的子元素出现。通常在该元素后面会跟着dd元素

&emsp;&emsp;描述元素(define list describe)用来指明一个描述列表dl元素中一个术语的描述。这个元素只能作为描述列表元素的子元素出现，并且必须跟着一个dt元素

&emsp;&emsp;注意：一个dt可对应多个dd；&lt;dl&gt;&lt;dt&gt;&lt;dd&gt;的display都是block

【默认样式】

<div>
<pre>
dl{
    margin: 16px 0;
}
//IE7-浏览器margin-left: 30pt;    
dd{
    margin-left: 40px;
}</pre>
</div>
<div>
<pre>&lt;dl&gt;
    &lt;dt&gt;Coffee&lt;/dt&gt;
    &lt;dd&gt;Black hot drink&lt;/dd&gt;
    &lt;dt&gt;Milk&lt;/dt&gt;
    &lt;dd&gt;White cold drink&lt;/dd&gt;
&lt;/dl&gt;</pre>
</div>

![dl](https://pic.xiaohuochai.site/blog/HTML_tags_dl.png)
