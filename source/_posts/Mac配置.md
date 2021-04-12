title: Mac配置
author: Dccun
tags:
  - Mac
  - ''
categories:
  - Mac
date: 2019-12-27 12:35:00
---
![upload successful](/images/pasted-127.png) 

<!--more-->


# 安装Homebrew
链接：https://brew.sh/index_zh-cn.html

安装命令：
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

安装过程中出现的问题：报错curl: (7) Failed to connect to raw.githubusercontent.com port 443: Operation

解决方法：https://blog.csdn.net/zbc415766331/article/details/104128351/

下载文件brew_install.rb，控制台运行ruby brew_install.rb命令。此文件下载地址： https://pan.baidu.com/s/1rVh8bY73NLc77cQYN_2HoQ 密码：n3si

后来又有一次安装homebrew时发现运行这个文件时报了其他错误，又参考了另一个解决方法 https://www.jianshu.com/p/c8d998903a6a 。


# 安装wget
安装wget：
```
brew install wget
```

# wget访问https出现问题
wget https://www.apache.org/ ——
出现unsupported scheme提示，这是必然的，因为这是个安全链接。

加个选项试试，不检查证书，wget --no-check-certificate https://www.apache.org/ ，提示没有这个选项 wget: unrecognized option --no-check-certificate

解决方法：
参考：https://www.jianshu.com/p/94bb06811a26

查找wget:
```
find /usr/ -name "wget" 
```

输出：
```
/usr//local/bin/wget
/usr//local/Cellar/wget
/usr//local/Cellar/wget/1.19.5/bin/wget
```

删除系统默认版本：
```
sudo rm -f /usr/local/bin/wget
```
解决:
```
sudo cp /usr/local/Cellar/wget/1.19.5/bin/wget /usr/local/bin/
```

# 安装anaconda3
下载地址：https://www.anaconda.com/distribution/#macos

下载哪一个都可以，一个是窗口安装，一个是命令行安装，以命令行为主：
![upload successful](/images/pasted-97.png)

cd到下载目录下，执行如下代码：
```
bash Anaconda3-5.3.0-MacOSX-x86_64.sh
```

添加环境变量：
```
sudo vim ~/.bash_profile
```

在 .bash_profile 文件中添加下面文本:
```
export PATH="/Users/xxx/anaconda3/bin:$PATH"
```

刷新生效source:
```
source ~/.bash_profile
```

# 卸载Anaconda

```
rm -rf ~/anaconda3
vim ~/.bash_profile
rm -rf ~/.condarc ~/.conda ~/.continuum
```

手动删除文件夹，然后再去把配置文件里面对应的环境变量删了。
 
# Fliqlo翻页时钟
参考：https://zhuanlan.zhihu.com/p/105069716?utm_source=wechat_session

# 安装iTerm2
不得不说mac自带的终端是真的丑，来配置下iTerm2吧

参考：https://zhuanlan.zhihu.com/p/37195261

安装Oh my zsh过程中出现的问题：raw.githubusercontent.com (raw.githubusercontent.com)|::|:443... 失败：拒绝连接

解决方法：https://blog.csdn.net/wowbing2/article/details/105797442/

1. 进入网站： https://site.ip138.com/raw.Githubusercontent.com/
2. 输入 raw.githubusercontent.com ，查询其相关的IP地址
3. 终端输入 sudo vi /etc/hosts
4. 添加 151.101.xx.133 raw.githubusercontent.com
5. 保存，退出 :wq