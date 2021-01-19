/*
 * @Descripttion:
 * @Author: zhangkai14@corp.netease.com
 * @Date: 2021-01-14 19:22:51
 * @LastEditors: zhangkai14@corp.netease.com
 * @LastEditTime: 2021-01-14 19:23:19
 */
module.exports = {
    plugins: ['stylelint-prettier'],
    extends: ['stylelint-config-standard', 'stylelint-config-rational-order'],
    ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
    rules: {
        'prettier/prettier': true,
        indentation: 4,
        'no-descending-specificity': null,
        'font-family-no-missing-generic-family-keyword': null,
        'at-rule-no-unknown': [
            true,
            {
                ignoreAtRules: ['function', 'if', 'each', 'include', 'mixin', 'for']
            }
        ]
    }
};
