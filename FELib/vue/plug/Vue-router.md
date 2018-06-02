# Vue路由vue-router

&emsp;&emsp;在Web开发中，路由是指根据URL分配到对应的处理程序。对于大多数单页面应用，都推荐使用官方支持的vue-router。Vue-router通过管理URL，实现URL和组件的对应，以及通过URL进行组件之间的切换。本文将详细介绍Vue路由vue-router

&nbsp;

### 安装

&emsp;&emsp;在使用vue-router之前，首先需要安装该插件

<div>
<pre>npm install vue-router</pre>
</div>

![vue-router1](https://pic.xiaohuochai.site/blog/vue-router1.png)


&emsp;&emsp;如果在一个模块化工程中使用它，必须要通过 `Vue.use()` 明确地安装路由功能

<div>
<pre>import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)</pre>
</div>

&emsp;&emsp;如果使用全局的 script 标签，则无须如此

&nbsp;

### 使用

&emsp;&emsp;用Vue.js + vue-router创建单页应用非常简单。使用Vue.js ，已经可以通过组合组件来组成应用程序，把vue-router添加进来，需要做的是，将组件(components)映射到路由(routes)，然后告诉 vue-router 在哪里渲染它们

&emsp;&emsp;下面是一个实例

<div>
<pre>&lt;div id="app"&gt;
  &lt;h1&gt;Hello App!&lt;/h1&gt;
  &lt;p&gt;
    &lt;!-- 使用 router-link 组件来导航，通过传入 `to` 属性指定链接，&lt;router-link&gt; 默认会被渲染成一个 `&lt;a&gt;` 标签 --&gt;
    &lt;router-link to="/foo"&gt;Go to Foo&lt;/router-link&gt;
    &lt;router-link to="/bar"&gt;Go to Bar&lt;/router-link&gt;
  &lt;/p&gt;
  &lt;!-- 路由出口，路由匹配到的组件将渲染在这里 --&gt;
  &lt;router-view&gt;&lt;/router-view&gt;
&lt;/div&gt;
&lt;script src="vue.js"&gt;&lt;/script&gt;
&lt;script src="vue-router.js"&gt;&lt;/script&gt;
&lt;script&gt;
// 0. 如果使用模块化机制编程，导入Vue和VueRouter，要调用 Vue.use(VueRouter)
// 1. 定义（路由）组件，可以从其他文件 import 进来
const Foo = { template: '&lt;div&gt;foo&lt;/div&gt;' }
const Bar = { template: '&lt;div&gt;bar&lt;/div&gt;' }
// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是通过 Vue.extend() 创建的组件构造器，或者，只是一个组件配置对象。
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]
// 3. 创建 router 实例，然后传 `routes` 配置，当然还可以传别的配置参数
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})
// 4. 创建和挂载根实例。
// 通过 router 配置参数注入路由，从而让整个应用都有路由功能
const app = new Vue({
&emsp;&emsp;el:'#app',
&emsp;&emsp;router
})&lt;/script&gt;  </pre>
</div>

<iframe src="https://demo.xiaohuochai.site/vue/vue-router/v1.html" frameborder="0" width="320" height="151"></iframe>

&nbsp;

### 路由模式

&emsp;&emsp;`vue-router`&nbsp;默认 hash 模式 &mdash;&mdash; 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载

<div>
<pre>http://localhost:8080/#/Hello</pre>
</div>

&emsp;&emsp;如果不想要很丑的 hash，可以用路由的&nbsp;**history 模式**，这种模式充分利用&nbsp;`history.pushState`&nbsp;API 来完成 URL 跳转而无须重新加载页面

<div>
<pre>const router = new VueRouter({
  mode: 'history',
  routes: [...]
})</pre>
</div>

&emsp;&emsp;当使用 history 模式时，URL 就像正常的 url

<div>
<pre>http://localhost:8080/Hello</pre>
</div>

&emsp;&emsp;不过这种模式需要后台配置支持。如果后台没有正确的配置，当用户在浏览器直接访问&nbsp;`http://oursite.com/user/id`&nbsp;就会返回 404

【服务器配置】

&emsp;&emsp;如果要使用history模式，则需要进行服务器配置

&emsp;&emsp;所以，要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个&nbsp;`index.html`&nbsp;页面，这个页面就是app 依赖的页面

&emsp;&emsp;下面是一些配置的例子

**apache**

&emsp;&emsp;以wamp为例，需要对httpd.conf配置文件进行修改

&emsp;&emsp;首先，去掉rewrite_module前面的#号注释

<div>
<pre>LoadModule rewrite_module modules/mod_rewrite.so</pre>
</div>

&emsp;&emsp;然后，将文档所有的AllowOverride设置为all

<div>
<pre>AllowOverride all
</pre>
</div>

&emsp;&emsp;最后，需要保存一个.htaccess文件放置在根路径下面，文件内容如下

<div>
<pre>&lt;IfModule mod_rewrite.c&gt;
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
&lt;/IfModule&gt;</pre>
</div>

**nginx**

<div>
<pre>location / {
  try_files $uri $uri/ /index.html;
}</pre>
</div>

【注意事项】

&emsp;&emsp;这么做以后，服务器就不再返回404错误页面，因为对于所有路径都会返回&nbsp;`index.html`&nbsp;文件。为了避免这种情况，应该在Vue应用里面覆盖所有的路由情况，然后再给出一个404页面

<div>
<pre>const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '*', component: NotFoundComponent }
  ]
})</pre>
</div>

&emsp;&emsp;或者，如果是用 Node.js 作后台，可以使用服务端的路由来匹配 URL，当没有匹配到路由的时候返回 404，从而实现 fallback

<div>
<pre>const Foo = { template: '&lt;div&gt;foo&lt;/div&gt;' }
const Bar = { template: '&lt;div&gt;bar&lt;/div&gt;' }
const NotFound = {template:'&lt;div&gt;not found&lt;/div&gt;'}
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar },
  { path: '*', component: NotFound},
]</pre>
</div>

&nbsp;<iframe src="https://demo.xiaohuochai.site/vue/vue-router/v02.html" frameborder="0" width="320" height="100"></iframe>

&nbsp;

### 重定向和别名

【重定向】

&emsp;&emsp;重定向通过 `routes` 配置来完成，下面例子是从 `/a` 重定向到 `/b`

<div>
<pre>const router = new VueRouter({
  routes: [
    { path: '/a', redirect: '/b' }
  ]
})</pre>
</div>

&emsp;&emsp;重定向的目标也可以是一个命名的路由：

<div>
<pre>const router = new VueRouter({
  routes: [
    { path: '/a', redirect: { name: 'foo' }}
  ]
})</pre>
</div>

&emsp;&emsp;甚至是一个方法，动态返回重定向目标：

<div>
<pre>const router = new VueRouter({
  routes: [
    { path: '/a', redirect: to =&gt; {
      // 方法接收 目标路由 作为参数
      // return 重定向的 字符串路径/路径对象
      return '/home'
    }}
  ]
})</pre>
</div>

&emsp;&emsp;对于不识别的URL地址来说，常常使用重定向功能，将页面定向到首页显示

<div>
<pre>const Foo = { template: '&lt;div&gt;foo&lt;/div&gt;' }
const Bar = { template: '&lt;div&gt;bar&lt;/div&gt;' }
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar },
  { path: '*', redirect: "/foo"},
]</pre>
</div>

<iframe src="https://demo.xiaohuochai.site/vue/vue-router/v03.html" frameborder="0" width="320" height="100"></iframe>

【别名】

&emsp;&emsp;重定向是指，当用户访问 `/a`时，URL 将会被替换成 `/b`，然后匹配路由为 `/b`，那么别名是什么呢？`/a` 的别名是 `/b`，意味着，当用户访问 `/b` 时，URL 会保持为 `/b`，但是路由匹配则为 `/a`，就像用户访问 `/a` 一样

&emsp;&emsp;上面对应的路由配置为

<div>
<pre>const router = new VueRouter({
  routes: [
    { path: '/a', component: A, alias: '/b' }
  ]
})</pre>
</div>

&emsp;&emsp;『别名』的功能可以自由地将 UI 结构映射到任意的 URL，而不是受限于配置的嵌套路由结构

&emsp;&emsp;处理首页访问时，常常将index设置为别名，比如将'/home'的别名设置为'/index'。但是，要注意的是，&lt;router-link to="/home"&gt;的样式在URL为/index时并不会显示。因为，router-link只识别出了home，而无法识别index

&nbsp;

### 根路径

&emsp;&emsp;设置根路径，需要将path设置为'/'

<div>
<pre>  &lt;p&gt;
    &lt;router-link to="/"&gt;index&lt;/router-link&gt;
    &lt;router-link to="/foo"&gt;Go to Foo&lt;/router-link&gt;
    &lt;router-link to="/bar"&gt;Go to Bar&lt;/router-link&gt;
  &lt;/p&gt;
const routes = [
  { path: '/', component: Home },
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar },
]</pre>
</div>

<iframe src="https://demo.xiaohuochai.site/vue/vue-router/v04.html" frameborder="0" width="320" height="100"></iframe>

&emsp;&emsp;但是，由于默认使用的是全包含匹配，即'/foo'、'/bar'也可以匹配到'/'，如果需要精确匹配，仅仅匹配'/'，则需要在router-link中设置exact属性

<div>
<pre>  &lt;p&gt;
    &lt;router-link to="/" exact&gt;index&lt;/router-link&gt;
    &lt;router-link to="/foo"&gt;Go to Foo&lt;/router-link&gt;
    &lt;router-link to="/bar"&gt;Go to Bar&lt;/router-link&gt;
  &lt;/p&gt;
const routes = [
  { path: '/', component: Home },
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar },
]</pre>
</div>

<iframe src="https://demo.xiaohuochai.site/vue/vue-router/v05.html" frameborder="0" width="320" height="100"></iframe>

&nbsp;

### 嵌套路由

&emsp;&emsp;实际生活中的应用界面，通常由多层嵌套的组件组合而成。同样地，URL中各段动态路径也按某种结构对应嵌套的各层组件

<div>
<pre>/user/foo/profile                     /user/foo/posts
+------------------+                  +-----------------+
| User             |                  | User            |
| +--------------+ |                  | +-------------+ |
| | Profile      | |  +------------&gt;  | | Posts       | |
| |              | |                  | |             | |
| +--------------+ |                  | +-------------+ |
+------------------+                  +-----------------+</pre>
</div>

&emsp;&emsp;借助 `vue-router`，使用嵌套路由配置，就可以很简单地表达这种关系

<div>
<pre>&lt;div id="app"&gt;
  &lt;p&gt;
    &lt;router-link to="/" exact&gt;index&lt;/router-link&gt;
    &lt;router-link to="/foo"&gt;Go to Foo&lt;/router-link&gt;
    &lt;router-link to="/bar"&gt;Go to Bar&lt;/router-link&gt;
  &lt;/p&gt;
  &lt;router-view&gt;&lt;/router-view&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>const Home = { template: '&lt;div&gt;home&lt;/div&gt;' }
const Foo = { template: `
  &lt;div&gt;
    &lt;p&gt;
      &lt;router-link to="/foo/foo1"&gt;to Foo1&lt;/router-link&gt;
      &lt;router-link to="/foo/foo2"&gt;to Foo2&lt;/router-link&gt;
      &lt;router-link to="/foo/foo3"&gt;to Foo3&lt;/router-link&gt;  
    &lt;/p&gt;
    &lt;router-view&gt;&lt;/router-view&gt;
  &lt;/div&gt;
  ` }
const Bar = { template: '&lt;div&gt;bar&lt;/div&gt;' }
const Foo1 = { template: '&lt;div&gt;Foo1&lt;/div&gt;' }
const Foo2 = { template: '&lt;div&gt;Foo2&lt;/div&gt;' }
const Foo3 = { template: '&lt;div&gt;Foo3&lt;/div&gt;' }</pre>
</div>
<div>
<pre>const routes = [
  { path: '/', component: Home },
  { path: '/foo', component: Foo ,children:[
    {path:'foo1',component:Foo1},
    {path:'foo2',component:Foo2},
    {path:'foo3',component:Foo3},
  ]},
  { path: '/bar', component: Bar },
]</pre>
</div>

&emsp;&emsp;要特别注意的是，router的构造配置中，children属性里的path属性只设置为当前路径，因为其会依据层级关系；而在router-link的to属性则需要设置为完全路径

<iframe src="https://demo.xiaohuochai.site/vue/vue-router/v06.html" frameborder="0" width="320" height="120"></iframe>

&emsp;&emsp;如果要设置默认子路由，即点击foo时，自动触发foo1，则需要进行如下修改。将router配置对象中children属性的path属性设置为''，并将对应的router-link的to属性设置为'/foo'

<div>
<pre>const Foo = { template: `
  &lt;div&gt;
    &lt;p&gt;
      &lt;router-link to="/foo" exact&gt;to Foo1&lt;/router-link&gt;
      &lt;router-link to="/foo/foo2"&gt;to Foo2&lt;/router-link&gt;
      &lt;router-link to="/foo/foo3"&gt;to Foo3&lt;/router-link&gt;  
    &lt;/p&gt;
    &lt;router-view&gt;&lt;/router-view&gt;
  &lt;/div&gt;
  ` }</pre>
</div>
<div>
<pre>const routes = [
  { path: '/', component: Home },
  { path: '/foo', component: Foo ,children:[
    {path:'',component:Foo1},
    {path:'foo2',component:Foo2},
    {path:'foo3',component:Foo3},
  ]},
  { path: '/bar', component: Bar },
]</pre>
</div>

&emsp;&emsp;结果如下所示

<iframe src="https://demo.xiaohuochai.site/vue/vue-router/v07.html" frameborder="0" width="320" height="120"></iframe>

&nbsp;

### 命名路由

&emsp;&emsp;有时，通过一个名称来标识一个路由显得更方便，特别是在链接一个路由，或者是执行一些跳转时。可以在创建Router实例时，在`routes`配置中给某个路由设置名称

<div>
<pre>const router = new VueRouter({
  routes: [
    {
      path: '/user/:userId',
      name: 'user',
      component: User
    }
  ]
})</pre>
</div>

&emsp;&emsp;要链接到一个命名路由，可以给&nbsp;`router-link`&nbsp;的&nbsp;`to`&nbsp;属性传一个对象：

<div>
<pre>&lt;router-link :to="{ name: 'user', params: { userId: 123 }}"&gt;User&lt;/router-link&gt;</pre>
</div>

&emsp;&emsp;这跟代码调用&nbsp;`router.push()`&nbsp;是一回事

<div>
<pre>router.push({ name: 'user', params: { userId: 123 }})</pre>
</div>

&emsp;&emsp;这两种方式都会把路由导航到&nbsp;`/user/123`&nbsp;路径

&emsp;&emsp;命名路由的常见用途是替换router-link中的to属性，如果不使用命名路由，由router-link中的to属性需要设置全路径，不够灵活，且修改时较麻烦。使用命名路由，只需要使用包含name属性的对象即可

&emsp;&emsp;注意：如果设置了默认子路由，则不要在父级路由上设置name属性

<div>
<pre>&lt;div id="app"&gt;
  &lt;p&gt;
    &lt;router-link to="/" exact&gt;index&lt;/router-link&gt;
    &lt;router-link :to="{ name: 'foo1' }"&gt;Go to Foo&lt;/router-link&gt;
    &lt;router-link :to="{ name: 'bar' }"&gt;Go to Bar&lt;/router-link&gt;
  &lt;/p&gt;
  &lt;router-view&gt;&lt;/router-view&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>const Home = { template: '&lt;div&gt;home&lt;/div&gt;' }
const Foo = { template: `
  &lt;div&gt;
    &lt;p&gt;
      &lt;router-link :to="{ name: 'foo1' }" exact&gt;to Foo1&lt;/router-link&gt;
      &lt;router-link :to="{ name: 'foo2' }" &gt;to Foo2&lt;/router-link&gt;
      &lt;router-link :to="{ name: 'foo3' }" &gt;to Foo3&lt;/router-link&gt;  
    &lt;/p&gt;
    &lt;router-view&gt;&lt;/router-view&gt;
  &lt;/div&gt;
  ` }
const Bar = { template: '&lt;div&gt;bar&lt;/div&gt;' }
const Foo1 = { template: '&lt;div&gt;Foo1&lt;/div&gt;' }
const Foo2 = { template: '&lt;div&gt;Foo2&lt;/div&gt;' }
const Foo3 = { template: '&lt;div&gt;Foo3&lt;/div&gt;' }</pre>
</div>
<div>
<pre>const routes = [
  { path: '/', name:'home', component: Home },
  { path: '/foo', component: Foo ,children:[
    {path:'',name:'foo1', component:Foo1},
    {path:'foo2',name:'foo2', component:Foo2},
    {path:'foo3',name:'foo3', component:Foo3},
  ]},
  { path: '/bar', name:'bar', component: Bar },
]</pre>
</div>

&emsp;&emsp;结果如下所示

<iframe src="https://demo.xiaohuochai.site/vue/vue-router/v08.html" frameborder="0" width="320" height="120"></iframe>

&nbsp;

### 命名视图

&emsp;&emsp;有时候想同时（同级）展示多个视图，而不是嵌套展示，例如创建一个布局，有&nbsp;`sidebar`（侧导航） 和&nbsp;`main`（主内容） 两个视图，这个时候命名视图就派上用场了。可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果&nbsp;`router-view`&nbsp;没有设置名字，那么默认为&nbsp;`default`

<div>
<pre>&lt;router-view class="view one"&gt;&lt;/router-view&gt;
&lt;router-view class="view two" name="a"&gt;&lt;/router-view&gt;
&lt;router-view class="view three" name="b"&gt;&lt;/router-view&gt;</pre>
</div>

&emsp;&emsp;一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。确保正确使用`components`配置

<div>
<pre>const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
})</pre>
</div>

&emsp;&emsp;下面是一个实例

<div>
<pre>&lt;div id="app"&gt;
  &lt;p&gt;
    &lt;router-link to="/" exact&gt;index&lt;/router-link&gt;
    &lt;router-link :to="{ name: 'foo' }"&gt;Go to Foo&lt;/router-link&gt;
    &lt;router-link :to="{ name: 'bar' }"&gt;Go to Bar&lt;/router-link&gt;
  &lt;/p&gt;
  &lt;router-view&gt;&lt;/router-view&gt;
  &lt;router-view name="side"&gt;&lt;/router-view&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>const Home = { template: '&lt;div&gt;home&lt;/div&gt;' }
const Foo = { template: '&lt;div&gt;Foo&lt;/div&gt;'}
const MainBar = { template: '&lt;div&gt;mainBar&lt;/div&gt;' }
const SideBar = { template: '&lt;div&gt;sideBar&lt;/div&gt;' }
const routes = [
  { path: '/', name:'home', component: Home },
  { path: '/foo', name:'foo', component: Foo},
  { path: '/bar', name:'bar', components: {
    default: MainBar,
    side:SideBar
   } },
]</pre>
</div>

&emsp;&emsp;结果如下所示

<iframe src="https://demo.xiaohuochai.site/vue/vue-router/v09.html" frameborder="0" width="320" height="120"></iframe>

&nbsp;

### 动态路径

&emsp;&emsp;经常需要把某种模式匹配到的所有路由，全都映射到同个组件。例如，有一个 `User` 组件，对于所有 ID 各不相同的用户，都要使用这个组件来渲染。那么，可以在 `vue-router` 的路由路径中使用动态路径参数（dynamic segment）来达到这个效果

<div>
<pre>const User = {
  template: '&lt;div&gt;User&lt;/div&gt;'
}
const router = new VueRouter({
  routes: [
    // 动态路径参数以冒号开头
    { path: '/user/:id', component: User }
  ]
})</pre>
</div>

&emsp;&emsp;现在，像 `/user/foo` 和 `/user/bar` 都将映射到相同的路由

&emsp;&emsp;下面是一个比较完整的实例，path:'/user/:id?'表示有没有子路径都可以匹配
<!-- {% raw %} -->
<div>
<pre>&lt;div id="app"&gt;
    &lt;router-view&gt;&lt;/router-view&gt;
    &lt;br&gt;
  &lt;p&gt;
    &lt;router-link to="/" exact&gt;index&lt;/router-link&gt;
    &lt;router-link :to="{name:'user'}"&gt;User&lt;/router-link&gt;
    &lt;router-link :to="{name:'bar'}"&gt;Go to Bar&lt;/router-link&gt;
  &lt;/p&gt;
&lt;/div&gt;
const home = { template: '&lt;div&gt;home&lt;/div&gt;'};
const bar = { template: '&lt;div&gt;bar&lt;/div&gt;'};
const user = {template: `&lt;div&gt;
                          &lt;p&gt;user&lt;/p&gt;
                          &lt;router-link style="margin: 0 10px" :to="'/user/' + item.id" v-for="item in userList" key="item.id"&gt;{{item.userName}}&lt;/router-link&gt;  
                      &lt;/div&gt;`,
  data(){
    return{userList:[{id:1,userName:'u1'},{id:2,userName:'u2'},{id:3,userName:'u3'}]}
  }
};
const app = new Vue({
  el:'#app',
  router:new VueRouter({
    routes: [
      { path: '/', name:'home', component:home },
      { path: '/user/:id?', name:'user', component:user},
      { path: '/bar', name:'bar', component:bar},
    ],
  }), 
})</pre>
</div>
<!-- {% endraw %} -->
<iframe src="https://demo.xiaohuochai.site/vue/vue-router/v12.html" frameborder="0" width="320" height="150"></iframe>

&emsp;&emsp;一个路径参数使用冒号 `:` 标记。当匹配到一个路由时，参数值会被设置到 `this.$route.params`，可以在每个组件内使用。于是，可以更新 `User` 的模板，输出当前用户的 ID：
<!-- {% raw %} -->
<div>
<pre>const User = {
  template: '&lt;div&gt;User {{ $route.params.id }}&lt;/div&gt;'
}</pre>
</div>
<!-- {% endraw %} -->
&emsp;&emsp;下面是一个实例
<!-- {% raw %} -->
<div>
<pre>&lt;div id="app"&gt;
  &lt;p&gt;
    &lt;router-link to="/user/foo"&gt;/user/foo&lt;/router-link&gt;
    &lt;router-link to="/user/bar"&gt;/user/bar&lt;/router-link&gt;
  &lt;/p&gt;
  &lt;router-view&gt;&lt;/router-view&gt;
&lt;/div&gt;
&lt;script src="vue.js"&gt;&lt;/script&gt;
&lt;script src="vue-router.js"&gt;&lt;/script&gt;
&lt;script&gt;
const User = {
  template: `&lt;div&gt;User {{ $route.params.id }}&lt;/div&gt;`
}
const router = new VueRouter({
  routes: [
    { path: '/user/:id', component: User }
  ]
})
const app = new Vue({ router }).$mount('#app')
&lt;/script&gt;  </pre>
</div>
<!-- {% endraw %} -->
<iframe style="width: 100%; height: 110px;" src="https://demo.xiaohuochai.site/vue/vue-router/v22.html" frameborder="0" width="320" height="240"></iframe>

&emsp;&emsp;可以在一个路由中设置多段『路径参数』，对应的值都会设置到 `$route.params` 中。例如：

<div>
<pre>模式     &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;匹配路径     &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;$route.params
/user/:username     &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;　/user/evan     &emsp;&emsp;&emsp;&emsp;{ username: 'evan' }
/user/:username/post/:post_id   /user/evan/post/123   { username: 'evan', post_id: 123 }</pre>
</div>

&emsp;&emsp;除了 `$route.params` 外，`$route` 对象还提供了其它有用的信息，例如，`$route.query`（如果 URL 中有查询参数）、`$route.hash` 等等

【响应路由参数的变化】

&emsp;&emsp;使用路由参数时，例如从 `/user/foo` 导航到 `user/bar`，**原来的组件实例会被复用**。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。**不过，这也意味着组件的生命周期钩子不会再被调用**

&emsp;&emsp;复用组件时，想对路由参数的变化作出响应的话，可以简单地 watch（监测变化） `$route` 对象：

<div>
<pre>const User = {
  template: '...',
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
    }
  }
}</pre>
</div>

&emsp;&emsp;注意：有时同一个路径可以匹配多个路由，此时，匹配的优先级就按照路由的定义顺序：谁先定义的，谁的优先级就最高

&emsp;&emsp;下面是一个实例
<!-- {% raw %} -->
<div>
<pre>const home = { template: '&lt;div&gt;home&lt;/div&gt;'};
const bar = { template: '&lt;div&gt;bar&lt;/div&gt;'};
const user = 
  {template: `&lt;div&gt;
    &lt;p&gt;user&lt;/p&gt;
    &lt;router-link style="margin: 0 10px" :to="'/user/' +item.type + '/'+ item.id" v-for="item in userList" key="item.id"&gt;{{item.userName}}&lt;/router-link&gt;  
    &lt;div v-if="$route.params.id"&gt;
      &lt;div&gt;id:{{userInfo.id}};userName:{{userInfo.userName}} ;type:{{userInfo.type}};&lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;`,
  data(){
    return{
      userList:[{id:1,type:'vip',userName:'u1'},{id:2,type:'common',userName:'u2'},{id:3,type:'vip',userName:'u3'}],
      userInfo:null,
    }
  },
  methods:{
    getData(){
      let id = this.$route.params.id;
      if(id){
        this.userInfo = this.userList.filter((item)=&gt;{
          return item.id == id;
        })[0]
      }else{
        this.userInfo = {};
      }   
    }
  },
  created(){
    this.getData();
  },
  watch:{
    $route(){
      this.getData();
    },
  }
};
const app = new Vue({
  el:'#app',
  router:new VueRouter({
    routes: [
      { path: '/', name:'home', component:home },
      { path: '/user/:type?/:id?', name:'user', component:user},
      { path: '/bar', name:'bar', component:bar},
    ],
  }), 
})</pre>
</div>
<!-- {% endraw %} -->
<iframe src="https://demo.xiaohuochai.site/vue/vue-router/v13.html" frameborder="0" width="320" height="150"></iframe>

&nbsp;

### 查询字符串

&emsp;&emsp;实现子路由，除了使用动态参数，也可以使用查询字符串
<!-- {% raw %} -->
<div>
<pre>const home = { template: '&lt;div&gt;home&lt;/div&gt;'};
const bar = { template: '&lt;div&gt;bar&lt;/div&gt;'};
const user = 
  {template: `&lt;div&gt;
    &lt;p&gt;user&lt;/p&gt;
    &lt;router-link style="margin: 0 10px" :to="'/user/' +item.type + '/'+ item.id" v-for="item in userList" key="item.id"&gt;{{item.userName}}&lt;/router-link&gt;  
    &lt;div v-if="$route.params.id"&gt;
      &lt;div&gt;id:{{userInfo.id}};userName:{{userInfo.userName}} ;type:{{userInfo.type}};&lt;/div&gt;
      &lt;router-link to="?info=follow" exact&gt;关注&lt;/router-link&gt;
      &lt;router-link to="?info=share" exact&gt;分享&lt;/router-link&gt;
    &lt;/div&gt;
&lt;/div&gt;`,
  data(){
    return{
      userList:[{id:1,type:'vip',userName:'u1'},{id:2,type:'common',userName:'u2'},{id:3,type:'vip',userName:'u3'}],
      userInfo:null,
    }
  },
  methods:{
    getData(){
      let id = this.$route.params.id;
      if(id){
        this.userInfo = this.userList.filter((item)=&gt;{
          return item.id == id;
        })[0]
      }else{
        this.userInfo = {};
      }   
    }
  },
  created(){
    this.getData();
  },
  watch:{
    $route(){
      this.getData();
    },
  }
};
const app = new Vue({
  el:'#app',
  router:new VueRouter({
    routes: [
      { path: '/', name:'home', component:home },
      { path: '/user/:type?/:id?', name:'user', component:user},
      { path: '/bar', name:'bar', component:bar},
    ],
  }), 
})</pre>
</div>
<!-- {% endraw %} -->
<iframe src="https://demo.xiaohuochai.site/vue/vue-router/v14.html" frameborder="0" width="320" height="170"></iframe>

&emsp;&emsp;当需要设置默认查询字符串时，进行如下设置
<!-- {% raw %} -->
<div>
<pre>const user = 
  {template: `&lt;div&gt;
    &lt;p&gt;user&lt;/p&gt;
    &lt;router-link style="margin: 0 10px" :to="{path:'/user/' +item.type + '/'+ item.id,query:{info:'follow'}}" v-for="item in userList" key="item.id"&gt;{{item.userName}}&lt;/router-link&gt;  
    &lt;div v-if="$route.params.id"&gt;
      &lt;div&gt;id:{{userInfo.id}};userName:{{userInfo.userName}} ;type:{{userInfo.type}};&lt;/div&gt;
      &lt;router-link to="?info=follow" exact&gt;关注&lt;/router-link&gt;
      &lt;router-link to="?info=share" exact&gt;分享&lt;/router-link&gt;
      {{$route.query}}
    &lt;/div&gt;
&lt;/div&gt;`,
  data(){
    return{
      userList:[{id:1,type:'vip',userName:'u1'},{id:2,type:'common',userName:'u2'},{id:3,type:'vip',userName:'u3'}],
      userInfo:null,
    }
  },
  methods:{
    getData(){
      let id = this.$route.params.id;
      if(id){
        this.userInfo = this.userList.filter((item)=&gt;{
          return item.id == id;
        })[0]
      }else{
        this.userInfo = {};
      }   
    }
  },
  created(){
    this.getData();
  },
  watch:{
    $route(){
      this.getData();
    },
  }
};</pre>
</div>
<!-- {% endraw %} -->
<iframe src="https://demo.xiaohuochai.site/vue/vue-router/v15.html" frameborder="0" width="320" height="170"></iframe>

&nbsp;

### 滚动行为

&emsp;&emsp;使用前端路由，当切换到新路由时，想要页面滚到顶部，或者是保持原先的滚动位置，就像重新加载页面那样。&nbsp;`vue-router`&nbsp;能做到，而且更好，它可以自定义路由切换时页面如何滚动

&emsp;&emsp;注意：这个功能只在 HTML5 history 模式下可用

&emsp;&emsp;当创建一个 Router 实例，可以提供一个&nbsp;`scrollBehavior`&nbsp;方法。该方法在前进、后退或切换导航时触发

<div>
<pre>const router = new VueRouter({
  routes: [...],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
  }
})</pre>
</div>

&emsp;&emsp;`scrollBehavior`&nbsp;方法返回&nbsp;`to`&nbsp;和&nbsp;`from`&nbsp;路由对象。第三个参数&nbsp;`savedPosition`&nbsp;当且仅当&nbsp;`popstate`&nbsp;导航 (通过浏览器的 前进/后退 按钮触发) 时才可用，返回滚动条的坐标{x:number,y:number}

&emsp;&emsp;如果返回一个布尔假的值，或者是一个空对象，那么不会发生滚动

<div>
<pre>scrollBehavior (to, from, savedPosition) {
  return { x: 0, y: 0 }
}</pre>
</div>

&emsp;&emsp;对于所有路由导航，简单地让页面滚动到顶部。返回&nbsp;`savedPosition`，在按下 后退/前进 按钮时，就会像浏览器的原生表现那样：

<div>
<pre>scrollBehavior (to, from, savedPosition) {
  if (savedPosition) {
    return savedPosition
  } else {
    return { x: 0, y: 0 }
  }
}</pre>
</div>

&emsp;&emsp;下面是一个实例，点击导航进行切换时，滚动到页面顶部；通过前进、后退按钮进行切换时，保持坐标位置

<div>
<pre>const router = new VueRouter({
  mode:'history',
  routes ,
  scrollBehavior (to, from, savedPosition){
    if(savedPosition){
      return savedPosition;
    }else{
      return {x:0,y:0}
    }
  }
})</pre>
</div>

<iframe src="https://demo.xiaohuochai.site/vue/vue-router/v10.html" frameborder="0" width="320" height="120"></iframe>

&emsp;&emsp;还可以模拟『滚动到锚点』的行为：

<div>
<pre>scrollBehavior (to, from, savedPosition) {
  if (to.hash) {
    return {
      selector: to.hash
    }
  }
}</pre>
</div>

&emsp;&emsp;下面是一个实例

<div>
<pre>&lt;div id="app"&gt;
    &lt;router-view&gt;&lt;/router-view&gt;
    &lt;br&gt;
  &lt;p&gt;
    &lt;router-link to="/" exact&gt;index&lt;/router-link&gt;
    &lt;router-link :to="{name:'foo' ,hash:'#abc'}"&gt;Go to Foo&lt;/router-link&gt;
    &lt;router-link :to="{ name: 'bar' }"&gt;Go to Bar&lt;/router-link&gt;
  &lt;/p&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>const router = new VueRouter({
  mode:'history',
  routes ,
  scrollBehavior (to, from, savedPosition){
    if(to.hash){
      return {
        selector: to.hash
      }
    }
    if(savedPosition){
      return savedPosition;
    }else{
      return {x:0,y:0}
    }
  }
})</pre>
</div>

<iframe src="https://demo.xiaohuochai.site/vue/vue-router/v11.html" frameborder="0" width="320" height="120"></iframe>

&nbsp;

### 过渡动效

&emsp;&emsp;&lt;router-view&gt;&nbsp;是基本的动态组件，所以可以用&nbsp;&lt;transition&gt;&nbsp;组件给它添加一些过渡效果：

<div>
<pre>&lt;transition&gt;
  &lt;router-view&gt;&lt;/router-view&gt;
&lt;/transition&gt;</pre>
</div>

&emsp;&emsp;下面是一个实例

<div>
<pre>  .router-link-active{background:pink;}
  .v-enter,.v-leave-to{
    opacity:0;
  }
  .v-enter-active,.v-leave-active{
    transition:opacity .5s;
  }</pre>
</div>
<div>
<pre>&lt;div id="app"&gt;
  &lt;p&gt;
    &lt;router-link to="/" exact&gt;index&lt;/router-link&gt;
    &lt;router-link :to="{name:'foo'}"&gt;Go to Foo&lt;/router-link&gt;
    &lt;router-link :to="{ name: 'bar' }"&gt;Go to Bar&lt;/router-link&gt;
    &lt;transition&gt;
        &lt;router-view&gt;&lt;/router-view&gt;
    &lt;/transition&gt;
  &lt;/p&gt;
&lt;/div&gt;</pre>
</div>

<iframe src="https://demo.xiaohuochai.site/vue/vue-router/v16.html" frameborder="0" width="320" height="120"></iframe>

【单个路由过渡】

&emsp;&emsp;上面的用法会给所有路由设置一样的过渡效果，如果想让每个路由组件有各自的过渡效果，可以在各路由组件内使用&nbsp;&lt;transition&gt;&nbsp;并设置不同的 name

<div>
<pre>const Foo = {
  template: `
    &lt;transition name="slide"&gt;
      &lt;div class="foo"&gt;...&lt;/div&gt;
    &lt;/transition&gt;
  `
}
const Bar = {
  template: `
    &lt;transition name="fade"&gt;
      &lt;div class="bar"&gt;...&lt;/div&gt;
    &lt;/transition&gt;
  `
}</pre>
</div>

&nbsp;

### 路由元信息

&emsp;&emsp;定义路由的时候可以配置&nbsp;`meta`&nbsp;字段：

<div>
<pre>const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      children: [
        {
          path: 'bar',
          component: Bar,
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})</pre>
</div>

&emsp;&emsp;`routes`配置中的每个路由对象被称为**路由记录**。路由记录可以是嵌套的，因此，当一个路由匹配成功后，它可能匹配多个路由记录。例如，根据上面的路由配置，`/foo/bar`&nbsp;这个URL将会匹配父路由记录以及子路由记录

&emsp;&emsp;一个路由匹配到的所有路由记录会暴露为&nbsp;`$route`&nbsp;对象（还有在导航钩子中的 route 对象）的&nbsp;`$route.matched`&nbsp;数组。因此，需要遍历&nbsp;`$route.matched`&nbsp;来检查路由记录中的&nbsp;`meta`&nbsp;字段

&emsp;&emsp;下面例子展示在全局导航钩子中检查 meta 字段：

<div>
<pre>router.beforeEach((to, from, next) =&gt; {
  if (to.matched.some(record =&gt; record.meta.requiresAuth)) {
    if (!auth.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() 
  }
})</pre>
</div>

【基于路由的动态过渡】

&emsp;&emsp;可以基于当前路由与目标路由的变化关系，动态设置过渡效果。通过使用路由元信息，在每个路由对象上设置一个index属性保存其索引值

<div>
<pre>  &lt;style&gt;
  .router-link-active{background:pink;}
  .left-enter{
    transform:translateX(100%);
  }
  .left-leave-to{
    transform:translateX(-100%);
  }
  .left-enter-active,.left-leave-active{
    transition:transform .5s;
  }
  .right-enter{
    transform:translateX(-100%);
  }
  .right-leave-to{
    transform:translateX(100%);
  }
  .right-enter-active,.right-leave-active{
    transition:transform .5s;
  }  
  &lt;/style&gt;</pre>
</div>
<div>
<pre>&lt;div id="app"&gt;
  &lt;p&gt;
    &lt;router-link to="/" exact&gt;index&lt;/router-link&gt;
    &lt;router-link :to="{name:'foo'}"&gt;Go to Foo&lt;/router-link&gt;
    &lt;router-link :to="{ name: 'bar' }"&gt;Go to Bar&lt;/router-link&gt;
    &lt;transition :name="transitionName"&gt;
        &lt;router-view&gt;&lt;/router-view&gt;
    &lt;/transition&gt;
  &lt;/p&gt;
&lt;/div&gt;</pre>
</div>
<div>
<pre>const app = new Vue({
  el:'#app',
  router,
  data () {
    return {
      'transitionName': 'left'
    }
  },
  watch: {
    '$route' (to, from) {
      this['transitionName'] = to.meta.index &gt; from.meta.index ? 'right' : 'left';
    }
  },  
})</pre>
</div>

<iframe src="https://demo.xiaohuochai.site/vue/vue-router/v17.html" frameborder="0" width="320" height="120"></iframe>

&nbsp;

### 编程式导航

&emsp;&emsp;除了使用&lt;router-link&gt;创建a标签来定义导航链接，还可以借助router的实例方法，通过编写代码来实现

【router.push(location)】

&emsp;&emsp;想要导航到不同的 URL，则使用 `router.push` 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。

&emsp;&emsp;当点击 &lt;router-link&gt; 时，这个方法会在内部调用，所以说，点击 &lt;router-link :to="..."&gt; 等同于调用 `router.push(...)`

<div>
<pre>声明式       编程式
&lt;router-link :to="..."&gt;     router.push(...)</pre>
</div>

&emsp;&emsp;该方法的参数可以是一个字符串路径，或者一个描述地址的对象。例如：

<div>
<pre>// 字符串
router.push('home')
// 对象
router.push({ path: 'home' })
// 命名的路由
router.push({ name: 'user', params: { userId: 123 }})
// 带查询参数，变成 /register?plan=private
router.push({ path: 'register', query: { plan: 'private' }})</pre>
</div>

【`router.replace(location)`】

&emsp;&emsp;跟 `router.push` 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 &mdash;&mdash; 替换掉当前的 history 记录

<div>
<pre>声明式                   编程式
&lt;router-link :to="..." replace&gt;     router.replace(...)        </pre>
</div>

【`router.go(n)`】

&emsp;&emsp;这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似 `window.history.go(n)`

<div>
<pre>// 在浏览器记录中前进一步，等同于 history.forward()
router.go(1)
// 后退一步记录，等同于 history.back()
router.go(-1)
// 前进 3 步记录
router.go(3)
// 如果 history 记录不够用，就静默失败
router.go(-100)
router.go(100)</pre>
</div>

【操作history】

&emsp;&emsp;router.push、router.replace和router.go跟history.pushState、history.replaceState和history.go类似， 实际上它们确实是效仿`window.history`API的。vue-router的导航方法(`push`、`replace`、`go`)在各类路由模式(`history`、 `hash`和`abstract`)下表现一致

&nbsp;

### 导航钩子

&emsp;&emsp;`vue-router` 提供的导航钩子主要用来拦截导航，让它完成跳转或取消。有多种方式可以在路由导航发生时执行钩子：全局的、单个路由独享的或者组件级的

【全局钩子】

&emsp;&emsp;可以使用 `router.beforeEach` 注册一个全局的 `before` 钩子

<div>
<pre>const router = new VueRouter({ ... })
router.beforeEach((to, from, next) =&gt; {
  // ...
})</pre>
</div>

&emsp;&emsp;当一个导航触发时，全局的 `before` 钩子按照创建顺序调用。钩子是异步解析执行，此时导航在所有钩子 resolve 完之前一直处于 **等待中**。

&emsp;&emsp;每个钩子方法接收三个参数：

<div>
<pre>to: Route: 即将要进入的目标路由对象
from: Route: 当前导航正要离开的路由
next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。</pre>
</div>

&emsp;&emsp;下面是next()函数传递不同参数的情况

<div>
<pre>next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。
next(false): 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 from 路由对应的地址。
next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。</pre>
</div>

&emsp;&emsp;注意：确保要调用 `next` 方法，否则钩子就不会被 resolved。

&emsp;&emsp;同样可以注册一个全局的 `after` 钩子，不过它不像 `before` 钩子那样，`after` 钩子没有 `next` 方法，不能改变导航：

<div>
<pre>router.afterEach(route =&gt; {
  // ...
})</pre>
</div>

&emsp;&emsp;下面是一个实例

<div>
<pre>const Home = { template: '&lt;div&gt;home&lt;/div&gt;' }
const Foo = { template: '&lt;div&gt;Foo&lt;/div&gt;'}
const Bar = { template: '&lt;div&gt;bar&lt;/div&gt;' }
const Login = { template: '&lt;div&gt;请登录&lt;/div&gt;' }
const routes = [
  { path: '/', name:'home', component: Home,meta:{index:0}},
  { path: '/foo', name:'foo', component:Foo,meta:{index:1,login:true}},
  { path: '/bar', name:'bar', component:Bar,meta:{index:2}},
  { path: '/login', name:'login', component:Login,},
]
const router = new VueRouter({
  routes ,
})
router.beforeEach((to, from, next) =&gt; {
  if(to.meta.login){
    next('/login');
  }
  next();
});
router.afterEach((to, from)=&gt;{
  document.title = to.name;
})
const app = new Vue({
  el:'#app',
  router,
})</pre>
</div>

<iframe src="https://demo.xiaohuochai.site/vue/vue-router/v18.html" frameborder="0" width="320" height="120"></iframe>

【单个路由独享】

&emsp;&emsp;可以在路由配置上直接定义 `beforeEnter` 钩子

<div>
<pre>const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      beforeEnter: (to, from, next) =&gt; {
        // ...
      }
    }
  ]
})</pre>
</div>

&emsp;&emsp;这些钩子与全局 `before` 钩子的方法参数是一样的

【组件内钩子】

&emsp;&emsp;可以在路由组件内直接定义以下路由导航钩子

<div>
<pre>beforeRouteEnter
beforeRouteUpdate (2.2 新增)
beforeRouteLeave </pre>
</div>
<div>
<pre>const Foo = {
  template: `...`,
  beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用，不能获取组件实例 `this`，因为当钩子执行前，组件实例还没被创建
  },
  beforeRouteUpdate (to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用。举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转时，由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。可以访问组件实例 `this`
  },
  beforeRouteLeave (to, from, next) {
    // 导航离开该组件的对应路由时调用，可以访问组件实例 `this`
  }
}</pre>
</div>

&emsp;&emsp;`beforeRouteEnter`钩子**不能**访问`this`，因为钩子在导航确认前被调用，因此即将登场的新组件还没被创建

&emsp;&emsp;不过，可以通过传一个回调给 `next`来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数

<div>
<pre>beforeRouteEnter (to, from, next) {
  next(vm =&gt; {
    // 通过 `vm` 访问组件实例
  })
}</pre>
</div>

&emsp;&emsp;可以在 `beforeRouteLeave` 中直接访问 `this`。这个 `leave` 钩子通常用来禁止用户在还未保存修改前突然离开。可以通过 `next(false)` 来取消导航

&nbsp;

### 数据获取

&emsp;&emsp;有时候，进入某个路由后，需要从服务器获取数据。例如，在渲染用户信息时，需要从服务器获取用户的数据。可以通过两种方式来实现：

&emsp;&emsp;1、**导航完成之后获取**：先完成导航，然后在接下来的组件生命周期钩子中获取数据。在数据获取期间显示『加载中』之类的指示

&emsp;&emsp;2、**导航完成之前获取**：导航完成前，在路由的 `enter` 钩子中获取数据，在数据获取成功后执行导航。

&emsp;&emsp;从技术角度讲，两种方式都不错 &mdash;&mdash; 就看想要的用户体验是哪种

【导航完成后获取】

&emsp;&emsp;当使用这种方式时，会马上导航和渲染组件，然后在组件的 `created` 钩子中获取数据。有机会在数据获取期间展示一个 loading 状态，还可以在不同视图间展示不同的 loading 状态。

&emsp;&emsp;假设有一个 `Post` 组件，需要基于 `$route.params.id` 获取文章数据：
<!-- {% raw %} -->
<div>
<pre>&lt;template&gt;
  &lt;div class="post"&gt;
    &lt;div class="loading" v-if="loading"&gt;
      Loading...
    &lt;/div&gt;
    &lt;div v-if="error" class="error"&gt;
      {{ error }}
    &lt;/div&gt;
    &lt;div v-if="post" class="content"&gt;
      &lt;h2&gt;{{ post.title }}&lt;/h2&gt;
      &lt;p&gt;{{ post.body }}&lt;/p&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;
export default {
  data () {
    return {
      loading: false,
      post: null,
      error: null
    }
  },
  created () {
    // 组件创建完后获取数据，
    // 此时 data 已经被 observed 了
    this.fetchData()
  },
  watch: {
    // 如果路由有变化，会再次执行该方法
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.error = this.post = null
      this.loading = true
      // replace getPost with your data fetching util / API wrapper
      getPost(this.$route.params.id, (err, post) =&gt; {
        this.loading = false
        if (err) {
          this.error = err.toString()
        } else {
          this.post = post
        }
      })
    }
  }
}</pre>
</div>
<!-- {% endraw %} -->
【导航完成前获取数据】

&emsp;&emsp;通过这种方式，在导航转入新的路由前获取数据。可以在接下来的组件的 `beforeRouteEnter` 钩子中获取数据，当数据获取成功后只调用 `next` 方法

<div>
<pre>export default {
  data () {
    return {
      post: null,
      error: null
    }
  },
  beforeRouteEnter (to, from, next) {
    getPost(to.params.id, (err, post) =&gt; {
      if (err) {
        // display some global error message
        next(false)
      } else {
        next(vm =&gt; {
          vm.post = post
        })
      }
    })
  },
  // 路由改变前，组件就已经渲染完了
  // 逻辑稍稍不同
  watch: {
    $route () {
      this.post = null
      getPost(this.$route.params.id, (err, post) =&gt; {
        if (err) {
          this.error = err.toString()
        } else {
          this.post = post
        }
      })
    }
  }
}</pre>
</div>

&emsp;&emsp;在为后面的视图获取数据时，用户会停留在当前的界面，因此建议在数据获取期间，显示一些进度条或者别的指示。如果数据获取失败，同样有必要展示一些全局的错误提醒

&nbsp;

### 懒加载

&emsp;&emsp;当打包构建应用时，JS包会变得非常大，影响页面加载。如果能把不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，这样就更加高效了

&emsp;&emsp;结合 Vue 的 异步组件 和 Webpack 的代码分割功能，轻松实现路由组件的懒加载。

&emsp;&emsp;首先，可以将异步组件定义为返回一个 Promise 的工厂函数(该函数返回的Promise应该 resolve 组件本身)

<div>
<pre>const Foo = () =&gt; Promise.resolve({ /*  组件定义对象 */ })</pre>
</div>

&emsp;&emsp;在 webpack 2中，使用动态 import语法来定义代码分块点(split point):

<div>
<pre>import('./Foo.vue') // returns a Promise</pre>
</div>

&emsp;&emsp;注意：如果使用的是 babel，需要添加[syntax-dynamic-import](http://babeljs.io/docs/plugins/syntax-dynamic-import/)插件，才能使 babel 可以正确地解析语法

&emsp;&emsp;结合这两者，这就是如何定义一个能够被 webpack自动代码分割的异步组件

<div>
<pre>const Foo = () =&gt; import('./Foo.vue')</pre>
</div>

&emsp;&emsp;在路由配置中什么都不需要改变，只需要像往常一样使用 `Foo`:

<div>
<pre>const router = new VueRouter({
  routes: [
    { path: '/foo', component: Foo }
  ]
})</pre>
</div>

【把组件按组分块】

&emsp;&emsp;有时候想把某个路由下的所有组件都打包在同个异步块(chunk)中。只需要使用 [命名 chunk](https://webpack.js.org/guides/code-splitting-require/#chunkname)，一个特殊的注释语法来提供chunk name(需要webpack &gt; 2.4)

<div>
<pre>const Foo = () =&gt; import(/* webpackChunkName: "group-foo" */ './Foo.vue')
const Bar = () =&gt; import(/* webpackChunkName: "group-foo" */ './Bar.vue')
const Baz = () =&gt; import(/* webpackChunkName: "group-foo" */ './Baz.vue')</pre>
</div>

&emsp;&emsp;webpack 会将任何一个异步模块与相同的块名称组合到相同的异步块中

