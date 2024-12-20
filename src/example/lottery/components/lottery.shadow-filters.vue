<template>
  <svg
    width="0"
    height="0"
    style="position: fixed; visibility: hidden"
  >
    <defs>
      <filter
        v-for="filter in _filters"
        :key="filter.id"
        :id="filter.id"
      >
        <feDropShadow
          v-for="color in filter.colors"
          :key="color.color"
          :dx="pxtovw(color.x ?? filter.x ?? 0, filter.vw)"
          :dy="pxtovw(color.y ?? filter.y ?? 1, filter.vw)"
          stdDeviation="0"
          :flood-color="color.color"
          flood-opacity="1"
        />
      </filter>
    </defs>
  </svg>
</template>
<script setup lang="ts">
import { amountize } from '@/utils'
const w = window.innerWidth
// const w = window.innerWidth * window.devicePixelRatio

type numeric = number | `${number}`
type Color = { color: string; x?: numeric; y?: numeric }
type Option<T> = {
  id: string
  colors: T[]
  x?: numeric
  y?: numeric
  vw?: boolean
}
const pxtovw = (x: numeric, vw?: boolean) => {
  return vw === false ? x : amountize((Number(x) / 750) * w)
}

const filters: Option<string | Color>[] = [
  {
    id: 'event3',
    y: -1,
    colors: ['#FF0060', '#940EE6', '#FF8B49', '#FF4F4F', '#FF2395'],
  },
  {
    id: 'event1',
    colors: [{ color: '#6800C4', y: 2.5 }, '#FF9B00', '#FF5C00', '#FF0000', '#EF0000'],
  },
  {
    id: 'check-in__title',
    colors: ['#000000', '#1958D9', '#C3B90D'],
  },
  {
    id: 'check-in',
    colors: ['#000000', '#1958D9', '#C3B90D'],
    y: 2,
    x: -2,
  },
  {
    id: 'redeem-tickets',
    colors: ['#65B019', '#F42A42', '#9B0EC6'],
    y: 2,
    x: 2,
  },
  {
    id: 'exchange-code',
    colors: ['#000000', '#E10000', '#009071'],
    y: 2,
    x: -2,
  },
  {
    id: '4',
    colors: ['#65B019', '#6800D9', '#F42A42'],
  },
  {
    id: 'my-tickets',
    x: -2.5,
    y: 2.5,
    colors: ['#000000', '#1958d9', '#c3b90d'],
  },
  {
    id: 'modal',
    y: -1,
    colors: ['#11CD24', '#2E71FF', '#C22EFF', '#FF2E7A'],
  },
  {
    id: 'redeem1',
    colors: ['#7bb824', '#ad8a33', '#7c7b67c'],
  },
  {
    id: 'redeem2',
    colors: ['#f64647', '#c47538', '#c5377c'],
  },
  {
    id: 'exchange',
    x: 1,
    colors: ['#f42a42', '#65b019', '#6800d9'],
  },
  {
    id: 'invite',
    x: 1,
    colors: ['#000000', '#FF5923', '#48BC1C', '#1AA35B', '#076BB0', '#0408AE'],
  },
  {
    id: 'invite-button',
    x: 1,
    colors: ['#FFC700', '#EA0000', '#35A600'],
  },
  {
    id: 'invite2',
    x: 1,
    vw: false,
    colors: ['#000000', '#FF5923', '#48BC1C', '#1AA35B', '#076BB0', '#0408AE'],
  },
  {
    id: 'coin',
    y: 1.3,
    colors: ['#37006A', '#FF8900', '#00A800'],
  },
]

const _filters = filters.map((i) => {
  i.colors = i.colors.map((c) => (typeof c === 'string' ? { color: c } : c))
  return i as Option<Color>
})
</script>
