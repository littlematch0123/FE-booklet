# 前端工程师技能之 photoshop 巧用系列第五篇——雪碧图

&emsp;&emsp;前面已经介绍过，描述性图片最终要合并为雪碧图。本文是 photoshop 巧用系列第五篇&mdash;&mdash;雪碧图

&nbsp;

### 定义

&emsp;&emsp;css 雪碧图(sprite)是一种网页图片应用处理方式，它允许将一个页面涉及到的所有零星图片都包含到一张大图中。使用雪碧图的处理方式可以实现两个优点：

&emsp;&emsp;【1】减少 http 请求次数

&emsp;&emsp;【2】减少图片大小，提升网页加载速度 (多张图片加载速度小于拼合成的图片的加载速度)

&emsp;&emsp;凡事都不完美，实现优点的同时也带来了缺点，即提高了网页的开发和维护成本。

&nbsp;

### 应用场景

&emsp;&emsp;前面提到过，并不是所有的图片都可以用来制作雪碧图，只有描述性图片才适合

&emsp;&emsp;【1】对于 img 标签设置的内容性图片，是不能合并到雪碧图的，如果合并这些图片会影响页面可读性，语义化降低且可调整的范围小

&emsp;&emsp;【2】对于横向和纵向都平铺的图片，也不能合并到雪碧图中。如果是横向平铺，只能将所有横向平铺的图合并成一张大图，只能竖直排列，不能水平排列；如果是纵向平铺，只能将所有纵向平铺的图合并成一张大图，只能水平排列，不能竖直排列

![sprite1](https://pic.xiaohuochai.site/blog/helper_ps_sprite1.jpg)

&nbsp;

### 合并

&emsp;&emsp;雪碧图的制作实际上就是零星小图合并成一张大图，但小图合并需要遵循以下规则：

【1】图片在合并之前必须保留空隙

&emsp;&emsp;1、如果是小图标，留的空隙可适当小一些，一般 20 像素左右

&emsp;&emsp;2、如果是大图标，要留的空隙就要大一点，因为大图标在调整的时候，影响到的空间也会比较大

![sprite2](https://pic.xiaohuochai.site/blog/helper_ps_sprite2.jpg)

【2】图片排列方式有横向和纵向

![sprite3](https://pic.xiaohuochai.site/blog/helper_ps_sprite3.jpg)

【3】合并分类的原则

&emsp;&emsp;有三种合并分类的原则，分别是基于模块、基于大小和基于色彩

&emsp;&emsp;a、把同属一个模块的图片进行合并

![sprite4](https://pic.xiaohuochai.site/blog/helper_ps_sprite4.jpg)

&emsp;&emsp;b、把大小相近的图片进行合并

![sprite5](https://pic.xiaohuochai.site/blog/helper_ps_sprite5.jpg)

&emsp;&emsp;c、把色彩相近的图片进行合并

![sprite6](https://pic.xiaohuochai.site/blog/helper_ps_sprite6.jpg)

【4】合并推荐

&emsp;&emsp;在实际的雪碧图制作中，一般采用两种方法：一种是只本页用到的图片合并；另一种是有状态的图标合并

![sprite7](https://pic.xiaohuochai.site/blog/helper_ps_sprite7.jpg)

&nbsp;

### 手工维护

【放大画布】

&emsp;&emsp;图像 -&gt; 画布大小&lt;alt+ctrl+c&gt; -&gt; 选择定位位置(一般为左上角)

![sprite9](https://pic.xiaohuochai.site/blog/helper_ps_sprite9.jpg)

![sprite10](https://pic.xiaohuochai.site/blog/helper_ps_sprite10.jpg)

![sprite11](https://pic.xiaohuochai.site/blog/helper_ps_sprite11.jpg)

【减小画布】

&emsp;&emsp;注意：PNG8 的颜色模式默认为索引颜色模式，在修改 png8 图片时需要更改其颜色模式为 RGB 模式，步骤为图像 -&gt; 模式 -&gt; RGB 颜色

![sprite12](https://pic.xiaohuochai.site/blog/helper_ps_sprite12.jpg)

![sprite13](https://pic.xiaohuochai.site/blog/helper_ps_sprite13.jpg)

&emsp;&emsp;1、选择 图像 -&gt; 裁切 选择基于左上角像素颜色，可以实现自动裁切的效果

![sprite14](https://pic.xiaohuochai.site/blog/helper_ps_sprite14.jpg)

![sprite15](https://pic.xiaohuochai.site/blog/helper_ps_sprite15.jpg)

![sprite16](https://pic.xiaohuochai.site/blog/helper_ps_sprite16.jpg)

![sprite17](https://pic.xiaohuochai.site/blog/helper_ps_sprite17.jpg)

&emsp;&emsp;2、先选定要保留的区域，然后选择 图像 -&gt; 裁剪或者选择工具栏中的裁剪工具按钮进行裁剪

![sprite18](https://pic.xiaohuochai.site/blog/helper_ps_sprite18.jpg)

![sprite19](https://pic.xiaohuochai.site/blog/helper_ps_sprite19.jpg)

![sprite20](https://pic.xiaohuochai.site/blog/helper_ps_sprite20.jpg)

【移动图标】

&emsp;&emsp;1、若图标为独立图层，则用移动工具拖动即可

![sprite21](https://pic.xiaohuochai.site/blog/helper_ps_sprite21.jpg)

![sprite22](https://pic.xiaohuochai.site/blog/helper_ps_sprite22.jpg)

&emsp;&emsp;2、若图标为非独立图层

&emsp;&emsp;a、先用选区工具选中图标区域，再用移动工具拖动图标，这样可以移动该图层

&emsp;&emsp;b、先用选区工具选中图标区域，再剪切&lt;ctrl+x&gt;，粘贴&lt;ctrl+v&gt;，可以将原来的图层分成两个图层，更有利于操作

![sprite23](https://pic.xiaohuochai.site/blog/helper_ps_sprite23.jpg)

![sprite24](https://pic.xiaohuochai.site/blog/helper_ps_sprite24.jpg)

![sprite25](https://pic.xiaohuochai.site/blog/helper_ps_sprite25.jpg)

&nbsp;

### 客户端工具

&emsp;&emsp;在以前，我们可能需要手动实现雪碧图，这是一件非常麻烦的且容易出错的事情。现在有了很多方便的工具来制作雪碧图。我经常使用是一个叫做[css 背景合并工具](http://download.csdn.net/detail/wx247919365/8741243)的小工具。

使用方法如下图所示：

![sprite8](https://pic.xiaohuochai.site/blog/helper_ps_sprite8.gif)

&nbsp;

### gulp

&emsp;&emsp;gulp 中有一个 gulp.spritesmith 插件可以用于雪碧图的制作

```
var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');

gulp.task('img', function() {
    return gulp.src('src/img/*')
        .pipe(spritesmith({
            'imgName':'sprite.png',
            'cssName':'sprite.css',
            'padding':5 //合并时两张图片的距离
        }))
        .pipe(gulp.dest('dist/img'));
});
```
&nbsp;

### webpack

&emsp;&emsp;在 webpack 中自动生成雪碧图，需要使用 postcss-sprits 插件

```
npm install postcss-sprites
```

&emsp;&emsp;配置非常简单

```
  "plugins": {
    "postcss-sprites": {
       spritePath: 'dist/assets/imgs/sprites/'
    }
  }
}
```
