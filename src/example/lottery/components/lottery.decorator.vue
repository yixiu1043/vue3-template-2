<template>
  <div class="lottery__decorator tw-top-1/4 tw-left-0">
    <!-- <img
      src="../index/img/deco-1.png"
      class="tw-w-52"
    /> -->
  </div>
  <div class="lottery__decorator tw-top-[70%] tw-right-0">
    <!-- <img
      v-if="type === 1"
      src="../index/img/deco-2.png"
      class="tw-w-52"
    /> -->
    <!-- <img
      v-else
      src="../index/img/deco-1.png"
      class="tw-w-52 tw-scale-[-1]"
    /> -->
  </div>
</template>
<script lang="ts"></script>
<script lang="ts" setup>
withDefaults(defineProps<{ type?: 1 | 2 }>(), { type: 1 })
</script>
<style lang="less">
.lottery__decorator {
  @apply tw-fixed  tw-w-52 tw-z-10;
}
</style>
