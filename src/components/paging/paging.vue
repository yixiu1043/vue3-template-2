<template>
  <van-list
    v-if="initialized && list.length"
    v-model:loading="loading"
    class="paging"
    :finished="finished"
    loading-text="Loading more..."
    finished-text="---------- End ---------"
    :immediate-check="false"
    @load="load"
  >
    <slot
      :pageNo="pageNo"
      :pageSize="pageSize"
      :loading="loading"
      :finished="finished"
      :list="list"
    ></slot>
    <template #finished>
      <van-divider>End</van-divider>
    </template>
  </van-list>
  <van-empty
    v-else-if="!loading"
    image="error"
    style="height: 70vh"
  >
    <template #description>
      <span class="tw-text-white">NO DATA</span>
    </template>
  </van-empty>
</template>
<script lang="ts" generic="T extends model.Page<any>" setup>
import type * as model from '@/apis/example.api.model'

export type PagingLoadOption<T> = { pageNo: number; pageSize: number; list: model.Page<T>[] }

const list = ref<T['records']>([])
const loading = ref(true)
const initialized = ref(false)
const finished = ref(false)
let pageNo = 1

const props = defineProps<{
  formatter?: (old: T, now: T) => any
  pageSize: number
  load: (option: PagingLoadOption<T['records']>) => Promise<T>
}>()

defineSlots<{
  default(props: {
    pageNo: number
    pageSize: number
    list: T['records']
    loading: boolean
    finished: boolean
  }): any
}>()

const reset = () => {
  pageNo = 1
  loading.value = false
  finished.value = false
  list.value = [] as any
}

const load = () => {
  loading.value = true
  props
    .load({
      pageNo,
      pageSize: props.pageSize,
      list: list.value,
    })
    .then((data) => {
      finished.value = data.current >= data.pages
      if (props.formatter) {
        list.value = props.formatter(list.value as any, data.records as any)
      } else {
        list.value.push(...data.records)
      }
      pageNo++
    })
    .finally(() => {
      loading.value = false
      initialized.value = true
    })
}

defineExpose({
  reset,
  load,
})

onMounted(() => {
  load()
})
</script>
<style lang="less">
.paging {
  --van-list-text-color: #fff;
  --van-list-text-font-size: 24px;
  --van-list-text-line-height: 24px;
  --van-divider-margin: 32px;
  --van-divider-text-color: rgba(255, 255, 255, 0.5);
  --van-divider-font-size: 22px;
  --van-divider-line-height: 1;
  --van-divider-border-color: var(--van-divider-text-color);
}
</style>
