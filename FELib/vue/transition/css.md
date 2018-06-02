# Vue过渡效果之CSS过渡

&emsp;&emsp;Vue 在插入、更新或者移除 DOM 时，提供多种不同方式的应用过渡效果。本文将从CSS过渡transition、CSS动画animation及配合使用第三方CSS动画库(如[animate.css](http://www.cnblogs.com/xiaohuochai/p/7372665.html))这三方面来详细介绍Vue过渡效果之CSS过渡

&nbsp;

### 引入

&emsp;&emsp;以一个toggle按钮控制p元素显隐为例，如果不使用过渡效果，则如下所示

<div>
<pre>&lt;div id="demo"&gt;
  &lt;button v-on:click="show = !show"&gt;Toggle&lt;/button&gt;
  &lt;p v-if="show"&gt;小火柴的蓝色理想&lt;/p&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
new Vue({
  el: '#demo',
  data: {
    show: true
  }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 90px;" src="https://demo.xiaohuochai.site/vue/transition/t1.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;如果要为此加入过渡效果，则需要使用过渡组件transition

&nbsp;

### 过渡组件

&emsp;&emsp;Vue提供了`transition`的封装组件，下面代码中，该过渡组件的名称为'fade'

<div>
<pre>  &lt;transition name="fade"&gt;
    &lt;p v-if="show"&gt;小火柴的蓝色理想&lt;/p&gt;
  &lt;/transition&gt;</pre>
</div>

&emsp;&emsp;当插入或删除包含在`transition`组件中的元素时，Vue会自动嗅探目标元素是否应用了 CSS 过渡或动画，如果是，在恰当的时机添加/删除 CSS 类名

&nbsp;

### 过渡类名

![vue_transition_css1](https://pic.xiaohuochai.site/blog/vue_transition_css1.png)

&emsp;&emsp;总共有6个(CSS)类名在enter/leave的过渡中切换

【v-enter】

&emsp;&emsp;定义进入过渡的开始状态。在元素被插入时生效，在下一个帧移除

【v-enter-active】

&emsp;&emsp;定义过渡的状态。在元素整个过渡过程中作用，在元素被插入时生效，在 `transition 或 animation` 完成之后移除。 这个类可以被用来定义过渡的过程时间，延迟和曲线函数

【v-enter-to】

&emsp;&emsp;定义进入过渡的结束状态。在元素被插入一帧后生效(与此同时 `v-enter` 被删除)，在 &nbsp;`transition 或 animation`&nbsp;完成之后移除

【v-leave】

&emsp;&emsp;定义离开过渡的开始状态。在离开过渡被触发时生效，在下一个帧移除

【v-leave-active】

&emsp;&emsp;定义过渡的状态。在元素整个过渡过程中作用，在离开过渡被触发后立即生效，在&nbsp;`transition 或 animation`&nbsp;完成之后移除。 这个类可以被用来定义过渡的过程时间，延迟和曲线函数

【v-leave-to】

&emsp;&emsp;定义离开过渡的结束状态。在离开过渡被触发一帧后生效(与此同时 `v-leave` 被删除)，在&nbsp;`transition 或 animation`&nbsp;完成之后移除

&emsp;&emsp;对于这些在 `enter/leave` 过渡中切换的类名，`v-` 是这些类名的前缀，表示过渡组件的名称。比如，如果使用 `&lt;transition name="my-transition"&gt;`&nbsp;，则&nbsp;`v-enter`替换为 `my-transition-enter`

&nbsp;

### transition

&emsp;&emsp;常用的Vue过渡效果都是使用[CSS过渡transition](http://www.cnblogs.com/xiaohuochai/p/5347930.html)，下面增加一个enter时透明度变化，leave时位移变化的效果

<div>
<pre>&lt;style&gt;
.fade-enter{
  opacity:0;
}
.fade-enter-active{
  transition:opacity .5s;
}
.fade-leave-active{
  transition:transform .5s;
}
.fade-leave-to{
  transform:translateX(10px);
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div id="demo"&gt;
  &lt;button v-on:click="show = !show"&gt;Toggle&lt;/button&gt;    
  &lt;transition name="fade"&gt;
    &lt;p v-if="show"&gt;小火柴的蓝色理想&lt;/p&gt;
  &lt;/transition&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
new Vue({
  el: '#demo',
  data: {
    show: true
  }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 90px;" src="https://demo.xiaohuochai.site/vue/transition/t2.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### animation

&emsp;&emsp;[CSS动画animation](http://www.cnblogs.com/xiaohuochai/p/5391663.html)用法同CSS过渡transition，区别是在动画中 `v-enter` 类名在节点插入 DOM 后不会立即删除，而是在 `animationend` 事件触发时删除

&emsp;&emsp;下面例子中，在元素enter和leave时都增加缩放scale效果

<div>
<pre>&lt;style&gt;
.bounce-enter-active{
  animation:bounce-in .5s;
}
.bounce-leave-active{
  animation:bounce-in .5s reverse;
}
@keyframes bounce-in{
  0%{transform:scale(0);}
  50%{transform:scale(1.5);}
  100%{transform:scale(1);}
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div id="demo"&gt;
  &lt;button v-on:click="show = !show"&gt;Toggle&lt;/button&gt;    
  &lt;transition name="bounce"&gt;
    &lt;p v-if="show"&gt;小火柴的蓝色理想&lt;/p&gt;
  &lt;/transition&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
new Vue({
  el: '#demo',
  data: {
    show: true
  }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 90px;" src="https://demo.xiaohuochai.site/vue/transition/t3.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 同时使用

&emsp;&emsp;Vue 为了知道过渡的完成，必须设置相应的事件监听器。它可以是 `transitionend` 或 `animationend` ，这取决于给元素应用的 CSS 规则。如果使用其中任何一种，Vue 能自动识别类型并设置监听。

&emsp;&emsp;但是，在一些场景中，需要给同一个元素同时设置两种过渡动效，比如 `animation` 很快的被触发并完成了，而 `transition` 效果还没结束。在这种情况中，就需要使用 `type` 特性并设置 `animation` 或 `transition` 来明确声明需要 Vue 监听的类型

<div>
<pre>&lt;style&gt;
.fade-enter,.fade-leave-to{
  opacity:0;
}
.fade-enter-active,.fade-leave-active{
  transition:opacity 1s;
  animation:bounce-in 5s;
}
@keyframes bounce-in{
  0%{transform:scale(0);}
  50%{transform:scale(1.5);}
  100%{transform:scale(1);}
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div id="demo"&gt;
  &lt;button v-on:click="show = !show"&gt;Toggle&lt;/button&gt;    
  &lt;transition name="fade" type="transition"&gt;
    &lt;p v-if="show"&gt;小火柴的蓝色理想&lt;/p&gt;
  &lt;/transition&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
new Vue({
  el: '#demo',
  data: {
    show: true,
  },
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 90px;" src="https://demo.xiaohuochai.site/vue/transition/t4.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 自定义类名

&emsp;&emsp;可以通过以下特性来自定义过渡类名

<div>
<pre>enter-class
enter-active-class
enter-to-class 
leave-class
leave-active-class
leave-to-class </pre>
</div>

&emsp;&emsp;自定义类名的优先级高于普通的类名，这对于Vue的过渡系统和其他第三方CSS动画库，如 [Animate.css](http://www.cnblogs.com/xiaohuochai/p/7372665.html) 结合使用十分有用

<div>
<pre>&lt;link rel="stylesheet" href="https://unpkg.com/animate.css@3.5.2/animate.min.css"&gt;</pre>
</div>
<div>
<pre>&lt;div id="example"&gt;
  &lt;button @click="show = !show"&gt;
    Toggle render
  &lt;/button&gt;
  &lt;transition  name="xxx" enter-active-class="animated tada"  leave-active-class="animated bounceOutRight"&gt;
    &lt;p v-if="show"&gt;小火柴的蓝色理想&lt;/p&gt;
  &lt;/transition&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script src="https://unpkg.com/vue"&gt;&lt;/script&gt;
&lt;script&gt;
new Vue({
  el: '#example',
  data: {
    show: true
  }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/vue/transition/t5.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 初始渲染过渡

&emsp;&emsp;可以通过 `appear` 特性设置节点的在初始渲染的过渡

<div>
<pre>&lt;transition appear&gt;
  &lt;!-- ... --&gt;
&lt;/transition&gt;</pre>
</div>

&emsp;&emsp;这里默认和进入和离开过渡一样，同样也可以自定义 CSS 类名

<div>
<pre>&lt;transition
  appear
  appear-class="custom-appear-class"
  appear-to-class="custom-appear-to-class" 
  appear-active-class="custom-appear-active-class"
&gt;
  &lt;!-- ... --&gt;
&lt;/transition&gt;</pre>
</div>

&emsp;&emsp;下面是一个例子

<div>
<pre>&lt;style&gt;
.custom-appear-class{
  opacity:0;
  background-color:pink;
  transform:translateX(100px);
}  
.custom-appear-active-class{
  transition: 2s;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div id="demo"&gt;
  &lt;button @click="reset"&gt;还原&lt;/button&gt;
  &lt;transition appear   appear-class="custom-appear-class"
  appear-to-class="custom-appear-to-class" 
  appear-active-class="custom-appear-active-class"&gt;
    &lt;p&gt;小火柴的蓝色理想&lt;/p&gt;
  &lt;/transition&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
new Vue({
  el: '#demo',
  methods:{
    reset(){
      history.go();
    }
  }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/vue/transition/t6.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 过渡时间

&emsp;&emsp;在很多情况下，Vue可以自动得出过渡效果的完成时机。默认情况下，Vue会等待其在过渡效果的根元素的第一个 `transitionend` 或 `animationend` 事件。然而也可以不这样设定&mdash;&mdash;比如，可以拥有一个精心编排的一序列过渡效果，其中一些嵌套的内部元素相比于过渡效果的根元素有延迟的或更长的过渡效果

&emsp;&emsp;在这种情况下可以用&lt;transition&gt;组件上的`duration`属性定制一个显性的过渡效果持续时间 (以毫秒计)

&emsp;&emsp;下面的代码意味着元素在进入enter和离开leave时，持续时间都为1s，而无论在样式中它们的设置值为多少

<div>
<pre>&lt;transition :duration="1000"&gt;...&lt;/transition&gt;</pre>
</div>

&emsp;&emsp;也可以分别定制进入和移出的持续时间

<div>
<pre>&lt;transition :duration="{ enter: 500, leave: 800 }"&gt;...&lt;/transition&gt;</pre>
</div>

&emsp;&emsp;比如，下面的代码中，进入和移出的效果都为animate.css里面的shake效果，但持续时间分别是0.5s和1s

<div>
<pre>&lt;div id="demo"&gt;
  &lt;button v-on:click="show = !show"&gt;Toggle&lt;/button&gt;    
  &lt;transition  :duration="{ enter: 500, leave: 1000 }" name="xxx" enter-active-class="animated shake"  leave-active-class="animated shake"&gt;
    &lt;p v-if="show"&gt;小火柴的蓝色理想&lt;/p&gt;
  &lt;/transition&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
new Vue({
  el: '#demo',
  data: {
    show: true
  }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/vue/transition/t7.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 过渡条件

&emsp;&emsp;一般地，在Vue中满足下列任意一个过渡条件，即可添加过渡效果

【条件渲染(使用v-if)】

&emsp;&emsp;常见的条件是使用条件渲染，使用v-if

<div>
<pre>&lt;style&gt;
.fade-enter,.fade-leave-to{
  opacity:0;
}
.fade-enter-active,.fade-leave-active{
  transition:opacity 1s;
}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div id="demo"&gt;
  &lt;button v-on:click="show = !show"&gt;Toggle&lt;/button&gt;    
  &lt;transition name="fade"&gt;
    &lt;p v-if="show"&gt;小火柴的蓝色理想&lt;/p&gt;
  &lt;/transition&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
new Vue({
  el: '#demo',
  data: {
    show: true
  }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 90px;" src="https://demo.xiaohuochai.site/vue/transition/t8.html" frameborder="0" width="320" height="240"></iframe>

【条件展示(使用v-show)】&nbsp;

&emsp;&emsp;使用条件展示，即使用v-show时，也可以添加过渡效果

<div>
<pre>&lt;div id="demo"&gt;
  &lt;button v-on:click="show = !show"&gt;Toggle&lt;/button&gt;    
  &lt;transition name="fade"&gt;
    &lt;p v-show="show"&gt;小火柴的蓝色理想&lt;/p&gt;
  &lt;/transition&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 90px;" src="https://demo.xiaohuochai.site/vue/transition/t9.html" frameborder="0" width="320" height="240"></iframe>

【动态组件】

&emsp;&emsp;使用is属性实现的动态组件，可以添加过渡效果

<div>
<pre>&lt;div id="demo"&gt;
  &lt;button v-on:click="show = !show"&gt;Toggle&lt;/button&gt;    
  &lt;transition name="fade"&gt;
    &lt;component :is="view"&gt;&lt;/component&gt;
  &lt;/transition&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
new Vue({
  el: '#demo',
  components:{
    'home':{template:'&lt;div&gt;小火柴的蓝色理想&lt;/div&gt;'}
  },
  data: {
    show: true,
  },
  computed:{
    view(){
      return this.show ? 'home' : '';
    }
  }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/vue/transition/t10.html" frameborder="0" width="320" height="240"></iframe>

