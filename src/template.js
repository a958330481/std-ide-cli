/*
 * @Descripttion: 获取远程仓库模板
 * @Author: zhangkai14@corp.netease.com
 * @Date: 2021-01-19 16:29:06
 * @LastEditors: zhangkai14@corp.netease.com
 * @LastEditTime: 2021-01-19 16:56:14
 */

const download = require('download-git-repo');
const ora = require('ora');
const chalk = require('chalk');

/**
 * 获取远程仓库模板
 * @param {*} repository 远程仓库地址
 */
const downloadTemplate = (repository) => {
    const spinner = ora('正在从远程仓库获取模板...').start();

    // windows support dots hack
    spinner._spinner = {
        interval: 80,
        frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
    };

    download(`direct:${repository}`, 'test/tmp', { clone: true }, function (err) {
        spinner.stop();
        if (!err) {
            // 模板获取成功
            console.log(chalk.green('模板获取成功'));
        } else {
            // 模板获取失败
            console.log(chalk.red('模板获取失败'));
        }
    });
};

module.exports = downloadTemplate;
