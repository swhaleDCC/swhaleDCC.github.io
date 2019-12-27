title: Mac配置
author: Dccun
tags:
  - Mac
  - ''
categories:
  - Mac
date: 2019-12-27 12:35:00
---
>实习的时候公司发的MacBook，记录一下下载配置一些东西的流程。

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
wget https://www.apache.org/
出现unsupported scheme提示，这是必然的，因为这是个安全链接。

加个选项试试，不检查证书
wget --no-check-certificate https://www.apache.org/
wget: unrecognized option --no-check-certificate
提示没有这个选项。 

wget --help
检查没有HTTPS (SSL/TLS) options.

# 解决方法
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

