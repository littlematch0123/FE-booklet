# CSS旧版flex及兼容

&emsp;&emsp;flex弹性盒模型有3个版本: 旧版本、混合版本和新版本。如果要保证flex弹性盒模型在各个主流浏览器上表现一致，就必须掌握这3个版本的不同用法。[深入理解CSS弹性盒模型flex](http://www.cnblogs.com/xiaohuochai/p/5323146.html)已经详细介绍过其基本用法，本文主要介绍旧版本flex的不同之处及兼容写法

&nbsp;

### 适用范围

&emsp;&emsp;旧版本flex是指最早的flex版本，该版本的flex应用在safari3.1-6(主要表现在windows系统下的safari浏览器)、ios3.2-6.1、android2.1-4.3。且都需要添加-webkit-前缀

&nbsp;

### 伸缩项目

&emsp;&emsp;旧版本flex要求伸缩项目必须是block元素

<div>
<pre>&lt;span&gt;
    &lt;span&gt;项目一&lt;/span&gt;
    &lt;span&gt;项目二&lt;/span&gt;
    &lt;span&gt;项目三&lt;/span&gt;
    &lt;span&gt;项目四&lt;/span&gt;
&lt;/span&gt;</pre>
</div>

<iframe style="width: 100%; height: 290px;" src="https://demo.xiaohuochai.site/css/flex/f20.html" frameborder="0" width="320" height="240"></iframe>

### 伸缩流方向

&emsp;&emsp;旧版本flex的伸缩流方向中的reverse值，只改变伸缩项目的排列顺序，并不改变其对齐方式。所以建议使用direction:rtl来实现伸缩流反向效果

<iframe style="width: 100%; height: 308px;" src="https://demo.xiaohuochai.site/css/flex/f21.html" frameborder="0" width="320" height="240"></iframe>

### 伸缩流换行

&emsp;&emsp;旧版本flex不支持伸缩流换行，所以在其他版本flex中尽量不要使用换行操作

&nbsp;

### 主轴对齐

&emsp;&emsp;旧版本flex的主轴对齐属性中没有扩散对齐属性space-around，所以在其他版本flex中尽量不要使用该属性值

&nbsp;

### 伸缩性

&emsp;&emsp;旧版本flex的伸缩性只有一个值，表示基于伸缩项目本身尺寸大小的扩展或收缩比率，旧版本的-webkit-box-flex:1;相当于新版本的flex:auto;所以要想实现不基于伸缩项目本身尺寸大小的伸缩需要显式地将伸缩项目的宽度width设置为0

&emsp;&emsp;注意：该值支持小数，但不能为负数

<iframe style="width: 100%; height: 427px;" src="https://demo.xiaohuochai.site/css/flex/f22.html" frameborder="0" width="320" height="240"></iframe>

### 显示顺序

&emsp;&emsp;旧版本flex的显示顺序是以1为默认值的正整数，而新版本flex的显示顺序是以0为默认值的自然数。所以在设置显示顺序时，跳过1，从2开始设置

&nbsp;

### flex兼容

&emsp;&emsp;以下是flex模块的常用兼容代码

<div>
<pre>/*display*/
.display_flex{
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
}
.display_flex &gt; *{
    display: block;
}
.display_inline-flex{
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: -webkit-inline-flex;
    display: inline-flex;    
}
.display_inline-flex &gt; *{
    display: block;
}
/*伸缩流方向*/
.flex-direction_column{
    -webkit-box-orient: vertical;
    -ms-flex-direction: column;
    -webkit-flex-direction: column;
    flex-direction: column;
}
/*主轴对齐*/
.justify-content_flex-center{
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
}
.justify-content_flex-end{
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    -webkit-justify-content: flex-end;
    justify-content: flex-end;
}
.justify-content_flex-justify{
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    -webkit-justify-content: space-between;
    justify-content: space-between;
}
/*侧轴对齐*/
.align-items_flex-start{
    -webkit-box-align: start;
    -ms-flex-align: start;
    -webkit-align-items: flex-start;
    align-items: flex-start;
}
.align-items_flex-end{
    -webkit-box-align: end;
    -ms-flex-align: end;
    -webkit-align-items: flex-end;
    align-items: flex-end;
}
.align-items_center{
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
}
.align-items_baseline{
    -webkit-box-align: baseline;
    -ms-flex-align: baseline;
    -webkit-align-items: baseline;
    align-items: baseline;
}
/*伸缩性*/
.flex_auto{
    -webkit-box-flex: 1;
    -ms-flex: auto;
    -webkit-flex: auto;
    flex: auto;
}
.flex_1{
    width: 0;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    -webkit-flex: 1;
    flex: 1;    
}
/*显示顺序*/
.order_2{
    -webkit-box-ordinal-group: 2;
    -ms-flex-order: 2;
    -webkit-order: 2;
    order: 2;
}
.order_3{
    -webkit-box-ordinal-group: 3;
    -ms-flex-order: 3;
    -webkit-order: 3;
    order: 3;
}</pre>
</div>
