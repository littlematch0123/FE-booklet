# CSS命名规范

&emsp;&emsp;由历史原因及个人习惯引起的 DOM 结构、命名不统一，导致不同成员在维护同一页面时，效率低下，迭代、维护成本极高。所以，使用统一的命名规范非常必要。本文将详细介绍命名规范

&nbsp;

### 目录命名

&emsp;&emsp;1、项目文件夹：projectname

&emsp;&emsp;2、样式文件夹：css

&emsp;&emsp;3、脚本文件夹：js

&emsp;&emsp;4、样式类图片文件夹：img

&nbsp;

### 图片命名

&emsp;&emsp;图片命名建议以以下顺序命名：

&emsp;&emsp;（m_）图片功能类别（必选）+ 图片模块名称（可选） + 图片精度（可选）

&emsp;&emsp;m_表示是否公共，可选

【图片功能类别】

&emsp;&emsp;icon：模块类固化的图标

&emsp;&emsp;logo：LOGO类

&emsp;&emsp;spr：单页面各种元素合并集合

&emsp;&emsp;btn：按钮

&emsp;&emsp;bg：可平铺或者大背景

&emsp;&emsp;pic ：表示当前内容或业务的图片

【图片模块名称】

&emsp;&emsp;goodslist：商品列表

&emsp;&emsp;goodsinfo：商品信息

&emsp;&emsp;userportrait：用户头像

【图片精度】

&emsp;&emsp;普清：@1x

&emsp;&emsp;Retina：@2x | @3x

<div>
<pre>//公共模块：
m_btn_goodlist@2x.png
m_btn_goodlist.png

//非公共模块：
wx_btn_goodlist@2x.png
wx_btn_goodlist.png
btn_goodlist.png</pre>
</div>

&nbsp;

### 文件命名

&emsp;&emsp;确保文件命名总是以字母开头而不是数字，且字母一律小写，以下划线连接且不带其他标点符号，如

<div>
<pre>&lt;!-- HTML --&gt;
connect.html
connect_list.html
connect_detail.html
&lt;!-- SASS --&gt;
connect.scss
connect_list.scss
connect_detail.scss</pre>
</div>
