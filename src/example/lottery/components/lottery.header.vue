<template>
  <VanNavBar
    ref="header"
    z-index="100"
    class="lottery-header"
    :style="{ 'background-color': color }"
    :title="$route.meta.title"
    :border="false"
    :fixed="($attrs.fixed as boolean) ?? $route.meta.withFixedHeader"
    left-arrow
    @click-left="$router.back()"
  >
    <template
      v-for="(item, key, index) in $slots"
      :key="index"
      v-slot:[key]
    >
      <slot :name="key"></slot>
    </template>
  </VanNavBar>
  <div
    ref="trigger"
    style="position: absolute; width: 100%; pointer-events: none"
  ></div>
</template>
<script lang="ts" setup>
const props = withDefaults(defineProps<{ colour?: boolean }>(), { colour: true })

const trigger = ref<HTMLDivElement | null>(null)
const header = ref<ComponentPublicInstance | null>(null)
const alpha = ref(0)
const color = computed(() => (props.colour ? `rgba(49,0,102,${alpha.value})` : undefined))
const threshold = Array.from({ length: 11 }).map((_, i) => i / 10)

const ob = new IntersectionObserver(
  ([entry]) => {
    const n = Math.round(entry.intersectionRatio * 10)
    alpha.value = 1 - threshold[n]
  },
  {
    threshold,
  },
)

onMounted(() => {
  trigger.value!.style.height = header.value!.$el.offsetHeight + 'px'
  ob.observe(trigger.value!)

  onBeforeUnmount(() => {
    ob.unobserve(trigger.value!)
    ob.disconnect()
  })
})
</script>

<style lang="less">
.lottery-header {
  --van-nav-bar-background: none;
  --van-nav-bar-title-font-size: 48px;
  --van-nav-bar-title-text-color: white;
  --van-font-bold: normal;
  --van-nav-bar-icon-color: white;
  --van-nav-bar-arrow-size: 40px;
  .van-nav-bar__title {
  @apply tw-font-knockout;
    flex: 1;
    text-align: left;
    max-width: 70%;
  }
  .van-icon-arrow-left {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 12px;
    padding: 8px;
  }
  .van-nav-bar__right {
    padding-right: 0;
  }
}
</style>
