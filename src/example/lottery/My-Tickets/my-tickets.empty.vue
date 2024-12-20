<template>
  <Decorator />
  <img
    class="tw-block tw-mx-auto"
    src="./img/empty.png"
    width="80%"
  />
  <router-link
    to="/luckydraw/tickets"
    class="tw-block tw-w-[422px] tw-mx-auto tw-mt-32"
  >
    <VanButton
      round
      block
      color="radial-gradient(224.77% 50% at 16.44% 0%, #FFCE71 0%, #FEA800 100%)"
    >
      <span class="tw-font-knockout tw-text-[#5000A6] tw-text-48">GET TICKETS</span>
    </VanButton>
  </router-link>
</template>
<script lang="ts" setup>
import Decorator from '../components/lottery.decorator.vue'
</script>
<script lang="ts"></script>
<style lang="less"></style>
