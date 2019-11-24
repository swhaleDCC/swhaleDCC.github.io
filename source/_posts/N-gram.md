title: Android恶意代码检测：N-gram Opcode
author: Dccun
tags:
  - N-gram Opcode
  - ''
categories:
  - 毕设
top: true
date: 2019-11-10 20:18:00
---
>读硕士论文的时候发现很多检测Android恶意代码用到了N-gram，总结一下这方面的学习资料。

<!--more-->

>参考资料：
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

# 基于机器学习的安卓恶意应用检测方法研究
>N-gram Opcode特征实际上是dalvik Opcode特征结合自然语言处理中的N-gram方法而产生的特征集合。

检测框架：
![upload successful](/images/pasted-48.png)

N-gram Opcode：
![upload successful](/images/pasted-50.png)
![upload successful](/images/pasted-51.png)

![upload successful](/images/pasted-52.png)

![upload successful](/images/pasted-53.png)

***

# 仓库

恶 意 代 码 检 测 过 程， 通 常 可 以 分 为 三 个 步 骤： 
①特 征 提 取 与 选 择； 
②选取适当的分类模型； 
③获 取 分 类 结 果． 
其 中 关 键 技 术 就 是 恶 意 代 码 特 征 提 取， 特 征 的 质 量 直 接 影 响 恶 意 代 码 的 检 测 效 果． 目 前提出的基于机器学习的恶意软件分类方法在恶 意 软 件 特 征 提 取 方 法 上 存 在 较 大 差 异．


>[malware_classification_system](https://github.com/BiancaGuo/malware_classification_system)
这个项目没有readme，不知道怎么跑，里面还有html、css代码，还用到了flask_bootstrap包，看起来更像一个网站。

>[MalwareClassification](https://github.com/2015-10-10/MalwareClassification)（这个代码看上去不错，跑一下试试）
gramfeature.csv文件存储特征，分为训练数据和测试数据 
VirusShare.csv和yingyongbao.csv存储数据id和class 
tpr_fpr.py文件为模型检测程序 
.txt文件为ROC曲线实验数据 
plot.py为ROC曲线画图程序
其中，良性样本选自yingyongbao（yingyongbao.csv：class为０），恶性样本选自virusshare（VirusShare.csv：class为１）。还用到了TF-IDF（term frequency–inverse document frequency），一种用于信息检索与数据挖掘的常用加权技术。TF意思是词频(Term Frequency)，IDF意思是逆文本频率指数(Inverse Document Frequency)。

>[MalwareAnalyze](https://github.com/VoldyRCX/MalwareAnalyze)
需要Linux环境,需要安装IDA PRO反汇编软件,需要viper环境 https://github.com/viper-framework/viper.
config.py　环境配置文件
pe_select.py　提取样本中的PE文件
idabatch.pu　ida反汇编批处理
feature.py　特征处理
sequence3.py　提取特征序列
vector_batch.py && vector_batch2.py　向量化批处理
vectoring.py　向量化
train.py　训练集 用于viper平台集成功能
test.py　测试集 用于viper平台集成功能
ml.py　训练模型 用于viper平台集成功能

>[ToyMalwareClassification](https://github.com/bindog/ToyMalwareClassification)
Kaggle微软恶意代码分类
比赛说明和数据下载 https://www.kaggle.com/c/malware-classification/
代码说明
randomsubset.py 抽取训练子集
asmimage.py ASM文件图像纹理特征
opcode_n-gram.py Opcode n-gram特征
firstrandomforest.py 基于ASM文件图像纹理特征的随机森林
secondrandomforest.py 基于Opcode n-gram特征特征的随机森林
combine.py 将两种类型的特征结合
运行说明
将完整的训练数据集解压，修改randomsubset.py中的路径并运行
修改asmimage.py和opcode_n-gram.py中的路径，并运行run.sh，耐心等待即可看到结果

>[Software-system-security](https://github.com/UP1998/Software-system-security)
[md](https://github.com/UP1998/Software-system-security/blob/master/%E5%A4%A7%E4%BD%9C%E4%B8%9A/%E8%BD%AF%E4%BB%B6%E4%B8%8E%E7%B3%BB%E7%BB%9F%E5%AE%89%E5%85%A8%E5%A4%A7%E4%BD%9C%E4%B8%9A.md)
用于提交软件与系统安全实验和最终大作业
通过修改程序可执行文件的方式（不是修改源代码），使得程序运行后显示的内容不为hello world，变成 hello cuc！
上一题的程序中，修改的显示内容变为一个很长的字符串（至少2kb长）。并且保证程序正常运行不崩溃。
在notepad（32位64位均可）中，输入一段文字。然后使用调试器，在内存中修改这段文字。使得没有在界面操作notepad的修改文字的情况下。notepad中显示的文字变化。
通过调试器监控计算器程序的运行，每当运行结果为666时，就改为999。
通过API hook的方法，在每次notepad保存txt文件时，就将文件内容修改为： “you have been hacked!”
通过API hook的方法，使得cmd的dir命令看不到任意目录下的hacker.exe

>[software_security](https://github.com/shielding/software_security)

>[Android](https://github.com/flame0409/Android)
基于opcode的N-gram安卓恶意软件检测


`下面是我已经运行成功的几个code，已经push到我的github上了，都在readme中注明了出处。`

>[AndroidMalwareN-gram](https://github.com/swhaleDCC/AndroidMalwareN-gram)
这个代码实现的主要功能是：反汇编——特征提取（提取出smali文件的dalvik指令）——n-gram
这个代码并没有用机器学习算法实现恶意代码检测，只是提取了android的smali文件的特征码。

学习资料：
[Android Dalvik 指令集](https://mp.weixin.qq.com/s?__biz=MzI4NjEyMDk0MA==&mid=2649846140&idx=1&sn=a248dbec47578c37f276fe461aa82b8f&chksm=f3e41fffc49396e9020490703eb4f7270e4dd6063575b65bedecedbe69c31e0a70e4a96f4cec&scene=0&key=63570224b333d6fd7954fa9343865bc0b865bbe08a0acb3c)
[smali 文件格式(apktool)](https://juejin.im/post/59dd829f6fb9a0450d100dce)

# java、class、dex、smali、jar、apk关系

![upload successful](/images/pasted-73.png)

