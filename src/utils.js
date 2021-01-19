/*
 * @Descripttion:工具函数
 * @Author: zhangkai14@corp.netease.com
 * @Date: 2021-01-19 19:32:01
 * @LastEditors: zhangkai14@corp.netease.com
 * @LastEditTime: 2021-01-19 19:34:26
 */
const ora = require('ora');

const oraFactory = (tips) => {
    const spinner = ora(tips).start();

    // windows support dots hack
    spinner._spinner = {
        interval: 80,
        frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
    };

    return spinner;
};

module.exports = {
    oraFactory
};
