<template>
  <Modal type="fail">
    <div class="modal_title tw-text-64 tw-text-[#C798FA] tw-text-center tw-font-knockout">
      {{ title }}
    </div>
    <div class="tw-text-36 tw-text-[#C798FA] tw-text-center">
      <div class="tw-text-left tw-inline-block">{{ message }}</div>
    </div>
  </Modal>
</template>
<script lang="ts" setup>
import type { PropType } from 'vue'
import Modal from './Modal.vue'
defineProps({
  title: {
    type: String as PropType<string>,
    default: 'UNFORTUNATELY',
  },
  message: {
    type: String as PropType<string>,
    required: true,
  },
})
</script>

<style lang="less">
.modal__main {
  width: 750px;
  height: 1134px;
  background: url('../index/img/modal-bg.png') no-repeat center center/contain;
}
</style>
