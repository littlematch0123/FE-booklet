# NPM

&emsp;&emsp;[CommonJS包规范](http://www.cnblogs.com/xiaohuochai/p/6882027.html)是理论，NPM是其中的一种实践。对于Node而言，NPM帮助完成了第三方模块的发布、安装和依赖等。借助NPM，Node与第三方模块之间形成了很好的一个生态系统。借助NPM，可以帮助用户快速安装和管理依赖包。除此之外，NPM还有一些巧妙的用法。下面将详细介绍NPM

&nbsp;

### 基本操作

&emsp;&emsp;`npm`不需要单独安装。在安装Node的时候，会连带一起安装`npm`

&emsp;&emsp;注意：关于nodejs的安装详细步骤[移步至此](http://www.cnblogs.com/xiaohuochai/p/6223044.html)

【版本】

&emsp;&emsp;执行npm &ndash;v命令可以查看当前NPM的版本

![npm1](https://pic.xiaohuochai.site/blog/nodejs_npm1.png)

【升级】

&emsp;&emsp;不过由于nodejs更新速度要慢于&nbsp;npm，因此在一般情况下要升级npm到最新版本

```
npm install npm -g
```

![npm2](https://pic.xiaohuochai.site/blog/nodejs_npm2.png)

【帮助】

&emsp;&emsp;在不熟悉NPM的命令之前，可以直接执行npm命令或npm help命令查看帮助引导说明

![npm3](https://pic.xiaohuochai.site/blog/nodejs_npm3.png)

&emsp;&emsp;其中，npm help &lt;command&gt;可以查看具体的命令说明

&emsp;&emsp;通过npm -l命令可以查看各个命令的简单用法

![npm4](https://pic.xiaohuochai.site/blog/nodejs_npm4.png)

&nbsp;

### 安装依赖包

&emsp;&emsp;安装依赖包是NPM最常见的用法，包括全局安装和本地安装两种

【本地安装】

&emsp;&emsp;本地安装的执行语句是npm install express。执行该命令后，NPM会在当前目录下创建node_modules目录，然后在node_modules目录下创建express目录，接着将包解压到这个目录下

![npm5](https://pic.xiaohuochai.site/blog/nodejs_npm5.png)

&emsp;&emsp;注意：必须保证从当前的目录开始一直到根目录都没有node_modules或package.json，否则，npm可能会把模块安装在有node_modules或package.json的那层目录

&emsp;&emsp;安装好依赖包后，直接在代码中调用require('express');即可引入该包。require()方法在做路径分析的时候会通过模块路径查找到express所在的位置。模块引入和包的安装这两个步骤是相辅相承的

【全局安装】

&emsp;&emsp;全局模式并不是将一个模块包安装为一个全局包的意思，它并不意味着可以从任何地方通过require()来引用到它，它的主要目的是命令行工具的使用。如果包中含有命令行工具，那么需要执行npm install express &ndash;g命令进行全局模式安装

&emsp;&emsp;实际上，-g是将一个包安装为全局可用的可执行命令。它根据包描述文件中的bin字段配置，将实际脚本链接到与Node可执行文件相同的路径下

```
"bin": {
    "express": "./bin/express"
}
```

&emsp;&emsp;通过命令npm root -g可以查看全局安装目录

![npm6](https://pic.xiaohuochai.site/blog/nodejs_npm6.png)

【其他安装】

&emsp;&emsp;对于一些没有发布到NPM上的包，或是因为网络原因导致无法直接安装的包，可以通过将包下载到本地，然后以本地安装。本地安装只需为NPM指明package.json文件所在的位置即可：它可以是一个包含package.json的存档文件，也可以是一个URL地址，也可以是一个目录下有package.json文件的目录位置。具体参数如下：

```
npm install <tarball file>
npm install <tarball url>    
npm install <folder>
```

&emsp;&emsp;如果不能通过官方源安装，可以通过镜像源安装。在执行命令时，添加`--registry=http://registry.url`即可，示例如下：

```
npm install underscore --registry=http://registry.url
```

【版本】

&emsp;&emsp;如何安装不同版本的依赖包呢？

&emsp;&emsp;默认地，使用npm install express命令安装的是最新版本的express

```
npm install express
```

&emsp;&emsp;如果要安装指定版本，如版本3.9.0，则使用@标志符

```
npm install express@3.9.0
```

&emsp;&emsp;如果项目依赖了很多package，一个一个地安装那将是个体力活。我们可以将项目依赖的包都在package.json这个文件里声明，然后npm install一行命令搞定

```
npm install
```

【参数】

&emsp;&emsp;在安装依赖包时，有一些参数需要注意。比如使用-g参数时，表示该依赖包为全局安装

&emsp;&emsp;**参数**-S, --save表示安装包信息将加入到dependencies（生产阶段的依赖）

```
npm install express --save 或 npm install express -S
```

&emsp;&emsp;package.json 文件的 dependencies 字段：

```
"dependencies": {
    "express": "^3.9.0"
}
```

&emsp;&emsp;**参数**-D, --save-dev表示安装包信息将加入到devDependencies（开发阶段的依赖），所以开发阶段一般使用它

```
npm install express --save-dev 或 npm install express -D
```

&emsp;&emsp;package.json 文件的 devDependencies字段：

```
"devDependencies": {
    "express": "^3.9.0"
}
```

【镜像安装】

&emsp;&emsp;使用以下代码后，可以使用命令cnpm来实现镜像安装

```
$ npm install -g cnpm --registry=https://registry.npm.taobao.org
```

&nbsp;

### 查看及修改

&emsp;&emsp;通过命令npm ls可以查看到底安装了哪些包，如果使用npm ls -g可以查看全局安装的依赖包

![npm7](https://pic.xiaohuochai.site/blog/nodejs_npm7.png)

&emsp;&emsp;通过命令npm ls &lt;pkgname&gt; 可以查看特定依赖包的信息，但输出的信息比较有限，只有安装目录、版本，

![npm8](https://pic.xiaohuochai.site/blog/nodejs_npm8.png)

&emsp;&emsp;如果要查看更详细信息，可以使用命令`npm info <pkgname>`&nbsp;

```
npm info express
```

&emsp;&emsp;通过命令npm outdated &lt;pkgname&gt;可以检查模块是否过时

![npm9](https://pic.xiaohuochai.site/blog/nodejs_npm9.png)

&emsp;&emsp;通过命令npm update &lt;pkgname&gt;可以用来更新模块(不可行)

```
npm update express
```

&emsp;&emsp;但是，经过测试该命令并不生效，电脑系统为window10

&emsp;&emsp;使用和安装模块相同的命令，可以更新

```
npm install express
```

&emsp;&emsp;使用以上命令后，express版本由3.9.0升级到4.15.3

&emsp;&emsp;通过命令npm uninstall &lt;pkgname&gt;可以用来解析模块

```
npm uninstall express
```

![npm10](https://pic.xiaohuochai.site/blog/nodejs_npm10.png)

【卸载】

&emsp;&emsp;卸载依赖包或者说删除依赖包，只需要在包的安装目录下执行以下命令即可

```
npm uninstall <pkgName>
```

&emsp;&emsp;如果要卸载全局模块，则需要使用npm root -g命令先找到全局模块的安装目录

![npm11](https://pic.xiaohuochai.site/blog/nodejs_npm11.png)

&emsp;&emsp;然后再使用npm uninstall &lt;pkgname&gt;命令来卸载模块

![npm12](https://pic.xiaohuochai.site/blog/nodejs_npm12.png)

&emsp;&emsp;如果要在package.json文件中删除相应代码，与安装时类似，需要使用--save-dev或其他相关参数

```
npm uninstall <pkgname> --save-dev
```

&emsp;&emsp;注意：使用cnpm也可以删除安装包，且删除速度更快

```
cnpm uninstall <pkgname> --save-dev
```

&nbsp;

### 发布依赖包

&emsp;&emsp;为了将整个NPM的流程串联起来，下面演示如何编写一个包，将其发布到NPM仓库，并通过NPM安装回本地

【编写模块】

&emsp;&emsp;模块的内容我们尽量保持简单，以sayhello作为例子，相关代码如下：

```
exports.sayHello = function () {
    return 'Hello, world.';
};
```

&emsp;&emsp;将这段代码保存为hello.js即可

【初始化包描述文件】

&emsp;&emsp;package.json文件的内容尽管相对较多，但是实际发布一个包时并不需要一行一行编写。NPM提供的npm init命令会帮助你生成package.json文件，具体如下所示：

![npm13](https://pic.xiaohuochai.site/blog/nodejs_npm13.png)

&emsp;&emsp;NPM通过提问式的交互逐个填入选项，最后生成预览的包描述文件。如果你满意，输入yes，此时会在目录下得到package.json文件　

【注册包仓库账号】

&emsp;&emsp;为了维护包，NPM必须要使用仓库账号才允许将包发布到仓库中。注册账号的命令是npm adduser。这也是一个提问式的交互过程，按顺序进行即可：

![npm14](https://pic.xiaohuochai.site/blog/nodejs_npm14.png)

【上传包】

&emsp;&emsp;上传包的命令是npm publish &lt;folder&gt;。在刚刚创建的package.json文件所在的目录下，执行 npm publish .开始上传包，相关代码如下：

![npm15](https://pic.xiaohuochai.site/blog/nodejs_npm15.png)

&emsp;&emsp;在这个过程中，NPM会将目录打包为一个存档文件，然后上传到官方源仓库中

【安装包】

&emsp;&emsp;为了体验和测试自己上传的包，可以换目录或者清空当前目录执行npm install hello_test_match安装它：

![npm16](https://pic.xiaohuochai.site/blog/nodejs_npm16.png)

&emsp;&emsp;于是，自己创建的包就下载下来了

