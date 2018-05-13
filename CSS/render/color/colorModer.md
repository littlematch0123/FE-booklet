# CSS颜色模式转换器的实现

&emsp;&emsp;在CSS中，颜色的表示方式主要包括关键字、16进制、RGB模式、RGBA模式、HSL模式、HSLA模式。[关于颜色模式的详细信息移步至此](http://www.cnblogs.com/xiaohuochai/p/5204448.html)。本文就16进制、RGB模式及HSL模式的互相转换进行实现。

&nbsp;

### 模式转换

**【1】16进制 -&gt; RGB**

&emsp;&emsp;16进制是设置颜色值的常用方式，将三个介于00-FF的十六进制数连接起来，若16进制的3组数各自成对，则可简写为3位。

&emsp;&emsp;16进制与RGB模式的对应关系为：16进制的前两位对应RGB的red部分；16进制的中间两位对应RGB的green部分；16进制的后两位对应RGB的blue部分。而16进制使用的16进制的数字格式，而RGB使用的10进制的数字格式。所以还需要数字进制的变换

<div>
<pre>function sixteenToRgb(str){
    var r,g,b,rgb;
    if(str.length == 7){
        r = parseInt(str.substr(1,2),16);
        g = parseInt(str.substr(3,2),16);
        b = parseInt(str.substr(5,2),16);
    }else if(str.length == 4){
        r = parseInt('' + str.substr(1,1) + str.substr(1,1),16);
        g = parseInt('' + str.substr(2,1) + str.substr(2,1),16);
        b = parseInt('' + str.substr(3,1) + str.substr(3,1),16);        
    }else{
        return 'false'
    }
    rgb = 'rgb(' + r +',' + g +','+b +')';
    return  rgb;
}
console.log(sixteenToRgb('#123456'));//rgb(18,52,86)    
console.log(sixteenToRgb('#123'));//rgb(17,34,51)
console.log(sixteenToRgb('#1234'));//false</pre>
</div>

&nbsp;

**【2】RGB -&gt; 16进制**

&emsp;&emsp;通过组合不同的红色、绿色、蓝色分量创造出的颜色成为RGB模式的颜色。显示器是由一个个像素构成，利用电子束来表现色彩。像素把光的三原色:红色(R)、绿色(G)、蓝色(B)组合起来。每像素包含8位元色彩的信息量，有0-255的256个单元，其中0是完全无光状态，255是最亮状态

&emsp;&emsp;在RGB模式转换为16进制模式要注意的是，转换的成R、G、B三个分量的16进制值如果是一位数，则需要在前一位补0

<div>
<pre>function rgbToSixteen(str){
    var r16,g16,b16,sixteen;
    if(/^rgb\((\d+)\,(\d+)\,(\d+)\)$/.test(str)){
           if( RegExp.$1 &gt;= 0 &amp;&amp; RegExp.$1 &lt;=255 || RegExp.$2 &gt;= 0 &amp;&amp; RegExp.$2 &lt;=255 || RegExp.$3 &gt;= 0 &amp;&amp; RegExp.$3 &lt;=255){
               r16 = addZero(Number(RegExp.$1).toString(16));
               g16 = addZero(Number(RegExp.$2).toString(16));
               b16 = addZero(Number(RegExp.$3).toString(16));
            　 sixteen = '#' + r16 + g16 + b16 ;
            　 return  sixteen;
           }else{
               return 'false';
           }
    }else{
        return 'false';
    }
}
function addZero(str){
    if(str.length == 1){
        return '0' + str;
    }else{
        return str;
    }
}
console.log(rgbToSixteen('rgb(10,44,3)'));//#0a2c03    
console.log(rgbToSixteen('rgb(-10,44,3)'));//false
console.log(rgbToSixteen('rgb(123)'));//false</pre>
</div>

&nbsp;

**【3】HSL -&gt; RGB**

&emsp;&emsp;HSL模式是通过对色调(H)、饱和度(S)、亮度(L)三个颜色通道的变化以及它们相互的叠加得到各式各样的颜色。HSL标准几乎可以包括人类视力所能感知的所有颜色

&emsp;&emsp;h:色调(hue)可以为任意整数。0(或360或-360)表示红色，60表示黄色，120表示绿色，180表示青色，240表示蓝色，300表示洋红(当h值大于360时，实际的值等于该值模360后的值)

&emsp;&emsp;s:饱和度(saturation)，就是指颜色的深浅度和鲜艳程度。取0-100%范围的值，其中0表示灰度(没有该颜色)，100%表示饱和度最高(颜色最鲜艳)

&emsp;&emsp;l:亮度(lightness)，取0-100%范围的值，其中0表示最暗(黑色)，100%表示最亮(白色)

<div>
<pre>//参考http://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
function hslToRgb(str){
    var r, g, b;
    var h, s, l;
    if(/^hsl\((\d+)\,(\d+)%\,(\d+)%\)$/.test(str)){
           if( RegExp.$1 &gt;= 0 &amp;&amp; RegExp.$1 &lt;=360 &amp;&amp; RegExp.$2 &gt;= 0 &amp;&amp; RegExp.$2 &lt;=100 &amp;&amp; RegExp.$3 &gt;= 0 &amp;&amp; RegExp.$3 &lt;=100){
               h = RegExp.$1/360;
               s = RegExp.$2/100;
               l = RegExp.$3/100;
            if(s == 0){
                r = g = b = l; 
            }else{
                var hue2rgb = function hue2rgb(p, q, t){
                    if(t &lt; 0) t += 1;
                    if(t &gt; 1) t -= 1;
                    if(t &lt; 1/6) return p + (q - p) * 6 * t;
                    if(t &lt; 1/2) return q;
                    if(t &lt; 2/3) return p + (q - p) * (2/3 - t) * 6;
                    return p;
                }
                var q = l &lt; 0.5 ? l * (1 + s) : l + s - l * s;
                var p = 2 * l - q;
                r = hue2rgb(p, q, h + 1/3);
                g = hue2rgb(p, q, h);
                b = hue2rgb(p, q, h - 1/3);
            }
            return 'rgb(' + Math.round(r * 255) + ','+ Math.round(g * 255)+ ',' + Math.round(b * 255) + ')';
        }else{
               return 'false';
           }
    }else{
        return 'false';
    }
}
console.log(hslToRgb('hsl(248,64%,39%)'));//rgb(53,36,163)    
console.log(hslToRgb('hsl(-248,64%,39%)'));//false    
console.log(hslToRgb('hsl(300,40%,50%)'));//rgb(179,77,178)    </pre>
</div>

&nbsp;

**【4】RGB -&gt; HSL**

<div>
<pre>//参考http://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
function rgbToHsl(str){
    var r,g,b;
    if(/^rgb\((\d+)\,(\d+)\,(\d+)\)$/.test(str)){
           if( RegExp.$1 &gt;= 0 &amp;&amp; RegExp.$1 &lt;=255 &amp;&amp; RegExp.$2 &gt;= 0 &amp;&amp; RegExp.$2 &lt;=255 &amp;&amp; RegExp.$3 &gt;= 0 &amp;&amp; RegExp.$3 &lt;=255){
            r = RegExp.$1/255, g = RegExp.$2/255, b = RegExp.$3/255;
            var max = Math.max(r, g, b), min = Math.min(r, g, b);
            var h, s, l = (max + min) / 2;
            if(max == min){
                h = s = 0; // achromatic
            }else{
                var d = max - min;
                s = l &gt; 0.5 ? d / (2 - max - min) : d / (max + min);
                switch(max){
                    case r: h = (g - b) / d + (g &lt; b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }
            return 'hsl(' + Math.round(h*360) + ',' + Math.round(s*100) + '%,' + Math.round(l*100) + '%)';
           }else{
               return 'false';
           }
    }else{
        return 'false';
    }
}
console.log(rgbToHsl('rgb(53,36,163)'));//hsl(248,64%,39%)
console.log(rgbToHsl('rgb(179,77,178)'));//hsl(301,40%,50%)
console.log(rgbToHsl('rgb(300,1,1)'));//false</pre>
</div>

&nbsp;

### DEMO实现

**简易拾色器**

<iframe style="width: 100%; height: 240px;" src="https://demo.xiaohuochai.site/css/colorModer/c1.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

**16进制颜色转换器**

<iframe style="width: 100%; height: 320px;" src="https://demo.xiaohuochai.site/css/colorModer/c2.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

**RGB颜色转换器**

<iframe style="width: 100%; height: 340px;" src="https://demo.xiaohuochai.site/css/colorModer/c3.html" frameborder="0" width="320" height="240"></iframe>

&nbsp;

**HSL颜色转换器**

<iframe style="width: 100%; height: 340px;" src="https://demo.xiaohuochai.site/css/colorModer/c4.html" frameborder="0" width="320" height="240"></iframe>
