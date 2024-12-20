<template>
  <Module
    class="check-in"
    title="DAILY CHECK-IN"
    filter-id="check-in"
  >
    <van-popover
      v-model:show="showTip"
      placement="bottom"
      class="check-in__popover"
      trigger="manual"
      :teleport="teleport"
    >
      <template #reference>
        <div
          class="check-in__dates"
          ref="teleport"
        >
          <Card
            v-for="(item, index) in dates.twoWeekList"
            :key="item.date"
            :date="item.date"
            :date-text="format(item)"
            :status="status2enum(item, index, todayIndex)"
            @click="handle"
          />
        </div>
      </template>
      <div class="tw-font-knockout tw-text-30 tw-text-[#FFBA24]">You got 1 ticket !</div>
    </van-popover>
    <div class="tw-text-22 tw-text-[#68000C] tw-opacity-70 tw-mt-16">
      Check-in daily for a chance to <span class="tw-font-bold">redeem 1-100 tickets</span> for each
      player. Turnovers will be updated on next day.
    </div>
  </Module>

  <Modal
    v-model:show="showModal"
    :key="dates.total + 1"
    :current="dates.total + 1"
    :date="activeDate"
    @done="fetchAll"
  />
  <Modal2 />
</template>
<script lang="ts" setup>
import Module from '../components/Module.vue'
import Card from './tickets.check-in.card.vue'
import Modal from './tickets.check-in.modal.vue'
import Modal2 from './tickets.check-in.modal2.vue'
import { fetch14Days, type QueryUserResponse, type TwoWeekList } from '@/example/apis'
import { status2enum, format, claimTickets } from './util'
import { useCounterStore } from '../context'
const { update } = useCounterStore()!
const dates = ref<QueryUserResponse>({
  total: 0,
  twoWeekList: Array.from<TwoWeekList>({ length: 14 }).fill({
    ableToCheckin: 0,
    alreadyCheckin: 0,
    date: '',
    today: false,
  }),
})

const showTip = ref(false)
const activeDate = ref('')
const teleport = ref()
const x = ref('0px')
const y = ref('0px')
const showModal = ref(false)
const todayIndex = computed(() => dates.value.twoWeekList.findIndex((date) => date.today))

const fetchAll = () =>
  fetch14Days().then((data) => {
    dates.value = data
  })

async function handle(date: string, e: MouseEvent) {
  if ((dates.value.total + 1) % 5 === 0) {
    // 5的倍数需要弹窗领取
    activeDate.value = date
    showModal.value = true
  } else {
    await claimTickets(date)
    const source: HTMLElement = (e.target as HTMLElement).closest('.check-in__card')!
    const info = source.getBoundingClientRect()
    x.value = info.left - info.width / 2 + 'px'
    y.value = info.bottom + 'px'
    showTip.value = true
    fetchAll()
    update()
  }
}

fetchAll()
</script>
<style lang="less">
.check-in {
  background: radial-gradient(127.02% 50% at 16.44% 0%, #ff6073 0%, #ff2d45 100%);
  &__dates {
  @apply tw-grid tw-gap-4 tw-w-full;
    grid-template-columns: repeat(7, 1fr);
  }

  .van-popover__wrapper {
    display: block;
  }

  &__popover {
    --van-popover-light-background: #6300ce;
    // left: 0 !important;
    // margin-left: -6vw !important;
    left: v-bind(x) !important;
    top: v-bind(y) !important;

    // left: var(--left);
    // top: var(--left);
    .van-popover__content {
    @apply tw-px-20 tw-w-max;
    }
  }
}
</style>
