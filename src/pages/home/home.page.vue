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
  const close = loader()
  const data = await Promise.all([
    findMiniApp({
      "name": '',
      "page": 1,
      "limit": 10,
      "channel_id": 3,
    }),
    getAppConfig({
      'channel_id': 3,
    }),
  ])
  console.log('data', data)
  close()
})
</script>

<style scoped lang="less"></style>