# 使用styled-components实现CSS in JS

&emsp;&emsp;使用jsx语法可以实现HTML in JS，使用svgr可以实现svg in JS，使用styled-components可以实现CSS in JS。这样，使用react开发，就变成了使用JS开发，统一且方便。本文将详细介绍styled-components的用法

 

&nbsp;

### 基本用法

【安装】
```
$ npm install styled-components
```
&emsp;&emsp;使用非常简单，下面的代码片段展示了 React 项目中使用 styled-components，定义了 Wrapper 和 Button 两个组件，包含了 html 结构和对应的 css 样式，从而将样式和组件之间的 class 映射关系移除

```
import styled from 'styled-components';
const Wrapper = styled.section`
  margin: 0 auto;
  width: 300px;
  text-align: center;
`;
const Button = styled.button`
  width: 100px;
  color: white;
  background: skyblue;
`;
render(
  <Wrapper>
    <Button>Hello World</Button>
  </Wrapper>
);
```
 

&nbsp;

### 组件样式

&emsp;&emsp;如果要为组件设置样式，则需要使用小括号语法，而且需要在组件上设置className和children

```
const Link = ({ className, children }) => (
  <a className={className}>
    {children}
  </a>
)
const StyledLink = styled(Link)`
  color: palevioletred;
  font-weight: bold;
`;
render(
  <div>
    <Link>Unstyled, boring Link</Link>
    <br />
    <StyledLink>Styled, exciting Link</StyledLink>
  </div>
);
```
&nbsp;

### 扩展样式

&emsp;&emsp;使用扩展样式，可以基于已经存在的样式进行扩展

```
const Button = styled.button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

const TomatoButton = Button.extend`
  color: tomato;
  border-color: tomato;
`;

render(
  <div>
    <Button>Normal Button</Button>
    <TomatoButton>Tomato Button</TomatoButton>
  </div>
);
```
 

&nbsp;

### 更换标签

&emsp;&emsp;在某些情况下，可以在复用样式的基础上更换标签

```
const Button = styled.button`
  display: inline-block;
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;
const Link = Button.withComponent('a')
const TomatoLink = Link.extend`
  color: tomato;
  border-color: tomato;
`;
render(
  <div>
    <Button>Normal Button</Button>
    <Link>Normal Link</Link>
    <TomatoLink>Tomato Link</TomatoLink>
  </div>
);
```
 

&nbsp;

### 传递属性

&emsp;&emsp;通过props可以从父组件向子组件传递属性

```
const GlassModal = ({ children, className, backgroundColor, padding }) => (
  <Wrap backgroundColor={backgroundColor}>
    <Main padding={padding} className={className}>
      {children}
    </Main>
  </Wrap>
)
export default GlassModal

const Wrap = styled.section`
  background-color: ${props => props.backgroundColor || BLUE_DARK};
`
const Main = styled.main`
  padding: ${props => props.padding || '0'};
  background-color: ${OPACITY_LIGHT};
`
```
```
const StyledGlassModal = styled(GlassModal)`
  padding: 20px 10px;
  text-align: center;
`
```
&emsp;&emsp;或者，基于prop来定制主题

```
const Button = styled.button`
  background: ${props => props.primary ? 'palevioletred' : 'white'};
  color: ${props => props.primary ? 'white' : 'palevioletred'};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

render(
  <div>
    <Button>Normal</Button>
    <Button primary>Primary</Button>
  </div>
);
```
 

&nbsp;

### attrs函数

&emsp;&emsp;通过使用attrs函数，可以用来设置其他属性

```
const Input = styled.input.attrs({
  type: 'password',
  margin: props => props.size || '1em',
  padding: props => props.size || '1em'
})`
  color: palevioletred;
  border-radius: 3px;
  margin: ${props => props.margin};
  padding: ${props => props.padding};
`;
render(
  <div>
    <Input placeholder="A small text input" size="1em" />
    <Input placeholder="A bigger text input" size="2em" />
  </div>
);
```
&emsp;&emsp;或者引入第三方库的样式，如activeClassName

```
const Button = styled.button.attrs({
  className: 'small',
})`
  background: black;
  color: white;
`;
```
&emsp;&emsp;编译后的 html 结构如下：
```
<button class="sc-gPEVay small gYllyG">
  Styled Components
</button>
```
 

&nbsp;

### 动画

&emsp;&emsp;styled-components 同样对 css 动画中的 @keyframe 做了很好的支持
```
import { keyframes } from 'styled-components';
```
```
const rotate360 = keyframes`
  from {transform: rotate(0deg);}
  to {transform: rotate(360deg);}
`;
const Rotate = styled.div`
  display: inline-block;
  animation: ${rotate360} 2s linear infinite;

`;
render(
  <Rotate>&lt; 💅 &gt;</Rotate>
);
```
 

&nbsp;

### 添加类名
&emsp;&emsp;有时，会在为元素添加类名，并在该类名下设置样式的需要

```
<Wrap className="test">

const Wrap= styled.div`
  &.test{
&emsp;&emsp;color: white;
  }
`
```
&emsp;&emsp;或者，覆盖组件内部样式
```
<Wrapper>
  <h4>Hello Word</h4>
  <div className="detail"></div>
</Wrapper>
const Wrapper = styled.div`
 & .detail {
   color: #ccc;
 }
`;
```