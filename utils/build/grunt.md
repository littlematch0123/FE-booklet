# Grunt

&emsp;&emsp;前端技术的发展真的很快，15年还在流行grunt，而现在随着gulp的大量使用，以及webpack越来越流行，grunt基本上要被淘汰了。学习进度跟不上技术发展进度，实在是说不出的感觉。本文将介绍可能将过时的grunt

&nbsp;

### 安装

&emsp;&emsp;Grunt和Grunt插件是通过[npm](http://www.cnblogs.com/xiaohuochai/p/6882911.html)安装并管理的。在学习Grunt前，需要先将Grunt命令行（CLI）安装到全局环境中。安装时可能需要使用sudo（针对OSX、*nix、BSD等系统中）权限或者作为管理员（对于Windows环境）来执行以下命令

<div>
<pre>npm install -g grunt-cli</pre>
</div>

![grunt1](https://pic.xiaohuochai.site/blog/utils_build_grunt1.png)

&emsp;&emsp;上述命令执行完后，`grunt`命令就被加入到系统路径中了，以后就可以在任何目录下执行此命令了

&emsp;&emsp;注意：安装`grunt-cli`并不等于安装了Grunt。Grunt CLI的任务很简单：调用与`Gruntfile`在同一目录中的Grunt。这样带来的好处是，允许在同一个系统上同时安装多个版本的Grunt

&emsp;&emsp;每次运行`grunt`时，就利用node提供的`require()`系统查找本地安装的Grunt。正是由于这一机制，可以在项目的任意子目录中运行`grunt`。如果找到一份本地安装的Grunt，CLI就将其加载，并传递`Gruntfile`中的配置信息，然后执行所指定的任务

&nbsp;

### 配套

&emsp;&emsp;一般需要在项目中添加两份文件：`package.json`&nbsp;和&nbsp;`Gruntfile`

**package.json**: 此文件被[npm](http://www.cnblogs.com/xiaohuochai/p/6882911.html)用于存储项目的元数据，以便将此项目发布为npm模块。可以在此文件中列出项目依赖的grunt和Grunt插件，放置于devDependencies配置段内

**Gruntfile**: 此文件被命名为&nbsp;`Gruntfile.js`&nbsp;或&nbsp;`Gruntfile.coffee`，用来配置或定义任务（task）并加载Grunt插件

【package.json】

&emsp;&emsp;`package.json`应当放置于项目的根目录中，与`Gruntfile`在同一目录中，并且应该与项目的源代码一起被提交。在上述目录(`package.json`所在目录)中运行`npm install`将依据`package.json`文件中所列出的每个依赖来自动安装适当版本的依赖

&emsp;&emsp;常用的package.json配置如下

<div>
<pre>{
  "name": "my-project-name",
  "version": "0.1.0",
  "devDependencies": {
    "grunt": "~0.4.5",
    "grunt-contrib-jshint": "~0.10.0",
    "grunt-contrib-nodeunit": "~0.4.1",
    "grunt-contrib-uglify": "~0.5.0"
  }
}</pre>
</div>

&emsp;&emsp;向已经存在的`package.json`&nbsp;文件中添加Grunt和grunt插件的最简单方式是通过`npm install module --save-dev`命令。此命令不光安装了`module`，还会自动将其添加到devDependencies&nbsp;配置段中，如下所示

<div>
<pre>npm install grunt-contrib-jshint --save-dev</pre>
</div>

【Gruntfile】

&emsp;&emsp;`Gruntfile.js`&nbsp;或&nbsp;`Gruntfile.coffee`&nbsp;文件是有效的 JavaScript 或 CoffeeScript 文件，应当放在项目根目录中，和`package.json`文件在同一目录层级，并和项目源码一起加入源码管理器

&emsp;&emsp;Gruntfile由以下几部分构成：

*   "wrapper" 函数
*   项目与任务配置
*   加载grunt插件和任务
*   自定义任务

&emsp;&emsp;在下面列出的这个&nbsp;`Gruntfile`&nbsp;中，`package.json`文件中的项目元数据（metadata）被导入到 Grunt 配置中，&nbsp;[grunt-contrib-uglify](http://github.com/gruntjs/grunt-contrib-uglify)&nbsp;插件中的`uglify`&nbsp;任务（task）被配置为压缩（minify）源码文件并依据上述元数据动态生成一个文件头注释。当在命令行中执行&nbsp;`grunt`&nbsp;命令时，`uglify`&nbsp;任务将被默认执行

<div>
<pre>module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! &lt;%= pkg.name %&gt; &lt;%= grunt.template.today("yyyy-mm-dd") %&gt; */\n'
      },
      build: {
        src: 'src/&lt;%= pkg.name %&gt;.js',
        dest: 'build/&lt;%= pkg.name %&gt;.min.js'
      }
    }
  });

  // 加载包含 "uglify" 任务的插件。
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // 默认被执行的任务列表。
  grunt.registerTask('default', ['uglify']);
};</pre>
</div>

&emsp;&emsp;1、wrapper函数

&emsp;&emsp;每一份&nbsp;`Gruntfile`&nbsp;（和grunt插件）都遵循同样的格式，所书写的Grunt代码必须放在wrapper函数内

<div>
<pre>module.exports = function(grunt) {
  // Do grunt-related things in here
};</pre>
</div>

&emsp;&emsp;2、项目和任务配置

&emsp;&emsp;大部分的Grunt任务都依赖某些配置数据，这些数据被定义在一个object内，并传递给grunt.initConfig&nbsp;方法

&emsp;&emsp;Grunt的task配置都是在&nbsp;`Gruntfile`&nbsp;中的`grunt.initConfig`方法中指定的。此配置主要是以任务名称命名的属性，也可以包含其他任意数据。一旦这些代表任意数据的属性与任务所需要的属性相冲突，就将被忽略

<div>
<pre>grunt.initConfig({
  concat: {
    // 这里是concat任务的配置信息。
  },
  uglify: {
    // 这里是uglify任务的配置信息
  },
  // 任意数据。
  my_property: 'whatever',
  my_src_files: ['foo/*.js', 'bar/*.js'],
});</pre>
</div>

&emsp;&emsp;在一个任务配置中，`options`属性可以用来指定覆盖内置属性的默认值。此外，每一个目标（target）中还可以拥有一个专门针对此目标（target）的`options`属性。目标（target）级的平options将会覆盖任务级的options。`options`对象是可选的，如果不需要，可以忽略

<div>
<pre>grunt.initConfig({
  concat: {
    options: {
      // 这里是任务级的Options，覆盖默认值 
    },
    foo: {
      options: {
        // "foo" target options may go here, overriding task-level options.
      },
    },
    bar: {
      // No options specified; this target will use task-level options.
    },
  },
});</pre>
</div>

&emsp;&emsp;在下面的案例中，`grunt.file.readJSON('package.json')`&nbsp;将存储在`package.json`文件中的JSON元数据引入到grunt config中。 由于`<% %>`模板字符串可以引用任意的配置属性，因此可以通过这种方式来指定诸如文件路径和文件列表类型的配置数据，从而减少一些重复的工作

&emsp;&emsp;与大多数task一样，[grunt-contrib-uglify](http://github.com/gruntjs/grunt-contrib-uglify)插件中的`uglify`&nbsp;任务要求它的配置被指定在一个同名属性中。在这里有一个例子, 我们指定了一个`banner`选项(用于在文件顶部生成一个注释)，紧接着是一个单一的名为`build`的uglify目标，用于将一个js文件压缩为一个目标文件

<div>
<pre>// Project configuration.
grunt.initConfig({
  pkg: grunt.file.readJSON('package.json'),
  uglify: {
    options: {
      banner: '/*! &lt;%= pkg.name %&gt; &lt;%= grunt.template.today("yyyy-mm-dd") %&gt; */\n'
    },
    build: {
      src: 'src/&lt;%= pkg.name %&gt;.js',
      dest: 'build/&lt;%= pkg.name %&gt;.min.js'
    }
  }
});</pre>
</div>

&emsp;&emsp;3、加载grunt插件和任务

&emsp;&emsp;像&nbsp;[concatenation](https://github.com/gruntjs/grunt-contrib-concat)、minification、[grunt-contrib-uglify](http://github.com/gruntjs/grunt-contrib-uglify)&nbsp;和&nbsp;[linting](https://github.com/gruntjs/grunt-contrib-jshint)这些常用的任务（task）都已经以[grunt插件](https://github.com/gruntjs)的形式被开发出来了。只要在&nbsp;`package.json`&nbsp;文件中被列为dependency（依赖）的包，并通过`npm install`安装之后，都可以在`Gruntfile`中以简单命令的形式使用：

<div>
<pre>// 加载能够提供"uglify"任务的插件。
grunt.loadNpmTasks('grunt-contrib-uglify');</pre>
</div>

&emsp;&emsp;注意：&nbsp;`grunt --help`&nbsp;命令将列出所有可用的任务

&emsp;&emsp;4、自定义任务

&emsp;&emsp;通过定义&nbsp;`default`&nbsp;任务，可以让Grunt默认执行一个或多个任务。在下面的这个案例中，执行&nbsp;`grunt`&nbsp;命令时如果不指定一个任务的话，将会执行`uglify`任务。这和执行`grunt uglify`&nbsp;或者&nbsp;`grunt default`的效果一样。`default`任务列表数组中可以指定任意数目的任务（可以带参数）

<div>
<pre>// Default task(s).
grunt.registerTask('default', ['uglify']);</pre>
</div>

&nbsp;

### 合并

&emsp;&emsp;本节将介绍合并插件grunt-contrib-concat的实例应用

&emsp;&emsp;1、首先，建立项目结构。&nbsp;根目录为'project'，存在一个'src'的文件夹，该文件夹下又包含'css'和'js'这两个文件夹。其中，'css'文件夹有一个空的'concat'文件夹，一个'style1.css'文件，以及一个'style2.css'文件；类似地，'js'文件夹有一个空的'concat'文件夹，一个'script1.js'文件，以及一个'script2.js'文件

![grunt2](https://pic.xiaohuochai.site/blog/utils_build_grunt2.png)

![grunt3](https://pic.xiaohuochai.site/blog/utils_build_grunt3.png)

&emsp;&emsp;由于需要用到grunt来实现合并，所以需要在项目根目录下，新建'package.json'和'Gruntfile.js'文件

![grunt4](https://pic.xiaohuochai.site/blog/utils_build_grunt4.png)

&emsp;&emsp;最终的目录结构如下所示

![grunt5](https://pic.xiaohuochai.site/blog/utils_build_grunt5.png)

&emsp;&emsp;2、填充文件内容

&emsp;&emsp;合并的目的是把'style1.css'和'style2.css'的内容合并到'css/src/concat'文件夹下，把'script1.js'和'script2.js'的内容合并到'js/src/concat'文件夹下

&emsp;&emsp;style1.css的文件内容如下

<div>
<pre>body{margin: 0;}</pre>
</div>

&emsp;&emsp;style2.css的文件内容如下

<div>
<pre>ul{
    margin: 0;
    padding: 0;
    list-style:none;
}</pre>
</div>

&emsp;&emsp;script1.js的文件内容如下

<div>
<pre>console.log('a');</pre>
</div>

&emsp;&emsp;script2.js的文件内容如下

<div>
<pre>console.log('b');</pre>
</div>

&emsp;&emsp;3、设置Grunt的package.json及Gruntfile.js文件

&emsp;&emsp;由于需要用到grunt及grunt-contrib-concat插件，所以package.json的文件内容如下

<div>
<pre>{
  "name": "project",
  "version": "1.0.0",
  "devDependencies": {
    "grunt": "^1.0.1",
    "grunt-contrib-concat": "^1.0.1"
  }
}</pre>
</div>

&emsp;&emsp;Gruntfile.js的配置文件如下

<div>
<pre>module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        stripBanners: true,
        banner: '/*! &lt;%= pkg.name %&gt; - v&lt;%= pkg.version %&gt; - ' +'&lt;%= grunt.template.today("yyyy-mm-dd") %&gt; */'
      },
      myCSSDist: {
        src: ['src/css/*.css'],
        dest: 'src/css/concat/&lt;%= pkg.name %&gt;-&lt;%= pkg.version %&gt;.css'
      },
      myJSDist: {
        src: ['src/js/*.js'],
        dest: 'src/js/concat/&lt;%= pkg.name %&gt;-&lt;%= pkg.version %&gt;.js'
      },      
    },
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.registerTask('default', ['concat']);
};</pre>
</div>

&emsp;&emsp;4、效果演示

&emsp;&emsp;通过在命令行中使用npm install命令来安装插件

<div>
<pre>npm install</pre>
</div>

&emsp;&emsp;然后执行命令grunt

![grunt6](https://pic.xiaohuochai.site/blog/utils_build_grunt6.png)

&emsp;&emsp;在'css/concat'文件夹下生成一个'project-1.0.0.css'的文件，内容如下

<div>
<pre>/*! project - v1.0.0 - 2017-05-27 */body{margin: 0;}
ul{
    margin: 0;
    padding: 0;
    list-style:none;
}</pre>
</div>

&emsp;&emsp;在'js/concat'文件夹下生成一个'project-1.0.0.js'的文件，内容如下

<div>
<pre>/*! project - v1.0.0 - 2017-05-27 */console.log('a');console.log('b');</pre>
</div>

&nbsp;

### 压缩

&emsp;&emsp;接下来，我们对合并后的project-1.0.0.css和project-1.0.0.js文件进行压缩，压缩名称加一个'.min'前缀，并分别保存到'project'目录下的'dist'目录下'css'文件夹和'js'文件夹

![grunt7](https://pic.xiaohuochai.site/blog/utils_build_grunt7.png)

&emsp;&emsp;由于需要用到grunt-contrib-cssmin和grunt-contrib-uglify插件，所以package.json的文件内容如下

<div>
<pre>{
  "name": "project",
  "version": "1.0.0",
  "devDependencies": {
    "grunt": "^1.0.1",
    "grunt-contrib-concat": "^1.0.1",
    "grunt-contrib-cssmin": "^2.2.0",
    "grunt-contrib-uglify": "^3.0.1"
  }
}</pre>
</div>

&emsp;&emsp;Gruntfile.js的配置文件如下

<div>
<pre>module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        stripBanners: true,
        banner: '/*! &lt;%= pkg.name %&gt; - v&lt;%= pkg.version %&gt; - ' +'&lt;%= grunt.template.today("yyyy-mm-dd") %&gt; */'
      },
      myCSSDist: {
        src: ['src/css/*.css'],
        dest: 'src/css/concat/&lt;%= pkg.name %&gt;-&lt;%= pkg.version %&gt;.css'
      },
      myJSDist: {
        src: ['src/js/*.js'],
        dest: 'src/js/concat/&lt;%= pkg.name %&gt;-&lt;%= pkg.version %&gt;.js'
      },      
    },
    cssmin:{
      options: {
        stripBanners: true,
        banner: '/* &lt;%= grunt.template.today("yyyy-mm-dd") %&gt; */'        
      },
      build:{
        src: 'src/css/concat/&lt;%= pkg.name %&gt;-&lt;%= pkg.version %&gt;.css',
        dest: 'dist/css/&lt;%= pkg.name %&gt;-&lt;%= pkg.version %&gt;.min.css'        
      }
    },
    uglify:{
      options: {
        stripBanners: true,
        banner: '/* &lt;%= grunt.template.today("yyyy-mm-dd") %&gt; */'        
      },
      build:{
        src: 'src/js/concat/&lt;%= pkg.name %&gt;-&lt;%= pkg.version %&gt;.js',
        dest: 'dist/js/&lt;%= pkg.name %&gt;-&lt;%= pkg.version %&gt;.min.js'        
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.registerTask('default', ['concat','cssmin','uglify']);
};</pre>
</div>

&emsp;&emsp;通过在命令行中使用npm install命令来安装插件

![grunt8](https://pic.xiaohuochai.site/blog/utils_build_grunt8.png)

&emsp;&emsp;然后执行命令grunt

![grunt9](https://pic.xiaohuochai.site/blog/utils_build_grunt9.png)

&emsp;&emsp;在'dist/css/'文件夹下生成一个'project-1.0.0.min.css'的文件，内容如下

<div>
<pre>/*! project - v1.0.0 - 2017-05-27 */body{margin:0}ul{margin:0;padding:0;list-style:none}</pre>
</div>

&emsp;&emsp;在'dist/js/'文件夹下生成一个'project-1.0.0.min.js'的文件，内容如下

<div>
<pre>/* 2017-05-27 */
console.log("a"),console.log("b");</pre>
</div>

&nbsp;

### 检查

&emsp;&emsp;前面的博文已经介绍过[jshint](http://www.cnblogs.com/xiaohuochai/p/6914830.html)和[csslint](http://www.cnblogs.com/xiaohuochai/p/6914830.html#anchor3)。如果要使用grunt中的插件，则需要在根目录下建立 .csslintrc 和 .jshintrc 文件，并设置它们的内容如下

<div>
<pre>//.csslintrc
{
    "adjoining-classes":false,
    "box-sizing":false,
    "box-model":false,
    "compatible-vendor-prefixes": false,
    "floats":false,
    "font-sizes":false,
    "grandients":false,
    "important":false,
    "known-properties":false,
    "outline-none":false,
    "qualified-headings":false,
    "regex-selectors":false,
    "shorthand":false,
    "text-indent":false,
    "unique-headings":false,
    "universal-selector":false,
    "unqualified-attributes":false
}
//.jshintrc
{
    "boss": false,
    "curly": true,
    "eqeqeq": true,
    "eqnull": true,
    "expr": true,
    "immed":true,
    "newcap":true,
    "noempty":true,
    "noarg":true,
    "undef":true,
    "regexp":true,
    "browser":false,
    "devel":true,
    "node":true
}</pre>
</div>

&emsp;&emsp;由于需要用到grunt-contrib-csslint和grunt-contrib-jshint插件，所以package.json的文件内容如下

<div>
<pre>{
  "name": "project",
  "version": "1.0.0",
  "devDependencies": {
    "grunt": "^1.0.1",
    "grunt-contrib-concat": "^1.0.1",
    "grunt-contrib-cssmin": "^2.2.0",
    "grunt-contrib-uglify": "^3.0.1",
    "grunt-contrib-csslint": "^2.0.0",
    "grunt-contrib-jshint": "^1.1.0"    
  }
}</pre>
</div>

&emsp;&emsp;Gruntfile.js的配置文件如下

<div>
<pre>module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        stripBanners: true,
        banner: '/*! &lt;%= pkg.name %&gt; - v&lt;%= pkg.version %&gt; - ' +'&lt;%= grunt.template.today("yyyy-mm-dd") %&gt; */'
      },
      myCSSDist: {
        src: ['src/css/*.css'],
        dest: 'src/css/concat/&lt;%= pkg.name %&gt;-&lt;%= pkg.version %&gt;.css'
      },
      myJSDist: {
        src: ['src/js/*.js'],
        dest: 'src/js/concat/&lt;%= pkg.name %&gt;-&lt;%= pkg.version %&gt;.js'
      },      
    },
    cssmin:{
      options: {
        stripBanners: true,
        banner: '/* &lt;%= grunt.template.today("yyyy-mm-dd") %&gt; */'        
      },
      build:{
        src: 'src/css/concat/&lt;%= pkg.name %&gt;-&lt;%= pkg.version %&gt;.css',
        dest: 'dist/css/&lt;%= pkg.name %&gt;-&lt;%= pkg.version %&gt;.min.css'        
      }
    },
    uglify:{
      options: {
        stripBanners: true,
        banner: '/* &lt;%= grunt.template.today("yyyy-mm-dd") %&gt; */'        
      },
      build:{
        src: 'src/js/concat/&lt;%= pkg.name %&gt;-&lt;%= pkg.version %&gt;.js',
        dest: 'dist/js/&lt;%= pkg.name %&gt;-&lt;%= pkg.version %&gt;.min.js'        
      }
    },
    jshint:{
      options:{
        jshintrc:'.jshintrc'
      },
      build:['Gruntfile.js','src/js/*.js']
    },
    csslint:{
      options:{
        csslintrc:'.csslintrc'
      },
      build:['src/css/*.css']      
    }
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.registerTask('default', ['jshint','csslint','concat','cssmin','uglify']);
};</pre>
</div>

&emsp;&emsp;通过在命令行中使用npm install命令来安装插件

![grunt10](https://pic.xiaohuochai.site/blog/utils_build_grunt10.png)

&emsp;&emsp;然后执行命令grunt&nbsp;

![grunt11](https://pic.xiaohuochai.site/blog/utils_build_grunt11.png)

&emsp;&emsp;可以看到'script1.js'文件中第1行缺少分号，修改后再执行命令grunt

![grunt12](https://pic.xiaohuochai.site/blog/utils_build_grunt12.png)

&nbsp;

### 监控

&emsp;&emsp;grunt构建工具的自动化主要体现在grunt-contrib-watch插件上，该插件主要用于监听并执行对应的任务

&emsp;&emsp;package.json的文件内容如下

<div>
<pre>{
  "name": "project",
  "version": "1.0.0",
  "devDependencies": {
    "grunt": "^1.0.1",
    "grunt-contrib-concat": "^1.0.1",
    "grunt-contrib-csslint": "^2.0.0",
    "grunt-contrib-cssmin": "^2.2.0",
    "grunt-contrib-jshint": "^1.1.0",
    "grunt-contrib-uglify": "^3.0.1",
    "grunt-contrib-watch": "^1.0.0"
  }
}</pre>
</div>

&emsp;&emsp;Gruntfile.js的配置文件如下

<div>
<pre>module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        stripBanners: true,
        banner: '/*! &lt;%= pkg.name %&gt; - v&lt;%= pkg.version %&gt; - ' +'&lt;%= grunt.template.today("yyyy-mm-dd") %&gt; */'
      },
      myCSSDist: {
        src: ['src/css/*.css'],
        dest: 'src/css/concat/&lt;%= pkg.name %&gt;-&lt;%= pkg.version %&gt;.css'
      },
      myJSDist: {
        src: ['src/js/*.js'],
        dest: 'src/js/concat/&lt;%= pkg.name %&gt;-&lt;%= pkg.version %&gt;.js'
      },      
    },
    cssmin:{
      options: {
        stripBanners: true,
        banner: '/* &lt;%= grunt.template.today("yyyy-mm-dd") %&gt; */'        
      },
      build:{
        src: 'src/css/concat/&lt;%= pkg.name %&gt;-&lt;%= pkg.version %&gt;.css',
        dest: 'dist/css/&lt;%= pkg.name %&gt;-&lt;%= pkg.version %&gt;.min.css'        
      }
    },
    uglify:{
      options: {
        stripBanners: true,
        banner: '/* &lt;%= grunt.template.today("yyyy-mm-dd") %&gt; */'        
      },
      build:{
        src: 'src/js/concat/&lt;%= pkg.name %&gt;-&lt;%= pkg.version %&gt;.js',
        dest: 'dist/js/&lt;%= pkg.name %&gt;-&lt;%= pkg.version %&gt;.min.js'        
      }
    },
    jshint:{
      options:{
        jshintrc:'.jshintrc'
      },
      build:['Gruntfile.js','src/js/*.js']
    },
    csslint:{
      options:{
        csslintrc:'.csslintrc'
      },
      build:['src/css/*.css']      
    },
    watch:{
      build:{
        files: ['src/js/*.js','src/css/*.css'],
        tasks: ['jshint','csslint','concat','cssmin','uglify'],
        options:{spawn:false}
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['jshint','csslint','concat','cssmin','uglify','watch']);
};</pre>
</div>

&emsp;&emsp;通过在命令行中使用npm install命令来安装插件

![grunt13](https://pic.xiaohuochai.site/blog/utils_build_grunt13.png)

&emsp;&emsp;然后执行命令grunt

![grunt14](https://pic.xiaohuochai.site/blog/utils_build_grunt14.png)

&emsp;&emsp;修改'scrpt1.js'文件内容后，命令行自动显示如下

![grunt15](https://pic.xiaohuochai.site/blog/utils_build_grunt15.png)

<div>&nbsp;</div>

### 变动更新

&emsp;&emsp;contrib-watch插件会监听需要处理的文件的变动，一旦有变动就会自动执行相应处理。但是它有一个问题，就是每当监听到一处变动时，就会大费周章地把所有被监听的文件都处理一遍

&emsp;&emsp;而newer插件的作用是处理contrib-watch插件的毛病，让watch在监听到某个文件变动时，仅仅对变动的文件进行事务处理

&emsp;&emsp;package.json的文件内容如下

<div>
<pre>{
  "name": "project",
  "version": "1.0.0",
  "devDependencies": {
    "grunt": "^1.0.1",
    "grunt-contrib-concat": "^1.0.1",
    "grunt-contrib-csslint": "^2.0.0",
    "grunt-contrib-cssmin": "^2.2.0",
    "grunt-contrib-jshint": "^1.1.0",
    "grunt-contrib-uglify": "^3.0.1",
    "grunt-contrib-watch": "^1.0.0",
    "grunt-contrib-requirejs": "^1.0.0",
    "grunt-newer":"^1.3.0"
  }
}</pre>
</div>

&emsp;&emsp;Gruntfile.js的配置文件如下

<div>
<pre>module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        stripBanners: true,
        banner: '/*! &lt;%= pkg.name %&gt; - v&lt;%= pkg.version %&gt; - ' +'&lt;%= grunt.template.today("yyyy-mm-dd") %&gt; */'
      },
      myCSSDist: {
        src: ['src/css/*.css'],
        dest: 'src/css/concat/&lt;%= pkg.name %&gt;-&lt;%= pkg.version %&gt;.css'
      },
      myJSDist: {
        src: ['src/js/*.js'],
        dest: 'src/js/concat/&lt;%= pkg.name %&gt;-&lt;%= pkg.version %&gt;.js'
      },      
    },
    cssmin:{
      options: {
        stripBanners: true,
        banner: '/* &lt;%= grunt.template.today("yyyy-mm-dd") %&gt; */'        
      },
      build:{
        src: 'src/css/concat/&lt;%= pkg.name %&gt;-&lt;%= pkg.version %&gt;.css',
        dest: 'dist/css/&lt;%= pkg.name %&gt;-&lt;%= pkg.version %&gt;.min.css'        
      }
    },
    uglify:{
      options: {
        stripBanners: true,
        banner: '/* &lt;%= grunt.template.today("yyyy-mm-dd") %&gt; */'        
      },
      build:{
        src: 'src/js/concat/&lt;%= pkg.name %&gt;-&lt;%= pkg.version %&gt;.js',
        dest: 'dist/js/&lt;%= pkg.name %&gt;-&lt;%= pkg.version %&gt;.min.js'        
      }
    },
    jshint:{
      options:{
        jshintrc:'.jshintrc'
      },
      build:['Gruntfile.js','src/js/*.js']
    },
    csslint:{
      options:{
        csslintrc:'.csslintrc'
      },
      build:['src/css/*.css']      
    },
    watch:{
      build:{
        files: ['src/js/*.js','src/css/*.css'],
        tasks: ['newer:jshint','newer:csslint','newer:concat','newer:cssmin','newer:uglify'],
        options:{spawn:false}
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-newer');
  grunt.registerTask('default', ['newer:jshint','newer:csslint','newer:concat','newer:cssmin','newer:uglify','watch']);
};</pre>
</div>

&emsp;&emsp;执行命令grunt

<div>
<pre>grunt</pre>
</div>

&emsp;&emsp;由于'script1.js'的内容发生了变化，所以重新合并了js文件，project-1.0.0.min.js的内容如下

<div>
<pre>/* 2017-06-09 */
console.log("a"),console.log("b");</pre>
</div>

&emsp;&emsp;由于css的内容没有发生变化，所以project-1.0.0.min.css的内容如下

<div>
<pre>/*! project - v1.0.0 - 2017-05-29 */body{margin:0}ul{list-style:none;margin:0;padding:0}</pre>
</div>

&nbsp;

### 模块化

&emsp;&emsp;下面说明grunt如何与requireJS配合使用，需要使用contrib-requirejs插件

<div>
<pre>npm install grunt-contrib-requirejs</pre>
</div>

&emsp;&emsp;该插件的使用与[r.js](http://www.cnblogs.com/xiaohuochai/p/6974240.html)的使用类似，不需要建立单独的build.js文件，而是在Gruntfile.js中配置

&emsp;&emsp;设置如下项目结构，src为开发环境，dist为上线环境

![grunt16](https://pic.xiaohuochai.site/blog/utils_build_grunt16.png)

&emsp;&emsp;在r.js中，可以使用'dir'配置项，将项目目录复制到一个新的地方。但是，在实际项目开发中，有许多文件与requirejs无关，也会被复制。所以，不应该使用'dir'，而应该使用'out'配置项，只是将入口文件main.js打包到一个新的地方

&emsp;&emsp;一般地，jQuery并不打包到main.js文件中。如果使用相对路径，打包前的main.js(开发环境)与jQuery存在路径依赖关系。打包后的main.js已经处于新的环境(上线环境)，但此时仍然与开发环境的jQuery存在路径依赖关系，不符合逻辑

&emsp;&emsp;所以，jQuery应该是上线环境的地址。由于打包后，main.js的config也会打包进行，新的main.js的位置发生变化，jQuery的相对路径也会变化。所以config应该写在index.html页面中。这样，在jQuery或main.js的路径发生变化时，可以进行改动

&emsp;&emsp;因此，script1.js和script2.js这两个文件的内容如下

<div>
<pre>//script.js
define(['jquery'],function (){
    return $('div').height();
})
//s2.js
define(['jquery'],function (){
    return $('div').width();
})</pre>
</div>

&emsp;&emsp;main.js的内容如下

<div>
<pre>//main.js
require(['module/script1','module/script2'], function(a,b){
&emsp;&emsp;console.log(a);
&emsp;&emsp;console.log(b);
});</pre>
</div>

&nbsp;&emsp;&emsp;index.html代码如下

<div>
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div&gt;&lt;/div&gt;
&lt;script data-main="main" src="dist/js/require.js"&gt;&lt;/script&gt;
&lt;script&gt;
require.config({
    baseUrl:'src/js',
    paths:{
        'jquery':'../../dist/js/jquery'
    }
});
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
</div>

&emsp;&emsp;package.json的文件内容如下

<div>
<pre>{
  "name": "project",
  "version": "1.0.0",
  "devDependencies": {
    "grunt": "^1.0.1",
    "grunt-contrib-concat": "^1.0.1",
    "grunt-contrib-csslint": "^2.0.0",
    "grunt-contrib-cssmin": "^2.2.0",
    "grunt-contrib-jshint": "^1.1.0",
    "grunt-contrib-uglify": "^3.0.1",
    "grunt-contrib-watch": "^1.0.0",
    "grunt-contrib-requirejs": "^1.0.0",
    "grunt-newer":"^1.3.0"
  }
}</pre>
</div>

【contrib-requirejs插件配置】

&emsp;&emsp;由于该插件打包后的文件，内容还是使用原来的路径关系。但是，开发和线上的路径并不一致。所以，要把可能会变化的路径设置为'baseUrl'，其他的路径保持一致

&emsp;&emsp;注意：contrib-requirejs插件不能与newer插件混用

<div>
<pre>    requirejs: {
      compile: {
        options: {
          baseUrl: 'src/js',
          paths:{
            jquery:'../../dist/js/jquery'
          },
          name: 'main',       
          out:'dist/js/main.js',
          exclude: ['jquery']
        }
      }
    }</pre>
</div>

&emsp;&emsp;Gruntfile.js的配置文件如下

<div>
<pre>module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        stripBanners: true,
        banner: '/*! &lt;%= pkg.name %&gt; - v&lt;%= pkg.version %&gt; - ' +'&lt;%= grunt.template.today("yyyy-mm-dd") %&gt; */'
      },
      myCSSDist: {
        src: ['src/css/*.css'],
        dest: 'src/css/concat/&lt;%= pkg.name %&gt;-&lt;%= pkg.version %&gt;.css'
      }
    },
    cssmin:{
      options: {
        stripBanners: true,
        banner: '/* &lt;%= grunt.template.today("yyyy-mm-dd") %&gt; */'        
      },
      build:{
        src: 'src/css/concat/&lt;%= pkg.name %&gt;-&lt;%= pkg.version %&gt;.css',
        dest: 'dist/css/&lt;%= pkg.name %&gt;-&lt;%= pkg.version %&gt;.min.css'        
      }
    },
    jshint:{
      options:{
        jshintrc:'.jshintrc'
      },
      build:['Gruntfile.js','src/js/*.js']
    },
    csslint:{
      options:{
        csslintrc:'.csslintrc'
      },
      build:['src/css/*.css']      
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: 'src/js',
          paths:{
            jquery:'../../dist/js/jquery'
          },
          name: 'main',       
          out:'dist/js/main.js',
          exclude: ['jquery']
        }
      }
    },
    watch:{
      build:{
        files: ['src/js/*.js','src/css/*.css'],
        tasks: ['newer:jshint','newer:csslint','newer:concat','newer:cssmin','newer:uglify','requirejs'],
        options:{spawn:false}
      }
    }
  });
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-requirejs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-newer');

  grunt.registerTask('default', ['newer:jshint','newer:csslint','newer:concat','newer:cssmin','requirejs','watch']);
};</pre>
</div>

&emsp;&emsp;执行命令grunt

![grunt17](https://pic.xiaohuochai.site/blog/utils_build_grunt17.png)

&emsp;&emsp;更改index.html页面如下，依然能正常显示

<div>
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Document&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;div&gt;&lt;/div&gt;
&lt;script data-main="main" src="dist/js/require.js"&gt;&lt;/script&gt;
&lt;script&gt;
require.config({
    baseUrl:'dist/js',
    paths:{
        'jquery':'../../dist/js/jquery'
    }
});
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
</div>

