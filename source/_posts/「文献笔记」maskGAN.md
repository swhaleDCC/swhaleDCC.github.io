title: 「文献笔记」maskGAN
author: Dccun
tags:
  - GAN
  - ''
categories:
  - 文献笔记
date: 2019-12-29 15:55:00
---
>2018-MASKGAN: better text generative via filling in the ___

<!--more-->

# Abstract
- 神经网络文本生成模型通常为自回归（autoregressive）语言模型或者seq2seq模型。这些模型通过序列抽样词语生成文本（抽样分布将前一个词语作为条件），并且对于几种机器翻译和摘要总结的基准是较先进的模型。这些基准通常通过验证复杂度定义，尽管这不是直接对生成文本质量的衡量。除此以外，这些模型通常使用极大似然或者 teacher forcing进行训练。这些方法非常适合优化复杂度（perplexity），但是可能导致样本质量差，因为生成文本需要将可能从来没有在训练过程中观察到的词语序列作为条件。我们提出使用生成对抗网络（GAN）来提高样本质量，它通过显式地训练生成器产生高质量样本，并且已经在图像生成领域取得很大成功。GAN 最初设计用于输出可微分的值，所以生成离散语言是具有挑战性的。我们认为验证复杂度本身不代表模型生成的文本质量。我们引入条件actor-critic GAN，它可以基于上下文填充缺失的文本。我们从定性和定量的角度证明，相比较大似然训练的模型，这种方法生成了更真实的有条件和无条件文本样本。


# MaskGAN
- notation
- architecture：![upload successful](/images/pasted-80.png)
- training
- alternative approaches for long sequences and large vocabularies
- method details

