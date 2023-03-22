## usage

三种方式使用图标

```tsx
//1. vite-svg-loader 可以直接引入 svg 当成组件
import moduleName from '@/assets/svg/i18n.svg?component'

//2. 使用 icon-font
import SvgIcon from '@/components/SvgIcon'
<SvgIcon icon="i18n" color="red" width="20px" height="20px" />

//3. iconfy ，可以从https://icones.js.org/collection/ep 找到需要的图标
<i-ep-circle-check-filled />

```