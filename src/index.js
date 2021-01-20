/*
 * @Descripttion: cli logic
 * @Author: kevininsight@126.com
 * @Date: 2021-01-20 20:21:31
 * @LastEditors: kevininsight@126.com
 * @LastEditTime: 2021-01-20 21:03:57
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
            author: '',
            license: '',
            repositoryType: '',
            repositoryUrl: '',
            templateRemoteUrl: ''
        };
    }
    create() {
        console.log(
            chalk.green.bold(`${chalk.blue('♫ ♫♬♪♫ ')}std-ide-cli${chalk.blue(' ♫ ♫♬♪♫ ')}`)
        );
        // init command
        initCommand();
        console.log(chalk.yellow(`Follow the prompts to complete the project configuration.`));

        // init setting
        initSetting().then((setting) => {
            this._setting = {
                ...this._setting,
                ...setting
            };
            console.log(chalk.green('######## project setting ########'));
            console.log(this._setting);
            console.log(chalk.green('######## project setting ########'));
            console.log('');

            // git init
            gitInit('current workspace');

            // create dir and pull remote template
            downloadTemplate({
                repository: this._setting.templateRemoteUrl,
                name: this._setting.name
            }).then(() => {
                // update package.json
                updatePackageJson(this._setting);

                // add origin
                if (this._setting.repositoryUrl) {
                    fse.removeSync(`${pwd}/.git`);
                    shelljs.cd(this._setting.name);
                    // git init
                    gitInit('new work dir');
                    if (
                        shelljs.exec(`git remote add origin ${this._setting.repositoryUrl}`)
                            .code !== 0
                    ) {
                        shelljs.echo('Error: git remote add origin failed.');
                        shell.exit(1);
                    }
                    console.log('');
                    console.log(
                        chalk.green(`git remote add origin ${this._setting.repositoryUrl} success`)
                    );
                }

                console.log('');
                console.log('');
                console.log(
                    chalk.green.bold(
                        `${chalk.blue(
                            '♫ ♫♬♪♫ '
                        )}Congratulations, the new project has been created successfully! ${chalk.blue(
                            ' ♫ ♫♬♪♫ '
                        )}`
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
