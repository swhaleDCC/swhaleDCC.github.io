title: >-
  「文献笔记」Generating adversarial examples for holding robustness of source code
  processing models
author: Dccun
tags: []
categories:
  - 文献笔记
date: 2020-04-10 20:14:00
---
2020-北京大学-AAAI-Generating adversarial examples for holding robustness of source code processing models

<!--more-->

# Abstract
- 自动化处理、分析和生成源代码是软件和系统生命周期中的关键活动之一。为此，深度学习（DL）表现出一定的处理这些任务的能力水平，当前状态最新的DL模型仍然存在非稳健问题，容易被对抗性攻击愚弄。
- 与图像、音频、自然语言的对抗攻击不同，编程的结构性语言带来了新的挑战。在本文中，我们提出基于Metropolis-Hastings抽样的标识符重命名技术，命名为Metropolis-Hastings修改器（MHM），它为专门用于源代码处理的DL模型生成对抗性样本。我们在功能分类基准上的深入评估展示了MHM在产生源代码的对抗性样本中的有效性。通过我们与MHM的对抗性训练，更高的健壮性和性能的增强进一步证实了基于DL模型的方法对于未来全自动源代码处理的有用性。

# Introduction

- ![upload successful](/images/pasted-117.png)



