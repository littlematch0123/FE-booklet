# webpack模块解析

&emsp;&emsp;在web存在多种支持JavaScript模块化的工具(如[requirejs](http://www.cnblogs.com/xiaohuochai/p/6847942.html)和[r.js](http://www.cnblogs.com/xiaohuochai/p/6974240.html))，这些工具各有优势和限制。webpack基于从这些系统获得的经验教训，并将模块的概念应用于项目中的任何文件。本文将详细介绍webpack的模块解析

&nbsp;

### 模块

&emsp;&emsp;在模块化编程中，开发者将程序分解成离散功能块(discrete chunks of functionality)，并称之为模块

&emsp;&emsp;每个模块具有比完整程序更小的接触面，使得校验、调试、测试轻而易举。 精心编写的模块提供了可靠的抽象和封装界限，使得应用程序中每个模块都具有条理清楚的设计和明确的目的

&emsp;&emsp;Node.js从最一开始就支持模块化编程。对比Node.js模块，webpack模块能够以各种方式表达它们的依赖关系

<div>
<pre>ES2015 import 语句
CommonJS require() 语句
AMD define 和 require 语句
css/sass/less 文件中的 @import 语句。
样式(url(...))或 HTML 文件(&lt;img src=...&gt;)中的图片链接(image url)</pre>
</div>

&emsp;&emsp;注意：webpack 1需要特定的loader来转换ES 2015 import，然而通过webpack 2可以开箱即用

【支持类型】

&emsp;&emsp;webpack通过loader可以支持各种语言和预处理器编写模块。loader描述了webpack如何处理非JavaScript(non-JavaScript) 模块，并且在bundle中引入这些依赖。 webpack 社区已经为各种流行语言和语言处理器构建了loader，包括：

<div>
<pre>CoffeeScript
TypeScript
ESNext (Babel)
Sass
Less
Stylus</pre>
</div>

&emsp;&emsp;总的来说，webpack提供了可定制的、强大和丰富的API，允许任何技术栈使用webpack，保持了在开发、测试和生成流程中无侵入性(non-opinionated)

&nbsp;

### 模块解析

&emsp;&emsp;resolver是一个库(library)，用于帮助找到模块的绝对路径。一个模块可以作为另一个模块的依赖模块，然后被后者引用，如下：

<div>
<pre>import foo from 'path/to/module'
// 或者
require('path/to/module')</pre>
</div>

&emsp;&emsp;所依赖的模块可以是来自应用程序代码或第三方的库(library)。resolver帮助webpack找到bundle中需要引入的模块代码，这些代码在包含在每个require/import语句中。当打包模块时，webpack使用enhanced-resolve来解析文件路径

【解析规则】

&emsp;&emsp;使用enhanced-resolve，webpack能够解析三种文件路径：

&emsp;&emsp;1、绝对路径

<div>
<pre>import "/home/me/file";
import "C:\\Users\\me\\file";</pre>
</div>

&emsp;&emsp;由于已经取得文件的绝对路径，因此不需要进一步再做解析

&emsp;&emsp;2、相对路径

<div>
<pre>import "../src/file1";
import "./file2";</pre>
</div>

&emsp;&emsp;在这种情况下，使用import或require的资源文件(resource file)所在的目录被认为是上下文目录(context directory)。在import/require中给定的相对路径，会添加此上下文路径(context path)，以产生模块的绝对路径(absolute path)

&emsp;&emsp;3、模块路径

<div>
<pre>import "module";
import "module/lib/file";</pre>
</div>

&emsp;&emsp;模块将在resolve.modules中指定的所有目录内搜索。 可以替换初始模块路径，此替换路径通过使用resolve.alias配置选项来创建一个别名

&emsp;&emsp;一旦根据上述规则解析路径后，解析器(resolver)将检查路径是否指向文件或目录

&emsp;&emsp;如果路径指向一个文件：

&emsp;&emsp;&emsp;&emsp;a、如果路径具有文件扩展名，则被直接将文件打包

&emsp;&emsp;&emsp;&emsp;b、否则，将使用 [resolve.extensions] 选项作为文件扩展名来解析，此选项告诉解析器在解析中能够接受哪些扩展名（例如 .js, .jsx）

&emsp;&emsp;如果路径指向一个文件夹，则采取以下步骤找到具有正确扩展名的正确文件：

&emsp;&emsp;&emsp;&emsp;a、如果文件夹中包含 package.json 文件，则按照顺序查找 resolve.mainFields 配置选项中指定的字段。并且 package.json 中的第一个这样的字段确定文件路径

&emsp;&emsp;&emsp;&emsp;b、如果package.json文件不存在或者package.json文件中的main字段没有返回一个有效路径，则按照顺序查找 esolve.mainFiles配置选项中指定的文件名，看是否能在import/require目录下匹配到一个存在的文件名

&emsp;&emsp;&emsp;&emsp;c、文件扩展名通过 resolve.extensions 选项采用类似的方法进行解析

&emsp;&emsp;webpack 根据构建目标(build target)为这些选项提供了合理的默认配置

【解析与缓存】

&emsp;&emsp;Loader解析遵循与文件解析器指定的规则相同的规则。resolveLoader 配置选项可以用来为 Loader 提供独立的解析规则。

&emsp;&emsp;每个文件系统访问都被缓存，以便更快触发对同一文件的多个并行或穿行请求。在观察模式下，只有修改过的文件会从缓存中摘出。如果关闭观察模式，在每次编译前清理缓存

&nbsp;

### 依赖图表

&emsp;&emsp;任何时候，一个文件依赖于另一个文件，webpack就把此视为文件之间有依赖关系。这使得 webpack 可以接收非代码资源(non-code asset)（例如图像或 web 字体），并且可以把它们作为依赖提供给应用程序

&emsp;&emsp;webpack从命令行或配置文件中定义的一个模块列表开始，处理应用程序。 从这些入口起点开始，webpack 递归地构建一个依赖图表，这个依赖图表包含着应用程序所需的每个模块，然后将所有这些模块打包为少量的bundle(通常只有一个 )可由浏览器加载

&nbsp;

### 构建目标

&emsp;&emsp;因为服务器和浏览器代码都可以用JavaScript编写，所以webpack提供了多种构建目标(target)，可以在webpack配置中设置

【用法】

&emsp;&emsp;要设置target属性，只需要在webpack配置中设置target的值

<div>
<pre>//webpack.config.js
module.exports = {
  target: 'node'
};</pre>
</div>

&emsp;&emsp;在上面例子中，使用node webpack会编译为用于「类Node.js」环境（使用Node.js的require，而不是使用任意内置模块（如fs或path）来加载chunk）。

&emsp;&emsp;每个target都有各种部署(deployment)/环境(environment)特定的附加项，以支持满足其需求

【多个Target】

&emsp;&emsp;尽管webpack不支持向target传入多个字符串，可以通过打包两份分离的配置来创建同构的库

<div>
<pre>//webpack.config.js
var path = require('path');
var serverConfig = {
  target: 'node',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lib.node.js'
  }
  //&hellip;
};
var clientConfig = {
  target: 'web', // &lt;=== 默认是 'web'，可省略
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'lib.js'
  }
  //&hellip;
};
module.exports = [ serverConfig, clientConfig ];</pre>
</div>

&emsp;&emsp;上面的例子将在的dist文件夹下创建lib.js和lib.node.js文件

&nbsp;

### 模块热替换

&emsp;&emsp;模块热替换HMR(Hot Module Replacement)功能会在应用程序运行过程中替换、添加或删除模块，而无需重新加载页面。这使得可以在独立模块变更后，无需刷新整个页面，就可以更新这些模块，极大地加速了开发时间

【站在App的角度】

&emsp;&emsp;1、app代码要求HMR runtime 检查更新

&emsp;&emsp;2、HMR runtime （异步）下载更新，然后通知 app 代码更新可用

&emsp;&emsp;3、app 代码要求 HMR runtime 应用更新

&emsp;&emsp;4、HMR runtime （异步）应用更新

&emsp;&emsp;可以设置 HMR，使此进程自动触发更新，或者可以选择要求在用户交互后进行更新

【站在编译器(webpack)的角度】

&emsp;&emsp;除了普通资源，编译器(compiler)需要发出 "update"，以允许更新之前的版本到新的版本。"update" 由两部分组成：1、待更新manifest (JSON)；2、一个或多个待更新chunk (JavaScript)；

&emsp;&emsp;manifest 包括新的编译 hash 和所有的待更新 chunk 目录。

&emsp;&emsp;每个待更新 chunk 包括用于与所有被更新模块相对应 chunk 的代码（或一个 flag 用于表明模块要被移除）。

&emsp;&emsp;编译器确保模块 ID 和 chunk ID 在这些构建之间保持一致。通常将这些 ID 存储在内存中（例如，当使用 webpack-dev-server 时），但是也可能将它们存储在一个 JSON 文件中

【站在模块的角度】

&emsp;&emsp;HMR 是可选功能，只会影响包含 HMR 代码的模块。举个例子，通过 style-loader 为 style 样式追加补丁。 为了运行追加补丁，style-loader 实现了 HMR 接口；当它通过 HMR 接收到更新，它会使用新的样式替换旧的样式。

&emsp;&emsp;类似的，当在一个模块中实现了 HMR 接口，可以描述出当模块被更新后发生了什么。然而在多数情况下，不需要强制在每个模块中写入 HMR 代码。如果一个模块没有 HMR 处理函数，更新就会冒泡。这意味着一个简单的处理函数能够对整个模块树(complete module tree)进行处理。如果在这个模块树中，一个单独的模块被更新，那么整个模块树都会被重新加载（只会重新加载，不会迁移）。

【站在HMR Runtime的角度】

&emsp;&emsp;对于模块系统的 runtime，附加的代码被发送到 parents 和 children 跟踪模块。

&emsp;&emsp;在管理方面，runtime 支持两个方法 check 和 apply。

&emsp;&emsp;1、check 发送 HTTP 请求来更新 manifest。如果请求失败，说明没有可用更新。如果请求成功，待更新 chunk 会和当前加载过的 chunk 进行比较。对每个加载过的 chunk，会下载相对应的待更新 chunk。当所有待更新 chunk 完成下载，就会准备切换到 ready 状态。

&emsp;&emsp;2、apply 方法将所有被更新模块标记为无效。对于每个无效模块，都需要在模块中有一个更新处理函数，或者在它的父级模块们中有更新处理函数。否则，无效标记冒泡，并将父级也标记为无效。每个冒泡继续直到到达应用程序入口起点，或者到达带有更新处理函数的模块（以最先到达为准）。如果它从入口起点开始冒泡，则此过程失败。

&emsp;&emsp;之后，所有无效模块都被（通过 dispose 处理函数）处理和解除加载。然后更新当前 hash，并且调用所有 "accept" 处理函数。runtime 切换回闲置状态，一切照常继续

&emsp;&emsp;可以在开发过程中将 HMR 作为 LiveReload 的替代。webpack-dev-server 支持热模式，在试图重新加载整个页面之前，热模式会尝试使用 HMR 来更新

&emsp;&emsp;一些 loader 已经生成可热更新的模块。例如，style-loader 能够置换出页面的样式表。对于这样的模块，不需要做任何特殊处理

