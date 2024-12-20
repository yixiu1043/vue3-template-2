<template>
  <div class="tw-flex">
    <svg
      width="4.6vw"
      viewBox="0 0 49 64"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        d="M49 19.3216V12.7653H44.2426C43.4147 9.52329 41.9918 6.91814 39.9738 4.9498C36.5588 1.64993 31.9796 0 26.2362 0H5.93307V12.7653H0V19.3216H5.93307V21.4491H0V28.0054H5.93307V64H17.808V40.9878H25.3436C31.6821 40.9878 36.5588 39.4247 39.9738 36.2985C42.0694 34.3881 43.5182 31.6237 44.3202 28.0054H49V21.4491H45.0576C45.0834 21.0728 45.0964 20.682 45.0964 20.2768V19.3216H49ZM33.2214 19.3216C33.2473 19.6689 33.2602 20.0163 33.2602 20.3636C33.2602 20.7399 33.2473 21.1018 33.2214 21.4491H17.808V19.3216H33.2214ZM24.3346 29.9593C26.9218 29.9593 28.9785 29.308 30.5049 28.0054H17.808V29.9593H24.3346ZM17.808 11.1153H24.3346C26.8183 11.1153 28.8104 11.6653 30.3109 12.7653H17.808V11.1153Z"
      />
    </svg>
    <div ref="el" class="tw-tracking-wide tw-ml-8"></div>
  </div>
</template>
<script lang="ts"></script>
<script lang="ts" setup>
//@ts-nocheck
import { CountUp, type CountUpOptions } from 'countup.js'
const el = ref(null as unknown as HTMLDivElement)
const props = defineProps<CountUpOptions & { endValue: number; template?: string }>()

onMounted(() => {
  const { template, endValue, ...$props } = toRaw(props)

  $props.enableScrollSpy ??= true
  $props.scrollSpyOnce ??= true
  $props.scrollSpyDelay ??= 300
  $props.duration ??= 2

  let countUp = new CountUp(el.value, endValue, {
    smartEasingAmount: 0,
    scrollSpyDelay: true,
    scrollSpyOnce: true,
    enableScrollSpy: true,
    plugin: {
      render(elem, formatted) {
        if (template) {
          formatted = template.substring(0, template.length - formatted.length) + formatted
        }
        let dom = ''
        for (const t of formatted) {
          dom += `<span class="count-up count-up--${t}">${t}</span>`
        }
        elem.innerHTML = dom
      },
    },
  })

  // countUp.start()

  watch(
    () => props.endValue,
    (value) => {
      countUp.update(value)
    },
  )
  onBeforeUnmount(() => {
    countUp = null as any
  })
})
</script>
