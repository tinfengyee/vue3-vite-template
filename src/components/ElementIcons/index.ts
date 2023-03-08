import type { App } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
// 暂时使用 el 的 icon，后续建议定义自己的 icon 组件。https://element-plus.org/zh-CN/component/icon.html
export function setupIcons(app: App<Element>) {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
