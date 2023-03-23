<template>
  <div class="bar" :style="style"></div>
</template>
<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  percent: {
    type: [String, Number],
    default: 0
  },
  height: {
    type: String,
    default: '100%'
  },
  width: {
    type: String,
    default: '100%'
  }
})

const style = computed(() => {
  const { percent, height, width } = props
  return {
    '--percent': percent,
    height,
    width
  }
})
</script>
<style scoped>
.bar {
  height: 20px;
  width: 300px;
  background-color: #f5f5f5;
  counter-reset: progress var(--percent);
  position: relative;
}
.bar::before {
  position: absolute;
  left: 0;
  top: 0;
  display: block;
  content: counter(progress) '%';
  height: 100%;
  width: calc(1% * var(--percent));
  color: #fff;
  background-color: #2486ff;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  background-image: linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.15) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.15) 50%,
    rgba(255, 255, 255, 0.15) 75%,
    transparent 75%,
    transparent
  );
  background-size: 1rem 1rem;
  transition: all 4s;
}
</style>
