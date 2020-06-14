title: 阿里云服务器Ubuntu
author: Dccun
tags:
  - 阿里云
categories:
  - linux
date: 2019-10-29 20:51:00
---
![upload successful](/images/pasted-26.png)

<!--more-->

# 本地Windows环境上传文件到阿里云服务器（Ubuntu）

## WinSCP下载与安装
下载链接：https://winscp.net/eng/download.php
安装根据提示一步一步来即可
 
## 远程连接
此处输入主机名和密码 用户名即可（均在阿里云服务器上的配置页面可见）
![upload successful](/images/pasted-21.png)

![upload successful](/images/pasted-22.png)

链接成功后如下图所示：

![upload successful](/images/pasted-23.png)

# 本地ubuntu系统上传文件到阿里云服务器（Ubuntu）
把本地/home/xxx/xxx/xx.py文件传入到/home/download文件夹下，使用如下命令：
```
scp /home/xxx/xxx/xx.py root@39.xxx.xx.xx:/home/download
```
然后输入服务器密码即可

# 阿里云ubantu下载anaconda3并配置jupyter notebook
参考：https://www.jianshu.com/p/fff4a61dee7a
## 配置云服务器的安全组
设置过程：云服务器管理控制台》云服务器ECS》网络和安全》安全组》配置规则》添加安全组规则
![upload successful](/images/pasted-35.png)
授权对象这个我是填 0.0.0.0/0 。表示这个端口开放给所有ip
## 安装anaconda3
```
下载anaconda3清华镜像：
sudo wget https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/Anaconda3-5.0.1-Linux-x86_64.sh
sudo bash Anaconda3-5.0.1-Linux-x86_64.sh

激活环境变量:
source /etc/environment   

添加Anaconda的TUNA镜像:
conda config --add channels 'https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/'

设置搜索时显示通道地址：
conda config --set show_channel_urls yes

创建jupyter notebook运行环境，可以方便管理各类库
conda create -n jupyter_notebook python=3

激活环境
source activate jupyter_notebook

如果要退出环境的话，执行：
source deactivate   # 暂时不执行

安装jupyter notebook (这个过程是接着激活环境后的)
conda install jupyter notebook

测试
jupyter notebook --ip=127.0.0.1
终端输出正常即可

```
## 配置jupyter notebook远程访问
```
jupyter notebook --generate-config

生成文件后，文件在该目录下
Writing default config to: /home/xx/.jupyter/jupyter_notebook_config.py

打开jupyter_notebook_config.py文件（可以在winscp里面编辑这个文件）
vim /home/xx/.jupyter/jupyter_notebook_config.py

设置可以访问服务器的ip（在最后加上一行）
c.NotebookApp.ip = '*'

打开ipython：
ipython

调用passwd()函数生成密匙，把密匙复制下来，后面会有用：
In [1]: from notebook.auth import passwd
In [2]: passwd()
Enter password: 
Verify password: 
Out[2]: 'sha1:8361f5f08937:081cdf40730cb5548e2c213ddd36813a5313192f'

设置不在服务器端自动打开浏览器（继续在后面添加）：
c.NotebookApp.password = 'sha1:8361f5f08937:081cdf40730cb5548e2c213ddd36813a5313192f'
c.NotebookApp.open_browser = False

启动一下jupyter notebook是不是可以访问：
jupyter notebook

然后在自己电脑浏览器网址里输入：
云服务器公网ip：8888

大功告成！
```