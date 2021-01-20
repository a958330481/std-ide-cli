/*
 * @Descripttion:工具函数
 * @Author: zhangkai14@corp.netease.com
 * @Date: 2021-01-19 19:32:01
 * @LastEditors: zhangkai14@corp.netease.com
 * @LastEditTime: 2021-01-20 10:04:13
 */
const ora = require('ora');
const shelljs = require('shelljs');

const oraFactory = (tips) => {
    const spinner = ora(tips).start();

    // windows support dots hack
    spinner._spinner = {
        interval: 80,
        frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
    };

    return spinner;
};

const gitInit = (description) => {
    if (shelljs.exec('git init').code !== 0) {
        shelljs.echo(`Error: ${description} git init failed.`);
        shell.exit(1);
    }
};

module.exports = {
    oraFactory,
    gitInit
};
