<template>
  <button
    class="lottery__video__button"
    :class="{ active: show }"
    @click="(mount = true), (show = !show)"
    style="margin-left: 12px"
  ></button>
  <Transition
    enter-active-class="animate__animated animate__bounceIn"
    leave-active-class="animate__animated animate__bounceOut"
  >
    <video
      v-if="mount"
      v-show="show"
      v-in-out-view="handle"
      class="video"
      autoplay
      muted
      controls
      loop
      style="padding: 0 12px;"
    >
      <source
        src="./img/flower.mp4"
        type="video/mp4"
      />
    </video>
  </Transition>
</template>
<script lang="ts" setup>
const mount = ref(false)
const show = ref(false)
const handle = (out: boolean, el: HTMLVideoElement) => {
  out ? el.pause() : el.play()
}
</script>
<style lang="less">
.lottery__video__button {
  width: 275px;
  @apply tw-h-84 tw-flex tw-items-center tw-justify-end;
  background: url(./img/videoB.png) no-repeat 0 / contain;
  &::after {
    content: '';
    display: block;
    width: 0;
    border: 11px solid #fff;
    margin-right: 20px;
    opacity: 0.6;
    clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
  }
  &.active::after {
    transform: scale(-1);
  }
}
.video {
  margin-top: 10px;
  margin: auto;
  width: 99%;
  border-radius: 8%;
}
</style>
