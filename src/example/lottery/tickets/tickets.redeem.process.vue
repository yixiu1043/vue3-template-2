<template>
  <div class="redeem__progress">
    <div class="redeem__progress__bar"></div>
    <div class="redeem__progress__value">{{ $filter.amountize(max!) }} turnovers for</div>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
  value: number | string
  color: string
  max?: number | string
}>()

const value = computed(() => {
  return Math.min((Number(props.value) / Number(props.max ?? 100)) * 100, 100) + '%'
})
</script>
<style lang="less">
.redeem {
  &__progress {
    width: 100%;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 100px;
    position: relative;
    z-index: 1;

    &__bar {
      position: absolute;
      top: 0;
      bottom: 0;
      z-index: -1;
      width: v-bind(value);
      background-image: linear-gradient(
        135deg,
        var(--1) 0%,
        var(--1) 23%,
        var(--2) 23%,
        var(--2) 50%,
        var(--1) 50%,
        var(--1) 73%,
        var(--2) 73%,
        var(--2) 100%
      );
      background-size: 40px 40px;
      animation: progressAnimation 1s linear infinite;
      border-radius: 100px;
      @keyframes progressAnimation {
        0% {
          background-position: 0 0;
        }
        100% {
          background-position: 40px 0;
        }
      }
    }
    &__value {
      color: rgba(white, 0.7);
      font-size: 22px;
      text-align: center;
      display: flex;
      height: 100%;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
