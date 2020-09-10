title: tensorflow & keras
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
- [keras模型入门教程：40题刷爆Keras，人生苦短我选Keras](https://zhuanlan.zhihu.com/p/103049619)
- [官方文档太辣鸡？TensorFlow 2.0开源工具书，30天「无痛」上手](https://github.com/lyhue1991/eat_tensorflow2_in_30_days#30%E5%A4%A9%E5%90%83%E6%8E%89%E9%82%A3%E5%8F%AA-tensorflow2)

<!--more-->

***

想要系统学习tensorflow的小伙伴，推荐友链中的tensorflow中文文档和keras中文文档，这篇博客中的内容都摘自这俩中文文档，仅用来记录我自己的学习历程。

***

![upload successful](/images/pasted-98.png)
在 TensorFlow 2 中，即时执行模式将成为默认模式，无需额外调用 tf.enable_eager_execution() 函数（不过若要关闭即时执行模式，则需调用 tf.compat.v1.disable_eager_execution() 函数）。

# TensorFlow 安装与环境配置 
conda虚拟环境：
```
conda create --name [env-name]      # 建立名为[env-name]的Conda虚拟环境
conda activate [env-name]           # 进入名为[env-name]的Conda虚拟环境
conda deactivate                    # 退出当前的Conda虚拟环境
conda env remove --name [env-name]  # 删除名为[env-name]的Conda虚拟环境
conda env list                      # 列出所有Conda虚拟环境
```

# TensorFlow基础

## python的with语句：
with 语句适用于对资源进行访问的场合，确保不管使用过程中是否发生异常都会执行必要的“清理”操作，释放资源，比如文件使用后自动关闭、线程中锁的自动获取和释放等。

参考：
https://www.ibm.com/developerworks/cn/opensource/os-cn-pythonwith/index.html

## 张量
TensorFlow 使用 张量 （Tensor）作为数据的基本单位。TensorFlow 的张量在概念上等同于多维数组，我们可以使用它来描述数学中的标量（0 维数组）、向量（1 维数组）、矩阵（2 维数组）等各种量。

张量的重要属性是其形状、类型和值，可以通过张量的 shape 、 dtype 属性和 numpy() 方法获得。

TensorFlow 的大多数 API 函数会根据输入的值自动推断张量中元素的类型（一般默认为 tf.float32 ）。不过你也可以通过加入 dtype 参数来自行指定类型，例如 zero_vector = tf.zeros(shape=(2), dtype=tf.int32) 将使得张量中的元素类型均为整数。张量的 numpy() 方法是将张量的值转换为一个 NumPy 数组。

```
# 查看矩阵A的形状、类型和值
print(A.shape)      
print(A.dtype)     
print(A.numpy())   
                   
tf.add(A, B)  # 计算矩阵的和
tf.matmul(A, B) # 计算矩阵A和B的乘积

tf.square(x)  # 对输入张量的每一个元素求平方，不改变张量形状
tf.reduce_sum() # 对输入张量的所有元素求和，输出一个形状为空的纯量张量（可以通过 axis 参数来指定求和的维度，不指定则默认对所有元素求和）
```

TensorFlow 的大多数 API 函数会根据输入的值自动推断张量中元素的类型（一般默认为 tf.float32 ）。不过你也可以通过加入 dtype 参数来自行指定类型，例如 zero_vector = tf.zeros(shape=(2), dtype=tf.int32) 将使得张量中的元素类型均为整数。张量的 numpy() 方法是将张量的值转换为一个 NumPy 数组。

## 自动求导机制
TensorFlow 提供了强大的 自动求导机制 来计算导数。在即时执行模式下，TensorFlow 引入了 tf.GradientTape() 这个 “求导记录器” 来实现自动求导。

```
# 计算函数 y(x) = x^2 在 x = 3 时的导数：
import tensorflow as tf

# x 是一个初始化为3的 变量，使用 tf.Variable() 声明
x = tf.Variable(initial_value=3.)
# 在 tf.GradientTape() 的上下文内，所有计算步骤都会被记录以用于求导
with tf.GradientTape() as tape:     
    y = tf.square(x)
y_grad = tape.gradient(y, x)        # 计算y关于x的导数
print([y, y_grad])
```

与普通张量一样，变量同样具有形状、类型和值三种属性。使用变量需要有一个初始化过程，可以通过在 tf.Variable() 中指定 initial_value 参数来指定初始值。变量与普通张量的一个重要区别是其默认能够被 TensorFlow 的自动求导机制所求导，因此往往被用于定义机器学习模型的参数。

tf.GradientTape() 是一个自动求导的记录器。只要进入了 with tf.GradientTape() as tape 的上下文环境，则在该环境中计算步骤都会被自动记录。比如在上面的示例中，计算步骤 y = tf.square(x) 即被自动记录。离开上下文环境后，记录将停止，但记录器 tape 依然可用，因此可以通过 y_grad = tape.gradient(y, x) 求张量 y 对变量 x 的导数。

## TensorFlow 下的线性回归

![upload successful](/images/pasted-100.png)

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

# 声明一个梯度下降优化器（Optimizer），其学习率为 1e-3
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

![upload successful](/images/pasted-101.png)

# TensorFlow 模型建立与训练
- 模型的构建： tf.keras.Model 和 tf.keras.layers
- 模型的损失函数： tf.keras.losses
- 模型的优化器： tf.keras.optimizer
- 模型的评估： tf.keras.metrics

## Keras：model和layer
Keras 是一个广为流行的高级神经网络 API，简单、快速而不失灵活性，现已得到 TensorFlow 的官方内置和全面支持。

Keras 有两个重要的概念： 模型（Model）和 层（Layer）。层将各种计算流程和变量进行了封装（例如基本的全连接层，CNN 的卷积层、池化层等），而模型则将各种层进行组织和连接，并封装成一个整体，描述了如何将输入数据通过各种层以及运算而得到输出。

![upload successful](/images/pasted-102.png)

Keras 模型类定义示意图 ：
![upload successful](/images/pasted-99.png)

通过模型类的方式编写线性模型：
```
import tensorflow as tf

X = tf.constant([[1.0, 2.0, 3.0], [4.0, 5.0, 6.0]])
y = tf.constant([[10.0], [20.0]])

class Linear(tf.keras.Model):
    def __init__(self):
        super().__init__()
        self.dense = tf.keras.layers.Dense(
            units=1,
            activation=None,
            kernel_initializer=tf.zeros_initializer(),
            bias_initializer=tf.zeros_initializer()
        )

    def call(self, input):
        output = self.dense(input)
        return output

# 以下代码结构与前节类似
model = Linear()
optimizer = tf.keras.optimizers.SGD(learning_rate=0.01)
for i in range(100):
    with tf.GradientTape() as tape:
        y_pred = model(X)      # 调用模型 y_pred = model(X) 而不是显式写出 y_pred = a * X + b
        loss = tf.reduce_mean(tf.square(y_pred - y))
    grads = tape.gradient(loss, model.variables)    # 使用 model.variables 这一属性直接获得模型中的所有变量
    optimizer.apply_gradients(grads_and_vars=zip(grads, model.variables))
print(model.variables)
```

![upload successful](/images/pasted-103.png)

## 多层感知机（MLP,多层全连接神经网络）

- 数据获取及预处理 MNISTLoader()
- 模型的构建 MLP(tf.keras.Model)
- 模型的训练：tf.keras.losses 和 tf.keras.optimizer
	- 定义一些模型超参数
    - 实例化模型和数据读取类，并实例化一个 tf.keras.optimizer 的优化器
	- 从 DataLoader 中随机取一批训练数据；
	- 将这批数据送入模型，计算出模型的预测值；
	- 将模型预测值与真实值进行比较，计算损失函数（loss）。这里使用 tf.keras.losses 中的交叉熵函数作为损失函数；
	- 计算损失函数关于模型变量的导数；
	- 将求出的导数值传入优化器，使用优化器的 apply_gradients 方法更新模型参数以最小化损失函数
- 模型的评估： tf.keras.metrics

```
class MNISTLoader():
    def __init__(self):
        mnist = tf.keras.datasets.mnist
        (self.train_data, self.train_label), (self.test_data, self.test_label) = mnist.load_data()
        # MNIST中的图像默认为uint8（0-255的数字）。以下代码将其归一化到0-1之间的浮点数，并在最后增加一维作为颜色通道
        self.train_data = np.expand_dims(self.train_data.astype(np.float32) / 255.0, axis=-1)      # [60000, 28, 28, 1]
        self.test_data = np.expand_dims(self.test_data.astype(np.float32) / 255.0, axis=-1)        # [10000, 28, 28, 1]
        self.train_label = self.train_label.astype(np.int32)    # [60000]
        self.test_label = self.test_label.astype(np.int32)      # [10000]
        self.num_train_data, self.num_test_data = self.train_data.shape[0], self.test_data.shape[0]

    def get_batch(self, batch_size):
        # 从数据集中随机取出batch_size个元素并返回
        index = np.random.randint(0, np.shape(self.train_data)[0], batch_size)
        return self.train_data[index, :], self.train_label[index]

class MLP(tf.keras.Model):
    def __init__(self):
        super().__init__()
        self.flatten = tf.keras.layers.Flatten()    # Flatten层将除第一维（batch_size）以外的维度展平
        self.dense1 = tf.keras.layers.Dense(units=100, activation=tf.nn.relu)
        self.dense2 = tf.keras.layers.Dense(units=10)

    def call(self, inputs):         # [batch_size, 28, 28, 1]
        x = self.flatten(inputs)    # [batch_size, 784]
        x = self.dense1(x)          # [batch_size, 100]
        x = self.dense2(x)          # [batch_size, 10]
        output = tf.nn.softmax(x)
        return output

num_epochs = 5
batch_size = 50
learning_rate = 0.001

model = MLP()
data_loader = MNISTLoader()
optimizer = tf.keras.optimizers.Adam(learning_rate=learning_rate)

num_batches = int(data_loader.num_train_data // batch_size * num_epochs)
for batch_index in range(num_batches):
    X, y = data_loader.get_batch(batch_size)
    with tf.GradientTape() as tape:
        y_pred = model(X)
        loss = tf.keras.losses.sparse_categorical_crossentropy(y_true=y, y_pred=y_pred)
        loss = tf.reduce_mean(loss)
        print("batch %d: loss %f" % (batch_index, loss.numpy()))
    grads = tape.gradient(loss, model.variables)
    optimizer.apply_gradients(grads_and_vars=zip(grads, model.variables))
    
sparse_categorical_accuracy = tf.keras.metrics.SparseCategoricalAccuracy()
num_batches = int(data_loader.num_test_data // batch_size)
for batch_index in range(num_batches):
    start_index, end_index = batch_index * batch_size, (batch_index + 1) * batch_size
    y_pred = model.predict(data_loader.test_data[start_index: end_index])
    sparse_categorical_accuracy.update_state(y_true=data_loader.test_label[start_index: end_index], y_pred=y_pred)
print("test accuracy: %f" % sparse_categorical_accuracy.result())

```

## 交叉熵
在 tf.keras 中，有两个交叉熵相关的损失函数 tf.keras.losses.categorical_crossentropy 和 tf.keras.losses.sparse_categorical_crossentropy 。其中 sparse 的含义是，真实的标签值 y_true 可以直接传入 int 类型的标签类别。具体而言：
```
loss = tf.keras.losses.sparse_categorical_crossentropy(y_true=y, y_pred=y_pred)
```
与
```
loss = tf.keras.losses.categorical_crossentropy(
    y_true=tf.one_hot(y, depth=tf.shape(y_pred)[-1]),
    y_pred=y_pred
)
```
的结果相同。

https://blog.csdn.net/tsyccnh/article/details/79163834

## 卷积神经网络（CNN）
```
class CNN(tf.keras.Model):
    def __init__(self):
        super().__init__()
        self.conv1 = tf.keras.layers.Conv2D(
            filters=32,             # 卷积层神经元（卷积核）数目
            kernel_size=[5, 5],     # 感受野大小
            padding='same',         # padding策略（vaild 或 same）
            activation=tf.nn.relu   # 激活函数
        )
        self.pool1 = tf.keras.layers.MaxPool2D(pool_size=[2, 2], strides=2)
        self.conv2 = tf.keras.layers.Conv2D(
            filters=64,
            kernel_size=[5, 5],
            padding='same',
            activation=tf.nn.relu
        )
        self.pool2 = tf.keras.layers.MaxPool2D(pool_size=[2, 2], strides=2)
        self.flatten = tf.keras.layers.Reshape(target_shape=(7 * 7 * 64,))
        self.dense1 = tf.keras.layers.Dense(units=1024, activation=tf.nn.relu)
        self.dense2 = tf.keras.layers.Dense(units=10)

    def call(self, inputs):
        x = self.conv1(inputs)                  # [batch_size, 28, 28, 32]
        x = self.pool1(x)                       # [batch_size, 14, 14, 32]
        x = self.conv2(x)                       # [batch_size, 14, 14, 64]
        x = self.pool2(x)                       # [batch_size, 7, 7, 64]
        x = self.flatten(x)                     # [batch_size, 7 * 7 * 64]
        x = self.dense1(x)                      # [batch_size, 1024]
        x = self.dense2(x)                      # [batch_size, 10]
        output = tf.nn.softmax(x)
        return output
```

![upload successful](/images/pasted-104.png)

```
import tensorflow as tf
import tensorflow_datasets as tfds

num_batches = 1000
batch_size = 50
learning_rate = 0.001

dataset = tfds.load("tf_flowers", split=tfds.Split.TRAIN, as_supervised=True)
dataset = dataset.map(lambda img, label: (tf.image.resize(img, [224, 224]) / 255.0, label)).shuffle(1024).batch(32)
model = tf.keras.applications.MobileNetV2(weights=None, classes=5)
optimizer = tf.keras.optimizers.Adam(learning_rate=learning_rate)
for images, labels in dataset:
    with tf.GradientTape() as tape:
        labels_pred = model(images)
        loss = tf.keras.losses.sparse_categorical_crossentropy(y_true=labels, y_pred=labels_pred)
        loss = tf.reduce_mean(loss)
        print("loss %f" % loss.numpy())
    grads = tape.gradient(loss, model.trainable_variables)
    optimizer.apply_gradients(grads_and_vars=zip(grads, model.trainable_variables))
```

## 循环神经网络（RNN）
。。。

## 深度强化学习（DRL）
。。。

# TensorFlow 常用模块 


## tf.train.Checkpoint 变量的保存与恢复

![upload successful](/images/pasted-105.png)
```
# train.py 模型训练阶段
model = MyModel()
# 实例化Checkpoint，指定保存对象为model（如果需要保存Optimizer的参数也可加入）
checkpoint = tf.train.Checkpoint(myModel=model)
# ...（模型训练代码）
# 模型训练完毕后将参数保存到文件（也可以在模型训练过程中每隔一段时间就保存一次）
checkpoint.save('./save/model.ckpt')

# test.py 模型使用阶段
model = MyModel()
checkpoint = tf.train.Checkpoint(myModel=model)             # 实例化Checkpoint，指定恢复对象为model
checkpoint.restore(tf.train.latest_checkpoint('./save'))    # 从文件恢复模型参数
# 模型使用代码
```

## tensorboard 训练过程可视化
整体框架如下：
```
summary_writer = tf.summary.create_file_writer('./tensorboard')
# 开始模型训练
for batch_index in range(num_batches):
    # ...（训练代码，当前batch的损失值放入变量loss中）
    with summary_writer.as_default():                               # 希望使用的记录器
        tf.summary.scalar("loss", loss, step=batch_index)
        tf.summary.scalar("MyScalar", my_scalar, step=batch_index)  # 还可以添加其他自定义的变量   
```

当我们要对训练过程可视化时，在代码目录打开终端（如需要的话进入 TensorFlow 的 conda 环境），运行:
```
tensorboard --logdir=./tensorboard
```
然后使用浏览器访问命令行程序所输出的网址（一般是 http:// 计算机名称：6006），即可访问 TensorBoard 的可视界面。

## tf.data 数据集的构建与预处理 

## TFRecord TensorFlow 数据集存储格式

## tf.function 图执行模式
TensorFlow 2 为我们提供了 tf.function 模块，结合 AutoGraph 机制，使得我们仅需加入一个简单的 @tf.function 修饰符，从而将模型转换为易于部署且高性能的 TensorFlow 图模型。

只需要将我们希望以图执行模式运行的代码封装在一个函数内，并在函数前加上 @tf.function 即可。

![upload successful](/images/pasted-106.png)

```
import tensorflow as tf
import time
from zh.model.mnist.cnn import CNN
from zh.model.utils import MNISTLoader

num_batches = 1000
batch_size = 50
learning_rate = 0.001
data_loader = MNISTLoader()
model = CNN()
optimizer = tf.keras.optimizers.Adam(learning_rate=learning_rate)

@tf.function
def train_one_step(X, y):    
    with tf.GradientTape() as tape:
        y_pred = model(X)
        loss = tf.keras.losses.sparse_categorical_crossentropy(y_true=y, y_pred=y_pred)
        loss = tf.reduce_mean(loss)
        # 注意这里使用了TensorFlow内置的tf.print()。@tf.function不支持Python内置的print方法
        tf.print("loss", loss)
    grads = tape.gradient(loss, model.variables)    
    optimizer.apply_gradients(grads_and_vars=zip(grads, model.variables))

start_time = time.time()
for batch_index in range(num_batches):
    X, y = data_loader.get_batch(batch_size)
    train_one_step(X, y)
end_time = time.time()
print(end_time - start_time)
```
一般而言，当模型由较多小的操作组成的时候， @tf.function 带来的提升效果较大。而当模型的操作数量较少，但单一操作均很耗时的时候，则 @tf.function 带来的性能提升不会太大。



***

附一个kaggle上mnist手写体识别的code：
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