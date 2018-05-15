# Javascript编码标准

&emsp;&emsp;编码标准是有争议的。几乎每个人都有自己的标准，但对标准应该是什么样的，则似乎很少能达成共识。但编码标准意味着，通过共同语言和一致的结构，把开发人员从无意义的工作中解放出来。允许开发人员把创新精神放在重要的逻辑上面。一个好的标准能提供清晰明了的意图，是有效工作所必需的。本文将详细介绍Javascript编码标准

&nbsp;

### 引入

&emsp;&emsp;给像JavaScript这种松散类型(loosely typed)的动态语言定义明确的标准，几乎可以肯定，要比给较为严格的语言定义标准来得更加重要。JavaScript的高度灵活性，可能会使它成为编码语法和实践的潘多拉魔盒。较为严格的语言，本身就具备结构性和一致性，而JavaScript需要准则和应用标准才能达到相同的效果

&emsp;&emsp;维护代码要比编写代码花费更多的时间。要编写越是容易理解的代码，在最开始就越是需要深思熟虑和良好的结构

&emsp;&emsp;好的Javascript编码应该符合以下标准

&emsp;&emsp;1、编码错误的可能性降至最低

&emsp;&emsp;2、代码适合大规模的项目和团队(一致的、可读的、可扩展的和可维护的)

&emsp;&emsp;3、鼓励编码的效率、效果和重用

&emsp;&emsp;4、鼓励使用JavaScript的优点，避免使用它的缺点

&emsp;&emsp;5、开发团队的每个成员都使用

&nbsp;

### 代码布局

&emsp;&emsp;通常，我们的代码被阅读的次数比编写它的次数要多得多。对代码规定格式和应用约定，以便我们的开发同事(包括几个星期之后的我们自己)，能够很容易地理解代码的内容

【使用一致的缩进和行长】

&emsp;&emsp;报纸上的文本列都在50~80个字符的长度之间。对人类的眼睛来说，超过80个字符的行，看起来会逐渐变得吃力。一般地，阅读理解的最佳行长(linelength)在45~75个字符之间，66个字符的行长被认为是最舒适的。最好使用短制表符(2个空格)和稍短的行长(78个字符)，每一行更窄一些，重要的内容也更易读一些。使用短制表符也是意识到，像JavaScript这种事件驱动的语言比纯过程语言，缩进要小一些，因为JavaScript有大量的回调函数和闭包

&emsp;&emsp;1、每级代码缩进两个空格

&emsp;&emsp;2、每行限制为78个字符

【按段落组织代码】

&emsp;&emsp;在编排代码的时候，要以清晰明白为目标，而不是减少代码的字节数。一旦代码发布到生产环境，在传输给用户之前，JavaScript代码会合并(concatenated)、压缩(minified)。结果，那些用来帮助理解的工具(空白、注释和更具描述性的变量名)对性能毫无影响。通过合理的使用空白符(white space)，使代码更易读

&emsp;&emsp;1、按逻辑段落组织代码，段落之间要空行

&emsp;&emsp;2、每一行最多只包含一条语句或赋值语句，但是允许每行同时声明多个变量

&emsp;&emsp;3、运算符和变量之间要有空格，这样就能更容易地识别变量

&emsp;&emsp;4、每个逗号之后要有空格

&emsp;&emsp;5、在段落内，相似的运算符要对齐

&emsp;&emsp;6、缩进注释，缩进量和所解释的代码相同

```
// 把一个或多个声明放在一行上，但每行只有一条赋值语句
var 
  x, y, r, print_msg, get_rangdom,
  coef      = 0.5,
  rot_delta = 1,
  x_delta   = 1,
  y_delta   = 1,
  first_name  = 'sally'
  ;

// 在下一行段落的前面添加空行
// function to write text to message container
print_msg = function ( msg_text ){
  //缩进注释，和它所描述的段落层级一致
  // .text() prevents xss injection
  $('#sl').text( msg_text );
};

// function to return a random number
get_rangdom = function ( num_arg ){
  return Math.random() * numn_arg;
};

// initialize coorainates
x = get_random(  10 );
y = get_random(  20 );
r = get_random( 360 );

// 添加空白，对齐相似的元素，相似的语句更容易阅读
// adjust to offsets
x += x_delta    * coef;
y += y_delta    * coef;
r += rot_delta  * coef;
```

【换行要一致】

&emsp;&emsp;1、在运算符的前面换行，因为人们检查左列的所有运算符是很容易的

&emsp;&emsp;2、把后续的语句缩进一个层次，比如使用两个空格

&emsp;&emsp;3、在逗号分隔符的后面换行

&emsp;&emsp;4、方括号或者括号单独占一行。清楚地表明这是语句的结尾，不会迫使读者横向扫寻分号

```
// 将运算符放在左边，排成一列
long_quote = 'Four score and seven years ago our '
  + 'fathers brought forth on this continent, a new ,
  + 'nation, conceived in Liberty, '
  + 'and dedicated to the proposition that '
  + 'all men are created equal. ';

// 方括号单独占一行，下一条语句就容易识别了
// 使用尾部逗号，更容易维护
cat_breed_list = [
  'Abyssinian',         'American Bobtail',     'American Curl',
  'American Shorthair', 'American Whiterhair',  'Balinses',
  'Balinese-Javanaese', 'Birman',               'Bombay'
];
```

【使用K&amp;R风格的括号】

&emsp;&emsp;K&amp;R风格的括号可以平衡垂直空间的使用，增加可读性。当格式化对象和映射、数组、复合语句或者调用的时候，应该使用K&amp;R风格的括号

&emsp;&emsp;1、如果可能，就使用单行。比如，当一个很短的数组声明能写在一行上的时候，就没必要把它拆分成三行。

&emsp;&emsp;2、把左括号、左花括号或者左方括号放在开始行的末尾。

&emsp;&emsp;3、在分隔符（括号、花括号或者方括号）的里面把代码缩进一个层级，比如，两个空格。

&emsp;&emsp;4、右括号、右花括号或者右方括号单独占一行，缩进和开始行相同

```
var
  run_count,        full_name,      top_fruit_list,
  full_fruit_list,  print_string;

run_count = 2;
full_name = 'Fred Burns';
top_fruit_list = ['Apple', 'Banana', 'Orange' ];

// 使用垂直对齐，增加可读性
full_fruit_list = [
  'Apple',      'Apricot',  'Banana',     'Blackberry', 'Blueberry',
  'Current',    'Cherry',   'Date',       'Grape',      'Grapefruit',
  'Guava',      'Kiwi',     'Kumquat',    'Lemon',      'Lime',
  'Lychee',     'Mango',    'Melon',      'Nectarine',  'Orange',
  'Peach',      'Pear',     'Pineapple',  'Raspberry',  'Strawberry',
  'Tangerine',  'Ugli'
]

// 使用K&amp;R风格的括号
print_string = function ( text_arg ){
  var text_arg, char_list, i;
  char_list = input_text.split('');
  for( i = 0, i &lt; char_list.length; i++ ){
    document.write( char_list[i] );
  }
  return true;
}

print_string( 'We have counted' + 
  + String( run_count )
  + ' invocations to date;
);
```

【使用空格来区别函数和关键字】

&emsp;&emsp;很多语言有冠词的概念，像an、a或者the这种单词。冠词的目的之一是提醒读者或者听者，下一个单词将是名词或者名词短语。和函数以及关键字一起使用的空格，可以达到类似的效果

&emsp;&emsp;1、函数名后面没有空格。在函数名和左括号&ldquo;(&rdquo;之间没有空格

&emsp;&emsp;2、关键字后面空一格，然后是左括号&ldquo;(&rdquo;

&emsp;&emsp;3、当格式化for语句的时候，在每个分号的后面空一格

```
mystery_text = get_mystery( 'Hello JavaScript Denizens' );
for ( x = 1; x &lt; 10; x++ )    { console.log( x ); }
```

【引号要一致】

&emsp;&emsp;使用单引号作为字符串的定义符号，而不是双引号，因为HTML中标准属性的定义符是双引号

```
html_snip = '<input name="alley_cat" type="text" value="bone">';
```

&nbsp;

### 注释说明

&emsp;&emsp;注释可能要比它们所解释的代码更加重要，因为它们能传达在其他方面不明显的关键细节。这在事件驱动编程中尤其明显，因为大量的回调函数，导致跟踪代码的执行要耗费掉大量时间。这并不意味着添加更多的注释总是更好的。摆放有策略、信息量大和精心维护的注释，价值是很高的，而杂乱无章文不对题的注释，还不如没有的好

【解释代码】

&emsp;&emsp;好的注释的标准是将注释的数量最小化，将注释的价值最大化。通过约定来减少注释，尽可能地让代码进行自我说明。通过将注释和它们所描述的段落对齐，并确保它们的内容对读者是有价值的，从而使注释的价值最大化

&emsp;&emsp;使用一致的、有意义的变量名，能提供更多的信息，需要的注释很少

```
var
  welcome_html = '&lt;h1&gt;Welcom tho Color house&lt;/h1&gt;',
  house_color_list = ['yellow', 'green', 'little pink'],
  spec_map, get_spec_map,  run_init;

// Begin /get_spec_map/
// Get a specification map based on colors
get_spec_map = function ( color_list_arg ){
  var 
    color_count = color_list_arg.length,
    spec_map    = {},
    i;
  for ( i = 0, i &lt; color_count; i++ ){
    // ... 30 more lines
  } 
  return spec_map;
}
// End /get_spec_map/

run_init = function () {
  var spec_map = get_spec_map( house_color_list );
  $('#welocome').html('welcome_html');
  $('#specs').text( JSON.stringify( spec_map ) );
};

run_init();
```

【给API和TODO添加文档】

&emsp;&emsp;注释也能为代码提供更为正式的文档。总体架构的文档应该放在专门的架构文档里面。但是函数或者对象API的文档，可以并且通常应该放在代码的旁边

&emsp;&emsp;1、解释所有重要的函数，说明它的目的，使用的参教或者设置(setting)，它的返回值，以及所有抛出的异常

&emsp;&emsp;2、如果禁用了代码，要解释为什么，使用这种格式的注释：//TODO date username-comment。在判断注释新鲜度的时候，用户名和日期是很有价值的，也可以使用自动化工具，在代码库中的TODO项上，自动填上用户名和日期

```
// BEGIN DOM Method /toggleSlider/
// Purpose : Extends and retracts chat slider 
// Required Arguments :
//    * do_extend (boolean) true extends slider, false retracts
// Optional Arguments :
//    * callback (function) executed after animation is complete
// Settings :
//    *    chat_extend_time, chat_retract_time
//    *    chat_extend_height, chat_retract_height
// Returns : boolean
//    *    true - slider animation activated
//    *    false - slider animation not activated
// Throws : none
//
toggleSlider = function( do_extend, callback )    {
// ...
};
// END DOM Method /toggleSlider/
```
```
// BEGIN TODO 2018-01-11 xiaohuochai - debug code disabled
// alert( warning_text )；
// ... (lots more lines) ...
//
// END TODO 2018-01-11 xiaohuochai - debug code disabled
```

【使用命名约定，减少并改进注释】

&emsp;&emsp;下面是一个示例

```
var make_house = curry_build_item({ item_type : 'house' });
```

&emsp;&emsp;通过上面代码可以得到以下信息

&emsp;&emsp;1、make_house是一个对象构造器。

&emsp;&emsp;2、调用的函数叫做柯里化函数，它使用闭包来维护状态并返回一个函数

&emsp;&emsp;3、调用的函数接收字符串参数，表示类型(type)

&emsp;&emsp;4、变量的作用域是局部的

&emsp;&emsp;如果使用如下声明，则需要添加许多注释

```
var creator = maker('house');
```
```
// 'creator' is an object constructor we get by 
// calling 'maker'. The first positional argument 
// of 'maker' must be a string, and it directs 
// the type of object constructor to be returned.
// 'maker' uses a closure to remember the type
// of object the returned function is to
// meant to create.
var creator = maker('house');
```

&emsp;&emsp;加了注释的示例，不但比简易的示例显得更为冗长，而且需要更多的时间编写，很可能是因为我们设法传递和命名约定一样多的信息量。情况会越来越糟糕：经过一段时间以后，注释容易变得不准确，因为代码改变了，开发人员变得懒惰了。假如几个星期之后，我们决定更改了变量名，却忘记更新注释中引用这些变量名的地方。现在的注释完全错了并且容易误导别人。不但是这样，而且所有这些注释使得代码难以理解，因为代码清单长了9倍。没有注释是最好的。相比之下，我们更想使用简单示例中的变量名

&nbsp;

### 变量

&emsp;&emsp;每个人在编码的时候，都会使用命名约定，不管他们是否意识到这一点，就像不做决定也是一种决定。一个好的命名约定，当团队的所有成员都理解并使用它的时候，能发挥巨大的价值。当他们这么做的时候，就能从枯燥的代码跟踪和费力的注释维护当中解放出来，把精力都集中在代码的目标和逻辑上面

【使用常用字符】

&emsp;&emsp;1、变量名使用a~z、A~Z、0~9、下划线和$符号

&emsp;&emsp;2、变量名不要以数字开头

【传送变量作用域】

&emsp;&emsp;1、当变量作用域是整个模块时使用驼峰式（模块名字空间的所有地方都可以访问该变量)

&emsp;&emsp;2、当变量作用域不是整个模块时使用下划线 (模块名字空间内的某个函数的局部变量)

&emsp;&emsp;3、确保所有模块作用域内的变量至少有两个音节，这样作用域就清晰了。比如，不要使用叫做config的变量，可以使用更具描述性的和明显是模块作用域的configMap

【命名布尔变量】

&emsp;&emsp;当布尔值表示状态的时候，我们使用单词is，比如，is_retracted或者is_stale。当使用布尔值来表示行为的时候(如函数中的参数)，我们使用单词do，像do_retract或者do_extend。当使用布尔值来表示所有权的时候，我们使用has，比如，has_whiskers 或者 has_wheels

```
指示器            局部作用域        模块作用域
bool[通用]      bool_return      boolReturn
do(请求行为)     do_retract       doRetract
has(表示包含)    has_whiskers     hasWhiskers
is(表示状态)    is_retracted      isRetracted
```

【命名字符串变量】

```
指示器          局部作用域         模块作用域
str[通用]      direction_str     directionStr
id            email_id          emailld
date          email_date        emailDate
html          body_html         bodyHtml
msg           employee_msg      employeeMsg
name          emp1oyee_name     employeeName
text          email_text        emailText
type          item_type         itemType
```

【命名整型变量】

```
指示器          局部作用域         模块作用域
int[通用]       size_int          sizeInt
无(约定)        i , j , k         (不允许出现在模块作用域内)
count          employee_count    employeeCount
index          employee_index    employeeIndex
time(毫秒)      retract_time      retractTime
```

【命名数字变量】

```
指示器          局部作用域       模块作用域
num[通用]       size_num        sizeNum
无(约定)        x, y, z         (不允许出现在模块作用域内)
coord(坐标)     x_coord        xCoord
ratio          sales_ratio     salesRatio
```

【命名正则变量】

```
指示器      局部作用域          模块作用域
regex      regex_filter      regexFilter
```

【命名数组变量】

```
指示器      局部作用域          模块作用域
list      timestamp_list     timestampList
list      color_list         colorList
```

【命名映射变量】

```
指示器        局部作用域                  模块作用域
map          employee_map              employeeMap
map          receipt_timestamp_map     receiptTimestampMap
```

【命名对象变量】

&emsp;&emsp;1、对象变量应该是名词，加上可选的修饰符：emplyee或者receipt

&emsp;&emsp;2、确保模块作用域的对象变量名具有两个或者两个以上的音节，这样作用域就清晰了： storeEmployee 或者 salesReceipt

&emsp;&emsp;3、jQuery对象有前缀$。目前这种约定很常见，在单页应用中，jQuery对象（有时候叫集合）很普遍

```
指示器           局部作用域       模块作用域
无(单名词)      employee         storeEmployee
无(单名词)      receipt          salesReceipt
$             $area_tabs        $areaTabs
```

【命名函数变量】

&emsp;&emsp;1、命名函数应始终遵循动词加名词的形式，比如，get_record或者empty_cache_map

&emsp;&emsp;2、模块作用域的函数应始终包含两个或两个以上的音节，这样作用域就清晰了：getRecord 或者 emptyCacheMap

&emsp;&emsp;3、动词含义要一致

```
指示器        局部作用域           模块作用域         指示器含义     
fn[通用]     fn_sync            fnSync            通用函数指示器
curry       curry_make_user    curryMakeUser     返回指定参数的函数
destroy     destroy_entry      destroyEntry      移除数据结构，意味着必要时会回收数据引用
remove      remove_element     removeElement     移除数据结构的另一种写法
empty       empty_cache_map    emptyCacheMap     移除数据结构的一些或者全部成员，不会移除容器
fetch       fetch_user_list    fetchUserList     返回从外部源获取的数据
get         get_user_list      getUserList       返回对象或者其他内部数据结构中的数据
make        make_user          makeUser          返回新建对象(不使用new操作符)
on          on_mouseover       onMouseover       事件处理程序。事件应是单字的，和HTML标记一致
save        save_user_list     saveUserList      把数据保存到对象或者其他内部数据结构中
set         set_user_name      setUserName       初始化或者更新通过参数提供的值
store       store_user_list    storeUserList     发送数据到外部源进行存储，比如通过AJAX调用
update      update_user_list   updateUserList    和set类似，但有&ldquo;先前己经初始化了&rdquo;的暗含意思
```

【命名未知类型的变量】

&emsp;&emsp;有时候，我们实际上不知道变量包含的数据类型是什么。有两种情况很常见

&emsp;&emsp;1、编写多态函数(接收多种数据类型的函数)

&emsp;&emsp;2、接收的数据来自外部数据源，比如AJAX或者Web&nbsp;Socket订阅

```
局部作用域     模块作用域      说明
http_data    httpData      接收自HTTP订阅的未知数据类型
socket_data  socketData    接收自Web socket的未知数据类型
arg_data     data          通过参数传递的未知数据类型
```

&emsp;&emsp;下面是一个示例

```
dogPrototype = {
  body_temp_c   : 36.5,
  dog_name      : 'Guido',
  greet_text    : 'Grrrr',
  speak_text    : 'I am a dog',
  height_in_m   : 1.0,
  leg_count     : 4,
  check_destroy : checkDestroy,
  destroy_dog   : destroyDog,
  print_greet   : printGreet,
  print_name    : printName,
  print_speak   : printSpeak,
  show_flash    : showFlash,
  redraw_dog    : redrawDog
};
```

【变量声明和赋值】　

&emsp;&emsp;1、创建新对象、映射或者数组的时候，使用{}或者[]]代替new Object()或者new Array()

&emsp;&emsp;2、使用工具方法复制对象和数组

&emsp;&emsp;3、一开始就在函数作用域内，使用单个var关键字，显式地声明所有的变量

&emsp;&emsp;4、不要使用块

&emsp;&emsp;5、把所有函数赋给变量。这进一步巩固了JavaScript把函数当作第一类对象的事实

&emsp;&emsp;6、 当函数需要三个以上的参数时，使用具名参数(named arguments)，因为位置参数的含义很容易忘记，并且也不能进行自我说明

&emsp;&emsp;7、每条变量赋值语句占用一行。尽可能按字母或者逻辑来排序。多个声明可以放在单行上

&nbsp;

### 命名空间

&emsp;&emsp;很多早期的JavaScript代码比较简单，单独在一张页面上使用。这些脚本可以(而且经常就是这么做的)使用全局变量，而不会有什么影响。但是随着JavaScript应用的蓬勃发展和第三方类库的普遍使用，别人想要全局变量i的可能性会急剧上升。当两个代码库声明了相同的全局变量时，地狱之门也随之打开

&emsp;&emsp;只使用单一的全局函数，把其他所有变量的作用域限制在该函数里面，就可以极大地减少这种问题，如下所示：

```
var spa = (function ()    {
  // other code here
  var initModule = function ()    {
    console.log( 'hi there')；
  }；
  return { initModule : initModule };
}());
```

&emsp;&emsp;这个单一的全局函数(在这个示例中是spa)叫做名字空间。赋给它的函数. 在加载的时候就会执行，当然所有在该函数里面赋值的局部变量，在全局名字空间中是不可访问的。注意我们让initModule方法对外可见。所以其他代码可以调用初始化函数，但它不能访问其他的东西。并且必须使用spa前缀

```
spa.initModule();
```

&emsp;&emsp;可以把命名空间再细分，这样就不会被迫用单个文件来装载50KB的应用。比如，可以创建spa、spa.shell和spa.slider这样的命名空间：

```
// In the file spa.js: 
var spa = (function () {
  // some code here 
}());
// In the file spa.shell.js: 
var spa.shell = (function () {
  // some code here 
}());
// In the file spa.slider.js: 
var spa.slider = (function () {
  // some code here 
}());
```

&emsp;&emsp;命名空间是创建可维护的JavaScript代码的关键所在

【文件命名】

&emsp;&emsp;1、根据命名空间来命名JavaScript文件，每个文件一个命名空间示例

```
spa.js    // spa.*    namespace
spa.shell.js    // spa.shell.* namespace
spa.slider.js // spa.slider.* namespace
```

&emsp;&emsp;2、为会生成HTML的每个JavaScript文件创建一个CSS文件。示例：

```
spa.css    // spa.*    namespace
spa.shell.css // spa.shell.* namespace 
spa.slider.css // spa.slider.* namespace
```

&emsp;&emsp;3、给CSS选择器加上模块名前缀。这种做法能极大地有助于避免和第三方模块的意外冲突

```
spa.css defines #spa,    .spa-x-clearall
spa.shell.css defines
#spa-shell-header, #spa-shell-footer, .spa-shell-main
```

&nbsp;

### JS模板

&emsp;&emsp;模块按一致的区块来划分，是很有价值的做法。它能帮助我们理解和浏览代码，提醒我们要以良好的方式来编码

【使用IIFE创建命名空间】

&emsp;&emsp;使用自执行函数为模块创建命名空间。这能防止意外地创建全局JavaScript变量。每个文件应该只定义一个命名空间，并且文件名正好和命名空间对应。比如，模块的名字空间是spa.shell，则文件名应为spa.shell.js

```
spa.module = (function(){

})();
```

【声明并初始化模块作用域变量】

&emsp;&emsp;一般会使用configMap来保存模块配置、使用stateMap来保存运行时的状态值以及使用jqueryMap来缓存jQuery集合

```
var
  configMap = {
    settable_map : { color_name: true }, 
    color_name    : 'blue'
  },
  stateMap = { $container : null }, 
  jqueryMap = {};
  ```
```
  // Begin DOM method /setJqueryMap/
  setJqueryMap = function () {
    var
      $append_target = stateMap.$append_target,
      $slider        = $append_target.find( '.spa-chat' );
    jqueryMap = {
      $slider   : $slider,
      $toggle   : $slider.find( '.spa-chat-head-toggle' ),
      $window   : $(window)
    };
  };
  // End DOM method /setJqueryMap/
```

【声明工具方法】

&emsp;&emsp;把所有私有的工具方法聚集在它们自己的区块里面。这些方法不会操作DOM，因此不需要浏览器就行。如方法不是单个模块的工具施，则应该把它移到共享的工具方法库里面，比如spa.util.js

```
//------------------- BEGIN UTILITY METHODS ------------------
// Cross-browser method to set __proto__
//   Newer js engines (v1.8.5+) support Object.create()
hasCreate = !! Object.create;
createObject = function ( arg ){
  if ( ! arg ) { return {}; }
  if ( hasCreate ){ return Object.create( arg ); }
  function obj() {};
  obj.prototype = arg;
  return new obj;
};
//-------------------- END UTILITY METHODS -------------------
```

【DOM方法】

&emsp;&emsp;把所有私有的DOM方法聚集在它们自己的区块里面。这些方法会访问和修改DOM，因此需要浏览器才能运行。一个DOM方法的例子是移动CSS sprite。set JqueryMap方法用来缓存jQuery集合

```
//--------------------- BEGIN DOM METHODS --------------------
// functions used in dogPrototype
printName  = function (){
  this.$name.text( this.dog_name );
};

showFlash = function (){
  this.$bg.css({opacity: 1, display:'block'})
    .fadeOut('slow');
};//---------------------- END DOM METHODS ---------------------
```

【事件处理】

&emsp;&emsp;把所有的私有事件处理程序聚集在它们自己的区块里面。这些方法会处理事件，比如按钮点击、按下按键、浏览器容器缩放、或者接收Websocket消息。事件处理程序理一般会调用DOM方法来修改DOM，而不是它们自己直接去修改DOM

```
//     BEGIN EVENT HANDLERS
  onLogin = function ( event, login_user ) {
    configMap.set_chat_anchor( 'opened' );
  };
  onLogout = function ( event, logout_user ) {
    configMap.set_chat_anchor( 'closed' );
    jqueryMap.$title.text( 'Chat' );
    clearChat();
  };
//     END EVENT HANDLERS
```

【回调方法】

&emsp;&emsp;把所有的回调方法聚集在它们自己的区块里面。如果有回调函数，一般把它们放在事件处理程序和公开方法之间。它们是准公开方法，因为它们会被所服务的外部模块使用

```
//---------------------- BEGIN CALLBACKS ---------------------
setChatAnchor = function ( position_type ) {
  return changeAnchorPart({ chat : position_type });
};
//----------------------- END CALLBACKS ----------------------
```

【公开方法】

&emsp;&emsp;把所有的公开方法聚集在它们自己的区块里面。这些方法是模块公开接口的部分。如果有的话，该区块应该包括configModule和initModule

```
  //------------------- BEGIN PUBLIC METHODS -------------------
  configModule = function ( input_map ) {
    spa.util.setConfigMap({
      input_map    : input_map,
      settable_map : configMap.settable_map,
      config_map   : configMap
    });
    return true;
  };
  initModule = function ( $container ) {
    setJqueryMap( $container );
    $.gevent.subscribe( $container, 'spa-logout',     onLogout     );
    $container
      .bind( 'utap',       onTapNav       )
      .bind( 'uheldend',   onHeldendNav   );
    return true;
  };
  return {
    configModule : configModule,
    initModule   : initModule
  };
  //------------------- END PUBLIC METHODS ---------------------
  ```
