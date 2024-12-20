<template>
  <van-field
    class="lottery__field"
    v-bind="props"
  >
    <template
      v-for="(item, key) in $slots"
      :key="key"
      v-slot:[key]
    >
      <slot :name="key"></slot>
    </template>
  </van-field>
</template>
<script lang="ts" setup>
import type { FieldProps } from 'vant'
interface Props extends /*@vue-ignore */ FieldProps {}

const props = defineProps<Partial<Props>>()
</script>
<style lang="less">
.lottery__field {
  // padding: var(--van-cell-vertical-padding) var(--van-cell-horizontal-padding);
  overflow: hidden;
  // color: var(--van-cell-text-color);
  // font-size: var(--van-cell-font-size);
  // line-height: var(--van-cell-line-height);
  --van-cell-background: rgb(197, 157, 241);
  border-radius: 100px;

  ::placeholder {
    color: #6e607e;
  }
}
</style>
