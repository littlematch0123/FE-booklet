# 深入理解Redux 

&emsp;&emsp;Redux是Flux思想的另一种实现方式。Flux是和React同时面世的。React用来替代jQuery，Flux用来替换Backbone.js等MVC框架。在MVC的世界里，React相当于V(view)的部分，只涉及页面的渲染。一旦涉及应用的数据管理部分，还是交给Model和Controller。不过，Flux并不是一个MVC框架，它用一种新的思路来管理数据。本文将详细介绍Redux的内容

 

&nbsp;

### MVC

&emsp;&emsp;MVC是业界广泛接受的一种前端应用框架类型，这种框架把应用分为三个部分：

&emsp;&emsp;Model(模型)负责管理数据，大部分业务逻辑应该放在Model中

&emsp;&emsp;View(视图)负责渲染用户页面，应该避免在View中涉及业务逻辑

&emsp;&emsp;Controller(控制器)负责接受用户输入，根据用户输入调用相应的Model部分逻辑，把产生的数据结果交给View部分，让View渲染出必要的输出

&emsp;&emsp;MVC框架提出的数据流很理想，用户请求先到达Controller，由Controller调用Model获得数据，然后把数据交给View。但是，在实际框架实现中，总是允许View和Model直接通信

&emsp;&emsp;然而，在MVC中让View和Model直接对话就是灾难

 

&nbsp;

### Flux

&emsp;&emsp;Facebook用Flux框架来替代原有的MVC框架，这种框架包含四个部分：

&emsp;&emsp;Dispatcher负责动作分发，维持Store之间的依赖关系

&emsp;&emsp;Store负责存储数据和处理数据相关逻辑

&emsp;&emsp;Action驱动Dispatcher的javascript对象

&emsp;&emsp;View视图负责显示用户界面

&emsp;&emsp;如果非要把Flux和MVC做一个对比。那么，Flux的Dispatcher相当于MVC的Controller，Flux的store相当于MVC的model，Flux的View对应于MVC的View，Action对应给MVC框架的用户请求

&emsp;&emsp;1、Dispatcher
```
import {Dispatcher} from 'flux';
export default new Dispatcher();
```
&emsp;&emsp;2、Action

&emsp;&emsp;定义Action通常需要两个文件，一个定义action的类型，一个定义action的构造函数。分成两个文件的原因是在Store中会根据action类型做不同操作，也就有单独导入action类型的需要
```
export const INCREMENT = 'increment';
export const DECREMENT = 'decrement';
```
```
import * as ActionTypes from './ActionTypes.js';
import AppDispatcher from './AppDispatcher.js';

export const increment = (counterCaption) => {
  AppDispatcher.dispatch({
    type: ActionTypes.INCREMENT,
    counterCaption: counterCaption
  });
};

export const decrement = (counterCaption) => {
  AppDispatcher.dispatch({
    type: ActionTypes.DECREMENT,
    counterCaption: counterCaption
  });
};
```
&emsp;&emsp;3、Store

&emsp;&emsp;一个Store也是一个对象，这个对象用来存储应用状态，同时还要接受Dispatcher派发的动作，根据动作来决定是否要更新应用状态

&emsp;&emsp;一个EventEmitter实例对象支持下列相关函数
```
emit函数：可以广播一个特定事件，第一个参数是字符串类型的事件名称
on函数：可以增加一个挂在这个EventEmitter对象特定事件上的处理函数，第一个参数是字符串类型的事件名称，第二个参数是处理函数
removeListener函数： 和on函数做的事情相反，删除挂在这个EventEmitter对象特定事件上的处理函数，和on函数一样，第一个参数是事件名称，第二个参数是处理函数
```
&emsp;&emsp;注意：如果要调用removeListener函数，就一定要保留对处理函数的引用

```
import AppDispatcher from '../AppDispatcher.js';
import * as ActionTypes from '../ActionTypes.js';
import {EventEmitter} from 'events';

const CHANGE_EVENT = 'changed';

const counterValues = {
  'First': 0,
  'Second': 10,
  'Third': 30
};


const CounterStore = Object.assign({}, EventEmitter.prototype, {
  getCounterValues: function() {
    return counterValues;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});

CounterStore.dispatchToken = AppDispatcher.register((action) => {
  if (action.type === ActionTypes.INCREMENT) {
    counterValues[action.counterCaption] ++;
    CounterStore.emitChange();
  } else if (action.type === ActionTypes.DECREMENT) {
    counterValues[action.counterCaption] --;
    CounterStore.emitChange();
  }
});

export default CounterStore;
```
&emsp;&emsp;4、View

&emsp;&emsp;存在于Flux框架中的React组件需要实现以下几个功能

&emsp;&emsp;（1）创建时读取Store上状态来初始化组件内部状态

&emsp;&emsp;（2）当Store上状态发生变化时，组件要立刻同步更新内部状态保持一致

&emsp;&emsp;（3）View如果要改变Store状态，必须而且只能派发action

```
// 父组件
class ControlPanel extends Component {
  render() {
    return (
      <div style={style}>
        <Counter caption="First" />
        <Counter caption="Second" />
        <Counter caption="Third" />
        <hr/>
        <Summary />
      </div>
    );
  }
}
export default ControlPanel;
```
```
// 子组件
class Counter extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onClickIncrementButton = this.onClickIncrementButton.bind(this);
    this.onClickDecrementButton = this.onClickDecrementButton.bind(this);
    this.state = {count: CounterStore.getCounterValues()[props.caption]}
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.caption !== this.props.caption) || (nextState.count !== this.state.count);
  }
  componentDidMount() {
    CounterStore.addChangeListener(this.onChange);
  }
  componentWillUnmount() {
    CounterStore.removeChangeListener(this.onChange);
  }
  onChange() {
    const newCount = CounterStore.getCounterValues()[this.props.caption];
    this.setState({count: newCount});
  }
  onClickIncrementButton() {
    Actions.increment(this.props.caption);
  }
  onClickDecrementButton() {
    Actions.decrement(this.props.caption);
  }
  render() {
    const {caption} = this.props;
    return (
      <div>
        <button style={buttonStyle} onClick={this.onClickIncrementButton}>+</button>
        <button style={buttonStyle} onClick={this.onClickDecrementButton}>-</button>
        <span>{caption} count: {this.state.count}</span>
      </div>
    );
  }
}
Counter.propTypes = {
  caption: PropTypes.string.isRequired
};
export default Counter;
```
【优势】

&emsp;&emsp;在Flux中，Store只有get方法，没有set方法，根本不可能直接去修改其内部状态，View只能通过get方法获取Store的状态，无法直接去修改状态，如果View想要修改Store的状态，只能派发一个action对象给Dispatcher

【不足】

&emsp;&emsp;1、Store之间依赖关系

&emsp;&emsp;在Flux的体系中，如果两个Store之间有逻辑依赖关系，就必须用上Dispatcher的waitFor函数

&emsp;&emsp;2、难以进行服务器端渲染

&emsp;&emsp;3、Store混杂了逻辑和状态

 

&nbsp;

### Redux

&emsp;&emsp;Redux的含义是Reducer+Flux。Reducer是一个计算机科学中的通用概念。以Javascript为例，数组类型有reduce函数，接受的参数是一个reducer，reducer做的事情就是把数组所有元素依次做规约，对每个元素都调用一次参数reducer，通过reducer函数完成规约所有元素的功能

&emsp;&emsp;Flux的基本原则是单向数据流，Redux在此基础上强调三个基本原则：

&emsp;&emsp;1、唯一数据源

&emsp;&emsp;2、保持状态只读

&emsp;&emsp;3、数据改变只通过纯函数完成
```
//actionTypes
export const INCREMENT = 'increment';
export const DECREMENT = 'decrement';
```
```
//actions
import * as ActionTypes from './ActionTypes.js';

export const increment = (counterCaption) => {
  return {
    type: ActionTypes.INCREMENT,
    counterCaption: counterCaption
  };
};

export const decrement = (counterCaption) => {
  return {
    type: ActionTypes.DECREMENT,
    counterCaption: counterCaption
  };
};
```
```
//store
import {createStore} from 'redux';
import reducer from './Reducer.js';

const initValues = {
  'First': 0,
  'Second': 10,
  'Third': 20
};

const store = createStore(reducer, initValues);

export default store;
```
```
//reducer
import * as ActionTypes from './ActionTypes.js';

export default (state, action) => {
  const {counterCaption} = action;

  switch (action.type) {
    case ActionTypes.INCREMENT:
      return {...state, [counterCaption]: state[counterCaption] + 1};
    case ActionTypes.DECREMENT:
      return {...state, [counterCaption]: state[counterCaption] - 1};
    default:
      return state
  }
}
```
```
// 父组件
class ControlPanel extends Component {
  render() {
    return (
      <div style={style}>
        <Counter caption="First" />
        <Counter caption="Second" />
        <Counter caption="Third" />
        <hr/>
        <Summary />
      </div>
    );
  }
}
```
```
// 子组件
class Counter extends Component {
  constructor(props) {
    super(props);
    this.onIncrement = this.onIncrement.bind(this);
    this.onDecrement = this.onDecrement.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getOwnState = this.getOwnState.bind(this);
    this.state = this.getOwnState();
  }
  getOwnState() {
    return {value: store.getState()[this.props.caption]};
  }
  onIncrement() {
    store.dispatch(Actions.increment(this.props.caption));
  }
  onDecrement() {
    store.dispatch(Actions.decrement(this.props.caption));
  }
  onChange() {
    this.setState(this.getOwnState());
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (nextProps.caption !== this.props.caption) ||
      (nextState.value !== this.state.value);
  }
  componentDidMount() {
    store.subscribe(this.onChange);
  }
  componentWillUnmount() {
    store.unsubscribe(this.onChange);
  }
  render() {
    const value = this.state.value;
    const {caption} = this.props;
    return (
      <div>
        <button style={buttonStyle} onClick={this.onIncrement}>+</button>
        <button style={buttonStyle} onClick={this.onDecrement}>-</button>
        <span>{caption} count: {value}</span>
      </div>
    );
  }
}
Counter.propTypes = {
  caption: PropTypes.string.isRequired
};
```
 

&nbsp;

### 容器和展示

&emsp;&emsp;一个React组件基本上要完成以下两个功能：

&emsp;&emsp;1、读取Store的状态，用于初始化组件的状态，同时还要监听Store的状态改变；当Store状态发生变化时，需要更新组件状态，从而驱动组件重新渲染；当需要更新Store状态时，就要派发action对象

&emsp;&emsp;2、根据当前props和state，渲染出用户界面

&emsp;&emsp;让一个组件只专注做一件事。于是，按照这两个功能拆分成两个组件。这两个组件是父子组件的关系。业界对于这样的拆分有多种叫法，承担第一个任务的组件，也就是负责和redux打交道的组件，处于外层，被称为容器组件；只专业负责渲染界面的组件，处于内层，叫做展示组件

&emsp;&emsp;展示组件，又称为傻瓜组件，就是一个纯函数，根据props产生结果。实际上，让展示组件无状态，只根据props来渲染结果，是拆分的主要目的之一。状态全部交给容器组件去处理

```
function Counter (props){
    const {caption, onIncrement, onDecrement, value} = this.props;
    return (
      <div>
        <button style={buttonStyle} onClick={onIncrement}>+</button>
        <button style={buttonStyle} onClick={onDecrement}>-</button>
        <span>{caption} count: {value}</span>
      </div>
    );
  }
}
```
&emsp;&emsp;或者，直接使用解构赋值的方法

```
function Counter ({caption, onIncrement, onDecrement, value} ){
    return (
      <div>
        <button style={buttonStyle} onClick={onIncrement}>+</button>
        <button style={buttonStyle} onClick={onDecrement}>-</button>
        <span>{caption} count: {value}</span>
      </div>
    );
  }
}
```
 

&nbsp;

### React-redux

&emsp;&emsp;react-redux遵循将组件分成展示组件和容器组件的规范。react-redux提供了两个功能：

&emsp;&emsp;1、Provider组件，可以让容器组件默认可以取得state，而不用当容器组件层级很深时，一级级将state传下去

```
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import ControlPanel from './views/ControlPanel';
import store from './Store.js';

import './index.css';

ReactDOM.render(
  <Provider store={store}>
    <ControlPanel/>
  </Provider>,
  document.getElementById('root')
);
```
&emsp;&emsp;2、connect方法，用于从展示组件生成容器组件。connect的意思就是将这两种组件连接起来

```
import React, { PropTypes } from 'react';
import * as Actions from '../Actions.js';
import {connect} from 'react-redux';

const buttonStyle = {
  margin: '10px'
};

function Counter({caption, onIncrement, onDecrement, value}) {
  return (
    <div>
      <button style={buttonStyle} onClick={onIncrement}>+</button>
      <button style={buttonStyle} onClick={onDecrement}>-</button>
      <span>{caption} count: {value}</span>
    </div>
  );
}

Counter.propTypes = {
  caption: PropTypes.string.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDecrement: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    value: state[ownProps.caption]
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onIncrement: () => {
      dispatch(Actions.increment(ownProps.caption));
    },
    onDecrement: () => {
      dispatch(Actions.decrement(ownProps.caption));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
```
&emsp;&emsp;关于mapDispatchToProps函数的简化过程如下

&emsp;&emsp;初始代码如下

```
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
    fetchCategories: () => dispatch(fetchCategories()),
    fetchPosts: () => dispatch(fetchPosts())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
```
&emsp;&emsp;再次简化如下

```
const mapDispatchToProps = {
  fetchUsers: () => fetchUsers(),
  fetchCategories: () => fetchCategories(),
  fetchPosts: () => fetchPosts()
}
export default connect(mapStateToProps, mapDispatchToProps)(Home)
```
&emsp;&emsp;最终优化如下
```
export default connect(mapStateToProps, { fetchUsers, fetchCategories, fetchPosts })(Home)
```
 

&nbsp;

### 模块化应用

&emsp;&emsp;从架构出发，开始一个新应用时，有几件事情是一定要考虑清楚的：

&emsp;&emsp;1、代码文件的组织结构

&emsp;&emsp;2、确定模块的边界

&emsp;&emsp;3、Store的状态树设计

【代码文件的组织结构】

&emsp;&emsp;Redux应用适合于按功能组织，也就是把完成同一应用功能的代码放在一个目录下，一个应用功能包含多个角色的代码。在Redux中，不同的角色就是reducer、actions和视图。而应用功能对应的就是用户界面上的交互模块

&emsp;&emsp;以Todo应用为例，这个应用的两个基本功能就是TodoList和Filter，所以代码可以这样组织：

```
todoList/
    actions.js
    actionTypes.js
    index.js
    reduce.js
    views/
        component.js
        container.js
filter/
    actions.js
    actionTypes.js
    index.js
    reduce.js
    views/
        component.js
        container.js
```
【模块接口】

&emsp;&emsp;不同功能模块之间的依赖关系应该简单而清晰，也就是所谓的保持模块之间低耦合性；一个模块应该把自己的功能封装得很好，让外界不要太依赖于自己内部的结构，这样不会因为内部的变化而影响外部模块的功能，这就是所谓的高内聚性

【状态树的设计】

&emsp;&emsp;状态树的设计需要遵循如下几个原则：

&emsp;&emsp;1、一个模块控制一个状态节点

&emsp;&emsp;2、避免冗余数据

&emsp;&emsp;3、树形结构扁平

&emsp;&emsp;对于Todo应用的状态树设计如下

```
{
  todos: [
    {
      text: 'first todo',
      completed: false,
      id: 0
    },
    {
      text: 'second todo',
      completed: true,
      id: 1
    },    
  ],
  // 'all'、'completed'、'uncompleted'
  filter: 'all'
}
```
 

&nbsp;

### reselect

&emsp;&emsp;reselect库的原理是只要相关状态没有改变，那就直接使用上一次的缓存结果。reselect用来创造选择器，接收一个state作为参数的函数，返回的数据是某个mapStateToProps需要的结果

&emsp;&emsp;首先，安装reselect库
```
npm install --save reselect
```
&emsp;&emsp;reselect提供了创造选择器的createSelector函数，这是一个高阶函数，也就是接受函数为参数来产生一个新函数的函数

&emsp;&emsp;createSelector 接收一个 input-selectors 数组和一个转换函数作为参数。如果 state tree 的改变会引起 input-selector 值变化，那么 selector 会调用转换函数，传入 input-selectors 作为参数，并返回结果。如果 input-selectors 的值和前一次的一样，它将会直接返回前一次计算的数据，而不会再调用一次转换函数。

```
import { createSelector } from 'reselect'

const getVisibilityFilter = (state) => state.visibilityFilter
const getTodos = (state) => state.todos

export const getVisibleTodos = createSelector(
  [ getVisibilityFilter, getTodos ],
  (visibilityFilter, todos) => {
    switch (visibilityFilter) {
      case 'SHOW_ALL':
        return todos
      case 'SHOW_COMPLETED':
        return todos.filter(t => t.completed)
      case 'SHOW_ACTIVE':
        return todos.filter(t => !t.completed)
    }
  }
)
```
&emsp;&emsp;在上例中，getVisibilityFilter 和 getTodos 是 input-selector。因为他们并不转换数据，所以被创建成普通的非记忆的 selector 函数。但是，getVisibleTodos 是一个可记忆的 selector。他接收 getVisibilityFilter 和 getTodos 为 input-selector，还有一个转换函数来计算过滤的 todos 列表

&emsp;&emsp;reselect的典型应用如下所示

```
// selector
export const getCategories = state => {
  return state.category
}
export const getCategoriesSortByNumber = createSelector(getCategories, categories =>
  categories.sort((v1, v2) => {
    return v1.number - v2.number
  })
)
export const getCategoryDatas = createSelector(getCategoriesSortByNumber, categoriesSortByNumber => 
  categoriesSortByNumber.map(t => {
    return $_setChildren(categoriesSortByNumber, t)
  }).map(t => {
    return Object.assign(t, {
      index: $_getIndex(t.number),
      des: t.children.length ? t.children.length : '',
      title: t.name,
      key: t.number,
      className: 'styled-categorylist',
      url: t.children.length ? `/category/${t.number}` : '',
      parentUrl: `/category/${$_getParentNumber(t)}`,
      nextChildNumber: $_getFirstChildNumber(t)
    })
  })  
)
export const getCategoryDatasByNumber = createSelector(getCategoryDatas, categoryDatas =>
  categoryDatas.reduce((obj, t) => {
    obj[t.number] = t
    return obj
  }, {})
)
export const getCategoryRootDatas = createSelector(getCategoryDatas, categoryDatas =>
  categoryDatas.filter(t => {
    return Number(String(t.number).slice(2)) === 0
  })
)
export const getCategoryDatasById = createSelector(getCategoryDatas, categoryDatas =>
  categoryDatas.reduce((obj, t) => {
    obj[t._id] = t
    return obj
  }, {})
)
```
 

&nbsp;

### 常见错误

&emsp;&emsp;在使用redux的过程中，会出现如下的常见错误

【错误：reducers不能触发actions】
```
Uncaught Error: Reducers may not dispatch actions.
```
&emsp;&emsp;一般来说，出现"Reducedrs may not dispatch actions"的错误，是因为reducer中出现路由跳转语句，而跳转到的语句正好发送了dispatch。从而，reducer不再是纯函数

&emsp;&emsp;错误代码如下所示：

```
export const logIn = admin => ({type: LOGIN, admin})

// reducer
const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      let { token, user } = action.admin
      // 将用户信息保存到sessionStorage中
      sessionStorage.setItem('token', token)
      sessionStorage.setItem('user', JSON.stringify(user))
      // 跳转到首页
      history.push('/')
      return { token, user }
...
```
&emsp;&emsp;有两种解决办法

&emsp;&emsp;1、给路由跳转语句设置延迟定时器，从而避免在当前reducer还没有返回值的情况下，又发送新的dispatch

```
export const logIn = admin => ({type: LOGIN, admin})

// reducer
const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      let { token, user } = action.admin
      // 将用户信息保存到sessionStorage中
      sessionStorage.setItem('token', token)
      sessionStorage.setItem('user', JSON.stringify(user))
      // 跳转到首页
      setTimeout(() => {
        history.push('/')
      },0)
      return { token, user }
...
```
&emsp;&emsp;2、将reducer中的逻辑放到dispatch中

```
export const logIn = (admin) => {
  let { token, user } = admin
  // 将用户信息保存到sessionStorage中
  sessionStorage.setItem('token', token)
  sessionStorage.setItem('user', JSON.stringify(user)) 
  // 跳转到首页
  history.push('/')
  return {type: LOGIN, admin}
}

// reducer
const login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      let { token, user } = action.admin
      return { token, user }
...
```
【action函数中无法执行return后的语句】

&emsp;&emsp;例如，在下面代码中，控制台只能输入'111'，而不能输出'222'

```
export const updatePost = payload => {
  console.log('111')
  return dispatch => {
    console.log('222')
    fetchModule({
      dispatch,
      url: `${BASE_POST_URL}/${payload._id}`,
      method: 'put',
      data: payload,
      headers: { Authorization: sessionStorage.getItem('token') },
      success(result) {
        console.log(result)
        dispatch({ type: UPDATE_POST, doc: result.doc })
      }
    })
  }
}
```
&emsp;&emsp;出现这个问题的原因非常简单，是因为没有使用this.props.updatePost，而直接使用了updatePost方法导致的

&emsp;&emsp;加入如下语句既可解决
```
let { updatePost } = this.props
```
【redux中的state发生变化，但页面没有重新渲染】

&emsp;&emsp;一般地，是因为展开运算符使用不当所至

&emsp;&emsp;对于对象的展开运算符，需要把...state放到第一个条目位置，因为后面的条目会覆盖展开的部分
```
return {...item, completed: !item.completed}
```
【reducer中不能使用undefined】

&emsp;&emsp;1、reducer中state不能返回undefined，可以用null代替

```
// reducer
const filter = (state = null, action) => {
  switch (action.type) {
    case SHOW_FILTER:
      return action.filter
    default:
      return state
  }
}
```
&emsp;&emsp;2、同样地，action.filter表示空值，不能为undefined，用null代替
```
export const setFilter = filter => ({type: SHOW_FILTER, filter})
this.props.setFilter(null)
```