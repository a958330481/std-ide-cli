## standard-ide

-   技术选型 `commander + inquirer + chalk`

## 步骤

-   在`package.json` 中添加`bin`字段；它可以用来存放一个可执行的文件，配置如下：

```json
"bin":{
    "std-ide":"command.js"
}
```

-   执行 `npm link`
    这行命令的作用：它会把`std-ide`这个字段复制到`npm`的全局模块安装文件夹`node_modules`内,
    并创建符合链接(`symbolic link`, 软链接)，也就是将`app`的路径加入环境变量`PATH`

-   如果你发布了脚手架，其他用户就可以通过使用命令
    ```bash
    npm install -g std-ide
    ```
    全局使用 std-ide 创建项目
    <br/><br/>
-   在主入口文件的最上方添加代码

```shell
#! /usr/bin/env node
```

表明这是一个可执行的应用

示例:

```js
#! /usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const chalk = require('chalk');

program
    .command('module') // 定义命令行指令,调用的时候后跟一个name，用空格分开, 如：std-ide module
    .alias('m') // 命令简写 std-ide-m 与上述的 std-ide module 等效
    .description('创建新的模块') // 描述，会在help里面展示
    .option('-a, --name [moduleName]', '模块名称')
    // 定义参数。
    // 接受4个参数：
    // 在第一个参数中，它可输入短名字 -a和长名字–app ,使用 | 或者,分隔，在命令行里使用时，这两个是等价的，区别是后者可以在程序里通过回调获取到；
    // 第二个为描述, 会在 help 信息里展示出来；
    // 第三个参数为回调函数，他接收的参数为一个string，有时候我们需要一个命令行创建多个模块，就需要一个回调来处理；
    // 第四个参数为默认值
    .action((option) => {
        // 注册一个callback函数，注意：目前回调不支持let声明
        console.log('Hello World');
    });

program.parse(process.argv); // parse 解析命令行
```

-   生成帮助信息
    ```bash
    std-ide m -h  # 生成指令m对应的帮助信息
    ```

## inquirer

> 在开发的过程中，我们需要频繁的跟命令行进行交互，借助 inquirer 这个模块就能轻松实现，它提供了用户界面和查询会话流程
> 官方地址：https://github.com/SBoudrias/Inquirer.js#readme

-   主要功能

    -   input - 输入
    -   validate - 验证
    -   list - 列表选项
    -   confirm - 提示
    -   checkbox - 复选框

-   语法举例

```js
const inquirer = require('inquirer');

inquirer
    .prompt([
        /* Pass your questions in here */
    ])
    .then(function (answers) {
        // Use user feedback for... whatever!!
    });
```

## chalk

> 主要用来美化命令行
> 官网：https://github.com/chalk/chalk#readme

```js
console.log(chalk.red(JSON.stringify(answers))); // 打印红色字体的内容
console.log(chalk.green(JSON.stringify(answers))); // 打印绿色字体的内容
console.log(chalk.white.bgGreen(JSON.stringify(answers))); //打印绿色背景、白色字体的内容
```

## 对用户文件进行读写操作

-   模板文件替换，要用到工具`mem-fs`和`mem-fs-editor`。
-   文件操作，要用到工具`shelljs`
-   fs-extra 模拟 linux 命令操作文件
    > 官方文档：https://github.com/jprichardson/node-fs-extra
    > 中文文档参考:https://juejin.cn/post/6844903641594216455
-   download-git-repo 获取远程仓库代码
-   ora 优雅的终端加载提示

## TODO

[-] 指令精确执行（现在如`std-ide-cli help` 也会进入初始化流程）

## 参考：

[跟着老司机玩转 Node 命令行]https://aotu.io/notes/2016/08/09/command-line-development/index.html

[简单案例]https://cloud.tencent.com/developer/article/1341983

[commander]https://github.com/tj/commander.js/blob/master/Readme_zh-CN.md

[shell]https://www.cnblogs.com/cangqinglang/p/10642891.html

[完整流程]https://juejin.cn/post/6844903910793019399

## 类似项目

-   https://github.com/wall-wxk/npm-package-cli
-   https://juejin.cn/post/6844903607855235079
