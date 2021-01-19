/*
 * @Descripttion: 更新package.json文件
 * @Author: zhangkai14@corp.netease.com
 * @Date: 2021-01-19 17:18:17
 * @LastEditors: zhangkai14@corp.netease.com
 * @LastEditTime: 2021-01-19 18:01:39
 */

const fse = require('fs-extra');
const ora = require('ora');
const chalk = require('chalk');
const pwd = process.cwd();

const updatePackageJson = (setting) => {
    const spinner = ora('正在更新package.json...').start();
    console.log(chalk.green('$$$$$$$$$$ current setting $$$$$$$$$$$$'));
    console.log(setting);
    console.log(chalk.green('$$$$$$$$$$ current setting $$$$$$$$$$$$'));
    // 读取当前模板的package.json
    console.log(`${pwd}/package.json`);

    fse.readJsonSync(`${pwd}/package.json`, (err, data) => {
        if (err) {
            return console.log(chalk.red(`读取当前模板的package.json失败:${JSON.stringify(err)}`));
        }

        const currentPackageJson = JSON.parse(data.toString());
        console.log(chalk.green('$$$$$$$$$$ currentPackageJson $$$$$$$$$$$$'));
        console.log(currentPackageJson);
        console.log(chalk.green('$$$$$$$$$$ currentPackageJson $$$$$$$$$$$$'));
        const newPackageJson = {
            ...currentPackageJson,
            ...setting
        };
        const newPackageJsonStringify = JSON.stringify(newPackageJson, null, 4);

        //写入文件
        fse.writeJsonSync(`${pwd}/package.json`, newPackageJsonStringify, (err) => {
            if (!err) {
                spinner.succeed();
                console.log('success!');
            } else {
                spinner.fail();
                console.error(err);
            }
        });
    });
};

module.exports = updatePackageJson;
