<template>
  <div class="module module-clip-path">
    <div
      class="module__top"
      v-if="title"
    >
      <div
        class="module__title"
        :class="titleClass"
      >
        {{ title }}
      </div>
      <slot name="title-right"></slot>
    </div>
    <slot></slot>
  </div>
</template>
<script lang="ts" setup>
defineOptions({
  name: 'Module',
})

const props = defineProps({
  title: {
    type: String,
  },
  color: {
    type: String,
  },
  titleClass: {
    type: String,
  },
  filterId: {
    type: String,
    default: 'my-tickets',
  },
})

const id = computed(() => `url(#${props.filterId})`)

// 查询日历签到范围，开始时间-结束时间
</script>
<style lang="less">
.module {
  @size: 32px;
  margin: 0 24px;
  border-radius: @size;
  padding: @size;
  clip-path: var(--clip-path);
  background: v-bind(color);

  &__top {
    @apply tw-flex tw-justify-between tw-items-center;
    margin-bottom: @size;
  }

  &__title {
    line-height: 1;
    @apply tw-font-HelveticaNeue tw-text-white tw-text-36 tw-uppercase;
    filter: v-bind(id);
  }
}
</style>
