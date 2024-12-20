<template>
  <div
    class="check-in__card"
    :class="`check-in__card--${status}`"
    v-on="status === DailyCheckIn.Able ? { click: handle } : {}"
  >
    <div class="check-in__card__date">
      {{ dateText }}
    </div>
    <div class="check-in__card__icon"></div>
    <div class="check-in__card__text">
      {{ status }}
    </div>
  </div>
</template>

<script lang="ts" setup>
import { DailyCheckIn } from '@/const/enum'

const props = defineProps<{
  date: string
  dateText: string
  status: DailyCheckIn
}>()

function handle(e: MouseEvent) {
  emit('click', props.date, e)
}

const emit = defineEmits<{
  click: [date: string, e: MouseEvent] // named tuple syntax
}>()
</script>
<style lang="less">
.check-in__card {
  @apply tw-rounded-16 tw-h-156 tw-grid tw-place-content-evenly tw-place-items-center tw-text-30  tw-text-[#FF2D45] tw-relative tw-z-10;
  background-color: var(--bg, #fff4d2);

  &--done {
    --bg: #ba0015;
    --icon: url(./img/coin-gold-done.png);
    --text-color: rgba(255, 255, 255, 0.5);
    --date-color: #fff;
  }

  &--unable {
    --bg: #f1efe9;
    --icon: url(./img/coin-gray.png);
    --text-color: #bba3a6;
    --date-color: #987a7d;
  }

  &--check-in {
    --icon: url(./img/coin-able2.png);
    --bg: #6300ce;
    &::after {
      content: '';
      @apply tw-absolute tw-w-full tw-top-0 tw-bottom-34 tw-rounded-16 tw-bg-[#fff4d2] -tw-z-10;
    }
  }

  &--wating {
    --icon: url(./img/coin-waiting.png);
    --bg: #ffc2c9;
    --text-color: #cc4756;
  }

  &__date {
    @apply tw-font-knockout tw-text-30;
    color: var(--date-color, #ff3d54);
  }

  &__icon {
    width: 1em;
    height: 1em;
    font-size: 56px;
    margin-top: -10px;
    background: var(--icon) no-repeat center/contain;
  }

  &__text {
    @apply tw-text-14 tw-font-semibold tw-uppercase;
    color: var(--text-color, #ff2d45);
    margin-top: 10px;
  }
}
</style>
