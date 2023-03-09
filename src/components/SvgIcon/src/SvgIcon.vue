<template>
  <svg :class="svgClass" :style="svgStyle" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>
<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
  icon: string
  className?: string
  width?: string
  height?: string
  color?: string
}>()
const svgClass = computed(() => `svg-icon ${props.className ?? ''}`)
const svgStyle = computed(() => {
  let style = ''
  if (props.width) style += `width: ${props.width};`
  if (props.height) style += `height: ${props.height};`
  if (props.color) style += `color: ${props.color};`
  return style
})
const iconName = computed(() => `#icon-${props.icon}`)
</script>
<style>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
