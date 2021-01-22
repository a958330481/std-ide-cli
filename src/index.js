/*
 * @Descripttion: cli logic
 * @Author: kevininsight@126.com
 * @Date: 2021-01-20 20:21:31
 * @LastEditors: kevininsight@126.com
 * @LastEditTime: 2021-01-22 20:35:47
 */
const chalk = require('chalk');
const memFs = require('mem-fs');
const memFsEditor = require('mem-fs-editor');
const fse = require('fs-extra');
const pwd = process.cwd();

const initCMD = require('./command');
const initSetting = require('./setting');
const downloadTemplate = require('./template');
const updatePackageJson = require('./updatePackageJson');
const { gitInit, shell, log } = require('./utils');
class Task {
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
            templateRepositoryUrl: ''
        };
    }
    create() {
        log(chalk.green.bold(`${chalk.blue('♫ ♫♬♪♫ ')}std-ide-cli${chalk.blue(' ♫ ♫♬♪♫ ')}`));
        // init command
        initCMD();
        log(chalk.yellow(`Follow the prompts to complete the project configuration.`));

        // init setting
        initSetting().then((setting) => {
            this._setting = {
                ...this._setting,
                ...setting
            };
            log('');
            log(chalk.green('######## project setting ########'));
            log(this._setting);
            log(chalk.green('######## project setting ########'));
            log('');

            // git init
            gitInit('current workspace');

            // create dir and pull remote template
            downloadTemplate({
                repository: this._setting.templateRepositoryUrl,
                name: this._setting.name
            }).then(() => {
                // update package.json
                updatePackageJson(this._setting);

                // add origin
                if (this._setting.repositoryUrl) {
                    fse.removeSync(`${pwd}/.git`);
                    shell.cd(this._setting.name);
                    // git init
                    gitInit('new work dir');
                    if (
                        shell.exec(`git remote add origin ${this._setting.repositoryUrl}`).code !==
                        0
                    ) {
                        shell.echo('Error: git remote add origin failed.');
                        shell.exit(1);
                    }
                    log('');
                    log(
                        chalk.green(`git remote add origin ${this._setting.repositoryUrl} success`)
                    );
                }

                log('');
                log('');
                log(
                    chalk.green.bold(
                        `${chalk.blue(
                            '♫ ♫♬♪♫ '
                        )}Congratulations, the new project has been created successfully! ${chalk.blue(
                            ' ♫ ♫♬♪♫ '
                        )}`
                    )
                );
                log('');
                log(chalk.white('We suggest that you begin by typing:'));
                log('');
                log(chalk.magenta(`cd ${this._setting.name}`));
                log(chalk.magenta(`yarn`));
                log('');
                log('');
            });
        });
    }
}

module.exports = Task;
