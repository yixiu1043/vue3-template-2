<template>
  <Modal
    button-text="OK"
    type="ok"
    v-bind="$attrs"
  >
    <div class="tw-text-center tw-font-knockout tw-text-64 tw-text-white tw-leading-1">
      Your turnovers are<br />
      123,456.00
    </div>
    <div class="tw-text-center tw-text-24 tw-text-[#C798FA] tw-opacity-70">
      The turnovers were calculated as of yesterday, and today's turnover can be redeemed for
      tickets tomorrow.
    </div>

    <coupons :tickets="tickets" />
  </Modal>
</template>
<script lang="ts" setup>
import Modal from '../components/Modal.vue'
import coupons from '../components/lottery.coupons.vue'
const tickets = ref(100)
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
