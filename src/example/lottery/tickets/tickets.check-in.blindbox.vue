<template>
  <div
    class="blindbox-container"
    :class="{ active, rotate }"
  >
    <div
      class="blindbox"
      :style="`--begin: ${front.begin}; --end: ${front.end}`"
    >
      <img
        src="./img/book.png"
        class="tw-w-full"
      />
    </div>
    <div style="filter: url(#modal); transform: rotateY(-180deg)">
      <Coupon
        class="coupon--1"
        :begin="begin"
        :end="end"
        :value="value"
      >
      </Coupon>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Coupon, { type Props } from '../components/lottery.coupon.vue'

defineProps<Props & { front: { begin: string; end: string }; rotate?: boolean }>()
</script>
<style lang="less">
.blindbox-container {
  @apply tw-relative tw-flex tw-justify-center tw-items-center;
  transform-style: preserve-3d;
  perspective: 400px;
  transition: transform 1000ms;
  --scale:1;
  --rotate:0;
  transform: scale(var(--scale)) rotateY(var(--rotate));
  &.active {
    --scale:1.2;
  }
  &.rotate {
    --rotate:180deg;
    pointer-events: none;
  }

  & > div {
    backface-visibility: hidden;
  }
}
.blindbox {
  width: 150px;
  @apply tw-absolute tw-z-10;

  &::after {
    content: '';
    position: absolute;
    background: radial-gradient(174.55% 68.71% at 16.44% 0%, var(--begin) 0%, var(--end) 100%);
    mix-blend-mode: difference;
    transform: skewY(22deg);
    top: 33%;
    right: 34%;
    bottom: 9%;
    left: 0px;
  }
}
</style>
