<template>
  <div
    class="coupon"
    :class="{ active }"
  >
    <div
      class="coupon__body"
      :style="`--begin: ${begin}; --end: ${end};`"
    >
      <template v-if="value">
        <div
          v-if="active"
          class="tw-text-24"
        >
          You get
        </div>
        <div class="tw-font-knockout tw-text-64">{{ value }}</div>
        <div class="tw-font-knockout tw-text-28">TICKETS</div>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
export interface Props {
  begin: string
  end: string
  opacity?: string | number
  active?: boolean
  value: number
}

defineProps<Props>()

// 查询日历签到范围，开始时间-结束时间
</script>
<style lang="less">
.coupon {
  pointer-events: none;
  filter: url('#modal');
  opacity: v-bind(opacity);
  color: #8e0067;
  &.active {
    color: white;
    transform: scale(1.15);
    z-index: 2;
  }
}
.coupon__body {
  height: 218px;
  line-height: 1;

  @apply tw-w-152 tw-pt-80 tw-pb-10 tw-px-10 tw-text-center tw-grid tw-place-content-evenly;
  background:
    url(./img/frame.png) no-repeat center center / cover,
    linear-gradient(to right, var(--begin) 0%, var(--end) 100%);
  mask: url(./img/bookmark.png) luminance center center / cover;
}
</style>
