/*
 * @Descripttion:stylelint rule
 * @Author: kevininsight@126.com
 * @Date: 2021-01-20 20:21:31
 * @LastEditors: kevininsight@126.com
 * @LastEditTime: 2021-01-20 20:35:37
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
