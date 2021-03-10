# :rocket:std-ide-cli

> 一键快速创建项目、并根据指定模板对项目进行初始化

![std.gif](./std-demo-effect.gif)

## :boat:主要功能

[+] 全局安装 cli 后，可在任意目录通过`std or std-ide-cli ` 指令创建项目;

[+] 通过使用`inquirer`、`chalk`、`ora`等工具，让项目创建过程拥有美观的命令行界面及友好的交互

[+] 拉取远程模板`ide`代码到指定目录，并把用户自定义参数更新到`packge.json`

[+] 如果创建的时候有指定`repositoryUrl`,创建完成后会自动执行`git remote add origin ${repositoryUrl}`

## :hammer:使用

> npm 地址 : https://www.npmjs.com/package/std-ide-cli

> 全局安装 `std-ide-cli`

```bash
npm i std-ide-cli -g
```

> 创建项目

-   输入以下指令，即可启动创建流程

```bash
std
```

或

```bash
std-ide-cli
```

如果之前已经安装过，可通过以下命令强制重新安装:

```bash
npm install @cc/std-ide-cli -g --force
```

## :bulb:参数说明

> 项目初始化构建参数

-   `templateRemoteUrl`

    name: 模板远程仓库地址

    默认: `ssh://git@git-xxxx:32200/weblib/xxxx.git`

    支持输入更新其他模板地址

    非必填

-   `name`

    name: 项目名称

    `必填`

-   `version`

    name: 版本号

    默认:`1.0.0`

    非必填

-   `description`

    name: 项目描述

    非必填

-   `author`

    name: 作者信息

    非必填

-   `license`

    name： 软件许可协议

    默认值: `ISC`

    非必填

-   `repositoryType`

    name: 代码提交工具类型

    默认值：`git`

    非必填

-   `repositoryUrl`

    name: 新项目远程仓库地址

    非必填

    > 如果设置了 repositoryUrl,则`cli` 会在项目创建后自动执行 <br/> `git remote add origin ${repositoryUrl} `

## :question:常见问题

-   ### 系统中禁止执行脚本解决方法

如果安装了 cli 之后，执行`std`的时候报类似如下错误：

```info
无法加载文件 ******.ps1，因为在此系统中禁止执行脚本。有关详细信息，请参阅 "get-help about_signing"。
所在位置 行:1 字符: 17
+ E:\Test\test.ps1 <<<<
    + CategoryInfo          : NotSpecified: (:) [], PSSecurityException
    + FullyQualifiedErrorId : RuntimeException
```

这是因为:

当前 Windows PowerShell 执行策略很可能是 Restricted（默认设置）

查看当前策略：

```bash
 get-executionpolicy
```

怎么解决？执行如下指令

```
   set-executionpolicy remotesigned
```

-   ### templateRemoteUrl 使用的`ssh`格式,创建的时候报如下错误

```bash
git@git.xxxx.com: Permission denied (publickey).
fatal: Could not read from remote repository.
```

可通过以下方式处理：

1、参考[git clone 记住密码](https://g.126.fm/02DWtg0)，或者生成私钥的时候不要设置密码，参考[重置 SSH 私钥密码](https://woodenrobot.me/2018/01/30/取消-SSH-私钥密码/)

2、templateRemoteUrl 改用 http url

## :computer:开发&调试

-   在`package.json` 中添加`bin`字段；它可以用来存放一个可执行的文件，配置如下：

```json
"bin":{
    "std-ide":"bin/cli",
    "std-dev" // 方便调试可自定义一个bin，如`std-dev`;区分线上和本地环境
}
```

-   执行 `npm link`

    这行命令的作用：它会把`std-ide`这个字段复制到`npm`的全局模块安装文件夹`node_modules`内,
    并创建符合链接(`symbolic link`, 软链接)，也就是将`app`的路径加入环境变量`PATH`

    如果当前`bin`已经存在，可通过`npm link --force`强制更新

## :blue_book: 参考：

[1] https://aotu.io/notes/2016/08/09/command-line-development/index.html

[2] https://cloud.tencent.com/developer/article/1341983

[3] https://github.com/tj/commander.js/blob/master/Readme_zh-CN.md

[4] https://www.cnblogs.com/cangqinglang/p/10642891.html

[5] https://www.cnblogs.com/cangqinglang/p/10642891.html

[6] https://juejin.cn/post/6844903607855235079
