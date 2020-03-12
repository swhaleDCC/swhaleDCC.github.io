title: 「文献笔记」GANs
author: Dccun
tags:
  - GAN
categories:
  - 深度学习
date: 2019-12-27 10:52:00
---
>2014-GANs开山之作 Generative Adversarial Nets

<!--more-->

# abstract
- 论文基于对抗过程提出了估计生成模型的新框架，主要的做法就是：同时训练2个网络：G网络和D网络，G网络主要是通过学习获取信息分布，使用隐空间的随机变量生成接近于真实的数据，即使得D网络将生成的数据识别为真实的训练数据；而D网络主要是通过学习，尽可能地区分开真实的训练数据与生成的虚假数据。G网络和D网络都是可微的，因此可以使用BP进行学习。

# introduction
- 之前在判别式模型方面已经有很多的研究，比如说分类等任务，但是生成模型由于其最大似然估计和相关策略设置都很复杂，因此目前研究较少，本文则是提出了一种新的生成模型，避免了之前的这些问题。
- 提出的对抗网络中，D网络是通过学习，判断一个样本是由模型分布（fake）还是有数据分布（real）生成的。G网络则是生成fake samples，使得D网络尽可能混淆真实与虚假数据。
- 论文提出的对抗网络不需要使用markov链，只需要使用BP即可，再结合dropout等tricks。

# related work
- 在之前，大部分在deep generative model上的工作都是希望能够得到一个参数化的概率分布，可以通过最大似然估计进行学习，比较成功的模型有deep Boltzmann machine等。
- 之前比较类似的工作是VAE，即使用encoder将训练数据映射到高斯分布中，再使用decoder将其变换到原始的训练数据，从而实现对数据的参数化分布表示。

# adversarial nets
- 定义噪声变量pz(z)，表示generator的分布，可以通过映射关系，将噪声映射到对应的data space，这个映射可以表示为G(z,θg)，MLP的参数为θg，G是可微的（可学习的）。同时定义D(x,θd)，输出一个值，D(x)表示x来自真实数据而非pg的概率。因此主要的工作就是训练D，尽可能使得训练样本和G生成的样品都被赋予正确的label。最终的优化目标是：
![upload successful](/images/pasted-75.png)
下面这幅图片很好地描述了这个过程：
![upload successful](/images/pasted-81.png)
![upload successful](/images/pasted-76.png)
- 在这里需要注意的是，因为需要最大化D，因此我们使用的是梯度上升法。最终pdata(x)=pg(x)，D(x)=12，在训练的过程中，G和data的分布变化如下
![upload successful](/images/pasted-77.png)

# theoretical results
- Global Optimality of pg=pdata
- 如果G和D都有足够的容量，则在每次迭代过程中，D都会到达其最优解，之后在更新G的时候，G都会进行优化，使得pg向pdata收敛

# Experiments
- 作者在mnist、TFD、cifar-10数据集上进行了实验。对生成的结果基于Parzen window的似然估计进行评估，在mnist上，相对之前的DBN、stacked CAE等方法，效果更好一些。

# Advantages and disadvantages
- disadvantages：没有获得对pg(x)的显性表示，D也必须和G同时训练，共同优化参数，如果只训练其中的一个， 无法获得很好的效果。
- advantages：不再需要markov chains，在训练的时候，直接使用BP即可，并且可以很容易地在模型中嵌入很多其他的函数或者变换。

# conclusion and future work
- CGAN，即根据给定的条件和随机分布，生成特定的数据。
- 通过训练一个给定x，预测z的辅助网络，用于样本之间的相似度检测。
- 可以训练一个shared model，给定任意子条件和随机分布，生成该条件对应的样本。
- 半监督学习：当训练数据有限时，可以使用discriminator的特征或者G网络来提升分类器的性能。
- 在训练的过程中，如果可以确定一个更好的z的分布，则训练速度和模型性能都会大大提升。
- 在训练的过程中，如果可以确定一个更好的z的分布，则训练速度和模型性能都会大大提升。
- 一张图总结一下生成模型以及本文的对抗模型，证明了GAN的光明前景。
![upload successful](/images/pasted-78.png)

参考资料：
- [github地址](https://github.com/swhaleDCC/adversarial)
- [相关博客讲解](https://wiseodd.github.io/techblog/2016/09/17/gan-tensorflow/)
- [论文解读](https://littletomatodonkey.github.io/2018/11/09/2018-11-09-Generative%20Adversarial%20Nets%E8%AE%BA%E6%96%87%E8%A7%A3%E8%AF%BB/)

***

# GANs学习笔记

[训练 GANs 一年我学到的 10 个教训](https://mp.weixin.qq.com/s/lfc0BH4X9_iBlrKEO6_RAg)
来自英伟达的StyleGAN和来自谷歌的BigGAN
文章内有10个训练GAN的小技巧~~~

[GAN整整6年了！是时候要来捋捋了！](https://mp.weixin.qq.com/s/n0Gc4yHjRzJCGGdlyrxc3A)

[GAN 真的创造了新的信息吗？](https://mp.weixin.qq.com/s/ce_cVEtMAtbdq67vp13Xww)

## 纳什均衡
