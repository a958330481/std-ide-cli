/*
 * @Descripttion:code login
 * @Author: kevininsight@126.com
 * @Date: 2021-01-20 20:21:31
 * @LastEditors: kevininsight@126.com
 * @LastEditTime: 2021-01-20 21:00:54
 */
const commander = require('commander');
const chalk = require('chalk');

const packageJson = require('../package.json');

const initCommand = () => {
    commander
        .version(packageJson.version)
        .on('--help', () => {
            console.log(chalk.green('run std or std-ide-cli and edit the setting.'));
        })
        .parse(process.argv);
};

module.exports = initCommand;
