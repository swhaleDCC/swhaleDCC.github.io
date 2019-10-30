title: 本地文件上传到阿里云Ubuntu系统
author: Dccun
tags:
  - 阿里云
categories:
  - 阿里云
date: 2019-10-29 20:51:00
---
![upload successful](\\images\pasted-26.png\)

<!--more-->

# 本地Windows环境上传文件到阿里云服务器（Ubuntu）

## WinSCP下载与安装
下载链接：https://winscp.net/eng/download.php
安装根据提示一步一步来即可
 
## 远程连接
此处输入主机名和密码 用户名即可（均在阿里云服务器上的配置页面可见）
![upload successful](\\images\pasted-21.png\)

![upload successful](\\images\pasted-22.png\)

链接成功后如下图所示：

![upload successful](\\images\pasted-23.png\)

# 本地ubuntu系统上传文件到阿里云服务器（Ubuntu）
把本地/home/xxx/xxx/xx.py文件传入到/home/download文件夹下，使用如下命令：
```
scp /home/xxx/xxx/xx.py root@39.xxx.xx.xx:/home/download
```
然后输入服务器密码即可