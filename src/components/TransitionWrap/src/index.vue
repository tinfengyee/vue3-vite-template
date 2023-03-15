<template>
  <Transition :name="props.name">
    <slot></slot>
  </Transition>
</template>

<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    default: 'transition'
  }
})
</script>

<style>
.transition-enter-active,
.transition-leave-active {
  transition: all 0.28s;
}
.transition-enter-from,
.transition-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.4s ease-in;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0.3;
  transform: translateX(20px);
}
</style>
