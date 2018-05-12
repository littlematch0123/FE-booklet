# CSS命名实践

&emsp;&emsp;每次写HTML结构涉及到CSS命名时，都要挣扎一番。关于CSS命名的规范，市面上有不少，如OOCSS、SMACSS、BEM和MVCSS等。在这里面最火的应该算BEM了。本文将详细介绍CSS命名

&nbsp;

### 主流命名

【BEM】

&emsp;&emsp;说起CSS命名，当然要提到BEM。BEM的意思就是B模块(block)、E元素(element)、M修饰符(modifier)。模块和子元素之间用两个下划线分隔，子元素和修饰符之间用两个中划线分隔

&emsp;&emsp;关于子元素E，有两种写法。一种是按照层级嵌套来写，如`block-ele1-son-inner`，但是这样写会导致命名过长；另一种是扁平化，一个模块B下的所有子元素，无论相互层级如何，都直接连接B，如`block-inner`，但是这样就无法表示层级关系，命名时也可能会出现冲突

&emsp;&emsp;BEM的命名是很好的，不然也不能成为最流行的命名方法。但是，BEM对子元素的命名，无论是层级长命名还是扁平化短命名，都有缺陷

【NEC】

&emsp;&emsp;相较于BEM以模块B为顶级元素，子元素类名中包含继承关系的命名，网易的[NEC规范](http://nec.netease.com/standard/css-name.html)使用后代选择器方式

&emsp;&emsp;NEC将元素分为了5类：布局(grid)(.g-)；模块(module)(.m-)；元件(unit)(.u-)；功能(function)(.f-)；皮肤(skin)(.s-)；状态(.z-)。而后代选择器不需要完整表现结构树层级，尽量能短则短

<div>
<pre>.m-list{margin:0;padding:0;}
.m-list .itm{margin:1px;padding:1px;}
.m-list .cnt{margin-left:100px;}</pre>
</div>

&emsp;&emsp;个人认为，网易对于元素分类的做法很好。关于一些全局可复用的功能性的模块进行区分，结构更为清晰。但是，对于使用后代选择器的方式，个人不太认同。当嵌套层级较深时，命名冲突依旧是一个问题

【JD】

&emsp;&emsp;[京东的命名规则](https://guide.aotu.io/docs/name/classname.html)采用表示层级嵌套关系的长命名。当子孙模块超过4级或以上的时候，考虑在祖先模块内具有识辨性的独立缩写作为新的子孙模块

<div>
<pre>&lt;div class="modulename"&gt;
    &lt;div class="modulename_cover"&gt;&lt;/div&gt;
    &lt;div class="modulename_info"&gt;
        &lt;div class="modulename_info_user"&gt;
            &lt;div class="modulename_info_user_img"&gt;
                &lt;img src="" alt=""&gt;
                &lt;!-- 这个时候 miui 为 modulename_info_user_img 首字母缩写--&gt;
                &lt;div class="miui_tit"&gt;&lt;/div&gt;
                &lt;div class="miui_txt"&gt;&lt;/div&gt;
                ...
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;div class="modulename_info_list"&gt;&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;</pre>
</div>

&emsp;&emsp;京东这种因子元素名字过长而采用首字母缩写的做法非常赞，至今市面上没有其他更好的解决长命名的方案

&nbsp;

### 命名方式

【后代选择器还是类名】

&emsp;&emsp;关于CSS命名，最大的争论就是使用后代选择器还是使用类名。以下例所示

<div>
<pre>&lt;ul class="list"&gt;
    &lt;li class="list-item"&gt;&lt;/li&gt;
    &lt;li class="list-item"&gt;&lt;/li&gt;
    &lt;li class="list-item"&gt;&lt;/li&gt;
&lt;/ul&gt;

&lt;ul class="list"&gt;
    &lt;li class="item"&gt;&lt;/li&gt;
    &lt;li class="item"&gt;&lt;/li&gt;
    &lt;li class="item"&gt;&lt;/li&gt;
&lt;/ul&gt;

&lt;ul class="list"&gt;
    &lt;li&gt;&lt;/li&gt;
    &lt;li&gt;&lt;/li&gt;
    &lt;li&gt;&lt;/li&gt;
&lt;/ul&gt;</pre>
</div>

&emsp;&emsp;如果采用第一种长类名的方式，为&lt;li&gt;元素设置样式，只需如下设置即可

<div>
<pre>.list-item{}</pre>
</div>

&emsp;&emsp;如果采用第二种短类名的方式，则为&lt;li&gt;元素设置样式，需如下设置

<div>
<pre>.list .item{}</pre>
</div>

&emsp;&emsp;如果采用第三种后代选择器的方式，则为&lt;li&gt;元素设置样式，需如下设置

<div>
<pre>.list li{}</pre>
</div>

&emsp;&emsp;如果从简易角度来看，第三种后代选择器的方式最简单，无需花时间去给子元素起名，且在sass中书写很容易

<div>
<pre>.list{
    li{}
}</pre>
</div>

&emsp;&emsp;但是，它有一个很严重的问题，就是如果HTML结构层级较深，往往出现选择器层级过长，如.list li span a{}

&emsp;&emsp;而且，因为后代选择器强烈地依赖HTML结构，为了避免因为少写一层结构，导致选择器特殊性降低，样式无法生效的情况，也不得不这样写

&emsp;&emsp;一个不得不提的问题是，CSS选择器的解析顺序是从右到左。而使用后代选择器.list li{}，浏览器需要遍历出所有的li，再找出.list下的li，效率是最低的

&emsp;&emsp;因此，个人认为第三种后代选择器的方式并不是好选择

&emsp;&emsp;下面介绍第二种短类名的方式

&emsp;&emsp;1、选择器解析效率比第三种方式好，毕竟.item比li的范围小很多

&emsp;&emsp;2、短类名.list .item同样存在依赖HTML结构的情况，很可能出现选择器层级过长

&emsp;&emsp;3、使用较简易，在sass中书写容易，且起名也较简单

&emsp;&emsp;4、由于给li增加了类名，于是增加了HTML文件大小

&emsp;&emsp;最后介绍第三种长类名的方式

&emsp;&emsp;这种方式的选择器效率最高，因为.list-item这个类型页面中只出现一次，可类比于id选择器的解析速度

&emsp;&emsp;由于使用长类名的方式，可以完全不使用后代选择器，则无需考虑选择器特殊性较低，样式无法生效的情况，也不会出现选择器层级过长，因为它仅有一级

&emsp;&emsp;但是，相应地，它最大的缺点是类名较长，大大地增加了HTML文件大小。于是，可借鉴京东，当子孙模块超过3级时，采用首字母缩写，并将缩写后首字母大写的做法，在如将.list-item-link-title缩写为.Lil-title

&emsp;&emsp;最终，选择可缩写的长类名作为CSS命名的主要方式

【分隔符】

&emsp;&emsp;一般地，classname分隔符有3种，中划线-，下划线_，以及首字母大写，以分隔list和item为例

<div>
<pre>//中划线
list-item
//下划线
list_item
//首字母大写
listItem</pre>
</div>

&emsp;&emsp;1、中划线

&emsp;&emsp;中划线可以用来表示层级关系

<div>
<pre>&lt;div class="box"&gt;
    &lt;ul class="box-list"&gt;
        &lt;li class="box-list-item"&gt;&lt;/li&gt;
        &lt;li class="box-list-item"&gt;&lt;/li&gt;
        &lt;li class="box-list-item"&gt;&lt;/li&gt;
    &lt;/ul&gt;
&lt;/div&gt;</pre>
</div>

&emsp;&emsp;2、下划线

&emsp;&emsp;下划线可以用来表示不同的状态

<div>
<pre>&lt;div class="box"&gt;
    &lt;button class="box-btn box-btn_default" type="button"&gt;&lt;/button&gt;
    &lt;button class="box-btn" type="button"&gt;&lt;/button&gt;
&lt;/div&gt;</pre>
</div>

&emsp;&emsp;3、首字母大写

&emsp;&emsp;首字母大写可以用来表示因为样式的需要，而不得不增加的HTML结构。一般地，如果在外层增加结构，可以增加Wrap，在内层增加结构，可以增加Inner，且不影响原先的classname的命名

<div>
<pre>&lt;div class="boxWrap"&gt;
    &lt;section class="box"&gt;
        &lt;h2 class="box-title"&gt;&lt;/h2&gt;
        &lt;p class="box-content"&gt;&lt;/p&gt;
    &lt;/section&gt;    
&lt;/div&gt;</pre>
</div>

【组件】

&emsp;&emsp;通过上面的长命名方式和分隔符的使用，解决了基础结构的命名。但是，在页面中，很可能出现一些组件的应用，这些组件可以复用到页面的多个位置。这时，再使用上面的方式就不太合适

&emsp;&emsp;于是，可以以m-为前缀，来表示这是一个组件

<div>
<pre>&lt;div class="box"&gt;
    &lt;button class="m-btn m-btn_error" type="button"&gt;&lt;/button&gt;
    &lt;button class="m-btn" type="button"&gt;&lt;/button&gt;
&lt;/div&gt;</pre>
</div>

&nbsp;

### 命名推荐

&emsp;&emsp;有了合适的命名方式，还需要语义化命名，且有不影响语义的情况下，可以简写

【布局】

<div>
<pre>文档    doc
头部    header(hd)
主体    body    
尾部    footer(ft)    
主栏    main
侧栏    side    
容器    box/container
</pre>
</div>

【通用部件】

<div>
<pre>列表    list
列表项  item
表格    table    
表单    form
链接    link
标题    caption/heading/title
菜单    menu
集合    group
条      bar
内容    content    
结果    result    </pre>
</div>

【组件】

<div>
<pre>按钮        button(btn)
字体        icon
下拉菜单     dropdown
工具栏       toolbar
分页         page
缩略图       thumbnail
警告框       alert
进度条       progress
导航条       navbar
导航         nav    
子导航       subnav
面包屑       breadcrumb(crumb)    
标签        label
徽章        badge
巨幕        jumbotron
面板        panel
洼地        well
标签页      tab
提示框      tooltip
弹出框      popover
轮播图      carousel
手风琴      collapse 
定位浮标    affix</pre>
</div>

【语义化小部件】

<div>
<pre>品牌        brand
标志        logo
额外部件    addon
版权        copyright
注册        regist(reg)
登录        login
搜索        search    
热点        hot
帮助        help
信息        info
提示        tips
开关        toggle
新闻        news
广告        advertise(ad)
排行        top    
下载        download    </pre>
</div>

【功能部件】

<div>
<pre>左浮动    fl
右浮动    fr
清浮动    clear</pre>
</div>

【状态】

<div>
<pre>前一个    previous
后一个    next
当前的    current

显示的    show
隐藏的    hide
打开的    open
关闭的    close

选中的    selected
有效的    active
默认的    default
反转的    toggle

禁用的    disabled
危险的    danger
主要的    primary
成功的    success
提醒的    info
警告的    warning
出错的    error

大型的    lg
小型的    sm
超小的    xs</pre>
</div>

&nbsp;

### 实践

<div>
<pre>&lt;header class="hd"&gt;
    &lt;nav class="hd-navbar m-navbar m-varbar_primary"&gt;
        &lt;div class="hd-navbar-tel"&gt;联系方式：400-888-8888&lt;/div&gt;
        &lt;ul class="hd-navbar-nav"&gt;
            &lt;li class="Hnn-itm m-btn m-btn_info"&gt;&lt;a href="#"&gt;登录&lt;/a&gt;&lt;/li&gt;
            &lt;li class="Hnn-itm m-btn"&gt;&lt;a href="#"&gt;快速注册&lt;/a&gt;&lt;/li&gt;
            &lt;li class="Hnn-itm m-btn"&gt;&lt;a href="#"&gt;关于&lt;/a&gt;&lt;/li&gt;
            &lt;li class="Hnn-itm m-btn"&gt;&lt;a href="#"&gt;帮助&lt;/a&gt;&lt;/li&gt;
        &lt;/ul&gt;
    &lt;/nav&gt;
    ...
&lt;/header&gt;</pre>
</div>

【幻灯片】

<div>
<pre>&lt;div class="carousel"&gt;
  &lt;div class="carousel-banner"&gt;
    &lt;a class="carousel-banner-item Cbi_slide1 Cbi_active" href="#"&gt;&lt;/a&gt;
    &lt;a class="carousel-banner-item Cbi_slide2" href="#"&gt;&lt;/a&gt;
    &lt;a class="carousel-banner-item Cbi_slide3" href="#"&gt;&lt;/a&gt;
    &lt;a class="carousel-banner-item Cbi_slide4" href="#"&gt;&lt;/a&gt;          
  &lt;/div&gt;
  &lt;a class="carousel-control carousel-control_prev" href="javascript:;"&gt;&amp;lt;&lt;/a&gt;
  &lt;a class="carousel-control carousel-control_next" href="javascript:;"&gt;&amp;gt;&lt;/a&gt;
  &lt;div class="carousel-indicators"&gt;
    &lt;span class="carousel-indicators-item Cii_active"&gt;&lt;/span&gt;
    &lt;span class="carousel-indicators-item"&gt;&lt;/span&gt;
    &lt;span class="carousel-indicators-item"&gt;&lt;/span&gt;
    &lt;span class="carousel-indicators-item"&gt;&lt;/span&gt;
  &lt;/div&gt;
&lt;/div&gt;</pre>
</div>

&emsp;&emsp;关于CSS命名，并没有最佳实践之说，根据项目的复杂程序进行合适的命名才是可取的

&emsp;&emsp;欢迎交流
