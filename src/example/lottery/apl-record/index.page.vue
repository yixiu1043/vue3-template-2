<template>
  <Paging
    :page-size="100"
    :load="load"
  >
    <template #default="{ list }">
      <div
        class="apl-record"
        v-for="L1 in categorized(list)"
        :key="L1.date"
      >
        <h1 class="apl-record__time">{{ L1.date }}</h1>
        <Module
          v-for="L2 in L1.chidlren"
          :key="L2.prizeName"
          class="apl-record__block"
          color="radial-gradient(127.02% 50% at 16.44% 0%, #9636FF 0%, #6E0ADB 100%)"
          :title="L2.prizeName"
          title-class="!tw-font-knockout !tw-text-48"
          filter-id="none"
        >
          <ul class="apl-record__list">
            <Card
              v-for="item in L2.children"
              :key="item.id"
              :type="1"
              :ticket="item.lotteryNumber"
            />
          </ul>
        </Module>
      </div>
    </template>
  </Paging>
</template>
<script lang="ts">
import type { response } from '@/example/apis'
import { groupBy } from 'lodash-es'
import dayjs from 'dayjs'
type T = response.LuckyDrawList['records']

type List = {
  date: string
  chidlren: { prizeName: string; children: T }[]
}[]
function categorized(list: T) {
  console.log();

  const chunks: List = []

  const l1 = groupBy(list, 'createTime')
  for (const [date, list1] of Object.entries(l1)) {
    const l2 = groupBy(list1, 'prizeName')
    const chunk: (typeof chunks)[number] = {
      date,
      chidlren: [],
    }
    for (const [prizeName, list2] of Object.entries(l2)) {
      chunk.chidlren.push({
        prizeName,
        children: list2.sort((x, y) => x.prizeName.localeCompare(y.prizeName)),
      })
    }

    chunks.push(chunk)
  }

  return chunks
}
</script>
<script lang="ts" setup>
import { queryLuckyDrawList } from '@/apis'
import Card from '../components/lottery.card.vue'
import Module from '../components/Module.vue'

definePage({
  name: 'apl-record',
  meta: {
    withHeader: true,
    title: 'APL RECORD OF WINNIN',
    name: '首页',
  },
})

function load(option: any) {
  return queryLuckyDrawList({
    winningType: 1,
    pageNum: option.pageNo,
    pageSize: option.pageSize,
    date: '',
  }).then((data) => {
    data.records.forEach((item) => {
      item.createTime = dayjs(item.createTime).format('DD MMMM')
    })
    return data
  })
}
</script>
<style lang="less">
.apl-record {
@apply tw-grid tw-gap-8;
  &__time {
    background: url(./img/time-type.png) no-repeat center/ 80%;
    text-align: center;
    color: #c38bff;
  }
  &__list {
  @apply tw-grid tw-grid-cols-2 tw-gap-8 tw-font-knockout;
  }
  & + & {
    > .apl-record__time {
      margin-top: 32px;
    }
  }
}
</style>
