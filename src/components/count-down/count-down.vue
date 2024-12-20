<template>
  <div
    class="count-down"
    :key="endTime!.toString()"
  >
    <div class="count-down__group">
      <div
        v-if="props.dayInHour"
        class="count-down__block"
      >
        <CountdownItem
          v-for="(hour, index) in countTime.hours"
          :key="hour + index"
          :value="Number(hour)"
        />
      </div>
      <div
        v-else
        class="count-down__block"
      >
        <CountdownItem
          :value="Number(countTime.hours[0])"
          :max="2"
        />
        <CountdownItem
          :value="Number(countTime.hours[1])"
          :max="4"
        />
      </div>

      <div class="count-down__label">HOURS</div>
    </div>
    <div class="count-down__sep">:</div>
    <div class="count-down__group">
      <div class="count-down__block">
        <CountdownItem
          :value="Number(countTime.minutes[0])"
          :max="6"
        />
        <CountdownItem :value="Number(countTime.minutes[1])" />
      </div>
      <div class="count-down__label">MINUTES</div>
    </div>
    <div class="count-down__sep">:</div>
    <div class="count-down__group">
      <div class="count-down__block">
        <CountdownItem
          :value="Number(countTime.seconds[0])"
          :max="6"
        />
        <CountdownItem :value="Number(countTime.seconds[1])" />
      </div>
      <div class="count-down__label">SECONDS</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import useCountDown, { type UseCountDownOption } from '@/hooks/use-count-down'
import CountdownItem from './count-down-item.vue'

const props = defineProps<UseCountDownOption>()

const countTime = useCountDown(props)
</script>

<style lang="less">
.count-down {
  @apply tw-flex tw-items-center tw-text-24 tw-font-bold;

  &__group {
    @apply tw-px-4 tw-h-44 tw-text-[#6E0ADA] tw-flex tw-flex-col tw-justify-center tw-items-center tw-rounded-4;

    background: linear-gradient(0deg, #ffe9c4, #ffe9c4),
      radial-gradient(
        71.31% 21.4% at 50% 100%,
        rgba(255, 255, 255, 0.414909) 0%,
        rgba(255, 255, 255, 5e-5) 100%
      );
  }

  &__block {
    @apply tw-flex;
  }

  &__sep {
    line-height: 1;
    @apply tw-text-44 tw-w-20 tw-self-baseline tw-text-center;
  }

  &__label {
    @apply tw-text-8;
    color: rgba(#6e0ada, 0.4);
  }
}
</style>
