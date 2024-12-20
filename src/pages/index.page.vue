<template>
  <main>
    <router-view v-slot="{ Component, route }">
      <Transition :name="route.meta.transition">
        <div :key="route.path">
          <component :is="Component" />
        </div>
      </Transition>
    </router-view>
  </main>
</template>

<script lang="ts" setup>
import { useProvideCounterStore } from './context'

definePage({
  path: '/',
  redirect: 'home',
})

const provide = useProvideCounterStore()

onMounted(() => {
  provide.update()
})
</script>

<style lang="less">
.fix-header {
  padding-top: 96px;
}
</style>
