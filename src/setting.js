/*
 * @Descripttion:init setting
 * @Author: kevininsight@126.com
 * @Date: 2021-01-20 20:21:31
 * @LastEditors: kevininsight@126.com
 * @LastEditTime: 2021-01-20 21:04:09
 */
const inquirer = require('inquirer');
const fse = require('fs-extra');

function initSetting() {
    const prompt = [
        {
            type: 'input',
            name: 'templateRemoteUrl',
            message: 'template remote url',
            default: 'https://github.com/reactide/reactide.git'
        },
        {
            type: 'input',
            name: 'name',
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
            name: 'author',
            message: 'author'
        },
        {
            type: 'list',
            name: 'license',
            message: 'license(default:MIT)',
            choices: ['MIT', 'BSD', 'ISC', 'other'],
            default: 'MIT'
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
