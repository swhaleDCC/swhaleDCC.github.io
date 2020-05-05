title: 「文献笔记」Decompiled APK based malicious code classification
author: Dccun
tags:
  - 反编译APK
  - 恶意代码分类
categories:
  - 文献笔记
date: 2020-05-05 10:07:00
---
April 2020-Decompiled APK based malicious code classification

<!--more-->

# Abstract
由于Android恶意软件种类的不断增加，区分每种恶意软件的类型是很重要的。在本文中，我们介绍了一个反编译源代码用于恶意代码分类。这个反编译源代码提供了更深入的分析机会和了解恶意软件的性质。恶意代码与文本的区别在于编译器的语法规则和攻击者逃避潜在检测的努力。因此，我们采用在一定约束下的自然语言处理技术对恶意代码进行分类。首先，本文提出的方法对Android包文件进行分解，然后从源代码中提取API调用、关键字和非混淆的token，并将其分为stop-token、feature-token和long-tail-token。我们还介绍了使用通用的n-tokens来表示通常不太频繁的token。对我们的方法进行了评估，比较了使用API调用和特性权限作为基线，以及它们的组合，以及使用基于反编译APK的神经网络架构。对真实世界中广泛存在的Android恶意软件数据集进行了严格的评估，包括针对71个家族进行分类的24553个应用程序，以及针对60000个应用程序进行恶意代码检测。我们的方法在两个任务中都优于基线。

# 1.Introduction
The main contributions of this paper are:
1. 采用反编译源代码分析，包括其中的token，据我们所知，这是首次用于检测和分类恶意代码。
2. ROCKY-一种用于源代码分析的新方法，它可以创建通用的N-tokens，包括stop(frequent)和long-tail(rare)token。
3. 一个严格的评估，包括将提出的基于反编译源代码的分析与静态分析方法进行比较，使用Android权限、API调用和基于反编译的神经网络架构作为大型真实世界公共数据集的基线。

# 2.Background
## 2.1.Malicious code detection

## 2.2.Android Package Kit

## 2.3.Android static analysis based on API calls

## 2.4.Android static analysis based on permissions

## 2.5.Android malware dataset
本文数据库——Android malware dataset（AMD），由南佛罗里达大学Argus实验室于2017年公布。

# 3.Methods
## 3.1.The ROCKY framework
ROCKY框架如下图所示：
![upload successful](/images/pasted-122.png) 

包括如下主要部分：
1. APK文件conversation和反编译（把dex文件反编译为源码）
2. 源码处理（解析源码，提取包含API调用的token，构造一个集合中出现频率为top k的token的one-token词汇，使用ROCKY方法根据频率把token分为stop、feature、long-tail三种类型）
3. 通用/广义N-tokens（类似于n-grams，是提取出的token序列。最常见的k个N-tokens的词汇表是基于前面分类的one-token词汇表，无论是像stop或long-tail这样的泛化，还是没有泛化的特征token。）
4. 特征代表（计算以下指标来将标记表示为用于分类的特征:二进制、词频(TF)、词频反文档频率(TF - idf)、规范化TF和规范化TF - idf）
5. 分类（训练分类器）

## 3.2.Source code preprocessing
![upload successful](/images/pasted-123.png) 

定义：
1. stop-tokens
2. feature-tokens
3. long-tail-tokens
4. N-tokens

## 3.3.Generalized tokens and N-tokens
使用两种形式的token：
1. one-token
2. N-tokens

## 3.4.Complexity analysis

1. APK文件conversation和反编译
	- APK文件conversation为jar：O(n)，n代表APK文件中tokens/symbols的数量
    - 反编译：O(n)
2. 源码处理
3. 通用/广义N-tokens
4. 特征代表
5. 分类

# 4.Evaluation
## 4.1.Baseline algorithms
- permissions
- API calls

## 4.2.Dataset

## 4.3.Data representation

## 4.4.Evaluation metric

## 4.5.Experimental plan
- experiment1-ROCKY source code lexical analysis
- experiment2-ROCKY source code vs. neural network architectures
- experiment3-ROCKY source code vs. API calls and permissions
- experiment4-Malicious code detection

# 5.Eesult
## 5.1.Experiment1-ROCKY source code analysis

## 5.2.Experiment2-ROCKY source code vs. neural network architectures

## 5.3.Experiment3-ROCKY source code vs. API calls and permissions

## 5.4.Experiment4-Malicious code detection


# 6.Discussion

# 7.Conclusions
















