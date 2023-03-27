## 三种方式使用图标

使用方式，已注册为全局组件

```tsx
// 1. vite-svg-loader 可以直接引入 svg 当成组件
import moduleName from '@/assets/svg/i18n.svg?component'

<el-icon class="svg-icon" color="pink" :size="20">
  <I18nIcon />
</el-icon>

// 2
// 2.1 使用 icon-font(Symbol)，内置 test-left/right/up/down 4个图标。
// 2.2 或者 本地 assets/svg 图标。
import SvgIcon from '@/components/svg-icon'
<SvgIcon icon="logo" color="pink" size="20" />

// 3. iconfy ，可以从https://icones.js.org/collection/ep 找到需要的图标
// 如 element-plus 图标包需要先 download 对应的 json 文件 https://www.npmjs.com/package/@iconify-json/ep，然后就可以直接引入
<el-icon class="svg-icon" color="pink" :size="20">
  <i-ep-circle-check-filled />
</el-icon>

```