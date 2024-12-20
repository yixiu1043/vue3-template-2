<template>
  <div class="count-down__value">
    <div class="count-down__tracker" :class="{ 'count-down__animation': flag }" @transitionend="transitionend">
      <div class="count-down__num">{{ nextValue }}</div>
      <div class="count-down__num">{{ nowValue }}</div>
    </div>
  </div>
</template>
<script lang="ts" setup>
function transitionend(e: TransitionEvent) {
  flag.value = false
  nowValue.value = props.value
}
const props = defineProps<{ value: number; max?: number }>()
const nowValue = ref(props.value ?? 0)
const max = computed(() => props.max ?? 9)
const nextValue = computed(() => (nowValue.value === 0 ? max.value : nowValue.value - 1))
const flag = ref(false)
watch(
  () => props.value,
  () => {
    flag.value = true
  }
)
</script>

<style lang="less">
.count-down__animation {
  will-change: transform;
  transition: transform 300ms;
  transform: translateY(50%);
}

.count-down {
  &__value {
    height: 1em;
    min-width: 0.65em;
    @apply tw-flex tw-overflow-hidden;
  }

  &__tracker {
    height: 2em;
    line-height: 1;
    overflow: hidden;
    align-self: flex-end;

  }

  &__num {
    height: 50%;
    @apply tw-grid tw-place-content-center;
  }
}
</style>
