<template>
  <section class="record-winning">
    <h1
      class="record-winning__date"
      @click="show = true"
    >
      <span>{{ formatted }}</span>
      <img
        :class="{ active: show === true }"
        src="./img/going-down.png"
      />
    </h1>
    <div class="tw-h-8"></div>
    <Paging
      ref="page"
      :page-size="100"
      :load="load"
    >
      <template #default="{ list }">
        <Module color="radial-gradient(127.02% 50% at 16.44% 0%, #ffc184 0%, #ff9963 100%)">
          <ul class="record-winning__list">
            <Card
              v-for="item in list"
              :key="item.id"
              :ticket="item.lotteryNumber"
            />
          </ul>
        </Module>
      </template>
    </Paging>
    <div class="tw-fixed tw-left-0 deco-1">
      <img
        src="../index/img/deco-1.png"
        class="tw-w-52"
      />
    </div>
    <div class="tw-fixed tw-right-0 tw-scale-[-1] deco-2">
      <img
        src="../index/img/deco-1.png"
        class="tw-w-52"
      />
    </div>
  </section>

  <van-popup
    v-model:show="show"
    position="bottom"
  >
    <DatePicker
      v-model="model"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="show = false"
      @confirm="onConfirm"
    ></DatePicker>
  </van-popup>
</template>
<script lang="ts" setup>
import 'vant/es/date-picker/style'
import dayjs from 'dayjs'
import Card from '../components/lottery.card.vue'
import 'vant/es/date-picker/style'
import { queryLuckyDrawList } from '@/apis'
import Module from '../components/Module.vue'

const DatePicker = defineAsyncComponent(() => import('vant/es/date-picker'))

definePage({
  name: 'activity',
  meta: {
    withHeader: true,
    title: 'Daily Record of winning',
    name: 'record-winning',
  },
})

const model = ref(dayjs().format('YYYY-MM-DD').split('-'))
const minDate = new Date(2024, 1, 20)
const maxDate = new Date(2024, 5, 24)
// const maxDate = new Date(
//   Math.max(Math.min(new Date(2024, 5, 20).getTime(), Date.now()), minDate.getTime()),
// )
const show = ref(false)
const formatted = computed(() => dayjs(model.value.join('/')).format('DD MMM'))
const date = computed(() => model.value.join('-'))
const page = ref<any>()

const onConfirm = ({ selectedValues }: any) => {
  show.value = false
  // if (selectedValues.join('-') === date.value) return
  model.value = selectedValues
  page.value!.reset()
  page.value!.load()
}

const load = (option: any) => {
  return queryLuckyDrawList(
    {
      date: date.value,
      pageNum: option.pageNo,
      pageSize: option.pageSize,
      winningType: 0,
    },
    {
      loading: option.pageNo === 1,
    },
  )
}
</script>
<script lang="ts"></script>
<style lang="less">
.record-winning {
  &__date {
    background: url(./img/time-type2.png) no-repeat center/ 80%;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    color: #ffbb96;

    > img {
      margin-left: 5px;
      width: 26px;

      &.active {
        transform: rotate(180deg);
      }
    }
  }

  &__list {
  @apply tw-grid tw-gap-8 tw-grid-cols-2;
    // clip-path: var(--clip-path);
    // background-image: radial-gradient(127.02% 50% at 16.44% 0%, #ffc184 0%, #ff9963 100%);
  }

  .deco-1 {
    top: 630px;
  }

  .deco-2 {
    bottom: 170px;
  }
}
</style>
