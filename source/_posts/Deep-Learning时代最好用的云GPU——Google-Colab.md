title: Deep Learning时代最好用的云GPU——Google Colab
author: Dccun
tags:
  - colab
categories:
  - colab
date: 2019-12-22 13:47:00
---
![upload successful](/images/pasted-125.png) 

<!--more-->

>Colab是Google基于Google Drive存储的对外免费开放的云服务器，主要有CPU,GPU,TPU三种可选硬件加速方案。最近，Colab 将 以前的 K80 替换为 Tesla T4，新一代图灵架构、16GB 显存，重点是免费 GPU！免费！免费！。因此强烈建议大家赶紧薅谷歌的羊毛，获取强大的免费算力。

>原文链接：https://blog.csdn.net/jinyuan7708/article/details/89948938

>`Googole Colab官网链接：https://colab.research.google.com/notebooks/welcome.ipynb#recent=true`

使用Google Colab运行或导入.py文件
```
from google.colab import drive
drive.mount('/content/drive/')
```

单击出现的链接，复制验证码并将其粘贴到文本框中。完成授权过程后，就可以了。

通过以下方式与Google联系
```
!ls "/content/drive/My Drive/"
```

在Colab中cd命令是无效的，切换工作目录使用chdir函数
```
import os
os.chdir("drive")
```

回到上级目录
```
import os
os.chdir("../")
```

如果要将.csv文件从url下载到“Colab tutorial”文件夹，只需运行
```
! wget https://raw.githubusercontent.com/vincentarelbundock/Rdatasets/master/csv/datasets/Titanic.csv -P"/content/drive/My Drive/Colab tutorial"
```

查看您当前是否在Colab中使用GPU
```
import tensorflow as tf
tf.test.gpu_device_name()
```

查看使用的是哪种GPU
```
from tensorflow.python.client import device_lib
device_lib.list_local_devices()
```

RAM怎么样？
```
! cat /proc/meminfo
```

那CPU怎么样？
```
! cat /proc/cpuinfo
```

查看tensorflow版本号
```
import tensorflow as tf
tf.__version__
```

安装tensorflow 1.8
```
!pip install tensorflow==1.8.0rc 
```