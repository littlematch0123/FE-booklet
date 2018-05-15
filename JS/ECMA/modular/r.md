# 使用r.js来打包模块化的javascript文件

&emsp;&emsp;r.js([下载](http://requirejs.org/docs/release/2.3.3/r.js))是[requireJS](http://www.cnblogs.com/xiaohuochai/p/6847942.html)的优化（Optimizer）工具，可以实现前端文件的压缩与合并，在requireJS异步按需加载的基础上进一步提供前端优化，减小前端文件大小、减少对服务器的文件请求。本文将详细介绍r.js

&nbsp;

### 简单打包

【项目结构】

&emsp;&emsp;以一个简单的例子来说明r.js的使用。该项目名称为'demo'，在js目录下包含s1.js和s2.js两个文件，使用requirejs进行模块化，内容如下

<div>
<pre>//s1.js
define(function (){
    return 1;
})
//s2.js
define(function (){
    return 2;
})</pre>
</div>

&emsp;&emsp;使用main.js来调用s1.js和s2.js这两个文件

<div>
<pre>require(['s1','s2'], function(a,b){
&emsp;&emsp;console.log(a+b);
});</pre>
</div>

&emsp;&emsp;index.html的内容如下

<div>
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Document&lt;/title&gt;
    &lt;script data-main="js/main" src="js/require.js"&gt;&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
</div>

&emsp;&emsp;运行index.html文件，所依赖资源如下图所示

![r1](https://pic.xiaohuochai.site/blog/utils_build_r1.png)

&nbsp;【打包】

&emsp;&emsp;接下来，使用r.js来对javascript文件进行打包，而r.js需要使用build.js文件来进行配置，配置如下

<div>
<pre>({
    baseUrl: "./",
    name:'main',
    out:'out.js'
})</pre>
</div>

&emsp;&emsp;接下来运行node r.js -o build.js命令

![r2](https://pic.xiaohuochai.site/blog/utils_build_r2.png)

&emsp;&emsp;项目根目录下，生成一个out.js文件，内容如下

<div>
<pre>define("s1",[],function(){return 1}),define("s2",[],function(){return 2}),require(["s1","s2"],function(n,e){console.log(n+e)}),define("main",function(){});</pre>
</div>

&emsp;&emsp;将index.html的入口文件修改为'out.js'，文件依然能正常运行

<div>
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Document&lt;/title&gt;
    &lt;script data-main="js/out" src="js/require.js"&gt;&lt;/script&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
</div>

&nbsp;

### jQuery打包

&emsp;&emsp;一般地，我们并不是使用原生javascript进行开发，更多的使用库进行高效开发，以jQuery为例，对上面的代码进行改造

&emsp;&emsp;s1模块和s2模块，分别基于jQuery来获取页面div元素的宽、高，内容如下

<div>
<pre>//s1.js
define(['../common/jquery'],function (){
    return $('div').height();
})
//s2.js
define(['../common/jquery'],function (){
    return $('div').width();
})</pre>
</div>

&emsp;&emsp;项目结构如下所示，js文件夹包括common和module两个子文件夹，common文件夹包含公用的require.js和jquery.js，module文件夹包含模块s1.js和s2.js。页面的根目录下，有index.html、入口文件main.js、以及r.js和build.js

![r3](https://pic.xiaohuochai.site/blog/utils_build_r3.png)

【包含jQuery】

&emsp;&emsp;如果打包后的main.js要包含jQuery.js，则代码如下所示

<div>
<pre>({ 
    appDir: './',   //项目根目录
    dir: './dist',  //输出目录，全部文件打包后要放入的文件夹（如果没有会自动新建的）
    baseUrl:'./',
    modules: [  //要优化的模块，相对baseUrl的路径，也是省略后缀&ldquo;.js&rdquo;
        { name:'main' }   
    ],  
    fileExclusionRegExp: /^(r|build)\.js|.*\.scss$/,    //过滤，匹配到的文件将不会被输出到输出目录去
    optimizeCss: 'standard',  
    removeCombined: true  //如果为true，将从输出目录中删除已合并的文件
})</pre>
</div>


【不包含jQuery】

&emsp;&emsp;如果其他页面也需要用到jQuery，它们打包的时候，也会把jQuery打包。这样，相当于每个页面都打包了一次jQuery，性能很差。更好的做法是，不打包jQuery，其他页面引用jQuery时，就可以使用缓存了

&emsp;&emsp;build.js内容如下所示

<div>
<pre>({ 
    appDir: './',   //项目根目录
    dir: './dist',  //输出目录，全部文件打包后要放入的文件夹（如果没有会自动新建的）
    baseUrl:'./',
    modules: [  //要优化的模块，相对baseUrl的路径，也是省略后缀&ldquo;.js&rdquo;
        { 
            name:'main',
            exclude: ['js/common/jquery']//不打包jQuery
        }   
    ],  
    fileExclusionRegExp: /^(r|build)\.js|.*\.scss$/,    //过滤，匹配到的文件将不会被输出到输出目录去
    optimizeCss: 'standard',  
    removeCombined: true  //如果为true，将从输出目录中删除已合并的文件
})</pre>
</div>

&emsp;&emsp;接下来运行node r.js -o build.js命令

![r4](https://pic.xiaohuochai.site/blog/utils_build_r4.png)

&emsp;&emsp;运行后，生成一个'dist'文件夹，该文件夹包含的文件都是处理过后的文件，适合上线

![r5](https://pic.xiaohuochai.site/blog/utils_build_r5.png)

&emsp;&emsp;打包后的main.js内容如下所示

<div>
<pre>define("js/module/s1",["../common/jquery"],function(){return $("div").height()}),define("js/module/s2",["../common/jquery"],function(){return $("div").width()}),require(["js/module/s1","js/module/s2"],function(e,n){console.log(parseInt(e)+parseInt(n))}),define("main",function(){});</pre>
</div>

