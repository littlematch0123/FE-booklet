# 底部粘连(stiky footer)布局

&emsp;&emsp;在网页设计中，Sticky footers 设计是最古老和最常见的效果之一，大多数人都曾经经历过。它可以概括如下：如果页面内容不够长的时候，页脚块粘贴在视窗底部；如果内容足够长时，页脚块会被内容向下推送。本文将详细介绍 sticky footer 的 4 种实现方式

&nbsp;

### 绝对定位

&emsp;&emsp;常见的实现方法是对(.sticky)footer 进行绝对定位，假设高度为 50px。对父级(.box)进行相对定位，将 html、body 的高度设置为 100%，父级(.box)的最小高度设置为 100%，将(.content)内容部分设置 padding-bottom 为 footer 的高度，即 50px，这里不用 margin-bottom 是因为会出现 margin-bottom 传递的情况

```
<style>
html,body{height:100%}
body{margin:0}
.box{position:relative;background-color:lightblue;min-height:100%;}
.content{padding-bottom:50px;}
.sticky{position:absolute;background-color:lightgreen;width:100%;height:50px;bottom:0;}
</style>
<div class="box">
  <main class="content">
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam eos architecto ratione culpa adipisci inventore ipsum eum esse, nam aperiam, non tempora perferendis doloribus cumque ducimus quidem consequuntur reprehenderit reiciendis!
    ...
  </main>
  <footer class="sticky"></footer>
</div>
```

效果如下

![sticky1](https://pic.xiaohuochai.site/blog/css_sticky1.gif)

&nbsp;

### calc

&emsp;&emsp;上面的代码中，因为要实现最小高度 100%的效果，给 html、body 都设置为高度 100%，不利于代码扩展。下面使用 100vh 来代替 100%，代码会简洁很多。内容部分(.content)设置最小高度为 calc(100vh - 50px)即可

```
<style>
body{margin:0}
.content{background-color:lightblue;min-height: calc(100vh - 50px)}
.sticky{background-color:lightgreen;height:50px;}
</style>
<div class="box">
  <main class="content">
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam eos architecto ratione culpa adipisci inventore ipsum eum esse, nam aperiam, non tempora perferendis doloribus cumque ducimus quidem consequuntur reprehenderit reiciendis!
    ...
  </main>
  <footer class="sticky"></footer>
</div>
```

效果如下

![sticky2](https://pic.xiaohuochai.site/blog/css_sticky2.gif)

&nbsp;

### flex

&emsp;&emsp;上面的代码中，如果 sticky 的底部高度发生了变化，则内容部分的代码也需要进行相应地调整。如果使用 flex，则可以更加灵活。为父级(.box)设置 flex、上下排列及最小高度为 100vh，为内容部分(.content)设置 flex:1 即可

```
<style>
body{margin:0}
.box{display:flex;flex-flow:column;min-height:100vh;background-color:lightblue;}
.content{flex:1;}
.sticky{background-color:lightgreen;height:50px;}
</style>
```

&nbsp;

### grid

&emsp;&emsp;作为最新布局方式的 grid 当然也可以实现，而且代码更加简洁

```
<style>
body{margin:0}
.box{display:grid;grid-template-rows:1fr 50px;min-height:100vh;}
.content{background-color:lightblue;}
.sticky{background-color:lightgreen;}
</style>
```
