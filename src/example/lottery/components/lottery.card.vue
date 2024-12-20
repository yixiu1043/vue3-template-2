<template>
  <li
    class="lottery__card"
    :class="{
      'lottery__card--new': isNew,
      ['lottery__card--' + type]: true,
    }"
  >
    <div
      v-if="ticket && amount"
      class="tw-w-full tw-flex tw-items-center tw-justify-between"
    >
      <span class="tw-text-44 tw-text-white">₱{{ amount }}</span>
      <span class="tw-text-28">{{ ticket }}</span>
    </div>
    <div
      v-else-if="ticket"
      class="tw-text-48"
    >
      {{ ticket }}
    </div>
  </li>
</template>
<script lang="ts" setup>
import type { PropType } from 'vue'

const props = defineProps({
  type: {
    type: Number as PropType<1 | 2 | 3 | 4 | 5>,
    default: 1,
  },
  isNew: {
    type: Boolean as PropType<boolean>,
    default: false,
  },
  ticket: {
    type: String as PropType<string>,
  },
  amount: {
    type: Number as PropType<number>,
  },
})
</script>
<style lang="less">
.lottery__card {
  color: #4a009a;
@apply tw-h-120 tw-text-center tw-rounded-16 tw-pl-114 tw-pr-20 tw-pb-40 tw-flex tw-items-center tw-justify-center tw-font-knockout tw-relative;
  background: no-repeat 0 / cover;
  &--new::before {
    content: 'new';
  @apply tw-uppercase tw-absolute -tw-right-4 -tw-top-4 tw-rounded-bl-8 tw-rounded-tr-8   tw-text-[#FF223C] tw-bg-[#FDBB30] tw-text-14 tw-px-8;
  }

  &--1 {
    background-image: url(./img/prize.png);
  }
  &--2 {
    background-image: url(./img/prize.png);
  }
  &--3 {
    background-image: url(./img/valid.png);
  }
  &--4 {
    background-image: url(./img/used.png);
  }
  &--5 {
    background-image: url(./img/expired.png);
  }
}
</style>
