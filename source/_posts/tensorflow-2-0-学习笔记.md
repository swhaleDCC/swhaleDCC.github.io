title: 'tensorflow 2.0 '
author: Dccun
tags:
  - tensorflow
categories:
  - 深度学习
date: 2019-10-21 10:38:00
---
![upload successful](/images/pasted-8.png)

>友链：
- https://github.com/tensorflow/tensorflow
- https://github.com/tensorflow/tensorboard
- https://github.com/tensorflow/models
- https://tensorflow.google.cn/
- `tensorflow中文文档`：https://tf.wiki/  
- https://github.com/dragen1860/TensorFlow-2.x-Tutorials
- `keras中文文档`：https://github.com/keras-team/keras-docs-zh
- https://github.com/keras-team/keras

***

想要系统学习tensorflow的小伙伴，推荐友链中的tensorflow中文文档和keras中文文档，这篇博客中的内容都摘自这俩中文文档，仅用来记录我自己的学习历程。

***

![upload successful](/images/pasted-98.png)
在 TensorFlow 2 中，即时执行模式将成为默认模式，无需额外调用 tf.enable_eager_execution() 函数（不过若要关闭即时执行模式，则需调用 tf.compat.v1.disable_eager_execution() 函数）。

# conda虚拟环境：

```
conda create --name [env-name]      # 建立名为[env-name]的Conda虚拟环境
conda activate [env-name]           # 进入名为[env-name]的Conda虚拟环境
conda deactivate                    # 退出当前的Conda虚拟环境
conda env remove --name [env-name]  # 删除名为[env-name]的Conda虚拟环境
conda env list                      # 列出所有Conda虚拟环境
```

# python的with语句：
with 语句适用于对资源进行访问的场合，确保不管使用过程中是否发生异常都会执行必要的“清理”操作，释放资源，比如文件使用后自动关闭、线程中锁的自动获取和释放等。

参考：https://www.ibm.com/developerworks/cn/opensource/os-cn-pythonwith/index.html

# 张量
TensorFlow 使用 张量 （Tensor）作为数据的基本单位。TensorFlow 的张量在概念上等同于多维数组，我们可以使用它来描述数学中的标量（0 维数组）、向量（1 维数组）、矩阵（2 维数组）等各种量。张量的重要属性是其形状、类型和值，可以通过张量的 shape 、 dtype 属性和 numpy() 方法获得。

TensorFlow 的大多数 API 函数会根据输入的值自动推断张量中元素的类型（一般默认为 tf.float32 ）。不过你也可以通过加入 dtype 参数来自行指定类型，例如 zero_vector = tf.zeros(shape=(2), dtype=tf.int32) 将使得张量中的元素类型均为整数。张量的 numpy() 方法是将张量的值转换为一个 NumPy 数组。

# 自动求导机制
TensorFlow 提供了强大的 自动求导机制 来计算导数。在即时执行模式下，TensorFlow 引入了 tf.GradientTape() 这个 “求导记录器” 来实现自动求导。

以下代码展示了如何使用 tf.GradientTape() 计算函数 y(x) = x^2 在 x = 3 时的导数：

```
import tensorflow as tf

x = tf.Variable(initial_value=3.)
with tf.GradientTape() as tape:     # 在 tf.GradientTape() 的上下文内，所有计算步骤都会被记录以用于求导
    y = tf.square(x)
y_grad = tape.gradient(y, x)        # 计算y关于x的导数
print([y, y_grad])
```

变量与普通张量的一个重要区别是其默认能够被 TensorFlow 的自动求导机制所求导，因此往往被用于定义机器学习模型的参数。

tf.GradientTape() 是一个自动求导的记录器。只要进入了 with tf.GradientTape() as tape 的上下文环境，则在该环境中计算步骤都会被自动记录。比如在上面的示例中，计算步骤 y = tf.square(x) 即被自动记录。离开上下文环境后，记录将停止，但记录器 tape 依然可用，因此可以通过 y_grad = tape.gradient(y, x) 求张量 y 对变量 x 的导数。

# TensorFlow 下的线性回归

```
import numpy as np

X_raw = np.array([2013, 2014, 2015, 2016, 2017], dtype=np.float32)
y_raw = np.array([12000, 14000, 15000, 16500, 17500], dtype=np.float32)

# 归一化
X = (X_raw - X_raw.min()) / (X_raw.max() - X_raw.min())
print("X:",X)
y = (y_raw - y_raw.min()) / (y_raw.max() - y_raw.min())
print("y:",y)

X = tf.constant(X)
y = tf.constant(y)

a = tf.Variable(initial_value=0.)
b = tf.Variable(initial_value=0.)
variables = [a, b]

num_epoch = 10000

# 声明一个梯度下降 优化器 （Optimizer），其学习率为 1e-3
# 优化器可以帮助我们根据计算出的求导结果更新模型参数，从而最小化某个特定的损失函数，具体使用方式是调用其 apply_gradients() 方法
optimizer = tf.keras.optimizers.SGD(learning_rate=1e-3)

for e in range(num_epoch):
    # 使用tf.GradientTape()记录损失函数的梯度信息
    with tf.GradientTape() as tape:
        y_pred = a * X + b
        loss = 0.5 * tf.reduce_sum(tf.square(y_pred - y))
    # TensorFlow自动计算损失函数关于自变量（模型参数）的梯度
    grads = tape.gradient(loss, variables)
    # TensorFlow自动根据梯度更新参数:需要提供参数 grads_and_vars，即待更新的变量variables及损失函数关于这些变量的偏导数grads
    optimizer.apply_gradients(grads_and_vars=zip(grads, variables))

print(a, b)
```

# Keras：model和layer
Keras 是一个广为流行的高级神经网络 API，简单、快速而不失灵活性，现已得到 TensorFlow 的官方内置和全面支持。

Keras 有两个重要的概念： 模型（Model） 和 层（Layer） 。层将各种计算流程和变量进行了封装（例如基本的全连接层，CNN 的卷积层、池化层等），而模型则将各种层进行组织和连接，并封装成一个整体，描述了如何将输入数据通过各种层以及运算而得到输出。

Keras 模型类定义示意图 ：
![upload successful](/images/pasted-99.png)


***

附一个mnist的code：
```
from __future__ import print_function

import keras
# from keras.datasets import mnist
from keras.models import Sequential
from keras.layers import Dense, Dropout
from keras.optimizers import RMSprop
import numpy as np

from keras.layers import Flatten
from keras.layers import Conv2D, MaxPooling2D
from keras import backend as K

def load_data():
    path='/kaggle/input/mnist-data/mnist.npz'
    f = np.load(path)
    x_train, y_train = f['x_train'], f['y_train']
    x_test, y_test = f['x_test'], f['y_test']
    f.close()
    return (x_train, y_train), (x_test, y_test)

(x_train, y_train), (x_test, y_test) = load_data()

batch_size = 128
num_classes = 10
epochs = 12

# input image dimensions
img_rows, img_cols = 28, 28

if K.image_data_format() == 'channels_first':
    x_train = x_train.reshape(x_train.shape[0], 1, img_rows, img_cols)
    x_test = x_test.reshape(x_test.shape[0], 1, img_rows, img_cols)
    input_shape = (1, img_rows, img_cols)
else:
    x_train = x_train.reshape(x_train.shape[0], img_rows, img_cols, 1)
    x_test = x_test.reshape(x_test.shape[0], img_rows, img_cols, 1)
    input_shape = (img_rows, img_cols, 1)

x_train = x_train.astype('float32')
x_test = x_test.astype('float32')
x_train /= 255
x_test /= 255
print('x_train shape:', x_train.shape)
print(x_train.shape[0], 'train samples')
print(x_test.shape[0], 'test samples')

# convert class vectors to binary class matrices
y_train = keras.utils.to_categorical(y_train, num_classes)
y_test = keras.utils.to_categorical(y_test, num_classes)

model = Sequential()
model.add(Conv2D(32, kernel_size=(3, 3),
                 activation='relu',
                 input_shape=input_shape))
model.add(Conv2D(64, (3, 3), activation='relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))
model.add(Dropout(0.25))
model.add(Flatten())
model.add(Dense(128, activation='relu'))
model.add(Dropout(0.5))
model.add(Dense(num_classes, activation='softmax'))

model.compile(loss=keras.losses.categorical_crossentropy,
              optimizer=keras.optimizers.Adadelta(),
              metrics=['accuracy'])

model.fit(x_train, y_train,
          batch_size=batch_size,
          epochs=epochs,
          verbose=1,
          validation_data=(x_test, y_test))
score = model.evaluate(x_test, y_test, verbose=0)
print('Test loss:', score[0])
print('Test accuracy:', score[1]*100,'%')
```
![upload successful](/images/pasted-64.png)