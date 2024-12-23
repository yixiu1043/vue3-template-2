<template>
  <div class="home">
    <div>HOME</div>
    <div></div>
  </div>
</template>

<script setup lang="ts">
import loader from '@/components/loading/loading'
import { findMiniApp, getAppConfig } from '@/apis'

definePage({
  path: '/home',
  name: 'home',
  meta: {
    withBottomNav: true,
  },
})

onMounted(async () => {

})
</script>

<style scoped lang="less"></style>