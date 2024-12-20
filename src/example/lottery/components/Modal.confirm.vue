<template>
  <VanPopup
    style="background: none; --van-padding-md: 0"
    teleport="body"
    v-bind="$attrs"
  >
    <div class="modal__main-confirm tw-pt-[416px] tw-pb-80 tw-px-112 tw-flex tw-flex-col">
      <a
        class="!tw-absolute tw-right-42 tw-top-144"
        @click="close"
      >
        <img
          src="../index/img/modal-icon-close.png"
          class="tw-w-78"
        />
      </a>

      <slot> </slot>

      <div class="tw-flex">
        <VanButton
          v-if="showCancelButton"
          class="!tw-mt-auto !tw-mx-auto tw-uppercase tw-flex-1"
          color="radial-gradient(224.77% 50% at 16.44% 0%, #EAEAEA 0%, #A3A3A3 100%)"
          round
          @click="handleCancel"
        >
          <span class="tw-font-knockout tw-text-[#5000A6] tw-text-48">{{ cancelText }}</span>
        </VanButton>
        <div class="tw-w-[8px]"></div>
        <VanButton
          v-if="showOkButton"
          class="!tw-mt-auto !tw-mx-auto tw-uppercase tw-flex-1"
          color="radial-gradient(224.77% 50% at 16.44% 0%, #FFCE71 0%, #FEA800 100%)"
          round
          @click="handleOk"
        >
          <span class="tw-font-knockout tw-text-[#5000A6] tw-text-48">{{ buttonText }}</span>
        </VanButton>
      </div>

    </div>
  </VanPopup>
</template>
<script lang="ts" setup>
const attrs: any = useAttrs()
const props = withDefaults(
  defineProps<{
    showOkButton?: boolean
    showCancelButton?: boolean
    buttonText?: string
    cancelText?: string
    onOk?: VoidFunction
    onCancel?: VoidFunction
  }>(),
  {
    buttonText: 'OK',
    cancelText: 'Cancel',
    showOkButton: true,
    showCancelButton: true,
  },
)

function close() {
  attrs['onUpdate:show']?.(false)
}

function handleOk() {
  ;(props.onOk || close)()
}

function handleCancel() {
  ;(props.onCancel || close)()
}

</script>

<style lang="less">
.modal__main-confirm {
  width: 750px;
  height: 936px;
  background: url('../index/img/modal-confirm-bg.png') no-repeat center center/contain;

  .van-button {
    height: 68px;
  }
}
</style>
