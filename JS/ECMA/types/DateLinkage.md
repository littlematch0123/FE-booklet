# 利用select实现年月日三级联动的日期选择效果

&emsp;&emsp;关于select控件，可能年月日三级联动的日期选择效果是最常见的应用了。本文是[选择框脚本](http://www.cnblogs.com/xiaohuochai/p/5877287.html)的实践，下面将对日期选择效果进行详细介绍

&nbsp;

### 演示

<iframe style="width: 100%; height: 80px;" src="https://demo.xiaohuochai.site/js/date/d2.html" frameborder="0" width="320" height="240"></iframe>

### 规划

&emsp;&emsp;默认情况下，年、月、日分别由3个select控件组成，id分别为sel1，sel2，sel3。它们且所包含的option[0]的值，分别为'年'、'月'、'日'

&emsp;&emsp;年份范围为1900-2100，月份范围为1-12，天的范围为1-31

&emsp;&emsp;年份范围、月份范围是不变的。而天的范围根据实际日期的计算来改变其范围值

&emsp;&emsp;id为result的span元素储存最终选择的日期值及对应的星期值

<div>
<pre>&lt;div id="box"&gt;
    &lt;select name="sel1" id="sel1"&gt;
        &lt;option value="year"&gt;年&lt;/option&gt;
    &lt;/select&gt;
    &lt;select name="sel2" id="sel2"&gt;
    &lt;option value="month"&gt;月&lt;/option&gt;
    &lt;/select&gt;
    &lt;select name="sel3" id="sel3"&gt;
    &lt;option value="day"&gt;日&lt;/option&gt;
    &lt;/select&gt;
    &lt;span id="result"&gt;&lt;/span&gt;
&lt;/div&gt;</pre>
</div>

&nbsp;

### 结构生成

&emsp;&emsp;由于数据太过庞大，所以使用javascript生成的方式生成结构

<div>
<pre>//生成1900年-2100年
for(var i = 1900; i&lt;=2100;i++){
    var option = document.createElement('option');
    option.setAttribute('value',i);
    option.innerHTML = i;
    sel1.appendChild(option);
}
//生成1月-12月
for(var i = 1; i &lt;=12; i++){
    var option = document.createElement('option');
    option.setAttribute('value',i);
    option.innerHTML = i;
    sel2.appendChild(option);    
}
//生成1日&mdash;31日
for(var i = 1; i &lt;=31; i++){
    var option = document.createElement('option');
    option.setAttribute('value',i);
    option.innerHTML = i;
    sel3.appendChild(option);    
}</pre>
</div>

&nbsp;

### 算法处理

&emsp;&emsp;算法的实质就是确定某年某月到底有多少天，然后对多余的天数进行删除或者对少的天数进行添加

【1】闰年

&emsp;&emsp;年分为闰年和平年，平年有365天，闰年有366天。闰年的2月比平年多一天

&emsp;&emsp;闰年的定义是(可被4整除)且((不可被100整除)或(可被400整除))的年份

&emsp;&emsp;口诀是：四年一闰，百年不闰，四百年再闰

<div>
<pre>if((year % 4 === 0 &amp;&amp; year % 100 !== 0)  || year % 400 === 0){
    return 'leap year'
}else{
    return 'common year'
}</pre>
</div>

【2】大小月

&emsp;&emsp;一年有12个月，其中4、6、9、11月每月有30天；如果是闰年，2月有29天，否则 ，2月有28天。1、3、5、7、8、10、12月每月有31天

<div>
<pre>if(month == 2){
    //如果是闰年
    if((year % 4 === 0 &amp;&amp; year % 100 !== 0)  || year % 400 === 0){
        days = 29;
    //如果是平年
    }else{
        days = 28;
    }
//如果是第4、6、9、11月
}else if(month == 4 || month == 6 ||month == 9 ||month == 11){
    days = 30;
}else{
    days = 31;
}</pre>
</div>

【3】增减情况

&emsp;&emsp;考虑特殊情况，如果先选择31日，再选择2月，则发生错误。所以，选择年份时，月份和天数自动置为默认值'月'和'日'，天数的范围重置为'31'

<div>
<pre>//年份点击
sel1.onclick = function(){
    //月份显示默认值
    sel2.options[0].selected = true;
    //天数显示默认值
    sel3.options[0].selected = true;
}</pre>
</div>

&emsp;&emsp;选择月份时，天数自动置为默认值'日'，天数的范围根据计算显示相应天数

&emsp;&emsp;此时，天数可能为28、29、30、31四种情况

<div>
<pre>    //增加或删除天数
    //如果是28天，则删除29、30、31天(即使他们不存在也不报错)
    if(days == 28){
        sel3.remove(31);
        sel3.remove(30);
        sel3.remove(29);
    }
    //如果是29天
    if(days == 29){
        sel3.remove(31);
        sel3.remove(30);
        //如果第29天不存在，则添加第29天
        if(!sel3.options[29]){
            sel3.add(new Option('29','29'),undefined)
        }
    }
    //如果是30天
    if(days == 30){
        sel3.remove(31);
        //如果第29天不存在，则添加第29天
        if(!sel3.options[29]){
            sel3.add(new Option('29','29'),undefined)
        }
        //如果第30天不存在，则添加第30天
        if(!sel3.options[30]){
            sel3.add(new Option('30','30'),undefined)
        }
    }
    //如果是31天
    if(days == 31){
        //如果第29天不存在，则添加第29天
        if(!sel3.options[29]){
            sel3.add(new Option('29','29'),undefined)
        }
        //如果第30天不存在，则添加第30天
        if(!sel3.options[30]){
            sel3.add(new Option('30','30'),undefined)
        }
        //如果第31天不存在，则添加第31天
        if(!sel3.options[31]){
            sel3.add(new Option('31','31'),undefined)
        }
    }</pre>
</div>

【4】结果显示

&emsp;&emsp;每次年、月、日的点击事件，都判断年份、月份和天数是否都已经设置为非默认值。如果是的，则显示最终结果，并计算星期值；如果不是，则什么都不执行

<div>
<pre>//星期格式切换
function changDay(num){
    switch(num){
        case 0:
            return '日';
        case 1:
            return '一';
        case 2:
            return '二';
        case 3:
            return '三';
        case 4:
            return '四';
        case 5:
            return '五';
        case 6:
            return '六';            
    }
}</pre>
</div>
<div>
<pre>//结果显示
box.onclick = function(){
    //当年、月、日都已经为设置值时
    if(sel1.value !='year' &amp;&amp; sel2.value != 'month' &amp;&amp; sel3.value !='day'){
        var day = new Date(sel1.value,sel2.value-1,sel3.value).getDay();
        result.innerHTML = sel1.value + '年' + sel2.value + '月' +  sel3.value + '日' + '星期' + changDay(day);
    }else{
        result.innerHTML = '';
    }
}</pre>
</div>

