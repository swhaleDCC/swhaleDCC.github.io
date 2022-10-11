title: 测试框架 Mocha
author: Dccun
tags:
  - mocha
categories:
  - 技术
date: 2020-05-15 09:12:00
---
- https://www.liaoxuefeng.com/wiki/1022910821149312/1101741181366880
- http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html

<!--more-->

mocha[ˈmɒkə]诞生于2011年，是JavaScript的一种单元测试框架，既可以在浏览器环境下运行，也可以在Node.js环境下运行。

mocha的特点主要有：
1. 既可以测试简单的JavaScript函数，又可以测试异步代码，因为异步是JavaScript的特性之一；
2. 可以自动运行所有测试，也可以只运行特定的测试；
3. 可以支持before、after、beforeEach和afterEach来编写初始化代码。
4. 使用Node.js提供的assert模块进行断言


`describe`是Jasmine的全局函数，用于创建一个测试套件，可以理解为一组测试用例的集合。
describe函数接受两个参数（一个字符串和一个回调函数）。字符串是这个测试套件的名字或标题，通常描述被测试内容，用之前的比喻来说，describe就是一个故事，字符串就是这个故事的标题。回调函数是实现测试套件的代码块（称为describe块）。

`it`也是Jasmine的全局函数，用来在describe块中创建一个测试用例（spec），和describe一样，it接受两个参数（一个字符串一个回调函数），字符串参数是测试用例的名字或标题，回调函数是实现测试用例的代码块（称为it块）。

describe和it函数的字符串参数是很重要的。如果描述得当的话，你的测试可以将一个完整的测试场景以自然语言的形式表达出来，形成文档。describe和it都属于JavaScript函数，所以JavaScript的作用域规则也适用于此。
用java中学过的全局变量与局部变量的概念来说，我们可以把describe类别为一个class，把it类比于里面的方法，在describe中声明的变量即全局变量，在它里面的所以的it中都可以使用。而it中声明的变量为局部变量，只在此it内部有效。

在Jasmine中有四个`全局函数`用于安装和拆卸，如下：
- beforeEach：在每一个测试用例（it块）执行之前都执行一遍beforeEach函数
- afterEach：在每一个测试用例（it块）执行之后都执行一遍afterEach 函数
- beforeAll：在测试套件（describe块）中所有测试用例执行之前执行一遍beforeAll函数
- afterAll：在测试套件（describe块）中所有测试用例执行之后执行一遍afterAll函数

Jasmine中describe块代码与it块代码及`拆装与卸载的执行顺序`：
- 首先执行的是：其他，不管是外部describe中的其他还是内部describe块中的其他，总之先将其他全部执行，顺序是从上往下。
- 第二步：找出it块，以it为中心，从外往内找beforeAll,beforeEach，先执行beforeAll，再执行beforeEach，且一个describe中的beforeAll只执行一遍，只有第一个it块执行前会先执行beforeAll,而其他的it块不会有该步骤；而beforeEach则是每个it块执行前都会先执行beforeEach。
- 第三步：执行it块中代码；
- 第四步：以it为中心，从内往外执行afterEach和afterAll，先执行afterEach再执行afterAll，执行顺序与beforeAll及beforeEach相反，这里需要注意的是，beforeAll只在该describe块中的最后一个it执行后才会执行，其他it块不会。

`Jasmine的断言`是期望值与实际值比较，一致则通过，不一致则失败。
那么我们比较的类型有多少呢？
- 如果两个值是数值，我们可以想到：等于，不等于，大于，小于，大于等于，小于等于，约等于等
- 如果两个是布尔值，我们可以想到：值为ture，值为false；
- 如果两个是对象，我们可以想到：对象相等，被定义，未被定义，是否为null
- 还有一些其他的：根据字符串、正则表达式筛选是否符合规则，是否抛出异常，报错信息是否一致等等，我们还可以自定义匹配器。

`同步`：如果在函数返回的时候，调用者就能够得到预期结果(即拿到了预期的返回值或者看到了预期的效果)，那么这个函数就是同步的。

`异步`:如果在函数返回的时候，调用者还不能够得到预期结果，而是需要在将来通过一定的手段得到，那么这个函数就是异步的。

`async` 是“异步”的简写，而 `await` 可以认为是 async wait 的简写。所以应该很好理解 async 用于申明一个 function 是异步的，而 await 用于等待一个异步方法执行完成。