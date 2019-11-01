title: Linux
author: Dccun
tags:
  - linux
categories:
  - linux
date: 2019-05-30 13:55:00
---
>友链:
看完这篇Linux基本的操作就会了:https://zhuanlan.zhihu.com/p/36801617

<!--more-->

### Linux系统的组成：
- linux内核（linus 团队管理）
- shell：系统的用户界面，提供了用户与内核进行交互操作的一种接口(命令解释器)
- 文件系统：ext3、ext4等,windows 有 fat32 、ntfs
- 第三方应用软件

### 文件系统结构
- bin 存放二进制可执行文件(ls,cat,mkdir等)
- boot 存放用于系统引导时使用的各种文件
- dev 用于存放设备文件
- etc 存放系统配置文件
- home 存放所有用户文件的根目录
- lib 存放跟文件系统中的程序运行所需要的共享库及内核模块
- mnt 系统管理员安装临时文件系统的安装点
- opt 额外安装的可选应用程序包所放置的位置
- proc 虚拟文件系统，存放当前内存的映射
- root 超级用户目录
- sbin 存放二进制可执行文件，只有root才能访问
- tmp 用于存放各种临时文件
- usr 用于存放系统应用程序，比较重要的目录/usr/local 本地管理员软件安装目录
- var 用于存放运行时需要改变数据的文件

### 通配符
- *：匹配任何字符和任何数目的字符
- ?：匹配单一数目的任何字符
- [ ]：匹配[ ]之内的任意一个字符
- [! ]：匹配除了[! ]之外的任意一个字符，!表示非的意思

### 文件的类型
- 普通文件-
- 目录d
- 符号链接l
	- 硬链接：与普通文件没什么不同，inode 都指向同一个文件在硬盘中的区块
	- 软链接：保存了其代表的文件的绝对路径，是另外一种文件，在硬盘上有独立的区块，访问时替换自身路径(简单地理解为 Windows 中常见的快捷方式)。
- 字符设备文件 c
- 块设备文件b
- 套接字s
- 命名管道p

### 常用的文件、目录操作命令
- pwd命令查看用户的当前目录
- cd 命令来切换目录
	- .表示当前目录
	- .. 表示当前目录的上一级目录（父目录）
	- -表示用 cd 命令切换目录前所在的目录
	- ~ 表示用户主目录的绝对路径名
- ls：显示文件或目录信息
- mkdir：当前目录下创建一个空目录
- rmdir：要求目录为空
- touch：生成一个空文件或更改文件的时间(可以改变文件的三种时间，分别是： access time 、 modify time 、 change time)
- cp：复制文件或目录
- mv：移动文件或目录、文件或目录改名
- rm：删除文件或目录
- ln：建立链接文件
- find：查找文件
- file/stat：查看文件类型或文件属性信息
- cat：查看文本文件内容
- more：可以分页看
- less：不仅可以分页，还可以方便地搜索，回翻等操作
- tail -10： 查看文件的尾部的10行
- head -20：查看文件的头部20行
- 别名alias
- echo：把内容重定向到指定的文件中 ，有则打开，无则创建
- 管道命令 | ：将前面的结果给后面的命令，例如：ls -la | wc，将ls的结果加油wc命令来统计字数
- 重定向 > 是覆盖模式，>> 是追加模式，例如：echo "Java3y,zhen de hen xi huan ni" > qingshu.txt把左边的输出放到右边的文件里去

### 文件打包和压缩命令
- 压缩的方式也是有好几种，我们常用的有下面这三种：
	- gzip
	- bzip2
	- tar
- 常用的压缩的命令就有：
	- gzip filename
	- bzip2 filename
	- tar -czvf filename
- 常用的解压命令有：
	- gzip -d filename.gz
	- bzip2 -d filename.bz2
	- tar -xzvf filename.tar.gz

### 正则表达式
![upload successful](/images/pasted-28.png)
![upload successful](/images/pasted-29.png)
grep(global search regular expression)是一个强大的文本搜索工具。grep 使用正则表达式搜索文本，并把匹配的行打印出来。
格式：grep [options] PATTERN [FILE...]
- PATTERN 是查找条件：可以是普通字符串、可以是正则表达式，通常用单引号将RE括起来。
- FILE 是要查找的文件，可以是用空格间隔的多个文件，也可是使用Shell的通配符在多个文件中查找PATTERN，省略时表示在标准输入中查找。
- grep命令不会对输入文件进行任何修改或影响，可以使用输出重定向将结果存为文件

例子：
- 在文件 myfile 中查找包含字符串 mystr的行
	- grep -n mystr myfile
- 显示 myfile 中第一个字符为字母的所有行
	- grep '^[a-zA-Z]' myfile
- 在文件 myfile 中查找首字符不是 # 的行（即过滤掉注释行）
	- grep -v '^#' myfile
- 列出/etc目录（包括子目录）下所有文件内容中包含字符串“root”的文件名
	- grep -lr root /etc/*
    
### Shell变量 和 Shell环境
Shell 变量大致可以分为三类：
- 内部变量：由系统提供，用户只能使用不能修改。
	- ?
	- GROUPS
- 环境变量：这些变量决定了用户工作的环境，它们不需要用户去定义，可以直接在 shell 中使用，其中某些变量用户可以修改。
- 用户变量：由用户建立和修改，在 shell 脚本编写中会经常用到。
	- 变量赋值（定义变量）
		- varName=Value
		- export varName=Value
	- 引用变量$varName
    
Shell变量的作用域：
- 局部变量的作用范围仅仅限制在其命令行所在的Shell或Shell脚本文件中；
- 全局变量的作用范围则包括本Shell进程及其所有子进程。
- 局部变量与全局变量互换：可以使用 export 内置命令将局部变量设置为全局变量。可以使用 export 内置命令将全局变量设置为局部变量。

export命令：
- 显示当前Shell可见的全局变量
	- export [-p]
- 定义变量值的同时声明为全局变量。
	- export <变量名1=值1> [<变量名2=值2> ...]
- 声明已经赋值的某个（些）局部变量为全局变量。
	- export <变量名1> [<变量名2> ...]
- 声明已经赋值的某个（些）全局变量为局部变量。
	- export -n <变量名1> [<变量名2> ...]

Shell环境变量：
- 环境变量定义 Shell 的运行环境，保证 Shell 命令的正确执行。
- Shell用环境变量来确定查找路径、注册目录、终端类型、终端名称、用户名等。
- 所有环境变量都是全局变量（即可以传递给 Shell 的子进程），并可以由用户重新设置。

Shell变量：查询、显示和取消：
- 显示当前已经定义的所有变量
	- 所有环境变量：env
	- 所有变量和函数（包括环境变量） ：set
- 显示某（些）个变量的值
	- echo $NAME1 [$NAME2 ……]
- 取消变量的声明或赋值
	- unset <NAME>

![upload successful](/images/pasted-30.png)

### VI编辑器
vi 是 “Visual interface” 的简称，它可以执行输出、删除、查找、替换、块操作等众多文本操作，而且用户可以根据自己的需要对其进行定制，这是其他编辑程序所没有的。
![upload successful](/images/pasted-31.png)
![upload successful](/images/pasted-32.png)

普通模式
- G用于直接跳转到文件尾
- ZZ用于存盘退出Vi
- ZQ用于不存盘退出Vi
- /和？用于查找字符串
- n继续查找下一个
- yy复制一行
- p粘帖在下一行，P粘贴在前一行
- dd删除一行文本
- x删除光标所在的字符
- u取消上一次编辑操作（undo）

插入模式
- 在 Normal 模式下输入插入命令 i、 a 、 o进入insert模式。用户输入的任何字符都被vim当做文件内容保存起来，并将其显示在屏幕上。
- 在文本输入过程中，若想回到Normal模式下，按 Esc 键即可。

命令行模式
- Normal 模式下，用户按冒号 :即可进入 Command 模式，此时 vim 会在显示窗口的最后一行 (屏幕的最后一行) 显示一个 “:” 作为 Command 模式的提示符，等待输入命令。
- :w 保存当前编辑文件，但并不退出
- :w newfile 存为另外一个名为 “newfile” 的文件
- :wq 用于存盘退出Vi
- :q! 用于不存盘退出Vi
- :q用于直接退出Vi （未做修改）

设置Vi环境:
- :set autoindent 缩进,常用于程序的编写
- :set noautoindent 取消缩进
- :set number 在编辑文件时显示行号
- :set nonumber 不显示行号
- :set tabstop=value 设置显示制表符的空格字符个数
- :set 显示设置的所有选项
- :set all 显示所有可以设置的选项