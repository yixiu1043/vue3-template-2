<template>
  <svg
    aria-hidden="true"
    :width="size"
    :height="size"
    v-bind="props"
  >
    <use
      :xlink:href="symbolId"
      fill="currentColor"
      stroke="currentColor"
    />
  </svg>
</template>
<script lang="ts" name="svg-icon" setup>
//@ts-nocheck
import type { SVGAttributes } from 'vue'
interface Props extends /** @vue-ignore */ SVGAttributes {
  icon: string
  size: string | number
}

const props = withDefaults(defineProps<Props>(), {
  size: '1em',
})

const symbolId = computed(() => `#icon-local-${props.icon}`)
</script>
<style lang=""></style>
