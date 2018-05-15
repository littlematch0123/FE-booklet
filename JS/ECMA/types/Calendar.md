# javascript中Date对象的应用——简易日历的实现

&emsp;&emsp;简易日历作为javascript中Date对象的常见应用，用途较广泛。本文将详细说明简易日历的实现思路

&nbsp;

### 效果演示

<iframe style="width: 100%; height: 400px;" src="https://demo.xiaohuochai.site/js/date/d1.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

### HTML说明

&emsp;&emsp;使用type=number的两个input分别作为年和月的输入控件，这样在高级浏览器下自带调节按钮

&emsp;&emsp;按照周日到周六的顺序进行星期的排列

<div>
<pre>&lt;div class="box"&gt;
    &lt;header class='control'&gt;
        &lt;input id="conYear" class="con-in" type="number" min="1900" max="2100" step="1"/&gt;
        &lt;input id="conMonth" class="con-in" type="number" min="1" max="12" step="1"/&gt;
    &lt;/header&gt;
    &lt;div class="DateBox"&gt;
        &lt;header class='week'&gt;
            &lt;div class="week-in"&gt;周日&lt;/div&gt;
            &lt;div class="week-in"&gt;周一&lt;/div&gt;
            &lt;div class="week-in"&gt;周二&lt;/div&gt;
            &lt;div class="week-in"&gt;周三&lt;/div&gt;
            &lt;div class="week-in"&gt;周四&lt;/div&gt;
            &lt;div class="week-in"&gt;周五&lt;/div&gt;
            &lt;div class="week-in"&gt;周六&lt;/div&gt;
        &lt;/header&gt;
        &lt;section class="dayBox" id='dayBox'&gt;
            &lt;div class="day" id="day1"&gt;1&lt;/div&gt;
            &lt;div class="day"&gt;2&lt;/div&gt;
            &lt;div class="day"&gt;3&lt;/div&gt;
            &lt;div class="day"&gt;4&lt;/div&gt;
            &lt;div class="day"&gt;5&lt;/div&gt;
            &lt;div class="day"&gt;6&lt;/div&gt;
            &lt;div class="day"&gt;7&lt;/div&gt;
            &lt;div class="day"&gt;8&lt;/div&gt;
            &lt;div class="day"&gt;9&lt;/div&gt;
            &lt;div class="day"&gt;10&lt;/div&gt;
            &lt;div class="day"&gt;11&lt;/div&gt;
            &lt;div class="day"&gt;12&lt;/div&gt;
            &lt;div class="day"&gt;13&lt;/div&gt;
            &lt;div class="day"&gt;14&lt;/div&gt;
            &lt;div class="day"&gt;15&lt;/div&gt;
            &lt;div class="day"&gt;16&lt;/div&gt;
            &lt;div class="day"&gt;17&lt;/div&gt;
            &lt;div class="day"&gt;18&lt;/div&gt;
            &lt;div class="day"&gt;19&lt;/div&gt;
            &lt;div class="day"&gt;20&lt;/div&gt;
            &lt;div class="day"&gt;21&lt;/div&gt;
            &lt;div class="day"&gt;22&lt;/div&gt;
            &lt;div class="day"&gt;23&lt;/div&gt;
            &lt;div class="day"&gt;24&lt;/div&gt;
            &lt;div class="day"&gt;25&lt;/div&gt;
            &lt;div class="day"&gt;26&lt;/div&gt;
            &lt;div class="day"&gt;27&lt;/div&gt;
            &lt;div class="day"&gt;28&lt;/div&gt;
            &lt;div class="day"&gt;29&lt;/div&gt;
            &lt;div class="day" id="day30"&gt;30&lt;/div&gt;
            &lt;div class="day" id="day31"&gt;31&lt;/div&gt;
        &lt;/section&gt;
    &lt;/div&gt;    
&lt;/div&gt;</pre>
</div>

&nbsp;

### CSS说明

&emsp;&emsp;对于简易日历的实现，首先确定日历中class="day"的div的排列方式为浮动。这样可以通过改变第一天div的位置，来实现所有同级div都可以跟随移动的效果

<div>
<pre>body{
    margin: 0;
}
input{
    border: none;
    padding: 0;
}
.box{
    width: 354px;
    margin: 30px auto 0;    
}
.DateBox{
    height: 300px;
    border: 2px solid black;
}    
.week{
    overflow: hidden;
    border-bottom: 1px solid black;
    line-height: 49px;
}
.week-in{
    height: 49px;
    float: left;
    width: 50px;
    text-align: center;
}
.dayBox{
    overflow: hidden;
}
.day{
    float: left;
    height: 50px;
    width: 50px;
    font:20px/50px '微软雅黑';
    text-align: center;
}
.control{
    overflow: hidden;
}
.con-in{
    height: 50px;
    float: left;
    width: 100px;
    text-align: center;
    font: 20px/50px "微软雅黑";
}</pre>
</div>

&nbsp;

### JS说明

&emsp;&emsp;简易日历的JS逻辑总共需要5个实现：

&emsp;&emsp;【1】需要获取当月的天数，获取当月第一天、第30天、第31天是周几

&emsp;&emsp;【2】根据当月第一天的星期，改变第一天的margin-left值，移动第一天到对应的位置；由于浮动的关系，其余天也会跟着移动到对应的位置

&emsp;&emsp;【3】根据当月的天数，隐藏多余的天；当然，隐藏之前要先显示在其他月份可能被隐藏的天

&emsp;&emsp;【4】如果当月30日是周日，则会新占一行。这时通过改变30日这天的margin值将其移动到第一行(若31日可能会新占一行，也做相似处理)

&emsp;&emsp;【5】载入页面后，获取当前的年和月，显示当月日历；当改变年或月时，获取改变后的值，更新日历

<div>
<pre>//准备:获取当前样式
function getCSS(obj,style){
    if(window.getComputedStyle){
        return getComputedStyle(obj)[style];
    }
    return obj.currentStyle[style];
}</pre>
</div>
<div>
<pre>//实现一：获取当月的天数，及当月第一天、第30日、第31日是星期几
function get_data(year,month){
    var result = {};
    var d = new Date();
    //如果是2月
    if(month == 2){
        //如果是闰年
        if((year % 4 === 0 &amp;&amp; year % 100 !== 0)  || year % 400 === 0){
            result.days = 29;
        //如果是平年
        }else{
            result.days = 28;
        }
    //如果是第4、6、9、11月
    }else if(month == 4 || month == 6 ||month == 9 ||month == 11){
        result.days = 30;
    }else{
        result.days = 31;
        //当月第31天是星期几
        result.day31week = d.getDay(d.setFullYear(year,month-1,31));
    }
    //当月第一天是星期几
    result.day1week = d.getDay(d.setFullYear(year,month-1,1));
    if(month != 2){
        //当月第30天是星期几
        result.day30week = d.getDay(d.setFullYear(year,month-1,30));        
    }
    return result;
}</pre>
</div>
<div>
<pre>//实现二：根据当月第一天的星期x，设置第一天的margin-left=宽度*x，使其对应到正确的星期位置上
function move_day1(year,month){
    var week1 = get_data(year,month).day1week;
    day1.style.marginLeft = week1%7*parseInt(getCSS(day1,'width'))+ 'px';
}</pre>
</div>
<div>
<pre>//实现三：根据当月的天数，来隐藏多余的天数。当然首先要先显示在其他月份被隐藏的天数
function hide_days(year,month){
    //恢复其他月份可能隐藏的天数
    for(var i = 28; i&lt;31; i++){
        dayBox.children[i].style.display = 'block';
    }    
    //隐藏当月多余的天数
    var days = get_data(year,month).days;
    for(var i = days;i&lt;31;i++){
        dayBox.children[i].style.display = 'none';
    }
};</pre>
</div>
<div>
<pre>//实现四：如果当月30日或31日是星期日，则会新占一行，通过设置margin-top把新占一行的天移动到第一行
function move_day30(year,month){
    //如果当月30日是星期日
    if(get_data(year,month).day30week === 0){
        day30.style.marginTop = parseInt(getCSS(day30,'height')) *(-5) + 'px';
        day31.style.marginTop = parseInt(getCSS(day31,'height')) *(-5) + 'px';
        day31.style.marginLeft= getCSS(day31,'width');
        return;
    }else{
        day30.style.marginTop = day31.style.marginTop = day31.style.marginLeft ='0';
    }
    //如果当月31日是星期日
    if(get_data(year,month).day31week === 0){
        day31.style.marginTop = parseInt(getCSS(day31,'height')) *(-5) + 'px';
    }else{
        day31.style.marginTop = '0';
    }
}</pre>
</div>
<div>
<pre>//实现五：当载入页面时，获取当前年和月，显示当月日历；当改变年或月时，获取改变后的年和月，更新当月日历
var year= conYear.value=new Date().getFullYear();
var month= conMonth.value = new Date().getMonth() + 1;
move_day1(year,month);
hide_days(year,month);
move_day30(year,month);

conYear.onchange = conMonth.onchange = function(){
    var year = conYear.value;
    var month = conMonth.value;
    if(year&lt;1900 || year &gt;2100 ){
        year = conYear.value=new Date().getFullYear();
    }
    if(month&lt;1 || month &gt; 12){
        month = conMonth.value=new Date().getMonth() + 1;
    }
    move_day1(year,month);
    hide_days(year,month);
    move_day30(year,month);
}</pre>
</div>

