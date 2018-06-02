# React简明学习 

&emsp;&emsp;React让组件化成为了前端开发的基本思路，比传统思路可以更好的控制前端复杂度，旧的开发方法受到了影响，如分离式的HTML/CSS、非侵入式JS、模板语言、MVC、CSS文件、Bootstrap等。在React中，组件把数据翻译成UI，数据通过组件props属性传入，组件自身状态通过state状态值来控制。 每个组件都是一个状态机，也就是声明式编程。数据有变化，组件自动刷新。本文将详细介绍React基本概念

 

&nbsp;

### JSX

&emsp;&emsp;JSX是Javascript的语法扩展(extension)，可以让我们在Javascript中可以编写像HTML一样的代码。

&emsp;&emsp;JSX用来声明 React 当中的元素，JSX 中使用 JavaScript 表达式，JSX中的表达式要包含在大括号里

【模板字符串】

&emsp;&emsp;可以在JSX中使用模板字符串
```
{`Joined in ${time}`}
```
【属性】

&emsp;&emsp;可以使用引号来定义以字符串为值的属性：
```
const element = <div tabIndex="0"></div>;
```
&emsp;&emsp;也可以使用大括号来定义以 JavaScript 表达式为值的属性：
```
const element = <img src={user.avatarUrl} />;
```
&emsp;&emsp;下面这两个 JSX 表达式是等价的
```
<MyComponent message="hello world" />
<MyComponent message={'hello world'} />
```
【默认为true】

&emsp;&emsp;如果没有给属性传值，它默认为 true
```
<MyTextBox autocomplete />
<MyTextBox autocomplete={true} />
```
【扩展属性】

&emsp;&emsp;如果已经有了个 props 对象，并且想在 JSX 中传递它，可以使用 ... 作为扩展操作符来传递整个属性对象。下面两个组件是等效的：

```
function App1() {
  return <Greeting firstName="Ben" lastName="Hector" />;
}

function App2() {
  const props = {firstName: 'Ben', lastName: 'Hector'};
  return <Greeting {...props} />;
}
```
【return】

&emsp;&emsp;return一定要紧挨着左括号，否则不生效

【JSX是进步还是倒退】

&emsp;&emsp;长期以来，一直不倡导在HTML中使用onclick，为什么在JSX中却要使用onClick这样的方式来添加事件处理函数呢？

&emsp;&emsp;在React出现之初，很多人对React这样的设计非常反感，因为React把类似HTML的标记语言和Javascript混在一起了。但是，随着时间的推移，业界逐渐认可了这种方式，因为大家发现，以前用HTML来代表内容，用CSS代表样式，用Javascript来定义交互行为，这三种语言分在三种不同的文件里面，实际上是把不同技术分开管理了，而不是逻辑上的“分而治之”

&emsp;&emsp;根据做同一件事的代码应该有高耦合性的设计原则，为什么不把实现这个功能的所有代码集中在一个文件里呢？

&emsp;&emsp;在JSX中使用onClick来添加事件处理函数，是否代表网页应用开发兜了一个大圈，最终回到了起点呢？

&emsp;&emsp;不是的，在HTML中直接使用onclick很不专业，因为onclick添加的事件处理函数是在全局环境下执行的，这污染了全局环境，很容易产生意料不到的后果；给很多DOM元素添加onclick事件，可能会影响网页的性能；对于使用onclick的DOM元素，如果在DOM元素删除后忘了注销事件处理函数，可能会造成内存泄漏

&emsp;&emsp;上面说的这些问题在JSX中都不存在

&emsp;&emsp;onClick挂载的每个函数，都可以控制在组件范围内，不会污染全局空间；在JSX中使用了onClick，但并没有产生直接使用onclick的HTML，而是使用事件委托的方式处理，无论多少个onclick出现，最后都只在DOM树上添加了一个事件处理函数，挂在最顶层的DOM节点上；因为React控制了组件的生命周期，在unmount时自然能够清除相关的所有事件处理函数，内存泄漏也不再是一个问题

 

&nbsp;

### 样式设置

【行内样式】

&emsp;&emsp;当属性的类型不是字符串类型时，在JSX中必须用花括号{}把prop值包住。所以style的值有两层花括号

&emsp;&emsp;行内样式使用如下写法
```
{{color:'red',backgroundColor:'blue'}}
```
【图片】

&emsp;&emsp;图片的相对引用使用如下写法
```
<img src={require('./common/img/128H.jpg')} alt="" />
```
【CSS引入】
```
require('./common/style/main.css')
```
&emsp;&emsp;或者
```
import '@/assets/global.css'
```
【class设置】
```
<div className="test"></div>
```
【自定义属性】
```
<div data-abc="123"></div>
```
 

&nbsp;

### 组件

&emsp;&emsp;作为软件设计的通用原则，组件的划分要满足高内聚和低耦合。高内聚是指把逻辑紧密相关的内容放在一个组件中。低耦合是指不同组件之间的依赖关系要尽量弱化，也就是每个组件要尽量独立

&emsp;&emsp;组件从概念上看就像是函数，它可以接收任意的输入值（称之为“props”），并返回一个需要在页面上展示的React元素

&emsp;&emsp;注意：组件可以嵌套自身

【函数组件】

&emsp;&emsp;定义一个组件最简单的方式是使用JavaScript函数
```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```
【类组件】
```
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
 

&nbsp;

### prop

&emsp;&emsp;当React遇到的元素是用户自定义的组件，它会将JSX属性作为单个对象传递给该组件，这个对象称之为“props”

```
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name="Sara" />;
ReactDOM.render(
  element,
  document.getElementById('root')
);
```
【只读性】

&emsp;&emsp;无论是使用函数或是类来声明一个组件，它决不能修改它自己的props

【隐藏组件】

&emsp;&emsp;让 render 方法返回 null 可以隐藏组件

【父传子】

&emsp;&emsp;下面的例子来展示父级如何通过props把数据传递给子级

```
class ControlPanel extends Component {
  render() {
    return (
      <div>
        <Counter caption="First"/>
        <Counter caption="Second" initValue={10} />
        <Counter caption="Third" initValue={20} />
        <button onClick={ () => this.forceUpdate() }>
          Click me to re-render!
        </button>
      </div>
    );
  }
}
```
【读取props】

&emsp;&emsp;下面的例子展示子级如何读取父级传递来的props

```
class Counter extends Component {

  constructor(props) {
    super(props);this.state = {
      count: props.initValue
    }
  }
```
【props检查】

&emsp;&emsp;一个组件应该规范以下内容：这个组件支持哪些prop，以及每个prop应该是什么样的格式。React通过propTypes来支持这些功能

```
Counter.propTypes = {
  caption: PropTypes.string.isRequired,
  initValue: PropTypes.number
};

Counter.defaultProps = {
  initValue: 0
};
```
【子传父】

&emsp;&emsp;React组件要反馈数据在父组件时，可以使用prop。函数类型的prop等于让父组件交给子组件一个回调函数，子组件在恰当的时机调用函数类型的prop，可以带上必要的参数，这样就可以反过来把信息传递给父级

&emsp;&emsp;下面的例子中，onUpdate是子组件向父组件传递数据的渠道

```
//子组件
class Counter extends Component {
  constructor(props) {
    super(props);
    this.onClickIncrementButton = this.onClickIncrementButton.bind(this);
    this.onClickDecrementButton = this.onClickDecrementButton.bind(this);
    this.state = {count: props.initValue}
  }
  onClickIncrementButton() {
    this.updateCount(true);
  }
  onClickDecrementButton() {
    this.updateCount(false);
  }
  updateCount(isIncrement) {
    const previousValue = this.state.count;
    const newValue = isIncrement ? previousValue + 1 : previousValue - 1;
    this.setState({count: newValue})
    this.props.onUpdate(newValue, previousValue)
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
  caption: PropTypes.string.isRequired,
  initValue: PropTypes.number,
  onUpdate: PropTypes.func
};
Counter.defaultProps = {
  initValue: 0,
  onUpdate: f => f 
};
export default Counter;
```
```
//父组件
class ControlPanel extends Component {
  constructor(props) {
    super(props);
    this.onCounterUpdate = this.onCounterUpdate.bind(this);
    this.initValues = [ 0, 10, 20];
    const initSum = this.initValues.reduce((a, b) => a+b, 0);
    this.state = {sum: initSum};
  }
  onCounterUpdate(newValue, previousValue) {
    const valueChange = newValue - previousValue;
    this.setState({ sum: this.state.sum + valueChange});
  }
  render() {
    return (
      <div>
        <Counter onUpdate={this.onCounterUpdate} caption="First" />
        <Counter onUpdate={this.onCounterUpdate} caption="Second" initValue={this.initValues[1]} />
        <Counter onUpdate={this.onCounterUpdate} caption="Third" initValue={this.initValues[2]} />
        <div>Total Count: {this.state.sum}</div>
      </div>
    );
  }
}
export default ControlPanel;
```
【局限】

&emsp;&emsp;设想一下，在一个应用中，包含三级或三级以上的组件结构，顶层的祖父级组件想要传递一个数据给最低层的子组件，用prop的方式，就只能通过父组件中转，也许中间那一层根本用不上这个prop，但是依然需要支持这个prop，扮演好搬运工的角色，只因为子组件用得上，这明显违反了低耦合的设计要求。于是，提出了专门的状态管理的概念

 

&nbsp;

### State

&emsp;&emsp;如何组织数据是程序的最重要问题。React组件的数据分为两种：prop和state。无论prop还是state的改变，都可能引发组件的重新渲染

&emsp;&emsp;状态state与属性props十分相似，但是状态是私有的，完全受控于当前组件。prop是组件的对外接口，state是组件的内部状态

&emsp;&emsp;由于React不能直接修改传入的prop，所以需要记录自身数据变化，就要使用state

【state与prop的区别】

&emsp;&emsp;下面来总结下state与prop的区别

&emsp;&emsp;1、prop用于定义外部接口，state用于记录内部状态

&emsp;&emsp;2、prop的赋值在父组件使用该组件时，state的赋值在该组件内部

&emsp;&emsp;3、组件不可修改prop的值，而state存在的目的就是让组件来改变的

&emsp;&emsp;组件的state，相当于组件的记忆，其存在意义就是被改变，每一次通过this.setState函数修改state就改变了组件的状态，然后通过渲染过程把这种变化体现出来

【正确使用state】

&emsp;&emsp;1、不要直接更新状态，构造函数是唯一能够初始化 this.state 的地方

&emsp;&emsp;如果直接修改this.state的值，虽然事实上改变了组件的内部状态，但只是野蛮地修改了state，但没有驱动组件进行重新渲染。而this.setState()函数所做的事情，就是先改变this.state的值，然后驱动组件重新渲染
```
// Wrong
this.state.comment = 'Hello';
// Correct
this.setState({comment: 'Hello'});
```
&emsp;&emsp;2、状态更新可能是异步的

&emsp;&emsp;setState是异步更新，而不是同步更新，下面是一个例子

```
setYear(){
  let {year} = this.state
  this.setState({
    year: year + 10 //新值
  })
  console.log(this.state.year)//旧值
}
```
```
setYear(){
    setTimeout(() => {
      this.setState({
        year: year + 10 //新值
      })
      console.log(this.state.year)//新值
    })
}
```
&emsp;&emsp;因为 this.props 和 this.state 可能是异步更新的，不应该依靠它们的值来计算下一个状态
```
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```
&emsp;&emsp;要修复它，要使用第二种形式的 setState() 来接受一个函数而不是一个对象。该函数将接收先前的状态作为第一个参数，将此次更新被应用时的props做为第二个参数：
```
// Correct
this.setState((prevState, props) => ({
  counter: prevState.counter + props.increment
}));
```
&emsp;&emsp;3、状态更新合并

&emsp;&emsp;可以调用 setState() 独立地更新它们，但React将多个setState() 调用合并成一个调用来提高性能。

```
componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```
&emsp;&emsp;这里的合并是浅合并，也就是说this.setState({comments})完整保留了this.state.posts，但完全替换了this.state.comments

&emsp;&emsp;4、回调函数

&emsp;&emsp;由于setState是异步更新的，如果需要确定setState更新后，再进行某些操作，可以使用setState的回调函数
```
this.setState({
  val:value
},() => {
  this.ref.editInput.focus()
})
```

&nbsp;

### 事件处理

&emsp;&emsp;React 元素的事件处理和 DOM元素的很相似。但是有一点语法上的不同:

&emsp;&emsp;1、React事件绑定属性的命名采用驼峰式写法，而不是小写

&emsp;&emsp;2、如果采用 JSX 的语法需要传入一个函数作为事件处理函数，而不是一个字符串(DOM元素的写法)
```
<button onClick={activateLasers}>
  Activate Lasers
</button>
```
&emsp;&emsp;注意：在 React 中不能使用返回 false 的方式阻止默认行为。必须明确的使用 preventDefault

【绑定this】

&emsp;&emsp;可以使用bind()方法
```
this.handleClick = this.handleClick.bind(this);
```
&emsp;&emsp;也可以使用属性初始化器语法
```
  handleClick = () => {
    console.log('this is:', this);
  }
```  
&emsp;&emsp;如果没有使用属性初始化器语法，可以在回调函数中使用箭头函数

```
class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }
  render() {
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Click me
      </button>
    );
  }
}
```
&emsp;&emsp;使用这个语法有个问题就是每次 LoggingButton 渲染的时候都会创建一个不同的回调函数。在大多数情况下，这没有问题。然而如果这个回调函数作为一个属性值传入低阶组件，这些组件可能会进行额外的重新渲染。通常建议在构造函数中绑定或使用属性初始化器语法来避免这类性能问题

【传递参数】

&emsp;&emsp;以下两种方式都可以向事件处理程序传递参数：
```
<button onClick={(e) => this.deleteRow(id, e)}>Delete Row</button>
<button onClick={this.deleteRow.bind(this, id)}>Delete Row</button>
```
&emsp;&emsp;注意：通过 bind 方式向监听函数传参，在类组件中定义的监听函数，事件对象 e 要排在所传递参数的后面

```
class Popper extends React.Component{
    preventPop(name, e){   
        e.preventDefault();
        alert(name);
    }
    render(){
        return (<a href="https://reactjs.org" onClick={this.preventPop.bind(this,this.state.name)}>Click</a>
        );
    }
}
```
【原生事件对象】
```
handleClick(e){
  e.nativeEvent
}
```

 

&nbsp;

### 列表

【keys】

&emsp;&emsp;Keys可以在DOM中的某些元素被增加或删除的时候帮助React识别哪些元素发生了变化。因此应当给数组中的每一个元素赋予一个确定的标识

```
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) =>
  <li key={number.toString()}>
    {number}
  </li>
);
```
&emsp;&emsp;一个元素的key最好是这个元素在列表中拥有的一个独一无二的字符串。通常，使用来自数据的id作为元素的key
```
const todoItems = todos.map((todo) =>
  <li key={todo.id}>
    {todo.text}
  </li>
);
```
&emsp;&emsp;当元素没有确定的id时，可以使用序列号索引index作为key
```
const todoItems = todos.map((todo, index) =>
  <li key={index}>
    {todo.text}
  </li>
);
```
&emsp;&emsp;注意：如果列表可以重新排序，不建议使用索引来进行排序，因为这会导致渲染变得很慢

&emsp;&emsp;JSX允许在大括号中嵌入任何表达式

```
function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) =>
        <ListItem key={number.toString()}
                  value={number} />

      )}
    </ul>
  );
}
```
 

&nbsp;

### 表单

【受控组件】

&emsp;&emsp;在HTML当中，像`<input>`,`<textarea>`, 和 `<select>`这类表单元素会维持自身状态，并根据用户输入进行更新。但在React中，可变的状态通常保存在组件的状态属性中，并且只能用 setState() 方法进行更新

&emsp;&emsp;通过使react变成一种单一数据源的状态来结合二者。React负责渲染表单的组件仍然控制用户后续输入时所发生的变化。相应的，其值由React控制的输入表单元素称为“受控组件”

```
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```
&emsp;&emsp;由于 value 属性是在表单元素上设置的，因此显示的值将始终为 React数据源上this.state.value 的值。由于每次按键都会触发 handleChange 来更新当前React的state，所展示的值也会随着不同用户的输入而更新

【textarea】

&emsp;&emsp;在HTML当中，`<textarea>`元素通过子节点来定义它的文本内容。在React中，`<textarea>`会用value属性来代替。这样的话，表单中的`<textarea>`非常类似于使用单行输入的表单：
```
<textarea value={this.state.value} onChange={this.handleChange} />
```
【select】

&emsp;&emsp;在React中，并不使用之前的selected属性，而在根select标签上用value属性来表示选中项。这在受控组件中更为方便，因为只需要在一个地方来更新组件
```
<select value={this.state.value} onChange={this.handleChange}>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
</select>
```
【多个input】

&emsp;&emsp;有处理多个受控的input元素时，可以通过给每个元素添加一个name属性，来让处理函数根据 event.target.name的值来选择做什么

```
class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isGoing: true,
      numberOfGuests: 2
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange} />
        </label>
        <br />
        <label>
          Number of guests:
          <input
            name="numberOfGuests"
            type="number"
            value={this.state.numberOfGuests}
            onChange={this.handleInputChange} />
        </label>
      </form>
    );
  }
}
```
 

&nbsp;

### propTypes

&emsp;&emsp;要检查组件的属性，需要配置特殊的 propTypes 属性

```
import PropTypes from 'prop-types';

class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

Greeting.propTypes = {
  name: PropTypes.string
};
```
&emsp;&emsp;react支持如下验证

```
import PropTypes from 'prop-types';

MyComponent.propTypes = {
  // 可以将属性声明为以下 JS 原生类型
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,

  // 任何可被渲染的元素（包括数字、字符串、子元素或数组）。
  optionalNode: PropTypes.node,

  // 一个 React 元素
  optionalElement: PropTypes.element,

  // 也可以声明属性为某个类的实例
  optionalMessage: PropTypes.instanceOf(Message),

  // 也可以限制属性值是某个特定值之一
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),

  // 限制它为列举类型之一的对象
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message)
  ]),

  // 一个指定元素类型的数组
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),

  // 一个指定类型的对象
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),

  // 一个指定属性及其类型的对象
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number
  }),

  // 也可以在任何 PropTypes 属性后面加上 `isRequired` 后缀
  requiredFunc: PropTypes.func.isRequired,

  // 任意类型的数据
  requiredAny: PropTypes.any.isRequired,

  // 也可以指定一个自定义验证器。它应该在验证失败时返回
  // 一个 Error 对象而不是 `console.warn` 或抛出异常。
  // 不过在 `oneOfType` 中它不起作用。
  customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },

  // 可以提供一个自定义的 `arrayOf` 或 `objectOf` 验证器，它应该在验证失败时返回一个 Error 对象。 它被用于验证数组或对象的每个值。验证器前两个参数的第一个是数组或对象本身，第二个是它们对应的键。
  customArrayProp: PropTypes.arrayOf(function(propValue, key, componentName, location, propFullName) {
    if (!/matchme/.test(propValue[key])) {
      return new Error(
        'Invalid prop `' + propFullName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  })
};
```
【限制单个子代】

&emsp;&emsp;使用 PropTypes.element 可以指定只传递一个子代

```
import PropTypes from 'prop-types';

class MyComponent extends React.Component {
  render() {
    const children = this.props.children;
    return (
      <div>
        {children}
      </div>
    );
  }
}

MyComponent.propTypes = {
  children: PropTypes.element.isRequired
};
```
【属性默认值】

&emsp;&emsp;可以通过配置 defaultProps 为 props定义默认值

```
class Greeting extends React.Component {
  render() {
    return (
      <h1>Hello, {this.props.name}</h1>
    );
  }
}

// 为属性指定默认值:
Greeting.defaultProps = {
  name: 'Stranger'
};

// 渲染 "Hello, Stranger":
ReactDOM.render(
  <Greeting />,
  document.getElementById('example')
);
```
 

&nbsp;

### 返回多个元素

&emsp;&emsp;React 中一个常见模式是为一个组件返回多个元素。Fragments 可以让你聚合一个子元素列表，并且不在DOM中增加额外节点

&emsp;&emsp;Fragments 看起来像空的 JSX 标签：

```
render() {
  return (
    <>
      <ChildA />
      <ChildB />
      <ChildC />
    </>
  );
}
```
&emsp;&emsp;注意：<></> 语法不能接受键值或属性

&emsp;&emsp;另一种使用片段的方式是使用 React.Fragment 组件，React.Fragment 组件可以在 React 对象上使用，`<></>` 是 `<React.Fragment/> 的语法糖

```
class Columns extends React.Component {
  render() {
    return (
      <React.Fragment>
        <td>Hello</td>
        <td>World</td>
      </React.Fragment>
    );
  }
}
```
&emsp;&emsp;如果需要一个带 key 的片段，可以直接使用 `<React.Fragment />` 。 一个使用场景是映射一个集合为一个片段数组 — 例如：创建一个描述列表：

```
function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}
```
&emsp;&emsp;注意：如果使用create-react-app构建的项目，不支持`<></>`，但支持`<React.Fragment />`的形式

 

&nbsp;

### context

&emsp;&emsp;在嵌套层级较深的场景中，不想要向下每层都手动地传递需要的 props。这就需要强大的 context API了。其中，react-redux中的provider组件就是使用context实现的

【手动传递props】

&emsp;&emsp;下面是手动传递props的例子

```
class Button extends React.Component {
  render() {
    return (
      <button style={{background: this.props.color}}>
        {this.props.children}
      </button>
    );
  }
}

class Message extends React.Component {
  render() {
    return (
      <div>
        {this.props.text} <Button color={this.props.color}>Delete</Button>
      </div>
    );
  }
}

class MessageList extends React.Component {
  render() {
    const color = "purple";
    const children = this.props.messages.map((message) =>
      <Message text={message.text} color={color} />
    );
    return <div>{children}</div>;
  }
}
```
【使用context】

&emsp;&emsp;下面使用context来自动传递

&emsp;&emsp;通过在MessageList（context提供者）中添加childContextTypes和getChildContext，React会向下自动传递参数，任何组件只要在它的子组件中（这个例子中是Button），就能通过定义contextTypes来获取参数。

```
const PropTypes = require('prop-types');
class Button extends React.Component {
  render() {
    return (
      <button style={{background: this.context.color}}>
        {this.props.children}
      </button>
    );
  }
}
Button.contextTypes = {
  color: PropTypes.string
};

class Message extends React.Component {
  render() {
    return (
      <div>
        {this.props.text} <Button>Delete</Button>
      </div>
    );
  }
}

class MessageList extends React.Component {
  getChildContext() {
    return {color: "purple"};
  }
  render() {
    const children = this.props.messages.map((message) =>
      <Message text={message.text} />
    );
    return <div>{children}</div>;
  }
}
MessageList.childContextTypes = {
  color: PropTypes.string
};
```
&emsp;&emsp;注意：如果contextTypes没有定义，那么context将会是个空对象

【生命周期】

&emsp;&emsp;如果一个组件中定义了contextTypes，那么下面这些生命周期函数将会接收到额外的参数，即context对象
```
constructor(props, context)
componentWillReceiveProps(nextProps, nextContext)
shouldComponentUpdate(nextProps, nextState, nextContext)
componentWillUpdate(nextProps, nextState, nextContext)
componentDidUpdate(prevProps, prevState, prevContext)
```
【无状态组件】

&emsp;&emsp;如果contextTypes作为函数参数被定义的话，无状态函数组件也是可以引用context。以下代码展示了用无状态函数组件写法的Button组件

```
const PropTypes = require('prop-types');

const Button = ({children}, context) =>
  <button style={{background: context.color}}>
    {children}
  </button>;

Button.contextTypes = {color: PropTypes.string};
```
 

&nbsp;

### 获取尺寸

&emsp;&emsp;如果在react中获取尺寸，可以使用offset、getBoudingClientRect()等原生JS的尺寸属性
```
e.target.offsetHeight
```