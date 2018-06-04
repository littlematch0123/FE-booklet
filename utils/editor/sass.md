# sass简明学习


&emsp;&emsp;"CSS预处理器"(css preprocessor)的基本思想是，用一种专门的编程语言，进行网页样式设计，然后再编译成正常的CSS文件。SASS是一种CSS的开发工具，提供了许多便利的写法，大大节省了设计者的时间，使得CSS的开发，变得简单和可维护。本文将详细介绍sass的使用


<p>&nbsp;</p>


### 定义

&emsp;&emsp;Sass是一门高于CSS的元语言，它能用来清晰地、结构化地描述文件样式，有着比普通CSS更加强大的功能。
Sass能够提供更简洁、更优雅的语法，同时提供多种功能来创建可维护和管理的样式表

【SASS和SCSS】

&emsp;&emsp;Sass和SCSS其实是同一种东西，我们平时都称之为Sass，两者之间不同之处有以下两点

&emsp;&emsp;1、文件扩展名不同，Sass是以“.sass”后缀为扩展名，而SCSS是以“.scss”后缀为扩展名；

&emsp;&emsp;2、语法书写方式不同，Sass是以严格的缩进式语法规则来书写，不带大括号({})和分号(;)，而SCSS的语法书写和我们的CSS语法书写方式非常类似

&emsp;&emsp;下面为Sass语法

    $font-stack: Helvetica, sans-serif  //定义变量
    $primary-color: #333 //定义变量

    body
      font: 100% $font-stack
      color: $primary-color

&emsp;&emsp;下面为SCSS语法

    $font-stack: Helvetica, sans-serif;
    $primary-color: #333;

    body {
      font: 100% $font-stack;
      color: $primary-color;
    }

&emsp;&emsp;编译出来的CSS为

    body {
      font: 100% Helvetica, sans-serif;
      color: #333;
    }


<p>&nbsp;</p>



### 安装

&emsp;&emsp;在Windows平台下安装Ruby需要先有Ruby安装包。Ruby安装文件<a href="http://rubyinstaller.org/downloads" target="_blank">下载</a>好后，可以按应用软件安装步骤进行安装Ruby

&emsp;&emsp;在安装过程中选择第二个选项(若不选中，就会出现编译时找不到Ruby环境的情况)，如下图所示

<div><img src="https://pic.xiaohuochai.site/blog/helper_sass1.png" alt="#"></div>

&emsp;&emsp;Ruby安装完成后，在开始菜单中找到新安装的Ruby，并启动Ruby的Command控制面板(Start Command Prompt with Ruby)


&emsp;&emsp;安装好Ruby之后，接下来就可以安装Sass了。打开电脑的命令终端，输入下面的命令：

    gem install sass


<div><img src="https://pic.xiaohuochai.site/blog/helper_sass2.png" alt="#"></div>

【更新Sass】

&emsp;&emsp;在命令终端执行下列命令，可以将sass升级到最高版本

    gem update sass


【卸载Sass】

&emsp;&emsp;在命令终端执行下列命令，可以卸载sass

    gem uninstall sass



<p>&nbsp;</p>

### 编译

&emsp;&emsp;Sass的编译包括以下几种方法：命令编译、GUI工具编译和自动化编译

&emsp;&emsp;注意：在编译sass时，常见的两个错误是字符编码错误(不支持gbk编码)和路径错误(不支持中文)

1、命令编译

&emsp;&emsp;命令编译是指使用电脑中的命令终端，通过输入Sass指令来编译Sass。这种编译方式是最直接也是最简单的一种方式


【单文件编译】

    sass <要编译的Sass文件路径>/style.scss:<要输出CSS文件路径>/style.css

【多文件编译】

&emsp;&emsp;下面的命令表示将项目中“sass”文件夹中所有“.scss”(“.sass”)文件编译成“.css”文件，并且将这些CSS文件都放在项目中“css”文件夹中

    sass sass/:css/

&emsp;&emsp;在实际编译过程中，会发现上面的命令只能一次性编译。每次保存“.scss”文件之后，都得重新执行一次这样的命令。如此操作太麻烦，其实还有一种方法，就是在编译Sass时，开启“watch”功能，这样只要代码进行任何修改，都能自动监测到代码的变化，并且直接编译出来：

&emsp;&emsp;注意：冒号的左右两侧一定不要留空格

    sass --watch <要编译的Sass文件路径>/style.scss:<要输出CSS文件路径>/style.css

    sass --watch sass/test.scss:css/test.css

<div><img src="https://pic.xiaohuochai.site/blog/helper_sass3.png" alt="#"></div>

<p><strong>调试</strong></p>


&emsp;&emsp;使用chrome浏览器的sourcemap功能可以将本地的文件和服务器上的文件关联起来。这样，通过chrome的开发者工具调试网页(如更改一个css属性值)时，本地文件的内容也会相应地发生变化并保存。如果再使用sass的watch命令， 在调试sass文件时，就可以实时保存文件并通过浏览器看到效果

&emsp;&emsp;如下图所示，点击map to network resource，把本地文件关联到服务器上相应文件。浏览器会智能地把项目目录下的其他css文件和html文件和服务器上对应的文件都关联起来


<div><img src="https://pic.xiaohuochai.site/blog/helper_sass4.png" alt="#"></div>

<div><img src="https://pic.xiaohuochai.site/blog/helper_sass5.gif" alt="#"></div>


<p><strong>编译风格</strong></p>



&emsp;&emsp;SASS提供四个编译风格的选项：

    nested：嵌套缩进的css代码，它是默认值。
    expanded：没有缩进的、扩展的css代码。
    compact：简洁格式的css代码。
    compressed：压缩后的css代码。

&emsp;&emsp;生产环境当中，一般使用最后一个选项

    sass --style compressed test.sass test.css

2、GUI编译

&emsp;&emsp;一般地，使用koala编译器来对sass进行编译

<div><img src="https://pic.xiaohuochai.site/blog/helper_sass6.jpg" alt="#"></div>


3、自动化编译

&emsp;&emsp;使用grunt或gulp可以配置sass的编译


&emsp;&emsp;下面以grunt为例，首先需要安装sass插件


    npm install grunt-contrib-sass --save-dev



&emsp;&emsp;然后，初始化grunt配置

    grunt.initConfig({
      sass: {                              // Task 
        dist: {                            // Target 
          options: {                       // Target options 
            style: 'expanded'
          },
          files: {                         // Dictionary of files 
            'main.css': 'main.scss',       // 'destination': 'source' 
            'widgets.css': 'widgets.scss'
          }
        }
      }
    });


&emsp;&emsp;接下来，告诉grunt将使用该插件

    grunt.loadNpmTasks('grunt-contrib-sass');


&emsp;&emsp;最后，告诉grunt当我们在终端中输入grunt时需要做些什么

    grunt.registerTask('default', ['sass']);


<p>&nbsp;</p>


## 语法


### 数据类型

&emsp;&emsp;SassScript 支持六种主要的数据类型：

&emsp;&emsp;1、数字(例如 1.2、13、10px)

&emsp;&emsp;2、文本字符串，无论是否有引号(例如 "foo"、'bar'、baz)

&emsp;&emsp;3、颜色(例如 blue、#04a3f9、rgba(255, 0, 0, 0.5))

&emsp;&emsp;4、布尔值(例如 true、false)

&emsp;&emsp;5、空值(例如 null)

&emsp;&emsp;6、值列表，用空格或逗号分隔(例如 1.5em 1em 0 2em、Helvetica, Arial, sans-serif)

&emsp;&emsp;Sass还支持所有其他CSS属性值类型，例如Unicode范围和!important声明。然而，它不会对这些类型做特殊处理。它们只会被当做不带引号的字符串看待

<p>&nbsp;</p>

### 注释

&emsp;&emsp;sass有两种注释方式，一种是标准的css注释方式/* */，另一种则是//双斜杆形式的单行注释，不过这种单行注释不会输入到CSS中

    /*
    *多行注释
    */
    body{
      padding:5px;
    } 

    //单行注释
    body{
      padding:5px; //5px
    } 


<p>&nbsp;</p>


### 变量

&emsp;&emsp;SASS的变量用法类似于php与css语法的结合，所有变量以$变量，变量名和变量值之间用冒号隔开。定义之后可以在全局范围内使用

    $blue : #1875e7;　
    div {
      color : $blue;
    }

<div><img src="https://pic.xiaohuochai.site/blog/helper_sass7.png" alt="#"></div>


&emsp;&emsp;如果变量需要镶嵌在字符串之中，就必须需要写在#{}之中


    $side : left;
    .rounded {
    &emsp;&emsp;border-#{$side}-radius: 5px;
    }

【默认变量】


&emsp;&emsp;sass的默认变量仅需要在值后面加上!default即可。sass的默认变量一般用来设置默认值，然后根据需求来覆盖。覆盖的方式也很简单，只需要在默认变量之前重新声明变量即可

    //sass style
    //-------------------------------
    $baseLineHeight:        2;
    $baseLineHeight:        1.5 !default;
    body{
        line-height: $baseLineHeight; 
    }

    //css style
    //-------------------------------
    body{
        line-height:2;
    } 

【特殊变量】

&emsp;&emsp;一般我们定义的变量都为属性值，可直接使用，但是如果变量作为属性或在某些特殊情况下(如嵌套在字符串中)等则必须要以#{$variables}形式使用

    $borderDirection:       top !default; 
    $baseFontSize:          12px !default;

    //应用于class和属性
    .border-#{$borderDirection}{
      border-#{$borderDirection}:1px solid #ccc;
    }
    //应用于复杂的属性值
    body{
        font:#{$baseFontSize}/#{$baseLineHeight};
    }

【全局及局部变量】


&emsp;&emsp;在选择器、函数、混合宏...的里面定义的变量叫局部变量，它们的外面定义的变量为全局变量

    //scss
    $color: orange;
    .block {
      color: $color;//调用全局变量
    }
    em {
      $color: red;//定义局部变量
      a {
        color: $color;//调用局部变量
      }
    }
    span {
      color: $color;//调用全局变量
    }

    //CSS
    .block {
      color: orange;
    }
    em a {
      color: red;
    }
    span {
      color: orange;
    }


<p>&nbsp;</p>


### 嵌套

&emsp;&emsp;选择器嵌套提供了一个通过局部选择器相互嵌套实现全局选择的方法，Sass 的嵌套分为两种：1、选择器嵌套；2、属性嵌套

【选择器嵌套】

&emsp;&emsp;注意：在sass嵌套嵌套中，可以使用&表示父元素选择器

    #top_nav{
      line-height: 40px;
      li{
        float:left;
      }
      a{
        display: block;
        padding: 0 10px;
        color: #fff;

        &:hover{
          color:#ddd;
        }
      }
    }

    //css style
    //-------------------------------
    #top_nav{
      line-height: 40px;
    }  
    #top_nav li{
      float:left;
    }
    #top_nav a{
      display: block;
      padding: 0 10px;
      color: #fff;
    }
    #top_nav a:hover{
      color:#ddd;
    }

【属性嵌套】

&emsp;&emsp;CSS有一些属性前缀相同，只是后缀不一样，比如：border-top/border-right，与这个类似的还有 margin、padding、font等

&emsp;&emsp;注意：border后面必须有冒号

    //css
    .box {
        border-top: 1px solid red;
        border-bottom: 1px solid green;
    }
    //scss
    .box {
      border: {
       top: 1px solid red;
       bottom: 1px solid green;
      }
    }



<p>&nbsp;</p>

### 混合宏

&emsp;&emsp;混合宏是可以重用的代码块

&emsp;&emsp;在Sass中，使用“@mixin”来声明一个混合宏

    @mixin border-radius{
        -webkit-border-radius: 5px;
        border-radius: 5px;
    }

&emsp;&emsp;可以使用`@include`命令，来调用混合宏mixin

    button {
        @include border-radius;
    }
  

&emsp;&emsp;mixin指定参数和缺省值

    @mixin border-radius($radius:5px){
        -webkit-border-radius: $radius;
        border-radius: $radius;
    }
    div{
      @include border-radius(10px);
    }



&emsp;&emsp;Sass中的混合宏还提供更为复杂的情况，可以在大括号里面带有逻辑关系

    @mixin box-shadow($shadow...) {
      @if length($shadow) >= 1 {
        @include prefixer(box-shadow, $shadow);
      } @else{
        $shadow:0 0 4px rgba(0,0,0,.3);
        @include prefixer(box-shadow, $shadow);
      }
    }


&emsp;&emsp;Sass在调用相同的混合宏时，并不能智能的将相同的样式代码块合并在一起。这也是 Sass的混合宏最大的不足之处

【占位符】
 
 &emsp;&emsp;占位符是介于混合宏和变量之间的一个功能

    //SCSS
    %mt5 {
      margin-top: 5px;
    }
    %pt5{
      padding-top: 5px;
    }

    .block {
      @extend %mt5;

      span {
        @extend %pt5;
      }
    }

    //CSS
    .block {
      margin-top: 5px;
    }

    .block span {
      padding-top: 5px;
    }


<p>&nbsp;</p>

### 继承

&emsp;&emsp;SASS允许一个选择器，继承另一个选择器。比如，现有class1

      .class1{
          border: 1px solid black;
      }

&emsp;&emsp;class2要继承class1，就要使用`@extend`命令

    .class2{
      @extend .class1;
      font-size:120%;
    }

&emsp;&emsp;Sass中的继承，可以继承类样式块中所有样式代码，而且编译出来的CSS会将选择器合并在一起，形成组合选择器

    //SCSS
    .btn {
      border: 1px solid #ccc;
      padding: 6px 10px;
      font-size: 14px;
    }
    .btn-primary {
      background-color: #f36;
      @extend .btn;
    }
    .btn-second {
      background-color: orange;
      @extend .btn;
    }
    //CSS
    .btn, .btn-primary, .btn-second {
      border: 1px solid #ccc;
      padding: 6px 10px;
      font-size: 14px;
    }
    .btn-primary {
      background-color: #f36;
    }
    .btn-second {
      background-clor: orange;
    }



<p>&nbsp;</p>

### 运算

&emsp;&emsp;SASS允许在代码中使用算式

【注意事项】

&emsp;&emsp;1、100px * 2px会报错，乘法应该写成100px * 2

&emsp;&emsp;2、因为除号/在CSS中在特殊的含义，所以为了避免除法不生效，需要在外面添加一个小括号

&emsp;&emsp;3、类似于javascript，sass中的加法也有字符串连接的作用

    $num: '1' + '1';   
    body{
      top: 10px + 10px;//20
      left: 10px - 10px;//0
      right: 100px *2;//200
      bottom: (100px/2);//50
      width: $num;//11
    }



<p>&nbsp;</p>

### 语句

【条件语句】

&emsp;&emsp;`@if`指令是一个SassScript，它可以根据条件来处理样式块，如果条件为true返回一个样式块，反之false返回另一个样式块。在Sass中除了`@if`，还可以配合`@else if`或`@else`一起使用

    //scss
    @mixin blockOrHidden($boolean:true) {
      @if $boolean {
          display: block;
        }
      @else {
          display: none;
        }
    }
    .block {
      @include blockOrHidden;
    }

    .hidden{
      @include blockOrHidden(false);
    }

    //CSS:
    .block {
      display: block;
    }
    .hidden {
      display: none;
    }


【循环语句】

<p><strong>for循环</strong></p>

&emsp;&emsp;Sass中的for循环有两种方式

    @for $i from <start> through <end>
    @for $i from <start> to <end>

&emsp;&emsp;这两个的区别是关键字through表示包括end，而to则不包括end

    //scss
    @for $i from 1 through 3 {
      .item-#{$i} { width: 2em * $i; }
    }
    //css
    .item-1 {
      width: 2em;
    }
    .item-2 {
      width: 4em;
    }
    .item-3 {
      width: 6em;
    }


<p><strong>while循环</strong></p>

    //SCSS
    $types: 4;
    $type-width: 20px;
    @while $types > 0 {
        .while-#{$types} {
            width: $type-width + $types;
        }
        $types: $types - 1;
    }

    //css
    .while-4 {
      width: 24px;
    }

    .while-3 {
      width: 23px;
    }

    .while-2 {
      width: 22px;
    }

    .while-1 {
      width: 21px;
    }


<p><strong>each循环</strong></p>

    //scss
    $list: adam john wynn mason kuroir;
    @mixin author-images {
        @each $author in $list {
            .photo-#{$author} {
                background: url("/images/avatars/#{$author}.png") no-repeat;
            }
        }
    }
    .author-bio {
        @include author-images;
    }

    //css
    .author-bio .photo-adam {
      background: url("/images/avatars/adam.png") no-repeat; }
    .author-bio .photo-john {
      background: url("/images/avatars/john.png") no-repeat; }
    .author-bio .photo-wynn {
      background: url("/images/avatars/wynn.png") no-repeat; }
    .author-bio .photo-mason {
      background: url("/images/avatars/mason.png") no-repeat; }
    .author-bio .photo-kuroir {
      background: url("/images/avatars/kuroir.png") no-repeat; }


<p>&nbsp;</p>

### 函数

&emsp;&emsp;在命令终端开启sass -i这个命令，相当于开启Sass的函数计算  

    sass -i

【字符串函数】


&emsp;&emsp;`unquote($string)`：删除字符串中的引号
    
    //SCSS
    .test1 {
        content:  unquote('Hello Sass!') ;
    }
    .test3 {
        content: unquote("I'm Web Designer");
    }
    .test5 {
        content: unquote('"Hello Sass!"');
    }
    //css
    .test1 {
      content: Hello Sass!; }
    .test3 {
      content: I'm Web Designer; }
    .test5 {
      content: "Hello Sass!"; }


&emsp;&emsp;`quote($string)`：给字符串添加引号，如果字符串自身带有引号会统一换成双引号""

    //SCSS
    .test1 {
        content:  quote('Hello Sass!');
    }
    .test2 {
        content: quote("Hello Sass!");
    }
    .test3 {
        content: quote(ImWebDesigner);
    }
    .test4 {
        content: quote(' ');
    }
    //CSS
    .test1 {
      content: "Hello Sass!";
    }
    .test2 {
      content: "Hello Sass!";
    }
    .test3 {
      content: "ImWebDesigner";
    }
    .test4 {
      content: "";
    }

&emsp;&emsp;`To-upper-case()`：将字符串小写字母转换成大写字母

    //SCSS
    .test {
      text: to-upper-case(aaaaa);
      text: to-upper-case(aA-aAAA-aaa);
    }
    //CSS
    .test {
      text: AAAAA;
      text: AA-AAAA-AAA;
    } 

&emsp;&emsp;`To-lower-case()`：将字符串转换成小写字母

    //SCSS
    .test {
      text: to-lower-case(AAAAA);
      text: to-lower-case(aA-aAAA-aaa);
    }
    //CSS
    .test {
      text: aaaaa;
      text: aa-aaaa-aaa;
    } 

【数字函数】

&emsp;&emsp;`percentage($value)`：将一个不带单位的数转换成百分比值

    //scss
    .footer{
        width : percentage(.2)
    }
    //css
    .footer{
        width : 20%
    }

&emsp;&emsp;`round()`将一个数四舍五入为一个最接近的整数

    //scss
    .footer1 {
       width:round(15.8px)
    }
    .footer2 {
       width:round(3.4em)
    }
    //css
    .footer1 {
       width:16px
    }
    .footer2 {
       width:3em
    }

&emsp;&emsp;`ceil()`向上取整

    //scss
    .footer1 {
       width:ceil(15.8px)
    }
    .footer2 {
       width:ceil(3.4em)
    }
    //css
    .footer1 {
       width:16px
    }
    .footer2 {
       width:4em
    }

&emsp;&emsp;`floor()`向下取整

    //scss
    .footer1 {
       width:floor(15.8px)
    }
    .footer2 {
       width:floor(3.4em)
    }
    //css
    .footer1 {
       width:15px
    }
    .footer2 {
       width:3em
    }


&emsp;&emsp;`abs()`取绝对值

    //scss
    .footer1 {
       width:abs(-15.8px)
    }
    .footer2 {
       width:abs(3.4em)
    }
    //css
    .footer1 {
       width:15.7px
    }
    .footer2 {
       width:3.4em
    }

&emsp;&emsp;`min()`取最小值，`max()`取最大值

&emsp;&emsp;注意：min()和max()都只可以比较相同单位的数值，否则会报错

    //scss
    div{
        height:max(10px,23px);
        width:min(10px,23px);
    }
    //css
    div{
      height:23px;
      width:10px;
    }

&emsp;&emsp;`random()`用来获取一个随机数

    //scss
    div{
        color: rgba(200, 150, 40, random());
    }
    //css
    div {
      color: rgba(200, 150, 40, 0.57236);
    }

【列表函数】

&emsp;&emsp;`length()`用来返回一个列表中有几个值。length()函数中的列表参数之间使用空格隔开，不能使用逗号，否则函数将会出错

    >> length(10px)
    1
    >> length(10px 20px (border 1px solid) 2em)
    4
    >> length(border 1px solid)
    3

&emsp;&emsp;`nth($list,$n)`用来指定列表中某个位置的值，nth()函数的起始值为1

    >> nth(10px 20px 30px,1)
    10px
    >> nth((Helvetica,Arial,sans-serif),2)
    "Arial"
    >> nth((1px solid red) border-top green,1)
    (1px "solid" #ff0000)

&emsp;&emsp;`join()`用来将两个列表连接合并成一个列表。不过join()只能将两个列表连接成一个列表，如果直接连接两个以上的列表将会报错

    >> join(10px 20px, 30px 40px)
    (10px 20px 30px 40px)
    >> join((blue,red),(#abc,#def))
    (#0000ff, #ff0000, #aabbcc, #ddeeff)
    >> join((blue,red),(#abc #def))
    (#0000ff, #ff0000, #aabbcc, #ddeeff)

&emsp;&emsp;`append()`用来将某个值插入到列表中，并且处于最末位

    >> append(10px 20px ,30px)
    (10px 20px 30px)
    >> append((10px,20px),30px)
    (10px, 20px, 30px)
    >> append(green,red)
    (#008000 #ff0000)
    >> append(red,(green,blue))
    (#ff0000 (#008000, #0000ff))

&emsp;&emsp;`zip()`用于将多个列表值转成一个多维的列表。在使用zip()函数时，每个单一的列表个数值必须是相同的，否则将会出错

    >> zip(1px 2px 3px,solid dashed dotted,green blue red)
    ((1px "solid" #008000), (2px "dashed" #0000ff), (3px "dotted" #ff0000)) 

&emsp;&emsp;`index()`类似于索引一样，用来找出某个值在列表中所处的位置。起始值是1，不是0

    >> index(1px solid red, 1px)
    1
    >> index(1px solid red, solid)
    2
    >> index(1px solid red, red)
    3 

&emsp;&emsp;`type-of()`主要用来判断一个值是属于什么类型

&emsp;&emsp;number为数值型，string为字符串型，bool为布尔型，color为颜色型

    >> type-of(100)
    "number"
    >> type-of(100px)
    "number"
    >> type-of("asdf")
    "string"
    >> type-of(asdf)
    "string"
    >> type-of(true)
    "bool"
    >> type-of(false)
    "bool"
    >> type-of(#fff)
    "color"
    >> type-of(blue)
    "color"
    >> type-of(1 / 2 = 1)
    "string"

&emsp;&emsp;`unit()`用来获取一个值所使用的单位，碰到复杂的计算时，其能根据运算得到一个“多单位组合”的值，不过只允许乘、除运算

    >> unit(100)
    ""
    >> unit(100px)
    "px"
    >> unit(20%)
    "%"
    >> unit(1em)
    "em"
    >> unit(10px * 3em)
    "em*px"
    >> unit(10px / 3em)
    "px/em"
    >> unit(10px * 2em / 3cm / 1rem)
    "em/rem"

&emsp;&emsp;`unitless()`用来判断一个值是否带有单位，如果不带单位返回的值为 true，带单位返回的值为 false

    >> unitless(100)
    true
    >> unitless(100px)
    false
    >> unitless(100em)
    false
    >> unitless(100%)
    false
    >> unitless(1 /2 )
    true
    >> unitless(1 /2 + 2 )
    true
    >> unitless(1px /2 + 2 )
    false

&emsp;&emsp;`comparable()`用来判断两个数是否可以进行“加，减”以及“合并”。如果可以返回值为true，如果不可以返回值是false

    >> comparable(2px,1%)
    false
    >> comparable(2px,1em)
    false
    >> comparable(2rem,1em)
    false
    >> comparable(2px,1cm)
    true
    >> comparable(2px,1mm)
    true  

&emsp;&emsp;`Miscellaneous()`称为三元条件函数。该函数有两个值，当条件成立返回一种值，当条件不成立时返回另一种值

    if($condition,$if-true,$if-false) 

    >> if(true,1px,2px)
    1px
    >> if(false,1px,2px)
    2px    

【颜色函数】

<p><strong>RGB颜色函数</strong></p>

&emsp;&emsp;`rgb($red,$green,$blue)`根据红、绿、蓝三个值创建一个颜色

&emsp;&emsp;`rgba($red,$green,$blue,$alpha)`根据红、绿、蓝和透明度值创建一个颜色

&emsp;&emsp;除了与CSS相同的rgba()格式外，sass中的rgba()还支持rgba($color,$alpha)的格式。在实际工作中，如果在已知颜色的情况下，不改变颜色只加透明度，这个函数就能起到效果了

    .overlayout{
      background-color:rgba(#773,0.5);
    }


&emsp;&emsp;`red($color)`从一个颜色中获取其中红色值

&emsp;&emsp;`green($color)`从一个颜色中获取其中绿色值

&emsp;&emsp;`blue($color)`从一个颜色中获取其中蓝色值

&emsp;&emsp;`mix($color-1,$color-2,[$weight])`把两种颜色混合在一起。`$color-1`和`$color-2`指需要合并的颜色，颜色可以是任何表达式，也可以是颜色变量

&emsp;&emsp;`$weight`为第一个颜色合并所占的比例(权重)，默认值为50%，其取值范围是0~1之间。它是由每个RGB的百分比来衡量的，当然透明度也会有一定的权重。默认的比例是50%，这意味着两个颜色各占一半，如果指定的比例是25%，这意味着第一个颜色所占比例为25%，第二个颜色所占比例为75%

    mix(#f00, #00f) => #7f007f
    mix(#f00, #00f, 25%) => #3f00bf
    mix(rgba(255, 0, 0, 0.5), #00f) => rgba(63, 0, 191, 0.75)


<div><img src="https://pic.xiaohuochai.site/blog/helper_sass8.png" alt="#"></div>


<p><strong>HSL颜色函数</strong></p>

&emsp;&emsp;`hsl($hue,$saturation,$lightness)`通过色相(hue)、饱和度(saturation)和亮度(lightness)的值创建一个颜色

&emsp;&emsp;`hsla($hue,$saturation,$lightness,$alpha)`通过色相(hue)、饱和度(saturation)、亮度(lightness)和透明(alpha)的值创建一个颜色

&emsp;&emsp;`hue($color)`从一个颜色中获取色相(hue)值

&emsp;&emsp;`saturation($color)`从一个颜色中获取饱和度(saturation)值

&emsp;&emsp;`lightness($color)`从一个颜色中获取亮度(lightness)值

&emsp;&emsp;`adjust-hue($color,$degrees)`通过改变一个颜色的色相值，创建一个新的颜色。色相是色彩的首要特征，是区别各种不同色彩的最准确的标准。事实上任何黑白灰以外的颜色都有色相的属性，而色相也就是由原色、间色和复色来构成的

&emsp;&emsp;`darken($color,$amount)`通过改变颜色的亮度值，让颜色变暗，创建一个新的颜色

&emsp;&emsp;`lighten($color,$amount)`通过改变颜色的亮度值，让颜色变亮，创建一个新的颜色

&emsp;&emsp;lighten()和darken()两个函数都是围绕颜色的亮度值做调整的，其中lighten()函数会让颜色变得更亮，与之相反的darken()函数会让颜色变得更暗。这个亮度值可以是0~1之间，不过常用的一般都在3%~20%之间

&emsp;&emsp;注意：当颜色亮度值接近或大于100%，颜色会变成白色；反之颜色亮度值接近或小于0时，颜色会变成黑色

    //SCSS
    $baseColor: #ad141e;
    .lighten {
        background: lighten($baseColor,10%);
    }
    .darken{
        background: darken($baseColor,10%);
    }
    //CSS
    .lighten {
      background: #db1926;
    }
    .darken {
      background: #7f0f16;
    }

<div><img src="https://pic.xiaohuochai.site/blog/helper_sass9.png" alt="#"></div>


&emsp;&emsp;`saturate($color,$amount)`通过改变颜色的饱和度值，让颜色更饱和，从而创建一个新的颜色。饱和度是指色彩的鲜艳程度，也称色彩的纯度

&emsp;&emsp;`desaturate($color,$amount)`通过改变颜色的饱和度值，让颜色更少的饱和，从而创建出一个新的颜色

&emsp;&emsp;saturate()、desaturate()这两个函数是通过改变颜色的饱和度来得到一个新的颜色，他们和前面介绍的修改亮度得到新颜色的方法非常相似

<div><img src="https://pic.xiaohuochai.site/blog/helper_sass10.png" alt="#"></div>

&emsp;&emsp;`grayscale($color)`函数会颜色的饱和度值直接调至0%，所以此函数与desaturate($color,100%)所起的功能是一样的。一般这个函数能将彩色颜色转换成不同程度的灰色将一个颜色变成灰色

    //SCSS
    $baseColor: #ad141e;
    .grayscale {
      background: grayscale($baseColor);
    }
    .desaturate {
      background: desaturate($baseColor,100%);
    }
    //CSS
    .grayscale {
      background: #616161;
    }
    .desaturate {
      background: #616161;
    }

&emsp;&emsp;`complement($color)`返回一个补充色，相当于adjust-hue($color,180deg)

&emsp;&emsp;`invert($color)`返回一个反相色，红、绿、蓝色值倒过来，而透明度不变

    >> hsl(200,30%,60%) //通过h200,s30%，l60%创建一个颜色
    #7aa3b8
     
    >> hsla(200,30%,60%,.8)//通过h200,s30%，l60%,a80%创建一个颜色
    rgba(122, 163, 184, 0.8)
     
    >> hue(#7ab)//得到#7ab颜色的色相值
    195deg
     
    >> saturation(#7ab)//得到#7ab颜色的饱和度值
    33.33333%
     
    >> lightness(#7ab)//得到#7ab颜色的亮度值
    60%
     
    >> adjust-hue(#f36,150deg) //改变#f36颜色的色相值为150deg
    #33ff66
     
    >> lighten(#f36,50%) //把#f36颜色亮度提高50%
    #ffffff
     
    >> darken(#f36,50%) //把#f36颜色亮度降低50%
    #33000d
     
    >> saturate(#f36,50%) //把#f36颜色饱和度提高50%
    #ff3366
     
    >> desaturate(#f36,50%) //把#f36颜色饱和度降低50%
    #cc667f
     
    >> grayscale(#f36) //把#f36颜色变成灰色
    #999999
     
    >> complement(#f36)
    #33ffcc



<p><strong>透明度颜色函数</strong></p>

&emsp;&emsp;在CSS中除了可以使用rgba、hsla和transform来控制颜色透明度之外，还可以使用opacity来控制，只不过前两者只是针对颜色上的透明通道做处理，而后者是控制整个元素的透明度

&emsp;&emsp;`alphpa()`和`opacity()`很简单，与前面介绍的red()、green()等函数很类似。函数的主要功能是用来获取一个颜色的透明度值。如果颜色没有特别指定透明度，那么这两个函数得到的值都会是1

    >> alpha(red)
    1
    >> alpha(rgba(red,.8))
    0.8
    >> opacity(red)
    1
    >> opacity(rgba(red,.8))
    0.8

&emsp;&emsp;`opacify()`和`fade-in()`是用来对已有颜色的透明度做一个加法运算，会让颜色更加不透明。其接受两个参数，第一个参数是原始颜色，第二个参数是需要增加的透明度值，其取值范围主要是在0~1之间。当透明度值增加到大于1时，会以1计算，表示颜色不具有任何透明度

    >> opacify(rgba(22,34,235,.6),.2)
    rgba(22, 34, 235, 0.8)
    >> opacify(rgba(22,34,235,.6),.5)
    #1622eb
    >> opacify(hsla(22,34%,23%,.6),.15)
    rgba(79, 53, 39, 0.75)
    >> opacify(hsla(22,34%,23%,.6),.415)
    #4f3527
    >> opacify(red,.15)
    #ff0000
    >> opacify(#89adde,.15)
    #89adde
    >> fade-in(rgba(23,34,34,.5),.15)
    rgba(23, 34, 34, 0.65)
    >> fade-in(rgba(23,34,34,.5),.615)
    #172222


&emsp;&emsp;`transparentize()`和`fade-out()`所起作用刚好与opacify()和fade-in()函数相反，让颜色更加的透明。这两个函数会让透明值做减法运算，当计算出来的结果小于0时会以0计算，表示全透明

    >> transparentize(red,.5)
    rgba(255, 0, 0, 0.5)
    >> transparentize(#fde,.9)
    rgba(255, 221, 238, 0.1)
    >> transparentize(rgba(98,233,124,.3),.11)
    rgba(98, 233, 124, 0.19)
    >> transparentize(rgba(98,233,124,.3),.51)
    rgba(98, 233, 124, 0)
    >> fade-out(red,.9)
    rgba(255, 0, 0, 0.1)
    >> fade-out(hsla(98,6%,23%,.5),.1)
    rgba(58, 62, 55, 0.4)
    >> fade-out(hsla(98,6%,23%,.5),.6)
    rgba(58, 62, 55, 0)
  

<p>&nbsp;</p>


### 数组

&emsp;&emsp;Sass的map常常被称为数据地图，也有人称其为数组，因为它总是以key:value成对的出现，但其更像是一个JSON数据

    $map: (
        key1: value1,
        key2: value2,
        key3: value3
    )

&emsp;&emsp;首先有一个类似于Sass的变量一样，用个$加上命名空间来声明map。后面紧接是一个小括号()，将数据以key:value的形式赋予，其中key和value是成对出现，并且每对之间使用逗号(,)分隔，其中最后一组后面没有逗号。其中键key是用来查找相关联的值value。使用map可以很容易收集键的值和动态插入

&emsp;&emsp;在Sass中常用下面的方式定义变量

    $default-color: #fff !default;
    $primary-color: #22ae39 !default;

&emsp;&emsp;使用map可以更好的进行管理

    $color: (
        default: #fff,
        primary: #22ae39
    );    

&emsp;&emsp;如果哪天需要新增加颜色变量值，在map中可以非常方便的添加

    $color: (
        default: #fff,
        primary: #22ae39,
        negative: #d9534f
    );

&emsp;&emsp;对于map，还可以让map嵌套map。其实就是map的某一个key当成map，里面可以继续放一对或者多对key:value

    $map: (
        key1: value1,
        key2: (
            key-1: value-1,
            key-2: value-2,
        ),
        key3: value3
    );

&emsp;&emsp;map嵌套的实用性强，在换肤项目中，每一套皮肤对应的颜色蛮多的，使用map嵌套来管理颜色的变量就非常的有条理性，便于维护与管理

    $theme-color: (
        default: (
            bgcolor: #fff,
            text-color: #444,
            link-color: #39f
        ),
        primary:(
            bgcolor: #000,
            text-color:#fff,
            link-color: #93f
        ),
        negative: (
            bgcolor: #f36,
            text-color: #fefefe,
            link-color: #d4e
        )
    );

&emsp;&emsp;为了方便的操作map，在Sass中map自身带了七个函数

&emsp;&emsp;`map-get($map,$key)`用来根据`$key`参数，返回`$key`在`$map`中对应的value值。如果`$key`不存在`$map`中，将返回null值。该函数包含两个参数：`$map`表示定义好的map；`$key`表示需要遍历的key

    //scss 
    $social-colors: (
        dribble: #ea4c89,
        facebook: #3b5998,
        github: #171515,
        google: #db4437,
        twitter: #55acee
    );
    .btn-dribble{
      color: map-get($social-colors,facebook);
    }
    //css
    .btn-dribble {
      color: #3b5998;
    }

&emsp;&emsp;如果是多重数组，可以嵌套使用`map-get()`函数来获取值

    //scss
    $theme-color: (
        default: (
            bgcolor: #fff,
            text-color: #444,
            link-color: #39f
        ),
        primary:(
            bgcolor: #000,
            text-color:#fff,
            link-color: #93f
        ),
        negative: (
            bgcolor: #f36,
            text-color: #fefefe,
            link-color: #d4e
        )
    );
    h1{
      color:map-get(map-get($theme-color,default),text-color);   
    }
    //css
    h1 {
      color: #444;
    }

&emsp;&emsp;`map-has-key($map,$key)`用来判断map中是否存在参数中的key，如果存在则返回true，否则返回false

    //scss
    $social-colors: (
        dribble: #ea4c89,
        facebook: #3b5998,
        github: #171515,
        google: #db4437,
        twitter: #55acee
    );
    @if map-has-key($social-colors,facebook){
        .btn-facebook {
            color: map-get($social-colors,facebook);
        }
    } @else {
        @warn "No color found for faceboo in $social-colors map. Property ommitted."
    }
    //css
    .btn-fackbook{
        color: #3b5998;
    }   


&emsp;&emsp;如果使用上面的写法，每获取一个key都需要写一个if语句，其实可以自定义函数来解决这个问题

    //scss
    $social-colors: (
        dribble: #ea4c89,
        facebook: #3b5998,
        github: #171515,
        google: #db4437,
        twitter: #55acee
    );
    @function colors($color){
        @if not map-has-key($social-colors,$color){
            @warn "No color found for `#{$color}` in $social-colors map. Property omitted.";
        }
        @return map-get($social-colors,$color);
    }
    .btn-dribble {
        color: colors(dribble);
    }
    .btn-facebook {
        color: colors(facebook);
    }
    .btn-github {
        color: colors(github);
    }
    .btn-google {
        color: colors(google);
    }
    .btn-twitter {
        color: colors(twitter);
    }
    .btn-weibo {
        color: colors(weibo);
    }
    //css
    .btn-dribble {
      color: #ea4c89;
    }
    .btn-facebook {
      color: #3b5998;
    }
    .btn-github {
      color: #171515;
    }
    .btn-google {
      color: #db4437;
    }
    .btn-twitter {
      color: #55acee;
    }

  &emsp;&emsp;用each()循环来减少重复

      @each $social-network,$social-color in $social-colors {
        .btn-#{$social-network} {
            color: colors($social-network);
        }
    }


&emsp;&emsp;`map-keys($map)`将返回`$map`中的所有key。这些值赋予给一个变量，就是一个列表

    //scss
    $social-colors: (
        dribble: #ea4c89,
        facebook: #3b5998,
        github: #171515,
        google: #db4437,
        twitter: #55acee
    );

    @each $i in map-keys($social-colors){
      .c-#{$i}{
        color: map-get($social-colors,$i);
      }
    };
    //css
    .c-dribble {
      color: #ea4c89;
    }
    .c-facebook {
      color: #3b5998;
    }
    .c-github {
      color: #171515;
    }
    .c-google {
      color: #db4437;
    }
    .c-twitter {
      color: #55acee;
    }

&emsp;&emsp;`map-values($map)`类似于`map-keys($map)`功能，不同的是，`map-values($map)`得到的是键值，而`map-keys($map)`得到的是键名

    //scss
    $social-colors: (
        dribble: #ea4c89,
        facebook: #3b5998,
        github: #171515,
        google: #db4437,
        twitter: #55acee
    );

    @each $val in map-values($social-colors){
      .c-#{$val}{
        color: $val;
      }
    };
    //css
    .c-dribble {
      color: #ea4c89;
    }
    .c-facebook {
      color: #3b5998;
    }
    .c-github {
      color: #171515;
    }
    .c-google {
      color: #db4437;
    }
    .c-twitter {
      color: #55acee;
    }


&emsp;&emsp;`map-merge($map1,$map2)`用于将`$map1`和`$map2`合并，然后得到一个新的`$map`。如果`$map1`和`$map2`中有相同的`$key`名，那么将`$map2`中的`$key`会取代`$map1`中的`$key`

    $color: (
        text: #f36,
        link: #f63,
        border: #ddd,
        backround: #fff
    );
    $typo:(
        font-size: 12px,
        line-height: 1.6,
        border: #ccc,
        background: #000
    );
    $newmap: map-merge($color,$typo);
    $newmap:(
        text: #f36,
        link: #f63,
        font-size: 12px,
        line-height: 1.6,
        border: #ccc,
        background: #000
    );

&emsp;&emsp;`map-remove($map,$key)`用来删除当前map中的某一个key，从而得到一个新的map。其返回的值还是一个map。他并不能直接从一个map中删除另一个map，仅能通过删除map中的某个key得到新map。如果删除的key并不存在于map中，那么`map-remove()`函数返回的新map和以前的map一样

    $social-colors: (
        dribble: #ea4c89,
        facebook: #3b5998,
        github: #171515,
        google: #db4437,
        twitter: #55acee
    );
    $map:map-remove($social-colors,dribble);
    $map:(
        facebook: #3b5998,
        github: #171515,
        google: #db4437,
        twitter: #55acee
    );

&emsp;&emsp;`keywords($args)`是一个动态创建map的函数。可以通过混合宏或函数的参数变创建map。参数也是成对出现，其中`$args`变成key(会自动去掉`$`符号)，而`$args`对应的值就是value

    @mixin map($args...){
        @debug keywords($args);
    }
    @include map(
      $dribble: #ea4c89,
      $facebook: #3b5998,
      $github: #171515,
      $google: #db4437,
      $twitter: #55acee
    );
    在命令终端可以看到一个@debug信息：
     DEBUG: (dribble: #ea4c89, facebook: #3b5998, github: #171515, google: #db4437, twitter: #55acee)


<p>&nbsp;</p>

### 指令

&emsp;&emsp;Sass支持所有CSS3的`@`规则，以及一些Sass专属的规则，也被称为“指令(directives)”

【@import】

&emsp;&emsp;Sass扩展了CSS的`@import`规则，让它能够引入SCSS和Sass文件。所有引入的SCSS和Sass文件都会被合并并输出一个单一的CSS文件。另外，被导入的文件中所定义的变量或mixins都可以在主文件中使用

&emsp;&emsp;Sass会在当前目录下寻找其他Sass文件，如果是Rack、Rails或Merb环境中则是Sass文件目录。也可以通过:load_paths选项或者在命令行中使用--load-path选项来指定额外的搜索目录

&emsp;&emsp;`@import`根据文件名引入。默认情况下，它会寻找Sass文件并直接引入，但是，在少数几种情况下，它会被编译成CSS的`@import`规则，包括以下几种情况：如果文件的扩展名是.css；如果文件名以http://开头；如果文件名是url()；如果`@import`包含了任何媒体查询(mediaqueries)

&emsp;&emsp;如果上述情况都没有出现，并且扩展名是.scss或.sass，该名称的Sass或SCSS文件就会被引入。如果没有扩展名，Sass将试着找出具有.scss或.sass扩展名的同名文件并将其引入

【@media】

&emsp;&emsp;Sass中的`@media`指令和CSS的使用规则一样的简单，但它有另外一个功能，可以嵌套在CSS规则中。有点类似JS的冒泡功能一样，如果在样式中使用`@media`指令，它将冒泡到外面

    //scss
    .sidebar {
      width: 300px;
      @media screen and (orientation: landscape) {
        width: 500px;
      }
    }
    //css
    .sidebar {
      width: 300px; }
      @media screen and (orientation: landscape) {
        .sidebar {
          width: 500px; } }

【@extend】

&emsp;&emsp;Sass中的`@extend`是用来扩展选择器或占位符

    //scss
    .error {
      border: 1px #f00;
      background-color: #fdd;
    }
    .error.intrusion {
      background-image: url("/image/hacked.png");
    }
    .seriousError {
      @extend .error;
      border-width: 3px;
    }
    //css
    .error, .seriousError {
      border: 1px #f00;
      background-color: #fdd; }

    .error.intrusion, .seriousError.intrusion {
      background-image: url("/image/hacked.png"); }

    .seriousError {
      border-width: 3px; }  

【@at-root】

&emsp;&emsp;`@at-root`从字面上解释就是跳出根元素。当选择器嵌套多层之后，想让某个选择器跳出，此时就可以使用`@at-root`

    //scss
    .a {
      color: red;
      .b {
        color: orange;
        .c {
          color: yellow;
          @at-root .d {
            color: green;
          }
        }
      }  
    }
    //css
    .a {
      color: red;
    }
    .a .b {
      color: orange;
    }
    .a .b .c {
      color: yellow;
    }
    .d {
      color: green;
    }     

【@debug】

&emsp;&emsp;`@debug`在Sass中是用来调试的，当在Sass的源码中使用了`@debug`指令之后，Sass代码在编译出错时，在命令终端会输出设置的提示Bug:

    @debug 10em + 12em;
    会输出：
    Line 1 DEBUG: 22em  


【@error、@warn】

&emsp;&emsp;`@error`和`@warn`、`@debug`功能类似，可类比于javascript中的console.error()、console.warn()和console.debug()

<p>&nbsp;</p>


### 实例

&emsp;&emsp;下面来使用SCSS来实现一个七色卡片的效果，如下图所示

<div><img src="https://pic.xiaohuochai.site/blog/helper_sass11.png" alt="#"></div>

&emsp;&emsp;首先，要了解颜色模式除了RGB模式，还有HSL模式

&emsp;&emsp;h:色调(hue)可以为任意整数。0(或360或-360)表示红色，60表示黄色，120表示绿色，180表示青色，240表示蓝色，300表示洋红(当h值大于360时，实际的值等于该值模360后的值)

&emsp;&emsp;s:饱和度(saturation)，就是指颜色的深浅度和鲜艳程度。取0-100%范围的值，其中0表示灰度(没有该颜色)，100%表示饱和度最高(颜色最鲜艳)

&emsp;&emsp;l:亮度(lightness)，取0-100%范围的值，其中0表示最暗(黑色)，100%表示最亮(白色)   

&emsp;&emsp;注意：关于CSS中HSL模式的详细信息<a href="http://www.cnblogs.com/xiaohuochai/p/5204448.html#anchor5" target="_blank">移步至此</a>


&emsp;&emsp;由于对色彩知识并没有深入的了解，就以图片表观上从左到右亮度逐渐变小为依据，来写CSS

&emsp;&emsp;下面来分析图片，从上到下分别是红、橙、黄、蓝、绿、紫、黑七种颜色，共7行。每行都有21列，从左到右，亮度逐渐变小。最左列为纯白，最右列为纯黑。所以，可以以最中心列的颜色为起点，向左10列，每列亮度增加10%，最左列亮度为100%。向右10列，每列亮度减小10%，最右列亮度为0%

&emsp;&emsp;使用量图工具，量得每一行中心列的颜色值从上到下分别为：#e02744、#ec8a00、#fae200、#91de00、#47c9f2、#a500fe、#848484


&emsp;&emsp;下面要使用SASS中关于亮度改变的函数：darken()让颜色变暗和lighten()让颜色变亮

&emsp;&emsp;在lighten()函数中，参数amount为50%，则为全白。所以，第1到第10列的参数amount为从50%到5%；类似地，在darken()函数中，参数amount为50%，则为全黑。所以，第12到第21列的参数amount为从5%到50%

【HTML代码】

    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Document</title>
      <link rel="stylesheet" href="css/test.css">
    </head>
    <body>
    <div class="box">
      <ul class="red">
        <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
      </ul>
      <ul class="orange">
        <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
      </ul>
      <ul class="yellow">
        <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
      </ul>
      <ul class="green">
        <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
      </ul>   
      <ul class="blue">
        <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
      </ul> 
      <ul class="purple">
        <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
      </ul>
      <ul class="grey">
        <li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li>
      </ul>     
    </div>
    </body>
    </html>

【SASS代码】

    body{margin: 0}
    ul{margin: 0;padding: 0;list-style:none;overflow: hidden}
    li{float:left;height: 30px;width: 20px;}
    //定义colorMap用于储存每一行中间列的颜色值
    $colorMap: (
      red: #e02744,
      orange: #ec8a00,
      yellow: #fae200,
      green: #91de00,
      blue: #47c9f2,
      purple: #a500fe,
      grey: #848484
    );
    //为一行中的每个元素设置背景颜色
    @mixin changelightness($color){
      @for $index from 1 through 21 {
        //从第一列到第十列，亮度增大值由50%变化到5%
        @if($index < 11){
          //amount表示当前列的亮度
          $amount: percentage((11-$index)/20);
          li:nth-child(#{$index}) {
            background-color: lighten($color,$amount);
          }
        }
        //第十一列为中心列，以测量值赋值
        @if($index == 11){    
          li:nth-child(#{$index}){
              background-color: $color;
          }
        }  
        //从第十二列到第二十一列，亮度减小值由5%变化到50%
        @if($index > 11){ 
            $amount: percentage(($index - 11)/20);
            li:nth-child(#{$index}){
              background-color: darken($color,$amount);
            }
        }  
      }
    }
    //通过forEach循环为每一行(也就是HTML结构中的每一个ul)添加样式
    @each $index in map-keys($colorMap){
      .#{$index}{
        @include changelightness(map-get($colorMap,$index));
      }
    }


【实际效果】

<iframe style="width: 100%; height: 220px" src="https://demo.xiaohuochai.site/sass/s1.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>