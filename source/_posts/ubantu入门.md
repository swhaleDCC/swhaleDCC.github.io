title: ubuntu配置
author: Dccun
tags:
  - ubuntu
categories:
  - ubuntu
  - ''
date: 2019-09-30 15:15:00
---
> 今天装了ubuntu18.04,记录一下安装完ubuntu之后做的事情，和使用ubuntu的过程中遇到的问题、解决方法、小技巧。

<!--more-->

ubuntu是基于debian开发的，centos是基于redhat开发的，所以ubuntu可以使用deb结尾的包，而centos使用rpm结尾的包。

显示文件夹中隐藏的文件：ctrl+H。

**查看Ubuntu显卡的型号：**
```
lspci|grep VGA
```

**查看CPU**
```
lscpu
```

**usr内文件夹的删除复制移动**
```
一：复制移动
sudo cp 要复制的文件 /usr/local/bin（目的文件夹）
sudo mv 要移动的文件 /usr/local/bin（目的文件夹）
二：删除
sudo su    #进入root下
rm -rf 要删除的文件
```

**linux对文件赋权限的命令chmod**
参考：https://www.cnblogs.com/insane-Mr-Li/p/10716293.html
使用方式 : chmod [-cfvR] [--help] [--version] mode file... 

**卸载软件**
参考：https://blog.csdn.net/luckydog612/article/details/80877179
输入dpkg --list 
终端输出电脑上安装的所有软件
在终端上输入命令sudo apt-get --purge remove 包名（--purge是可选项，写上这个属性是将软件及其配置文件一并删除，如不需要删除配置文件，可执行sudo apt-get remove 包名）

**Ubuntu配置环境变量的两种常用方法（.bashrc和/etc/profile）**
参考：https://blog.csdn.net/yiminghd2861/article/details/98854882


# 双系统安装过程记录
参考: https://blog.csdn.net/weixin_43538911/article/details/99647086

# ubuntu下可删除哪些文件来释放系统空间？
参考：https://zhidao.baidu.com/question/166531881.html


# 安装好Ubuntu18.04之后要做的事大全

参考: https://blog.csdn.net/haeasringnar/article/details/81809040
要安装**搜狗拼音、git**可以按照这个里面的教程，下面补充几个更好用的按照教程

# 安装搜狗拼音
如果按照上面一条安装后，因为个人失误导致搜狗拼音不能用，可以参考下面教程：
https://blog.csdn.net/qq_33159059/article/details/85019467
```
# 先卸载掉fcitx，及其所有相关的软件
sudo apt -y remove *fcitx*
# 然后来个彻底清除
sudo apt autoremove
# 安装了下面的这部分，搜狗输入法就可以使用了，不过候选区没有背景，是透明的
sudo apt -y install fcitx fcitx-bin fcitx-table fcitx-table-all
# 安装fcitx可视化的配置界面
sudo apt -y install fcitx-config-gtk
# 就安装gtk，不要安装gtk2。因为gtk2的配置界面没有gtk的强大，而且同时安装，也只有gtk的生效
sudo dpkg -i sogoupinyin_2.2.0.0108_amd64.deb
进入“语言支持”界面，进行输入法框架的配置：
![upload successful](/images/pasted-10.png)
最后重启，确保设置都已生效
```

# 安装 Anaconda3

参考: https://blog.csdn.net/qq_15192373/article/details/81091098

```
在清华大学开源软件镜像站下载：
https://mirrors.tuna.tsinghua.edu.cn/help/anaconda/
bash Anaconda3-5.2.0-Linux-x86_64.sh
若在终端输入 python，仍然会显示Ubuntu自带的python版本，我们执行：
sudo gedit ~/.bashrc
在最后一行添加：
export PATH="/home/xxx/anaconda3/bin:$PATH"
```

问题：pip命令报错Traceback (most recent call last): File "/usr/bin/pip"
解决：https://blog.csdn.net/lyll616/article/details/85090132
```
打开终端，在终端中输入 ： sudo gedit /usr/bin/pip
插入或者修改为：
from pip import __main__  //修改
if __name__ == '__main__':  
    sys.exit(__main__._main())//修改
```

# 安装Mac主题

https://zhuanlan.zhihu.com/p/71588449
尝试了一下效果不错


# 安装MySQL8.0

参考:https://www.cnblogs.com/luoli-/p/9249769.html
ubuntu18.04 
首次登录mysql未设置密码或忘记密码解决方法:
https://blog.csdn.net/qq_38737992/article/details/81090373

```
下载deb包：https://dev.mysql.com/downloads/repo/apt/
sudo dpkg -i mysql-apt-config_0.8.10-1_all.deb
sudo apt update
sudo apt install mysql-server
密码加密方式选择5.x
查看mysql是否安装成功：mysql -u root -p
查看mysql字符集，mysql8字符集默认为utf-8：show variables like '%char%';
```

# 安装mendeley

参考:https://www.mendeley.com/guides/download-mendeley-desktop/ubuntu/instructions

```
在上面链接中下载deb包
sudo dpkg -i <path-to-downloaded-package>
```

在使用过程中出现不能输入中文的现象，解决方法：
https://blog.csdn.net/weixin_40100431/article/details/82633423

```
首先在终端中定位一个文件的位置
locate libfcitxplatforminputcontextplugin.so
然后将上述文献拷贝到mendeley的安装路径当中
sudo cp /usr/lib/x86_64-linux-gnu/qt5/plugins/platforminputcontexts/libfcitxplatforminputcontextplugin.so /opt/mendeleydesktop/plugins/qt/plugins/platforminputcontexts/
关闭mendeley重新启动即可。
```


# 安装配置JAVA环境

参考:https://blog.csdn.net/weixx3/article/details/80296779

```
去oracle官网下载：https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
解压后，将文件从下载目录挪到/usr/local下sudo mv jdk1.8.0_171  /usr/local/jdk1.8

修改全局配置文件，作用于所有用户：vim /etc/profile

export JAVA_HOME=/usr/local/jdk1.8
export JRE_HOME=${JAVA_HOME}/jre
export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib
export PATH=.:${JAVA_HOME}/bin:$PATH

修改完后保存并退出，按下Esc后输入:q!即可
使修改的配置立刻生效 ： source /etc/profile 

检查是否安装成功：java -version
```


# 安装wps

安装按照上面《安装好Ubuntu18.04之后要做的事大全》一文，字体缺失按照下面教程：
WPS for Linux（ubuntu）字体配置(字体缺失解决办法)：
https://www.cnblogs.com/liangml/p/5969404.html

```
在官网下载wps：https://www.wps.cn/product/wpslinux/
安装wps：sudo dpkg -i wps*.deb  安装wps
下载缺失字体：
国内下载地址：https://pan.baidu.com/s/1eS6xIzo
下载完成后，解压并进入目录中，继续执行：
sudo cp * /usr/share/fonts
sudo mkfontscale
sudo mkfontdir
运行fc-cache命令更新字体缓存：
sudo fc-cache
重启wps即可，字体缺失的提示不再出现。
```

# 安装node、npm、hexo

参考：https://www.cnblogs.com/guanine/p/9392411.html
https://blog.csdn.net/Iversonx/article/details/82807598

```
键入以下内容刷新本地包索引：
sudo apt update
从存储库安装Node.js：
sudo apt install nodejs
需要额外安装npm，你可以通过输入以下命令来完成
sudo apt install npm 
安装hexo
sudo npm install --unsafe-perm --verbose -g hexo
```

# 安装网易云音乐
参考： https://blog.csdn.net/weixin_43693233/article/details/90685359
第一次下载网易云音乐，点击图标打不开，只能用sudo进入，很麻烦，百度也看到好多人都是这种问题，上面这个教程下载的网易云是点击图标可以直接进入的，推荐！

# 安装Android studio
参考：
https://blog.csdn.net/Sacredness/article/details/86514460
我并没有安装SDK，百度了一下有的博客说android studio 可以默认帮你安装android-sdk。

下载地址：https://developer.android.google.cn/studio/#downloads
将压缩包解压到要安装的位置
在软件的bin目录下打开命令行，执行命令bash studio.sh.（如果你需要root权限，执行sudo bash studio.sh）
创建桌面图标：
![upload successful](/images/pasted-5.png)
至于怎么新建一个项目，参考：
https://blog.csdn.net/Sacredness/article/details/82929768

# 安装pycharm
同上

# 安装idea
参考：https://blog.csdn.net/lishundi/article/details/82762532

```
下载地址:　https://www.jetbrains.com/idea/download/#section=linux 
解压到/opt下：sudo tar -zxvf ideaIC-2018.2.3-no-jdk.tar.gz -C /opt
进入到opt位置：cd  /opt/
进入到IDEA文件夹下的bin目录：cd  /opt/idea-IC-182.4323.46/bin
启动 IDEA：./idea.sh 
```

# 截图工具flameshot
参考：https://www.jianshu.com/p/e1678c1d175d

```
sudo apt-get install flameshot
```
1. 设置>设备>键盘，设置一个自定义快捷键（拉到最下面）命令填写：flameshot gui
2. 截完图后保存Ctrl+S，复制到剪贴板 Ctrl+C