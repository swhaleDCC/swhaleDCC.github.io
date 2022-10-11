title: Java基础 | == 和 equals 和 hashCode
author: Dccun
tags: []
categories:
  - Java基础
date: 2022-10-11 20:04:00
---
- == 和 equals()
- equals() 和 hashCode()

<!--more-->

# == 和 equals()

1. ==
   - 基本数据类型比较的是值，只要值一样就返回true，和类型无关。
   - 引用数据类型比较的是对象的内存地址，看两个引用是否指向同一个对象实体。
2. equals()
   - 情况1：equals() 方法没有被重写，仍然默认使用==。
   - 情况2：equals() 方法被重写，则比较的是两个对象的内容。通常情况下，重写equals() 方法就是比较类中相应属性是否都相等。
3. 重写 equals() 方法的步骤
   - 判断形参 == this，是则返回true。
   - 判断形参 instanceof 当前对象的类名，是则把形参强转为当前对象的类的对象，依次判断相应属性是否相等。
   - 如果相应属性是基础数据类型，用 == 直接判断，否则继续使用 equals() 判断。
```java
class Solution {
    public static void main(String[] args) {
        int i = 10;
        double j = 10.0;
        char c = 10;
        System.out.println(i == j);  // true
        System.out.println(i == c);  // true
        System.out.println(j == c);  // true
    }
}
```

# equals() 和 hashCode()
（一）equals() 和 hashCode() 本身都是 Object 类中的方法
- Object.equals() 方法比较对象的内存地址是否相等。
- Object.hashCode() 是native方法，大部分情况返回对象的内存地址，具体还要取决于运行时库和JVM的具体实现。
```
package java.lang;
public class Object {
    public native int hashCode();
    public boolean equals(Object obj) {
        return (this == obj);
    }
}
```

（二）自定义类中重写 equals() 和 hashCode() 方法

- String 类已经重写了这两个方法。
- 重写的 equals() 方法用来判断两个对象是否相等。
- 重写的 hashCode() 方法的作用是获取哈希码，实际上是返回一个int整数，确定该对象在哈希表中的索引位置。
- 如果两个对象的 equals() 返回true，它们的 hashCode() 值一定相同。
- 如果两个对象 hashCode() 相等，它们的 equals() 并不一定返回true。hashCode() 只是用来缩小查找成本，会有哈希碰撞的情况。

```
package java.lang;

public final class String implements java.io.Serializable, Comparable<String>, CharSequence {
    public boolean equals(Object anObject) {
        if (this == anObject) {
            return true;
        }
        if (anObject instanceof String) {
            String anotherString = (String)anObject;
            int n = value.length;
            if (n == anotherString.value.length) {
                char v1[] = value;
                char v2[] = anotherString.value;
                int i = 0;
                while (n-- != 0) {
                    if (v1[i] != v2[i])
                        return false;
                    i++;
                }
                return true;
            }
        }
        return false;
    }
    
    public int hashCode() {
        int h = hash;
        if (h == 0 && value.length > 0) {
            char val[] = value;

            for (int i = 0; i < value.length; i++) {
                h = 31 * h + val[i];
            }
            hash = h;
        }
        return h;
    }
}
```

（三）只要重写了 equals()，必须重写 hashCode() 的场景和原因：

- Set存储的自定义对象必须重写这两个方法。
- 如果自定义对象作为Map的key，必须重写这两个方法。
- 如果自定义对象不重写 hashCode()，那就自动调用 Object 的 hashCode() 方法，大部分情况返回的是对象的内存地址，违反了“如果两个对象的 equals() 返回true，它们的 hashCode() 值一定相同”原则。


（四）重写 hashCode() 方法的原则
- 在程序运行时，同一个对象多次调用 hashCode() 应该返回相同的值。
- 当两个对象的 equals() 方法返回true时，hashCode() 的返回值也应该相等。
- 对象中用作 equals() 方法比较的属性，都应该用来计算 hashCode 值。比如下面的 hashCode() 方法中应该用到 name 和 address 两个属性。

```
public class Animal {

    private String name;
    private String address;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Animal animal = (Animal) o;
        return Objects.equals(name, animal.name) && Objects.equals(address, animal.address);
    }

    @Override
    public int hashCode() {
        return Objects.hash(name, address);
    }
}
```

（五）为什么调用IDE工具自动重写这俩方法时有31这个数字
- 选择系数时要选择尽量大的系数，减少冲突
- 31只占用5bits，相乘造成数据溢出的概率比较小
- 31可以由 i*31==(i<<5)-1 来表示，现在很多虚拟机里面都有做相关优化，提高算法效率
- 31是一个素数，如果用一个数字来乘以这个素数，最终出来的结果只能被素数本身和被乘数还有1来整除，减少冲突