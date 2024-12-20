<template>
  <div class="event-2 tw-relative">
    <img
      src="./img/2copy.png"
      width="100%"
      style="padding: 0 5px"
    />
    <router-link
      to="/luckydraw/apl-record"
      class="tw-absolute tw-bg-[#f22310] tw-rounded-8 tw-leading-[52px] tw-px-16 tw-top-110 tw-right-30 tw-text-white"
    >
      Record of winning</router-link
    >

    <div
      class="tw-absolute tw-top-[570px] tw-w-[500px] tw-left-124 event2__button"
      :class="text === 'on-going' ? 'event2__button--going' : ''"
      @click="hanlde"
    >
      {{ text }}
    </div>
  </div>
</template>
<script lang="ts" setup>
import { queryOnGoing } from '@/example/apis'
import dayjs from 'dayjs'

const text = ref('')
const url = ref('')

const hanlde = () => {
  if (url.value) {
    window.location.href = url.value
  }
}

queryOnGoing()
  .then((data) => {
    if (data.apl) {
      text.value =
        dayjs(data.apl.aplDate + ' ' + data.apl.aplTime).format('DD/M H:mm') + ' draw again'
    } else if (data.sabaMatchRsp) {
      const params = new URLSearchParams({
        ...data.sabaMatchRsp,
        title: data.sabaMatchRsp.leagueName,
      })
      url.value = '/liveSportGameV3?' + params.toString()
      text.value = 'on-going'
    } else {
      throw ''
    }
  })
  .catch(() => {
    text.value = 'coming soon'
  })
</script>

<style lang="less">
.event2__button {
  background: radial-gradient(224.77% 50% at 16.44% 0%, #ff5727 0%, #f03600 100%);
  color: #5000a6;
  width: 502px;
  height: 92px;
@apply tw-flex tw-justify-center tw-items-center tw-gap-8 tw-text-48 tw-font-knockout tw-rounded-100 tw-uppercase;

  &--going {
    background: radial-gradient(224.77% 50% at 16.44% 0%, #ffce71 0%, #fea800 100%);
  }
}
</style>
