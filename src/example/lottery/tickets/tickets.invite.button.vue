<template>
  <button
    class="invite__button"
    :class="`invite__button--${size}`"
    @click="doshare"
  >
    <span
      style="filter: url(#invite)"
      class="redeem__button"
    >INVITE</span
    >
    <icon-icon-park-solid-play-one style="filter: url(#invite)" />
  </button>
</template>
<script lang="ts" setup>
import { useUserStore } from '@/stores/user.store'
import { share } from '@/utils'
import type { PropType } from 'vue'

const store = useUserStore()

defineProps({
  size: {
    type: String as PropType<'small' | 'large'>,
    default: 'large',
  },
})

function doshare() {
  share({
    url: window.location.origin + '/activity/luckydraw',
    message:
      "I've got the ticket, get your ticket and P20 bonus by signing up on ArenaPlus, and get  a chance to win a luxury car during the NBA Finals.",
    palcode: store.info.customerId+'inviteType',
    referenceName: store.info.loginName,
  })
}
</script>
<style lang="less">
.invite {
  &__button {
  @apply tw-shrink-0 tw-bg-[#6D00E2] tw-text-white tw-rounded-16;
    filter: url(#invite-button);

    &--large {
    @apply tw-grid tw-place-content-center tw-place-items-center tw-h-158 tw-w-162  tw-text-40;
    }

    &--small {
    @apply tw-flex tw-justify-center tw-items-center tw-h-60 tw-w-162 tw-text-28 tw-gap-8;
    }
  }
}
</style>
