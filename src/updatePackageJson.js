/*
 * @Descripttion: update package.json file
 * @Author: kevininsight@126.com
 * @Date: 2021-01-20 20:21:31
 * @LastEditors: kevininsight@126.com
 * @LastEditTime: 2021-01-22 20:19:48
 */
const fse = require('fs-extra');
const chalk = require('chalk');
const { oraFactory, log } = require('./utils');
const pwd = process.cwd();

const updatePackageJson = (setting) => {
    const spinner = oraFactory('updating package.json...');
    const { name, description, version, author, license, repositoryType, repositoryUrl, template } =
        setting;
    log('');
    try {
        // read package.json content
        const packageObj = fse.readJsonSync(`${pwd}/${name}/package.json`);
        const newPackageJson = {
            ...packageObj,
            name,
            description,
            version,
            author,
            license,
            repository: {
                type: repositoryType,
                url: repositoryUrl
            },
            template: {
                type: 'git',
                url: template
            }
        };
        log('');
        log('');
        log(chalk.green('######## new package.json ########'));
        log(newPackageJson);
        log(chalk.green('######## new package.json ########'));
        fse.writeJsonSync(`${pwd}/${name}/package.json`, newPackageJson, { spaces: 2 });
        log('');
        spinner.succeed('package.json update success');
    } catch (err) {
        log('');
        spinner.fail(`package.json update failure:${JSON.stringify(err)}`);
    }
};

module.exports = updatePackageJson;
