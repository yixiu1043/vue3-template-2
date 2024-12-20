<template>
  <div class="redeem__row">
    <div class="tw-flex-1 tw-min-w-0 tw-mr-32">
      <div class="tw-flex tw-items-center tw-gap-8 tw-mb-8">
        <img
          :src="icon"
          class=""
        />
        <div class="tw-text-24 tw-font-bold tw-text-white">{{ typeName }}</div>
      </div>
      <Process
        :value="value"
        :max="max"
        color="blue"
      />
    </div>

    <van-button
      v-auth:click="handle"
      style="left: 10px"
      class="tw-shrink-0 tw-w-[220px]"
      color="#FFE662"
      :disabled="disabled"
      round
    >
      <span
        class="tw-font-knockout tw-text-40 redeem__button"
        :class="disabled ? 'tw-text-[#888888]' : 'tw-text-[#4C8017]'"
      >REDEEM</span
      >
    </van-button>
    <Modal v-model:show="showModal">
      <div class="tw-flex tw-items-center tw-justify-center tw-gap-8 tw-mb-8 -tw-mt-24">
        <img
          :src="icon"
          class="tw-w-26"
        />
        <div class="tw-text-26 tw-font-bold tw-text-white">{{ typeName }}</div>
      </div>
      <div
        class="tw-text-38 tw-font-bold tw-text-white tw-font-knockout tw-opacity-70 tw-text-center"
      >
        YOUR TURNOVERS ARE {{ $filter.amountize(value) }}
      </div>
      <div
        class="tw-text-[#C798FA] tw-text-24 tw-opacity-70 tw-px-8"
      >
        The turnovers were calculated as of yesterday, and today's turnover can be redeemed for
        tickets after 5PM tomorrow.
      </div>
      <div class="tw-text-center">
        <div class="tw-text-white tw-text-66 tw-font-knockout tw-leading-1 tw-mt-16">You will get</div>
        <div class="tw-text-[#FFBE3F] tw-text-86 tw-font-knockout tw-leading-1 tw-mt-16">
          {{ $filter.amountize(count) }} tickets
        </div>
        <div class="tw-text-white tw-text-28 tw-leading-8 tw-mt-24 tw-text-center tw-px-8">
          <p>The tickets will be released to your</p>
          <p>account in about 10 minutes</p>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script lang="ts" setup>
import Modal from '../components/Modal.vue'
import Process from './tickets.redeem.process.vue'
import { redeemByOtherRollover, redeemBySportRollover } from '@/example/apis'

const props = defineProps<{
  icon: string
  typeName: 'OTHERS' | 'SPORTS'
  value: number
  filter: string
}>()

const isSport = computed(() => props.typeName === 'SPORTS')
const max = computed(() => (isSport.value ? 1000 : 2000))
const disabled = computed(() => (props.value < max.value))
const showModal = ref(false)
const count = ref(0)
const emit = defineEmits({})

async function handle() {
  const redeem = !isSport.value ? redeemByOtherRollover : redeemBySportRollover
  count.value = await redeem()
  showModal.value = true
  emit('done')
}
</script>
<style lang="less">
.redeem__row {
@apply tw-flex tw-rounded-116 tw-py-16 tw-px-32;
  background-color: var(--bg);
  --van-button-default-background: var(--button-bg);
  --van-button-default-color: var(--button-color);
  --van-button-border-width: 0;
}
</style>
