title: Mac安装Homebrew、anaconda等
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

# Homebrew 能干什么
安装wget：
```
brew install wget
```

# wget访问https出现问题
wget https://www.apache.org/ ---
出现unsupported scheme提示，这是必然的，因为这是个安全链接。

加个选项试试，不检查证书，
wget --no-check-certificate https://www.apache.org/ ，提示没有这个选项
wget: unrecognized option --no-check-certificate
。 

wget --help  可以
检查没有HTTPS (SSL/TLS) options.

解决方法：
参考：https://www.jianshu.com/p/94bb06811a26

查找wget:
```
find /usr/ -name "wget" 
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
安装过程和前面写的Ubuntu安装anaconda3是完全一样的

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