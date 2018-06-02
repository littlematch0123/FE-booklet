# Vue事件处理

&emsp;&emsp;Vue事件监听的方式貌似违背了关注点分离(separation of concern)的传统理念。实际上，所有的Vue.js事件处理方法和表达式都严格绑定在当前视图的ViewModel上，它不会导致维护上的困难。使用`v-on`有以下好处：

&emsp;&emsp;1、扫一眼HTML模板便能轻松定位在JS代码里对应的方法

&emsp;&emsp;2、无须在JS里手动绑定事件，ViewModel代码可以是非常纯粹的逻辑，和DOM完全解耦，更易于测试

&emsp;&emsp;3、当一个ViewModel被销毁时，所有的事件处理器都会自动被删除。无须担心如何自己清理它们

&emsp;&emsp;本文将详细介绍Vue事件处理

&nbsp;

### 事件监听

&emsp;&emsp;通过`v-on`指令来绑定事件监听器
<!-- {% raw %} -->
<div>
<pre>&lt;div id="example"&gt;
  &lt;button v-on:click="counter += 1"&gt;增加 1&lt;/button&gt;
  &lt;p&gt;这个按钮被点击了 {{ counter }} 次。&lt;/p&gt;
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
var example = new Vue({
  el: '#example',
  data: {
    counter: 0
  }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/vue/event/e1.html" frameborder="0" width="320" height="240"></iframe>

【方法】

&emsp;&emsp;许多事件处理的逻辑都很复杂，所以直接把JS代码写在&nbsp;`v-on`&nbsp;指令中有时并不可行。`v-on`指令可以接收一个定义的方法来调用

&emsp;&emsp;注意：不应该使用箭头函数来定义methods函数，因为箭头函数绑定了父级作用域的上下文，所以this将不会按照期望指向 Vue 实例
<!-- {% raw %} -->
<div>
<pre>&lt;div id="example"&gt;
   &lt;button v-on:click="num"&gt;测试按钮&lt;/button&gt;
   &lt;p&gt;{{message}}&lt;/p&gt;
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
var example = new Vue({
  el: '#example',
  data:{
    counter:0,
    message:''
  },
  methods: {
    num: function (event) {
      if (event) {
        this.message = event.target.innerHTML + '被按下' + ++this.counter + '次';
      }
    }
  }
})
&lt;/script&gt;</pre>
</div>

<iframe src="https://demo.xiaohuochai.site/vue/event/e2.html" frameborder="0" width="320" height="100"></iframe>

【内联语句】

&emsp;&emsp;除了直接绑定到一个方法，也可以用内联JS语句
<!-- {% raw %} -->
<div>
<pre>&lt;div id="example"&gt;
  &lt;button v-on:click="say('hi')"&gt;Say hi&lt;/button&gt;
  &lt;button v-on:click="say('what')"&gt;Say what&lt;/button&gt;
   &lt;p&gt;{{message}}&lt;/p&gt;
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
var example = new Vue({
  el: '#example',
  data:{
    message:''
  },
  methods: {
    say: function (message) {this.message = message;}
  }
})
&lt;/script&gt;</pre>
</div>

<iframe src="https://demo.xiaohuochai.site/vue/event/e3.html" frameborder="0" width="320" height="100"></iframe>

&emsp;&emsp;有时也需要在内联语句处理器中访问原生 DOM 事件。可以用特殊变量&nbsp;`$event`&nbsp;把它传入方法&nbsp;
<!-- {% raw %} -->
<div>
<pre>&lt;div id="example"&gt;
  &lt;button v-on:click="say('hi',$event)"&gt;Say hi&lt;/button&gt;
  &lt;button v-on:click="say('what',$event)"&gt;Say what&lt;/button&gt;
   &lt;p&gt;{{message}}&lt;/p&gt;
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
var example = new Vue({
  el: '#example',
  data:{
    message:''
  },
  methods: {
    say: function (message,event) {
      if(event){
        event.preventDefault();
      }  
      this.message = message;
    }
  }
})
&lt;/script&gt;</pre>
</div>

&nbsp;

### 事件修饰符

&emsp;&emsp;在事件处理程序中调用`event.preventDefault()`或`event.stopPropagation()`是非常常见的需求。尽管可以在methods中轻松实现这点，但更好的方式：methods只有纯粹的数据逻辑，而不是去处理 DOM 事件细节

&emsp;&emsp;为了解决这个问题， Vue.js 为`v-on`提供了事件修饰符。通过由点(.)表示的指令后缀来调用修饰符

<div>
<pre>.stop 阻止冒泡
.prevent 阻止默认事件
.capture 使用事件捕获模式
.self 只在当前元素本身触发
.once 只触发一次</pre>
</div>

&emsp;&emsp;下面是一些例子

<div>
<pre>&lt;!-- 阻止单击事件冒泡 --&gt;
&lt;a v-on:click.stop="doThis"&gt;&lt;/a&gt;
&lt;!-- 提交事件不再重载页面 --&gt;
&lt;form v-on:submit.prevent="onSubmit"&gt;&lt;/form&gt;
&lt;!-- 修饰符可以串联  --&gt;
&lt;a v-on:click.stop.prevent="doThat"&gt;&lt;/a&gt;
&lt;!-- 只有修饰符 --&gt;
&lt;form v-on:submit.prevent&gt;&lt;/form&gt;
&lt;!-- 添加事件侦听器时使用事件捕获模式 --&gt;
&lt;div v-on:click.capture="doThis"&gt;...&lt;/div&gt;
&lt;!-- 只当事件在该元素本身（比如不是子元素）触发时触发回调 --&gt;
&lt;div v-on:click.self="doThat"&gt;...&lt;/div&gt;
&lt;!-- 点击事件将只会触发一次 --&gt;
&lt;a v-on:click.once="doThis"&gt;&lt;/a&gt;</pre>
</div>

&emsp;&emsp;注意：使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用&nbsp;`@click.prevent.self`&nbsp;会阻止所有的点击，而&nbsp;`@click.self.prevent`&nbsp;只会阻止元素上的点击

【stop】

&emsp;&emsp;阻止冒泡
<!-- {% raw %} -->
<div>
<pre>&lt;div id="example" @click="setVal1" style="border:1px solid black;width:300px;"&gt;
  &lt;button @click="setVal"&gt;普通按钮&lt;/button&gt;
  &lt;button @click.stop="setVal"&gt;阻止冒泡&lt;/button&gt;
  &lt;button @click="reset"&gt;还原&lt;/button&gt;
  &lt;div&gt;{{result}}&lt;/div&gt;
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;var example = new Vue({
  el: '#example',
  data:{
    result:''
  },
  methods:{
    setVal(event){
      this.result+=' 子级 ';
    },
    setVal1(){
      this.result+=' 父级 ';
    },
    reset(){
      history.go()
    }
  }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 80px;" src="https://demo.xiaohuochai.site/vue/event/e4.html" frameborder="0" width="320" height="240"></iframe>

【prevent】

&emsp;&emsp;取消默认事件

<div>
<pre>&lt;div id="example"&gt;
  &lt;a href="http://cnblogs.com" target="_blank"&gt;普通链接&lt;/a&gt;
  &lt;a @click.prevent href="http://cnblogs.com" target="_blank"&gt;取消默认行为&lt;/a&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
var example = new Vue({
  el: '#example'
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/vue/event/e5.html" frameborder="0" width="320" height="240"></iframe>

【capture】

&emsp;&emsp;事件捕获模式
<!-- {% raw %} -->
<div>
<pre>&lt;div id="example" @click.capture="setVal1" style="border:1px solid black;width:300px;"&gt;
  &lt;button @click.capture="setVal"&gt;事件捕获&lt;/button&gt;
  &lt;button @click="reset"&gt;还原&lt;/button&gt;
  &lt;div&gt;{{result}}&lt;/div&gt;
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;var example = new Vue({
  el: '#example',
  data:{
    result:''
  },
  methods:{
    setVal(event){
      this.result+=' 子级 ';
    },
    setVal1(){
      this.result+=' 父级 ';
    },
    reset(){
      history.go()
    }
  }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/vue/event/e6.html" frameborder="0" width="320" height="240"></iframe>

【self】

<div>
<pre>&lt;div id="example"&gt;
  &lt;div @click="setVal" :style="styleObj1"&gt;
    &lt;div :style="styleObj2"&gt;普通&lt;/div&gt;
    &lt;button @click="reset"&gt;还原&lt;/button&gt;
  &lt;/div&gt;
  &lt;div @click.self="setVal" :style="styleObj1"&gt;
    &lt;div :style="styleObj2"&gt;self&lt;/div&gt;
    &lt;button @click="reset"&gt;还原&lt;/button&gt;
  &lt;/div&gt;  
&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
var styleObj1 = {
  display:'inline-block',
  height:'60px',
  width:'120px',
  'background-color': 'lightblue'
};
var styleObj2 = {
  display:'inline-block',
  height:'30px',
  width:'60px',
  'background-color': 'lightgreen'
};
var example = new Vue({
  el: '#example',
  data:{
    styleObj1:styleObj1,
    styleObj2:styleObj2
  },
  methods:{
    setVal(event){
      event.target.style.outline="solid"
    },
    reset(){
      history.go()
    }
  }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 80px;" src="https://demo.xiaohuochai.site/vue/event/e7.html" frameborder="0" width="320" height="240"></iframe>

【once】

&emsp;&emsp;只触发一次
<!-- {% raw %} -->
<div>
<pre>&lt;div id="example"&gt;
  &lt;button @click="setVal"&gt;普通按钮&lt;/button&gt;
  &lt;button @click.once="setVal"&gt;触发一次&lt;/button&gt;
  &lt;button @click="reset"&gt;还原&lt;/button&gt;
  &lt;div&gt;{{result}}&lt;/div&gt;
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
var example = new Vue({
  el: '#example',
  data:{
    result:''
  },
  methods:{
    setVal(event){
      this.result+=' 内容 ';
    },
    reset(){
      history.go()
    }
  }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 80px;" src="https://demo.xiaohuochai.site/vue/event/e8.html" frameborder="0" width="320" height="240"></iframe>

### 鼠标修饰符

&emsp;&emsp;这些修饰符会限制处理程序监听特定的滑鼠按键
<!-- {% raw %} -->
<div>
<pre>.left 左键
.right 右键
.middle 滚轮</pre>
</div>
<div>
<pre>&lt;div id="example"&gt;
  &lt;button @mouseup.right="right" @mouseup.middle="middle" @mouseup.left="left"&gt;{{message}}&lt;/button&gt;
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
var example = new Vue({
  el: '#example',
  data:{
    message:'分别用左、中、右键进行点击，会出现不同的效果'
  },
  methods:{
    left(){
      this.message = 'left'
    },
    right(){
      this.message = 'right'
    },
    middle(){
      this.message = 'middle'
    },        
  }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/vue/event/e9.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 键值修饰符

&emsp;&emsp;在监听键盘事件时，经常需要监测常见的键值。 Vue 允许为&nbsp;`v-on`&nbsp;在监听键盘事件时添加关键修饰符

<div>
<pre>&lt;!-- 只有在 keyCode 是 13 时调用 vm.submit() --&gt;
&lt;input v-on:keyup.13="submit"&gt;</pre>
</div>

&emsp;&emsp;记住所有的 keyCode 比较困难，所以 Vue 为最常用的按键提供了别名：

<div>
<pre>.enter 回车
.tab 制表键
.delete (捕获 &ldquo;删除&rdquo; 和 &ldquo;退格&rdquo; 键)
.esc 返回
.space 空格
.up 上
.down 下
.left 左
.right 右</pre>
</div>
<!-- {% raw %} -->
<div>
<pre>&lt;div id="example"&gt;
  &lt;button @keyup.enter="enter" @keyup.tab="tab" @keyup.delete="delete1" @keyup.esc="esc" @keyup.space="space" @keyup.up="up" @keyup.down="down" @keyup.left="left" @keyup.right="right"&gt;{{message}}&lt;/button&gt;
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
var example = new Vue({
  el: '#example',
  data:{
    message:'将光标置于按钮上后，按下键盘上不同的按键，会有不同的效果'
  },
  methods:{
    enter(){
      this.message = 'enter'
    },
    tab(){
      this.message = 'tab'
    },
    delete1(){
      this.message = 'delete'
    }, 
    esc(){
      this.message = 'esc'
    },
    space(){
      this.message = 'space'
    },
    up(){
      this.message = 'up'
    },
    down(){
      this.message = 'down'
    },
    left(){
      this.message = 'left'
    },
    right(){
      this.message = 'right'
    },                 
  }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/vue/event/e10.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;可以通过全局&nbsp;`config.keyCodes`&nbsp;对象自定义键值修饰符别名
<!-- {% raw %} -->
<div>
<pre>// 可以使用 v-on:keyup.a
Vue.config.keyCodes.a = 65</pre>
</div>
<div>
<pre>&lt;div id="example"&gt;
  &lt;button @keyup.a="a"  @keyup.b="b"&gt;{{message}}&lt;/button&gt;
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
Vue.config.keyCodes.a = 65;
Vue.config.keyCodes.b = 66;
var example = new Vue({
  el: '#example',
  data:{
    message:'按下键盘上的a键或b键'
  },
  methods:{
    a(){
      this.message = 'a'
    },
    b(){
      this.message = 'b'
    },    
  }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/vue/event/e11.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 修饰键

&emsp;&emsp;可以用如下修饰符开启鼠标或键盘事件监听，使在按键按下时发生响应

<div>
<pre>.ctrl
.alt
.shift
.meta</pre>
</div>
<div>
<pre>&lt;!-- Alt + C --&gt;
&lt;input @keyup.alt.67="clear"&gt;
&lt;!-- Ctrl + Click --&gt;
&lt;div @click.ctrl="doSomething"&gt;Do something&lt;/div&gt;</pre>
</div>

&nbsp;&emsp;&emsp;下面一个例子
<!-- {% raw %} -->
<div>
<pre>&lt;div id="example"&gt;
  &lt;button @click.ctrl="ctrl"  @click.alt="alt"  @click.shift="shift"  @click.meta="meta"&gt;{{message}}&lt;/button&gt;
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
var example = new Vue({
  el: '#example',
  data:{
    message:'分别用按住辅助键ctrl、alt、shift、meta进行点击，会出现不同的效果'
  },
  methods:{
    ctrl(){
      this.message = 'ctrl'
    },
    alt(){
      this.message = 'alt'
    },
    shift(){
      this.message = 'shift'
    },  
    meta(){
      this.message = 'meta'
    },           
  }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/vue/event/e12.html" frameborder="0" width="320" height="240"></iframe>

