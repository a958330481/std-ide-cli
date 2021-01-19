/*
 * @Descripttion: cli逻辑实现
 * @Author: zhangkai14@corp.netease.com
 * @Date: 2021-01-19 11:04:48
 * @LastEditors: zhangkai14@corp.netease.com
 * @LastEditTime: 2021-01-19 22:03:34
 */
const chalk = require('chalk');
const memFs = require('mem-fs');
const memFsEditor = require('mem-fs-editor');
const shelljs = require('shelljs');

const initCommand = require('./command');
const initSetting = require('./setting');
const downloadTemplate = require('./template');
const updatePackageJson = require('./updatePackageJson');
class Creator {
    constructor() {
        const store = memFs.create();
        this._mfs = memFsEditor.create(store);
        this._setting = {
            name: '',
            version: '1.0.0',
            description: '',
            authorName: '',
            authorEmail: '',
            license: '',
            repositoryType: '',
            repositoryUrl: ''
        };
    }
    create() {
        console.log(
            chalk.green.bold(`${chalk.blue('♫ ♫♬♪♫ ')}std-ide-cli${chalk.blue(' ♫ ♫♬♪♫ ')}`)
        );
        // 初始化指令
        initCommand();
        console.log(chalk.yellow(`Follow the prompts to complete the project configuration.`));

        // 初始化配置参数
        initSetting().then((setting) => {
            this._setting = {
                ...this._setting,
                ...setting
            };
            console.log(chalk.green('######## project setting ########'));
            console.log(this._setting);
            console.log(chalk.green('######## project setting ########'));

            // git 初始化
            if (shelljs.exec('git init').code !== 0) {
                shelljs.echo('Error: git init failed.');
                shell.exit(1);
            }

            // 创建目录并拉取远程仓库模板
            downloadTemplate({
                repository: this._setting.templateRemoteUrl,
                name: this._setting.name
            }).then(() => {
                // 更新package.json
                updatePackageJson(this._setting);

                // 添加远程分支地址
                if (this._setting.repositoryUrl) {
                    if (
                        shelljs.exec(`git remote add origin ${this._setting.repositoryUrl}`)
                            .code !== 0
                    ) {
                        shelljs.echo('Error: git remote add origin failed.');
                        shell.exit(1);
                    }
                }
            });
        });
    }
}

module.exports = Creator;
