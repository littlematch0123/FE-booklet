# BOM之navigator对象和用户代理检测

&emsp;&emsp;navigator对象现在已经成为识别客户端浏览器的事实标准，navigator对象是所有支持javascript的浏览器所共有的。本文将详细介绍navigator对象和用户代理检测

&nbsp;

### 属性

&emsp;&emsp;与其他BOM对象的情况一样，每个浏览器中的navigator对象也都有一套自己的属性。下表列出了存在于所有浏览器中的属性和方法，以及支持它们的浏览器版本

<div>
<pre>属性                    说明

appCodeName             浏览器名称[所有浏览器都返回Mozilla]
userAgent               浏览器的用户代理字符串
appVersion              浏览器版本
appMinorVersion         次版本信息[IE返回0，chrome和firefox不支持]
platform                浏览器所在的系统平台[所有浏览器都返回Win32]
plugins                 浏览器中安装的插件信息的数组
mimeTypes               在浏览器中注册的MIME类型数组

language                浏览器主语言[IE10-不支持，其他浏览器返回zh-CN]
systemLanguage          操作系统语言[IE返回zh-CN，chrome和firefox不支持]
userLanguage            操作系统默认语言[IE返回zh-CN，chrome和firefox不支持]
product                 产品名称[IE10-不支持，其他浏览器返回Gecko]
productSub              产品次要信息[IE不支持，chrome返回20030107，firefox返回20100101]
vendor                  浏览器品牌[chrome返回Google Inc.，IE和firefox不支持]
onLine                  是否连接因特网[IE根据实际情况返回true或false，chrome和firefox始终返回true]

cookieEnabled           表示cookie是否启用[所有浏览器都返回true]
javaEnabled             是否启用java[IE8-浏览器返回{}，其他浏览器返回function javaEnabled()]
buildID                 浏览器编译版本[firefox返回20170125094131，chrome和IE不支持]
cpuClass                计算机使用的CPU类型[IE返回x86，chrome和firefox不支持]
oscpu                   操作系统或使用的CPU[firefox返回Windows NT 10.0; WOW64，chrome和IE不支持]</pre>
</div>

&nbsp;

### 检测插件

&emsp;&emsp;检测浏览器插件是一种最常见的检测例程

&emsp;&emsp;对于非IE浏览器，可以使用plugins数组来达到这个目的该数组中的每一项都包含下列属性

<div>
<pre>name:插件的名字　
description:插件的描述
filename:插件的文件名
length:插件所处理的MIME类型数量</pre>
</div>

&emsp;&emsp;通过循环迭代每个插件并将插件的name与给定的名字进行比较

<div>
<pre>function hasPlugin(name){
    name = name.toLowerCase();
    for(var i = 0; i &lt; navigator.plugins.length; i++){
        if(navigator.plugins[i].name.toLowerCase().indexOf(name) &gt; -1){
            return true;
        }
    }
}
//检测flash
console.log(hasPlugin("Flash"));//true   </pre>
</div>

&emsp;&emsp;对于IE浏览器，检测插件的办法是使用专有的ActiveXObject类型，并尝试创建一个特定插件的实例。IE是使用COM对象来实现插件的，而COM对象使用唯一标识符来标识。因此，想检查特定的插件就必须知道其COM标识符。例如，Flash的标识符是ShockwaveFlash.ShockwaveFlash

<div>
<pre>function hasIEPlugin(name){
    try{
        new ActiveXObject(name);
        return true;
    }catch(ex){
        return false;
    }
}
//检测Flash
console.log(hasIEPlugin("ShockwaveFlash.ShockwaveFlash"))//true</pre>
</div>

【兼容写法】

<div>
<pre>//检测非IE中的插件
function hasPlugin(name){
    name = name.toLowerCase();
    for(var i = 0; i &lt; navigator.plugins.length; i++){
        if(navigator.plugins[i].name.toLowerCase().indexOf(name) &gt; -1){
            return true;
        }
    }
}
//检测IE中的插件
function hasIEPlugin(name){
    try{
        new ActiveXObject(name);
        return true;
    }catch(ex){
        return false;
    }
}
function hasFlash(){
    var result = hasPlugin("Flash");
    if(!result){
        result = hasIEPlugin("ShockwaveFlash.ShockwaveFlash");
    }
    return result;
}
console.log(hasFlash());//true</pre>
</div>

&nbsp;

### 用户代理检测

&emsp;&emsp;navigator对象中最重要的作用就是使用useragent实现用户代理检测。用户代理检测是一种万不得已的做法，优先级排在前面介绍过的[能力检测](http://www.cnblogs.com/xiaohuochai/p/6381029.html)之后

**发展历史**

&emsp;&emsp;1、1993年美国NCSA国家超级计算机中心发布了世界上第一款web浏览器Mosaic，该浏览器的用户代理字符串为Mosaic/0.9

&emsp;&emsp;2、Netscape公司进入浏览器开发领域，将自己产品的代号定名了Mozilla(Mosaic Killer)的简写，用户代理字符串格式为Mozilla/版本号 [语言] (平台；加密类型)

&emsp;&emsp;3、IE赢得用户广泛认可的web浏览器IE3发布时，Netscape已经占据了绝对市场份额，为了让服务器能够检测到IE，IE将用户代理字符串修改成兼容Netscape的形式：Mozilla/2.0(compatible;MSIE版本号；操作系统)

&emsp;&emsp;4、各浏览器陆续出现，用户代理字符串的显示格式也越来越类似&hellip;&hellip;

&emsp;&emsp;HTTP规范明确规定，浏览器应该发送简短的用户代理字符串，指明浏览器的名称和版本号。但现实中却没有这么简单，各浏览器的检测结果如下所示

**检测结果**

【IE3】

&emsp;&emsp;Mozilla/2.0 (compatible; MSIE3.02; windows 95)

【IE6】

&emsp;&emsp;Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)

【IE7】

&emsp;&emsp;Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)

【IE8】

&emsp;&emsp;Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0)

【IE9】

&emsp;&emsp;Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)

【IE10】

&emsp;&emsp;Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)

【IE11】

&emsp;&emsp;Mozilla/5.0 (MSIE 9.0; Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET4.0C; .NET4.0E; InfoPath.3; GWX:QUALIFIED; rv:11.0) like Gecko

【chrome】

&emsp;&emsp;Mozilla/5.0 (Windows NT 6.1; WOW64)G AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.93 Safari/537.36

【safari】

&emsp;&emsp;Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2

【firefox】

&emsp;&emsp;Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.0

【opera】

&emsp;&emsp;Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/45.0.2454.85 Safari/537.36 OPR/32.0.1948.25

【ipad】

&emsp;&emsp;Mozilla/5.0 (iPad; CPU OS 7_0 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53

【iphone】

&emsp;&emsp;Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4

【android】

&emsp;&emsp;Mozilla/5.0 (Linux; Android 4.2.2; GT-I9505 Build/JDQ39) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.59 Mobile Safari/537.36

&nbsp;

### 识别内核

&emsp;&emsp;常见的内核有Trident、Gecko和Webkit

&emsp;&emsp;注意：因为Trident和Webkit的用户代理字符串中可能会出现like Gecko的字眼，所以最后再测Gecko

<div>
<pre>function whichEngine(){
    var ua = navigator.userAgent;
    //Trident内核
    if(/Trident/.test(ua)){
        return "Trident";
    }
    //Webkit内核
    if(/WebKit/.test(ua)){
        return "WebKit";
    }        
    //Gecko内核
    if(/Gecko/.test(ua)){
        return "Gecko";
    }
}
console.log(whichEngine());//IE11下显示"Trident"</pre>
</div>

&nbsp;

### 识别浏览器

【1】IE

&emsp;&emsp;IE3-IE10都可以通过MSIE的版本号来判断，因为有的IE11并不出现MSIE字符，且safari中也有rv字段，所以IE11需要通过rv后的版本号和Trident来配合判断

<div>
<pre>function isIE(){
    var ua = navigator.userAgent;
    //检测Trident引擎，IE8+
    if(/Trident/.test(ua)){
        //IE11+
        if(/rv:(\d+)/.test(ua)){
            return RegExp["$1"];
        }    
        //IE8-IE10    
        if(/MSIE (\d+)/.test(ua)){
            return RegExp["$1"];
        }        
    }
    //检测IE标识，IE7-
    if(/MSIE (\d+)/.test(ua)){
        return RegExp["$1"];
    }    
}
console.log(isIE());//只有IE会返回版本号，其他浏览器都返回undefined</pre>
</div>

【2】chrome

<div>
<pre>function isChrome(){
    var ua = navigator.userAgent;
    //先排除opera,因为opera只是在chrome的userAgent后加入了自己的标识
    if(!/OPR/.test(ua)){
        if(/Chrome\/(\S+)/.test(ua)){
            return RegExp["$1"];
        }    
    }    
}
console.log(isChrome());//只有Chrome会返回版本号45.0.2454.93，其他浏览器都返回undefined</pre>
</div>

【3】safari

<div>
<pre>function isSafari(){
    var ua = navigator.userAgent;
    //先排除opera
    if(!/OPR/.test(ua)){
        //检测出chrome和safari浏览器
        if(/Safari/.test(ua)){
            //检测出safari
            if(/Version\/(\S+)/.test(ua)){
                return RegExp["$1"];
            }        
        }
    }    
}
console.log(isSafari());//只有safari会返回版本号5.1.7，其他浏览器都返回undefined</pre>
</div>

【4】firefox

<div>
<pre>function isFireFox(){
    if(/Firefox\/(\S+)/.test(navigator.userAgent)){
        return RegExp["$1"];
    }    
}
console.log(isFireFox());//只有firefox会返回版本号40.0，其他浏览器都返回undefined</pre>
</div>

【5】opera

<div>
<pre>function isOpera(){
    if(/OPR\/(\S+)/.test(navigator.userAgent)){
        return RegExp["$1"];
    }    
}
console.log(isOpera());//只有opera会返回版本号32.0.1948.25，其他浏览器都返回undefined </pre>
</div>

&nbsp;

### 识别操作系统

&emsp;&emsp;使用navigator.platform检测操作系统更加简单，因为其可能包括的值为&ldquo;Win32&rdquo;、&ldquo;Win64&rdquo;、&ldquo;MacPPC&rdquo;、&ldquo;MacIntel&rdquo;、&ldquo;X11&rdquo;和"Linux i686"等，且在不同浏览器中是一致的

&emsp;&emsp;而通过navigator.userAgent可以来得到window系统的详细信息

<div>
<pre>windows版本                        -&gt;             内核版本
Windows XP                        -&gt;             5.1
Windows Vista                     -&gt;             6.0
Windows 7                         -&gt;             6.1
Windows 8                         -&gt;             6.2
Windows 8.1                       -&gt;             6.3
Windows 10技术预览版             　 -&gt;             6.4
Windows 10.0    　　　　            -&gt;             10.0 </pre>
</div>
<div>
<pre>function whichSyStem(){
    var ua = navigator.userAgent;
    var pf = navigator.platform;
    if(/Mac/.test(pf)){
        return "Mac";
    }
    if(/X11/.test(pf) || /Linux/.test(pf)){
        return "Linux";
    }
    if(/Win/.test(pf)){
        if(/Windows NT (\d+\.\d+)/.test(ua)){
            switch(RegExp["$1"]){
                case "5.0":
                    return "Windows 2000";
                case "5.1":
                    return "Windows XP";
                case "6.0":
                    return "Windows Vista";
                case "6.1":
                    return "Windows 7";
                case "6.2":
                    return "Windows 8";
                case "6.3":
                    return "Windows 8.1";
                case "6.4":
                case "10.0":
                    return "Windows 10";                    
            }
        }
    }
}
console.log(whichSyStem())//Windows 10</pre>
</div>

&nbsp;

### 识别移动端

<div>
<pre>function whichMobile(){
    var ua = navigator.userAgent;
    if(/iPhone OS (\d+_\d+)/.test(ua)){
        return 'iPhone' + RegExp.$1.replace("_",".");
    }
    if(/iPad.+OS (\d+_\d+)/.test(ua)){
        return 'iPad' + RegExp.$1.replace("_",".")
    }
    if(/Android (\d+\.\d+)/.test(ua)){
        return 'Android' + RegExp["$1"];
    }
}
console.log(whichMobile())//Android 5.1</pre>
</div>
