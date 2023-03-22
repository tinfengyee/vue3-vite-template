<template>
  <div @click="toggleDark()">
    <SvgIcon icon="icon-themelightdark" size="20" />
  </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import SvgIcon from '@/components/SvgIcon'
const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>
