title: Git入门学习笔记
tags:
  - Git
categories:
  - Git
date: 2019-05-29 09:08:00
---
![upload successful](/images/pasted-131.png) 

- [git - 简易指南](https://www.bootcss.com/p/git-guide/)
- [廖雪峰教程](https://www.liaoxuefeng.com/wiki/896043488029600) 
- [Git官网](https://git-scm.com/)
- [Git必看书籍:Pro Git](https://git-scm.com/book/zh/v2)

<!--more-->


# Git：分布式版本控制系统

`Git是版本控制系统，Github是在线的基于Git的代码托管服务。`

基本的 Git 工作流程如下：
1. 在工作目录中修改文件。
2. 暂存文件，将文件的快照放入暂存区域。
3. 提交更新，找到暂存区域的文件，将快照永久性存储到 Git 仓库目录。

>版本控制是一种记录一个或若干文件内容变化，以便将来查阅特定版本修订情况的系统。 除了项目源代码，你可以对任何类型的文件进行版本控制。
有了它你就可以将某个文件回溯到之前的状态，甚至将整个项目都回退到过去某个时间点的状态，你可以比较文件的变化细节，查出最后是谁修改了哪个地方，从而找出导致怪异问题出现的原因，又是谁在何时报告了某个功能缺陷等等。

>Git采用的是直接记录快照的方式，而非差异比较。我后面会详细介绍这两种方式的差别。


## 集中式和分布式的区别
集中式：CVS、SVN
>集中式版本控制系统最大的毛病就是必须联网才能工作，如果在局域网内还好，带宽够大，速度够快，可如果在互联网上，遇到网速慢的话，可能提交一个10M的文件就需要5分钟。
分布式版本控制系统根本没有“中央服务器”，每个人的电脑上都是一个完整的版本库，这样，你工作的时候，就不需要联网了，因为版本库就在你自己的电脑上。既然每个人电脑上都有一个完整的版本库。
和集中式版本控制系统相比，分布式版本控制系统的安全性要高很多，因为每个人电脑里都有完整的版本库，某一个人的电脑坏掉了不要紧，随便从其他人那里复制一个就可以了。而集中式版本控制系统的中央服务器要是出了问题，所有人都没法干活了。

# 时光穿梭机
## 版本库
又名仓库，英文名repository，你可以简单理解成一个目录，这个目录里面的所有文件都可以被Git管理起来，每个文件的修改、删除，Git都能跟踪，以便任何时刻都可以追踪历史，或者在将来某个时刻可以“还原”。
```
$ mkdir learngit   //选择一个合适的地方，创建一个空目录
$ cd learngit
$ pwd
$ git init   //这个目录变成Git可以管理的仓库
```
当前目录下多了一个.git的目录，这个目录是Git来跟踪管理版本库的，没事千万不要手动修改这个目录里面的文件，不然改乱了，就把Git仓库给破坏了。

Microsoft的Word格式是二进制格式，因此，版本控制系统是没法跟踪Word文件的改动的,如果要真正使用版本控制系统，就要以纯文本方式编写文件。
因为文本是有编码的，比如中文有常用的GBK编码，日文有Shift_JIS编码，如果没有历史遗留问题，强烈建议使用标准的UTF-8编码，所有语言使用同一种编码，既没有冲突，又被所有平台所支持。

添加文件到Git仓库，分两步：
```
$ git add readme.txt   //注意，可反复多次使用，添加多个文件；
$ git commit -m "wrote a readme file"
$ cat readme.txt   //读取文件内容
```
要随时掌握工作区的状态，使用git status命令。
如果git status告诉你有文件被修改过，用git diff可以查看修改内容。
在Git中，我们用git log命令查看。
```
git status
git diff readme.txt
git log
```

## 版本回退
Git必须知道当前版本是哪个版本，在Git中，用HEAD表示当前版本，也就是最新的提交1094adb...（注意我的提交ID和你的肯定不一样），上一个版本就是HEAD^，上上一个版本就是HEAD^^，当然往上100个版本写100个^比较容易数不过来，所以写成HEAD~100。
```
$ git reset --hard HEAD^
$ git reset --hard deb9275
$ git reflog
```
穿梭前，用git log可以查看提交历史，以便确定要回退到哪个版本。
要重返未来，用git reflog查看命令历史，以便确定要回到未来的哪个版本。

## 工作区和暂存区
工作区（Working Directory）,就是你在电脑里能看到的目录，比如我的learngit文件夹就是一个工作区。

工作区有一个隐藏目录.git，这个不算工作区，而是Git的版本库。
Git的版本库里存了很多东西，其中最重要的就是称为stage（或者叫index）的暂存区，还有Git为我们自动创建的第一个分支master，以及指向master的一个指针叫HEAD。

Git 有三种状态——已提交（committed）、已修改（modified）和已暂存（staged）


>第一步是用git add把文件添加进去，实际上就是把文件修改添加到暂存区；
>第二步是用git commit提交更改，实际上就是把暂存区的所有内容提交到当前分支。
因为我们创建Git版本库时，Git自动为我们创建了唯一一个master分支，所以，现在，git commit就是往master分支上提交更改。

## 管理修改
Git管理的是修改，而不是文件
每次修改，如果不用git add到暂存区，那就不会加入到commit中。

## 撤销修改
在准备提交前，猛然发现了错误,发现得很及时，就可以很容易地纠正它。你可以删掉最后一行，手动把文件恢复到上一个版本的状态。
```
$ git checkout -- readme.txt
```
命令git checkout -- readme.txt意思就是，把readme.txt文件在工作区的修改全部撤销，这里有两种情况：
一种是readme.txt自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；
一种是readme.txt已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。
总之，就是让这个文件回到最近一次git commit或git add时的状态。

git checkout -- file命令中的--很重要，没有--，就变成了“切换到另一个分支”的命令.

>场景1：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令git checkout -- file。

>场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令git reset HEAD <file>，就回到了场景1，第二步按场景1操作。

>场景3：已经提交了不合适的修改到版本库时，想要撤销本次提交，参考版本回退一节，不过前提是没有推送到远程库。

## 删除文件
命令git rm用于删除一个文件。如果一个文件已经被提交到版本库，那么你永远不用担心误删，但是要小心，你只能恢复文件到最新版本，你会丢失最近一次提交后你修改的内容。

先添加一个新文件test.txt到Git并且提交，git add test.txt，git commit -m "add test.txt"，直接在文件管理器中把没用的文件删了：
```
$ rm test.txt    //工作区已经把该文件删除
//下一步分为两种情况：
//（1）如果删错了，因为版本库里还有呢，所以可以很轻松地把误删的文件恢复到最新版本：
$ git checkout -- test.txt    //注意：从来没有被添加到版本库就被删除的文件，是无法恢复的！
//（2）确实要从版本库中删除该文件，那就用命令git rm删掉，并且git commit
$ git rm test.txt
$ git commit -m "remove test.txt"
```
# 远程仓库
github：提供Git仓库托管服务的，所以，只要注册一个GitHub账号，就可以免费获得Git远程仓库。
本地Git仓库和GitHub仓库之间的传输是通过SSH加密，具体做法参考我的[csdn博客](https://mp.csdn.net/postedit/89412674)。

在本地创建了一个Git仓库后，又想在GitHub创建一个Git仓库，并且让这两个仓库进行远程同步，这样，GitHub上的仓库既可以作为备份，又可以让其他人通过该仓库来协作，操作步骤为：
```
git remote add origin https://github.com/swhaleDCC/learn.git
//添加后，远程库的名字就是origin，这是Git默认的叫法，也可以改成别的，但是origin这个名字一看就知道是远程库。下一步，就可以把本地库的所有内容推送到远程库上：
git push -u origin master
//用git push命令，实际上是把当前分支master推送到远程,由于远程库是空的，我们第一次推送master分支时，加上了-u参数，Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令
//从现在起，只要本地作了提交，就可以通过命令：
git push origin master
```
Git支持多种协议，包括https，但通过ssh支持的原生git协议速度最快。


# 分支管理
## 创建与合并分支
一开始的时候，master分支是一条线，Git用master指向最新的提交，再用HEAD指向master，就能确定当前分支，以及当前分支的提交点:
```
//创建dev分支，然后切换到dev分支:
$ git checkout -b dev
//加上-b参数表示创建并切换，相当于以下两条命令：
$ git branch dev
$ git checkout dev
//用git branch命令查看当前分支：
$ git branch
//然后，我们在dev分支上正常提交

//现在，dev分支的工作完成，我们就可以切换回master分支：
$ git checkout master

//现在，我们把dev分支的工作成果合并到master分支上：
$ git merge dev    //git merge命令用于合并指定分支到当前分支
//删除分支
$ git branch -d dev

//总结：
查看分支：git branch
创建分支：git branch <name>
切换分支：git checkout <name>或者git switch <name>
创建+切换分支：git checkout -b <name>或者git switch -c <name>
合并某分支到当前分支：git merge <name>
删除分支：git branch -d <name>
```
## 解决冲突
当Git无法自动合并分支时，就必须首先解决冲突。解决冲突后，再提交，合并完成。
git status可以告诉我们冲突的文件，Git用<<<<<<<，=======，>>>>>>>标记出不同分支的内容，我们修改后再提交，用带参数的git log可以看到分支的合并情况：
```
$ git log --graph --pretty=oneline --abbrev-commit
```
解决冲突就是把Git合并失败的文件手动编辑为我们希望的内容，再提交。
用git log --graph命令可以看到分支合并图。

## 分支管理策略
--no-ff方式的git merge:
通常，合并分支时，如果可能，Git会用Fast forward模式，但这种模式下，删除分支后，会丢掉分支信息。
如果要强制禁用Fast forward模式，Git就会在merge时生成一个新的commit，这样，从分支历史上就可以看出分支信息。
首先，master分支应该是非常稳定的，也就是仅用来发布新版本，平时不能在上面干活；
干活都在dev分支上，也就是说，dev分支是不稳定的，到某个时候，比如1.0版本发布时，再把dev分支合并到master上，在master分支发布1.0版本；
你和你的小伙伴们每个人都在dev分支上干活，每个人都有自己的分支，时不时地往dev分支上合并就可以了。
合并分支时，加上--no-ff参数就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，而fast forward合并就看不出来曾经做过合并。

## Bug分支

修复bug时，我们会通过创建新的bug分支进行修复，然后合并，最后删除；
当手头工作没有完成时，先把工作现场git stash一下，然后去修复bug，修复后，再git stash pop，回到工作现场；
在master分支上修复的bug，想要合并到当前dev分支，可以用git cherry-pick <commit>命令，把bug提交的修改“复制”到当前分支，避免重复劳动。

## Feature分支
开发一个新feature，最好新建一个分支；
如果要丢弃一个没有被合并过的分支，可以通过git branch -D <name>强行删除。
## 多人协作
小结：
1. 查看远程库信息，使用git remote -v；
2. 本地新建的分支如果不推送到远程，对其他人就是不可见的；
3. 从本地推送分支，使用git push origin branch-name，如果推送失败，先用git pull抓取远程的新提交；
4. 在本地创建和远程分支对应的分支，使用git checkout -b branch-name origin/branch-name，本地和远程分支的名称最好一致；
5. 建立本地分支和远程分支的关联，使用git branch --set-upstream branch-name origin/branch-name；
6. 从远程抓取分支，使用git pull，如果有冲突，要先处理冲突。
## Rebase
rebase操作可以把本地未push的分叉提交历史整理成直线；

rebase的目的是使得我们在查看历史提交的变化时更容易，因为分叉的提交需要三方对比。

# 标签管理
## 创建标签
```
$ git tag v1.0
$ git tag  //查看所有标签
$ git show v1.0   //查看标签信息
$ git tag -a v0.1 -m "version 0.1 released" 1094adb   //创建带有说明的标签，用-a指定标签名，-m指定说明文字
```
默认标签是打在最新提交的commit上的。有时候，如果忘了打标签，比如，现在已经是周五了，但应该在周一打的标签没有打，怎么办？
方法是找到历史提交的commit id，然后打上就可以了。
```
$ git log --pretty=oneline --abbrev-commit
$ git tag v0.9 f52c633
```
注意：标签总是和某个commit挂钩。如果这个commit既出现在master分支，又出现在dev分支，那么在这两个分支上都可以看到这个标签。

## 操作标签
```
$ git tag -d v0.1   //删除标签，因为创建的标签都只存储在本地，不会自动推送到远程。所以，打错的标签可以在本地安全删除
$ git push origin <tagname>   //推送某个标签到远程
$ git push origin --tags   //一次性推送全部尚未推送到远程的本地标签
//如果标签已经推送到远程，要删除远程标签就麻烦一点，先从本地删除：
$ git tag -d v0.9
//然后，从远程删除。删除命令也是push，但是格式如下：
$ git push origin :refs/tags/v0.9
```

# 码云
国内的Git托管服务——[码云](https://gitee.com/)

# 自定义Git