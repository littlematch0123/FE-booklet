# 前端学PHP之日期与时间

&emsp;&emsp;在Web程序开发时，时间发挥着重要的作用，不仅在数据存储和显示时需要日期和时间的参与，好多功能模块的开发，时间通常都是至关重要的。网页静态化需要判断缓存时间、页面访问消耗的时间需要计算、根据不同的时间段提供不同的业务等都离不开时间。PHP为我们提供了强大的日期和时间处理功能，通过内置的时间和日期函数库，不仅能够得到PHP程序在运行时所在服务器中的日期和时间，还可以对它们进行任意检查和格式化，以及在不同格式之间进行转换等。本文将详细介绍PHP中的日期和时间

&emsp;&emsp;注意：关于javascript的日期和时间相关内容请移步至此

 

&nbsp;

### 时间戳

&emsp;&emsp;UNIX时间戳是保存日期和时间的一种紧凑简洁的方法，是大多数UNIX系统中保存当前日期和时间的一种方法，也是在大多数计算机语言中表示日期和时间的一种标准格式。UNIX时间戳是从1970年1月1日0点(UTC/GMT的午夜)开始起到当前时间所经过的秒数

&emsp;&emsp;因为UNIX时间戳是一个32位的数字格式，所以特别适用于计算机处理，例如计算两个时间点之间相差的天数。另外，由于文化和地区的差异，存在不同的时间格式，以及时区的问题。所以，UNIX时间戳也是根据一个时区进行标准化而设计的一种通用格式，并且这种格式可以很容易地转换为任何格式

&emsp;&emsp;也因为UNIX时间戳是一个32位的整数表示的，所以在处理1902年以前或2038年以后的事件，将会遇到一些问题。另外，在Window下，由于时间戳不能为负数，如果使用PHP中提供的时间戳函数处理1970年之前的日期，就会发生错误。要使PHP代码具有可移植性，必须牢记这一点

【strtotime()】

&emsp;&emsp;strtotime()预期接受一个包含美国英语日期格式的字符串并尝试将其解析为Unix时间戳（自January 1 1970 00:00:00 GMT 起的秒数），其值相对于now参数给出的时间，如果没有提供此参数则用系统当前时间
```
int strtotime ( string $time [, int $now = time() ] )
```
```
<?php
echo strtotime("now"), "\n";//1488259922
echo strtotime("10 September 2000"), "\n";// 968536800
echo strtotime("+1 day"), "\n";//1488346322
echo strtotime("+1 week"), "\n";//1488864722
echo strtotime("+1 week 2 days 4 hours 2 seconds"), "\n";//1489051924
echo strtotime("next Thursday"), "\n";//1488409200
echo strtotime("last Monday"), "\n";//1488150000
?>
```
```
<?php
    $t ="1989-03-01 01:00:00";
    echo strtotime($t);//604713600
    date_default_timezone_set('PRC');
    $t ="1989-03-01 01:00:00";
    echo strtotime($t);//604688400
?>
```
【time()】

&emsp;&emsp;time()返回当前的 Unix 时间戳
```
int time ( void )
```
```
<?php
$nextWeek = time() + (7 * 24 * 60 * 60);// 7 days; 24 hours; 60 mins; 60 secs
echo 'Now:       '. date('Y-m-d') ."\n";//Now: 2017-02-28
echo 'Next Week: '. date('Y-m-d', $nextWeek) ."\n";//Next Week: 2017-03-07
echo 'Next Week: '. date('Y-m-d', strtotime('+1 week')) ."\n";// Next Week: 2017-03-07
?>
```
【date()】

&emsp;&emsp;date()格式化一个本地时间/日期，返回将整数timestamp按照给定的格式字串而产生的字符串。如果没有给出时间戳则使用本地当前时间。换句话说，timestamp是可选的，默认值为time()

string date ( string $format [, int $timestamp ] )
&emsp;&emsp;format参数如下所示

```
日
d        月份中的第几天，有前导零的 2 位数字               01 到 31
D        星期中的第几天，文本表示，3 个字母                Mon 到 Sun
j        月份中的第几天，没有前导零                       1 到 31
l        星期几，完整的文本格式                          Sunday 到 Saturday
N        ISO-8601 格式数字表示的星期中的第几天            1（表示星期一）到 7（表示星期天）
S        每月天数后面的英文后缀，2 个字符                 st，nd，rd 或者 th。可以和 j 一起用
w        星期中的第几天，数字表示                        0（表示星期天）到 6（表示星期六）
z        年份中的第几天                                 0 到 365

星期
W        ISO-8601 格式年份中的第几周，每周从星期一开始    42（当年的第 42 周）

月    
F        月份，完整的文本格式，                          January或March January 到 December
m        数字表示的月份，有前导零                        01 到 12
M        三个字母缩写表示的月份                          Jan 到 Dec
n        数字表示的月份，没有前导零                       1 到 12
t        给定月份所应有的天数                            28 到 31

年    
L        是否为闰年                                     如果是闰年为 1，否则为 0
o        ISO-8601 格式年份数字                           1999 or 2003
Y        4 位数字完整表示的年份                           1999 或 2003
y        2 位数字表示的年份                               99 或 03

时间    
a        小写的上午和下午值                              am 或 pm
A        大写的上午和下午值                              AM 或 PM
B        Swatch Internet 标准时                        000 到 999
g        小时，12 小时格式，没有前导零                    1 到 12
G        小时，24 小时格式，没有前导零                    0 到 23
h        小时，12 小时格式，有前导零                      01 到 12
H        小时，24 小时格式，有前导零                      00 到 23
i        有前导零的分钟数                                00 到 59
s        秒数，有前导零                                  00 到 59
u        毫秒                                          654321

时区    
e        时区标识（PHP 5.1.0 新加）                      UTC，GMT，Atlantic/Azores
I        是否为夏令时                                   如果是夏令时为 1，否则为 0
O        与格林威治时间相差的小时数                       +0200
P        小时和分钟之间有冒号分隔                         +02:00
T        本机所在的时区                                 EST，MDT
Z        时差偏移量的秒数                                -43200 到 43200

完整的日期／时间
c        ISO 8601 格式的日期                            2004-02-12T15:19:21+00:00
r        RFC 822 格式的日期                             Thu, 21 Dec 2000 16:01:07 +0200
U        从 Unix 纪元（January 1 1970 00:00:00 GMT）开始至今的秒数    
```
```
<?php
// 设定要用的默认时区。自 PHP 5.1 可用
date_default_timezone_set('UTC');

//Tuesday
echo date("l");

// Tuesday 28th of February 2017 05:41:19 AM
echo date('l dS \of F Y h:i:s A');

//July 1, 2000 is on a Saturday
echo "July 1, 2000 is on a " . date("l", mktime(0, 0, 0, 7, 1, 2000));

// Tue, 28 Feb 2017 05:41:19 +0000
echo date(DATE_RFC2822);

// 2000-07-01T00:00:00+00:00
echo date(DATE_ATOM, mktime(0, 0, 0, 7, 1, 2000));
?>
```
```
<?php
    $t = time();
    echo date("Y-m-d H:i:s")."<br>";//2017-02-28 06:56:42
    echo date("Y/m/d H:i:s", $t)."<br>";//2017/02/28 06:56:42
    echo date("Y年m月d日 H:i:s", $t)."<br>";//2017年02月28日 06:56:42
?>
```
【mktime()】

&emsp;&emsp;在PHP中，如果需要将日期和时间转换为UNIX时间戳，可以调用mktime()函数

&emsp;&emsp;mktime()Unix时间戳，参数可以从右向左省略，任何省略的参数会被设置成本地日期和时间的当前值
```
int mktime ([ int $hour = date("H") [, int $minute = date("i") [, int $second = date("s") [, int $month = date("n") [, int $day = date("j") [, int $year = date("Y") [, int $is_dst = -1 ]]]]]]] )
```
```
<?php
// Prints something like: 2006-04-05T01:02:03+00:00
echo date('c', mktime(1, 2, 3, 4, 5, 2006));
?>
```
&emsp;&emsp;mktime()在做日期计算和验证方面很有用，它会自动计算超出范围的输入的正确值 

```
<?php
    $t = mktime(1, 0, 0, 01, 03, 1989);
    echo date('y-m-d H:i:s',$t) .'<br>';//89-01-03 01:00:00
    $t = mktime(1, 0, 0, 01, 43, 1989);
    echo date('y-m-d H:i:s',$t) .'<br>';//89-02-12 01:00:00
?>
```
 

&nbsp;

### 时区

&emsp;&emsp;每个地区都有自己的本地时间，在网上及无级电通信中，时间的转换问题显得格外突出。整个地球分为24个时区，每个时区都有自己的本地时间。为了统一起见，使用一个统一的时间，称为通用协调时(Universal Time Coordinated,UTC)，是由世界时间标准设定的全球标准时间

&emsp;&emsp;PHP默认的时区设置是UTC时间，而北京位于时区的东8区，领先UTC8个小时，所以在使用time()等函数时，并不能得到正确的时间。可以通过以下两种方式来修改时区

&emsp;&emsp;1、修改配置文件

&emsp;&emsp;如果使用的是独立的服务器，有权限修改配置文件，设置时区就可以通过修改php.ini中的date.timezone属性完成，可以将这个属性的值设置为"Asia/Shang"、"Asia/Chongqing"、"Etc/GMT-8"或"PRC"中的一个

&emsp;&emsp;2、调用函数

&emsp;&emsp;可以通过调用函数date_default_timezone_set()函数来设置时区
```
date_default_timezone_set('PRC');
```
```
<?php
    echo date("Y-m-d H:i:s")."<br>";//2017-02-28 07:06:05
    date_default_timezone_set('PRC');
    echo date("Y-m-d H:i:s")."<br>";//2017-02-28 14:06:05
?>
```
&emsp;&emsp;date_default_timezone_get()函数可以用来获取当前的默认时区
```
<?php
    echo date_default_timezone_get();//Europe/Paris
    date_default_timezone_set('PRC');
    echo date_default_timezone_get();//PRC
?>
```
 

&nbsp;

### 微秒

&emsp;&emsp;在PHP中，大多数的时间格式都是以UNIX时间戳来表示的，而UNIX时间戳是心秒为最小的计量时间的单位。这对于某些应用程序来说不够准确，所以可以调用microtime()返回当前UNIX时间戳和微秒数
```
mixed microtime ([ bool $get_as_float ] )
```
&emsp;&emsp;如果给出了 get_as_float 参数并且其值等价于 TRUE，microtime() 将返回一个浮点数
```
<?php
    echo microtime() ."<br>";//0.72119500 1488282853
    echo microtime(true) ;//1488282853.7212
?>
```
&emsp;&emsp;microtime()函数常用于性能分析

```
<?php
    date_default_timezone_set("PRC");
    $start =  microtime(true);
    for($i=0; $i<100000; $i++);
    $end = microtime(true);
    echo $end-$start;//0.0067892074584961
?>
```
 

&nbsp;

### 获取时间

&emsp;&emsp;前面介绍的date()函数用于设置时间，而getdate()函数则主要用于获取时间
```
array getdate ([ int $timestamp = time() ] )
```
&emsp;&emsp;该函数将根据timestamp得出的包含有日期信息的关联数组array。如果没有给出时间戳则认为是当前本地时间

&emsp;&emsp;返回的关联数组中的键名单元有以下几个

```
键名            &emsp;&emsp;说明                             返回值例子
"seconds"          秒的数字表示                      0 到 59
"minutes"          分钟的数字表示                    0 到 59
"hours"            小时的数字表示                    0 到 23
"mday"             月份中第几天的数字表示             1 到 31
"wday"             星期中第几天的数字表示             0 (周日) 到 6 (周六)
"mon"              月份的数字表示                    1 到 12
"year"             4 位数字表示的完整年份             1999 或 2003
"yday"             一年中第几天的数字表示             0 到 365
"weekday"          星期几的完整文本表示               Sunday 到 Saturday
"month"            月份的完整文本表示，               January 或 March    January 到 December
0                  自从 Unix 纪元开始至今的秒数，和 time() 的返回值以及用于 date() 的值类似    
```
```
<?php
date_default_timezone_set('PRC');
//Array ( [seconds] => 8 [minutes] => 4 [hours] => 20 [mday] => 28 [wday] => 2 [mon] => 2 [year] => 2017 [yday] => 58 [weekday] => Tuesday [month] => February [0] => 1488283448 )
print_r(getdate())."<br>";
//Array ( [seconds] => 0 [minutes] => 0 [hours] => 0 [mday] => 1 [wday] => 6 [mon] => 1 [year] => 2000 [yday] => 0 [weekday] => Saturday [month] => January [0] => 946656000 )
print_r(getdate(strtotime('2000-1-1 0:0:0')));
?>
```
 

&nbsp;

### 日历

&emsp;&emsp;下面使用面向对象的写法，完成一个简单的日历控件

```
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Document</title>
<style>
body{margin: 0;}
.active{color:white;background-color: blue;}
table{text-align:center;table-layout:fixed;border-collapse:collapse;width:400px;}
</style>
</head>
<body>
<?php
    class Calendar{
        private $year; //当前年
        private $month; //当前月
        private $start_weekday; //当前月的第一天对应的周几
        private $days; //当前月总天数
        private $out; //用于构造日历

        //构造方法，用来初始化一些日期属性
        function __construct(){
            //如果用户没有设置年份，则使用当前系统时间的年份
            $this->year = isset($_GET['year']) ? $_GET['year'] : date('Y');
            //如果用户没有设置月份，则使用当前系统时间的月份
            $this->month = isset($_GET['month']) ? $_GET['month'] : date('m');
            //利用date()函数的w参数获取当前月第一天对应周几
            $this->start_weekday = date("w", mktime(0,0,0, $this->month, 1, $this->year));
            //利用date()函数的t参数获取当前月的天数
            $this->days = date("t", mktime(0,0,0, $this->month, 1, $this->year));    
        }

        //魔术方法，用于打印整个日历
        function __tostring(){
            global $out;
            $out .='<table>';//日历以表格形式打印
            $out .=$this->changeDate();//用户自己设置日期
            $out .=$this->weeksList();//打印周列表
            $out .=$this->daysList();//打印日列表
            $out .='</table>';//表格结束

            return $out;
        }

        //输出周列表
        private function weeksList(){
            global $out;
            $week = array('日','一','二','三','四','五','六');
            $out .= '<tr>';
            for($i = 0; $i < count($week); $i++){
                $out .= '<th>' .$week[$i] .'</th>';
            }
            $out.= '</tr>';
            
        }

        //输出日列表
        private function daysList(){
            global $out;
            $out .= '<tr>';
            //输出空格
            for($j = 0; $j < $this->start_weekday; $j++){
                $out .= '<td>&nbsp;</td>';
            }
            //输出日期
            for($k = 1; $k <= $this->days; $k++){
                $j++;
                if($k == date('d')){
                    $out .= '<td class="active">' .$k .'</td>';
                }else{
                    $out .= '<td>'.$k .'</td>';
                }

                //换行
                if($j % 7 == 0){
                    $out .= '</tr><tr>';
                }
            }

            //补齐空格
            while($j % 7 !== 0){
                $out .= '<td>&nbsp;</td>';
                $j++;
            }

            $out.= '</tr>';
            
        }

        //处理上一年数据
        private function prevYear($year,$month){
            $year = $year - 1;
            if($year < 1970){
                $year = 1970;
            }
            return "year={$year}&month={$month}";
        }

        //处理上一月数据
        private function prevMonth($year,$month){
            if($month == 1){
                $year = $year - 1;
                if($year < 1970){
                    $year = 1970;
                }    
                $month = 12;    
            }else{
                $month --;
            }
            return "year={$year}&month={$month}";    
        }    

        //处理下一年数据
        private function nextYear($year,$month){
            $year = $year + 1;
            if($year > 2038){
                $year = 2038;
            }
            return "year={$year}&month={$month}";
        }    

        //处理下一月数据
        private function nextMonth($year,$month){
            if($month == 12){
                $year = $year + 1;
                if($year < 1970){
                    $year = 1970;
                }    
                $month = 1;    
            }else{
                $month ++;
            }
            return "year={$year}&month={$month}";    
        }        


        //改变日期
        private function changeDate($url="1.php"){
            global $out;
            $out .='<tr>';
            $out .='<td><a href="' .$url .'?' .$this->prevYear($this->year,$this->month) .'">' .'前一年' .'</a></td>';
            $out .='<td><a href="' .$url .'?' .$this->prevMonth($this->year,$this->month) .'">' .'前一月' .'</a></td>';    
            $out .= '<td colspan="3">';
            $out .='<form>';
            $out .='<select name="year" onchange="window.location=\''.$url.'?year=\'+this.options[selectedIndex].value+\'&month='.$this->month.'\'">';
            for($sy=1970;$sy<=2038;$sy++){
                $selected = ($sy==$this->year) ? "selected" : "";
                $out .='<option '.$selected .' value="' .$sy .'">' .$sy .'</option>';
            };        
            $out .= '</select>';
            $out .= '<select name="month"  onchange="window.location=\''.$url.'?year='.$this->year.'&month=\'+this.options[selectedIndex].value">';
            for($sm=1;$sm<=12;$sm++){
                $selected1 = ($sm==$this->month) ? "selected" : "";
                $out .='<option '.$selected1 .' value="' .$sm .'">' .$sm .'</option>';
            }
            $out .= '</select>';
            $out .= '</form>';

            $out .= '</td>';
            $out .= '<td><a href="'.$url.'?'.$this->nextYear($this->year,$this->month).'">'.'后一年'.'</a></td>';
            $out .= '<td><a href="'.$url.'?'.$this->nextMonth($this->year,$this->month).'">'.'后一月'.'</a></td>';
            $out .= '</tr>';

            
        }    
    }

    echo new Calendar();
?>    
</body>
</html>
```

<iframe style="width: 550px; height: 200px;" src="https://www.xiaohuochai.site/test/calendar.php" frameborder="0" width="320" height="240"></iframe>