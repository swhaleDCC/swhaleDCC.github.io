title: Android恶意代码检测：N-gram Opcode
author: Dccun
tags:
  - N-gram Opcode
  - ''
categories:
  - 毕设
date: 2019-11-10 20:18:00
---
>读硕士论文的时候发现很多检测Android恶意代码用到了N-gram，总结一下这方面的学习资料。

<!--more-->

>参考资料：
[我跑出来的一个代码](https://github.com/swhaleDCC/AndroidMalwareN-gram) 
[用机器学习检测Android恶意代码 – runner](http://www.vuln.cn/7012)
[博客原文](http://drops.xmd5.com/static/drops/tips-8151.html)
[博客实现的代码](https://github.com/bindog/ToyMalwareClassification)
[kaggle malware-classification](https://www.kaggle.com/c/malware-classification/)
[kaggle_Microsoft_Malware github](https://github.com/daxiongshu/kaggle_Microsoft_Malware)

***
# N-gram
`n-gram`是自然语言处理领域的概念，早期的语音识别技术和统计语言模型与它密不可分。n-gram基于一个简单的假设，即认为`一个词出现的概率仅与它之前的n-1个词有关`，这个概率可从大量语料中统计得到。例如“吃”的后面出现“苹果”或“披萨”的概率就会比“公路”的概率大(正常的语料中基本不会出现“吃公路”这种组合)，可以看出n-gram在一定程度上包含了部分语言特征。

将n-gram应用于恶意代码识别的想法最早由Tony等人在2004年的论文N-gram-based Detection of New Malicious Code 中提出，不过他们的方法是基于ByteCode的。2008年Moskovitch等人的论文Unknown Malcode Detection Using OPCODE Representation 中提出利用OpCode代替ByteCode更加科学。

![upload successful](/images/pasted-54.png)

***
# 用机器学习检测Android恶意代码 – runner
1. 安卓恶意代码检测方法
	- 基于特征代码的检测方法，通过检测文件是否拥有已知恶意软件的特征代码(如一段特殊代码或字符串)来判断其是否为恶意软件。它的优点是快速、准确率高、误报率低，但是无法检测未知的恶意代码。
	- 基于行为的分析方法又分为动态分析方法和静态分析方法，依靠监视程序的行为与已知的恶意行为模式进行匹配，以此判断目标文件是否具备恶意特征。它的优点可以检测未知的恶意代码变种，缺点是误报率较高。
		- 动态分析方法是指利用“沙盒或模拟器”来模拟运行程序，通过监控或者拦截的方式分析程序运行的行为，但是很消耗资源和时间。
		- 静态分析方法则是通过逆向手段抽取程序的特征，分析其中指令序列等。本文采用静态分析的方法进恶意行代码检测。
        
2. Weka与机器学习的分类算法
Weka（Waikato Environment for Knowledge Analysis），是一款免费的，非商业化基于JAVA环境下开源的机器学习（machine learning）以及数据挖掘（data minining）软件。Weka存储数据的格式是ARFF（Attribute-Relation File Format）文件，是一种ASCII文本文件。本文就是将特征数据生成ARFF格式的文件，利用Weka自带的分类算法进行数据训练与模型测试。
机器学习中分为有监督学习与无监督学习。有监督学习就是根据训练集，用学习算法学习出一个模型，然后可以用测试集对模型进行评估准确度和性能。分类算法属于有监督学习，需要先建立模型。常见的分类算法有：随机森林(Random Forest)、支持向量机(SVM)等。

3. APK的基本格式
APK文件格式是一种基于ZIP的格式，它与JAR文件的构造方式相似。参考：https://en.wikipedia.org/wiki/Android_application_package
一个APK文件通常包含以下文件：
	- classes.dex: Dalvik字节码,可被Dalvik虚拟机执行。（需要重点注意，安卓的执行代码被编译后封装在这个文件中。）
	- AndroidManifest.xml: 一个的Android清单文件，用于描述该应用程序的名字、版本号、所需权限、注册的服务、链接的其他应用程序。该文件使用XML文件格式。
	- META-INF 文件夹: 下面有3个文件
		- MANIFEST.MF: 清单信息
		- CERT.RSA: 保存应用程序的证书和授权信息
		- CERT.SF: 保存SHA-1信息资源列表
	- res: APK所需要的资源文件夹
	- assets: 不需编译的原始资源文件目录
	- resources.arsc:编译后的二进制资源文件
	- lib:库文件目录

4. Dalvik虚拟机与反汇编
区别与JAVA虚拟机(JVM)，安卓的虚拟机称为Dalvik虚拟机（DVM）。Java虚拟机运行的是Java字节码，Dalvik虚拟机运行的是Dalvik字节码。Java虚拟机基于栈架构，Dalvik虚拟机基于寄存器架构。
DVM拥有专属的DEX可执行文件格式和指令集代码。smali和baksmali 则是针对DEX执行文件格式的汇编器和反汇编器，反汇编后DEX 文件会产生.smali 后缀的代码文件，smali代码拥有特定的格式与语法，smali语言是对Dalvik 虚拟机字节码的一种解释。

5. 恶意代码模型
![upload successful](/images/pasted-24.png)
测试恶意代码检测模型
![upload successful](/images/pasted-25.png)

***
下面是硕士论文阅读笔记：

# 基于机器学习的安卓恶意应用检测方法研究
>N-gram Opcode特征实际上是dalvik Opcode特征结合自然语言处理中的N-gram方法而产生的特征集合。

检测框架：
![upload successful](/images/pasted-48.png)

N-gram Opcode：
![upload successful](/images/pasted-50.png)
![upload successful](/images/pasted-51.png)

![upload successful](/images/pasted-52.png)

![upload successful](/images/pasted-53.png)