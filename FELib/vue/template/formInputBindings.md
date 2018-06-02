# Vue表单控件绑定

&emsp;&emsp;本文将详细介绍Vue表单控件绑定

&nbsp;

### 基础用法

&emsp;&emsp;可以用 `v-model` 指令在表单控件元素上创建双向数据绑定。它会根据控件类型自动选取正确的方法来更新元素。`v-model`本质上不过是语法糖，它负责监听用户的输入事件以更新数据

&emsp;&emsp;注意：`v-model`会忽略所有表单元素的`value`、`checked`、`selected`特性的初始值。因为它会选择Vue实例数据来作为具体的值。应该通过JS组件的`data`选项中声明初始值

【type:text】
<!-- {% raw %} -->
<div>
<pre>&lt;div id="example"&gt;
  &lt;input v-model="message" placeholder="edit me"&gt;
  &lt;p&gt;Message is: {{ message }}&lt;/p&gt;
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
var example = new Vue({
  el: '#example',
  data:{
    message:''
  }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/vue/form/f1.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;实际上v-model是:value和@input事件的语法糖
<!-- {% raw %} -->
<div>
<pre>&lt;div id="example"&gt;
  &lt;input :value="message" placeholder="edit me" @input="message=$event.target.value"&gt;
  &lt;p&gt;Message is: {{ message }}&lt;/p&gt;
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
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/vue/form/f2.html" frameborder="0" width="320" height="240"></iframe>

【textarea】
<!-- {% raw %} -->
<div>
<pre>&lt;div id="example"&gt;
  &lt;div&gt;
    &lt;span&gt;Multiline message is:&lt;/span&gt;
    &lt;p style="white-space: pre-line"&gt;{{ message }}&lt;/p&gt;  
  &lt;/div&gt;
  &lt;textarea v-model="message" placeholder="add multiple lines"&gt;&lt;/textarea&gt;
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
var example = new Vue({
  el: '#example',
  data:{
    message:''
  }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 130px;" src="https://demo.xiaohuochai.site/vue/form/f3.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;注意：在文本区域插值( `<textarea></textarea>` ) 并不会生效，应用 `v-model` 来代替

【type:checkbox】
<!-- {% raw %} -->
<div>
<pre>&lt;div id="example"&gt;
  &lt;input type="checkbox" id="checkbox" v-model="checked"&gt;
  &lt;label for="checkbox"&gt;{{ checked }}&lt;/label&gt;
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
var example = new Vue({
  el: '#example',
  data:{
    checked:false
  }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/vue/form/f4.html" frameborder="0" width="320" height="240"></iframe>
<!-- {% raw %} -->
<div>
<pre>&lt;div id="example"&gt;
  &lt;div&gt;
    &lt;input type="checkbox" id="jack" value="Jack" v-model="checkedNames"&gt;
    &lt;label for="jack"&gt;Jack&lt;/label&gt;
    &lt;input type="checkbox" id="john" value="John" v-model="checkedNames"&gt;
    &lt;label for="john"&gt;John&lt;/label&gt;
    &lt;input type="checkbox" id="mike" value="Mike" v-model="checkedNames"&gt;
    &lt;label for="mike"&gt;Mike&lt;/label&gt;  
  &lt;/div&gt;
  &lt;div&gt;
   &lt;span&gt;Checked names: {{ checkedNames }}&lt;/span&gt;  
  &lt;/div&gt;
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
var example = new Vue({
  el: '#example',
  data:{
    checkedNames:[]
  }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 80px;" src="https://demo.xiaohuochai.site/vue/form/f5.html" frameborder="0" width="320" height="240"></iframe>

【type:radio】
<!-- {% raw %} -->
<div>
<pre>&lt;div id="example"&gt;
  &lt;div&gt;
    &lt;input type="radio" id="one" value="One" v-model="picked"&gt;
    &lt;label for="one"&gt;One&lt;/label&gt;    
  &lt;/div&gt;
  &lt;div&gt;
    &lt;input type="radio" id="two" value="Two" v-model="picked"&gt;
    &lt;label for="two"&gt;Two&lt;/label&gt;    
  &lt;/div&gt;
  &lt;div&gt;Picked: {{ picked }}&lt;/div&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
var example = new Vue({
  el: '#example',
  data:{
    picked:''
  }
})
&lt;/script&gt;</pre>
</div>
<!-- {% endraw %} -->
<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/vue/form/f6.html" frameborder="0" width="320" height="240"></iframe>

【select】

**单选列表**
<!-- {% raw %} -->
<div>
<pre>&lt;div id="example"&gt;
  &lt;select v-model="selected"&gt;
    &lt;option disabled value=""&gt;请选择&lt;/option&gt;
    &lt;option&gt;A&lt;/option&gt;
    &lt;option&gt;B&lt;/option&gt;
    &lt;option&gt;C&lt;/option&gt;
  &lt;/select&gt;
  &lt;span&gt;Selected: {{ selected }}&lt;/span&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>&lt;script&gt;
var example = new Vue({
  el: '#example',
  data:{
    selected: ''
  }
})
&lt;/script&gt;</pre>
</div>
<!-- {% endraw %} -->
<iframe style="width: 100%; height: 50px;" src="https://demo.xiaohuochai.site/vue/form/f7.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;注意：如果`v-model`表达初始的值不匹配任何的选项，`<select>`元素就会以&rdquo;未选中&rdquo;的状态渲染。在iOS中，这会使用户无法选择第一个选项，因为这样的情况下，iOS不会引发change事件。因此，像以上提供disabled选项是建议的做法

**多选列表**
<!-- {% raw %} -->
<div>
<pre>&lt;div id="example"&gt;
  &lt;select v-model="selected" multiple&gt;
    &lt;option&gt;A&lt;/option&gt;
    &lt;option&gt;B&lt;/option&gt;
    &lt;option&gt;C&lt;/option&gt;
  &lt;/select&gt;
  &lt;span&gt;Selected: {{ selected }}&lt;/span&gt;
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
var example = new Vue({
  el: '#example',
  data:{
    selected: []
  }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 90px;" src="https://demo.xiaohuochai.site/vue/form/f8.html" frameborder="0" width="320" height="240"></iframe>

**动态选项**

&emsp;&emsp;用v-for渲染
<!-- {% raw %} -->
<div>
<pre>&lt;div id="example"&gt;
  &lt;select v-model="selected"&gt;
    &lt;option v-for="option in options" :value="option.value"&gt;
      {{ option.text }}
    &lt;/option&gt;
  &lt;/select&gt;
  &lt;span&gt;Selected: {{ selected }}&lt;/span&gt;
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
var example = new Vue({
  el: '#example',
  data:{
    selected: 'A',
    options: [
      { text: 'One', value: 'A' },
      { text: 'Two', value: 'B' },
      { text: 'Three', value: 'C' }
    ]
  }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 80px;" src="https://demo.xiaohuochai.site/vue/form/f9.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 绑定value

&emsp;&emsp;对于单选按钮，勾选框及选择列表选项， `v-model`绑定的value通常是静态字符串（对于勾选框是逻辑值）&nbsp;

<div>
<pre>&lt;!-- 当选中时，`picked` 为字符串 "a" --&gt;
&lt;input type="radio" v-model="picked" value="a"&gt;
&lt;!-- `toggle` 为 true 或 false --&gt;
&lt;input type="checkbox" v-model="toggle"&gt;
&lt;!-- 当选中时，`selected` 为字符串 "abc" --&gt;
&lt;select v-model="selected"&gt;
  &lt;option value="abc"&gt;ABC&lt;/option&gt;
&lt;/select&gt;</pre>
</div>

&emsp;&emsp;但若要绑定value到Vue实例的一个动态属性上，就可以用`v-bind`实现，并且这个属性的值可以不是字符串

【复选框】
<!-- {% raw %} -->
<div>
<pre>&lt;div id="example"&gt;
  &lt;input type="checkbox" v-model="toggle" :true-value="a" :false-value="b"&gt;
  &lt;span&gt;{{ toggle }}&lt;/span&gt;
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
var example = new Vue({
  el: '#example',
  data:{
    toggle:'',
    a:true,
    b:false
  }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/vue/form/f10.html" frameborder="0" width="320" height="240"></iframe>

【单选按钮】
<!-- {% raw %} -->
<div>
<pre>&lt;div id="example"&gt;
  &lt;input type="radio" v-model="pick" :value="a"&gt;
  &lt;span&gt;{{ pick }}&lt;/span&gt;
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
var example = new Vue({
  el: '#example',
  data:{
    pick:'',
    a:true
  }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 40px;" src="https://demo.xiaohuochai.site/vue/form/f11.html" frameborder="0" width="320" height="240"></iframe>

【选择列表】
<!-- {% raw %} -->
<div>
<pre>&lt;div id="example"&gt;
  &lt;select v-model="selected"&gt;
    &lt;option :value="{ number: 123 }"&gt;123&lt;/option&gt;
    &lt;option :value="{ number: 234 }"&gt;234&lt;/option&gt;
    &lt;option :value="{ number: 345 }"&gt;345&lt;/option&gt;
  &lt;/select&gt;
    &lt;span&gt;Selected: {{ selected.number }}&lt;/span&gt;
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
var example = new Vue({
  el: '#example',
  data:{
    selected:''
  }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 80px;" src="https://demo.xiaohuochai.site/vue/form/f12.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### 修饰符

【.lazy】

&emsp;&emsp;在默认情况下， `v-model`在`input`事件中同步输入框的值与数据，但可以添加一个修饰符 `lazy` ，从而转变为在`change`事件中同步

&emsp;&emsp;下列例子中，光标移出输入框时，才同步数据
<!-- {% raw %} -->
<div>
<pre>&lt;div id="example"&gt;
  &lt;input v-model.lazy="message" placeholder="edit me"&gt;
  &lt;p&gt;Message is: {{ message }}&lt;/p&gt;
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
var example = new Vue({
  el: '#example',
  data:{
    message:''
  }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/vue/form/f13.html" frameborder="0" width="320" height="240"></iframe>

【.number】

&emsp;&emsp;如果想自动将用户的输入值转为Number类型（如果原值的转换结果为 NaN 则返回原值），可以添加一个修饰符`number`给`v-model`来处理输入值

&emsp;&emsp;这通常很有用，因为在 `type="number"` 时 HTML 中输入的值也总是会返回字符串类型
<!-- {% raw %} -->
<div>
<pre>&lt;div id="example"&gt;
  &lt;div&gt;
    &lt;input v-model="age1" type="number"&gt;
    &lt;span&gt;{{type1}}&lt;/span&gt;
    &lt;p&gt;普通输入: {{ age1 }}&lt;/p&gt;    
  &lt;/div&gt;
  &lt;div&gt;
    &lt;input v-model.number="age2" type="number"&gt;
    &lt;span&gt;{{type2}}&lt;/span&gt;
    &lt;p&gt;number修饰符输入: {{ age2 }}&lt;/p&gt;    
  &lt;/div&gt;
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
var example = new Vue({
  el: '#example',
  data:{
    age1:'',
    age2:'',
  },
  computed:{
    type1:function(){
      return typeof(this.age1)
    },
    type2:function(val){
      return typeof(this.age2)
    },
  }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 200px;" src="https://demo.xiaohuochai.site/vue/form/f14.html" frameborder="0" width="320" height="240"></iframe>

【.trim】

&emsp;&emsp;如果要自动过滤用户输入的首尾空格，可以添加 `trim` 修饰符到 `v-model` 上过滤输入
<!-- {% raw %} -->
<div>
<pre>&lt;div id="example"&gt;
  &lt;input v-model.trim="msg"&gt;
  &lt;p&gt;msg is: {{ msg }}&lt;/p&gt;
&lt;/div&gt;</pre>
</div>
<!-- {% endraw %} -->
<div>
<pre>&lt;script&gt;
var example = new Vue({
  el: '#example',
  data:{
    msg:''
  }
})
&lt;/script&gt;</pre>
</div>

<iframe style="width: 100%; height: 100px;" src="https://demo.xiaohuochai.site/vue/form/f15.html" frameborder="0" width="320" height="240"></iframe>

