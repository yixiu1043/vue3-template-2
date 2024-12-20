import { createInjectionState } from '@vueuse/core'

const [useProvideCounterStore, useCounterStore] = createInjectionState(() => {
  function update() {
    // global props
  }

  return { update }
})

export { useProvideCounterStore }
export { useCounterStore }
