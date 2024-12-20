<template>
  <div></div>
  <div class="event-1 tw-relative">
    <img
      src="./img/event1.png"
      width="100%"
      style="padding: 0 12px"
    />
    <div class="tw-absolute tw-left-60 tw-top-98 tw-text-[#735E38] tw-text-22">
      <p>Split the finale cash pool by virtue of owned amount of tickets</p>
    </div>
    <div class="tw-absolute tw-top-166 tw-text-24 tw-left-70 tw-w-94 tw-text-center tw-text-white">
      27 Jun
    </div>
    <CoinShower
      id="tsparticles1"
      style="z-index: 10"
      class="tw-absolute tw-top-184 tw-left-132 tw-w-[474px] tw-h-94"
    />
    <div class="tw-absolute tw-top-184 tw-left-132 tw-w-[474px] tw-h-94">
      <CountUp
        :end-value="current"
        template="00,000,000"
        class="event1__count-up"
      />
    </div>
    <van-swipe
      class="!tw-absolute tw-top-[330px] tw-left-60 tw-h-92"
      autoplay="3000"
      :show-indicators="false"
      :touchable="false"
      vertical
    >
      <van-swipe-item
        v-for="(item, index) in records"
        :key="index"
      >
        <div
          v-for="sub in item"
          :key="sub.id"
          class="tw-text-24"
          v-html="join(sub)"
        >
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>
<script lang="ts" setup>
import CountUp from '@/components/count-up/count-up.vue'
import CoinShower from '../components/lottery.coin-shower.vue'
import { queryPoolData } from '@/example/apis'
import type { response } from '@/example/apis/lottery.api.model'
import { chunk } from 'lodash-es'
import dayjs from 'dayjs'
import { amountize } from '@/utils'

const current = ref(0)
const records = ref<response.DataList[][]>([])

queryPoolData({
  start: '2024-03-01',
  end: '2024-06-01',
})
  .then((data = {} as any) => {
    current.value = data.totalPrice || 20_000_000
    records.value = chunk(data.dataList, 2)
  })
  .catch(() => {
    current.value = 20_000_000
  })

function join(item: response.DataList) {
  return `<div class="tw-text-22 tw-text-[#583800]">${dayjs(item.createTime).format('DD/M')} add <span class="tw-text-[#5B00AB] tw-font-bold">₱${amountize(item.addPrice)}</span> ${item.contentText}</div>`
}
</script>

<style lang="less">
.event1__count-up {
  font-family: 'Knockout';
  font-size: 95px;
  position: absolute;
  top: -28px;
  left: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  filter: url(#event1);
}
</style>
