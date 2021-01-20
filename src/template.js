/*
 * @Descripttion:获取远程仓库模板
 * @Author: kevininsight@126.com
 * @Date: 2021-01-20 20:21:31
 * @LastEditors: kevininsight@126.com
 * @LastEditTime: 2021-01-20 20:31:39
 */
const download = require('download-git-repo');
const { oraFactory } = require('./utils');

/**
 * 获取远程仓库模板
 * @param {*} repository 远程仓库地址
 */
const downloadTemplate = ({ repository, name }) => {
    const spinner = oraFactory('正在从远程仓库获取模板...');

    return new Promise((resolve, reject) => {
        download(`direct:${repository}`, name, { clone: true }, function (err) {
            if (!err) {
                // 模板获取成功
                spinner.succeed('模板获取成功');
                resolve();
            } else {
                // 模板获取失败
                spinner.fail(`模板获取失败:${JSON.stringify(err)}`);
                reject();
            }
        });
    });
};

module.exports = downloadTemplate;
