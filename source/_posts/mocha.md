title: 测试框架 Mocha
author: Dccun
tags:
  - mocha
categories:
  - 测试
date: 2020-05-15 09:12:00
---
>友链：
- https://www.liaoxuefeng.com/wiki/1022910821149312/1101741181366880
- http://www.ruanyifeng.com/blog/2015/12/a-mocha-tutorial-of-examples.html

<!--more-->

mocha[ˈmɒkə]诞生于2011年，是JavaScript的一种单元测试框架，既可以在浏览器环境下运行，也可以在Node.js环境下运行。

mocha的特点主要有：
1. 既可以测试简单的JavaScript函数，又可以测试异步代码，因为异步是JavaScript的特性之一；
2. 可以自动运行所有测试，也可以只运行特定的测试；
3. 可以支持before、after、beforeEach和afterEach来编写初始化代码。

使用Node.js提供的assert模块进行断言

