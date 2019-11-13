title: Java
tags:
  - Java
categories:
  - 编程语言
date: 2019-05-20 16:36:00
---
>友链:
本文部分内容转载自JavaGuide，地址：https://github.com/Snailclimb/JavaGuide ，作者：SnailClimb。
本文内容全部参考上述资料。
<!--more-->

# 商汤Java实习面试
>商汤Java实习，远程面试，面试官面了一次后HR就打电话来问什么时候上岗谈薪资然后打算给发offer，地点深圳，最终因为大四课程没有结束放弃了。实习工资还挺高没去真是可惜了。

**问：== 与 equals的区别**
== : 它的作用是判断两个对象的地址是不是相等。即，判断两个对象是不是同一个对象。(基本数据类型==比较的是值，引用数据类型==比较的是内存地址)
equals() : 它的作用也是判断两个对象是否相等。但它一般有两种使用情况：
- 情况1：类没有覆盖 equals() 方法。则通过 equals() 比较该类的两个对象时，等价于通过“==”比较这两个对象。
- 情况2：类覆盖了 equals() 方法。一般，我们都覆盖 equals() 方法来两个对象的内容相等；若它们的内容相等，则返回 true (即，认为这两个对象相等)。
另外，当创建 String 类型的对象时，虚拟机会在常量池中查找有没有已经存在的值和要创建的值相同的对象，如果有就把它赋给当前引用。如果没有就在常量池中重新创建一个 String 对象。

**问：equals()**
这个好像是问了一个类怎么重写equals()方法。
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

**问：final 关键字的用法**
final关键字主要用在三个地方：变量、方法、类。
1. 对于一个final变量，如果是基本数据类型的变量，则其数值一旦在初始化之后便不能更改；如果是引用类型的变量，则在对其初始化之后便不能再让其指向另一个对象。
2. 当用final修饰一个类时，表明这个类不能被继承。final类中的所有成员方法都会被隐式地指定为final方法。
3. 使用final方法的原因有两个。第一个原因是把方法锁定，以防任何继承类修改它的含义；第二个原因是效率。在早期的Java实现版本中，会将final方法转为内嵌调用。但是如果方法过于庞大，可能看不到内嵌调用带来的任何性能提升（现在的Java版本已经不需要使用final方法进行这些优化了）。类中所有的private方法都隐式地指定为fianl。

**问：自动装箱与拆箱**
参考：https://blog.csdn.net/teacher_lee_zzsxt/article/details/79230501 。
装箱：将基本类型用它们对应的引用类型包装起来；
拆箱：将包装类型转换为基本数据类型。
具体的问了一下int和Integer,还问了类似下面这样的问题,让我直接说结果，（始终对这个知识点很懵）。
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

**线程的五大状态及其常用方法**
![upload successful](/images/pasted-62.png)

**垃圾回收**

**最后一问：你有什么问题问我吗？**
（前面挺多问题没回答好，当时觉得应该没戏了，并没有问面试官什么。Java面试突击里也有这个问题）

第一是面对HR或者level比较低的面试官（个人觉得这部分比较常用）
![upload successful](/images/pasted-57.png)
![upload successful](/images/pasted-55.png)
![upload successful](/images/pasted-56.png)



# Java数据类型
java：强类型语言
Java一共有8中基本类型：
1. 4种整型
	int,short,long,byte
2. 2种浮点类型
	float(后缀F或f),double
3. 1种用于表示Unicode编码的字符单元的字符类型char
4. 1种用于表示真值的Boolean类型
	false,true

Java没有内置的字符串类型，而是在标准Java类库中提供了一个预定义类，叫做String。
Java会自动地进行垃圾回收，如果一块内存不再使用了，系统最终会将其回收。

# 爱奇艺Java方向试卷
1. 关于Java以下描述正确的有(      )
>A：Class类是Object类的超类
B：Object类是一个final类
C：String类是一个final类
D：Class类可以装载其它类
正确答案 :CD

2. 下列代码编译和运行的结果是：（） 
```                                            
public class Threads4{
 public static void main(String[] args){
  new Threads4().go();
 }
 public void go(){
  Runnable r=new Runnable(){
   public void run(){
    System.out.print("foo");
   }
  };
  Thread t=new Thread(r);
  t.start();
 }
} 
>正确答案 :输出：foo     
```
       

3. 以下关于外观模式的叙述中错误是（      ）
>A:外观模式符合单一职责原则
B:在外观模式中，一个子系统的外部与内部通信通过统一的外观对象进行
C:在外观模式中，客户类只需要直接与外观对象进行交互
D:外观模式是迪米特法则的一种具体实现
正确答案: B C D 
>外观模式（Facade Pattern）隐藏系统的复杂性，并向客户端提供了一个客户端可以访问系统的接口。这种类型的设计模式属于结构型模式，它向现有的系统添加一个接口，来隐藏系统的复杂性。这种模式涉及到一个单一的类，该类提供了客户端请求的简化方法和对现有系统类方法的委托调用。
优点：1、减少系统相互依赖。 2、提高灵活性。 3、提高了安全性。

4. 编写程序时使用文件系统提供的系统调用将内存中由address地址开始的n个字节或n个记录的信息写入指定文件中，但发现文件名不可用，可行的解决办法是
>A:使用文件描述符代替文件名
B:使用文件句柄代替文件名
C:使用当前进程的PCB编号代替
D:其他办法都不可行
正确答案 :AB
无论是文件句柄（Windows中概念），还是文件描述符（linux中概念），其最终目的都是用来定位打开的文件在内存中的位置，只是它们映射的方式不一样。
注意，文件句柄定位到的是文件对象，而非文件。而文件对象是对这个文件的一些状态、属性的封装，例如读取到的文件位置等。

5. TCP协议与UDP协议负责端到端连接，下列那些信息只出现在TCP报文，UDP报文不包含此信息（      ）
>A:序列号
B:源端口
C:目标端口
D:窗口大小
正确答案 :AD
UDP的包头结构为：源端口 16位，目的端口 16位，长度 16位，校验和 16位
另外我们可以注意到，TCP是提供可靠传输的，而UDP并不提供可靠传输，而序列号和窗口大小都是为了提供可靠传输的。

6. 在一个空的5阶B-树中依次插入关键字序列{6,8,15,16,22,10,18,32,20}，插入完成后，关键字6所在结点包含的关键字个数为（      ）
>正确答案 :3
![](https://uploadfiles.nowcoder.com/images/20190703/291053_1562120552172_568001D9EB97F2B157D06DF96FEB0648)
B-树的阶数指的是每个节点最多能有多少节点。
B-树插入的方式：
1、 若该结点中关键码个数小于m-1，则直接插入即可。
2、 若该结点中关键码个数等于m-1，则将引起结点的分裂。以中间关键码为界将结点一分为二，并把中间关键码插入到父结点。

7. 6个圆盘的汉诺塔，总的移动次数是（      ）
>正确答案 :63
该游戏是在一块铜板装置上，有三根杆(编号A、B、C)，在A杆自下而上、由大到小按顺序放置64个金盘(如下图)。游戏的目标：把A杆上的金盘全部移到C杆上，并仍保持原有顺序叠好。操作规则：每次只能移动一个盘子，并且在移动过程中三根杆上都始终保持大盘在下，小盘在上，操作过程中盘子可以置于A、B、C任一杆上。
汉诺塔问题的思想是递归，n个圆盘的汉诺塔，移动的思想可以归纳为三步：
（假设x,y,z三个柱子，n个圆盘都在x柱子上，现在要把圆盘都移动到z柱子上去）
（1）将n-1个圆盘借助z柱子移动到y柱子上
（2）再把第n个圆盘移到z柱子上
（3）把y柱子上的n-1个圆盘移到x柱子上
因此如果用f(n)来表示移动的次数，可以得到: f(n)=2f(n-1)+1； f(1)=1。得到公式f(n) = 2^n - 1。

8. 使用堆排序方法排序（45，78，57，25，41，89），初始堆为（      ）
>A:78,45,57,25,41,89
B:89,78,57,25,41,45
C:89,78,25,45,41,57
D:89,45,78,41,57,25
正确答案 :B

9. 接口中字段的修饰符：public static final（默认不写）
接口中方法的修饰符：public abstract（默认不写）
序列化：将数据结构转换称为二进制数据流或者文本流的过程。序列化后的数据方便在网络上传输和在硬盘上存储。
反序列化：与序列化相反，是将二进制数据流或者文本流转换称为易于处理和阅读的数据结构的过程。
本质其实还是一种协议，一种数据格式，方便数据的存储和传输。

10. 按照流是否直接与特定的地方（如磁盘、内存、设备等）相连，分为节点流和处理流两类。
>节点流：可以从或向一个特定的地方（节点）读写数据。如FileReader.
处理流：是对一个已存在的流的连接和封装，通过所封装的流的功能调用实现数据读写。如BufferedReader.处理流的构造方法总是要带一个其他的流对象做参数。一个流对象经过其他流的多次包装，称为流的链接。
>JAVA常用的节点流：
文 件 FileInputStream FileOutputStrean FileReader FileWriter 文件进行处理的节点流。
字符串 StringReader StringWriter 对字符串进行处理的节点流。
数 组 ByteArrayInputStream ByteArrayOutputStreamCharArrayReader CharArrayWriter 对数组进行处理的节点流（对应的不再是文件，而是内存中的一个数组）。
管 道 PipedInputStream PipedOutputStream PipedReaderPipedWriter对管道进行处理的节点流。
>常用处理流（关闭处理流使用关闭里面的节点流）:
缓冲流：BufferedInputStrean BufferedOutputStream BufferedReader BufferedWriter  增加缓冲功能，避免频繁读写硬盘。
转换流：InputStreamReader OutputStreamReader 实现字节流和字符流之间的转换。
数据流 DataInputStream DataOutputStream  等-提供将基础数据类型写入到文件中，或者读取出来.
流的关闭顺序
一般情况下是：先打开的后关闭，后打开的先关闭
另一种情况：看依赖关系，如果流a依赖流b，应该先关闭流a，再关闭流b。
可以只关闭处理流，不用关闭节点流。处理流关闭的时候，会调用其处理的节点流的关闭方法。

11. internet骨干网中的路由器通过BGP协议传输数据,BGP协议使用传输层的协议与端口有（      ）
>A:udp协议
B:tcp协议
C:端口179
D:端口169
正确答案: B C
在BGP中，路由器对使用179端口的半永久TCP连接来交换选路信息。--课本上原话

12. 已知二叉树A(B(,D(F,H)),C(,E(G(I)))),由此二叉树转换的森林描述正确的是（      ）
>A:该森林包含两棵树
B:该森林包含三棵树
C:以A为根的树有两个孩子
D:以A为根的树有三个孩子
正确答案: B D 
[树、森林、二叉树的转换](https://blog.csdn.net/linraise/article/details/11745559)
![](https://uploadfiles.nowcoder.com/images/20190610/195487876_1560130345284_9CB010308570770953E1D02A9381EC93)