# 命名规范

　　由历史原因及个人习惯引起的 DOM 结构、命名不统一，导致不同成员在维护同一页面时，效率低下，迭代、维护成本极高。所以，使用统一的命名规范非常必要。本文将详细介绍命名规范

&nbsp;

### 目录命名

　　1、项目文件夹：projectname

　　2、样式文件夹：css

　　3、脚本文件夹：js

　　4、样式类图片文件夹：img

&nbsp;

### 图片命名

　　图片命名建议以以下顺序命名：

　　（m_）图片功能类别（必选）+ 图片模块名称（可选） + 图片精度（可选）

　　m_表示是否公共，可选

【图片功能类别】

　　icon：模块类固化的图标

　　logo：LOGO类

　　spr：单页面各种元素合并集合

　　btn：按钮

　　bg：可平铺或者大背景

　　pic ：表示当前内容或业务的图片

【图片模块名称】

　　goodslist：商品列表

　　goodsinfo：商品信息

　　userportrait：用户头像

【图片精度】

　　普清：@1x

　　Retina：@2x | @3x

<div class="cnblogs_code">
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

　　确保文件命名总是以字母开头而不是数字，且字母一律小写，以下划线连接且不带其他标点符号，如

<div class="cnblogs_code">
<pre>&lt;!-- HTML --&gt;
connect.html
connect_list.html
connect_detail.html
&lt;!-- SASS --&gt;
connect.scss
connect_list.scss
connect_detail.scss</pre>
</div>
