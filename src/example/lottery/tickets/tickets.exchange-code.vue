<template>
  <Module
    class="exchange"
    title="EXCHANGE CODE"
    filter-id="exchange-code"
  >
    <div class="tw-text-24 tw-text-[#C798FA] -tw-mt-16 tw-mb-16">
      Enter the exchange code to get more tickets！
    </div>
    <Field
      v-model="code"
      :maxlength="maxlength"
      placeholder="Enter the exchange code"
    >
      <template #button>
        <van-button
          color="#f42a42"
          class="tw-shrink-0 tw-w-[220px]"
          round
          @click="exchange"
          :disabled="disabled"
        >
          <span
            class="tw-font-knockout tw-text-40 redeem__button"
          >REDEEM</span
          >
        </van-button>
      </template>
    </Field>
  </Module>
  <Modal v-model:show="show1">
    <div
      class="tw-text-center tw-font-knockout tw-text-64 tw-text-[#FFA800] tw-leading-1 tw-mt-32 tw-mb-32"
    >
      CONGRATULATIONS
    </div>

    <coupons :tickets="count" />
  </Modal>
  <ModalError
    v-model:show="show2"
    :message="reason"
  >
  </ModalError>
</template>
<script lang="ts" setup>
import Module from '../components/Module.vue'
import ModalError from '../components/Modal.error.vue'
import Modal from '../components/Modal.vue'
import Field from '../components/lottery.field.vue'
import coupons from '../components/lottery.coupons.vue'
import { showToast } from 'vant'
import { redeemByCode } from '@/example/apis'
import { useCounterStore } from '../context'
const { update } = useCounterStore()!

const maxlength = 7
const regexp = /^[A-za-z0-9]{7}$/
const code = ref('')
const show1 = ref(false)
const show2 = ref(false)
const count = ref(0)
const reason = ref('')
const disabled = computed(() => (!regexp.test(code.value)))

async function exchange() {
  const value = code.value
  if (!regexp.test(value)) {
    return showToast(
      'Exchange code must be at least ' + maxlength + ' characters, letters and numbers only',
    )
  }
  redeemByCode({ code: code.value })
    .then((data) => {
      count.value = data
      show1.value = true
      update()
    })
    .catch((err) => {
      if (err.data.head.errMsg) {
        reason.value = err.data.head.errMsg
        show2.value = true
      }
    })
}
</script>
<style lang="less">
.exchange {
  background: radial-gradient(127.02% 50% at 16.44% 0%, #9636ff 0%, #6e0adb 100%);
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
}
</style>
