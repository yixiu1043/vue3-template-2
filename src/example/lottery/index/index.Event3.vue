<template>
  <div class="event-3 tw-relative">
    <van-image
      lazy-load
      :src="bg"
      width="100%"
      style="padding: 0 12px;"
    />
    <router-link
      to="/luckydraw/record-winning"
      class="tw-absolute tw-bg-[#5e00c4] tw-rounded-8 tw-leading-[52px] tw-px-16 tw-top-110 tw-right-30 tw-text-white"
    >
      Winning of Tickets</router-link
    >
    <CoinShower
      id="tsparticles2"
      style="z-index: 10;"
      class="tw-absolute tw-top-[230px] tw-left-140 tw-w-[474px] tw-h-160 tw-text-white"
    />
    <div class="tw-absolute tw-top-[230px] tw-left-140 tw-w-[474px] tw-h-94 tw-text-white counter">
      <CountUp
        template="000,000"
        :end-value="120000"
        :duration="5000"
        class="count-up"
      />
    </div>

    <div
      class="tw-absolute tw-top-[310px] tw-left-0 tw-right-0 tw-h-54 tw-flex tw-justify-center tw-text-white"
    >
      <Countdown
        day-in-hour
        :end-time="dateTime"
      />
    </div>
    <div class="tw-absolute tw-left-60 tw-top-98 tw-text-[#A53900] tw-text-22 txt">
      <p>Everyday at 10:00PM during Apr 20-Jun 24, 1,200 tickets of winning <span class="tw-font-bold tw-text-[#5E00C4]">₱100</span> will be drawn</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Countdown from '@/components/count-down/count-down.vue'
import CountUp from '@/components/count-up/count-up.vue'
import bg from './img/event3.png'
import CoinShower from '../components/lottery.coin-shower.vue'
// 活动开始日期时间
const start = new Date('2024/04/26 22:00:00')
let today = new Date()
today = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 22)

const target = today.getTime() > start.getTime() ? today : start

const dateTime = target
</script>

<style lang="less">
.counter {
  font-family: 'Knockout';
  font-size: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
  filter: url(#event3);
}
.count-up {
  &--\, {
  }
}
.event-3 {
  .txt {
    width: 359px;
  }
}
</style>
