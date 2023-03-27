<template>
  <i class="svg-icon" :style="style" v-bind="$attrs">
    <svg aria-hidden="true">
      <use :xlink:href="iconName" />
    </svg>
  </i>
</template>
<script lang="ts">
// 如果使用 v-bind="$attrs"，需要设置 xinheritAttrs: false,否则会绑定重复 class
export default defineComponent({
  inheritAttrs: false
})
</script>
<script setup lang="ts">
import { computed, defineComponent } from 'vue'
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
const iconName = computed(() => `#icon-${props.icon.replace(/^icon-/, '')}`)
console.log(iconName.value)

const style = computed(() => {
  const { size, color } = props
  if (!size && !color) return {}
  return {
    fontSize: isUnDef(size) ? undefined : size + 'px',
    '--color': color
  }
})
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
  // height: 100%;
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
  // vertical-align: -0.15em; // 解决图标会偏上。用行高设置垂直居中，图标偏上，el-plus也会有这个问题，是行高有什么问题，还是啥？。或者设置容器高度为100%解决。
  svg {
    height: 1em;
    width: 1em;
  }
}
</style>
