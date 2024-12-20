<template>
  <div class="event-4 tw-relative">
    <van-image
      lazy-load
      :src="bg"
      width="100%"
      style="padding: 0 12px;"
    />
  </div>
</template>
<script lang="ts" setup>
import bg from './img/event4.png'
</script>

<style lang="less">
.event-4 {
 top:-10.5px;
}
</style>
