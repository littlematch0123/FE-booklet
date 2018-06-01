# 电脑常见问题处理

&emsp;&emsp;作为程序员，每天与电脑打交道的时间可能比家人还多。所以，掌握一些电脑常识，处理棘手问题是必备技能

&nbsp;

### 删除文件

&emsp;&emsp;一些文件由于各种原因，无法直接删除。例如，我在卸载git时，安装目录下有一个git_shell_ext64.dll文件无法删除

&emsp;&emsp;解决办法是修改其后缀名，如git_shell_ext64.txt，然后重启电脑，即可删除


![helper_common1](https://pic.xiaohuochai.site/blog/helper_common1.gif)


### 新建点文件

&emsp;&emsp;现在，许多软件都需要使用点文件，如.jshintrc、.editorconfig等。而window系统不支持新建点文件


![helper_common2](https://pic.xiaohuochai.site/blog/helper_common2.gif)


&nbsp;&emsp;&emsp;解决方法有以下三种

&emsp;&emsp;1、使用sublime等代码编辑工具新建

&emsp;&emsp;2、使用shell命令，如touch .a

&emsp;&emsp;3、最简单的一种，是文件命名为.a.，则windows系统将自动识别为.a


![helper_common3](https://pic.xiaohuochai.site/blog/helper_common3.gif)


&nbsp;

### 桌面变灰

&emsp;&emsp;在使用win10使用过程中，整个屏幕突然变成了黑白色，这是用户不小心按到了windows徽标+ctrl+c 快捷键开启了应用颜色筛选器导致的。只需再次按下 windows徽标键+Ctrl+C 组合键即可将其关闭

 

&nbsp;

### github邮件提示

&emsp;&emsp;对于在github上watch过的项目，对于该项目的通知，github默认会向邮箱发送邮件

&emsp;&emsp;如果要关闭该功能，首先，点击个人头像，进入Settings，然后选择Notification项，将右侧的Watching下的Email前面的多选框取消勾选即可

![helper_common10](https://pic.xiaohuochai.site/blog/helper_common10.png)


&nbsp;

### DNS

&emsp;&emsp;一般地，DNS都是自动获取的。但是，有时候会遇到DNS失效的情况。需要手动设置该值，配置如下

```
首选DNS服务器： 114.114.114.114
备用DNS服务器： 114.114.115.115
```