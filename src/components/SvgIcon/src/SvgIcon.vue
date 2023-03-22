<template>
  <i class="svg-icon" :style="style" v-bind="$attrs">
    <svg aria-hidden="true">
      <use :xlink:href="iconName" />
    </svg>
  </i>
</template>
<!-- <script lang="ts">
// 如果使用 v-bind="$attrs"，需要设置 xinheritAttrs: false
export default defineComponent({
  inheritAttrs: false
})
</script> -->
<script setup lang="ts">
import { computed } from 'vue'
import { isUnDef } from '@/utils/is'

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: ''
  },
  size: {
    type: [String, Number]
  }
})

// https://www.iconfont.cn 图标库需使用前缀 icon- 才能匹配
const iconName = computed(() => `#icon-${props.icon.replace('icon-', '')}`)
const style = computed(() => {
  const { size, color } = props
  if (!size && !color) return {}
  return {
    fontSize: isUnDef(size) ? undefined : size + 'px',
    '--color': color
  }
})
// const svgStyle = computed(() => {
//   let style = ''
//   if (props.color) style += `--color: ${props.color};`
//   // if (props.color) style += `color: ${props.color};`
//   if (props.size) return (style += `width: ${props.size}px;height: ${props.size}px;`)
//   if (props.width) style += `width: ${props.width}px;`
//   if (props.height) style += `height: ${props.height}px;`
//   return style
// })
</script>

<style scoped lang="scss">
// .svg-icon {
//   width: 1em;
//   height: 1em;
//   vertical-align: -0.15em;
//   fill: currentColor;
//   overflow: hidden;
//   flex-shrink: 0;
// }
.svg-icon {
  --color: inherit;
  height: 1em;
  width: 1em;
  line-height: 1em;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  position: relative;
  fill: currentColor;
  color: var(--color);
  font-size: inherit;
  svg {
    height: 1em;
    width: 1em;
  }
}
</style>
