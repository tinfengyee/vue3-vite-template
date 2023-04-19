/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')
// @ts-check
const { defineConfig } = require('eslint-define-config')

module.exports = defineConfig({
  root: true,
  extends: [
    'plugin:vue/vue3-essential', // eslint-plugin-vue 规则 [https://eslint.vuejs.org/rules/]
    'eslint:recommended', // eslint 规则 [https://cn.eslint.org/docs/rules/]
    '@vue/eslint-config-typescript', // typescript-eslint 规则 [https://typescript-eslint.io/rules/]
    '@vue/eslint-config-prettier/skip-formatting' // 解决 eslint - prettier 冲突
    // './.eslintrc-auto-import.json' // 可以加入这个配合 AutoImport 自动按需导入
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  ignorePatterns: ['src/assets/iconfont/iconfont.js'],
  rules: {
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }
    ],
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }
    ],
    '@typescript-eslint/ban-ts-comment': 'off' // 禁止@ts-<directive>注释或要求指令后的描述。
  }
})
