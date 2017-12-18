# PHP错误处理

　　错误处理对于程序开发至关重要，不能提前预测到可能发生的错误，不能提前采取恢复策略，可能导致较差的用户体验。本文将详细介绍PHP的错误处理

　　[注意]关于javascript的错误处理机制[移步至此](http://www.cnblogs.com/xiaohuochai/p/5677490.html)

&nbsp;

### 错误报告

　　PHP程序的错误发生一般归属于下列三个领域：

　　1、语法错误

　　语法错误最常见，并且也容易修复。如：代码中遗漏一个分号。这类错误会阻止脚本的执行

　　2、运行时错误

　　这种错误一般不会阻止PHP脚本的执行，但会阻止当前要做的事情。输出一条错误，但php脚本继续执行

　　3、逻辑错误

　　这种错误最麻烦，既不阻止脚本执行，也不输出错误消息

　　[注意]若将php.ini配置文件中的display_errors从默认的on设置为off，将不显示任何错误

　　在PHP脚本中可调用ini_set()函数，动态设置php.ini配置文件

<div class="cnblogs_code">
<pre>ini_set("display_errors","On"); //显示所有错误信息</pre>
</div>

![error1](https://pic.xiaohuochai.site/blog/php_common_error1.jpg)

&nbsp;

### 错误级别

![error2](https://pic.xiaohuochai.site/blog/php_common_error2.jpg)

　　实际上，表格中的13个错误类型可以分为3类：注意级别、警告级别和错误级别。一般地，在开发过程中，忽略注意级别的错误

<div class="cnblogs_code">
<pre>&lt;?php
    getType($a);//未定义变量，注意级别
    echo "1111111111111111&lt;br&gt;";
    getType();//未传入参数，警告级别
    echo "222222222222222222222&lt;br&gt;";
    getType3();//函数名错误，错误级别
    echo "333333333333333333333&lt;br&gt;";
?&gt;</pre>
</div>

![error3](https://pic.xiaohuochai.site/blog/php_common_error3.jpg)

### 错误处理

1、第一种错误处理方法是修改配置文件

![error4](https://pic.xiaohuochai.site/blog/php_common_error4.jpg)

　　错误级别默认为提示所有级别的错误：error_reporting = E_ALL

　　把error_reporting = E_ALL改为error_reporting = E_ALL &amp; ~E_NOTICE 表示不提示注意级别的错误。然后，重启服务生效

<div class="cnblogs_code">
<pre>error_reporting = E_ALL &amp; ~E_NOTICE    抛出任何非注意的错误，默认值
error_reporting = E_ERROR | E_PARSE | E_CORE_ERROR    只考虑致命的运行时错误、新解析错误和核心错误
error_reporting = E_ALL &amp; ~(E_USER_ERROR | E_USER_WARNING | E_USER_NOTICE)    报告除用户导致的错误之外的所有错误</pre>
</div>

2、第二种错误处理方法是使用错误处理函数

　　在PHP脚本可以通过error_reporting( )函数动态设置错误报告级别

<div class="cnblogs_code">
<pre>&lt;?php
    error_reporting(E_ALL &amp; ~E_NOTICE);
    getType($a);//注意级别
    echo "1111111111111111&lt;br&gt;";
    getType();//警告级别
    echo "222222222222222222222&lt;br&gt;";
    getType3();//错误级别
    echo "333333333333333333333&lt;br&gt;";
?&gt;</pre>
</div>

![error5](https://pic.xiaohuochai.site/blog/php_common_error5.jpg)

<div>&nbsp;</div>

### 自定义错误处理

　　自定义错误报告的处理方式，可以完全绕过标准的PHP错误处理函数，这样就可以按自己定义的格式打印错误报告，或改变错误报告打印的位置，以下几种情况可以考虑自定义错误处理：1、记下错误的信息，及时发现一些生产环境出现的问题；2、屏蔽错误；3、控制错误的输出; 4、作为调试工具

　　使用set_error_handler()函数来设置用户自定义错误处理

<div class="cnblogs_code">
<pre>&lt;?php
    //error_reporting(E_ALL &amp; ~E_NOTICE);
    //在php中注册一个函数来处理错误报告，替代默认的方式
    set_error_handler("myerrorfun");
    $mess = "";
    //自定义错误报告处理函数
    function myerrorfun($error_type, $error_message, $error_file, $error_line) {
        global $mess;
        $mess.="发生错误级别为{$error_type}类型, 错误消息&lt;b&gt;{$error_message}&lt;/b&gt;, 在文件&lt;font style='color:red'&gt;{$error_file}&lt;/font&gt;中， 第{$error_line}行。&lt;br&gt;";    
    }
    getType($a);
    echo "1111111111111111&lt;br&gt;";
    getType();
    echo "222222222222222222222&lt;br&gt;";
    echo "--------------------------------------------&lt;br&gt;";
    echo $mess;
?&gt;</pre>
</div>

![error6](https://pic.xiaohuochai.site/blog/php_common_error6.jpg)

<div>&nbsp;</div>

### 错误日志

　　一般地，程序都会保存错误日志，用来记录程序运行时的错误信息。且错误日志都有其默认的存储位置。对于错误信息和错误日志的位置，我们都可以进行修改

　　在PHP.ini配置文件中，有以下几项可以对错误日志进行设置

<div class="cnblogs_code">
<pre>error_reporting = E_ALL  //将向PHP发送每个错误
display_errors=Off       //不显示错误报告
log_errors=On            //决定日志语句记录的位置
log_errors_max_log=1024  //每个日志项的最大长度
error_log=G:/myerror.log //指定错误写进的文件</pre>
</div>

　　在php文件中，我们可以使用函数error_log()来自定义错误信息

<div class="cnblogs_code">
<pre>&lt;?php
error_log("登录失败了！");
?&gt;</pre>
</div>

![error7](https://pic.xiaohuochai.site/blog/php_common_error7.jpg)

&nbsp;

### 异常处理

　　异常(Exception)处理用于在指定的错误发生时改变脚本的正常流程，是PHP5中的一个新的重要特性。异常处理是一种可扩展、易维护的错误处理机制，并提供了一种新的面向对象的错误处理方式

<div class="cnblogs_code">
<pre>try{  
    使用try去包含可能会发生异常的代码
    一旦出现异常try进行捕获异常，交给catch处理。
    抛出异常语句：throw 异常对象。
}catch（异常对象参数）{
    在这里做异常处理。
}[catch(。，，){
    .. .. ..
}]</pre>
</div>
<div class="cnblogs_code">
<pre>&lt;?php
    try {
        $error = 'Always throw this error';
        throw new Exception($error);   
        //创建一个异常对象，通过throw语句抛出
        echo 'Never executed';         
        //从这里开始，try代码块内的代码将不会再被执行
    } catch (Exception $e) {
        echo &lsquo;Caught exception: &rsquo;.$e-&gt;getMessage()."\n"; //输出捕获的异常消息
    }
    echo 'Hello World'; //程序没有崩溃继续向下执行
?&gt;</pre>
</div>

&nbsp;

### 自定义异常

　　用户可以用自定义的异常处理类来扩展PHP内置的异常处理类。以下的代码说明了在内置的异常处理类中，哪些属性和方法在子类中是可访问和可继承的

<div class="cnblogs_code">
<pre>&lt;?php
class Exception
{
    protected $message = 'Unknown exception';   // 异常信息
    private   $string;                          // __toString cache
    protected $code = 0;                        // 用户自定义异常代码
    protected $file;                            // 发生异常的文件名
    protected $line;                            // 发生异常的代码行号
    private   $trace;                           // backtrace
    private   $previous;                        // previous exception if nested exception
    public function __construct($message = null, $code = 0, Exception $previous = null);
    final private function __clone();           // Inhibits cloning of exceptions.
    final public  function getMessage();        // 返回异常信息
    final public  function getCode();           // 返回异常代码
    final public  function getFile();           // 返回发生异常的文件名
    final public  function getLine();           // 返回发生异常的代码行号
    final public  function getTrace();          // backtrace() 数组
    final public  function getPrevious();       // 之前的 exception
    final public  function getTraceAsString();  // 已格成化成字符串的 getTrace() 信息
    // Overrideable
    public function __toString();               // 可输出的字符串
}
?&gt;</pre>
</div>

　　[注意]如果使用自定义的类来扩展内置异常处理类，并且要重新定义构造函数的话，建议同时调用parent::__construct()来检查所有的变量是否已被赋值。当对象要输出字符串的时候，可以重载__toString() 并自定义输出的样式

<div class="cnblogs_code">
<pre>&lt;?php
    /* 自定义的一个异常处理类，但必须是扩展内异常处理类的子类 */
    class MyException extends Exception{
        //重定义构造器使第一个参数 message 变为必须被指定的属性
        public function __construct($message, $code=0){
            //可以在这里定义一些自己的代码
         //建议同时调用 parent::construct()来检查所有的变量是否已被赋值
            parent::__construct($message, $code);
        }    
        public function __toString() {        
          //重写父类方法，自定义字符串输出的样式
          return __CLASS__.":[".$this-&gt;code."]:".$this-&gt;message."&lt;br&gt;";
        }
        public function customFunction() {    
             //为这个异常自定义一个处理方法
             echo "按自定义的方法处理出现的这个类型的异常&lt;br&gt;";
        }
    }
?&gt;</pre>
</div>
<div class="cnblogs_code">
<pre>&lt;?php
   try { //使用自定义的异常类捕获一个异常，并处理异常
        $error = '允许抛出这个错误';       
        throw new MyException($error);    
             //创建一个自定义的异常类对象，通过throw语句抛出
        echo 'Never executed'; 
            //从这里开始，try代码块内的代码将不会再被执行
    } catch (MyException $e) {        //捕获自定义的异常对象
        echo '捕获异常: '.$e;        //输出捕获的异常消息
        $e-&gt;customFunction();  //通过自定义的异常对象中的方法处理异常
    }
    echo '你好呀';              //程序没有崩溃继续向下执行
?&gt;</pre>
</div>
