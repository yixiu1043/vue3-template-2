<template>
  <div class="tw-relative">
<!--    <img-->
<!--      src="./img/coin-waiting.png"-->
<!--      class="tw-absolute tw-right-64 -tw-top-24 tw-z-10"-->
<!--    />-->

    <Module
      class="more-ways tw-grid tw-gap-8"
      title="MORE WAYS"
      filter-id="redeem-tickets"
    >
      <VanButton
        color="#922CFF"
        size="large"
        block
        round
        >SOCIAL CHALLENGE</VanButton
      >
      <VanButton
        color="#922CFF"
        size="large"
        block
        round
        >OFFLINE EVENT SIGN-U</VanButton
      >
    </Module>
  </div>
</template>
<script lang="ts" setup>
import Module from '../components/Module.vue'
</script>
<style lang="less">
.more-ways {
  background: radial-gradient(127.02% 50% at 16.44% 0%, #9636ff 0%, #6e0adb 100%);
}
</style>
