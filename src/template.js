/*
 * @Descripttion:Get remote warehouse template
 * @Author: kevininsight@126.com
 * @Date: 2021-01-20 20:21:31
 * @LastEditors: kevininsight@126.com
 * @LastEditTime: 2021-01-20 21:06:00
 */
const download = require('download-git-repo');
const { oraFactory } = require('./utils');

/**
 * pull remote template
 * @param {*} repository remote template repository
 */
const downloadTemplate = ({ repository, name }) => {
    if (!repository) {
        console.log('');
        console.log(chalk.red('Lack of valid project template address, creation failed'));
        return;
    }
    const spinner = oraFactory('Getting templates from remote warehouse...');

    return new Promise((resolve, reject) => {
        download(`direct:${repository}`, name, { clone: true }, function (err) {
            if (!err) {
                spinner.succeed('The template is successfully obtained');
                resolve();
            } else {
                spinner.fail(`Failed to get template:${JSON.stringify(err)}`);
                reject();
            }
        });
    });
};

module.exports = downloadTemplate;
