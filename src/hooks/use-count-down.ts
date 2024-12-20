//@ts-ignore
import countDownWorker from '@/utils/count-down-worker'

export type UseCountDownOption ={
  duration?: number
  endTime?: Date | number | string
  dayInHour?: boolean
  stringify?: boolean
  fps?: number
  id?: string | number
  formatting?: 'object' | 'array' | 'string'
}


export default function useCountDown(option: any) {
  const time = ref({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  })

  watch(
    () => [option.endTime, option.duration],
    (a, b) => {
      countDownWorker.postMessage({
        type: 'push',
        data: toRaw(option),
        id: option.id,
      })
    },
    { immediate: true },
  )

  onMounted(() => {
    countDownWorker.addEventListener('message', (e:any) => {
      if (e.data.id === option.id) {
        time.value = e.data.data
      }
    })

    onBeforeUnmount(() => {
      countDownWorker.postMessage({
        type: 'remove',
        id: option.id,
      })
    })
  })

  return time
}
