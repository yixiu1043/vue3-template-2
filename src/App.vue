<template>
  <router-view v-slot="{ Component, route }">
    <Transition
      :name="route.meta.transition"
      mode="out-in"
    >
      <div
        :class="[classname($route.path, 'page-'), { 'light': app.theme === 'light', 'dark': app.theme === 'dark' }]"
      >
        <component :is="Component" />
      </div>
    </Transition>
  </router-view>
  <BottomNav v-if="$route.meta.withBottomNav"/>
</template>

<script setup lang="ts">
import classname from '@/utils/path-to-classname'
import { useAppStore } from '@/stores/app.store'

const app = useAppStore();
app.initAppStore();
</script>

<style lang="less">
.clip-path {
  --clip-path: polygon(
    0 0,
    100% 0,
    100% 100%,
    calc(50% + 88.8px) 100%,
    calc(50% + 86.6px) 100%,
    calc(50% + 84.3px) calc(100% - 0.5px),
    calc(50% + 82.1px) calc(100% - 1.3px),
    calc(50% + 80px) calc(100% - 2.3px),
    calc(50% + 78.1px) calc(100% - 3.6px),
    calc(50% + 77.3px) calc(100% - 4.1px),
    calc(50% + 75.3px) calc(100% - 5.3px),
    calc(50% + 73.3px) calc(100% - 6.3px),
    calc(50% + 71.1px) calc(100% - 7.1px),
    calc(50% + 68.8px) calc(100% - 7.6px),
    calc(50% + 66.5px) calc(100% - 7.7px),
    calc(50% - 60.6px) calc(100% - 7.7px),
    calc(50% - 63px) calc(100% - 7.6px),
    calc(50% - 65.1px) calc(100% - 7.1px),
    calc(50% - 67.3px) calc(100% - 6.3px),
    calc(50% - 69.5px) calc(100% - 5.3px),
    calc(50% - 71.5px) calc(100% - 4.1px),
    calc(50% - 72.1px) calc(100% - 3.6px),
    calc(50% - 74.1px) calc(100% - 2.3px),
    calc(50% - 76.1px) calc(100% - 1.3px),
    calc(50% - 78.3px) calc(100% - 0.5px),
    calc(50% - 80.6px) 100%,
    0 100%,
    0 0
  );
}
.page-luckydraw {
  width: 100%;
  min-height: 100vh;
  background-color: #310066;
  display: flex;
  flex-direction: column;
  & > main {
    flex: 1;
  }
  --clip-path: polygon(
    0 0,
    100% 0,
    100% 100%,
    calc(50% + 88.8px) 100%,
    calc(50% + 86.6px) 100%,
    calc(50% + 84.3px) calc(100% - 0.5px),
    calc(50% + 82.1px) calc(100% - 1.3px),
    calc(50% + 80px) calc(100% - 2.3px),
    calc(50% + 78.1px) calc(100% - 3.6px),
    calc(50% + 77.3px) calc(100% - 4.1px),
    calc(50% + 75.3px) calc(100% - 5.3px),
    calc(50% + 73.3px) calc(100% - 6.3px),
    calc(50% + 71.1px) calc(100% - 7.1px),
    calc(50% + 68.8px) calc(100% - 7.6px),
    calc(50% + 66.5px) calc(100% - 7.7px),
    calc(50% - 60.6px) calc(100% - 7.7px),
    calc(50% - 63px) calc(100% - 7.6px),
    calc(50% - 65.1px) calc(100% - 7.1px),
    calc(50% - 67.3px) calc(100% - 6.3px),
    calc(50% - 69.5px) calc(100% - 5.3px),
    calc(50% - 71.5px) calc(100% - 4.1px),
    calc(50% - 72.1px) calc(100% - 3.6px),
    calc(50% - 74.1px) calc(100% - 2.3px),
    calc(50% - 76.1px) calc(100% - 1.3px),
    calc(50% - 78.3px) calc(100% - 0.5px),
    calc(50% - 80.6px) 100%,
    0 100%,
    0 0
  );
  &.fixed-header {
    padding-top: 96px;
  }
}
.page-luckydraw-record-winning {
  background-color: rgb(191, 66, 0);
}
</style>
