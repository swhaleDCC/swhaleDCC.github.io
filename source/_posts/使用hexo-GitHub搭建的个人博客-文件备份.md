title: 基于GitHub+hexo搭建的个人博客备份
author: Dccun
tags:
  - hexo
categories:
  - 技术
  - ''
date: 2019-10-30 17:43:00
---
>担心博客.md文件放在本地容易丢失，就新建了一个分支来备份。

<!--more-->

# 第一次备份

1. 在xxx.github.io文件夹, 右键选择Git Bash 进入命令行，进入项目所在目录，输入 touch .gitignore ，生成“.gitignore”文件。
2. 在本地文件根目录中初始化 : git init
3. 创建分支hexo ： git checkout -b hexo
4. 提交到仓库，需要注意的事在提交之前要把themes目录下主题中的 .git 文件夹重命名或者删除，不然的话 git 会把主题当做子模块来处理。
	```
	git add .
	git commit -m 'init'
   ```
5. 添加远程仓库
	```
	git remote add origin 	git@github.com:MrWangwj/MrWangwj.github.io.git
   ```
6. push 到远程分支 : git push origin hexo

***

# 日常的改动流程


1. 依次执行git add .、git commit -m "..."、git push origin hexo指令将改动推送到GitHub（此时当前分支应为hexo）
2. 然后才执行hexo g -d发布网站到master分支上。
3. 虽然两个过程顺序调转一般不会有问题，不过逻辑上这样的顺序是绝对没问题的（例如突然死机要重装了，悲催....的情况，调转顺序就有问题了）。

***

# 在另一台电脑上使用

1. 首先要克隆下这个项目 : git clone xxx
2. 进入博客目录，切换到博客文件分支  ：git checkout -b hexo origin/hexo
3. 安装hexo ： npm install hexo --save （不需要hexo init这条指令）