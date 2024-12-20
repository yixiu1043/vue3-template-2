<template>
  <div class="tw-flex tw-justify-around tw-mt-90 tw-mx-[-18px] tw-relative" >
    <Coupon
      v-for="(item, index) in bookmarks"
      class="coupon--2"
      :key="item.begin"
      :begin="item.begin"
      :end="item.end"
      :opacity="item.opacity"
      :active="index === 1"
      :value="index === 1 ? tickets : 0"
    >
    </Coupon>
  </div>
</template>
<script lang="ts" setup>
import type { PropType } from 'vue'
import Coupon from './lottery.coupon.vue'
const bookmarks = [
  { begin: '#ff8021; ', end: '#ff5800', opacity: 0.8 },
  { begin: '#ff8021; ', end: '#ff5800' },
  { begin: '#ff8021; ', end: '#ff5800', opacity: 0.8 },
]
defineProps({
  tickets: {
    type: Number as PropType<number>,
    default: 0,
  },
})
// 查询日历签到范围，开始时间-结束时间
</script>
<style lang="less">
.coupon--2 {
  @apply tw-absolute;
  &:first-child {
    transform: translateX(-50%);
  }
  &:last-child {
    transform: translateX(50%);
  }
  &.active {
    z-index: 1;
    transform-origin: bottom center;
    transform: scale(1.25);
  }
}
</style>
