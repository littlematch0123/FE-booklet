# react-router简明学习 

&emsp;&emsp;路由用来分发请求。后端是提供服务的，所以它的路由是在找controller，前端是显示页面的，所以它的路由是在找component。本文将详细介绍react-router-dom的内容

 

&nbsp;

### Router

&emsp;&emsp;Router是路由器组件的低阶接口，通常会使用如下某个高阶router来替代它

<BrowserRouter>
<HashRouter>
<MemoryRouter>
<NativeRouter>
<StaticRouter>
【BrowserRouter】

&emsp;&emsp;最常用的是BrowserRouter

```
import { BrowserRouter } from 'react-router-dom'

<BrowserRouter
  basename={optionalString}
  forceRefresh={optionalBool}
  getUserConfirmation={optionalFunc}
  keyLength={optionalNumber}
>
  <App/>
</BrowserRouter>
```
&emsp;&emsp;1、basename: 当前位置的基准 URL。如果页面部署在服务器的二级（子）目录，需要将 basename 设置到此子目录。 正确的 URL 格式是前面有一个前导斜杠，但不能有尾部斜杠
```
<BrowserRouter basename="/calendar"/>
```
&emsp;&emsp;2、getUserConfirmation：当导航需要确认时执行的函数。默认使用 window.confirm

```
// 使用默认的确认函数
const getConfirmation = (message, callback) => {
  const allowTransition = window.confirm(message)
  callback(allowTransition)
}

<BrowserRouter getUserConfirmation={getConfirmation}/>
```
&emsp;&emsp;3、forceRefresh：当设置为 true 时，在导航的过程中整个页面将会刷新。 只有当浏览器不支持 HTML5 的 history API 时，才设置为 true
```
const supportsHistory = 'pushState' in window.history
<BrowserRouter forceRefresh={!supportsHistory}/>
```
&emsp;&emsp;4、keyLength：location.key 的长度。默认是 6
```
<BrowserRouter keyLength={12}/>
```
&emsp;&emsp;5、BrowserRouter只能渲染单一子元素

 

&nbsp;

### Route

&emsp;&emsp;Route是react-router中最重要的组件，用来匹配请求并渲染相应组件

&emsp;&emsp;1、path 路径的匹配值，可以包括以下几种特殊符号
```
:paramName – 匹配一段位于 /、? 或 # 之后的 URL。 命中的部分将被作为一个参数
() – 在它内部的内容被认为是可选的
* – 匹配任意字符（非贪婪的）直到命中下一个字符或者整个 URL 的末尾，并创建一个 splat 参数
```
&emsp;&emsp;例子如下所示：
```
<Route path="/hello/:name">         // 匹配 /hello/michael 和 /hello/ryan
<Route path="/hello(/:name)">       // 匹配 /hello, /hello/michael 和 /hello/ryan
<Route path="/files/*.*">           // 匹配 /files/hello.jpg 和 /files/path/to/hello.jpg
```
&emsp;&emsp;注意：Route组件不能像普通组件一样，以属性的形式传递参数，但可以通过path属性来传递。但一定要区分router后面的:_id或:id
```
'/category/:_id'
```
&emsp;&emsp;2、component 要显示的组件

```
import { BrowserRouter as Router, Route } from 'react-router-dom'

<Router>
  <div>
    <Route exact path="/" component={Home}/>
    <Route path="/news" component={NewsFeed}/>
  </div>
</Router>
```
&emsp;&emsp;3、render 函数中return的值就是要显示的内容
```
<Route path="/home" render={() => <div>Home</div>}/>
```
&emsp;&emsp;4、children与render的区别在于，不管有没有匹配，都想显示的内容

```
const ListItemLink = ({ to, ...rest }) => (
  <Route path={to} children={({ match }) => (
    <li className={match ? 'active' : ''}>
      <Link to={to} {...rest}/>
    </li>
  )}/>
)
```
&emsp;&emsp;注意：component/render/children只能三个选一个使用

【匹配规则】

&emsp;&emsp;默认地，路由进行宽松匹配。在下面例子中，路由匹配到/one时，既显示组件A，也显示组件B
```
<Route  path="/one" component={A}/>
<Route  path="/one/two" component={B}/>
```
&emsp;&emsp;如果要进行确切匹配，则需要添加exact属性。这样，路由匹配到/one时，只显示组件A
```
<Route  exact path="/one" component={A}/>
<Route  path="/one/two" component={B}/>
```
&emsp;&emsp;还有一种是严格匹配，即斜杠也必须严格匹配。下面例子中，路由匹配到/one/时，会显示组件A，但匹配到/one时，什么都不会显示
```
<Route  strict path="/one/" component={A}/>
```
&emsp;&emsp;注意：严格匹配并不是确切匹配。下面例子中，路由匹配到/one时，即显示组件A，也显示组件B
```
<Route  strict path="/one" component={A}/>
<Route  path="/one/two" component={B}/>
```
&emsp;&emsp;如果要确切匹配，则需要
```
<Route  exact strict path="/one" component={A}/>
```
&emsp;&emsp;但是，一般地，strict属性很少使用

【属性】

&emsp;&emsp;Route默认携带三个props：包括match、location、history

&emsp;&emsp;如果使用component，则使用this.props来获取，如果是render，则在回调函数中使用参数(props)=>{}来获取

&emsp;&emsp;1、match

&emsp;&emsp;match包括以下属性
```
params 键值对
isExact 是否确切匹配
path 路径中设置的值
url URL中的path值
```
&emsp;&emsp;2、location

&emsp;&emsp;location中包含如下属性

&emsp;&emsp;注意：直接访问location，而不是访问history.location

```
{
  key: 'ac3df4', // not with HashHistory!
  pathname: '/somewhere'
  search: '?some=search-string',
  hash: '#howdy',
  state: {
    [userDefined]: true
  }
}
```
&emsp;&emsp;通过Link传递的state，可以在location中获取到

&emsp;&emsp;注意：刚开始时，或者直接刷新浏览器，state是没有值的，只有跳转到该链接时，state才有值。再后来，刷新也有值了

&emsp;&emsp;3、history

&emsp;&emsp;history包含如下属性
```
length: history栈的长度
action: 当前的action
location: 当前的location对象
```
&emsp;&emsp;history包含如下方法

```
push()
goBack() = go(-1)
goForward() = go(1)
go() 跳转到 history栈中的哪个enter
replace(path, [state]) 替换history栈中的当前entry
push(path, [state])  添加当前entry到history栈中
```
 

&nbsp;

### Redirect

&emsp;&emsp;Redirect将页面导航到新位置，新位置将覆盖history栈中的当前位置，类似于服务器端的重定向(HTTP 3xx)

&emsp;&emsp;to属性可以是一个字符串，表示跳转的地址

```
<Route exact path="/" render={() => (
  loggedIn ? (
    <Redirect to="/dashboard"/>
  ) : (
    <PublicHomePage/>
  )
)}/>
```
&emsp;&emsp;to属性也可以是一个对象
```
<Redirect to={{
  pathname: '/login',
  search: '?utm=your+face',
  state: { referrer: currentLocation }
}}/>
```
&emsp;&emsp;push属性为true时，表示添加新记录到history栈中，而不是替换当前记录
```
<Redirect push to="/somewhere/else"/>
```
 

&nbsp;

### Link

&emsp;&emsp;Link是对a标签的封装，提供无刷新的页面跳转。Link标签主要的属性是to属性

&emsp;&emsp;1、一般地，to是一个字符串
```
<Link to="/about">关于</Link>
```
&emsp;&emsp;2、也可以写成对象的形式

```
<Link to={{
  pathname: '/courses',
  search: '?sort=name',
  hash: '#the-hash',
  state: { fromDashboard: true }
}}/>
```
&emsp;&emsp;注意：在Link里的子组件或同组件的点击事件，最好加上阻止默认行为和阻止冒泡
```
<Link>
  <div onclick={}></div>
</Link>
<Link onclick={}>
```
【NavLink】

&emsp;&emsp;NavLink相对于Link来说，增加了一些样式属性

&emsp;&emsp;activeClassName表示被匹配的a标签的样式名；activeStyle表示被匹配的a标签的样式
```
<NavLink
  to="/faq"
  activeClassName="selected"
>FAQs</NavLink>
```
```
<NavLink
  to="/faq"
  activeStyle={{
    fontWeight: 'bold',
    color: 'red'
   }}
>FAQs</NavLink>
```
&emsp;&emsp;注意： link和history.push都不支持指向外网地址，如果要跳转到外网，则需要使用window对象下的location对象

&nbsp;

### Switch

&emsp;&emsp;渲染Route或Redirect匹配到的第一个子元素

```
<Switch>
  <Route exact path="/" component={Home}/>
  <Route path="/about" component={About}/>
  <Route path="/:user" component={User}/>
  <Route component={NoMatch}/>
</Switch>
```
&emsp;&emsp;注意：switch必须直接包括Route，中间不可包含div，否则不生效

 

&nbsp;

### 跳转

&emsp;&emsp;如果在实现逻辑跳转，可使用如下代码实现
```
// utils/history.js
import createBrowserHistory from 'history/createBrowserHistory'
const customHistory = createBrowserHistory()
export default customHistory
```
&emsp;&emsp;引用如下
```
import  history  from '@/utils/history'
// 跳转到首页
history.push('/')
```
&emsp;&emsp;要特别注意的是，如果使用utils/history.js，需要使用Router history={history}，而不是BrowserRouter

&emsp;&emsp;因为全局只能有一个history实例。 使用import { BrowserRouter as Router } 语句，会自动创建一个history实例的，相当于有两个实例，则会出现URL发生变化，刷新页面后，页面才跳转的情况

```
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import history from '@/utils/history'

<Router history={history}>
  <Switch>
    <Route path="/login" component={Login} />
    <Route path="/" render={props => {if (sessionStorage.getItem('token') && sessionStorage.getItem('user')) {return <Home {...props} />
        }
        return <Redirect to="/login" />
      }} />
  </Switch>
</Router>
```
【传参】

&emsp;&emsp;history.push方法也可以携带参数，方法如下
```
history.push({
  pathname: '/about',
  search: '?the=search',
  state: { some: 'state' }
})
```
 

 

&nbsp;

### 基础案例

```
import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

// 三个基础呈现组件

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

// 一个内嵌的组件

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

// 首页组件

const BasicExample = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/topics" component={Topics}/>
    </div>
  </Router>
)
export default BasicExample
```
 

&nbsp;

### exact

&emsp;&emsp;exact表示路由需要确切匹配，容易忽略的一点是，它与redux也有着非常密切的关系

&emsp;&emsp;下面的代码是常见的增删改查的路由设置

```
<Switch>
  <Route path="/post/add" component={AddPost} />  
  <Route exact path="/post/:id" component={ShowPost} />        
  <Route path="/post/:id/update" component={UpdatePost} />
  <Route path="/post/:id/delete" component={DeletePost} />
</Switch>
```
&emsp;&emsp;代码中，通向showPost的路由设置了exact。一般地，showPost通过fetch获取了post，并保存到store中的state.post中

&emsp;&emsp;如果此时点击到updatePost中，可以通过state.post来得到值。而如果在updatePost页面直接刷新的话，则state.post值为空

&emsp;&emsp;如果要确保页面刷新后仍然能够取得值，则需要通过route中的location传值

&emsp;&emsp;但是，这种方法有两个缺陷。一个是不访问showPost，而直接访问UpdatePost不会获得传递的值；另一个是直接在地址栏中更改URL也不会获取传递的值

&emsp;&emsp;2、去掉exact和switch，同时需要更改样式和路由。使得path="/post/:id/update"时，可以同时匹配ShowPost和UpdatePost，且UpdatePost的页面可以完全覆盖ShowPost的页面
```
<Route path="/posts/add" component={AddPost} />  
<Route path="/post/:id" component={ShowPost} />        
<Route path="/post/:id/update" component={UpdatePost} />
<Route path="/post/:id/delete" component={DeletePost} />
```
&emsp;&emsp;但是，由于这种方法对样式的定制化需求较高，都需要设置为定位元素，且根据覆盖关系来确定z-index。并且页面尺寸都需要保持一致。可扩展性不强