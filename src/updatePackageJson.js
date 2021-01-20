/*
 * @Descripttion: 更新package.json文件
 * @Author: zhangkai14@corp.netease.com
 * @Date: 2021-01-19 17:18:17
 * @LastEditors: zhangkai14@corp.netease.com
 * @LastEditTime: 2021-01-20 10:00:04
 */

const fse = require('fs-extra');
const chalk = require('chalk');
const { oraFactory } = require('./utils');
const pwd = process.cwd();

const updatePackageJson = (setting) => {
    const spinner = oraFactory('正在更新package.json...');
    console.log('');
    try {
        // 读取当前模板的package.json
        const packageObj = fse.readJsonSync(`${pwd}/${setting.name}/package.json`);
        const newPackageJson = {
            ...packageObj,
            ...setting
        };
        console.log(chalk.green('######## new package.json ########'));
        console.log(newPackageJson);
        console.log(chalk.green('######## new package.json ########'));
        fse.writeJsonSync(`${pwd}/${setting.name}/package.json`, newPackageJson, { spaces: 2 });
        spinner.succeed('package.json 更新成功');
    } catch (err) {
        spinner.fail(`package.json 更新失败:${JSON.stringify(err)}`);
    }
};

module.exports = updatePackageJson;
