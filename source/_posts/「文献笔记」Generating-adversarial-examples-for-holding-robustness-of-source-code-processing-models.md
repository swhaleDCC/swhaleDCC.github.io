title: >-
  「文献笔记」Generating adversarial examples for holding robustness of source code
  processing models
author: Dccun
tags: []
categories:
  - 文献笔记
date: 2020-04-10 20:14:00
---
2020-北京大学-AAAI-Generating adversarial examples for holding robustness of source code processing models - [GITHUB开源项目链接](https://github.com/Metropolis-Hastings-Modifier/MHM)

<!--more-->

# Abstract
- 自动化处理、分析和生成源代码是软件和系统生命周期中的关键活动之一。为此，深度学习（DL）表现出一定的处理这些任务的能力水平，当前状态最新的DL模型仍然存在非稳健问题，容易被对抗性攻击愚弄。
- 与图像、音频、自然语言的对抗攻击不同，编程的结构性语言带来了新的挑战。在本文中，我们提出基于Metropolis-Hastings抽样的标识符重命名技术，命名为Metropolis-Hastings修改器（MHM），它为专门用于源代码处理的DL模型生成对抗性样本。我们在功能分类基准上的深入评估展示了MHM在产生源代码的对抗性样本中的有效性。通过我们与MHM的对抗性训练，更高的健壮性和性能的增强进一步证实了基于DL模型的方法对于未来全自动源代码处理的有用性。

# Introduction

- ![upload successful](/images/pasted-117.png)

***

补充：

# MCMC: Metropolis-Hastings algorithm
MCMC算法的核心思想是我们已知一个概率密度函数，需要从这个概率分布中采样，来分析这个分布的一些统计特性，然而这个这个函数非常之复杂，怎么去采样？这时，就可以借助MCMC的思想。

MCMC由两个MC组成，即蒙特卡罗方法（Monte Carlo Simulation，简称MC）和马尔科夫链（Markov Chain ，也简称MC）。

![upload successful](/images/pasted-118.png)

# Metropolis Hastings-MH抽样
https://blog.csdn.net/lin360580306/article/details/51240398

# LSTM
https://zhuanlan.zhihu.com/p/32085405

长短期记忆（Long short-term memory, LSTM）是一种特殊的RNN，主要是为了解决长序列训练过程中的梯度消失和梯度爆炸问题。简单来说，就是相比普通的RNN，LSTM能够在更长的序列中有更好的表现。

# ASTNN
https://github.com/zhangj111/astnn

# AST
https://baijiahao.baidu.com/s?id=1626159656211187310&wfr=spider&for=pc

AST（抽象语法树）