# nodeJS中的包

　　Node组织了自身的核心模块，也使得第三方文件模块可以有序地编写和使用。但是在第三方模块中，模块与模块之间仍然是散列在各地的，相互之间不能直接引用。而在模块之外，包和NPM则是将模块联系起来的一种机制。在介绍NPM之前，不得不提起[CommonJS](http://www.cnblogs.com/xiaohuochai/p/6847939.html)的包规范。JavaScript不似Java或者其他语言那样，具有模块和包结构。Node对模块规范的实现，一定程度上解决了变量依赖、依赖关系等代码组织性问题。包的出现，则是在模块的基础上进一步组织JavaScript代码。CommonJS的包规范的定义其实也十分简单，它由包结构和包描述文件两个部分组成，前者用于组织包中的各种文件，后者则用于描述包的相关信息，以供外部读取分析。本文将详细介绍nodeJS中的包

&nbsp;

### 包结构

　　包实际上是一个存档文件，即一个目录直接打包为.zip或tar.gz格式的文件，安装后解压还原为目录。完全符合CommonJS规范的包目录应该包含如下这些文件

　　1、package.json：包描述文件

　　2、bin：用于存放可执行二进制文件的目录

　　3、lib：用于存放JavaScript代码的目录

　　4、doc：用于存放文档的目录

　　5、test：用于存放单元测试用例的代码

　　以功能为使页面即时刷新的livereload插件的包结构为例

![packet1](https://pic.xiaohuochai.site/blog/nodejs_packet1.png)

<div>&nbsp;</div>

### 包描述文件

　　包描述文件用于表达非代码相关的信息，它是一个JSON格式的文件&mdash;&mdash;package.json，位于包的根目录下，是包的重要组成部分。而NPM的所有行为都与包描述文件的字段息息相关

`　　package.json`文件，定义了项目所需要的各种模块，以及项目的配置信息（比如名称、版本、许可证等元数据）。`npm install`命令根据这个配置文件，自动下载所需的模块，也就是配置项目所需的运行和开发环境

　　有了package.json文件，直接使用npm install命令，就会在当前目录中安装所需要的模块

<div>
<pre>$ npm install</pre>
</div>

　　如果一个模块不在`package.json`文件之中，可以单独安装这个模块，并使用相应的参数，将其写入`package.json`文件之中

<div>
<pre>$ npm install express --save
$ npm install express --save-dev</pre>
</div>

　　上面代码表示单独安装express模块，`--save`参数表示将该模块写入`dependencies`属性，`--save-dev`表示将该模块写入`devDependencies`属性

　　同样地，以livereload插件的包描述文件为例

![packet2](https://pic.xiaohuochai.site/blog/nodejs_packet2.png)

### 基本字段

　　package.json文件可以手工编写，也可以使用`npm init`命令自动生成

<div>
<pre>$ npm init</pre>
</div>

　　这个命令采用互动方式，要求用户回答一些问题，然后在当前目录生成一个基本的package.json文件

　　[注意]npm init -y表示在安装过程中回答的都是yes，会自动生成如下所示的package.json文件

```
{
  "name": "api",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

　　所有问题之中，只有项目名称（name）和项目版本（version）是必填的，其他都是选填的

　　因此，最简单的package.json文件，只定义两项元数据：项目名称和项目版本

<div>
<pre>{
  "name" : "xxx",
  "version" : "0.0.0",
}</pre>
</div>

　　1、name&mdash;&mdash;包名。规范定义它需要由小写的字母和数字组成，可以包含.、_和-，但不允许出现空格。包名必须是唯一的，以免对外公布时产生重名冲突的误解。除此之外，NPM还建议不要在包名中附带上node或js来重复标识它是JavaScript或Node模块&nbsp;

<div>
<pre>"name": "livereload"</pre>
</div>

　　2、version&mdash;&mdash;版本号。一个语义化的版本号，这在[http://semver.org/](http://semver.org/)上有详细定义，通常为major.minor.revision格式。该版本号十分重要，常常用于一些版本控制的场合

<div>
<pre>"version": "0.6.0"</pre>
</div>

　　[注意]对于nodejs来说，版本号的小数位代表为这个版本的稳定性，偶数位为稳定版本(0.6.x、0.8.x&hellip;&hellip;)，奇数位为非稳定版本(0.7.x、0.9.x&hellip;&hellip;)。一般地，开发时要使用最新的稳定版本

&nbsp;

### 必需字段

　　CommonJS为package.json文件定义了包括name和version在内的10个必需的字段。但由于CommonJS包规范尚处于草案阶段，NPM在实践中做了一定的取舍

　　1、description&mdash;&mdash;包简介。方便别人了解该模块作用，搜索的时候也有用

<div>
<pre>"description": "LiveReload server"</pre>
</div>

　　2、keywords&mdash;&mdash;关键词数组，NPM中主要用来做分类搜索。一个好的关键词数组有利于用户快速找到该包

　　[注意]livereload插件并没有设置keywords属性

　　3、maintainers&mdash;&mdash;包维护者列表。每个维护者由name、email和web这3个属性组成

　　[注意]livereload插件并没有设置maintainers中的web属性

<div>
<pre>  "maintainers": [
    {
      "name": "bphogan",
      "email": "brianhogan@napcs.com"
    }
  ]</pre>
</div>

　　4、contributors&mdash;&mdash;贡献者列表。在开源社区中，为开源项目提供代码是经常出现的事情，如果名字能出现在知名项目的contributors列表中，是一件比较有荣誉感的事。列表中的第一个贡献应当是包的作者本人。它的格式与维护者列表相同

<div>
<pre>  "contributors": [
    {
      "name": "Brian P. Hogan",
      "email": "brianhogan@napcs.com"
    }
  ]</pre>
</div>

　　5、bugs&mdash;&mdash;一个可以反馈bug的网页地址或邮件地址

<div>
<pre>  "bugs": {
    "url": "https://github.com/napcs/node-livereload/issues"
  }</pre>
</div>

　　6、licenses&mdash;&mdash;当前包所使用的许可证列表，表示这个包可以在哪些许可证下使用

<div>
<pre>  "licenses": [
    {
      "type": "MIT",
      "url": "https://github.com/napcs/node-livereload/blob/master/LICENSE"
    }
  ]</pre>
</div>

　　7、repositories&mdash;&mdash;托管源代码的位置列表，表明可以通过哪些方式和地址访问包的源代码

<div>
<pre>  "repository": {
    "type": "git",
    "url": "git+ssh://git@github.com/napcs/node-livereload.git"
  }</pre>
</div>

　　8、dependencies&mdash;&mdash;使用当前包所需要依赖的包列表。这个属性十分重要，NPM会通过这个属性帮助自动加载依赖的包

　　对应的版本可以加上各种限定，主要有以下几种：

*   指定版本：比如1.2.2，遵循&ldquo;大版本.次要版本.小版本&rdquo;的格式规定，安装时只安装指定版本
*   大于小于号(&gt;或&lt;)+指定版本：比如&gt;=1.2.2，表示安装大于等于1.2.2的最新版本
*   波浪号(tilde)+指定版本：比如~1.2.2，表示安装1.2.x的最新版本(不低于1.2.2)，但是不安装1.3.x，也就是说安装时不改变大版本号和次要版本号。
*   插入号(caret)+指定版本：比如&circ;1.2.2，表示安装1.x.x的最新版本(不低于1.2.2)，但是不安装2.x.x，也就是说安装时不改变大版本号。需要注意的是，如果大版本号为0，则插入号的行为与波浪号相同，这是因为此时处于开发阶段，即使是次要版本号变动，也可能带来程序的不兼容
*   latest：安装最新版本
<div>
<pre>  "devDependencies": {
    "coffee-script": "&gt;= 1.8.0",
    "mocha": "&gt;= 1.0.3",
    "request": "&gt;= 2.9.203",
    "should": "&gt;= 0.6.3",
    "sinon": "^1.17.4"
  }</pre>
</div>

&nbsp;

### 可选字段

　　除了必选字段外，规范还定义了一部分可选字段，具体如下所示

　　1、homepage&mdash;&mdash;当前包的网站地址

<div>
<pre>  "homepage": "https://github.com/napcs/node-livereload#readme",</pre>
</div>

　　2、os&mdash;&mdash;操作系统支持列表。这些操作系统的取值包括aix、freebsd、linux、macos、solaris、vxworks、windows。如果设置了列表为空，则不对操作系统做任何假设

　　[注意]livereload插件并没有设置os属性

　　3、cpu&mdash;&mdash;CPU架构的支持列表，有效的架构名称有arm、mips、ppc、sparc、x86和x86_64。同os一样，如果列表为空，则不对CPU架构做任何假设

　　[注意]livereload插件并没有设置cpu属性

　　4、engine&mdash;&mdash;支持的JavaScript引擎列表，有效的引擎取值包括ejs、flusspferd、gpsee、jsc、spidermonkey、narwhal、node和v8

<div>
<pre>  "engines": {
    "node": "&gt;=0.4.0"
  }</pre>
</div>

　　5、builtin&mdash;&mdash;标志当前包是否是内建在底层系统的标准组件

　　[注意]livereload插件并没有设置builein属性

　　6、directories&mdash;&mdash;包目录说明

<div>
<pre>"directories": {}</pre>
</div>

　　7、implements&mdash;&mdash;实现规范的列表。标志当前包实现了CommonJS的哪些规范

　　[注意]livereload插件并没有设置implements属性

　　8、scripts&mdash;&mdash;脚本说明对象。它主要被包管理器用来安装、编译、测试和卸载包。`scripts`指定了运行脚本命令的npm命令行缩写，比如start指定了运行`npm run start`时，所要执行的命令

<div>
<pre>  "scripts": {
    "test": "mocha"
  },</pre>
</div>

&nbsp;

### 其他字段

　　在包描述文件的规范中，NPM实际需要的字段主要有name、version、description、keywords、repositories、author、bin、main、scripts、engines、dependencies、devDependencies。与包规范的区别在于多了author、bin、main和devDependencies这4个字段

　　1、author&mdash;&mdash;包作者

　　[注意]livereload插件并没有设置author属性

　　2、bin&mdash;&mdash;指定各个内部命令对应的可执行文件的位置。一些包作者希望包可以作为命令行工具使用。配置好bin字段后，通过npm install package_name -g命令可以将脚本添加到执行路径中，之后可以在命令行中直接执行。通过-g命令安装的模块包称为全局模式

　　下面代码指定，livereaload命令对应的可执行文件为 bin 子目录下的 livereload.js。Npm会寻找这个文件，在`node_modules/.bin/`目录下建立符号链接。在上面的例子中，livereaload会建立符号链接`npm_modules/.bin/someTool`。由于`node_modules/.bin/`目录会在运行时加入系统的PATH变量，因此在运行npm时，就可以不带路径，直接通过命令来调用这些脚本

<div>
<pre>  "bin": {
    "livereload": "./bin/livereload.js"
  }</pre>
</div>

　　因此，像下面这样的写法可以采用简写

<div>
<pre>scripts: {  
  start: './node_modules/livereload.js build'
}
// 简写为
scripts: {  
  start: 'livereload build'
}</pre>
</div>

　　所有`node_modules/.bin/`目录下的命令，都可以用`npm run [命令]`的格式运行。在命令行下，键入`npm run`，然后按tab键，就会显示所有可以使用的命令

　　3、main&mdash;&mdash;加载的入口文件。模块引入方法require()在引入包时，会优先检查这个字段，并将其作为包中其余模块的入口。如果不存在这个字段，require()方法会查找包目录下的index.js、index.node、index.json文件作为默认入口

<div>
<pre>"main": "./lib/livereload.js"</pre>
</div>

　　4、devDependencies&mdash;&mdash;项目开发所需要的模块。一些模块只在开发时需要依赖。配置这个属性，可以提示包的后续开发者安装依赖包。类比于dependencies字段

<div>
<pre>  "devDependencies": {
    "coffee-script": "&gt;= 1.8.0",
    "mocha": "&gt;= 1.0.3",
    "request": "&gt;= 2.9.203",
    "should": "&gt;= 0.6.3",
    "sinon": "^1.17.4"
  }</pre>
</div>

