<template>
  <div class="tw-h-20"></div>
  <Module
    v-if="prizes.length"
    :title="`PRIZE WINNING TICKETS ${prizes.length}`"
    title-class="!tw-font-knockout !tw-font-normal !tw-text-42"
    filter-id="exchange-code"
    color="radial-gradient(127.02% 50% at 16.44% 0%, #9636FF 0%, #6E0ADB 100%)"
  >
    <div class="tw-grid tw-gap-8 tw-grid-cols-2 tw-min-h-198">
      <Card
        v-for="item in prizes"
        :type="2"
        :key="item.id"
        :ticket="item.lotteryNumber"
      />
    </div>
  </Module>

  <div class="tw-h-8"></div>
  <Module
    v-if="initialized"
    :title="`TICKETS ` + total"
    title-class="!tw-font-knockout !tw-font-normal !tw-text-42"
    filter-id="exchange-code"
    color="radial-gradient(127.02% 50% at 16.44% 0%, #9636FF 0%, #6E0ADB 100%)"
  >
    <VanList
      v-model:loading="loading"
      :finished="finished"
      loading-text="loading more..."
      finished-text="---------- End ---------"
      @load="loadTickets"
    >
      <div class="tw-grid tw-gap-8 tw-grid-cols-2 tw-min-h-198">
        <Card
          v-for="item in tickets"
          :key="item.id"
          :type="item.lotteryStatus === 4 ? 4 : item.lotteryStatus === 5 ? 5 : 3"
          :ticket="item.lotteryNumber"
          :is-new="lastId !== 0 && item.id > lastId"
        />
      </div>
    </VanList>
  </Module>
</template>
<script lang="ts" setup>
import Module from '../components/Module.vue'
import Card from '../components/lottery.card.vue'
import { fetchMyTickets, fetchMyWonTickets } from '@/example/apis'
import loader from '@/components/loading/loading'
import type { response } from '@/example/apis/lottery.api.model'
import { useCounterStore } from '../context'

const { count, hasNew } = useCounterStore()!
const initialized = ref(false)
const isEmpty = inject('isEmpty') as Ref<boolean>
const prizes = ref<response.MyTickets2['wonList']['wonTickets']>([])
const tickets = ref<response.MyTickets2['ticketList']['awaitingWinTickets']>([])
const loading = ref(false)
const finished = ref(false)
const lastId = ref(0)
let id = 0
const pageSize = 100
const total = computed(() => count.value - prizes.value.length)

const loadTickets = (...a: any) => {
  loading.value = true
  return fetchMyTickets({
    pageSize,
    offset: id,
  })
    .then((data) => {
      const len = data.ticketList.awaitingWinTickets?.length || 0
      prizes.value = data.wonList?.wonTickets || []
      tickets.value = [...tickets.value, ...data.ticketList.awaitingWinTickets]
      lastId.value ||= data.ticketList.lastId
      id = tickets.value.at(-1)!.id ?? 0
      if (pageSize > len) {
        finished.value = true
      }

      return data
    })
    .finally(() => {
      loading.value = false
    })
}

onMounted(async () => {
  const close = loader()
  const [{ wonList }] = await Promise.all([fetchMyWonTickets(), loadTickets()])
  close()
  prizes.value = wonList.wonTickets
  initialized.value = true
  isEmpty.value = !tickets.value.length
  /** 更新未读状态 */
  hasNew.value = false
})
</script>
<style lang="less"></style>
