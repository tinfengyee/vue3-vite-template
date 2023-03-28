// 开发环境完整引入element-plus

import type { Plugin } from 'vite'

export function fullImportPlugin() {
  return <Plugin>{
    name: 'dev-auto-import-element-plus',
    apply: 'serve',
    transform(code, id) {
      if (/src\/main.ts$/.test(id)) {
        // console.log(code)
        const name = 'ElementPlus'

        // 引入 ElementPlus 和 样式
        const prepend = `import ${name} from 'element-plus';\nimport 'element-plus/dist/index.css';\n`

        // 通过匹配字符串来使用 ElementPlus （此处替换规则根据 main.ts 的情况而定）
        // 相当于将字符串 `app.use(router).mount('#app')` 替换成 `app.use(router).use(ElementPlus).mount('#app')`
        code = code.replace('.mount(', ($1) => `.use(${name})` + $1)
        return prepend + code
      }
    }
  }
}
