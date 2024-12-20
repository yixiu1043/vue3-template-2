<template>
  <vue-particles
    :options="config"
  />
</template>
<script lang="ts">
import coin from './img/coin.png'

const ratio = window.devicePixelRatio

const config: any = {
  particles: {
    pauseOnBlur: true,
    pauseOnOutsideViewport: true,
    move: {
      direction: 'bottom',
      enable: true,
      outModes: 'out',
      random: false,
      speed: {
        max: 10 / ratio,
        min: 5 / ratio,
      },
      straight: true,
    },
    rotate: {
      value: { min: 0, max: 360 },
      direction: 'random',
    },
    roll: {
      direction: 'random',
      enable: true,
      value: {
        min: 0,
        max: 60,
      },
    },
    number: {
      density: { enable: true, width: 330 / ratio, height: 82.5 / ratio },
      value: 2,
      limit: {
        mode: 'wait',
        value: 10,
      },
    },
    opacity: {
      value: 0.9,
    },
    shape: {
      type: 'image',
      options: {
        image: {
          src: coin,
        },
      },
    },
    size: {
      value: { min: 20 / ratio, max: 30 / ratio },
    },
  },
  style: {
    position: 'absolute',
  },
}
</script>
<script lang="ts" setup>
import Particles from '@tsparticles/vue3'
import { loadFull } from 'tsparticles'
const app = getCurrentInstance()!.appContext.app

app.use(Particles, {
  init: loadFull,
})
</script>
