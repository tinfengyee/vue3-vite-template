<template>
  <div>
    <el-button @click="isDark = !isDark">UseDark</el-button>
  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<style></style>
