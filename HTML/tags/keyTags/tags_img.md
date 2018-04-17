# 了解HTML图像及相关标签

### img

&emsp;&emsp;&lt;img&gt;表示image图像，从技术上讲，&lt;img&gt;标签并不会在网页中插入图像，而是从网页上链接图像。&lt;img&gt; 标签创建的是被引用图像的占位空间。

【必须属性】

&emsp;&emsp;1、src:地址

&emsp;&emsp;2、alt:图像替代文本，供探索引擎抓取使用

![alt](https://pic.xiaohuochai.site/blog/HTML_tags_img_alt.gif)

【可选属性】

&emsp;&emsp;1、height:图像高度

&emsp;&emsp;2、width:图像宽度

&emsp;&emsp;3、ismap:为图像定义为服务器端图像映射

&emsp;&emsp;4、longdesc:与alt属性类似，提供多于1024字符的长文本描述

&emsp;&emsp;5、usemap:为图像定义客户端图像映射 usemap = "#&lt;map&gt;元素的name或id属性"

<div>
<pre>&lt;img src="test.jpg" alt="测试图片" width="100" height="100"&gt;</pre>
</div>

&emsp;&emsp;6、srcset:指定图片的地址和对应的图片质量。属性格式：图片地址 宽度描述w 多个资源之间用逗号分隔。对于srcset里面出现了一个w单位，可以理解成图片质量。如果可视区域小于这个质量的值，就可以使用，当然，浏览器会自动选择一个最小的可用图片。但是，会发现随着浏览器窗口宽度变大，图片也在不断变大

&emsp;&emsp;注意：浏览器会自动匹配最佳显示的图片，如果大图既然缓存了就用大图了，再缩小也不会变成小图了

<div>
<pre>&lt;img src="small.jpg" srcset="small.jpg 300w,middle.gif 500w,big.gif 800w"&gt;</pre>
</div>

![srcset](https://pic.xiaohuochai.site/blog/HTML_tags_img_srcset.gif)

&emsp;&emsp;7、sizes:用来设置图片的尺寸零界点，主要跟响应式布局打交道。属性格式为：媒体查询 宽度描述(支持px)，多条规则用逗号分隔

&emsp;&emsp;注意：如果加上sizes属性，会发现，随着浏览器宽度变大，图片一直保持其初始尺寸。所以，应该sizes和srcset两个属性配合使用

<div>
<pre>&lt;img src="small.jpg" srcset="small.jpg 300w,middle.gif 500w,big.gif 800w" sizes="(max-width:300px) 300px, (max-width:500px) 500px,800px"&gt;</pre>
</div>

![sizes](https://pic.xiaohuochai.site/blog/HTML_tags_img_sizes.gif)

&emsp;&emsp;8、crossorigin:使得在canvas中使用图片资源时可以突破跨域限制

<div>
<pre>&lt;img alt="plane" src="test.jpg" crossorigin="anonymous"&gt;</pre>
</div>

&nbsp;

### figure

&emsp;&emsp;&lt;figure&gt;元素代表一段独立的内容，经常与说明(caption)&lt;figcaption&gt; 配合使用，并且作为一个独立的引用单元。figure通常用来插入图片，但它也可以是一段代码、图片、音乐或者视频

【默认样式】

<div>
<pre>margin: 16px 40px;</pre>
</div>

&nbsp;

### figcaption

&emsp;&emsp;figcatption用来定义figure元素的标题，且应该位于figure元素的第一个或最后一个子元素的位置。figure中只能包含一个figcaption

<div>
<pre>&lt;figure&gt;
    &lt;img src="abc.jpg" alt=""/&gt;
    &lt;figcaption&gt;
        Website analytics for test...
    &lt;/figcaption&gt;
&lt;/figure&gt;</pre>
</div>

&nbsp;

### map

&emsp;&emsp;&lt;map&gt;&nbsp;与 &lt;area&gt;属性一起使用来定义一个图像映射

&emsp;&emsp;注意：&lt;img&gt;中的usemap属性可引用&lt;map&gt;中的id或name属性(取决于浏览器)，所以应同时向&lt;map&gt;添加id和name属性。

&nbsp;

### area

&emsp;&emsp;&lt;area&gt;用来定义图像热区，&lt;area&gt;总是嵌套在&lt;map&gt;标签中

【必须属性】

&emsp;&emsp;1、alt:替代文本

【可选属性】

&emsp;&emsp;1、coords:定义可点击区域的坐标

&emsp;&emsp;2、href:定义此区域的目标URL

&emsp;&emsp;3、nohref:排除某个区域(html5中已废弃)

&emsp;&emsp;4、shape:定义区域的形状

&emsp;&emsp;&emsp;a、圆形(circ/circle) coords= "x,y,r" x,y是圆心坐标；r是半径

&emsp;&emsp;&emsp;b、多边形(poly/polygon) coords = "x1,y1,x2,y2,x3,y3&hellip;&hellip;" x,y是多边形每个顶点的坐标

&emsp;&emsp;&emsp;c、矩形(rect/rectangle) coords = "x1,y1,x2,y2" x1,y1是左上角坐标；x2,y2是右下角坐标

&emsp;&emsp;&emsp;d、全部区域default(默认)

&emsp;&emsp;注意：&lt;area&gt;标签采用"先来先得"的顺序，如果区域有重叠，以先出现的&lt;area&gt;为准

<div>
<pre>&lt;img src="jihe.jpg" alt="几何图形" width="600" height="220" usemap="#map"&gt;
&lt;map name="map" id="map"&gt;
  &lt;area shape="rect" coords="35,38,150,158" href="line4.html" alt="四边形"&gt;
  &lt;area shape="poly" coords="175,109,193,44,268,41,296,109,233,151" href="line6.html" alt="六边形"&gt;
  &lt;area shape="poly" coords="315,81,330,58,356,40,387,37,411,52,430,79,433,108,418,132,389,153,357,154,333,137,315,108" href="line12.html" alt="12边形"&gt;
  &lt;area shape="circle" coords="512,95,60" href="line0.html" alt="圆形"&gt;
&lt;/map&gt;</pre>
</div>

![setarea](https://pic.xiaohuochai.site/blog/HTML_tags_img_setarea.gif)

![area](https://pic.xiaohuochai.site/blog/HTML_tags_img_area.gif)

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/html/tagarea.html" frameborder="0" width="320" height="240"></iframe>
