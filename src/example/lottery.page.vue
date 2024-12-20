<template>
  <Filters />
  <Header v-if="$route.meta.withFixedHeader || $route.meta.withHeader"></Header>
  <main>
    <router-view v-slot="{ Component, route }">
      <Transition :name="route.meta.transition">
        <div :key="route.path">
          <component :is="Component" />
        </div>
      </Transition>
    </router-view>
  </main>
  <Footer v-if="$route.meta.footer !== false" />
</template>

<script lang="ts" setup>
import { useProvideCounterStore } from './lottery/context'
import Filters from './lottery/components/lottery.shadow-filters.vue'
import Footer from './lottery/components/lottery.footer.vue'

definePage({
  path: '/luckydraw',
  name: 'luckydraw',
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
