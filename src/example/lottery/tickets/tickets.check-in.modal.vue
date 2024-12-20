<template>
  <Modal
    :show-button="false"
    type="ok"
    v-bind="$attrs"
  >
    <div class="tw-text-center tw-font-knockout tw-text-64 tw-text-white tw-leading-1">DAY 5</div>
    <div class="tw-text-center tw-text-24 tw-text-[#C798FA] tw-opacity-70">
      Enter the exchange code to get more tickets！
    </div>
    <div class="tw-flex tw-justify-between tw-relative tw-z-10 tw-mt-40 tw-pl-40 tw-pr-16">
      <div
        class="hr tw-border-dotted tw-border-t-4 tw-border-[#FFC033] tw-absolute tw-left-40 tw-right-40 tw-top-1/2 tw-z-[-1]"
      ></div>
      <Coin
        v-for="day in days"
        :key="day"
        :class="{ before: day < current, current: day === current, after: day > current }"
      >{{ day }}</Coin
      >
    </div>

    <div class="blindbox-stage">
      <Blindbox
        v-for="(item, index) in blindboxes"
        :key="item.fornt.begin"
        :value="item.tickets"
        :begin="item.begin"
        :end="item.end"
        :front="item.fornt"
        :active="checked === index"
        :rotate="done"
        @click="handle(index)"
      />
    </div>
  </Modal>
</template>
<script lang="ts">
const allDays = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
</script>
<script lang="ts" setup>
import Modal from '../components/Modal.vue'
import Coin from './tickets.check-in.coin.vue'
import Blindbox from './tickets.check-in.blindbox.vue'
import type { PropType } from 'vue'
import { checkin } from '@/example/apis'

const props = defineProps({
  current: {
    type: Number as PropType<number>,
    default: 5,
  },
  date: String as PropType<string>,
})

const days = computed(() => {
  const len = 5
  const offset = Math.floor(len / 2)
  const curr = props.current
  const index = allDays.findIndex((day) => day === curr)

  if (!~index) {
    throw `day参数必须在${allDays.at(0)}-${allDays.at(-1)}之间`
  }

  if (index <= offset) return allDays.slice(0, len)
  if (index >= allDays.length - 1 - offset) return allDays.slice(-len)

  return allDays.filter((_, i) => Math.abs(index - i) <= 2)
})

const blindboxes = [
  {
    fornt: { begin: '#ff6073; ', end: '#ff2d45' },
    begin: '#FF174B; ',
    end: '#DF00A2',
    tickets: 0,
  },
  {
    fornt: { begin: '#ff9a37; ', end: '#ff5800' },
    begin: '#ff9a37; ',
    end: '#ff5800',
    tickets: 0,
  },
  {
    fornt: { begin: 'rgba(255, 199, 90, 0.9); ', end: '#fea800' },
    begin: 'rgba(255, 208, 116, 0.9)',
    end: '#fea800',
    tickets: 0,
  },
]

const done = ref(false)
const checked = ref(-1)
const emit = defineEmits({})

async function handle(index: number) {
  checked.value = index
  if (done.value) {
    emit('update:show', false)
  } else {
    const { list } = await checkin({
      checkinDate: props.date,
      indexNum: index,
    })
    list.forEach((num, i) => {
      blindboxes[i].tickets = num
    })
    done.value = true
    emit('done')
  }
}
</script>
<style lang="less">
.blindbox-stage {
  position: relative;
  left: 5px;
@apply tw-flex tw-justify-between tw-mt-80;
}
</style>
