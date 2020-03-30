title: 「文献笔记」首次成功用CNN自动生成代码：北大研究者搞定了炉石传说
author: Dccun
tags:
  - 代码自动生成
  - CNN
categories:
  - 深度学习
date: 2020-01-02 17:19:00
---
>2019-北京大学信息科学技术学院-A Grammar-Based Structural CNN Decoder for Code Generation

<!--more-->

# abstract
- 代码生成可以将一份程序描述映射为用一种编程语言写成的可执行源代码。现有的方法主要依赖于循环神经网络（RNN）作为解码器。然而，我们发现程序比自然语言句子包含的 token 要多得多，因此 RNN 可能并不适合捕捉长句。本文提出了一个基于语法的结构化卷积神经网络（CNN），用于代码生成。我们的模型通过预测编程语言的语法规则来生成程序；我们设计了若干个 CNN 模块，包括基于树的卷积和前序卷积，其信息通过专用的注意力池化层进一步聚集。在炉石传说基准数据集上的实验结果显示，我们的 CNN 代码生成器的表现超出之前最佳方法 5 个百分点；我们通过另外几个实验在若干语义分析任务上验证了模型的鲁棒性。为了更好地理解模型的每个部分，我们还进行了深入的控制变量测试。

# introduction
- 代码的抽象语法树（AST）：init(a)：![upload successful](/images/pasted-84.png)其中的n3、n6两个节点需要拥有父-子节点那样密集的关联，但如果该树是前序穿过序列的，彼此间就会比较远。这对Seq2Seq模型而言就比较困难，传统的Seq2Seq神经网络不能直接建模程序结构。
- 为了解决这个问题，Dong 和 Lapata (2016) 提出了一种沿着程序的抽象语法树生成代码的方法，但这种生成仍然处于 token 级别。近来，更多的研究通过在每一步预测或重写语法规则 (Xiong et al. 2018; Yin and Neubig 2017; Rabinovich, Stern, and Klein 2017) 来生成程序；因此，确保了生成的程序在语法上是正确的。当在这些方法中使用神经网络时，RNN 被用来捕获解码器中预测的自回归。
- 在深度学习社区，研究人员对使用卷积网络作为解码器越来越感兴趣 (Gehring et al. 2017; Chaturvedi, Pandit, and Garain 2018)，因为它效率高且容易训练。研究者进一步观察发现，程序比自然语言语句大得多，即使是带有长短期记忆 (Hochreiter and Schmidhuber 1997, LSTM) 单元的 RNN 也存在长期依赖问题 (Bengio, Simard, and Frasconi 1994)。而 CNN，却能通过滑动窗口有效地捕获不同区域的特征。
- 为此，研究者提出了一种基于语法的结构化 CNN 来用于代码生成。他们的模型根据 AST 中的语法结构规则生成代码，例如，If → expr stmt* stmt* 就遵循了他们先前研究 (Xiong et al. 2018) 中的框架。由于子节点序列是通过一个预测步骤生成的，因此与逐个 token 生成相比，它能够实现更紧凑的预测。换句话说，该模型预测语法规则序列，最终形成整个程序。
- 在他们的方法中，语法规则的预测主要基于三种类型的信息：指定生成程序的源序列，先前预测的语法规则，以及已经生成的部分 AST。在这里，第一个信息是编码器的输入，后两者使得解码器能够自回归，和以前一样，解码器以编码器为条件。

# the proposed model
- 模型概览，虚线箭头表示注意力控制器：![upload successful](/images/pasted-85.png)

# evaluation
- experiment Ⅰ：hearthstone code generation
	- 研究者在已有的基准数据集HearthStone（炉石传说）上进行了实验。炉石传说数据集的示例卡片，（a）输入描述（b）输出程序：![upload successful](/images/pasted-86.png)任务是Python代码生成（Ling et al. 2016），该数据集的统计：![upload successful](/images/pasted-88.png)实验结果表明他们提出的基于CNN的代码生成方法远远超越了以前的基于RNN的方法，新模型与此前业内最佳模型的对比，以百分比记。在手动调整后性能大概能增加 2%（Yin and Neubig (2017)）：![upload successful](/images/pasted-87.png)
- experiment Ⅱ：semantic parsing
	- 研究者还进行了扩展性的控制变量测试，表明基于语法的结构化CNN相比一般的CNN应用方法更优越，控制变量测试：![upload successful](/images/pasted-89.png)如表中所示，新模型在准确率和 BLEU 分数方面都优于以前的所有结果。尤其是，新模型在准确率方面显著高于此前的业内最佳模型——在字符串准确率上高出了 5%。对于手动调整的准确率来说，Yin & Neubig（2017）曾报告过大约 2% 的提升。在本文中，北大的研究者也观察到了类似的效果，实现了 30.3% 的 Acc+分数，这证明了新方法的有效性。
    - 研究者进一步在两个语义解析任务上评估了该方法，其中目标程序比炉石传说的更短；他们的方法依然得到了和以前的最佳方法相当的性能，表明该方法具备鲁棒性，语义分析的准确性（以百分比记）：![upload successful](/images/pasted-90.png)

# related work

# conclusion