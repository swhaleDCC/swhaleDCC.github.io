title: Androguard | Androwarn | Apktool | Droidbox
author: Dccun
tags:
  - 静态检测
  - ''
categories:
  - 恶意代码检测
date: 2019-10-14 15:56:00
---
![upload successful](/images/pasted-4.png)

<!--more-->
>Android tools github地址：
https://github.com/maoqyhz/DroidCC/blob/master/tools.md

***

# Androguard

androguard主要用来进行**静态分析**，其默认采用ded作为反编译的软件，同时提供了很多模块供分析人员使用。

学习链接：
- github地址: https://github.com/androguard/androguard
- 项目主页: https://code.google.com/archive/p/androguard/
- 使用文档: https://androguard.readthedocs.io/en/latest/index.html
- 附一个中文版Androguard使用说明： https://www.jianshu.com/p/079e40800ef4

安装:
```
pip install -U androguard
```

使用：
- 命令行输入:androguard analyze
- 或者用jupyter notebook，当然其他IDE也行，下载好androguard后他就相当于python的一个包，可以直接导入：import androguard

```
from  androguard.misc import AnalyzeAPK
a, d, dx = AnalyzeAPK("sample.apk")
print(a,d,dx)
```

关于Androguard的项目：
- [AndroPyTool](https://github.com/alexMyG/AndroPyTool)


***

# Androwarn

Androwarn是一款专为Android端应用程序设计的安全分析工具，主要功能是检测并提醒用户Android应用程序中潜在的恶意行为。
在androguard库的帮助下，Androwarn可以通过对目标应用程序的Dalvik字节码和Smali代码进行**静态分析**，来判断目标应用程序中潜在的恶意行为。分析完成之后，工具会自动生成分析报告，报告中的技术细节划分，取决于用户的设置参数。

学习链接：
- github链接: https://github.com/maaaaz/androwarn/
- 附一个中文版教程链接: https://www.freebuf.com/sectool/199407.html

安装：
```
pip install androwarn
# Or git clone that repository and ：pip install -r requirements.txt
```

使用：
```
python androwarn.py -i my_application_to_be_analyzed.apk -r html -v 3
```
把github仓库clone到本地，cd 该文件夹，打开终端，把上面命令行的my_application_to_be_analyzed.apk换成你自己要分析的apk文件的名字，就会在该文件夹生成一个html分析文件。如下图所示：
![upload successful](/images/pasted-9.png)

***

# Apktool
APKTool是GOOGLE提供的APK编译工具，需要JAVA运行环境，是**逆向分析**工具.

学习链接：
- 博客教程: https://ibotpeaches.github.io/Apktool/
- github地址：https://github.com/iBotPeaches/Apktool
- github地址2：https://github.com/iBotPeaches/Apktool/tree/gh-pages

安装：
1. 下载 Linux wrapper script [链接](https://raw.githubusercontent.com/iBotPeaches/Apktool/master/scripts/linux/apktool) (右击，保存为 apktool)
2. 下载 apktool-2 [链接](https://bitbucket.org/iBotPeaches/apktool/downloads/) (保存为apktool.jar)
3. 移动文件 (apktool.jar & apktool) 到 /usr/local/bin
（sudo cp -i aapt  apktool apktool.jar /usr/local/bin/   基本上到这一步就结束了）
4. 保证文件可执行 (chmod +x)
5. 在命令行运行apktool

使用：
1. decode：该命令用于进行反编译apk文件
apktool d file.apk dir
file.apk：代表了要反编译的apk文件的路径，最好写绝对路径
dir：代表了反编译后的文件的存储位置
2. build：该命令用于编译修改好的文件
apktool b dir   这里的dir就是刚才你反编译时输入的dir

***

# Droidbox
DroidBox是用来**动态分析**Android应用行为的工具。

学习链接：
- 官网链接：https://code.google.com/archive/p/droidbox/
- github地址：https://github.com/pjlantz/droidbox

安装：
（参考：https://blog.csdn.net/u012195899/article/details/52814013）
1. Oracle JDK（在本博客《ubantu配置》一文中写了jdk安装教程）

2. 安装sdk：
linux 服务器下载：wget http://dl.google.com/android/android-sdk_r24.4.1-linux.tgz
将压缩包解压到/home/android/sdk 目录下
修改环境变量：
export PATH=/home/name/Android/Sdk/android-sdk-linux/tools:$PATH
export PATH=/home/name/Android/Sdk/android-sdk-linux/platform-tools:$PATH
![upload successful](/images/pasted-14.png)
source ~/.bashrc
3. sdk、avd管理
/home/dccun/Android/Sdk/android-sdk-linux/tools目录下：终端输入android即可进入sdk管理，可下载avd
![upload successful](/images/pasted-17.png)
安装完成之后，大家可以在命令行输入一下命令来查看当前的安装版本：android list targets
![upload successful](/images/pasted-19.png)
下载完之后create虚拟机
![upload successful](/images/pasted-20.png)
![upload successful](/images/pasted-18.png)
点击OK创建完毕。这个时候大家可以先运行一下avd是否能够正常开机。
我的虚拟机名称是droid，因此命令如下：
emulator -avd droid
如果成功运行，那么恭喜，你的sdk部分已经配置完成！
如果想要删除某个虚拟机，使用的命令为:android delete avd -n avd_name。
android list target #查看可获取的安卓虚拟机
android list avd #查看已创建的安卓虚拟机

4. 下载最新版的DroidBox
https://github.com/pjlantz/droidbox/releases ，这里我下载的时候最新版为：DroidBox411RC.tar.gz
进入droidbox目录下：
启动虚拟机：./startemu.sh droid
开始分析：./droidbox.sh 1.apk（apk使用绝对路径）
可以设置分析时间：./droidbox.sh 1.apk 10 (10表示10s)

5. 在虚拟机下载apk
把apk放到/Android/Sdk/android-sdk-linux/platform-tools目录下，在这个目录下进入终端，输入adb install sample.apk即可，实践效果如下图所示：
![upload successful](/images/pasted-15.png)


出现的问题及解决方法：
1. Linux系统(Ubuntu)下AndroidStudio创建AVD虚拟器出现“/dev/kvm is missing”
参考：https://blog.csdn.net/lpcrazyboy/article/details/80270816
(1)进入BIOS里，把Virtualization Technology(VT)的状态由Disable改为Enable。（这个在cpu模块里找）
(2)打开终端，输入：sudo apt-get install qemu-kvm
(3)安装完成后，输入：sudo kvm-ok

2. ubuntu18.04系统下androidstudio启动模拟器发生错误: /dev/kvm device:permission denied
参考：https://blog.csdn.net/blackei/article/details/84559180
在终端输入：sudo chown username -R /dev/kvm
将username替换成自己电脑当前登录的用户名称即可。
如当前电脑登录的是android，那么在终端输入的则为：
sudo chown android -R /dev/kvm

3. droidbox支持python2，但是我ubantu装的是python3，求解决方法。