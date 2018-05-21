# 前端学PHP之会话Session

&emsp;&emsp;Session技术和Cookie相似，都是用来储存使用者的相关资料。但最大的不同之处在于Cookie是将数据存放在客户端的计算机之中，而Session则是将数据存放于服务器系统之下。Session的中文意思是会话，在Web系统中，通常是指用户与Web系统的对话过程。本文将详细介绍Session的内容

 

&nbsp;

### Session ID

&emsp;&emsp;在Web技术发展史上，虽然Cookie技术的出现是一个重大的变革，但Cookie是在客户端的计算机中保存资料，所以引起了一个争议。用户有权阻止Cookie的使用，使Web服务器无法通过Cookie来跟踪用户信息。而Session技术是将使用者相关的资料存放在服务器的系统之下，所以使用者无法停止Session的使用

&emsp;&emsp;Session在客户端仅需要保存由服务器为用户创建的一个Session标识符，称为Session ID，而在服务器端(文件或数据库或MemCache中)保存Session变量的值。Session ID是一个既不会重复，又不容易被找到规律的，由32位16进制数组成的字符串

![](https://pic.xiaohuochai.site/blog/php_session1.png)

&emsp;&emsp;Session ID会保存在客户端的Cookie中，如果用户阻止Cookie的使用，则可以将Session ID保存在用户浏览器地址栏的URL中。当用户请求Web服务器时，就会把Session ID发送给服务器，再通过Session ID提取保存在服务器中的Session变量。可以把Session中保存的变量，当做是这个用户的全局变量，同一个用户对每个脚本的访问都共享这些变量

&emsp;&emsp;当某个用户向Web服务器发出请求时，服务器首先会检查这个客户端的请求里是否已经包含了一个Session ID。如果包含，说明之前已经为此用户创建过Session，服务器则按该Session ID把Session检索出来使用。如果客户端请求不包含Session ID，则为该用户创建一个Session，并且生成一个与此Session相关联的Session ID，在本次响应中被传送给客户端保存

【session_start()】

&emsp;&emsp;用户向Web服务器发出请求时，必须首先使用session_start()函数来启动新会话或者重用现有会话，成功开始会话返回TRUE，反之返回FALSE
```
bool session_start ([ array $options = [] ] )
```
&emsp;&emsp;因为基于Cookie的Session是在开启的时候，调用session_start()函数会生成一个唯一的SessionID，需要保存在客户端电脑的Cookie中，和setCookie()函数一样，调用之前不能有任何的输出，空格或空行也不行

&emsp;&emsp;如果已经开启过Session，再次调用Session_start()函数时，不会再创建个新的Session ID。因为当用户再次访问服务器时，该函数会通过从客户端携带过来的Session ID，返回已经存在的Session。所以在会话期间，同一个用户在访问服务器上任何一个页面时，都是使用同一个 Session ID
```
session_start();
```

![](https://pic.xiaohuochai.site/blog/php_session2.png)

&emsp;&emsp;而且，使用session_start()方法会在服务器端建立一个同名的Session文件(文本文件)


&emsp;&emsp;如果不想在每个脚本都使用Session_start()函数来开启Session，可以在php.ini里设置"session.auto_start=1"，则无须每次使用Session之前都要调用session_start()函数。但启用该选项也有一些限制，则不能将对象放入Session中，因为类定义必须在启动Session之前加载。所以不建议使用php.ini中的session.auto_start属性来开启Session

 

&nbsp;

### 读写session

&emsp;&emsp;使用session_start()方法启动session会话后，要通过访问$_SESSION数组来读写session。和$_POST、$_GET、$_COOKIE类似，$_SESSION也是超全局数组

&emsp;&emsp;使用$_SESSION数组将数据存入同名Session文件中
```
<?php
session_start();
$_SESSION['username'] = 'huochai';
$_SESSION['age'] = 28;
?>
```
&emsp;&emsp;同名Session文件可以直接使用文本编辑器打开，该文件的内容结构如下所示：
```
变量名|类型:长度:值;
```
```
<?php
session_start();
print_r ($_SESSION);//Array ( [username] => huochai [age] => 28 )
?>
```
&emsp;&emsp;Session变量会被保存在服务器端的某个文件中，该文件的位置是通过php.ini文件，在session.save_path属性指定的目录下

 

&nbsp;

### 配置Session

&emsp;&emsp;在PHP配置文件php.ini中，有一组和Session相关的配置选项。通过对一些选项重新设置新值，就可以对Session进行配置，否则使用默认的Session配置
```
phpinfo();
```

![](https://pic.xiaohuochai.site/blog/php_session3.png)

```
session.auto_start=0;在请求启动时初始化session
session.cache_expire=180;设置缓存中的会话文档在n分钟后过时
session.cookie_lifetime=0;设置cookie保存时间(s)，相当于设置Session过期时间，为0时表示直到浏览器被重启
session.cookie_path=/;cookie的有效路径
session.cookie_domain=;cookie的有效域
session.name=PHPSESSID;用在cookie里的session的名字
session.save_handler=files;用于保存/取回数据的控制方式
session.save_path=/tmp;在save_handler设为文件时传给控制器的参数，这是数据文件将保存的路径.
session.use_cookies=1;是否使用cookies
```
 

&nbsp;

### 销毁Session

&emsp;&emsp;当使用完一个Session变量后，可以将其删除，当完成一个会话后，也可以将其销毁。如果用户想退出Web系统，就需要提供一个注销的功能，把所有信息在服务器中销毁。销毁和当前Session有关的所有的资料，可以调用session_destroy()函数结束当前的会话，并清空会话中的所有资源

【session_destroy()】
```
bool session_destroy ( void )
```
&emsp;&emsp;session_destroy()销毁当前会话中的全部数据，删除同名Session文件，但是不会重置当前会话所关联的全局变量，也不会重置会话cookie。如果需要再次使用会话变量，必须重新调用session_start()函数
```
<?php
session_start();
session_destroy();
?>
```

![](https://pic.xiaohuochai.site/blog/php_session4.png)

&emsp;&emsp;可以使用unset()函数来释放在Session中注册的单个变量
```
print_r ($_SESSION);//'Array ( [username] => huochai [age] => 28 )'
unset($_SESSION['username']);
unset($_SESSION['age']);
print_r ($_SESSION);//'Array()'
```

&emsp;&emsp;注意：不要使用unset($_SESSION)删除整个$_SESSION数组，这样将不能再通过$_SESSION超全局数组注册变量了

&emsp;&emsp;如果想把某个用户在Session中注册的所有变量都删除，可以直接将数组变量$_SESSION赋值为一个空数组
```
$_SESSION=array();  
```  
&emsp;&emsp;PHP默认的Session是基于Cookie的，Session ID被服务器存储在客户端的Cookie中，所以在注销Session时也需要清除Cookie中保存的SessionID，而这就必须借助setCookie()函数完成。在Cookie中，保存Session ID的Cookie标识名称就是Session的名称，这个名称是在php.ini中，通过session.name属性指定的值。在PHP脚本中，可以通过调用session_name()函数获取Session名称。删除保存在客户端Cookie中的Session ID
```
if(isset($_COOKIE[session_name()])) {
    setCookie(session_name(),'',time()-3600);
}
```
&emsp;&emsp;通过前面的介绍可以总结出来，Session的注销过程共需要四个步骤

```
<?php
//第一步：开启Session并初始化
session_start();

//第二步：删除所有Session的变量，也可用unset($_SESSION[xxx])逐个删除
$_SESSION = array();

//第三步：如果使用基于Cookie的Session，使用setCooike()删除包含Session Id的Cookie
if (isset($_COOKIE[session_name()])) {
    setcookie(session_name(),'', time()-42000);
}

//第四步：最后彻底销毁Session，删除服务器端保留session信息的文件
session_destroy();
?>
```
 

&nbsp;

### 自动回收

&emsp;&emsp;如果没有通过上述步骤销毁Session，而是直接关闭浏览器，或断网等情况，在服务器端保存的Session文件是不会被删除的。因为在php.ini配置文件中，默认的session.cookie_lifetime=0，表示Session ID在客户端Cookie的有效期限为直到关闭浏览器。Session ID消失了，但服务器端保存的Session文件并没有被删除。所以，没有被Session ID关联的服务器端Session文件成为了垃圾，而系统则提供了自动清理的机制

&emsp;&emsp;服务器保存的Session文件是普通文本文件，都有文件修改时间。通过在php.ini配置文件中设置session.gc_maxlifetime选项来设置一个到期时间(默认为1440秒，即24分钟)。垃圾回收程序在所有Session文件中排查出大于24分钟的文件。如果用户还在使用该文件，那么这个Session文件的修改时间就会被更新，将不会被排查到

&emsp;&emsp;排除出来后，并不会立刻清理垃圾，而是根据配置文件php.info中session.gc_probability/session.gc_divisor这两个值的比例来决定何时清理，默认值是1/100。表示排查100次，才有一次可能会启动垃圾回收机制，来自动回收垃圾。当然，这个值是可以修改的，但还是要兼顾服务器的运行性能和存储空间

 

&nbsp;

### 传递session

&emsp;&emsp;使用Session跟踪一个用户，是通过在各个页面之间传递唯一的Session ID，并通过Session ID提取这个用户在服务器中保存的Session变量。常见的Session ID传送方法有以下两种

&emsp;&emsp;1、基于Cookie的方式传递Session ID。这种方法更优化，但由于不总是可用，因为用户在客户端可以屏蔽Cookie

&emsp;&emsp;2、通过URL参数进行传递，直接将会话ID嵌入到URL中去

&emsp;&emsp;在Session的实现中通常都是采用基于Cookie的方式，客户端保存的Session ID就是一个Cookie。当客户禁用Cookie时，Session ID就不能再在Cookie中保存，也就不能在页面之间传递，此时Session失效。不过PHP5在Linux平台可以自动检查Cookie状态，如果客户端将它禁用，则系统自动把Session ID附加到URL上传送。而使用Windows系统作为Web服务器则无此功能

【通过Cookie传递Session ID】

&emsp;&emsp;如果客户端没有禁用Cookie，则在PHP脚本中通过session_start()函数进行初始化后，服务器会自动发送HTTP标头将Session ID保存到客户端电脑的Cookie中
类似于下面的设置方式
```
//虚拟向Cookie中设置Session ID的过程
setCookie(session_name(),session_id(),0,'/')
```
&emsp;&emsp;第一个参数中调用session_name()函数，返回当前Session的名称作为Cookie的标识名称。Session名称的默认值为PHPSESSID，是在php.ini文件中由session.name选项指定的值。也可以在调用session_name()函数时提供参数改变当前Session的名称
```
echo session_name();//PHPSESSID
```
&emsp;&emsp;第二个参数中调用session_id()函数，返回当前Session ID作为Cookie的值。也可以通过调用session_id()函数时提供参数设定当前Session ID
```
echo session_id();//kstvdmae177qqk6jgvg6td12l1
```
&emsp;&emsp;第三个参数的值0，是通过在php.ini文件中由session.cookiejifetime选项设置的值。默认值为0，表示SessIon ID将在客户机的Cookie中延续到浏览器关闭

&emsp;&emsp;最后一个参数'/'，也是通过PHP配置文件指定的值，在php.ini中由session.cookie.path选项设置的值。默认值为'/'，表示在Cookie中要设置的路径在整个域内都有效

&emsp;&emsp;如果服务器成功将Session ID保存在客户端的Cookie中，当用户再次请求服务器时，就会把Session ID发送回来。所以当在脚本中再次使用session_start()函数时，就会根据Cookie中的Session ID返回已经存在的Session

【通过URL传递Session ID】

&emsp;&emsp;如果客户浏览器支持Cookie，就把Session ID作为Cookie保存在浏览器中。但如果客户端禁止Cookie的使用，浏览器中就不存在作为Cookie的Session ID，因此在客户请求中不包含Cookie信息。如果调用session_start()函数时，无法从客户端浏览器中取得作为Cookie的Session ID，则又创建了一个新的Session ID，也就无法跟踪客户状态。因此，每次客户请求支持Session的PHP脚本，session_start()函数在开启Session时都会创建一个新的Session，这样就失去了跟踪用户状态的功能

&emsp;&emsp;如果客户浏览器不支持Cookie，PHP则可以重写客户请求的URL，把Session ID添加到URL信息中。可以手动地在每个超链接的URL中都添加一个Session ID，但工作量比较大，不建议使用这种方式。如下所示：
```
<?php
    session_start();
    echo '<a href="demo.php?'.session_name().'='.session_id() .'">链接演示</a>';
?>
```
&emsp;&emsp;在使用Linux系统做服务器时，并且选用PHP4.2以后的版本，则在编辑PHP时如果使用了-enable-trans-sid配置选项，和运行时选项session.use_trans_sid都被激活，在客户端禁用Cookie时，相对URL将被自动修改为包含会话ID。如果没有这么配置，或者使用Windows系统作为服务器时，可以使用常量SID。该常量在会话启动时被定义，如果客户端没有发送适当的会话Cookie，则SID的格式为session_name=session_id，否则就为一个空字符串。因此可以无条件地将其嵌入到URL中去。如下所示
```
//当阻止cookie时，SID返回'PHPSESSID=p2qouo8hjarul0a0ii5jmocmc0'，否则返回一个空字符串
echo SID;
```
```
<?php
    session_start();
    $_SESSION["usemame"]="admin";
    echo "Session ID:".session_id()."<br>";
?>
<a href="test2.php?<?php echo SID ?>">通过URL传递Session ID</a>
```
&emsp;&emsp;如果使用Linux系统作为服务器，并配置好相应的选项，就不用手动在每个URL后面附加SID，相对URL将被自动修改为包含Session ID。但要注意，非相对的URL被假定为指向外部站点，因此不能附加SID。因为这可能是个安全隐患，会将SID泄露给不同的服务器

 

&nbsp;

### 自定义Session

&emsp;&emsp;在系统中使用Session技术跟踪用户时，Session默认的处理方式是使用Web服务器中的文件来记录每个用户的会话信息，通过php.ini中的session_save_path创建会话数据文件的路径。这种默认的处理方式虽然很方便，但也有一些缺陷。例如，登录用户如果非常大，文件操作的I/O开销就会很大，会严重影响系统的执行效率。另外，最主要的是本身的session机制不能跨机，因为对于访问量比较大的系统，通常都是采用多台web服务器进行并发处理，如果每台web服务器都各自独立地处理Session，就不可能达到跟踪用户的目的。这时就需要改变session的处理方式，常见的跨机方法就是通过自定义session的存储方式，可以将session信息使用NFS或SAMBA等共享技术保存到其他服务器中，或使用数据库来保存session信息，最优的方式是使用memcached来进行session存储

&emsp;&emsp;无论是用memcached、数据库、还是通过NFS或SAMBA共享session信息，其原理是一样的，都是通过PHP中的session_set_save_handler()函数来改变默认的处理方式，指定回调函数来自定义处理
```
Session_set_save_hander(callback open,callback close,call read,callback write,callback destro,callback gc);
```
&emsp;&emsp;该函数共需要6个回调函数作为必选参数，分别代表了Session生命周期中的6个过程，用户通过自定义每个函数，来设置Session生命周期中每个环节的信息处理

&emsp;&emsp;回调函数的执行时机如下所示

```
回调函数        描述 
open          运行session_start()时执行，该函数需要声明两个参数，系统自动将php.ini中的session_save_path选项值传递给该函数的第一个参数，将Session名自动传递给第二个参数中，返回true则可以继续向下执行
close         该函数不需要参数，在脚本执行完成或调用session_write_close()、session_destroy()时被执行，即在所有session操作完成后被执行。如果不需要处理，则直接返回true即可 
read          在运行session_start()时执行，因为在开启会话时，会read当前session数据并写入$_SESSION变量。需要声明一个参数，系统会自动将Session ID传递给该函数，用于通过Session ID获取对应的用户数据，返回当前用户的会话信息写入$_SESSION变量
write         该函数在脚本结束和对$_SESSION变量赋值数据时执行。需要声明两个参数，分别是Session ID和串行化后Session信息字符串。在对$_SESSION变量赋值时，就可以通过Session ID找到存储的位置，并将信息写入。存储成功可以返回true继续向下执行
destroy       在运行session_destroy()时执行，需要声明一个参数，系统会自动将Session ID传递给该函数，去删除对应的会话信息
gc            垃圾回收程序启动时执行。需要声明一个参数，系统自动将php.ini中的session_gc_maxlifetime选项值传给该函数，用于删除超过这个时间的Session信息，返回true则可以继续向下执行
```
&emsp;&emsp;在运行session_start()时分别执行了open(启动会话)、read(读取session数据至$_SESSION)和gc(清理垃圾)，脚本中所有对$_SESSION的操作均不会调用这些回调函数。在调用session_destroy()函数时，执行destroy销毁当前session(一般是删除相应的记录或文件)，但此回调函数销毁的只是Session的数据，此时如果输出$_SESSION变量，仍然有值，但此值不会再close后被写回去。在调用session_write_close()函数时执行write和close，保存$_SESSION至存储，如果不手工使用此方法，则会在脚本结束时被自动执行

&emsp;&emsp;注意：session_set_save_hander()函数必须在php.ini中设置session_save_hander选项的值为”user”时(用户自定义处理器)，才会被系统调用

```
<?php
    $sess_save_path ="";
    function open($save_path,$session_name){
        global $sess_save_path; 
        $sess_save_path = $save_path;
        return true; 
    }  
    function close(){
        return true; 
    }
    function read($id){
        global $sess_save_path;  
        $sess_file ="{$sess_save_path}/sess_{$id}"; 
        return (string) @file_get_contents($sess_file); 
    }
    function write($id,$sess_data){
        global $sess_save_path;  
        $sess_file ="{$sess_save_path}/sess_{$id}"; 
        if($fp=@fopen($sess_file,"w")){   
            $return = fwrite($fp,$sess_data);
            fclose($fp); 
            return $return; 
        }else{  
            return false; 
        } 
    }  
    function destroy($id){ 
        global $sess_save_path;  
        $sess_file ="{$sess_save_path}/sess_{$id}"; 
        return (@unlink($sess_file)); 
    }   
    function gc($maxlifetime){  
        global $sess_save_path;     
        foreach(glob("{$sess_save_path}/sess_*") as $filename){ 
            if(filemtime($filename) + $maxlifetime <time() ){ 
                @unlink($filename); 
            } 
        }   
        return true; 
    } 
    session_set_save_hander(“open","close","read","write","destroy","gc");
    session_start();
?>
```
 

&nbsp;

### 数据库处理

&emsp;&emsp;如果网站访问量非常大，需要采用负载均衡技术搭载多台Web服务器协同工作，就需要进行Session同步处理。使用数据库处理Session会比使用NFS及SAMBA更占优势，可以专门建立一个数据库服务器存放Web服务器的Session信息，当用户不管访问集群中的哪个Web服务器，都会去这个专门的数据库，访问自己在服务器端保存的Session信息，以达到Session同步的目的。另外，使用数据库处理Session还可以给我们带来很多好处，比如统计在线人数等。如果mysql也做了集群，每个mysql节点都要有这张表，并且这张Session表的数据要实时同步

&emsp;&emsp;在使用默认的文件方式处理Session时，有3个比较重要的属性，分别是文件名称、文件内容及文件的修改时间：通过文件名称中包含的Session ID，用户可以找到自己在服务器端的Session文件；通过文件内容用户可以在各个脚本中存取$_session变量；通过文件的修改时间则可以清除所有过期的Session文件。所以使用数据表处理Session信息，也最少要有这三个字段(Session ID、修改时间、Session内容信息)，当然如果考虑更多的情况，例如，用户改变了IP地址，用户切换了浏览器等，还可以再自定义一些其他字段。下面为Session设计的数据表结构包含5个字段，创建保存Session信息表session的SQL语句如下所示：

```
CREATE TABLE session(
    sid CHAR(32) NOT NULL DEFAULT '',
    update INT NOT NULL DEFAULT 0,
    client_ip CHAR(15) NOT NULL DEFAULT '',
    user_agent CHAR(200) NOT NULL DEFAULT '',
    data TEXT,
    PRIMARY KEY(sid)
);
```
&emsp;&emsp;数据表session创建成功后，再通过自定义的处理方式，将Session信息写入到数据库中

```
<?php
class DBSession {
    public static $pdo;             //pdo的对象
    public static $ctime;           //当前时间
    public static $maxlifetime;     //最大的生存时间
    public static $uip;             //用户正在用的ip
    public static $uagent;          //用户正在用的浏览器

    //开启和初使化使用的, 参数需要一个路
    public static function start(PDO $pdo) {
        
        self::$pdo = $pdo;
        self::$ctime = time();
        self::$maxlifetime = ini_get("session.gc_maxlifetime");
        self::$uip = !empty($_SERVER['HTTP_CLIENT_IP']) ? $_SERVER['HTTP_CLIENT_IP'] : (!empty($_SERVER['HTTP_X_FORWARDED_FOR']) ? $_SERVER['HTTP_X_FORWARDED_FOR'] : (!empty($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : "") );

        filter_var(self::$uip, FILTER_VALIDATE_IP) && self::$uip = '';
        self::$uagent = !empty($_SERVER['HTTP_USER_AGENT']) ? $_SERVER['HTTP_USER_AGENT'] : "" ;

        //注册过程， 让PHP自己处理session时，找这个函数指定的几个周期来完成
        session_set_save_handler(
            array(__CLASS__, "open"), 
            array(__CLASS__,"close"),
            array(__CLASS__, "read"), 
            array(__CLASS__, "write"),
            array(__CLASS__, "destroy"), 
            array(__CLASS__,"gc"));
        session_start();  //开启会话
    }

    // 开启时， session_start()
    public static function open($path, $name) {
        return true;
    }

    //关闭
    public static  function close() {
        return true;
    }

    //读取 echo $_SESSION['username'] 
    public static  function read($sid) {
        $sql = "select * from session where sid = ?";
        $stmt = self::$pdo -> prepare($sql);
        $stmt -> execute(array($sid));
        $result = $stmt -> fetch(PDO::FETCH_ASSOC);
        //如果还没有会话信息，返回空字符串
        if(!$result) {
            return '';
        }
        //如果超出时间，销毁session
        if($result['utime'] + self::$maxlifetime < self::$ctime) {
            self::destroy($sid);
            return '';
        }
        //如果用户换了ip或换了浏览器
        if($result['uip'] != self::$uip || $result['uagent'] != self::$uagent) {
            self::destroy($sid);
            return '';
        }
        return $result['sdata'];

    }

    //写入 $_SESSION['username'] = "meizi";
    public static  function write($sid, $data) {

        //通过sid获取已经有的数据
        $sql = "select * from session where sid = ?";
        $stmt = self::$pdo->prepare($sql);
        $stmt -> execute(array($sid));
        $result = $stmt -> fetch(PDO::FETCH_ASSOC);
        
        //如果已经获取到了数据，就不插入而更新
        if($result) {
            //如果数据和原来的不同才更新
            if($result['sdata'] != $data || $result['utime']+10 < self::$ctime) {
                $sql = "update session set sdata = ?, utime = ? where sid=?";
                $stmt = self::$pdo->prepare($sql);
                $stmt -> execute(array($data, self::$ctime, $sid));
            }

        //如果没有数据，就新插入一条数据
        } else {
        
            if(!empty($data)) {
                $sql = "insert into session(sid, sdata, utime, uip, uagent) values(?, ?, ?, ?, ?)";
                $stmt = self::$pdo -> prepare($sql);
                $stmt -> execute(array($sid, $data, self::$ctime, self::$uip, self::$uagent));
            }
        }

    }

    //销毁 session_destroy() 
    public static  function destroy($sid) {
        $sql = "delete from session where sid=?";
        $stmt = self::$pdo->prepare($sql);
        return $stmt -> execute(array($sid)); 
    }

    //回收垃圾
    public static  function gc($maxlifetime) {
        //    utime < ctime - self::$maxlifetime
        $sql = "delete from session where utime < ?";
        $stmt = self::$pdo->prepare($sql);
        return $stmt -> execute(array(self::$ctime - self::$maxlifetime));     
    }
}
    //开启
    DBSession::start($pdo);
```
 

&nbsp;

### memcached处理

&emsp;&emsp;用数据库来同步Session会加大数据库的负担，因为数据库本来就是容易产生瓶颈的地方，但如果采用MemCache来处理Session是非常合适的，因为MemCache的缓存机制和Session非常相似。另外，MemCach可以做分布式，能够把Web服务器中的内存组合起来，成为一个”内存池”，不管是哪个服务器产生的Session，都可以放到这个“内存池”中，其他的Web服务器都可以使用。以这种方式来同步Session，不会加大数据库的负担，并且安全性也要比使用Cookie高。把session放到内存里面，读取也要比其他处理方式快很多

&emsp;&emsp;自定义使用memcached处理session信息，和自定义数据库的处理方式相同，但要简单得多，因为MemCache的工作机制和Session技术很相似

```
<?php

class MemSession {
    public static $mem;             //pdo的对象
    public static $maxlifetime;     //最大的生存时间

    public static function start(Memcache $mem) {    
        self::$mem = $mem;    
        self::$maxlifetime = ini_get("session.gc_maxlifetime");
    
        //注册过程， 让PHP自己处理session时，按照这个函数指定的几个周期来完成
        session_set_save_handler(
            array(__CLASS__, "open"), 
            array(__CLASS__,"close"),
            array(__CLASS__, "read"), 
            array(__CLASS__, "write"),
            array(__CLASS__, "destroy"), 
            array(__CLASS__,"gc"));
        session_start();  //开启会话
    }

    // 开启时，session_start()
    public static function open($path, $name) {
        return true;
    }

    //关闭
    public static  function close() {
        return true;
    }

    //读取 echo $_SESSION['username'] 
    public static  function read($sid) {
        $data = self::$mem -> get($sid);
        if(empty($data)) {
            return '';
        }
        return $data;
    }

    //写入
    public static  function write($sid, $data) {
        self::$mem -> set($sid, $data, MEMCACHE_COMPRESSED, self::$maxlifetime);
    }

    //销毁 session_destroy() 
    public static  function destroy($sid) {
        self::$mem -> delete($sid, 0);

    }

    //回收垃圾
    public static  function gc($maxlifetime) {
        return true;    
    }
}
    //创建对象
    $mem = new Memcache();
    //添加两台memcache服务器
    $mem -> addServer("localhost", 11211);
    $mem -> addServer("192.168.1.3", 11211);
    //开启
    MemSession::start($mem);
?>
```