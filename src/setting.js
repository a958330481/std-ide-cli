/*
 * @Descripttion: 初始化配置项
 * @Author: zhangkai14@corp.netease.com
 * @Date: 2021-01-19 14:13:47
 * @LastEditors: zhangkai14@corp.netease.com
 * @LastEditTime: 2021-01-19 14:53:24
 */
const inquirer = require('inquirer');
const fse = require('fs-extra');

function initSetting() {
    const prompt = [
        {
            type: 'input',
            name: 'projectName',
            message: 'project name',
            validate(input) {
                if (!input) {
                    return 'project name is required.';
                }
                if (fse.existsSync(input)) {
                    return 'project name of folder is exist.';
                }
                return true;
            }
        },
        {
            type: 'input',
            name: 'version',
            message: 'version',
            default: '1.0.0'
        },
        {
            type: 'input',
            name: 'description',
            message: 'description'
        },
        {
            type: 'input',
            name: 'authorName',
            message: 'author name'
        },
        {
            type: 'input',
            name: 'authorEmail',
            message: 'author email'
        },
        {
            type: 'list',
            name: 'license',
            message: 'license(default:ISC)',
            choices: ['ISC', 'BSD', 'MIT'],
            default: 'ISC'
        },
        {
            type: 'input',
            name: 'repositoryType',
            message: 'repository type',
            default: 'git'
        },
        {
            type: 'input',
            name: 'repositoryUrl',
            message: 'repository url'
        }
    ];

    return inquirer.prompt(prompt);
}

module.exports = initSetting;
