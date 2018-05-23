# JS代码检查工具ESLint

&emsp;&emsp;ESLint是一个JavaScript代码静态检查工具，可以检查JavaScript的语法错误，提示潜在的bug，可以有效提高代码质量，维持前端团队高度一致的编码风格。ESLint不但提供一些默认的规则，也提供用户自定义规则来约束所写的JavaScript代码。本文将详细介绍ESLint

![](https://pic.xiaohuochai.site/blog/eslint0.png)

 

&nbsp;

### 发展历史

&emsp;&emsp;Douglas Crockford大神根据自己的理念用JavaScript写了一个JavaScript代码规范检查工具，这就是JSLint。后来非常流行，也的确帮助了广大的JavaScript程序员。但是，大神对于自己的代码规范不做丝毫的妥协，对开源社区的反馈的回应也不礼貌。于是，JSLint从一个帮助程序员规范代码，避免Bug的工具，变成了一个让代码像Crockford的工具。在最不信神的IT界，这当然不能忍了

&emsp;&emsp;2011年，一个叫Anton Kovalyov的前端程序员借助开源社区的力量弄出来了JSHint，该工具的思想基本上和JSLint是一致的，但具有以下几点优势：1、可配置规则。2、社区支持度高。3、可定制结果报表

&emsp;&emsp;起初几年，JSHint 一直是前端代码检测工具的首选。但在 2013 年，Zakas 大佬发现 JSHint 已经无法满足自己定制化规则的需求，而且和 Anton 讨论后达成共识这根本在不可能在 JSHint 上实现。同时 Zakas 还设想发明一个基于 AST 的 lint，可以动态执行额外的规则，同时可以很方便的扩展规则

&emsp;&emsp;2013 年的 6 月份，Zakas 发布了全新的 lint 工具——ESLint。ESLint 的出现并没有撼动 JSHint 的霸主地位。由于前者是利用 AST 处理规则，用 Esprima 解析代码，执行速度要比只需要一步搞定的 JSHint 慢很多；其次当时已经有许多编辑器对 JSHint 支持完善，生态足够强大。真正让 ESLint 逆袭的是 ECMAScript 6 的出现

&emsp;&emsp;2015 年 6 月，ES2015 规范正式发布。但是发布后，市面上浏览器对最新标准的支持情况极其有限。如果想要提前体验最新标准的语法，就得靠 Babel 之类的工具将代码编译成 ES5 甚至更低的版本，同时一些实验性的特性也能靠 Babel 转换。这时 JSHint 就略尴尬，ES2015 变化很大，短期内无法完全支持。ESLint 可扩展的优势一下就体现出来了，不仅可以扩展规则，甚至连解析器也能替换。Babel 团队就为 ESLint 开发了 babel-eslint 替换默认解析器，让 ESLint 率先支持 ES2015 语法

&emsp;&emsp;也是在 2015 年，React 的应用越来越广泛，诞生不久的 JSX 也愈加流行。ESLint 本身也不支持 JSX 语法。还是因为可扩展性，eslint-plugin-react 的出现让 ESLint 也能支持当时 React 特有的规则

&emsp;&emsp;至此，ESLint 完美躺赢，替代 JSHint 成为前端主流工具

 

&nbsp;

### 详细配置

【注释配置】

&emsp;&emsp;有两种主要的方式来配置 ESLint，其中一种就是注释配置，使用 JavaScript 注释把配置信息直接嵌入到一个代码源文件中

&emsp;&emsp;可以在文件中使用以下格式的块注释来临时禁止规则出现警告
```
/* eslint-disable */
alert('foo');
/* eslint-enable */
```
&emsp;&emsp;也可以对指定的规则启用或禁用警告:
```
/* eslint-disable no-alert, no-console */
alert('foo');
console.log('bar');
/* eslint-enable no-alert, no-console */
```
&emsp;&emsp;如果在整个文件范围内禁止规则出现警告，将 `/* eslint-disable */ `块注释放在文件顶部：
```
/* eslint-disable */
alert('foo');
```
【文件配置】

&emsp;&emsp;另一种是文件配置，使用 JavaScript、JSON 或者 YAML 文件为整个目录和它的子目录指定配置信息

&emsp;&emsp;ESLint 支持几种格式的配置文件
```
JavaScript - 使用 .eslintrc.js 然后输出一个配置对象。
YAML - 使用 .eslintrc.yaml 或 .eslintrc.yml 去定义配置的结构。
JSON - 使用 .eslintrc.json 去定义配置的结构，ESLint 的 JSON 文件允许 JavaScript 风格的注释。
(弃用) - 使用 .eslintrc，可以使 JSON 也可以是 YAML。
package.json - 在 package.json 里创建一个 eslintConfig属性，在那里定义配置
```
&emsp;&emsp;如果同一个目录下有多个配置文件，ESLint 只会使用一个。优先级顺序如下

```
1 .eslintrc.js
2 .eslintrc.yaml
3 .eslintrc.yml
4 .eslintrc.json
5 .eslintrc
6  package.json
```
&emsp;&emsp;除了配置一个独立的 `.eslintrc.*` 文件，也可以直接在 `package.json` 文件里的 eslintConfig 字段指定配置，ESLint 将自动在要检测的文件目录里寻找它们，紧接着是父级目录，一直到文件系统的根目录

```
{
    "name": "mypackage",
    "version": "0.0.1",
    "eslintConfig": {
        "env": {
            "browser": true,
            "node": true
        }
    }
}
```
&emsp;&emsp;或者使用 -c 选项传递命令行将文件保持到任意地方
```
eslint -c myconfig.json myfiletotest.js
```
【配置语言】

&emsp;&emsp;ESLint 允许指定想要支持的 JavaScript 语言选项。默认情况下，ESLint 支持 ECMAScript 5 语法。可以覆盖该设置，以启用对 ECMAScript 其它版本和 JSX 的支持

```
ecmaVersion - 默认设置为3，5（默认）， 可以使用 6、7、8 或 9 来指定想要使用的 ECMAScript 版本。也可以用使用年份命名的版本号指定为 2015（同 6），2016（同 7），或 2017（同 8）或 2018（同 9）
sourceType - 设置为 "script" (默认) 或 "module"（如果代码是 ECMAScript 模块)
ecmaFeatures - 这是个对象，表示想使用的额外的语言特性:
globalReturn - 允许在全局作用域下使用 return 语句
impliedStrict - 启用全局 strict mode (如果 ecmaVersion 是 5 或更高)
jsx - 启用 JSX
experimentalObjectRestSpread - 启用实验性的 object rest/spread properties 支持
```
&emsp;&emsp;配置示例

```
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    }
```
【配置环境】

&emsp;&emsp;一个环境定义了一组预定义的全局变量。这些环境并不是互斥的，可以同时定义多个。可用的环境包括

```
browser - 浏览器环境中的全局变量。
node - Node.js 全局变量和 Node.js 作用域。
commonjs - CommonJS 全局变量和 CommonJS 作用域 
shared-node-browser - Node.js 和 Browser 通用全局变量。
es6 - 启用除了 modules 以外的所有 ECMAScript 6 特性（该选项会自动设置 ecmaVersion 解析器选项为 6）
worker - Web Workers 全局变量。
amd - 将 require() 和 define() 定义为像 amd 一样的全局变量。
mocha - 添加所有的 Mocha 测试全局变量。
jasmine - 添加所有的 Jasmine 版本 1.3 和 2.0 的测试全局变量。
jest - Jest 全局变量。
phantomjs - PhantomJS 全局变量。
protractor - Protractor 全局变量。
qunit - QUnit 全局变量。
jquery - jQuery 全局变量。
prototypejs - Prototype.js 全局变量。
shelljs - ShellJS 全局变量。
meteor - Meteor 全局变量。
mongo - MongoDB 全局变量。
applescript - AppleScript 全局变量。
nashorn - Java 8 Nashorn 全局变量。
serviceworker - Service Worker 全局变量。
atomtest - Atom 测试全局变量。
embertest - Ember 测试全局变量。
webextensions - WebExtensions 全局变量。
greasemonkey - GreaseMonkey 全局变量。
```
&emsp;&emsp;可以在JavaScript 文件中使用注释来指定环境
```
/* eslint-env node, mocha */
```
&emsp;&emsp;也可以在配置文件里指定环境，使用 env 关键字指定想启用的环境，并设置它们为 true

```
{
    "env": {
        "browser": true,
        "node": true
    }
}
```
&emsp;&emsp;如果想在一个特定的插件中使用一种环境，确保提前在 plugins 数组里指定了插件名，然后在 env 配置中不带前缀的插件名后跟一个 / ，紧随着环境名

```
{
    "plugins": ["example"],
    "env": {
        "example/custom": true
    }
}
```
【配置插件】

&emsp;&emsp;ESLint 支持使用第三方插件。在使用插件之前，必须使用 npm 安装它。

&emsp;&emsp;在配置文件里配置插件时，可以使用 plugins 关键字来存放插件名字的列表。插件名称可以省略 eslint-plugin- 前缀

```
{
    "plugins": [
        "plugin1",
        "eslint-plugin-plugin2"
    ]
}
```
&emsp;&emsp;注意：由于 Node.js 的 require 函数的行为，全局安装的 ESLint 实例只能使用全局安装的 ESLint 插件，本地安装的版本，只能用本地安装的插件。不支持混合本地和全局插件

【配置规则】

&emsp;&emsp;ESLint 附带有大量的规则。可以使用注释或配置文件修改项目中要使用的规则。要改变一个规则设置，必须将规则 ID 设置为下列值之一：
```
"off" 或 0 - 关闭规则
"warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
"error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
```
&emsp;&emsp;为了在文件注释里配置规则，使用以下格式的注释：
```
/* eslint eqeqeq: "off", curly: "error" */
```
&emsp;&emsp;也可以在配置文件中进行规则配置

```
{
    "rules": {
        "eqeqeq": "off",
        "curly": "error",
        "quotes": ["error", "double"]
    }
}
```
&emsp;&emsp;配置定义在插件中的一个规则的时候，必须使用 插件名/规则ID 的形式

```
{
    "plugins": [
        "plugin1"
    ],
    "rules": {
        "eqeqeq": "off",
        "curly": "error",
        "quotes": ["error", "double"],
        "plugin1/rule1": "error"
    }
}
```
&emsp;&emsp;也可以使用这种格式的注释配置
```
/* eslint "plugin1/rule1": "error" */
```
【配置继承】

&emsp;&emsp;一个配置文件可以被基础配置中的已启用的规则继承

&emsp;&emsp;值为 "eslint:recommended" 的 extends 属性启用一系列核心规则，这些规则报告一些常见问题。这个推荐的子集只能在 ESLint 主要版本进行更新
```
"extends": "eslint:recommended"
```
&emsp;&emsp;插件是一个 npm 包，通常输出规则。一些插件也可以输出一个或多个命名的 配置。要确保这个包安装在 ESLint 能请求到的目录下

```
{
    "plugins": [
        "react"
    ],
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "rules": {
       "no-set-state": "off"
    }
}
```
&emsp;&emsp;extends 属性值可以是基本配置文件的绝对路径或相对路径。 ESLint 解析基本配置文件的相对路径相对使用的配置文件，除非那个文件在主目录或非 ESLint 安装目录的父级目录。在这些情况下，ESLint 解析基本配合文件的相对路径相对于被检测的项目目录（尤其是当前工作目录）

```
{
    "extends": [
        "./node_modules/coding-standard/eslintDefaults.js",
        "./node_modules/coding-standard/.eslintrc-es6",
        "./node_modules/coding-standard/.eslintrc-jsx"
    ],
    "rules": {
        "eqeqeq": "warn"
    }
}
```
【配置忽略】

&emsp;&emsp;可以通过在项目根目录创建一个 .eslintignore 文件告诉 ESLint 去忽略特定的文件和目录

&emsp;&emsp;.eslintignore 文件是一个纯文本文件，其中的每一行都是一个 glob 模式表明哪些路径应该忽略检测

&emsp;&emsp;例如，以下将忽略所有的 JavaScript 文件：
```
**/*.js
```
&emsp;&emsp;如果没有发现 .eslintignore 文件，也没有指定替代文件，ESLint 将在 `package.json` 文件中查找 eslintIgnore 键，来检查要忽略的文件

```
{
  "name": "mypackage",
  "version": "0.0.1",
  "eslintConfig": {
      "env": {
          "browser": true,
          "node": true
      }
  },
  "eslintIgnore": ["hello.js", "world.js"]
}
```
 

&nbsp;

### NodeJS

&emsp;&emsp;下面来介绍NodeJS环境下如何配置airbnb-base的eslint规则

&emsp;&emsp;1、本地安装eslint、eslint-config-airbnb-base、eslint-plugin-import
```
npm install --save-dev eslint
npm install --save-dev eslint-config-airbnb-base
npm install --save-dev eslint-plugin-import
```
&emsp;&emsp;注意： 最好使用npm，而不是cnpm安装。因为在使用本地安装的eslint时，会使用其安装路径。而npm和cnpm的安装路径不一致

&emsp;&emsp;2、安装成功后，package.json文件中增加如下字段
```
  "devDependencies": {
    "eslint": "^4.19.1",
    "eslint-config-airbnb-base": "^12.1.0",
    "eslint-plugin-import": "^2.12.0"
  }
```
&emsp;&emsp;3、在根目录下设置.eslintrc.js配置文件

```
module.exports = {
  "extends": ["airbnb-base"],
  "env": {
    "es6": true,
    "node": true
  },
  "rules": {
    "comma-dangle": ["error", "never"], // 要求或禁止末尾逗号：不允许逗号
    "indent": ["error", 2], // JavaScript代码强制使用一致的缩进：2格缩进
    "semi": ["error", "never"], // 不使用分号
    "arrow-parens": ["error", "as-needed"], // 箭头函数的参数可以不使用圆括号
    "linebreak-style": "off", // 取消换行符\n或\r\n的验证
    "object-curly-newline": ["error", { "consistent": true }], // 花括号内的换行符不一定要格式一致
    "function-paren-newline": "off", // 不验证函数括号内的换行
    "import/extensions": "off", // 取消对文件扩展名的验证
    "no-param-reassign": "off", // 允许对函数参数进行再赋值
    "no-underscore-dangle": "off", // 允许在标识符中使用下划线
    "no-use-before-define": "off", // 允许变量和函数在定义前使用
    "no-unused-expressions": "off", // 允许使用未使用过的表达式，以此来支持a && a()的代码形式
    "no-console": "off", // 启用console控制台
    "consistent-return": "off", // 关闭函数中return的检测
    "no-shadow": "off", // 可以使用同名变量,
    "newline-per-chained-call": "off", //取消方法链调用中的换行符的检测
    "import/newline-after-import": "off"
  }
}
```
&emsp;&emsp;4、在命令行工具中使用命令，对文件进行lint校验

```
PS D:\blog\api\node_modules\.bin> ./eslint ../../index.js

D:\blog\api\index.js
  16:1  error  'a' is not defined  no-undef

✖ 1 problem (1 error, 0 warnings)
```
 

&nbsp;

### React

&emsp;&emsp;1、安装react-app-rewired-eslint使react项目支持eslint
```
npm install react-app-rewired react-app-rewire-eslint --save
```
&emsp;&emsp;然后在根目录下，创建一个config-overrides.js配置文件

```
const rewireEslint = require('react-app-rewire-eslint');

function overrideEslintOptions(options) {
  // do stuff with the eslint options...
  return options;
}

/* config-overrides.js */
module.exports = function override(config, env) {
  config = rewireEslint(config, env, overrideEslintOptions);
  return config;
}
```
&emsp;&emsp;2、安装eslint-config-airbnb配置合集
```
npm install --save-dev eslint-config-airbnb
```
&emsp;&emsp;Airbnb包括了以下三个插件
```
eslint-plugin-import
eslint-plugin-react 
eslint-plugin-jsx-a11y
```
&emsp;&emsp;接着，在根目录下创建.eslintrc.js配置文件

```
module.exports = {
  // 指定校验的ECMAScript的版本及特性
  "parserOptions": {
    "ecmaVersion": 7, // ECMAScript版本，7为ES7
    "sourceType": "module", //默认script，如果代码是ECMAScript模块，设置为module
    "ecmaFeatures": { // 使用额外的语言特性
        "jsx": true // 启用JSX
    }
  },
  // 当访问未定义的变量时，no-undef 规则将发出警告
  // 指定脚本的运行环境。每种环境都有一组特定的预定义全局变量
  "env": {
    "es6": true,
    "node": true,
    "browser": true,
  },
  // 当访问未定义的变量时，no-undef 规则将发出警告
  // 脚本在执行期间访问的额外的全局变量
  "globals": {
    "document": true,
    "navigator": true,
    "window":true,
    "node":true
  },
  // 使用第三方airbnb开发配置合集
  "extends": "airbnb",
  // eslint-config-airbnb包括了以下3个插件
  "plugins": [
    "react",
    "jsx-a11y",
    "import"
  ],
  // 定义自己的规则
  "rules": {
    "comma-dangle": ["error", "never"], // 要求或禁止末尾逗号：不允许逗号
    "indent": ["error", 2], // JavaScript代码强制使用一致的缩进：2格缩进
    "semi": ["error", "never"], // 不使用分号
    "arrow-parens": ["error", "as-needed"], // 箭头函数的参数可以不使用圆括号
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }], //reajs文件的后缀名为.js或.jsx均可
    "linebreak-style": "off", // 取消换行符\n或\r\n的验证
    "object-curly-newline": ["error", { "consistent": true }], // 花括号内的换行符不一定要格式一致
    "function-paren-newline": "off", // 不验证函数括号内的换行
    "import/extensions": "off", // 取消对文件扩展名的验证
    "import/no-unresolved": "off", // 取消自动解析路径，以此开启alias的别名路径设置
    "no-shadow": "off", // 取消变量声明覆盖的验证，保证mapDispatchToProps的正确使用
    "no-param-reassign": "off", // 允许对函数参数进行再赋值
    "no-underscore-dangle": "off", // 允许在标识符中使用下划线
    "no-use-before-define": "off", // 允许变量和函数在定义前使用
    "no-unused-expressions": "off", // 允许使用未使用过的表达式，以此来支持a && a()的代码形式
    "jsx-a11y/anchor-is-valid": [ "error", { "components": [ "Link" ], "specialLink": [ "to" ]}], // 允许正常地使用Link
    "import/no-extraneous-dependencies": "off", //使用history/createBrowserHistory引入包时，不会报错
    "no-console": "off" // 启用console控制台
  }
};
```
 

&nbsp;

### Vue

&emsp;&emsp;使用vue-cli创建项目时，如果使用eslint，会有如下图所示的选项，选择使用standard还是airbnb规范

![](https://pic.xiaohuochai.site/blog/js_eslint1.png)

&emsp;&emsp;以standard规范创建成功后，package.json文件，会出现如下字段

```
    "eslint": "^4.15.0",
    "eslint-config-standard": "^10.2.1",
    "eslint-friendly-formatter": "^3.0.0",
    "eslint-loader": "^1.7.1",
    "eslint-plugin-import": "^2.7.0",
    "eslint-plugin-node": "^5.2.0",
    "eslint-plugin-promise": "^3.4.0",
    "eslint-plugin-standard": "^3.0.1",
    "eslint-plugin-vue": "^4.0.0",
```
&emsp;&emsp;与此同时，在根目录下自动生成.eslintrc.js配置文件

```
// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/base',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
  }
}
```
&emsp;&emsp;如果需要更改为更严格的验证，可以下载并使用airbnb规范
```
npm install --save-dev eslint-config-airbnb-base
```
&emsp;&emsp;在extends字段中，将standard更改为airbnb-base，将plugin:vue/base更改为plugin: vue/recommended
```
  extends: [
    'plugin:vue/recommended',
    'airbnb-base'
  ]
```
 &emsp;&emsp;添加一些自定义的规则，最终的配置文件如下所示

```
// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/recommended',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'airbnb-base'
  ],
  // required to lint *.vue files
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "linebreak-style": "off", // 取消换行符\n或\r\n的验证
    "semi": ["error", "never"], // 不使用分号
    "arrow-parens": ["error", "as-needed"], // 箭头函数的参数可以不使用圆括号
    "comma-dangle": ["error", "never"], // 不允许末尾逗号
    "consistent-return": "off", // 关闭函数中return的检测
    "object-curly-newline": ["error", { "consistent": true }], // 花括号内的换行符不一定要格式一致
    "global-require": "off", // 取消对require的验证，使得可以使用require来加载图片的相对路径
    "function-paren-newline": "off", // 不验证函数括号内的换行
    "import/no-unresolved": "off", // 取消自动解析路径，以此开启alias的别名路径设置
    "no-param-reassign": "off", // 允许对函数参数进行再赋值
    "import/extensions": "off", // 取消对文件扩展名的验证
    "max-len": "off", // 取消行的最大长度的验证，使SVG不用重新调整格式
    "no-underscore-dangle": "off", //允许标识符中有下划线，从而支持vue中插件的使用
    "no-console": "off", // 启用console控制台
    "no-unused-expressions": "off", // 允许使用未使用过的表达式，以此来支持a && a()的代码形式
    "no-shadow": "off", // 取消变量声明覆盖的验证
    'vue/attribute-hyphenation': 0, // 取消对元素特性只能使用中划线或小驼峰形式的验证
    'vue/max-attributes-per-line': 0 // 取消元素有多个特性时，每个特性独占一行的验证
  }
}
```