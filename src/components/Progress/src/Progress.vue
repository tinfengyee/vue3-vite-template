<template>
  <div class="progress-bar">
    <span class="progress-fill" ref="fill" :style="style">
      <slot :value="value" name="default"> {{ value }}%</slot>
    </span>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  value: {
    type: [String, Number],
    default: 0
  },
  color: {
    type: String,
    default: '#28a745'
  },
  height: {
    type: String,
    default: '20px'
  },
  animation: {
    type: Boolean,
    default: true
  }
})

const style = computed(() => {
  const { color, value, height, animation } = props
  return {
    'background-color': color,
    width: value + '%',
    height,
    'line-height': height,
    'animation-play-state': animation ? 'running' : 'paused'
  }
})
</script>
<style scoped lang="scss">
.progress-bar {
  width: 100%;
  background-color: rgb(232, 232, 232);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  // box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.8), 6px 2px 12px -2px rgba(0, 0, 0, 0.6);
  .progress-fill {
    display: block;
    text-align: center;
    height: 100%;
    max-width: 100%;
    width: 0;
    color: #f1f2f3;
    transition: 2s width ease-in-out;
    background-image: linear-gradient(
      -45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
    );
    background-size: 1em 1em;
    animation: loading-line 6s linear infinite;
    // &:after {
    //   position: absolute;
    //   content: '';
    //   display: block;
    //   width: 100%;
    //   height: 100%;
    //   left: 0;
    //   top: 0;
    //   background-image: linear-gradient(
    //     -45deg,
    //     rgba(255, 255, 255, 0.2) 25%,
    //     transparent 25%,
    //     transparent 50%,
    //     rgba(255, 255, 255, 0.2) 50%,
    //     rgba(255, 255, 255, 0.2) 75%,
    //     transparent 75%,
    //     transparent
    //   );
    //   background-size: 1em 1em;
    //   animation: loading-line 6s linear infinite;
    // }
  }
}
@keyframes loading-line {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 40px 40px;
  }
}
</style>
