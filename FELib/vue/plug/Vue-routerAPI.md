# Vue-router的API

&emsp;&emsp;本文将详细介绍Vue-router的API

&nbsp;

### router-link

&emsp;&emsp;&lt;router-link&gt; 组件支持用户在具有路由功能的应用中点击导航。 通过 `to` 属性指定目标地址，默认渲染成带有正确链接的 &lt;a&gt; 标签，可以通过配置 `tag` 属性生成别的标签。另外，当目标路由成功激活时，链接元素自动设置一个表示激活的 CSS 类名

&emsp;&emsp;&lt;router-link&gt; 比起写死的 &lt;a href="..."&gt; 会好一些。无论是 HTML5 history 模式还是 hash 模式，它的表现行为一致，所以，当切换路由模式，或者在 IE9 降级使用 hash 模式，无须作任何变动；在 HTML5 history 模式下，`router-link` 会拦截点击事件，让浏览器不再重新加载页面；在 HTML5 history 模式下使用 `base` 选项之后，所有的 `to` 属性都不需要写基路径了

【props】

**to(required)**

<div>
<pre>类型 string | Location
</pre>
</div>

&emsp;&emsp;表示目标路由的链接。当被点击后，内部会立刻把 `to` 的值传到 `router.push()`，所以这个值可以是一个字符串或者是描述目标位置的对象

<div>
<pre>  &lt;!-- 字符串 --&gt;
  &lt;router-link to="home"&gt;Home&lt;/router-link&gt;
  &lt;!-- 渲染结果 --&gt;
  &lt;a href="home"&gt;Home&lt;/a&gt;
  &lt;!-- 使用 v-bind 的 JS 表达式 --&gt;
  &lt;router-link v-bind:to="'home'"&gt;Home&lt;/router-link&gt;
  &lt;!-- 不写 v-bind 也可以，就像绑定别的属性一样 --&gt;
  &lt;router-link :to="'home'"&gt;Home&lt;/router-link&gt;
  &lt;!-- 同上 --&gt;
  &lt;router-link :to="{ path: 'home' }"&gt;Home&lt;/router-link&gt;
  &lt;!-- 命名的路由 --&gt;
  &lt;router-link :to="{ name: 'user', params: { userId: 123 }}"&gt;User&lt;/router-link&gt;
  &lt;!-- 带查询参数，下面的结果为 /register?plan=private --&gt;
  &lt;router-link :to="{ path: 'register', query: { plan: 'private' }}"&gt;Register&lt;/router-link&gt;</pre>
</div>

**replace**

<div>
<pre>类型: boolean
默认值: false</pre>
</div>

&emsp;&emsp;设置&nbsp;`replace`&nbsp;属性的话，当点击时，会调用&nbsp;`router.replace()`&nbsp;而不是&nbsp;`router.push()`，于是导航后不会留下 history 记录

<div>
<pre>&lt;router-link :to="{ path: '/abc'}" replace&gt;&lt;/router-link&gt;</pre>
</div>

**append**

<div>
<pre>类型: boolean
默认值: false</pre>
</div>

&emsp;&emsp;设置 `append` 属性后，则在当前（相对）路径前添加基路径。例如，从 `/a` 导航到一个相对路径 `b`，如果没有配置 `append`，则路径为 `/b`，如果配了，则为 `/a/b`

<div>
<pre>&lt;router-link :to="{ path: 'relative/path'}" append&gt;&lt;/router-link&gt;</pre>
</div>

**tag**

<div>
<pre>类型: string
默认值: "a"</pre>
</div>

&emsp;&emsp;有时想要 &lt;router-link&gt; 渲染成某种标签，例如 &lt;li&gt;。 于是使用 `tag` prop 类指定何种标签，同样它还是会监听点击，触发导航

<div>
<pre>  &lt;router-link to="/foo" tag="li"&gt;foo&lt;/router-link&gt;
  &lt;!-- 渲染结果 --&gt;
  &lt;li&gt;foo&lt;/li&gt;</pre>
</div>

**active-class**

<div>
<pre>类型: string
默认值: "router-link-active"</pre>
</div>

&emsp;&emsp;设置链接激活时使用的 CSS 类名。默认值可以通过路由的构造选项 `linkActiveClass` 来全局配置

**exact**

<div>
<pre>类型: boolean
默认值: false</pre>
</div>

&emsp;&emsp;是否激活默认类名的依据是 **inclusive match** （全包含匹配）。 举个例子，如果当前的路径是 `/a` 开头的，那么 &lt;router-link to="/a"&gt; 也会被设置 CSS 类名

&emsp;&emsp;按照这个规则，&lt;router-link to="/"&gt; 将会点亮各个路由。想要链接使用 "exact 匹配模式"，则使用 `exact` 属性

<div>
<pre>  &lt;!-- 这个链接只会在地址为 / 的时候被激活 --&gt;
  &lt;router-link to="/" exact&gt;</pre>
</div>

**events**

<div>
<pre>类型: string | Array&lt;string&gt;
默认值: 'click'</pre>
</div>

&emsp;&emsp;声明可以用来触发导航的事件。可以是一个字符串或是一个包含字符串的数组

【将"激活时的CSS类名"应用在外层元素】

&emsp;&emsp;有时候要让 "激活时的CSS类名" 应用在外层元素，而不是 &lt;a&gt; 标签本身，那么可以用 &lt;router-link&gt; 渲染外层元素，包裹着内层的原生 &lt;a&gt; 标签：

<div>
<pre>&lt;router-link tag="li" to="/foo"&gt;
  &lt;a&gt;/foo&lt;/a&gt;
&lt;/router-link&gt;</pre>
</div>

&emsp;&emsp;在这种情况下，&lt;a&gt; 将作为真实的链接（它会获得正确的 `href` 的），而 "激活时的CSS类名" 则设置到外层的 &lt;li&gt;

&nbsp;

### router-view

&emsp;&emsp;&lt;router-view&gt; 组件是一个 functional 组件，渲染路径匹配到的视图组件。&lt;router-view&gt; 渲染的组件还可以内嵌自己的 &lt;router-view&gt;，根据嵌套路径，渲染嵌套组件

【属性】

name

<div>
<pre>类型: string
默认值: "default"</pre>
</div>

&emsp;&emsp;如果 &lt;router-view&gt;设置了名称，则会渲染对应的路由配置中 `components` 下的相应组件

【行为表现】

&emsp;&emsp;其他属性（非 router-view 使用的属性）都直接传给渲染的组件， 很多时候，每个路由的数据都是包含在路由参数中。

&emsp;&emsp;因为它也是个组件，所以可以配合 &lt;transition&gt; 和 &lt;keep-alive&gt; 使用。如果两个结合一起用，要确保在内层使用 &lt;keep-alive&gt;：

<div>
<pre>&lt;transition&gt;
  &lt;keep-alive&gt;
    &lt;router-view&gt;&lt;/router-view&gt;
  &lt;/keep-alive&gt;
&lt;/transition&gt;</pre>
</div>

&nbsp;

### 路由信息对象

&emsp;&emsp;一个&nbsp;route object（路由信息对象）&nbsp;表示当前激活的路由的状态信息，包含了当前 URL 解析得到的信息，还有 URL 匹配到的&nbsp;route&nbsp;records（路由记录）

&emsp;&emsp;route object 是 immutable（不可变） 的，每次成功的导航后都会产生一个新的对象。route object 出现在多个地方，包括如下

&emsp;&emsp;1、组件内的 `this.$route` 和 `$route` watcher 回调（监测变化处理）

&emsp;&emsp;2、`router.match(location)` 的返回值

&emsp;&emsp;3、导航钩子的参数

<div>
<pre>router.beforeEach((to, from, next) =&gt; {
  // to 和 from 都是 路由信息对象
})</pre>
</div>

&emsp;&emsp;`4、scrollBehavior` 方法的参数

<div>
<pre>const router = new VueRouter({
  scrollBehavior (to, from, savedPosition) {
    // to 和 from 都是 路由信息对象
  }
})</pre>
</div>

【属性】

**`$route.path`**

<div>
<pre>类型: string</pre>
</div>

&emsp;&emsp;字符串，对应当前路由的路径，总是解析为绝对路径，如 `"/foo/bar"`

**`$route.params`**

<div>
<pre>类型: Object</pre>
</div>

&emsp;&emsp;一个 key/value 对象，包含了 动态片段 和 全匹配片段，如果没有路由参数，就是一个空对象

**`$route.query`**

<div>
<pre>类型: Object</pre>
</div>

&emsp;&emsp;一个 key/value 对象，表示 URL 查询参数。例如，对于路径 `/foo?user=1`，则有 `$route.query.user = 1`，如果没有查询参数，则是个空对象

**`$rout.hash`**

<div>
<pre>类型: string</pre>
</div>

&emsp;&emsp;当前路由的 hash 值 (带 `#`) ，如果没有 hash 值，则为空字符串

**`$route.fullPath`**

<div>
<pre>类型: string</pre>
</div>

&emsp;&emsp;完成解析后的 URL，包含查询参数和 hash 的完整路径

**`$route.matched`**

<div>
<pre>类型: Array&lt;RouteRecord&gt;</pre>
</div>

&emsp;&emsp;一个数组，包含当前路由的所有嵌套路径片段的 **路由记录** 。路由记录就是 `routes` 配置数组中的对象副本（还有在 `children` 数组）

<div>
<pre>const router = new VueRouter({
  routes: [
    // 下面的对象就是 route record
    { path: '/foo', component: Foo,
      children: [
        // 这也是个 route record
        { path: 'bar', component: Bar }
      ]
    }
  ]
})</pre>
</div>

&emsp;&emsp;当 URL 为 `/foo/bar`，`$route.matched` 将会是一个包含从上到下的所有对象（副本）

**`$route.name`**

&emsp;&emsp;当前路由的名称，如果有的话

&nbsp;

### Router构造配置

【routes】

<div>
<pre>类型: Array&lt;RouteConfig&gt;</pre>
</div>

&emsp;&emsp;`RouteConfig`&nbsp;的类型定义：

<div>
<pre>declare type RouteConfig = {
  path: string;
  component?: Component;
  name?: string; // for named routes (命名路由)
  components?: { [name: string]: Component }; // for named views (命名视图组件)
  redirect?: string | Location | Function;
  alias?: string | Array&lt;string&gt;;
  children?: Array&lt;RouteConfig&gt;; // for nested routes (嵌套路由)
  beforeEnter?: (to: Route, from: Route, next: Function) =&gt; void;
  meta?: any;
}</pre>
</div>

【mode】

<div>
<pre>类型: string
默认值: "hash" (浏览器环境) | "abstract" (Node.js 环境)
可选值: "hash" | "history" | "abstract"</pre>
</div>

&emsp;&emsp;配置路由模式

&emsp;&emsp;1、`hash`: 使用 URL hash 值来作路由。支持所有浏览器，包括不支持 HTML5 History Api 的浏览器

&emsp;&emsp;2、`history`: 依赖 HTML5 History API 和服务器配置

&emsp;&emsp;3、`abstract`: 支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式

【base】

<div>
<pre>类型: string
默认值: "/"</pre>
</div>

&emsp;&emsp;应用的基路径。例如，如果整个单页应用服务在&nbsp;`/app/`&nbsp;下，然后&nbsp;`base`&nbsp;就应该设为&nbsp;`"/app/"`

【linkActiveClass】

<div>
<pre>类型: string
默认值: "router-link-active"</pre>
</div>

&emsp;&emsp;全局配置&nbsp;&lt;router-link&gt;&nbsp;的默认『激活 class 类名』

【scrollBehavior】

<div>
<pre>类型: Function</pre>
</div>

&emsp;&emsp;签名：

<div>
<pre>(
  to: Route,
  from: Route,
  savedPosition?: { x: number, y: number }
) =&gt; { x: number, y: number } | { selector: string } | ?{}</pre>
</div>

&nbsp;

### Router实例

【属性】

**router.app**

<div>
<pre>类型: Vue instance</pre>
</div>

&emsp;&emsp;配置了 `router` 的 Vue 根实例

**router.mode**

<div>
<pre>类型: string</pre>
</div>

&emsp;&emsp;路由使用的 模式

**router.currentRoute**

<div>
<pre>类型: Route</pre>
</div>

&emsp;&emsp;当前路由对应的路由信息对象

【方法】

<div>
<pre>router.beforeEach(guard)
router.beforeResolve(guard) (2.5.0+): 此时异步组件已经加载完成
router.afterEach(hook):增加全局的导航钩子
router.push(location, onComplete?, onAbort?)
router.replace(location, onComplete?, onAbort?)
router.go(n)
router.back()
router.forward():动态的导航到一个新 url</pre>
</div>
<div>
<pre>router.getMatchedComponents(location?)
返回目标位置或是当前路由匹配的组件数组（是数组的定义/构造类，不是实例）。通常在服务端渲染的数据预加载时</pre>
</div>
<div>
<pre>router.resolve(location, current?, append?)
解析目标位置（格式和 &lt;router-link&gt; 的 to prop 一样），返回包含如下属性的对象
{
&emsp;&emsp;location:Location;
&emsp;&emsp;route:Route;
&emsp;&emsp;href:string;
}</pre>
</div>
<div>
<pre>router.addRoutes(routes) 
动态添加更多的路由规则。参数必须是一个符合 routes 选项要求的数组</pre>
</div>
<div>
<pre>router.onReady(callback)
添加一个会在第一次路由跳转完成时被调用的回调函数。此方法通常用于等待异步的导航钩子完成，比如在进行服务端渲染的时候</pre>
</div>

&nbsp;

### 对组件注入

【注入的属性】

&emsp;&emsp;通过在 Vue 根实例的 `router` 配置传入 router 实例，下面这些属性成员会被注入到每个子组件

**$router**

&emsp;&emsp;router 实例

**$route**

&emsp;&emsp;当前激活的路由信息对象。这个属性是只读的，里面的属性是 immutable（不可变） 的，不过可以 watch（监测变化） 它

【允许的额外配置】

<div>
<pre>beforeRouteEnter
beforeRouteLeave</pre>
</div>

