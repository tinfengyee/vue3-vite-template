<template>
  <!-- <el-button @click="toggleDark()">UseDark</el-button> -->
  <div class="icon dark-mode" @click="toggleDark()">
    <SvgIcon icon="icon-themelightdark" />
  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import SvgIcon from '@/components/SvgIcon'
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>
