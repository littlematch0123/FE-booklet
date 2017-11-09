# CSS页面渲染优化属性will-change


&emsp;&emsp;当我们通过某些行为(点击、移动或滚动)触发页面进行大面积绘制的时候，浏览器往往是没有准备的，只能被动使用CPU去计算与重绘，由于没有事先准备，应付渲染够呛，于是掉帧卡顿。而CSS属性will-change为web开发者提供了一种告知浏览器该元素会有哪些变化的方法，这样浏览器可以在元素属性真正发生变化之前提前做好对应的优化准备工作。这种优化可以将一部分复杂的计算工作提前准备好，使页面的反应更为快速灵敏。本文将介绍CSS属性will-change


<p>&nbsp;</p>

### 准备知识

&emsp;&emsp;GPU是图形处理器，专门处理和绘制图形相关的硬件。GPU是专为执行复杂的数学和几何计算而设计的，使得CPU从图形处理的任务中解放出来，可以执行其他更多的系统任务

&emsp;&emsp;所谓硬件加速，就是在计算机中把计算量非常大的工作分配给专门的硬件来处理，减轻CPU的工作量


&emsp;&emsp;CSS的动画、变形、渐变并不会自动触发GPU加速，而是使用浏览器稍慢的软件渲染引擎。在`transition`、`transform`和`animation`的世界里，应该卸载进程到GPU以加速速度。只有3D变形会有自己的layer，而2D变形则不会

【Hack】

&emsp;&emsp;使用`translateZ()`或`translate3d()`方法为元素添加没有变化的3D变形，骗取浏览器触发硬件加速。但是，代价是这种情况通过向它自己的层叠加元素，占用了RAM和GPU的存储空间，且无法确定空间释放时间



<p>&nbsp;</p>


### 语法

<p><strong>will-change</strong></p>

&emsp;&emsp;功能: 提前通知浏览器元素将要做什么动画，让浏览器提前准备合适的优化设置

&emsp;&emsp;值: auto | `<animateable-feature>`

&emsp;&emsp;初始值: auto

&emsp;&emsp;应用于: 所有元素

&emsp;&emsp;继承性: 无


&emsp;&emsp;兼容性: IE13+、chrome49+、safari9.1+、IOS9.3+、Android52+

&emsp;&emsp;auto表示没有特别指定哪些属性会变化，浏览器需要自己去猜，然后使用浏览器经常使用的一些常规方法优化

&emsp;&emsp;`<animateable-feature>`可以是以下值：

&emsp;&emsp;`scroll-position`表示开发者希望在不久后改变滚动条的位置或者使之产生动画

&emsp;&emsp;`contents`表示开发者希望在不久后改变元素内容中的某些东西，或者使它们产生动画

&emsp;&emsp;`<custom-ident>`表示开发者希望在不久后改变指定的属性名或者使之产生动画。如果属性名是简写，则代表所有与之对应的简写或者全写的属性





<p>&nbsp;</p>

### 使用

【使用hover】

&emsp;&emsp;不要像下面这样直接写在默认状态中，因为will-change会一直挂着：

    .will-change {
      will-change: transform;
      transition: transform 0.3s;
    }
    .will-change:hover {
      transform: scale(1.5);
    }

&emsp;&emsp;可以让父元素hover的时候，声明will-change，这样，移出的时候就会自动remove，触发的范围基本上是有效元素范围

    .will-change-parent:hover .will-change {
      will-change: transform;
    }
    .will-change {
      transition: transform 0.3s;
    }
    .will-change:hover {
      transform: scale(1.5);
    }



【使用javascript脚本】

    .sidebar {
      will-change: transform;
    }    

&emsp;&emsp;以上示例在样式表中直接添加了will-change属性，会导致浏览器将对应的优化工作一直保存在内存中，这其实是不必要的。下面展示如何使用脚本正确地应用`will-change`属性

    var el = document.getElementById('element');
    // 当鼠标移动到该元素上时给该元素设置 will-change 属性
    el.addEventListener('mouseenter', hintBrowser);
    // 当 CSS 动画结束后清除 will-change 属性
    el.addEventListener('animationEnd', removeHint);
    function hintBrowser() {
      // 填写在CSS动画中发生改变的CSS属性名
      this.style.willChange = 'transform, opacity';
    }
    function removeHint() {
      this.style.willChange = 'auto';
    }

【直接使用】

&emsp;&emsp;但是，如果某个应用在按下键盘的时候会翻页，比如相册或者幻灯片一类，它的页面很大很复杂，此时在样式表中写上will-change是合适的。这会使浏览器提前准备好过渡动画，当键盘按下的时候就能即看到灵活轻快的动画

    .slide {
      will-change: transform;
    }



<p>&nbsp;</p>


### 注意事项


&emsp;&emsp;1、不要将will-change应用到太多元素上：浏览器已经尽力尝试去优化一切可以优化的东西了。有一些更强力的优化，如果与will-change结合在一起的话，有可能会消耗很多机器资源，如果过度使用的话，可能导致页面响应缓慢或者消耗非常多的资源

&emsp;&emsp;2、有节制地使用：通常，当元素恢复到初始状态时，浏览器会丢弃掉之前做的优化工作。但是如果直接在样式表中显式声明了will-change属性，则表示目标元素可能会经常变化，浏览器会将优化工作保存得比之前更久。所以最佳实践是当元素变化之前和之后通过脚本来切换will-change的值

&emsp;&emsp;3、不要过早应用will-change优化：如果页面在性能方面没什么问题，则不要添加will-change属性来榨取一丁点的速度。will-change的设计初衷是作为最后的优化手段，用来尝试解决现有的性能问题。它不应该被用来预防性能问题。过度使用will-change会导致大量的内存占用，并会导致更复杂的渲染过程，因为浏览器会试图准备可能存在的变化过程。这会导致更严重的性能问题

&emsp;&emsp;4、给它足够的工作时间：这个属性是用来让页面开发者告知浏览器哪些属性可能会变化的。然后浏览器可以选择在变化发生前提前去做一些优化工作。所以给浏览器一点时间去真正做这些优化工作是非常重要的。使用时需要尝试去找到一些方法提前一定时间获知元素可能发生的变化，然后为它加上will-change属性

