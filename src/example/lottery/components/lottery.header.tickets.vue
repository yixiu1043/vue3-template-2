<template>
  <Header>
    <template #right>
      <div
        v-if="$stores.user.authed"
        class="lottery__header lottery__header--logged"
        @click="$router.push('/luckydraw/my-tickets')"
      >
        <img
          src="./img/7.png"
          class="tw-w-36"
        />
        <VanBadge :dot="hasNew">
          <div class="tw-text-[#FFDCAF] tw-text-28 tw-font-bold tw-ml-16">
            My Tickets {{ count }}
          </div>
        </VanBadge>
      </div>
      <div
        v-else
        class="lottery__header lottery__header--unlogged"
        @click="$stores.user.login()"
      >
        Login | Register
      </div>
    </template>
  </Header>
</template>
<script lang="ts" setup>
import { useCounterStore } from '../context'
const { count, hasNew } = useCounterStore()!
</script>

<style lang="less">
.lottery__header {
@apply tw-flex tw-items-center tw-h-64 tw-px-32 tw-rounded-s-148 tw-flex-wrap;

  &--logged {
    background: rgba(#310066, 0.8);
    @selectors: blue, green, red;
    overflow: hidden;
    transform: translateZ(0);
    &::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 8px;

      background-image: linear-gradient(#ff0000 20%, transparent 20%),
      linear-gradient(#ffc200 40%, transparent 40%), linear-gradient(#269600 60%, transparent 60%),
      linear-gradient(#7f002f 80%, transparent 80%);
    }
  }

  &--unlogged {
  @apply tw-bg-[#FF5800] tw-text-white;
  }
}
</style>
