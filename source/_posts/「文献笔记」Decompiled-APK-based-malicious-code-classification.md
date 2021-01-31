title: 「文献笔记」Decompiled APK based malicious code classification
author: Dccun
tags:
  - 反编译APK
  - 恶意代码分类
categories:
  - 文献笔记
date: 2020-05-05 10:07:00
---
>April 2020-Decompiled APK based malicious code classification

<!--more-->

# Abstract
由于Android恶意软件种类的不断增加，区分每种恶意软件的类型是很重要的。在本文中，我们介绍了一个反编译源代码用于恶意代码分类。这个反编译源代码提供了更深入的分析机会和了解恶意软件的性质。恶意代码与文本的区别在于编译器的语法规则和攻击者逃避潜在检测的努力。因此，我们采用在一定约束下的自然语言处理技术对恶意代码进行分类。首先，本文提出的方法对Android包文件进行分解，然后从源代码中提取API调用、关键字和非混淆的token，并将其分为stop-token、feature-token和long-tail-token。我们还介绍了使用通用的n-tokens来表示通常不太频繁的token。对我们的方法进行了评估，比较了使用API调用和特性权限作为基线，以及它们的组合，以及使用基于反编译APK的神经网络架构。对真实世界中广泛存在的Android恶意软件数据集进行了严格的评估，包括针对71个家族进行分类的24553个应用程序，以及针对60000个应用程序进行恶意代码检测。我们的方法在两个任务中都优于基线。

# 1.Introduction
The main contributions of this paper are:
1. 采用反编译源代码分析，包括其中的token，据我们所知，这是首次用于检测和分类恶意代码。
2. ROCKY-一种用于源代码分析的新方法，它可以创建通用的N-tokens，包括stop(frequent)和long-tail(rare)token。
3. 一个严格的评估，包括将提出的基于反编译源代码的分析与静态分析方法进行比较，使用Android权限、API调用和基于反编译的神经网络架构作为大型真实世界公共数据集的基线。
