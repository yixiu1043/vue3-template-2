import { createInjectionState } from '@vueuse/core'
import { myTicketsCount } from '@/example/apis'

const [useProvideCounterStore, useCounterStore] = createInjectionState(() => {
  const count = ref(0)
  const hasNew = ref(false)
  function update() {
    myTicketsCount().then((result) => {
      hasNew.value = result.obtainNew || false
      count.value = result.ticketsCount || 0
    })
  }

  return { count, hasNew, update }
})

export { useProvideCounterStore }
export { useCounterStore }
