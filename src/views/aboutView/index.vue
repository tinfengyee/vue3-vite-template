<template>
  <el-container>
    <el-card class="main">{{ $t('loading') }}</el-card>
    <AppLocalePicker />
    <div>{{ count }}</div>
    <div>{{ doubleCount }}</div>
    <div @click="counterStore.increment">increment</div>
    <div @click="counterStore.$patch({ count: 7 })">Path</div>
  </el-container>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter'
// import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import AppLocalePicker from '@/components/Application/AppLocalePicker.vue'

const { meta } = useRoute()

const counterStore = useCounterStore()
const { count, doubleCount } = storeToRefs(counterStore)

counterStore.$subscribe((mutation, state) => {
  console.log(mutation)
  console.log(state)

  // locale.value === 'en'
})
</script>

<style>
.main {
  /* color: var(--main-color); */
  background: var(--theme-color);
}
</style>
