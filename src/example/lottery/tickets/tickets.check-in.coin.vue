<template>
  <div class="check-in__coin">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
import type { PropType } from 'vue'

defineProps({
  active: {
    type: Boolean as PropType<boolean>,
    default: true,
  },
})
</script>
<style lang="less">
.check-in__coin {
  @apply tw-font-knockout tw-text-40 tw-w-56 tw-h-56 tw-inline-flex tw-justify-center tw-items-center tw-pb-4;
  line-height: 1;
  background: url(./img/coin-gold.png) no-repeat 0 / contain;
  color: #ff0648;
  filter: url(#coin);
  &.before {
    color: white;
    background-image: url(./img/coin-red.png);
  }
  // &.current,
  // &.after {
  //   color: #ff0648;
  //   // background-image: url(./img/coin-gold.png);
  // }
  &.current {
    transform: scale(1.5);
  }
}
</style>
