<template>
  <iframe
    src="/activity/roulette/index.html"
    frameborder="0"
    scrolling="no"
    class="tw-w-full tw-h-[1121px] -tw-mb-[330px]"
    :style="{ opacity: hidden ? 0 : 1 }"
    @load="loaded"
  ></iframe>
</template>
<script lang="ts" setup>
const hidden = ref(true)
function loaded(e: Event) {
  hidden.value = false
}
</script>

<style lang="less"></style>
