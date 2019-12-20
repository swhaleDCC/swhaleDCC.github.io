title: 商汤Java开发实习面试
author: Dccun
tags:
  - 商汤
categories:
  - 面经
date: 2019-10-03 14:59:00
---
![upload successful](/images/pasted-72.png)
<!--more-->

# 商汤Java实习面试 9.25

>商汤Java实习，九月底投的简历，远程面试，面试官面了一次后HR就打电话来问什么时候上岗谈薪资然后打算给发offer，地点深圳，最终因为大四课程没有结束放弃了。实习工资还挺高没去真是可惜了。

## == 与 equals
== : 它的作用是判断两个对象的地址是不是相等。即，判断两个对象是不是同一个对象。(基本数据类型==比较的是值，引用数据类型==比较的是内存地址)
equals() : 它的作用也是判断两个对象是否相等。但它一般有两种使用情况：
- 情况1：类没有覆盖 equals() 方法。则通过 equals() 比较该类的两个对象时，等价于通过“==”比较这两个对象。
- 情况2：类覆盖了 equals() 方法。一般，我们都覆盖 equals() 方法来两个对象的内容相等；若它们的内容相等，则返回 true (即，认为这两个对象相等)。
另外，当创建 String 类型的对象时，虚拟机会在常量池中查找有没有已经存在的值和要创建的值相同的对象，如果有就把它赋给当前引用。如果没有就在常量池中重新创建一个 String 对象。

好像还问了一个类怎么重写equals()方法。
```
public boolean equals(Object otherObject){       //测试两个对象是否是同一个对象，是的话返回true
           if(this == otherObject) {  //测试检测的对象是否为空，是就返回false
               return true;   
           } 
           if(otherObject == null) {  //测试两个对象所属的类是否相同，否则返回false
               return false;       
           }
           if(getClass() != otherObject.getClass()) {  //对otherObject进行类型转换以便和类A的对象进行比较
               return false; 
           }       
           A other=(A)otherObject; 
           return Object.equals(类A对象的属性A，other的属性A）&&类A对象的属性B==other的属性B……;
    }
```

## final 关键字的用法
final关键字主要用在三个地方：变量、方法、类。
1. 对于一个final变量，如果是基本数据类型的变量，则其数值一旦在初始化之后便不能更改；如果是引用类型的变量，则在对其初始化之后便不能再让其指向另一个对象。
2. 当用final修饰一个类时，表明这个类不能被继承。final类中的所有成员方法都会被隐式地指定为final方法。
3. 使用final方法的原因有两个。第一个原因是把方法锁定，以防任何继承类修改它的含义；第二个原因是效率。在早期的Java实现版本中，会将final方法转为内嵌调用。但是如果方法过于庞大，可能看不到内嵌调用带来的任何性能提升（现在的Java版本已经不需要使用final方法进行这些优化了）。类中所有的private方法都隐式地指定为fianl。

## 自动装箱与拆箱
参考：https://blog.csdn.net/teacher_lee_zzsxt/article/details/79230501 。
装箱：将基本类型用它们对应的引用类型包装起来；
拆箱：将包装类型转换为基本数据类型。
具体的问了一下int和Integer,像下面这样，面试官说代码,让我直接说结果哪个跟哪个用==还是equals相等还是不等，（始终对这个知识点很懵）。
- Integer是int的包装类，int则是java的一种基本数据类型 
- Integer变量必须实例化后才能使用，而int变量不需要 
- Integer实际是对象的引用，当new一个Integer时，实际上是生成一个指针指向此对象；而int则是直接存储数据值 
- Integer变量和int变量比较时，只要两个变量的值是向等的，则结果为true（因为包装类Integer和基本数据类型int比较时，java会自动拆包装为int，然后进行比较，实际上就变为两个int变量的比较）
- 由于Integer变量实际上是对一个Integer对象的引用，所以两个通过new生成的Integer变量永远是不相等的（因为new生成的是两个对象，其内存地址不同）。
- 非new生成的Integer变量和new Integer()生成的变量比较时，结果为false。（因为非new生成的Integer变量指向的是java常量池中的对象，而new Integer()生成的变量指向堆中新建的对象，两者在内存中的地址不同）
- 对于两个非new生成的Integer对象，进行比较时，如果两个变量的值在区间-128到127之间，则比较结果为true，如果两个变量的值不在此区间，则比较结果为false
4、Integer的默认值是null，int的默认值是0
```
public static void main(String[] args) {
    Integer i = 10;
    Integer j = 10;
    System.out.println(i == j);
      
    Integer a = 128;
    Integer b = 128;
    System.out.println(a == b);
     
    int k = 10;
    System.out.println(k == i);
    int kk = 128;
    System.out.println(kk == a);
      
    Integer m = new Integer(10);
    Integer n = new Integer(10);
    System.out.println(m == n);
}
```
正确答案：
![upload successful](/images/pasted-58.png)
![upload successful](/images/pasted-59.png)
![upload successful](/images/pasted-60.png)
`Integer a = 128; 通过反编译工具生成的class文件是：Integer a = Integer.valueOf(128);这就是基本数据类型的自动装箱，128是基本数据类型，然后被解析成Integer类。
Integer a = new Integer(128);int m = a;反编译生成的class文件：Integer a = new Integer(128);int m = a.intValue();
简单来讲：自动装箱就是Integer.valueOf(int i);自动拆箱是i.intValue();`
```
Integer a = 1;
Integer b = 2;
Integer c = 3;
Integer d = 3;
Integer e = 321;
Integer f = 321;
Long g = 3L;
Long h = 2L;
System.out.println(c == d); //t
System.out.println(e == f); //f
System.out.println(c == (a + b));  //t
System.out.println(c.equals((a+b)));//t
System.out.println(g == (a+b));//t
System.out.println(g.equals(a+b));//f
System.out.println(g.equals(a+h));//t
```
![upload successful](/images/pasted-61.png)

## 线程的五大状态及其常用方法
![upload successful](/images/pasted-62.png)
（1）新建状态：即单纯地创建一个线程，创建线程有三种方式
（2）就绪状态：在创建了线程之后，调用Thread类的start()方法来启动一个线程，即表示线程进入就绪状态
（3）运行状态：当线程获得CPU时间，线程才从就绪状态进入到运行状态
（4）阻塞状态：线程进入运行状态后，可能由于多种原因让线程进入阻塞状态，如：调用sleep()方法让线程睡眠，调用wait()方法让线程等待，调用join()方法、suspend()方法（它现已被弃用！）以及阻塞式IO方法
（5）死亡状态：run()方法的正常退出就让线程进入到死亡状态，还有当一个异常未被捕获而终止了run()方法的执行也将进入到死亡状态
![upload successful](/images/pasted-63.png)
- 线程等待------wait()方法
- 线程唤醒-------notify()方法
- sleep()使线程休眠一段时间，将处于阻塞状态;如果调用了sleep方法之后，没有其他等待执行的线程，这个时候线程不会恢复执行，还是在休眠。
- join()阻塞指定线程等到另外一个线程完成后继续执行。
- yield()让当前正在执行的线程暂停，不是阻塞线程，而是将线程的运行态转入就绪态；调用了该方法后，如果没有其他线程等待执行，此时当前线程就会马上恢复执行。
- setDaemon()可以将指定的线程设置成后台线程，守护线程；创建用户线程的线程结束时，后台线程也随之消亡；只能在线程启动之前把它设为后台线程。
- setPriority(int newPriority) getPriority()线程的优先级代表的是概率；范围从1到10，默认为5。
- stop()终止线程运行，变为死亡态；

## Java垃圾回收机制（GC）
参考：https://blog.csdn.net/justloveyou_/article/details/71216049
https://blog.csdn.net/justloveyou_/article/details/71216049
>垃圾回收(Garbage Collection)是Java虚拟机(JVM)垃圾回收器提供的一种用于在空闲时间不定时回收无任何对象引用的对象占据的内存空间的一种机制。
- 垃圾：无任何对象引用的对象。
- 回收：清理“垃圾”占用的内存空间而非对象本身。
- 发生地点：一般发生在堆内存中，因为大部分的对象都储存在堆内存中。
- 发生时间：程序空闲时间不定时回收。

1. 哪些内存需要回收？(对象是否可以被回收的两种经典算法: `引用计数法` 和 `可达性分析算法`)
2. 什么时候回收？ （堆的新生代、老年代、永久代的垃圾回收时机，MinorGC 和 FullGC）
3. 如何回收？(三种经典垃圾回收算法(`标记清除算法`、`复制算法`、`标记整理算法`)及`分代收集算法` 和 七种垃圾收集器)



## 最后一问：你有什么问题问我吗？
（前面挺多问题没回答好，当时觉得应该没戏了，并没有问面试官什么。Java面试突击里也有这个问题）

第一是面对HR或者level比较低的面试官（个人觉得这部分比较常用）
![upload successful](/images/pasted-57.png)
![upload successful](/images/pasted-55.png)
![upload successful](/images/pasted-56.png)

只能记起来这么多了，问的都是java基础，把　https://github.com/Snailclimb/JavaGuide　看一遍基本没什么问题。