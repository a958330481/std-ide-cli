/*
 * @Descripttion: cli逻辑实现
 * @Author: zhangkai14@corp.netease.com
 * @Date: 2021-01-19 11:04:48
 * @LastEditors: zhangkai14@corp.netease.com
 * @LastEditTime: 2021-01-20 10:28:17
 */
const chalk = require('chalk');
const memFs = require('mem-fs');
const memFsEditor = require('mem-fs-editor');
const shelljs = require('shelljs');
const fse = require('fs-extra');
const pwd = process.cwd();

const initCommand = require('./command');
const initSetting = require('./setting');
const downloadTemplate = require('./template');
const updatePackageJson = require('./updatePackageJson');
const { gitInit } = require('./utils');
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
            console.log('');

            // git 初始化
            gitInit('当前工作目录');

            // 创建目录并拉取远程仓库模板
            downloadTemplate({
                repository: this._setting.templateRemoteUrl,
                name: this._setting.name
            }).then(() => {
                // 更新package.json
                updatePackageJson(this._setting);

                // 添加远程分支地址
                if (this._setting.repositoryUrl) {
                    fse.removeSync(`${pwd}/.git`);
                    shelljs.cd(this._setting.name);
                    // git 初始化
                    gitInit('新建项目工作目录');
                    if (
                        shelljs.exec(`git remote add origin ${this._setting.repositoryUrl}`)
                            .code !== 0
                    ) {
                        shelljs.echo('Error: git remote add origin failed.');
                        shell.exit(1);
                    }
                    console.log('');
                    console.log(
                        chalk.green(`git remote add origin ${this._setting.repositoryUrl} 成功`)
                    );
                }

                console.log('');
                console.log('');
                console.log(
                    chalk.green.bold(
                        `${chalk.blue('♫ ♫♬♪♫ ')}恭喜，项目已经创建成功${chalk.blue(' ♫ ♫♬♪♫ ')}`
                    )
                );
                console.log('');
                console.log(chalk.white('We suggest that you begin by typing:'));
                console.log('');
                console.log(chalk.cyan(`cd ${this._setting.name}`));
                console.log(chalk.cyan(`yarn`));
                console.log('');
                console.log('');
            });
        });
    }
}

module.exports = Creator;
