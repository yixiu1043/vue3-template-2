<template>
  <div style="display: flex; height: 100vh">
    <div
      v-if="!awardList.length"
      :class="style.box"
    >
      <div :class="style.title">{{ amountize(count) }} Tickets is ongoing</div>
      <div :class="style.flex">
        <van-field
          v-model="num"
          placeholder="Enter the number of lottery tickets for extraction."
          type="digit"
          maxlength="3"
          :class="style.field"
          @keypress.enter="draw($event)"
        />
        <button
          :class="style.button"
          @click="draw()"
        >
          <span :class="style.buttonText">GO</span>
        </button>
      </div>
    </div>

    <div
      v-else
      :class="style.box"
      style="width: auto; height: auto; margin: auto"
    >
      <div
        :class="style.title"
        style="margin-bottom: 24px"
      >
        Tickets {{ awardList.length }}
      </div>
      <ul
        :class="style.list"
        :style="{ '--cols': cols }"
      >
        <li
          v-for="(item, index) in awardList"
          :key="index"
          :class="style.item"
        >
          <div :class="style.itemNumber">{{ item.lotteryNumber }}</div>
          <div :class="style.itemName">{{ item.loginName }}</div>
        </li>
      </ul>
      <button
        :class="style.button"
        style="display: block; margin: 0 auto"
        @click="awardList = []"
      >
        END
      </button>
    </div>
  </div>
</template>
<script setup lang="ts">
import style from './style.module.less'
import { liveLuckyDraw, pollingActivatedCount } from '@/apis/example.api'
import { amountize } from '@/utils'
import parser from './assets/parser'
import loader from './Loading'
import { showToast } from 'vant'
import { clamp } from 'lodash-es'

const awardList = ref<any[]>([])
const count = ref(0)
const num = ref('')
const cols = computed(() => clamp(Math.ceil(awardList.value.length / 6), 5, 9))

const draw = async (e?: KeyboardEvent) => {
  const n = num.value
  if (!n) return showToast('Please enter the number.')
    ;(e?.target as HTMLInputElement)?.blur()
  num.value = ''
  loader.loading()
  const [_, http] = await Promise.allSettled([
    new Promise((resolve) => {
      setTimeout(resolve, 5 * 1000)
    }),
    liveLuckyDraw({
      drawQuantity: n,
      // 1-每日，2-直播
      drawType: 2,
    }),
  ])
  if (http.status === 'fulfilled') {
    awardList.value = http.value as any
  } else {
    const msg = http.reason.message
    if (msg?.includes('timeout') || msg === 'Network Error') {
      awardList.value = parser.slice(0, Number(n))
    } else {
      showToast(http.reason.data.head.errMsg)
    }
  }
  loader.loadingdone()
}

pollingActivatedCount
  .then((data) => {
    count.value = data
  })
  .start()
</script>
