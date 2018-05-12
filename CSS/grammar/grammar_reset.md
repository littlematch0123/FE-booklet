# CSS reset

&emsp;&emsp;大部分的时候，作为前端，我们在写 CSS 样式之前，需要添加一份&nbsp;`reset.css`&nbsp;。CSS reset不仅用于清除默认样式，更是一种全局样式定义。如果项目前期不定制好CSS reset，后期维护阶段再对其进行修改，将会牵一发而动全身。本文将详细介绍CSS reset

&nbsp;

### reset

&emsp;&emsp;以[网易NEC](http://nec.netease.com/framework/css-reset.html)的CSS reset为例，来进行说明

```
/* reset */
html,body,h1,h2,h3,h4,h5,h6,div,dl,dt,dd,ul,ol,li,p,blockquote,pre,hr,figure,table,caption,th,td,form,fieldset,legend,input,button,textarea,menu{margin:0;padding:0;}
header,footer,section,article,aside,nav,hgroup,address,figure,figcaption,menu,details{display:block;}
table{border-collapse:collapse;border-spacing:0;}
caption,th{text-align:left;font-weight:normal;}
html,body,fieldset,img,iframe,abbr{border:0;}
i,cite,em,var,address,dfn{font-style:normal;}
[hidefocus],summary{outline:0;}
li{list-style:none;}
h1,h2,h3,h4,h5,h6,small{font-size:100%;}
sup,sub{font-size:83%;}
pre,code,kbd,samp{font-family:inherit;}
q:before,q:after{content:none;}
textarea{overflow:auto;resize:none;}
label,summary{cursor:default;}
a,button{cursor:pointer;}
h1,h2,h3,h4,h5,h6,em,strong,b{font-weight:bold;}
del,ins,u,s,a,a:hover{text-decoration:none;}
body,textarea,input,button,select,keygen,legend{font:12px/1.14 arial,\5b8b\4f53;color:#333;outline:0;}
body{background:#fff;}
a,a:hover{color:#333;}
```

&emsp;&emsp;下面来说明CSS reset的问题

&emsp;&emsp;1、不合理的样式重置

&emsp;&emsp;例如，&nbsp;html、div 、dt等标签是没有默认&nbsp;`padding`&nbsp;和&nbsp;`margin`&nbsp;的

&emsp;&emsp;2、生僻标签的样式重置

&emsp;&emsp;例如，fieldset 、blockquote、q等标签用的较少，用到时，再进行样式设置即可

&emsp;&emsp;3、性能负担

&emsp;&emsp;CSS reset 通常会增加浏览器进行样式计算的成本（即有一定的性能负担），因为它引入了许多的针对元素的全局规则，网页中几乎所有元素都会匹配一条乃至几条的reset规则，且往往规则中的属性设定其实会被更特殊的规则所覆盖（比如padding和margin）。极端情况下，可能某条reset规则中的所有属性设置实际上并没有在任何元素上生效（因为全部被更特殊的规则给覆盖了），所有针对此规则的级联计算全都是浪费

&emsp;&emsp;基于这些问题，下面是修改版的CSS reset

```
body{margin: 0; font: 12px/22px Arial,"微软雅黑"; color: #333;}
header,footer,section,article,aside,nav,figure{display:block}

ul,ol{margin: 0;padding: 0;list-style: none;}
p,dl,dd{margin: 0;}
h1,h2,h3,h4{margin: 0;font-size: 100%;}

img{border:none;}
a{color: #21a557;cursor: pointer; text-decoration: none; }
a:active,a:hover{outline：none;}
a:hover{text-decoration: underline;}

strong{font-weight:normal;}
em,i{font-style:normal;}

table{border-collapse: collapse; table-layout: fixed;border-spacing:0;}
th,td{padding: 0;}
button,input{box-sizing: border-box;padding: 0;border: none;background: none;}
```

&nbsp;

### Normalize

&emsp;&emsp;Normalize.css 与 reset.css 的风格恰好相反，注重通用的方案，重置掉该重置的样式（例如body的默认margin），保留该保留的 user agent 样式，同时进行一些 bug 的修复，这点是 reset 所缺乏的。Normalize不讲求样式一致，而讲求通用性和可维护性

```
html {
  /*统一行高*/
  line-height: 1.15;
  /*防止在winPhone和ISO中，因旋转屏幕而造成的字体大小的改变*/
  -ms-text-size-adjust: 100%; 
  -webkit-text-size-adjust: 100%; 
}

body {
  /*去除margin*/
  margin: 0;
}

article,aside,footer,header,nav,section,figcaption,figure,main{
  /*重置IE8-浏览器的display*/
  display: block;
}

h1 {
  /*统一字体大小及margin*/
  font-size: 2em;
  margin: 0.67em 0;
}

figure {
  /*重置IE8浏览器的margin*/
  margin: 1em 40px;
}

hr {
  /*重置firefox浏览器的box-sizing*/
  box-sizing: content-box; 
  height: 0; 
  /*重置IE浏览器的overflow*/
  overflow: visible; 
}

pre {
  /*统一字体大小及字体系统*/
  font-family: monospace, monospace; 
  font-size: 1em; 
}

a {
  /*移除IE10中的灰色背景*/
  background-color: transparent; 
  -webkit-text-decoration-skip: objects; 
}

abbr[title] {
  /*移除Chrome57- and Firefox 39-中的border-bottom*/ 
  border-bottom: none; 
  /*统一text*/-decoration
  text-decoration: underline; 
  text-decoration: underline dotted; 
}

b,strong {
  /*统一字体重量*/
  font-weight: bolder;
}

code,kbd,samp {
  /*统一字体系列及字体大小*/
  font-family: monospace, monospace; 
  font-size: 1em; 
}

dfn {
  /*重置Android4.3-浏览器的字体样式*/ 
  font-style: italic;
}

mark {
  /*重置IE8-浏览器的背景颜色及文本颜色*/ 
  background-color: #ff0;
  color: #000;
}

small {
  /*统一字体大小*/
  font-size: 80%;
}

sub,sup {
  /*去除sub、sup对行高的影响*/
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  /*统一位置*/
  bottom: -0.25em;
}

sup {
  /*统一位置*/
  top: -0.5em;
}

audio,video {
  /*重置IE8-浏览器的display    */
  display: inline-block;
}

audio:not([controls]) {
  /*重置iOS 4-7中的display及height*/
  display: none;
  height: 0;
}

img {
  /*重置IE9-浏览器的border-style*/
  border-style: none;
}

svg:not(:root) {
  /*重置IE浏览器中的overflow*/
  overflow: hidden;
}

button,input,optgroup,select,textarea {
  /*统一样式*/
  /*移除Firefox and Safari中的margin*/
  font-family: sans-serif; 
  font-size: 100%; 
  line-height: 1.15; 
  margin: 0; 
}

button,input { 
  /*重置IE浏览器中的overflow*/
  overflow: visible;
}

button,select { 
  /*重置firefox浏览器中的text-transform*/
  text-transform: none;
}

button,html [type="button"], [type="reset"],[type="submit"] {
  /*重置webkit浏览器的appearance属性*/
  -webkit-appearance: button; 
}

button::-moz-focus-inner,[type="button"]::-moz-focus-inner,[type="reset"]::-moz-focus-inner,[type="submit"]::-moz-focus-inner {
  /*重置firefox浏览器中的border和padding*/
  border-style: none;
  padding: 0;
}

button:-moz-focusring,[type="button"]:-moz-focusring,[type="reset"]:-moz-focusring,[type="submit"]:-moz-focusring {
  /*统一outline*/ 
  outline: 1px dotted ButtonText;
}

fieldset {
  /*重置firefox浏览器的padding*/
  padding: 0.35em 0.75em 0.625em;
}

legend {
  box-sizing: border-box; 
  color: inherit; 
  display: table; 
  max-width: 100%; 
  padding: 0; 
  white-space: normal; 
}

progress {
  /*重置IE9-浏览器的display*/
  display: inline-block; 
  /*重置Chrome*/, Firefox浏览器的vertical-align
  vertical-align: baseline; 
}
textarea {
  /*移除IE浏览器中默认的垂直滚动条*/
  overflow: auto;
}

[type="checkbox"],[type="radio"] {
  /*重置IE9-浏览器的box-sizing及padding    */
  box-sizing: border-box; 
  padding: 0; 
}

[type="number"]::-webkit-inner-spin-button,[type="number"]::-webkit-outer-spin-button {
  /*修正Chrome中增加和减量按钮的光标样式*/
  height: auto;
}

[type="search"] {
  /*重置Chrome and Safari的appearance和outline-offset*/
  -webkit-appearance: textfield; 
  outline-offset: -2px; 
}

[type="search"]::-webkit-search-cancel-button,[type="search"]::-webkit-search-decoration {
  /*在macOS上删除Chrome和Safari中的内填充和取消按钮。*/
  -webkit-appearance: none;
}

::-webkit-file-upload-button {
  /*在iOS和Safari中，纠正无法点击的类型。*/
  -webkit-appearance: button; 
  font: inherit; 
}

details, menu {
  /*重置IE8-浏览器的display*/
  display: block;
}

summary {
  /*统一display*/
  display: list-item;
}

canvas {
  /*重置IE8-浏览器的display*/
  display: inline-block;
}

template {
  /*重置IE浏览器的display*/    
  display: none;
}

[hidden] {
  /*重置IE9-浏览器的display    */
  display: none;
}
```

&nbsp;

### 使用

&emsp;&emsp;是否 Normalize.css 就真的比 reset.css 好呢？

&emsp;&emsp;也不见得，Normalize.css 中重置修复的很多 bug ，其实在我们的项目中十个项目不见得有一个会用得上，那么这些重置或者修复，某种意义上而言也是所谓的冗余代码

&emsp;&emsp;所以，应该根据项目需要，混合部分 reset 或者 normalize，编写了一份适合团队项目的 reset ，做出取舍微调，适量裁剪和修改后再使用

&emsp;&emsp;对于一般项目而言，在调用normalize.css之后，再根据实际情况，编写reset.css。当然，这个reset并不是将样式清空，而是设置样式的默认值及常用的工具样式

```
html{
    /*这样，1rem=100px，方便后续计算，不设置为10px是因为chrome下最小字体大小为12px*/
    font-size:100px;
}
body{
    /*设置为12px*/
    font-size: 0.12rem;
    line-height: 1.5;
    /*不使用纯黑色#000，降低页面对比度*/
    color:#222;
}
a{
    color:#666;
    text-decoration:none;
}
a:hover,a:active{
    color:#0ae;
    text-decoration: underline;
}
::selection{
    background-color: #b3d4fc;
    text-shadow:none;
}
ul{
    margin: 0;
    padding: 0;
    list-style:none;
}
.fl{float: left;}
.fr{float: right;}
.clear:after{content:""; display: block; clear: both;}
.clear{zoom:1;}
/*低版本浏览器提示*/
.browserupgrade{
    margin:0;
    padding:1rem;
    background-color: #ccc;
}
```

