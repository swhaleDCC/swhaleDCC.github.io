title: Mac如何创建虚拟机 | VirtualBox + Vagrant
author: Dccun
tags:
  - virtualbox
categories:
  - Mac
date: 2021-02-17 18:06:00
---
![upload successful](/images/pasted-161.png)

>记录在Mac上安装虚拟机的过程。

<!--more-->


# 1 安装软件

## 1.1 VirtualBox

>VirtualBox 是由德国 Innotek 公司开发，由Sun Microsystems公司出品的软件，使用Qt编写，在 Sun 被 Oracle 收购后正式更名成 Oracle VM VirtualBox。VirtualBox 和 VMWare 是同类型软件，开源，可以在当前运行的系统上构建出一台虚拟电脑。

下载主程序： https://www.virtualbox.org/wiki/Downloads

![upload successful](/images/pasted-159.png)

下拉网页下载扩展包，有些高级特性，比如 USB 3.0 等需要扩展包的支持：

![upload successful](/images/pasted-164.png)

在 Windows 系统中使用 VirtualBox 需开机进入BIOS开启CPU虚拟化。

Mac则不同：

首先看硬件是否支持，如果输出中有【VMX】，说明支持：
```
sysctl -a | grep machdep.cpu.features
```

然后再次输入，如果输出为1那么说明支持【VT-x VT-d】（不支持的话只能更新你的系统了）：
```
sysctl kern.hv_support
```

如果无法开启，那么要设置，输入下面的命令，输入密码，即可设置好，重启Mac就可以打开：
```
sudo nvram boot-args=”kext-dev-mode=1
```

![upload successful](/images/pasted-160.png)


## 1.2 Vagrant

>vagrant是一个工具，用于创建和部署虚拟化开发环境的。VirtualBox会开放一个创建虚拟机的接口，Vagrant会利用这个接口创建虚拟机，并且通过Vagrant来管理，配置和自动安装虚拟机。

下载链接： https://www.vagrantup.com/downloads

![upload successful](/images/pasted-158.png)

Vagrant 是没有图形界面的，所以安装完成后也没有桌面快捷方式。可以在终端执行 vagrant version 检查是否安装成功：

![upload successful](/images/pasted-162.png)

![upload successful](/images/pasted-165.png)

# 2 创建虚拟机

## 2.1 下载虚拟机基础镜像

方法一：官方下载镜像

使用 Vagrant 创建虚拟机时，需要指定一个镜像，也就是 box。开始这个 box 不存在，所以 Vagrant 会先从网上下载，然后缓存在本地目录中。

Vagrant 官方镜像仓库： https://app.vagrantup.com/boxes/search

在镜像仓库中选择要下载的版本，点击进入后可以看到如下图所示的how to use：
![upload successful](/images/pasted-163.png)

在终端执行：
![upload successful](/images/pasted-166.png)

**这个命令为我们在当前目录生成一个 Vagrantfile，下面的所有操作都是在该文件夹下完成的**。

方法二：其他方式下载.box

如果官方默认下载比较慢，可以在其它地方下载到基础镜像，然后按照自己的需要重置。

1. CentOS 的镜像下载网站是： http://cloud.centos.org/centos/ 。在其中选择自己想要下载的版本，列表中有一个 vagrant 目录，里面是专门为 vagrant 构建的镜像。选择其中的 .box 后缀的文件下载即可。这里可以使用下载工具，以较快的速度下载下来。

2. Ubuntu 的镜像下载网站是： http://cloud-images.ubuntu.com/ 。同样先选择想要的版本，然后选择针对 vagrant 的 .box 文件即可。如果这里官网的速度较慢，还可以从 [清华大学的镜像站](https://mirror.tuna.tsinghua.edu.cn/ubuntu-cloud-images/) 下载。

接下来需要将下载后的 .box 文件添加到 vagrant 中。终端执行:
```
vagrant box add .box文件的路径 --name 自定义镜像的名称
```

## 2.2 启动虚拟机

方法一：终端启动虚拟机 `vagrant up`

![upload successful](/images/pasted-167.png)

- 网卡：Adapter 1: nat，第一块网卡，NAT 模式，这是固定的
- 端口转发：22 (guest) => 2222 (host) (adapter 1)，把虚机的 22 端口，映射到宿主机的 2222 端口上，这样就可以通过 127.0.0.1:2222 访问虚拟机了
- SSH 用户名：vagrant，这里使用 private key 登录

ssh登录：
![upload successful](/images/pasted-171.png)

查看虚拟机状态：
![upload successful](/images/pasted-168.png)

方法二：在 VirtualBox 启动虚拟机

打开virtualbox：

![upload successful](/images/pasted-170.png)

![upload successful](/images/pasted-169.png)


# 3 Mac连接虚拟机

## 3.1 设置Host-Only

Mac连接虚拟机的方法：设置一个Host-Only网络，为虚拟机增加一个Host-Only的网络适配器，实现主机与虚拟机之间的互通。

首先，启动虚拟机，创建一个Host-Only网络，点击新增，会创建 vboxnet0。
![upload successful](/images/pasted-172.png)

![upload successful](/images/pasted-173.png)

关闭虚拟机，设置虚拟机->网络->网卡2->启用网络连接->选择Host-Only，界面名称选择刚创建的vboxnet0，点OK，重启虚拟机。

![upload successful](/images/pasted-174.png)

mac查看 `ifconfig` 找到以太网适配器 VirtualBox Host-Only Network:

![upload successful](/images/pasted-175.png)

配置网络信息，打开"Vagrantfile"文件: 

`config.vm.network"private_network",ip:"192.168.56.10"`

修改完成后，重启vagrant，ping一下检查宿主机和virtualBox之间的通信是否正常。

## 3.2 开启远程登录

![upload successful](/images/pasted-176.png)

# 4 遇到的问题

https://blog.csdn.net/yimtcode/article/details/109702529




---

参考：
- https://zhuanlan.zhihu.com/p/259833884
- https://www.jianshu.com/p/0cabd5072b86
- https://blog.csdn.net/m0_37167788/article/details/78718245
