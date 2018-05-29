# gulp

&emsp;&emsp;与[grunt](http://www.cnblogs.com/xiaohuochai/p/6906325.html)类似，gulp也是构建工具，但相比于grunt的频繁IO操作，gulp的流操作能更快更便捷地完成构建工作。gulp借鉴了Unix操作系统的管道（pipe）思想，前一级的输出，直接变成后一级的输入，使得在操作上非常简单。通过本文，我们将学习如何使用Gulp来改变开发流程，从而使开发更加快速高效

&nbsp;

### 入门

&emsp;&emsp;如果会使用grunt，则gulp学起来，并不困难。主要包括以下几步

&emsp;&emsp;1. 全局安装 gulp

<div>
<pre>$ npm install --global gulp</pre>
</div>

&emsp;&emsp;2. 作为项目的开发依赖（devDependencies）安装

<div>
<pre>$ npm install --save-dev gulp</pre>
</div>

&emsp;&emsp;3. 在项目根目录下创建一个名为&nbsp;`gulpfile.js`&nbsp;的文件：

<div>
<pre>var gulp = require('gulp');

gulp.task('default', function() {
  // 将你的默认的任务代码放在这
});</pre>
</div>

&emsp;&emsp;4. 运行 gulp：

<div>
<pre>$ gulp</pre>
</div>

&emsp;&emsp;默认的名为 default 的任务（task）将会被运行，在这里，这个任务并未做任何事情。

&emsp;&emsp;想要单独执行特定的任务（task），请输入&nbsp;`gulp <task> <othertask>`

&nbsp;

### API

&emsp;&emsp;在学习gulp的配置之前，首先需要了解gulp涉及到的API

【gulp.src(globs[, options])】

&emsp;&emsp;指定需要处理的源文件的路径，返回当前文件流至可用插件，参数如下

&emsp;&emsp;globs： 需要处理的源文件匹配符路径。类型(必填)：String or StringArray；

&emsp;&emsp;通配符路径匹配示例：

<div>
<pre>&ldquo;src/a.js&rdquo;：指定具体文件；
&ldquo;*&rdquo;：匹配所有文件 例：src/*.js(包含src下的所有js文件)；
&ldquo;**&rdquo;：匹配0个或多个子文件夹 例：src/**/*.js(包含src的0个或多个子文件夹下的js文件)；
&ldquo;{}&rdquo;：匹配多个属性 例：src/{a,b}.js(包含a.js和b.js文件)src/*.{jpg,png,gif}(src中所有jpg/png/gif文件)
&ldquo;!&rdquo;：排除文件 例：!src/a.js(不包含src下的a.js文件)；</pre>
</div>
<div>
<pre>var gulp = require('gulp'),
    less = require('gulp-less');
gulp.task('testLess', function () {
    gulp.src(['less/**/*.less','!less/{extend,page}/*.less'])
        .pipe(less())
        .pipe(gulp.dest('./css'));
});</pre>
</div>

&emsp;&emsp;options： 类型(可选)：Object，有3个属性buffer、read、base；

<div>
<pre>options.buffer：类型：Boolean 默认true,设为false将返回file.content的流且不缓冲文件，处理大文件时有用
options.read： 类型：Boolean 默认：true 设置false，将不执行读取文件操作，返回null；
options.base： 类型：String 设置输出路径以某个路径的某个组成部分为基础向后拼接</pre>
</div>
<div>
<pre>gulp.src('client/js/**/*.js')//匹配'client/js/somedir/somefile.js'且将`base`解析为`client/js/`
  .pipe(minify())
  .pipe(gulp.dest('build'));  // 写入 'build/somedir/somefile.js'

gulp.src('client/js/**/*.js', { base: 'client' })
  .pipe(minify())
  .pipe(gulp.dest('build'));  // 写入 'build/js/somedir/somefile.js'</pre>
</div>

【gulp.dest(path[, options])】

&emsp;&emsp;指定处理完后文件输出的路径。可以将它pipe到多个文件夹。如果某文件夹不存在，将会自动创建它

&emsp;&emsp;注意：文件被写入的路径是以所给的相对路径根据所给的目标目录计算而来。类似的，相对路径也可以根据所给的 base 来计算

<div>
<pre>gulp.src('./client/templates/*.jade')
  .pipe(jade())
  .pipe(gulp.dest('./build/templates'))
  .pipe(minify())
  .pipe(gulp.dest('./build/minified_templates'));</pre>
</div>

&emsp;&emsp;该方法的参数如下

<div>
<pre>path：  类型(必填)：String or Function 指定文件输出路径，或者定义函数返回文件输出路径亦可
options：  类型(可选)：Object，有2个属性cwd、mode；
    options.cwd：类型：String 默认：process.cwd()：前脚本的工作目录路径 文件输出路径为相对路径会用到
    options.mode：类型：String 默认：0777 指定被创建文件夹的权限</pre>
</div>

【gulp.task(name[, deps], fn)】

&emsp;&emsp;定义一个gulp任务，参数如下

<div>
<pre>name：  类型(必填)：String 指定任务的名称（不应该有空格）；
deps：  类型(可选)：StringArray，该任务依赖的任务列表
fn：    类型(必填)：Function 该任务调用的插件操作</pre>
</div>

&emsp;&emsp;默认的，task 将以最大的并发数执行，也就是说，gulp会一次性运行所有的task并且不做任何等待。如果想要创建一个序列化的task队列，并以特定的顺序执行，需要做两件事：1、给出一个提示，来告知 task 什么时候执行完毕；2、并且再给出一个提示，来告知一个 task 依赖另一个 task 的完成。

&emsp;&emsp;对于这个例子，先假定有两个 task，"one" 和 "two"，并且希望它们按照这个顺序执行：

&emsp;&emsp;在 "one" 中，加入一个提示，来告知什么时候它会完成：可以再完成时候返回一个callback，或者返回一个promise或stream，这样系统会去等待它完成。

&emsp;&emsp;在 "two" 中，需要添加一个提示来告诉系统它需要依赖第一个 task 完成

<div>
<pre>var gulp = require('gulp');
// 返回一个 callback，因此系统可以知道它什么时候完成
gulp.task('one', function(cb) {
    // 做一些事 -- 异步的或者其他的
    cb(err); // 如果 err 不是 null 或 undefined，则会停止执行，且注意，这样代表执行失败了
});
// 定义一个所依赖的 task 必须在这个 task 执行之前完成
gulp.task('two', ['one'], function() {
    // 'one' 完成后
});
gulp.task('default', ['one', 'two']);</pre>
</div>

【return】

&emsp;&emsp;把task方法中的return单独拿出来，是因为其虽然不起眼，但却很重要。如果任务b需要依赖任务a的完成，那么任务a的task方法需要使用return返回stream，如下所示

<div>
<pre>gulp.task('testLess', function () {
    return gulp.src(['less/style.less'])
        .pipe(less())
        .pipe(gulp.dest('./css'));
});
gulp.task('minicss', ['testLess'], function () { //执行完testLess任务后再执行minicss任务
    gulp.src(['css/*.css'])
        .pipe(minifyCss())
        .pipe(gulp.dest('./dist/css'));
});</pre>
</div>

【gulp.watch(glob [, opts], tasks)】

【gulp.watch(glob [, opts, cb])】

&emsp;&emsp;watch方法是用于监听文件变化，文件一修改就会执行指定的任务，参数如下

<div>
<pre>glob(必填)：  以一个glob字符串，或者一个包含多个glob字符串的数组的形式来表示需要处理的源文件匹配符路径
opts：       类型(可选)：Object 需要设置的参数
tasks：      类型(必填)：StringArray 需要执行的任务的名称数组；
cb(event)：  类型(可选)：Function 每个文件变化执行的回调函数；
&emsp;&emsp;event.type： &emsp;&emsp;类型:String  发生的变动的类型有added, changed 或者 deleted
&emsp;&emsp;event.path：  　 类型:String  触发了该事件的文件的路径</pre>
</div>
<div>
<pre>gulp.task('watch1', function () {
    gulp.watch('less/**/*.less', ['testLess']);
});</pre>
</div>
<div>
<pre>gulp.watch('js/**/*.js', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});</pre>
</div>
<div>
<pre>var watcher = gulp.watch('js/**/*.js', ['uglify','reload']);
watcher.on('change', function(event) {
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});</pre>
</div>

&nbsp;

### 命令行

【参数标记】

<div>
<pre>-v 或 --version &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;会显示全局和项目本地所安装的gulp版本号
--require &lt;module path&gt; &emsp;&emsp;  将会在执行之前reqiure一个模块。可以使用多个--require
--gulpfile &lt;gulpfile path&gt; 　 手动指定一个gulpfil 的路径，会将CWD设置到该gulpfile所在目录
--cwd &lt;dir path&gt; &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;  手动指定CWD。定义gulpfile查找的位置，所有的相应依赖会从这里开始计算相对路径
-T 或 --tasks &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;  会显示所指定 gulpfile 的 task 依赖树
--tasks-simple &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; 会以纯文本的方式显示所载入的 gulpfile 中的 task 列表
--color &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; 强制 gulp 和 gulp 插件显示颜色，即便没有颜色支持
--no-color &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp; 强制不显示颜色，即便检测到有颜色支持
--silent &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;   禁止所有的 gulp 日志</pre>
</div>

&emsp;&emsp;命令行会在 process.env.INIT_CW 中记录它是从哪里被运行的

【Tasks】

&emsp;&emsp;Task可以通过 gulp &lt;task&gt; &lt;othertask&gt; 方式来执行。如果只运行 gulp 命令，则会执行所注册的名为 default 的 task，如果没有这个 task，那么 gulp 会报错

&nbsp;&nbsp;

### 插件

**0、串行**

&emsp;&emsp;gulp执行多个任务的时候是异步的。但是实际应用场景中，我们并不希望所有任务都同时执行，我们希望有个先后顺序，某些任务需要再另一些任务执行完之后才去执行

&emsp;&emsp;gulp-sequence插件能够很好的完成这个任务

<div>
<pre>npm install --save-dev gulp-sequence</pre>
</div>

&emsp;&emsp;以下代码中，先并行执行'a'、'b'，再执行'c'，再并行执行'd'、'e'，再执行'f'

<div>
<pre>var gulp = require('gulp')
var gulpSequence = require('gulp-sequence')
gulp.task('test', gulpSequence(['a', 'b'], 'c', ['d', 'e'], 'f'))</pre>
</div>

**1、js相关插件**

【concat】合并文件

<div>
<pre>var gulp = require('gulp'),
    concat = require('gulp-concat');
gulp.task('testConcat', function () {
    gulp.src('src/js/*.js')
        .pipe(concat('all.js'))//合并后的文件名
        .pipe(gulp.dest('dist/js'));
});</pre>
</div>

【uglify】压缩javascript文件

<div>
<pre>var gulp = require('gulp'),
    uglify= require('gulp-uglify');
gulp.task('jsmin', function () {
    //压缩src/js目录下的所有js文件
    //除了test1.js和test2.js（**匹配src/js的0个或多个子文件夹）
    gulp.src(['src/js/*.js', '!src/js/**/{test1,test2}.js']) 
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});</pre>
</div>

【requirejs】打包模块化的js文件

<div>
<pre>var gulp = require('gulp'),
    requirejs = require('gulp-requirejs');
gulp.task('script',function(){
    //将js模块打包成一个文件
    return requirejs({
          baseUrl: 'src/js',
          paths:{
            'jquery':'../../dist/js/jquery'
          },
          out:'main.js',
          name: 'main',       
          exclude: ['jquery']
    })
    .pipe(gulp.dest('dist/js')); 
})</pre>
</div>

【jshint】js代码检测
<div>
<pre>var gulp = require('gulp'),
    jshint = require('gulp-jshint');
gulp.task('script',function(){
    gulp.src('src/js/*.js')
    //设置js检测规则，并检测js代码
    .pipe(jshint('.jshintrc'))
    //对代码进行报错提示
    .pipe(jshint.reporter('default'));
});
</pre>
</div>

**2、CSS相关插件**

【clean-css】压缩css文件
<div>
<pre>var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css');

gulp.task('css', function() {
&emsp;&emsp;gulp.src('src/css/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/css'));
});</pre>
</div>

【sass】将scss文件编译成css

&emsp;&emsp;gulp-sass的安装并不是一个简单的事

&emsp;&emsp;1、如果gulp-sass安装不成功，可能出现以下提示

<div>
<pre>Cannot download https://github.com/sass/node-sass/releases/download/v3.4.2/win32-x64-46_binding.node</pre>
</div>

&emsp;&emsp;这是因为gulp-sass依赖于node-sass，而由于网络原因，node-sass的服务器无法访问，可以有如下解决方法

&emsp;&emsp;先使用淘宝的镜像安装node-sass

<div>
<pre>npm install  node-sass --sass-binary-site= http://npm.taobao.org/mirrors/node-sass/</pre>
</div>

&emsp;&emsp;再安装gulp-sass

<div>
<pre>npm install gulp-sass</pre>
</div>

&emsp;&emsp;2、安装成功后，也可能无法正确使用。在使用sass编译css文件时，可能会出现'&nbsp;%1 is not a valid win32 application'这样的错误，这是因为gulp-sass依赖于node-sass，而node-sass版本太高，可以安装3.*.*版本，此时，依然要使用淘宝cnpm进行镜像安装

<div>
<pre>cnpm install node-sass@3.11.0</pre>
</div>
<div>
<pre>var gulp = require('gulp'),
    sass = require('gulp-sass');

gulp.task('sass',function(){
&emsp;&emsp;gulp.src('src/sass/*.scss')
    &emsp;&emsp;.pipe(sass().on('error', sass.logError))
    &emsp;&emsp;.pipe(gulp.dest('dist/css')); 
});</pre>
</div>

【autoprefixer】根据设置浏览器版本自动处理浏览器前缀

<div>
<pre>var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer');
gulp.task('css',function(){
&emsp;&emsp;gulp.src('src/css/*.css')
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android &gt;= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            //        transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true 
        }))
        .pipe(gulp.dest('dist/css'))
});</pre>
</div>

&emsp;&emsp;gulp-autoprefixer的**browsers**参数详解

<div>
<pre>last 2 versions: 主流浏览器的最新两个版本
last 1 Chrome versions: 谷歌浏览器的最新版本
last 2 Explorer versions: IE的最新两个版本
last 3 Safari versions: 苹果浏览器最新三个版本
Firefox &gt;= 20: 火狐浏览器的版本大于或等于20
iOS 7: IOS7版本
Firefox ESR: 最新ESR版本的火狐
&gt; 5%: 全球统计有超过5%的使用率</pre>
</div>

【csslint】检测CSS代码

<div>
<pre>var gulp = require('gulp'),
    csslint = require('gulp-csslint');
gulp.task('css',function(){
    gulp.src('src/css/*.css')
    //设置css检测规则，并检测css代码
    .pipe(csslint('.csslintrc'))
    //对代码进行报错提示
    .pipe(csslint.formatter())
});</pre>
</div>

【concat】合并文件

<div>
<pre>var gulp = require('gulp');
var concat = require('gulp-concat');
gulp.task('css', function() {
    gulp.src('src/css/*.css')
        .pipe(concat('all.css'))
        .pipe(gulp.dest('dist/css'));
});</pre>
</div>

**3、HTML相关插件**

【htmlmin】压缩html

<div>
<pre>var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
gulp.task('html', function() {
    gulp.src('*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist/html'));
});</pre>
</div>
<div>
<pre>var gulp = require('gulp'),
    htmlmin = require('gulp-htmlmin');
gulp.task('testHtmlmin', function () {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 &lt;input checked="true"/&gt; ==&gt; &lt;input /&gt;
        removeEmptyAttributes: true,//删除所有空格作属性值 &lt;input id="" /&gt; ==&gt; &lt;input /&gt;
        removeScriptTypeAttributes: true,//删除&lt;script&gt;的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除&lt;style&gt;和&lt;link&gt;的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('src/html/*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist/html'));
});</pre>
</div>

【gulp-wrap】模板文件

&emsp;&emsp;通过gulp-wrap插件可以实现模板的功能，将网站中所有网页重复的部分，提取成布局文件，然后再通过模板字符串的形式对不同的部分加以替换

<div>
<pre>var gulp = require('gulp');
var wrap = require('gulp-wrap');
gulp.task('wrap', function () {
  gulp.src("pages/*.html")
    .pipe(wrap({src:'layout/default.html'}))
    .pipe(gulp.dest("./dist"));
});</pre>
</div>

&emsp;&emsp;常见的需求，是网页的头部和尾部是相同的部分。about.html和index.html的内容如下

<div>
<pre>//about.html
&lt;h1&gt;about&lt;/h1&gt;
//index.html
&lt;h1&gt;index&lt;/h1&gt;</pre>
</div>

&emsp;&emsp;布局文件default.html的内容如下

<div>
<pre>header
&lt;%= contents %&gt;
footer</pre>
</div>

&emsp;&emsp;运行gulp后，生成的组装后的about.html和index.html的文件内容如下

<div>
<pre>//about.html
header
&lt;h1&gt;about&lt;/h1&gt;
footer
//index.html
header
&lt;h1&gt;index&lt;/h1&gt;
footer</pre>
</div>

【merge-link】合并HTML文件中的link和script标签

```
var merge=require('gulp-merge-link');
 
gulp.task('merge', function () {
    gulp.src('./html/index.html')
        .pipe(merge({
            'base.css':['header.css','footer.css','./lib/common.css'],
            'base.js':['lib/jquery.js','header.js']
        }))
        .pipe(gulp.dest('dist/html/'));
});
```
**4、图片相关插件**

【imagemin】压缩图片文件

<div>
<pre>var gulp = require('gulp'),
    imagemin = require('gulp-imagemin');
gulp.task('testImagemin', function () {
    gulp.src('src/img/*.{png,jpg,gif,ico}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});</pre>
</div>
<div>
<pre>var gulp = require('gulp'),
    imagemin = require('gulp-imagemin');
gulp.task('testImagemin', function () {
    gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
});</pre>
</div>

【spritesmith】制作雪碧图

&emsp;&emsp;注意：该插件与别的插件有所不同，它的使用方式是gulp.spritesmith，而不是gulp-spritesmith

<div>
<pre>var gulp = require('gulp');
var spritesmith = require('gulp.spritesmith');
gulp.task('img', function() {
    return gulp.src('src/img/*')
        .pipe(spritesmith({
            'imgName':'sprite.png',
            'cssName':'sprite.css',
            'padding':5 //合并时两张图片的距离
        }))
        .pipe(gulp.dest('dist/img'));
});</pre>
</div>

**5、文件相关插件**

【rename】重命名

<div>
<pre>var gulp = require('gulp');
var rename = require('gulp-rename');
gulp.task('file', function() {
    gulp.src('src/css/all.css')
        .pipe(rename('a.css'))
        .pipe(gulp.dest('dist/css'));
});</pre>
</div>
<div>
<pre>var gulp = require('gulp');
var rename = require('gulp-rename');
gulp.task('file', function() {
    gulp.src('src/css/all.css')
        .pipe(rename(function(path){
            path.basename += "-min";
            path.extname = ".scss"
        }))
        .pipe(gulp.dest('dist/css'));
});</pre>
</div>

【clean】删除文件

<div>
<pre>var gulp = require('gulp');
var clean = require('gulp-clean');
gulp.task('clean', function () {
    return gulp.src('dist/img/*')
        .pipe(clean());
});</pre>
</div>

&emsp;&emsp;注意：由于gulp中的任务是同步的，如果并列写，完全可能出现边编译边删除的情况

<div>
<pre>gulp.task('default', ['clean', 'less', 'images', 'js', 'watch']);//错误</pre>
</div>

&emsp;&emsp;所以需要配置一个异步，非常简单，加个回调

<div>
<pre>//正确
gulp.task('default', ['clean'], function(){
    gulp.start('less', 'images', 'js', 'watch');
});</pre>
</div>

【zip】将文件变成zip压缩文件

&emsp;&emsp;注意：如果gulp.src()的路径设置为'dist/*'，则压缩包只包含dist空文件夹，而不包含实际内容

<div>
<pre>var gulp = require('gulp');
var zip = require('gulp-zip');
gulp.task('file', function() {
    gulp.src('dist/**/*')
        .pipe(zip('project.zip'))
        .pipe(gulp.dest('out'));
});</pre>
</div>

**6、Hash相关插件**

【useref】解析构建块在HTML文件来代替引用未经优化的脚本和样式表

<div>
<pre>//index.html
&lt;!-- build:css /css/all.css --&gt;
&lt;link rel="stylesheet" href="src/css/style1.css"&gt;
&lt;!-- endbuild --&gt;</pre>
</div>
<div>
<pre>var gulp = require('gulp');
var useref = require('gulp-useref');
gulp.task('file', function() {
    gulp.src('*.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});</pre>
</div>
<div>
<pre>//dist/index.html
&lt;link rel="stylesheet" href="/css/all.css"&gt;</pre>
</div>

【rev】给文件名添加hash值

<div>
<pre>//index.html -&gt; index-256e7dc36b.html
var gulp = require('gulp');
var rev = require('gulp-rev');
gulp.task('file', function() {
    gulp.src('*.html')
        .pipe(rev())
        .pipe(gulp.dest('dist'));
});</pre>
</div>

【rev-repalce】重写被gulp-rev重命名的文件名

<div>
<pre>//index.html
&lt;!-- build:css /css/all.css --&gt;
&lt;link rel="stylesheet" href="src/css/style1.css"&gt;
&lt;!-- endbuild --&gt;</pre>
</div>
<div>
<pre>var gulp = require('gulp');
var rev = require('gulp-rev');
var useref = require('gulp-useref');
var revReplace = require('gulp-rev-replace');
gulp.task('file', function() {
    gulp.src('*.html')
        .pipe(useref())
        .pipe(rev())
        .pipe(revReplace())
        .pipe(gulp.dest('dist'));
});</pre>
</div>
<div>
<pre>//index-bc596e88c8.html
&lt;link rel="stylesheet" href="/css/all-ef5462562d.css"&gt;</pre>
</div>

**7、其他插件**

【connect】生成一个服务器

<div>
<pre>var gulp = require('gulp');
var connect = require('gulp-connect');
gulp.task('connect', function() {
    connect.server();
});</pre>
</div>

【babel】将ES6代码编译成ES5

<div>
<pre>var gulp = require('gulp');
var babel = require('gulp-babel');
gulp.task('es6', function(){
    return gulp.src('src/js/*.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('dist/js'));
});</pre>
</div>

【browser-sync】页面自动刷新

&emsp;&emsp;全局安装该插件
```
npm install -g browser-sync
```
&emsp;&emsp;配置代码如下
```
gulp.task('browser-sync', ['css','wrap'], function () {
  browserSync({server: {baseDir: 'dist'}})
});
```
&emsp;&emsp;当然，仅仅这些还不够。还需要在修改HTML或CSS时监控文件修改

&emsp;&emsp;在CSS任务的最后添加如下代码
```
.pipe(gulp.dest('dist/css'))
.pipe(browserSync.reload({ stream: true }));
```
&emsp;&emsp;在HTML模板拼接任务的最后添加如下代码
```
.pipe(gulp.dest("dist/pages"))
.pipe(browserSync.reload({ stream: true }));
```

&nbsp;

### 实际配置

&emsp;&emsp;在实际开发中，并不会直接使用原生javascript进行开发，使用库或框架开发会更高效，以requiejs和jquery的配置为例。项目目录结构如下

![gulp1](https://pic.xiaohuochai.site/blog/utils_build_gulp1.png)

【img】

&emsp;&emsp;将'src/img'中的普通图片压缩保存到'dist/img'中，将'src/img/sprite'中的图片制作雪碧图

<div>
<pre>var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var spritesmith = require('gulp.spritesmith'); 
gulp.task('img', function () {
    //压缩图片
    gulp.src('src/img/*.{png,jpg,gif,ico}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
    //制作雪碧图
    gulp.src('src/img/sprite/*')
        .pipe(spritesmith({
            'imgName':'sprite.png',
            'cssName':'sprite.css',
            'padding':5 
        }))
        .pipe(gulp.dest('src/css/temp'));
&emsp;&emsp;　gulp.src('src/css/temp/sprite.png')
&emsp;&emsp;&emsp;&emsp;　.pipe(gulp.dest('dist/img'));
});
gulp.task('default',['img']);</pre>
</div>

【css】

&emsp;&emsp;css部分由sass编译成对应的css存储在'src/css'中，然后，对css文件进行检测、合并、自动添加前缀、压缩后，存储在'dist/css'中

```
var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleancss = require('gulp-clean-css');
var concat = require('gulp-concat');
var clean = require('gulp-clean');

gulp.task('sass', function () {
  return&emsp;&emsp;gulp.src('src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/css'));
});

gulp.task('css', ['sass'],function () {
  return  gulp.src('src/css/*.css')
    //合并文件
    .pipe(concat('style.css'))
    //根据设置浏览器版本自动处理浏览器前缀
    .pipe(autoprefixer({
      browsers: ['last 2 versions', 'Android >= 4.0']
    }))
    //压缩css文件
    .pipe(cleancss({ compatibility: 'ie8' }))
    //输出到目标目录
    .pipe(gulp.dest('dist/css'));
});


gulp.task('default', ['css']);

```

【js】

&emsp;&emsp;js部分由gulp-requirejs打包为'main.js'之后，进行压缩，最后存储在'dist/js'中，所依赖的框架requirejs和jquery不打包，直接存储在'dist/js'中

```
var gulp = require('gulp');
var requirejs = require('gulp-requirejs');
var uglify = require('gulp-uglify');
gulp.task('js', function() {
    //将js模块打包成一个文件
    return requirejs({
          baseUrl: 'src/js',
          paths:{
            'jquery':'../../dist/js/jquery'
          },
          out:'main.js',
          name: 'main',       
          exclude: ['jquery']
    })
    //压缩文件
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('default',['js']);
```

【版本号】

&emsp;&emsp;为文件设置版本号

<div>
<pre>&lt;!-- build:css dist/css/style.css --&gt;
&lt;link rel="stylesheet" href="dist/css/style.css"&gt;
&lt;!-- endbuild --&gt;</pre>
</div>
<div>
<pre>var gulp = require('gulp');
var rev = require('gulp-rev');
var useref = require('gulp-useref');
var revReplace = require('gulp-rev-replace');
gulp.task('file', function() {
    gulp.src('*.html')
        .pipe(useref())
        .pipe(rev())
        .pipe(revReplace())
        .pipe(gulp.dest(''));
});
gulp.task('default',['file']);</pre>
</div>
<div>
<pre>&lt;link rel="stylesheet" href="dist/css/style-0f788265cc.css"&gt;</pre>
</div>

【监控】

&emsp;&emsp;配置文件如下

<div>
<pre>var gulp = require('gulp');
//image
var imagemin = require('gulp-imagemin');
var spritesmith = require('gulp.spritesmith'); 
gulp.task('img', function() {
   gulp.src('src/img/*.{png,jpg,gif,ico}')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/img'));
    gulp.src('src/img/sprite/*')
        .pipe(spritesmith({
            'imgName':'sprite.png',
            'cssName':'sprite.css',
            'padding':5 
        }))
        .pipe(gulp.dest('src/css/temp'));
&emsp;&emsp;gulp.src('src/css/temp/sprite.png')
        .pipe(gulp.dest('dist/img'));
});
//css
var concat = require('gulp-concat');
var csslint = require('gulp-csslint');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleancss = require('gulp-clean-css');
var concat = require('gulp-concat');
var rename = require("gulp-rename");
gulp.task('sass', function() {
    return  gulp.src('src/css/sass/**/*.scss')
            //将sass编译为css代码
    &emsp;&emsp;.pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css'));       
});
gulp.task('css', ['sass'],function() {    &emsp;&emsp; 
    return&emsp;&emsp;gulp.src('src/css/*.css')
        .pipe(concat('style.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android &gt;= 4.0']
        }))       
        .pipe(cleancss({compatibility: 'ie8'})) 
        .pipe(rename("style.min.css"))
        .pipe(gulp.dest('dist/css')); 
});
//js
var requirejs = require('gulp-requirejs');
var uglify = require('gulp-uglify');
gulp.task('js', function() {
    return requirejs({
          baseUrl: 'src/js',
          paths:{
            'jquery':'../../dist/js/jquery'
          },
          out:'main.js',
          name: 'main',       
          exclude: ['jquery']
    })
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});
//版本号
var rev = require('gulp-rev');
var useref = require('gulp-useref');
var revReplace = require('gulp-rev-replace');
gulp.task('file',['css'],function() {
    gulp.src('*.html')
        .pipe(useref())
        .pipe(rev())
        .pipe(revReplace())
        .pipe(gulp.dest('dist/'));
});
//监控
gulp.task('auto',function(){
    gulp.watch('src/img',['img']);
    gulp.watch('src/css/sass/**/*',['css']);
    gulp.watch('src/js/**/*',['js']);
    gulp.watch('dist/css/style.min.css',['file']);
})
gulp.task('default',['js', 'img', 'file','auto']);</pre>
</div>

&emsp;&emsp;index.html文件内容如下

<div>
<pre>&lt;!DOCTYPE html&gt;
&lt;html lang="en"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Document&lt;/title&gt; 
&lt;script data-main="main" src="js/require.js"&gt;&lt;/script&gt;
&lt;!-- build:css css/style.min.css --&gt;
&lt;link rel="stylesheet" href="dist/css/style.min.css"&gt;
&lt;!-- endbuild --&gt;
&lt;/head&gt;
&lt;body&gt;
&lt;script&gt;
require.config({
    baseUrl:'js',
    paths:{
        'jquery':'../../dist/js/jquery'
    }
});
&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;</pre>
</div>


&nbsp;

### 简易配置

&emsp;&emsp;在调试页面样式，制作简易DEMO，或者仅仅制作不需要JS的页面时，使用的功能是sass转换为CSS，HTML模板拼接，以及修改文件内容实时刷新。下面是简易配置文件的内容

```
var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var cleancss = require('gulp-clean-css');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var browserSync = require('browser-sync');
var wrap = require('gulp-wrap');

gulp.task('sass', function () {
  return&emsp;&emsp;gulp.src('src/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('src/css'))
});
gulp.task('css', ['sass'], function () {
 return   gulp.src('src/css/*.css')
    .pipe(concat('style.css'))
    .pipe(autoprefixer({browsers: ['last 2 versions', 'Android >= 4.0']}))
    .pipe(cleancss({ compatibility: 'ie8' }))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.reload({ stream: true }));
});
gulp.task('wrap', function () {
  return  gulp.src("src/pages/*.html")
    .pipe(wrap({ src: 'src/layout/default.html' }))
    .pipe(gulp.dest("dist/pages"))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('browser-sync', ['css','wrap'], function () {
  browserSync({server: {baseDir: 'dist'}})
});
gulp.task('watch', function () {
  gulp.watch(['src/pages/*.html'], ['wrap']);
  gulp.watch(['src/sass/*.scss'], ['css']);

})
gulp.task('default', ['browser-sync','watch']);
```


