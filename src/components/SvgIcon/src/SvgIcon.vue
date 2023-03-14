<template>
  <svg class="svg-icon" :style="svgStyle" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>
<!-- <script lang="ts">
// 如果使用 v-bind="$attrs"，需要设置 xinheritAttrs: false
export default defineComponent({
  inheritAttrs: false
})
</script> -->
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  icon: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: ''
  },
  className: {
    type: String,
    default: ''
  },
  width: {
    type: Number
  },
  height: {
    type: Number
  },
  size: {
    type: Number
  }
})

// https://www.iconfont.cn 图标库需使用前缀 icon- 才能匹配
const iconName = computed(() => `#icon-${props.icon.replace('icon-', '')}`)
const svgStyle = computed(() => {
  let style = ''
  if (props.color) style += `color: ${props.color};`
  if (props.size) return (style += `width: ${props.size}px;height: ${props.size}px;`)
  if (props.width) style += `width: ${props.width}px;`
  if (props.height) style += `height: ${props.height}px;`
  return style
})
</script>

<style scoped lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  flex-shrink: 0;
}
</style>
