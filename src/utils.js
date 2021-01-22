/*
 * @Descripttion: utility function
 * @Author: kevininsight@126.com
 * @Date: 2021-01-20 20:21:31
 * @LastEditors: kevininsight@126.com
 * @LastEditTime: 2021-01-22 20:16:42
 */
const ora = require('ora');
const shell = require('shelljs');

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
    if (shell.exec('git init').code !== 0) {
        shell.echo(`Error: ${description} git init failed.`);
        shell.exit(1);
    }
};

const log = console.log;

module.exports = {
    oraFactory,
    gitInit,
    shell,
    log
};
