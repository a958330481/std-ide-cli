/*
 * @Descripttion:工具函数
 * @Author: kevininsight@126.com
 * @Date: 2021-01-20 20:21:31
 * @LastEditors: kevininsight@126.com
 * @LastEditTime: 2021-01-20 20:32:04
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
