<template>
  <VanPopup
    style="background: none; --van-padding-md: 0"
    teleport="body"
    v-bind="$attrs"
  >
    <div class="modal__main tw-pt-[416px] tw-pb-80 tw-px-120 tw-flex tw-flex-col">
      <a
        class="!tw-absolute tw-right-42 tw-top-144"
        @click="close"
      >
        <img
          src="../index/img/modal-icon-close.png"
          class="tw-w-78"
        />
      </a>

      <div class="modal__main__icon">
        <img
          v-if="type === 'ok'"
          src="../index/img/modal-icon-ok.png"
          class="tw-w-135 tw-m-auto -tw-mt-[297px]"
        />
        <img
          v-else
          src="../index/img/modal-icon-fail.png"
          class="tw-w-126 tw-mx-auto -tw-mt-20"
        />
      </div>

      <slot> </slot>

      <VanButton
        v-if="showButton"
        class="!tw-mt-auto !tw-mx-auto tw-w-[462px] tw-uppercase"
        color="radial-gradient(224.77% 50% at 16.44% 0%, #FFCE71 0%, #FEA800 100%)"
        round
        @click="handle"
      >
        <span class="tw-font-knockout tw-text-[#5000A6] tw-text-48">{{ buttonText }}</span>
      </VanButton>
    </div>
  </VanPopup>
</template>
<script lang="ts" setup>
const attrs: any = useAttrs()
const props = withDefaults(
  defineProps<{
    type?: 'ok' | 'fail'
    showButton?: boolean
    buttonText?: string
    autoClose?: boolean
    clickButton?: VoidFunction
  }>(),
  {
    type: 'ok',
    buttonText: 'OK',
    showButton: true,
  },
)

function close() {
  console.log(13123);

  attrs['onUpdate:show']?.(false)
}

function handle() {
  ;(props.clickButton || close)()
}
</script>

<style lang="less">
.modal__main {
  width: 750px;
  height: 1134px;
  background: url('../index/img/modal-bg.png') no-repeat center center/contain;
}
</style>
