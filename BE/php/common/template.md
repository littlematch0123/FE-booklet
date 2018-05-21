# 前端学PHP之自定义模板引擎

&emsp;&emsp;在大多数的项目组中，开发一个Web程序都会出现这样的流程：计划文档提交之后，前端工程师制作了网站的外观模型，然后把它交给后端工程师，它们使用后端代码实现程序逻辑，同时使用外观模型做成基本架构，然后工程被返回到前端工程师继续完善。就这样工程可能在后端工程师和前端工程师之间来来回回好几次。由于后端工程师不干预任何相关HTML标签，同时也不需要前端代码和后端代码混合在一起。前端工程师只需要配置文件，动态区块和其他的界面部分，不必要去接触那些错综复杂的后端代码。因此，这时候有一个很好的模板支持就显得很重要了。本文将详细介绍PHP中的模板引擎

 

&nbsp;

### 概述

&emsp;&emsp;什么是网站模板？准确地说，是指网站页面模板，即每个页面仅是一个板式，包括结构、样式和页面布局，是创建网页内容的样板，也可以理解为已有的网页框架。可以将模板中原有的内容替换成从服务器端数据库中动态内容，目的是可以保持页面风格一致

&emsp;&emsp;PHP是一种HTML内嵌式的在服务器端执行的脚本语言，所以大部分PHP开发出来的Web应用，初始的开发模板就是混合层的数据编程。虽然通过MVC设计模式可以把程序应用逻辑与网页呈现逻辑强制性分离，但也只是将应用程序的输入、处理和输出分开，网页呈现逻辑(视图)还会有HTML代码和PHP程序强耦合在一起。PHP脚本的编写者必须既是网页设计者，又是PHP开发者

&emsp;&emsp;现在已经有很多解决方案，可以将网站的页面设计和PHP应用程序几乎完全分离。这些解决方案称为“模板引擎”，它们正在逐步消除由于缺乏层次分离而带来的难题。模板引擎的目的，就是要达到上述提到的逻辑分离的功能。它能让程序开发者专注于资料的控制或是功能的达成。因此，模板引擎很适合公司的Web开发团队使用，使每个人都能发挥其专长

&emsp;&emsp;模板引擎技术的核心比较简单。只要将前端页面指定为模板文件，并将这个模板文件中动态的内容，如数据库输出、用户交互等部分，定义成使用特殊“定界符”包含的“变量”，然后放在模板文件中相应的位置。当用户浏览时，由PHP脚本程序打开该模板文件，并将模板文件中定义的变量进行替换。这样，模板中的特殊变量被替换为不同的动态内容时，就会输出需要的页面

&emsp;&emsp;目前，可以在PHP中应用的并且比较成熟的模板有很多，例如Smarty、PHPLIB、IPB等几十种。使用这些通过PHP编写的模板引擎，可以让代码脉络更加清晰，结构更加合理化。也可以让网站的维护和更新变得更容易，创造一个更加良好的开发环境，让开发和设计工作更容易结合在一起。但是，没有哪一个PHP模板是最合适、最完美的。因为PHP模板就是大众化的东西，并不是针对某个人开发的。如果能在对模板的特点、应用有清楚的认识基础上，充分认识到模板的优势劣势，就可以知道是否选择使用模板引擎或选择使用哪个模板引擎

 

&nbsp;

### 自定义模板引擎类

&emsp;&emsp;自定义模板引擎，能够更好的掌握模板引擎的工作机制，为学习Smarty做好准备。更重要的是，属于自己的PHP模板引擎永远不是固定不变的，可以根据项目的需要为其量身定制

&emsp;&emsp;在下例中，通过前面介绍的模板引擎概念创建了属于自己的一个简单模板引擎，可以用来处理模板的基本功能。例如：变量替换、分支结构、数组循环遍历，以及模板之间相互嵌套等，如下所示：

```
<?php
    /**
        file: mytpl.class.php 类名为MyTpl是自定义的模板引擎
        通过该类对象加载模板文件并解析，将解析后的结果输出 
    */
    class Mytpl {
        public $template_dir = 'templates';       //定义模板文件存放的目录  
        public $compile_dir = 'templates_c';      //定义通过模板引擎组合后文件存放目录
        public $left_delimiter  =  '<{';          //在模板中嵌入动态数据变量的左定界符号
        public $right_delimiter =  '}>';          //在模板中嵌入动态数据变量的右定界符号
        private $tpl_vars = array();              //内部使用的临时变量
        
        /** 
            将PHP中分配的值会保存到成员属性$tpl_vars中，用于将模板中对应的变量进行替换  
            @param    string    $tpl_var    需要一个字符串参数作为关联数组下标，要和模板中的变量名对应    
            @param    mixed    $value        需要一个标量类型的值，用来分配给模板中变量的值      
        */
        function assign($tpl_var, $value = null) {   
            if ($tpl_var != '')                   
                $this->tpl_vars[$tpl_var] = $value;
        }
        
        /** 
            加载指定目录下的模板文件，并将替换后的内容生成组合文件存放到另一个指定目录下
            @param    string    $fileName    提供模板文件的文件名                                             
        */
         function display($fileName) { 
            /* 到指定的目录中寻找模板文件 */
            $tplFile = $this->template_dir.'/'.$fileName;  
            /* 如果需要处理的模板文件不存在,则退出并报告错误 */
            if(!file_exists($tplFile)) {                   
                die("模板文件{$tplFile}不存在！");
            }
            /* 获取组合的模板文件，该文件中的内容都是被替换过的 */
            $comFileName = $this->compile_dir."/com_".$fileName.'.php';  
            /* 判断替换后的文件是否存在或是存在但有改动，都需要重新创建 */
            if(!file_exists($comFileName) || filemtime($comFileName) < filemtime($tplFile)) {
                /* 调用内部替换模板方法 */
                $repContent = $this->tpl_replace(file_get_contents($tplFile));  
                /* 保存由系统组合后的脚本文件 */
                file_put_contents($comFileName, $repContent);
            }
            /* 包含处理后的模板文件输出给客户端 */
            include($comFileName);                  
        }
        
        /**  
            内部使用的私有方法，使用正则表达式将模板文件'<{ }>'中的语句替换为对应的值或PHP代码 
            @param    string    $content    提供从模板文件中读入的全部内容字符串   
            @return    $repContent            返回替换后的字符串
        */
        private function tpl_replace($content) {
            /* 将左右定界符号中，有影响正则的特殊符号转义  例如，<{ }>转义\<\{ \}\> */
            $left = preg_quote($this->left_delimiter, '/');
            $right = preg_quote($this->right_delimiter, '/');

            /* 匹配模板中各种标识符的正则表达式的模式数组 */
            $pattern = array(       
                /* 匹配模板中变量 ,例如，"<{ $var }>"  */
                '/'.$left.'\s*\$([a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*)\s*'.$right.'/i',     
                /* 匹配模板中if标识符，例如 "<{ if $col == "sex" }> <{ /if }>" */
                '/'.$left.'\s*if\s*(.+?)\s*'.$right.'(.+?)'.$left.'\s*\/if\s*'.$right.'/ies', 
                /* 匹配elseif标识符, 例如 "<{ elseif $col == "sex" }>" */
                '/'.$left.'\s*else\s*if\s*(.+?)\s*'.$right.'/ies', 
                /* 匹配else标识符, 例如 "<{ else }>" */
                '/'.$left.'\s*else\s*'.$right.'/is',   
                /* 用来匹配模板中的loop标识符，用来遍历数组中的值,  例如 "<{ loop $arrs $value }> <{ /loop}>" */
                '/'.$left.'\s*loop\s+\$(\S+)\s+\$([a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*)\s*'.$right.'(.+?)'.$left.'\s*\/loop\s*'.$right.'/is',
                /* 用来遍历数组中的键和值,例如 "<{ loop $arrs $key => $value }> <{ /loop}>"  */
                '/'.$left.'\s*loop\s+\$(\S+)\s+\$([a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*)\s*=>\s*\$(\S+)\s*'.$right.'(.+?)'.$left.'\s*\/loop \s*'.$right.'/is', 
                /* 匹配include标识符, 例如，'<{ include "header.html" }>' */
                '/'.$left.'\s*include\s+[\"\']?(.+?)[\"\']?\s*'.$right.'/ie'                    
            );
            
            /* 替换从模板中使用正则表达式匹配到的字符串数组 */
            $replacement = array(  
                /* 替换模板中的变量 <?php echo $this->tpl_vars["var"]; */
                '<?php echo $this->tpl_vars["${1}"]; ?>',      
                /* 替换模板中的if字符串 <?php if($col == "sex") { ?> <?php } ?> */
                '$this->stripvtags(\'<?php if(${1}) { ?>\',\'${2}<?php } ?>\')',     
                /* 替换elseif的字符串 <?php } elseif($col == "sex") { ?> */
                '$this->stripvtags(\'<?php } elseif(${1}) { ?>\',"")',  
                /* 替换else的字符串 <?php } else { ?> */
                '<?php } else { ?>',   
                /* 以下两条用来替换模板中的loop标识符为foreach格式 */
                '<?php foreach($this->tpl_vars["${1}"] as $this->tpl_vars["${2}"]) { ?>${3}<?php } ?>',  
                '<?php foreach($this->tpl_vars["${1}"] as $this->tpl_vars["${2}"] => $this->tpl_vars["${3}"]) { ?>${4}<?php } ?>',    
                /*替换include的字符串*/
                'file_get_contents($this->template_dir."/${1}")'             
            );
            
            /* 使用正则替换函数处理 */
            $repContent = preg_replace($pattern, $replacement, $content);     
            /* 如果还有要替换的标识,递归调用自己再次替换 */
            if(preg_match('/'.$left.'([^('.$right.')]{1,})'.$right.'/', $repContent)) {       
                $repContent = $this->tpl_replace($repContent);             
            } 
            /* 返回替换后的字符串 */
            return $repContent;                                       
        }
        
         /**
            内部使用的私有方法，用来将条件语句中使用的变量替换为对应的值
            @param    string    $expr        提供模板中条件语句的开始标记           
            @param    string    $statement  提供模板中条件语句的结束标记  
            @return    strin                将处理后的条件语句相连后返回    
        */
        private function stripvtags($expr, $statement='') {
            /* 匹配变量的正则 */
            $var_pattern = '/\s*\$([a-zA-Z_\x7f-\xff][a-zA-Z0-9_\x7f-\xff]*)\s*/is'; 
            /* 将变量替换为值 */
            $expr = preg_replace($var_pattern, '$this->tpl_vars["${1}"]', $expr); 
            /* 将开始标记中的引号转义替换 */
            $expr = str_replace("\\\"", "\"", $expr);
            /* 替换语句体和结束标记中的引号 */
            $statement = str_replace("\\\"", "\"", $statement); 
            /* 将处理后的条件语句相连后返回 */
            return $expr.$statement;                             
        }
    }
?>
```
&emsp;&emsp;在Mytpl类中声明的多个方法中，除被封装过的方法之外，只有两个公有方法assign()和display()在创建对象以后可以被凋用。其中assign()方法用来将PHP脚本中的数据分配给模板中对应的变量，display()方法则用来将特定的templates目录下的模板文件加载到PHP脚本中。同时将模板文件中使用“<{”和“>>”标记声明的自定义模板语句，匹配出来并替换成相对应的PHP语法格式，然后将替换后的内容保存在特定的templates_c目录下。在运行时还要编译成一个非模板技术的PHP文件，并将其以模板文件名加上“com_”前缀和“.php”的扩展名形式保存。再通过include()函数将处理后的模板文件包含，并使用PHP解析后发送给客户端

 

&nbsp;

### 使用模板引擎

&emsp;&emsp;使用自定义的模板引擎比较容易，都是自己定义的语法格式。但要记住，所有流行的模板引繁解决方案都遵循同样的一组相同的核心实现原则，就是与编程语言一样，学习了一种语言就可以更容易地掌握其他语言。使用模板引擎最主要的原因就是将前端工程师和后端工程师的工作分开，所以模板引擎不仅后端工程师需要使用，前端工程师也需要使用

1、后端工程师对模板引擎的使用

&emsp;&emsp;在PHP脚本中包含模板引擎类所在的文件。如下所示：
```
require("mytpl.class.php");    //包含模板引擎类，相当于模板引擎安装
```
&emsp;&emsp;创建模板引擎类的对象并对一些成员属性进行初始化赋值。如下所示：
```
$tpl=new MyTpl(); //创建模板引擎类的对象，也可以根据参数对成员初始化
```
&emsp;&emsp;将动态数据(包括标量和数组类型的数据，例如从数据库的表中获得的数据数组)使用模板引擎对象中的assign()方法分配给模板文件，这个方法可以使用多次，将任意多个变量分配给模板。如下所示：
```
$tpl->assign("var","this is a value"); //可以分配标量类型数据，可以使用多次
$tpl->assign("arr",array(array(1,2),array("a","b")));    //也可以分配数组包括多维数组
```
&emsp;&emsp;在PHP脚本中通过调用模板对象中的display()方法，并将模板文件名作为参数传入，就会加载指定目录中对应的模板文件到PHP脚本中。再通过模板引擎中的替换方法对模板中自定义的语法进行解析，然后输出处理后的模板。如下所示：
```
$tpl->display("test.tpl");    //参数“test.tpl”为特定目录下的模板文件
```
2、前端工程师对模板引擎的使用

&emsp;&emsp;前端工程师需要将编写的模板文件存放到指定的目录中，这个目录是通过在模板对象中使用$template_dir属性指定的，默认的设置是当前目录下的“templates”目录。另外，模板文件的命名以及后缀名的设置可以随意，例如index.tpl、test.htm、header.tp;等

&emsp;&emsp;模板文件是通过使用HTML、CSS以及javascript等Web前台语言以编写的纯静态负而。但可以在模板文件中使用“<{”和“}>”两个分隔符中间定义一个变量(类似PHP中的变量格式)，该变量可以接受并输出由PHP脚本中分配过来的动态数据。在模板中使用的“<{”和“}>”两个分隔符对，也可以根据个人爱好在模板引擎类中修改。如下所示：
```
姓名：<{$name}>，年龄：<{$age}>,性别:<{$sex}> //模板中使用占位符
```
&emsp;&emsp;如果在PHP脚本中是将数组分配给模板，也可以在模板中进行遍历，还可以通过嵌套的方式遍历多维数组。使用的是在模板引擎中定义的“<{loop}>”标记对，使用的方式和PHP中foreach结构的语法格式相似。如下所示：

```
<{loop $arr $value }>                 //遍历数组$arr中的元素值
    数组中的元素值<{$value}>         //每次遍历输出元素中的值
<{/loop}>                             //在模板中遍历数组的结束标记

<{loop $arr $key=>$value }>         //遍历数组$arr中的元素下标和元素值
    数组中的元素键<{$key}>             //每次遍历输出元素中的下标
    数组中的元素值<{$value}>         //每次遍历输出元素中的值
<{/loop}>                             //在模板中遍历数组的结束标记

<{loop $arr $value }>                 //遍历数组$arr中的元素值
    <{loop $arr $data }>             //使用嵌套标记遍历二维数组
        数组中的元素值<{$value}>     //每次遍历输出元素中的值
    <{/loop}>                         //在模板中遍历数组的内层结束标记
<{/loop}>                             //在模板中遍历数组的外层结束标记
```
&emsp;&emsp;模板引擎还可以解析在模板文件中使用特殊标记编写的分支结构，语法风格也是和PHP的分支结构类似。是通过在模板文件中使用“<{if}>”标记对实现选择结构，也可以实现多路分支和嵌套分支的选择结构。如下所示： 

```
<{if($var=="red")}>
    <p style="color:red">这是“红色”的字</p>
<{elseif($var=="green")}>    
    <p style="color:green">这是“绿色”的字</p>
<{else}>
    <{if($size=20)}>
        <p style="font-size:20">这是“20px”大小的字</p>
    <{/if}>
<{/if}>
```
&emsp;&emsp;在自定义的模板引擎中，也添加了在模板文件中包含其他模板文件的功能。可以使用“<{include‘子模板文件名’}>”标记将子模板包含到当前模板中，还支持在子模板中再次包括另外的子模板。如下所示：
```
<{include 'other.tpl' }>
```
 

&nbsp;

### 使用示例分析

&emsp;&emsp;通过在程序中加载模板引擎可以将前端语言与后端语言的代码分开。首先在PHP程序中获取数据库中存储的数据，再通过加载模板引擎将数据分配出去，然后将模板文件再通过模板引擎加载并处理后输出。所以PHP程序只是创建动态数据，加载模板引擎并将动态数据分配给模板，完成了PHP程序的工作。而模板的设汁也只需要前端工程师独立完成，使用HTML、CSS及javascript等前台页面设计语言编写。另外，在模板文件中还需要使用模板引擎可以解析的标记，将PHP中分配过来的动态数据在模板中引用

1、数据库的设计

&emsp;&emsp;假设数据库服务器在“localhost”主机上，连接的用户名和密码分别为“admin”和“123456”，在该服务器上创建一个名为“mydb”的数据库，并在该数据库中创建一个名为“User”的用户表。创建该表的SQL査询语句如下所示：

```
CREATE TABLE User(
    id SMALLINT(3) NOT NULL AUTO_INCREMENT,
    name VARCHAR(10) NOT NULL DEFAULT '',
    sex VARCHAR(4) NOT NULL DEFAULT '',
    age SMALLINT(2) NOT NULL DEFAULT '0',
    email VARCHAR(20) NOT NULL DEFAULT '',
    PRIMARY KEY (id)
);
```
&emsp;&emsp;用户表User创建完成以后，接着可以向该表中插入一些数据作为示例演示使用，SQL查询语句如下所示:
```
INSERT INTO User (name,sex,age,email) VALUES 
("a","男",27,"a@a.com"),
("b","女",22,"b@b.com"),
("c","女",30,"c@c.com"),
("d","女",24,"d@d.com");
```
![](https://pic.xiaohuochai.site/blog/php_template1.png)

2、模板的设计

&emsp;&emsp;模板的设计不要出现任何的PHP代码，可以由前端人员来完成。在自定义的模板引擎中，规定了要到指定的目录中去寻找模板文件，这个特定的目录可以在创建模板引擎对象时指定，也可以使用默认的目录设置，默认可以将模板文件存放在当前目录中的“templates”目录下。本例共需要三个模板文件main.tpl、header.tpl和footer.tpl，都存放在这个默认的目录设置中。这三个模板文件的代码如下所示：

&emsp;&emsp;模板的头部文件header.tpl

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title> <{$title}> </title>
</head>
<body>
```
&emsp;&emsp;模板的尾部文件footer.tpl
```
        <div style="width:200px;margin: 0 auto;">##### <{$author}> #####</div>        
    </body>
</html>
```
&emsp;&emsp;主模板文件main.tpl

```
<{include 'header.tpl'}>
    <table border="1" align="center" width="500">
        <{ loop $users $user }>
            <tr>    
                <{loop $user $u }>
                    
                        <{if $u == "男" }>
                            <td style="color:green">
                        <{elseif $u == "女"}>
                            <td style="color:red">
                        <{else}>
                            <td>
                        <{/if}>

                            <{$u}></td>                
                <{/loop}>
            </tr>
        <{/loop}>
    </table>

<{include 'footer.tpl'}>
```
&emsp;&emsp;文件main.tpl是主模板文件，在该文件中使用<{include"header.tpl"}>和<{include"footer.tpl"}>两个标记分别在该文件的顶部和底部，将独立的头部和尾部模板文件包含到这个主模板文件中。并在该文件中使用<{tableName}>标记获取从PHP中动态分配过来的表名，以及使用双层<{loop}>标记嵌套，遍历从PHP中动态分配过来的在数据库中获取到的二维数组$Users，还在<{loop}>标记中使用条件选择标记<{if}>组合，将数据中性别为“男”的表格背景设置为红色和一些其他判断。被包含进来的头部模板文件header.tpl和尾部模板文件footer.tpl也同样可以获取从PHP中动态分配给模板的数据

3、PHP程序设计

&emsp;&emsp;通过模板引擎的使用，PHP程序员在编写代码时，只需要PHP一种语言就可以了，不用再去使用HTML、CSS以及javascript等页面设计语言完成前端的工作了。下面是一个文件名为index.php的PHP脚本文件，和模板引擎类所在的文件mytpl_class.php在同一个目录下。代码如下所示：

```
<?php
    //包含模板引擎类
    include "mytpl.class.php";
    //创建模板引擎对象
    $tpl = new Mytpl;

    //连接数据库
    $pdo = new PDO("mysql:host=localhost;dbname=mydb", "admin", "123456");
    //执行SQL语句
    $stmt = $pdo -> prepare("select id, name, sex,age,email from User order by id");
    $stmt ->execute();
    $data = $stmt -> fetchAll(PDO::FETCH_ASSOC);

    //这是从数据库获取的动态数据，需要在模板中显示
    $tpl->assign('title',"自定义模板引擎");$tpl->assign('auto',"小火柴");
    $tpl->assign('users',$data);

    $tpl -> display("main.tpl");
?>
```
&emsp;&emsp;在上面的PHP脚本文件中，通过PDO对象连接MySQL服务器，并获取用户表User中的全部记录，并以PHP的二维数组变量形式保存在变量data中。接着使用包含进来的当前目录下的“mytplclss.php”文件，创建并初始化模板引擎类的对象tpl。再通过该对象中的assign()方法向模板分配一些数据，然后使用该对象中的display()方法载入模板文件main.tpl。并将模板中标记的特殊变量替换为从PHP中分配的动态数据，处理完毕以后输出模板页面。页面的输出结果如下所示

&emsp;&emsp;限于各种不同的条件限制，比如时间、经验，做一个自定义的PHP模板引擎是非常困难的。其实，需要的并不是重新构造一个PHP模板，而是选择一个最贴近自己的PHP模板加以改造

![](https://pic.xiaohuochai.site/blog/php_template2.png)
