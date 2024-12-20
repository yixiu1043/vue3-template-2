<template>
  <Decorator />
  <LotteryHeader
    fixed
    @click-left="go"
  ></LotteryHeader>
  <div class="lottery tw-grid tw-gap-18">
    <Roulette />
    <EventVideo />
    <Event1 />
<!--    <Event2 />-->
    <Event3 />
    <Event4 />
    <Ticket />

    <router-link to="/luckydraw/tickets">
      <div class="tw-fixed tw-right-[-10%] tw-top-[55%] tw-w-[264px] tw-h-124 tw-z-10">
        <img
          src="./img/get-more.png"
          alt=""
        />
      </div>
    </router-link>
    <div class="tw-fixed tw-left-0 tw-top-[54%]">
      <img
        src="../index/img/deco-1.png"
        class="tw-w-52"
      />
    </div>
    <div class="tw-fixed tw-right-0 tw-bottom-[10%] tw-scale-[-1]">
      <img
        src="../index/img/deco-1.png"
        class="tw-w-52"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import LotteryHeader from '../components/lottery.header.tickets.vue'
import Decorator from '../components/lottery.decorator.vue'
import Roulette from './index.Roulette.vue'
import Event1 from './index.Event1.vue'
// import Event2 from './index.Event2.vue'
import Event3 from './index.Event3.vue'
import Event4 from './index.Event4.vue'
import EventVideo from './index.EventVideo.vue'
import Ticket from './index.Ticket.vue'
import { goBack } from '@/utils/go-back'

function go() {
  goBack({
    app: 'home',
    web: window.location.origin,
  })
}
</script>

<style lang="less">
.lottery {
  min-height: 100vh;
  background: #310066 url('./img/bg.png') no-repeat 0 0 /100% auto;
  background-size: contain;
}
</style>
