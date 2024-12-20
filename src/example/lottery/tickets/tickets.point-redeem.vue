<template>
  <Module
    class="points-redeem"
    title="POINTS REDEMPTION"
    filter-id="exchange-code"
  >
    <div class="tw-text-24 tw-text-[#FFFFFF] -tw-mt-16 tw-mb-16 tw-font-bold tw-flex tw-justify-between">
      <span>REMAINING QUANTITY ：{{ remainAmount.dayTotalRemainAmount
        }}</span><span>MY LIMIT：{{ remainAmount.userRemainAmount }}</span>
    </div>
    <Field
      v-model="amount"
      :maxlength="6"
      placeholder=""
    >
      <template #button>
        <van-button
          color="#FFE662"
          class="tw-shrink-0 tw-w-[220px]"
          round
          @click="show1 = true"
          :disabled="disabled"
        >
          <span
            class="tw-font-knockout tw-text-40 redeem__button"
            :class="disabled ? 'tw-text-[#888888]' : 'tw-text-[#4C8017]'"
          >REDEEM</span
          >
        </van-button>
      </template>
    </Field>
    <div class="txt">
      <p>1.Each person can exchange up to 20 Tickets per day, with each Ticket costing 100 points.</p>
      <p>2.There are a total of 50,000 Tickets available daily on a first-come, first-served basis, and the count resets
        at midnight.</p>
    </div>
  </Module>
  <Modal v-model:show="show1" :onOk="redeemByPoint">
    <div
      class="tw-text-center tw-font-knockout tw-text-36 tw-text-[#D1B1F3] tw-leading-1 tw-mt-32 tw-mb-100"
    >
      <p>Are you sure you want to</p>
      <p>redeem 1 ticket with 100 points?</p>
    </div>
  </Modal>

</template>
<script lang="ts" setup>
import Module from '../components/Module.vue'
import Modal from '../components/Modal.confirm.vue'
import Field from '../components/lottery.field.vue'
import { getIntegralRemainAmount, queryCustomerPoints, redeemByIntegral } from '@/example/apis'
import type { response } from '@/example/apis/lottery.api.model'
import { showToast } from 'vant'
import { useCounterStore } from '../context'

const { update } = useCounterStore()!

const max = 20
const amount = ref()
const show1 = ref(false)
const disabled = computed(() => (amount.value > max || !amount.value))
const remainAmount = ref<response.RemainAmount>({
  dayTotalRemainAmount: 0,
  userRemainAmount: 0,
})

const integral = ref<response.CustomerPoints>({
  integralBalance: 0,
})

async function redeemByPoint() {
  if (amount.value > remainAmount.value.dayTotalRemainAmount) {
    return showToast('Insufficient Remaining Quantity, please enter again！')
  }

  if (amount.value > remainAmount.value.userRemainAmount) {
    return showToast('The redemption quantity exceeds your limit. Please enter again.')
  }

  if (integral.value.integralBalance <= 0) {
    return showToast('Your points balance is insufficient.')
  }

  await redeemByIntegral({ ticketAmount: amount.value })
  showToast('Redemption successful！')
  load()
}

const load = () => {
  getIntegralRemainAmount().then((data) => {
    remainAmount.value = data
    update()
  })
  queryCustomerPoints().then((data) => {
    integral.value = data
    update()
  })
}

load()

</script>
<style lang="less">
.points-redeem {
  background: radial-gradient(127.02% 50% at 16.44% 0%, #FF9A37 0%, #FF5800 100%);
  --van-button-default-background: var(--button-bg);
  --van-button-default-color: var(--button-color);
  --van-button-border-width: 0;

  &__field {
    padding: var(--van-cell-vertical-padding) var(--van-cell-horizontal-padding);
    overflow: hidden;
    color: var(--van-cell-text-color);
    font-size: var(--van-cell-font-size);
    line-height: var(--van-cell-line-height);
    --van-cell-background: green;
    border-radius: 100px;

    ::placeholder {
      color: #6e607e;
    }
  }

  .van-button__text {
    color: #4C8017;
  }

  .lottery__field {
    background: #65b019;
    border: 0;
  }

  .van-cell {
    position: unset;
  }

  .van-field__control {
    background: #4F9608;
    border-radius: 42px;
    height: 84px;
    padding-left: 10px;
  }

  & .txt {
    margin-top: 24px;
    font-size: 24px;
    line-height: 36px;
  }
}
</style>
