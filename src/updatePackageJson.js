/*
 * @Descripttion: update package.json file
 * @Author: kevininsight@126.com
 * @Date: 2021-01-20 20:21:31
 * @LastEditors: kevininsight@126.com
 * @LastEditTime: 2021-01-20 21:00:26
 */
const fse = require('fs-extra');
const chalk = require('chalk');
const { oraFactory } = require('./utils');
const pwd = process.cwd();

const updatePackageJson = (setting) => {
    const spinner = oraFactory('updating package.json...');
    console.log('');
    try {
        // read package.json data
        const packageObj = fse.readJsonSync(`${pwd}/${setting.name}/package.json`);
        const newPackageJson = {
            ...packageObj,
            ...setting
        };
        console.log(chalk.green('######## new package.json ########'));
        console.log(newPackageJson);
        console.log(chalk.green('######## new package.json ########'));
        fse.writeJsonSync(`${pwd}/${setting.name}/package.json`, newPackageJson, { spaces: 2 });
        console.log('');
        spinner.succeed('package.json update success');
    } catch (err) {
        console.log('');
        spinner.fail(`package.json update failure:${JSON.stringify(err)}`);
    }
};

module.exports = updatePackageJson;
