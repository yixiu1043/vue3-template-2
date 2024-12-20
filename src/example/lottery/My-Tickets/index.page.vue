<template>
  <div class="my-ticket">
    <MyTickets v-if="!isEmpty" />
    <MyTicketsEmpty v-else />
    <div class="tw-fixed tw-left-0 deco-1">
      <img
        src="../index/img/deco-1.png"
        class="tw-w-52"
      />
    </div>
    <div class="tw-fixed tw-right-0 tw-scale-[-1] deco-2">
      <img
        src="../index/img/deco-1.png"
        class="tw-w-52"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import MyTickets from './my-tickets.vue'
import MyTicketsEmpty from './my-tickets.empty.vue'

definePage({
  name: 'my-tickets',
  meta: {
    withHeader: true,
    title: 'MY TICKETS',
    authentication: true,
  },
})
const isEmpty = ref(false)
provide('isEmpty', isEmpty)
</script>
<style lang="less">
.page-luckydraw-my-tickets {
  background: url(./img/top-deco.png) no-repeat right top/360px auto;
}
.deco-1 {
  top: 630px;
}

.deco-2 {
  bottom: 170px;
}
</style>
