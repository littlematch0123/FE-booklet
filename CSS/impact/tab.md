# CSS实现导航条Tab切换的三种方法

&emsp;&emsp;导航条Tab在页面中非常常见，本文说详细介绍CSS实现导航条Tab的三种方法



<p>&nbsp;</p>


### 布局


<div><img src="https://pic.xiaohuochai.site/blog/CSS_render_buju.png" alt="buju"></div>

&emsp;&emsp;根据上图所示，先规定几个定义，上图的模块整体叫做导航，由导航标题和导航内容组成。要实现上图所示的布局效果，有两种布局方法：语义布局和视觉布局


【语义布局】

&emsp;&emsp;从语义布局的角度来看，每一个导航标题和其对应的导航内容应该是一个整体

    <style>
    body,p{margin: 0;}
    h2{margin: 0;font-size:100%;}
    ul{margin: 0;padding: 0;list-style: none;}   
    a{text-decoration: none;color:inherit;}
    .box{width: 572px;border: 1px solid #999;overflow: hidden;}
    .nav{margin-left: -1px;font: 14px "微软雅黑";overflow: hidden;background-color: #f1f1f1;}
    .navI{float: left;width: 33.333%;box-sizing: border-box;}
    .navI-tit{line-height: 40px;text-align: center;cursor: pointer;border-left: 1px solid #cecece;border-bottom: 1px solid #cecece;}
    .navI-txt{width: 572px;height:200px;text-indent:2em;line-height: 2;background:#fff;}
    .ml1{margin-left: -100%;}
    .ml2{margin-left: -200%;}
    .navI_active{position:relative;z-index:1;}
    </style>

    <div class="box">
        <ul class="nav">
            <li class="navI navI_active">
                <h2 class="navI-tit">课程</h2>
                <p class="navI-txt">课程内容</p>
            </li>
            <li class="navI">
                <h2 class="navI-tit">学习计划</h2>
                <p class="navI-txt ml1">学习计划内容</p>
            </li>
            <li class="navI">
                <h2 class="navI-tit">技能图谱</h2>
                <p class="navI-txt ml2">技能图谱内容</p>
            </li>
        </ul>   
    </div>

<iframe style="width: 100%; height: 250px" src="https://demo.xiaohuochai.site/css/nav/n1.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

【视觉布局】

&emsp;&emsp;从视觉布局的角度来看，所有导航标题为一组，所有导航内容为一组

    <style>
    body,p{margin: 0;}
    ul{margin: 0;padding: 0;list-style: none;}
    a{text-decoration: none;color: inherit;}
    .box{width:572px;border:1px solid #999;font:14px "微软雅黑";overflow:hidden;}
    .nav-tit{margin-left: -1px;height: 40px;line-height: 40px;text-align: center;background-color: #f1f1f1;overflow: hidden;}
    .nav-titI{box-sizing: border-box;float: left;width: 33.333%;border-left: 1px solid #cecece;border-bottom: 1px solid #cecece;cursor: pointer;}
    .nav-txt{height: 200px;text-indent: 2em; line-height: 2;}
    .nav-txtI{height: 200px;}
    </style>

    <div class="box">
        <nav class="nav-tit">
            <a class="nav-titI">课程</a>
            <a class="nav-titI">学习计划</a>
            <a class="nav-titI">技能图谱</a>
        </nav>
        <ul class="nav-txt">
            <li class="nav-txtI nav-txtI_active">课程内容</li>
            <li class="nav-txtI">学习计划内容</li>
            <li class="nav-txtI">技能图谱内容</li>
        </ul>
    </div>

<iframe style="width: 100%; height: 250px" src="https://demo.xiaohuochai.site/css/nav/n2.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

<p>&nbsp;</p>

### hover

&emsp;&emsp;导航条的功能就是点击导航标题时，显示对应的导航内容。如果使用<a href="http://www.cnblogs.com/xiaohuochai/p/5518943.html" target="_blank">伪类</a>hover实现类似效果，使用第一种布局方式语义布局比较合适

&emsp;&emsp;由于在语义布局中，三个导航内容是处于重叠的状态。移入其父元素`.navI`时，触发鼠标的hover态，给父元素添加样式为`position:relative;z-index:1;`。从而提升了<a href="http://www.cnblogs.com/xiaohuochai/p/5304619.html" target="_blank">层级`z-index`</a>。在其子元素导航内容的层级比拼中，“子凭父贵”，父元素层级高的，其导航内容在重叠状态中显示在最上面

    <style>
    body,p{margin: 0;}
    h2{margin: 0;font-size:100%;}
    ul{margin: 0;padding: 0;list-style: none;}   
    a{text-decoration: none;color:inherit;}
    .box{width: 572px;border: 1px solid #999;overflow: hidden;}
    .nav{margin-left: -1px;font: 14px "微软雅黑";overflow: hidden;background-color: #f1f1f1;}
    .navI{float: left;width: 33.333%;box-sizing: border-box;}
    .navI-tit{line-height: 40px;text-align: center;cursor: pointer;border-left: 1px solid #cecece;border-bottom: 1px solid #cecece;}
    .navI-txt{width: 572px;height:200px;text-indent:2em;line-height: 2;background:#fff;}
    .ml1{margin-left: -100%;}
    .ml2{margin-left: -200%;}
    .navI_active{position:relative;z-index:1;}
    /*重点代码*/
    .navI:hover{position:relative;z-index:1;}
    .navI:hover .navI-tit{background:#fff;border-bottom:none;}
    </style>
    <div class="box">
        <ul class="nav">
            <li class="navI navI_active">
                <h2 class="navI-tit">课程</h2>
                <p class="navI-txt">课程内容</p>
            </li>
            <li class="navI">
                <h2 class="navI-tit">学习计划</h2>
                <p class="navI-txt ml1">学习计划内容</p>
            </li>
            <li class="navI">
                <h2 class="navI-tit">技能图谱</h2>
                <p class="navI-txt ml2">技能图谱内容</p>
            </li>
        </ul>   
    </div>

<iframe style="width: 100%; height: 250px" src="https://demo.xiaohuochai.site/css/nav/n3.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

&emsp;&emsp;缺点：初始状态时，第一个导航标题无法实现默认被选中的状态(背景白色，无下划线)；鼠标移出导航模块时，导航内容部分无法固定，显示第一个导航内容；鼠标移出导航模块时，导航标题的样式无法固定，恢复到默认状态




<p>&nbsp;</p>


### 锚点


&emsp;&emsp;实现导航条的关键就在于如何建立导航标题与导航内容之间的联系，而<a href="http://www.cnblogs.com/xiaohuochai/p/5007282.html" target="_blank">锚点</a>就可以实现类似效果。通过点击锚点，页面生成一个哈希值，然后跳转到相应内容的位置


&emsp;&emsp;使用锚点技术时，使用语义布局和视觉布局都可以实现

【1】使用语义布局

&emsp;&emsp;使用语义布局时，可以使用伪类`target`，通过`target`选择器来改变点击导航标题时，当前标题的样式。不仅如此，因为要使用兄弟选择器，所以需要改变HTML结构，将导航标题的HTML结构移到导航内容的下面

&emsp;&emsp;点击导航标题时，触发`target`伪类，改变对应的导航内容的层级`z-index`，从而使当前导航内容在三个导航内容中胜出，在最上层显示；与此同时，改变当前导航标题的样式 

    <style>
    body,p{margin: 0;}
    h2{margin: 0;font-size:100%;}
    ul{margin: 0;padding: 0;list-style: none;}   
    a{text-decoration: none;color:inherit;}
    .box{width: 572px;border: 1px solid #999;overflow: hidden;}
    .nav{margin-left: -1px;font: 14px "微软雅黑";overflow: hidden;background-color: #f1f1f1;}
    .navI{float: left;width: 33.333%;box-sizing: border-box;position:relative;}
    .navI-tit{position:absolute;top:0;left:0;right:0;box-sizing: border-box;line-height: 40px;height: 40px;text-align: center;cursor: pointer;border-left: 1px solid #cecece;border-bottom: 1px solid #cecece;}
    .navI-txt{width: 572px;height:200px;margin-top: 40px;text-indent:2em;line-height: 2;background:#fff;}
    .ml1{margin-left: -100%;}
    .ml2{margin-left: -200%;}
    .navI_active{z-index:1;}
    /*重点代码*/
    .navI-txt:target{position:relative;z-index:1;}
    .navI-txt:target ~ .navI-tit{background:#fff;border-bottom:none;}
    </style>
    <div class="box">
        <ul class="nav">
            <li class="navI navI_active">
                <p class="navI-txt" id="kc">课程内容</p>
                <a class="navI-tit" href="#kc">课程</a>
            </li>
            <li class="navI">
                <p class="navI-txt ml1" id="xx">学习计划内容</p>
                <a class="navI-tit" href="#xx">学习计划</a>
            </li>
            <li class="navI">
                <p class="navI-txt ml2" id="jn">技能图谱内容</p>
                <a class="navI-tit" href="#jn">技能图谱</a>
            </li>
        </ul>   
    </div>

<iframe style="width: 100%; height: 250px" src="https://demo.xiaohuochai.site/css/nav/n4.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

&emsp;&emsp;缺点：初始态默认选中的导航标题样式无法设置；改变了HTML结构；锚点技术本身的局限是锚点目标会尽可能的到达可视区域上方，从而可能会生成页面跳动

【2】使用视觉布局

&emsp;&emsp;在视觉布局中，三个导航内容属于同一个父元素，与父元素的高度相同，并按照块级元素的排列方式进行排布，父元素设置溢出隐藏时，默认只显示第一个导航内容

&emsp;&emsp;点击导航标题时，对应的导航内容到达导航标题行下面，达到了导航切换的效果

&emsp;&emsp;使用伪类`hover`来实现改变当前导航标题样式的效果


    <style>
    body,p{margin: 0;}
    ul{margin: 0;padding: 0;list-style: none;}
    a{text-decoration: none;color: inherit;}
    .box{width:572px;border:1px solid #999;font:14px "微软雅黑";overflow:hidden;}
    .nav-tit{margin-left: -1px;height: 40px;line-height: 40px;text-align: center;background-color: #f1f1f1;overflow: hidden;}
    .nav-titI{box-sizing: border-box;float: left;width: 33.333%;border-left: 1px solid #cecece;border-bottom: 1px solid #cecece;cursor: pointer;}
    .nav-txt{height: 200px;text-indent: 2em; line-height: 2;}
    .nav-txtI{height: 200px;}
    /*重点内容*/
    .nav-txt{overflow: hidden;}
    .nav-titI:hover{background-color: white;border-bottom: none;}
    </style>
    <div class="box">
        <nav class="nav-tit">
            <a class="nav-titI" href="#kc">课程</a>
            <a class="nav-titI" href="#xx">学习计划</a>
            <a class="nav-titI" href="#jn">技能图谱</a>
        </nav>
        <ul class="nav-txt">
            <li class="nav-txtI nav-txtI_active" id="kc">课程内容</li>
            <li class="nav-txtI" id="xx">学习计划内容</li>
            <li class="nav-txtI" id="jn">技能图谱内容</li>
        </ul>
    </div>

<iframe style="width: 100%; height: 250px" src="https://demo.xiaohuochai.site/css/nav/n5.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

&emsp;&emsp;缺点：初始态默认选中的导航标题样式无法设置；锚点技术本身的局限是锚点目标会尽可能的到达可视区域上方，从而可能会生成页面跳动；hover态与点击态分开，可能会让人犯晕；鼠标移出导航模块时，导航标题的样式无法固定，恢复到默认状态




<p>&nbsp;</p>

### label

&emsp;&emsp;上面使用锚点技术来联系导航标题和导航内容，而<a href="http://www.cnblogs.com/xiaohuochai/p/5180638.html#anchor1-8" target="_blank">`label`</a>也可以实现类似的效果。`label`元素为`input`元素定义标注，建立文字标签与表单控件的关联。在`label`元素内点击文本会触发此控件，选择该文本时浏览器会自动把焦点转到和标签相关的表单控件上



&emsp;&emsp;使用`label`时，使用语义布局和视觉布局都可以实现


【1】使用语义布局

&emsp;&emsp;使用语义布局时，使用`label`标签来显示导航标题，且需要配合使用单选按钮`<input type="radio">`。使用伪类`checked`，通过`checked`选择器来改变点击导航标题时，当前标题的样式。不仅如此，因为要使用兄弟选择器，所以需要改变HTML结构，将单选按钮放在每个`.navI`元素里的最上层，然后设置`display:none`，接下来是`<label>`表示导航标题，最后是`<p>`表示导航内容

&emsp;&emsp;点击导航标题时，触发`checked`伪类，改变对应的导航内容的层级`z-index`，从而使当前导航内容在三个导航内容中胜出，在最上层显示；与此同时，改变当前导航标题的样式 


    <style>
    body,p{margin: 0;}
    h2{margin: 0;font-size:100%;}
    ul{margin: 0;padding: 0;list-style: none;}  
    input{margin: 0;width: 0;} 
    a{text-decoration: none;color:inherit;}
    .box{width: 572px;border: 1px solid #999;overflow: hidden;}
    .nav{margin-left: -1px;font: 14px "微软雅黑";overflow: hidden;background-color: #f1f1f1;}
    .navI{float: left;width: 33.333%;box-sizing: border-box;}
    .navI-tit{display:block;line-height: 40px;text-align: center;cursor: pointer;border-left: 1px solid #cecece;border-bottom: 1px solid #cecece;}
    .navI-txt{position:relative;width: 572px;height:200px;text-indent:2em;line-height: 2;background:#fff;}
    .ml1{margin-left: -100%;}
    .ml2{margin-left: -200%;}
    /*重点代码*/
    .navI-radio{display:none;}
    .navI-radio:checked + .navI-tit{background:#fff;border-bottom:none;}
    .navI-radio:checked ~ .navI-txt{z-index:1;}
    </style>
    <div class="box">
        <ul class="nav">
            <li class="navI">
                <input class="navI-radio" name="nav" type="radio" id="kc" checked>
                <label class="navI-tit" for="kc">课程</label>            
                <p class="navI-txt">课程内容</p>
            </li>
            <li class="navI">
                <input class="navI-radio" name="nav" type="radio" id="xx">
                <label class="navI-tit" for="xx">学习计划</label>            
                <p class="navI-txt ml1">学习计划内容</p>
            </li>
            <li class="navI">
                <input class="navI-radio" name="nav" type="radio" id="jn">
                <label class="navI-tit" for="jn">技能图谱</label>            
                <p class="navI-txt ml2">技能图谱内容</p>
            </li>
        </ul>   
    </div>

<iframe style="width: 100%; height: 250px" src="https://demo.xiaohuochai.site/css/nav/n6.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

&emsp;&emsp;缺点：HTML结构较复杂


【2】使用视觉布局

&emsp;&emsp;在视觉布局中，三个导航内容属于同一个父元素，与父元素的高度相同，并按照块级元素的排列方式进行排布，父元素设置溢出隐藏时，默认只显示第一个导航内容

&emsp;&emsp;点击导航标题时，对应的导航内容到达导航标题行下面，达到了导航切换的效果

&emsp;&emsp;使用伪类`hover`来实现改变当前导航标题样式的效果

    <style>
    body,p{margin: 0;}
    ul{margin: 0;padding: 0;list-style: none;}
    a{text-decoration: none;color: inherit;}
    input{margin: 0;padding: 0;border:none;}
    .box{width:572px;border:1px solid #999;font:14px "微软雅黑";overflow:hidden;}
    .nav-tit{margin-left: -1px;height: 40px;line-height: 40px;text-align: center;background-color: #f1f1f1;overflow: hidden;}
    .nav-titI{box-sizing: border-box;float: left;width: 33.333%;border-left: 1px solid #cecece;border-bottom: 1px solid #cecece;cursor: pointer;}
    .nav-txt{height: 200px;}
    .nav-txtI{height: 200px;display:block;width: 100%;text-indent: 2em; line-height: 2;}
    /*重点内容*/
    .nav-txt{overflow: hidden;}
    .nav-titI:hover{background-color: #fff;border-bottom:none;}
    </style>
    <div class="box">
        <nav class="nav-tit">
            <label class="nav-titI" for="kc">课程</label>
            <label class="nav-titI" for="xx">学习计划</label>
            <label class="nav-titI" for="jn">技能图谱</label>
        </nav>
        <nav class="nav-txt">
            <input class="nav-txtI nav-txtI_active" id="kc" value="课程内容" readonly>
            <input class="nav-txtI" id="xx" value="学习计划内容" readonly>
            <input class="nav-txtI" id="jn" value="技能图谱内容" readonly>
        </nav>
    </div>

<iframe style="width: 100%; height: 250px" src="https://demo.xiaohuochai.site/css/nav/n7.html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

&emsp;&emsp;缺点：初始态默认选中的导航标题样式无法设置；有时会出现页面跳动的效果；hover态与点击态分开，可能会让人犯晕；鼠标移出导航模块时，导航标题的样式无法固定，恢复到默认状态

<p>&nbsp;</p>


## 最后

&emsp;&emsp;上面的三种方法中，实现效果最好的是使用`label`标签配合`radio`类型的`input`标签，通过`:checked`选择器来实现

&emsp;&emsp;在实际应用中，使用`javascript`的方式来控制导航条Tab的情况更为普遍


&emsp;&emsp;欢迎交流

