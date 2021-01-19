/*
 * @Descripttion:输出
 * @Author: zhangkai14@corp.netease.com
 * @Date: 2021-01-19 15:05:03
 * @LastEditors: zhangkai14@corp.netease.com
 * @LastEditTime: 2021-01-19 15:55:56
 */
const chalk = require('chalk');
const fse = require('fs-extra');
const path = require('path');

const output = (creator) => {
    return new Promise((resolve, reject) => {
        const setting = creator._setting;
        const { projectName } = setting;
        const cwd = process.cwd(); //  获取Node.js 进程的当前工作目录
        console.log(chalk.white(`当前工作目录是: ${cwd}`));

        // 新创建文件夹目录
        // api文档：https://nodejs.org/docs/latest/api/path.html#path_path_join_paths
        const projectPath = path.join(cwd, projectName);

        // 同步创建新目录
        try {
            fse.ensureDirSync(projectPath);
            console.log(chalk.green(`新项目目录创建成功: ${projectPath}`));
        } catch (e) {
            console.log(chalk.red(`项目目录创建失败: ${JSON.stringify(e)}`));
        }

        creator._mfs.commit(() => {
            resolve();
        });
    });
};

module.exports = output;
