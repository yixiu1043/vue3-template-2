<template>
  <Module
    class="redeem"
    title="REDEEM TICKETS"
    filter-id="redeem-tickets"
  >
<!--    <template #title-right>-->
<!--      <div class="tw-text-24">Ends 24 Jun</div>-->
<!--    </template>-->

    <Row
      :icon="icon1"
      :value="rollover.userRemainSportBetAmount"
      type-name="SPORTS"
      filter="redeem1"
      class="redeem__row--1"
      @done="done"
    ></Row>

    <div class="txt">
      <p>
        1. Sports betting every P1,000 can be redeemed for 1 ticket, with no daily upper limit. The data will be updated
        at 18:00PM the next day.
      </p>
      <p>2. During the event, all bets will earn extra points.</p>
    </div>
  </Module>
</template>
<script lang="ts" setup>
import Module from '../components/Module.vue'
import Row from './tickets.redeem.row.vue'
import icon1 from '../index/img/6.png'
// import icon2 from '../index/img/5.png'
import { fetchMyRollover } from '@/example/apis'
import type { response } from '@/example/apis/lottery.api.model'
import { useCounterStore } from '../context'

const { update } = useCounterStore()!
const rollover = ref<response.Rollover>({
  userRemainSportBetAmount: 0,
  userTotalSportBetAmount: 0,
})

const load = () => {
  fetchMyRollover().then((data) => {
    rollover.value = data
  })
}

const done = () => {
  load()
  update()
}

load()
</script>
<style lang="less">
.redeem {
  background: radial-gradient(127.02% 50% at 16.44% 0%, rgba(255, 199, 90, 0.9) 0%, #FEA800 100%);

  &__row--1 {
    --bg: #65b019;
    --1: #5685ec;
    --2: #275ac7;
    --button-bg: #b1cb3e;
    --button-color: #3b6115;
  }

  //&__row--2 {
  //  --bg: #f42a42;
  //  --1: #9841e9;
  //  --2: #791bd2;
  //  --button-bg: #fa8852;
  //  --button-color: #821d29;
  //}
  //
  //&__dates {
  //  @apply tw-grid tw-gap-4;
  //  grid-template-columns: repeat(7, 1fr);
  //}
  //
  //&__title {
  //  font-family: 'Knockout';
  //  font-weight: bold;
  //  color: #000;
  //  font-size: 36px;
  //  filter: url(#shadow3);
  //}

  &__button {
    font-weight: bold;
  }

  .van-button__text {
    color: #4C8017;
  }

  & .txt {
    margin-top: 24px;
    font-size: 24px;
    line-height: 36px;
  }
}
</style>
