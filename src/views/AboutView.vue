<template>
  <div>{{ count }}</div>
  <div>{{ doubleCount }}</div>
  <div @click="counterStore.increment">increment</div>
  <div @click="counterStore.$patch({ count: 7 })">Path</div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter'
const counterStore = useCounterStore()
const { count, doubleCount } = storeToRefs(counterStore)
counterStore.$subscribe((mutation, state) => {
  console.log(mutation)
  console.log(state)
})
</script>

<style></style>
