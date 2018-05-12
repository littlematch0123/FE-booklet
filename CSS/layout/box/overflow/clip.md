# CSS裁剪clip

&emsp;&emsp;CSS裁剪clip这个属性平时用的不多，但其实它并不是CSS3的新属性，很早就开始出现了。本文将介绍关于clip属性的相关知识

&nbsp;

### 定义

&emsp;&emsp;一个绝对定位或固定定位元素通过使用属性clip可以改变剪裁区域的形状，但并不改变元素本身的宽高属性

**clip**

&emsp;&emsp;值: rect(top,right,bottom,left) | auto | inherit

&emsp;&emsp;初始值: auto

&emsp;&emsp;应用于:&nbsp;绝对定位或固定定位元素

&emsp;&emsp;继承性: 无

&emsp;&emsp;注意：默认值auto表示元素的内容不应剪裁

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/clip/c1.html" frameborder="0" width="320" height="240"></iframe>

### rect

&emsp;&emsp;clip:rect(top,right,bottom,left)中的值不是边偏移，而是距元素左上角的距离。具体来说，就是top和bottom是表示距离元素上边界的距离；left和right是距离元素元素左边界的距离。这里元素的边界指元素边框外侧。

&emsp;&emsp;rect(...)的语法与CSS的其他语法相比不太一样。原因是它基于早期的定位草案，而该草案使用了左上偏移机制。在CSS2之前，实现这个语法的IE已经成为完备推荐，于是标准从边偏移修改成适用这个实现。但是，这意味着如果高度和宽度没有明确定义，将无法设置一致的剪裁区域。

&emsp;&emsp;注意：IE7-浏览器不支持rect(top,right,bottom,left)，支持的写法是rect(top right bottom left)；而其他浏览器两种写法都支持

&emsp;&emsp;clip:rect(...)只允许长度值和auto，不允许有百分数。如果设置为auto，则相当于将剪裁边界设置为适当的内容边界。对于top或left设置auto，相当于值为0；对于right或bottom设置auto，相当于值为水平方向的宽度和或垂直方向的高度和

&emsp;&emsp;注意：该元素水平方向或垂直方向的clip区域的边界是外框外侧，不包括outline

<iframe style="width: 100%; height: 300px;" src="https://demo.xiaohuochai.site/css/clip/c2.html" frameborder="0" width="320" height="240"></iframe>

### 应用

【1】隐藏效果

&emsp;&emsp;当clip:rect(top,right,bottom,left)中的top&gt;=bottom，或者left&gt;=right时，可实现元素的隐藏效果，效果类似于visibility:hidden;

【2】雪碧图定位

&emsp;&emsp;css sprite是一种网页图片应用处理方式，它允许将一个页面涉及到的所有零星图片都包含到一张大图中，然后利用background-position来显示应该显示的区域。[关于CSS Sprite的详细信息移步至此](http://www.cnblogs.com/xiaohuochai/p/4793421.html)。而如果使用clip也可以实现同样的效果。

<div>
<pre>div{
    height:128px;
    overflow: hidden;
}
img{
    position:absolute;
    background-color: rgba(0,255,0,0.5);
    clip:rect(0,auto,128px,0);
}
img:hover{
    margin-top: -128px;
    clip:rect(128px,auto,auto,0);
}</pre>
</div>
<div>
<pre>&lt;div&gt;
    &lt;img src="http://7xpdkf.com1.z0.glb.clouddn.com/sofa_sprite.png" alt="测试图片"&gt;    
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 160px;" src="https://demo.xiaohuochai.site/css/clip/c3.html" frameborder="0" width="320" height="240"></iframe>

【3】歌词演示效果

&emsp;&emsp;利用clip和background-clip实现歌词演示效果，实际上通过改变宽度也可以实现，主要用于拓展思路。

<div>
<pre>@keyframes loop{
    0%{
        clip:rect(0,0px,100px,0);
    }
    100%{
        clip:rect(0,520px,100px,0);
    }
}
.show,.con{
    width: 520px;
    height: 100px;
    line-height: 100px;
    font-size: 30px;
    position:absolute;
    background-color: lightgreen;

}
.con{
    animation: loop 6s linear infinite;
    -webkit-background-clip: text;
    color: red;
}    </pre>
</div>
<div>
<pre>&lt;div class="show"&gt;我曾经跨过山和大海，也穿过人山人海&lt;/div&gt;
&lt;div class="con"&gt;我曾经跨过山和大海，也穿过人山人海&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 120px;" src="https://demo.xiaohuochai.site/css/clip/c4.html" frameborder="0" width="320" height="240"></iframe>
