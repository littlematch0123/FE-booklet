# Vue多元素过渡

&emsp;&emsp;前面分别介绍了单元素过渡的[CSS过渡](http://www.cnblogs.com/xiaohuochai/p/7383979.html)和[JS过渡](http://www.cnblogs.com/xiaohuochai/p/7398088.html)，本文将详细介绍Vue多元素过渡

&nbsp;

### 常见示例

&emsp;&emsp;最常见的多标签过渡是一个列表和描述这个列表为空消息的元素：

<div>
<pre>&lt;transition&gt;
  &lt;table v-if="items.length &gt; 0"&gt;
    &lt;!-- ... --&gt;
  &lt;/table&gt;
  &lt;p v-else&gt;Sorry, no items found.&lt;/p&gt;
&lt;/transition&gt;</pre>
</div>

&emsp;&emsp;下面是一个例子
<!-- {% raw %} -->
<div>
<pre>&lt;style&gt;
.fade-enter,.fade-leave-to{opacity:0;}
.fade-enter-active,.fade-leave-active{transition:opacity .5s;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div id="demo"&gt;
  &lt;button @click="clear"&gt;清空数据&lt;/button&gt;  
  &lt;button @click="reset"&gt;重置&lt;/button&gt;   
  &lt;transition name="fade"&gt;
    &lt;ul v-if="items.length &gt; 0"&gt;
      &lt;li v-for="item in items"&gt;{{item}}&lt;/li&gt;
    &lt;/ul&gt;
    &lt;p v-else&gt;Sorry, no items found.&lt;/p&gt;
  &lt;/transition&gt;
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
new Vue({
  el: '#demo',
  data: {
    items: ['html','css','js']
  },
  methods:{
    clear(){
      this.items.splice(0);
    },
    reset(){
      history.go();
    }
  }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 180px;" src="https://demo.xiaohuochai.site/vue/transition/t13.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 同标签名称

&emsp;&emsp;如果是相同标签名的元素切换时，Vue 为了效率只会替换相同标签内部的内容

<div>
<pre>&lt;style&gt;
.fade-enter,.fade-leave-to{opacity:0;}
.fade-enter-active,.fade-leave-active{transition:opacity .5s;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div id="demo"&gt;
  &lt;button @click="show = !show"&gt;toggle&lt;/button&gt;   
  &lt;transition name="fade"&gt;
    &lt;p v-if="show"&gt;我是小火柴&lt;/p&gt;
    &lt;p v-else&gt;我不是小火柴&lt;/p&gt;
  &lt;/transition&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
new Vue({
  el: '#demo',
  data: {
    show:true
  },
})
&lt;/script&gt;</pre>
</div>

&emsp;&emsp;由下面的示例可知，两个相同的p元素切换时，无过渡效果

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/vue/transition/t14.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;因此，对于具有相同标签名的元素切换的情况，需要通过&nbsp;`key`&nbsp;特性设置唯一的值来标记以让 Vue 区分它们　

<div>
<pre>&lt;div id="demo"&gt;
  &lt;button @click="show = !show"&gt;toggle&lt;/button&gt;   
  &lt;transition name="fade"&gt;
    &lt;p v-if="show" key="trueMatch"&gt;我是小火柴&lt;/p&gt;
    &lt;p v-else key="falseMatch"&gt;我不是小火柴&lt;/p&gt;
  &lt;/transition&gt;
&lt;/div&gt;</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/vue/transition/t15.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 替代if

&emsp;&emsp;在一些场景中，可以给通过给同一个元素的&nbsp;`key`&nbsp;特性设置不同的状态来代替&nbsp;`v-if`&nbsp;和&nbsp;`v-else`

<div>
<pre>&lt;transition&gt;
  &lt;button v-if="isEditing" key="save"&gt;Save&lt;/button&gt;
  &lt;button v-else key="edit"&gt;Edit&lt;/button&gt;
&lt;/transition&gt;</pre>
</div>

&emsp;&emsp;上面的例子可以重写为
<!-- {% raw %} -->
<div>
<pre>&lt;transition&gt;
  &lt;button v-bind:key="isEditing"&gt;
    {{ isEditing ? 'Save' : 'Edit' }}
  &lt;/button&gt;
&lt;/transition&gt;</pre>
</div>
<!-- {% endraw %} -->
&emsp;&emsp;下面是一个例子
<!-- {% raw %} -->
<div>
<pre>&lt;style&gt;
.fade-enter,.fade-leave-to{opacity:0;}
.fade-enter-active,.fade-leave-active{transition:opacity .5s;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div id="demo"&gt;
  &lt;button @click="isEditing = !isEditing"&gt;toggle&lt;/button&gt;   
  &lt;transition name="fade"&gt;
    &lt;p v-bind:key="isEditing"&gt;
      {{ isEditing ? 'Save' : 'Edit' }}
    &lt;/p&gt;
  &lt;/transition&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
new Vue({
  el: '#demo',
  data: {
    isEditing:true
  },
})
&lt;/script&gt;</pre>
</div>
<!-- {% endraw %} -->
<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/vue/transition/t16.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;使用多个&nbsp;`v-if`&nbsp;的多个元素的过渡可以重写为绑定了动态属性的单个元素过渡

<div>
<pre>&lt;transition&gt;
  &lt;button v-if="docState === 'saved'" key="saved"&gt;Edit&lt;/button&gt;
  &lt;button v-if="docState === 'edited'" key="edited"&gt;Save&lt;/button&gt;
  &lt;button v-if="docState === 'editing'" key="editing"&gt;Cancel&lt;/button&gt;
&lt;/transition&gt;</pre>
</div>

&emsp;&emsp;可以重写为
<!-- {% raw %} -->
<div>
<pre>&lt;transition&gt;
  &lt;button v-bind:key="docState"&gt;{{ buttonMessage }}&lt;/button&gt;
&lt;/transition&gt;</pre>
</div>
<div>
<pre>computed: {
  buttonMessage: function () {
    switch (this.docState) {
      case 'saved': return 'Edit'
      case 'edited': return 'Save'
      case 'editing': return 'Cancel'
    }
  }
}</pre>
</div>
<!-- {% endraw %} -->
&emsp;&emsp;下面是一个例子
<!-- {% raw %} -->
<div>
<pre>&lt;style&gt;
.fade-enter,.fade-leave-to{opacity:0;}
.fade-enter-active,.fade-leave-active{transition:opacity .5s;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div id="demo"&gt;
  &lt;button @click="change"&gt;change&lt;/button&gt;   
  &lt;transition name="fade"&gt;
    &lt;p v-bind:key="docState"&gt;{{ message }}&lt;/p&gt;
  &lt;/transition&gt;
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
new Vue({
  el: '#demo',
  data: {
    index:0,
    isEditing:true,
    arr:['saved','edited','editing']
  },
  computed: {
    docState(){
      return this.arr[this.index];
    },
    message() {
      switch (this.docState) {
        case 'saved': return 'Edit'
        case 'edited': return 'Save'
        case 'editing': return 'Cancel'
      }
    }
  },
  methods:{
    change(){
      this.index = (++this.index)%3;
    }
  }  
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/vue/transition/t17.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 过渡模式

&emsp;&emsp;先看下面这个例子
<!-- {% raw %} -->
<div>
<pre>&lt;style&gt;
.fade-enter,.fade-leave-to{opacity:0;}
.fade-enter-active,.fade-leave-active{transition:opacity .5s;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div id="demo"&gt;   
  &lt;transition name="fade"&gt;
    &lt;button :key="isOn" @click="isOn = !isOn"&gt;{{ isOn ? 'On' : 'Off' }}&lt;/button&gt;
  &lt;/transition&gt;
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
new Vue({
  el: '#demo',
  data: {
    isOn: true
  },
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/vue/transition/t18.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;在 &ldquo;on&rdquo; 按钮和 &ldquo;off&rdquo; 按钮的过渡中，两个按钮都被重绘了，一个离开过渡的时候另一个开始进入过渡。这是&nbsp;&lt;transition&gt;&nbsp;的默认行为 - 进入和离开同时发生

&emsp;&emsp;同时生效的进入和离开的过渡不能满足所有要求，所以 Vue 提供了过渡模式

<div>
<pre>in-out: 新元素先进行过渡，完成之后当前元素过渡离开。
out-in: 当前元素先进行过渡，完成之后新元素过渡进入。</pre>
</div>

【in-out】

&emsp;&emsp;下面使用in-out来重写之前的开关按钮过渡
<!-- {% raw %} -->
<div>
<pre>&lt;div id="demo"&gt;   
  &lt;transition name="fade"  mode="in-out"&gt;
    &lt;button :key="isOn" @click="isOn = !isOn"&gt;{{ isOn ? 'On' : 'Off' }}&lt;/button&gt;
  &lt;/transition&gt;
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/vue/transition/t19.html" frameborder="0" width="320" height="240"></iframe>

【out-in】

&emsp;&emsp;下面使用out-in来重写之前的开关按钮过渡
<!-- {% raw %} -->
<div>
<pre>&lt;div id="demo"&gt;   
  &lt;transition name="fade"  mode="out-in"&gt;
    &lt;button :key="isOn" @click="isOn = !isOn"&gt;{{ isOn ? 'On' : 'Off' }}&lt;/button&gt;
  &lt;/transition&gt;
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/vue/transition/t20.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 滑动过渡

&emsp;&emsp;当元素设置为绝对定位，并互相覆盖，实现透明度过渡效果

<div>
<pre>&lt;style&gt;
#demo{position:relative;}
#demo button{position:absolute;left:40px;}
.fade-enter,.fade-leave-to{opacity:0;}
.fade-enter-active,.fade-leave-active{transition: 1s;}
&lt;/style&gt;</pre>
</div>
<!-- {% raw %} -->
<div>
<pre>&lt;div id="demo"&gt;   
  &lt;transition name="fade"  &gt;
    &lt;button :key="isOn" @click="isOn = !isOn"&gt;{{ isOn ? 'On' : 'Off' }}&lt;/button&gt;
  &lt;/transition&gt;
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
new Vue({
  el: '#demo',
  data: {
    isOn: true
  },
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/vue/transition/t21.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;下面是一个使用absolute和translate实现的类似滑动&nbsp;

<div>
<pre>&lt;style&gt;
#demo{position:relative;}
#demo button{position:absolute;left:40px;}
.fade-enter,.fade-leave-to{opacity:0;}
.fade-enter{transform:translateX(30px);}
.fade-leave-to{transform:translateX(-30px);} 
.fade-enter-active,.fade-leave-active{transition: 1s;}
&lt;/style&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/vue/transition/t22.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;如果设置in-out模式，将实现更酷的滑动效果

<div>
<pre>&lt;style&gt;
#demo{position:relative;}
#demo button{position:absolute;left:40px;}
.fade-enter,.fade-leave-to{opacity:0;}
.fade-enter{transform:translateX(30px);}
.fade-leave-to{transform:translateX(-30px);} 
.fade-enter-active,.fade-leave-active{transition: 1s;}
&lt;/style&gt;</pre>
</div>
<!-- {% raw %} -->
<div>
<pre>&lt;div id="demo"&gt;   
  &lt;transition name="fade"  mode="in-out"&gt;
    &lt;button :key="isOn" @click="isOn = !isOn"&gt;{{ isOn ? 'On' : 'Off' }}&lt;/button&gt;
  &lt;/transition&gt;
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
new Vue({
  el: '#demo',
  data: {
    isOn: true
  },
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/vue/transition/t23.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 多组件过渡

&emsp;&emsp;多个组件的过渡简单很多，不需要使用&nbsp;`key`&nbsp;特性。相反，只需要使用[动态组件](http://www.cnblogs.com/xiaohuochai/p/7395694.html)

&emsp;&emsp;下面是一个例子

<div>
<pre>&lt;style&gt;
.fade-enter,.fade-leave-to{opacity:0;}
.fade-enter-active,.fade-leave-active{transition: .5s;}
&lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div id="example"&gt;
  &lt;button @click="change"&gt;切换页面&lt;/button&gt;
  &lt;transition name="fade" mode="out-in"&gt;
    &lt;component :is="currentView"&gt;&lt;/component&gt;
  &lt;/transition&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
new Vue({
  el: '#example',
  data:{
    index:0,
    arr:[
      {template:`&lt;div&gt;ComponentA&lt;/div&gt;`},
      {template:`&lt;div&gt;ComponentB&lt;/div&gt;`},
      {template:`&lt;div&gt;ComponentC&lt;/div&gt;`}
    ],
  },
  computed:{
    currentView(){
        return this.arr[this.index];
    }
  },
  methods:{
    change(){
      this.index = (++this.index)%3;
    }
  }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 60px;" src="https://demo.xiaohuochai.site/vue/transition/t24.html" frameborder="0" width="320" height="240"></iframe>

