/*
 * @Descripttion: 指令
 * @Author: zhangkai14@corp.netease.com
 * @Date: 2021-01-19 11:10:34
 * @LastEditors: zhangkai14@corp.netease.com
 * @LastEditTime: 2021-01-19 15:08:30
 */

const commander = require('commander');
const chalk = require('chalk');

const packageJson = require('../package.json');

const initCommand = () => {
    commander
        .version(packageJson.version)
        .on('--help', () => {
            console.log(chalk.green('run std-ide-cli and edit the setting.'));
        })
        .parse(process.argv);
};

module.exports = initCommand;
