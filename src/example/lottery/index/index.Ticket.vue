<template>
  <div ref="container">
    <img
      v-in-out-view="handle"
      src="./img/tickets.png"
      class="tw-absolute tw-right-0 tw-top-[100px] tw-w-[196px] tw-h-[725px] tw-pointer-events-none tw-z-10"
    />
    <!-- <img
      src="./img/ticket.png"
      class="lottery__flying-ticket"
    /> -->
  </div>
</template>
<script lang="ts" setup>
import ticket from './img/ticket.png'
const container = ref<HTMLDivElement>()
let timer = 0
function handle(out: boolean) {
  window.clearInterval(timer)
  if (!out) {
    timer = window.setInterval(() => {
      const image = new Image()
      image.src = ticket
      image.className = 'lottery__flying-ticket'
      image.onanimationend = () => {
        image.remove()
        image.onanimationend = null
      }
      container.value!.appendChild(image)
    }, 300)
  }
}
</script>

<style lang="less">
.lottery__flying-ticket {
  @apply tw-absolute  tw-w-80 tw-h-30 tw-pointer-events-none;
  top: 794px;
  right: 91px;
  will-change: transform, opacity;
  animation: flying-ticket 3s forwards;
  z-index: 10;

  @keyframes flying-ticket {
    // 70% {
    //   transform: translate3d(0, 200px, 0);
    //   opacity: 1;
    // }
    to {
      transform: translate3d(0, 200px, 0)  scale3d(0.8, 0.8, 1);
      opacity: 0;
    }
  }
}
</style>
