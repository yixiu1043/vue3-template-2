<template>
  <div class="example">
    <!-- svg -->
    <div class="tw-flex tw-justify-center">
      <svg-icon
        size="50"
        icon="nav-home-active"
      />
    </div>

    <!-- img -->
    <div class="tw-flex tw-justify-center">
    <img
      class="tw-w-100"
      src="../../assets/images/logo.png"
      alt=""
    />
    </div>

    <div class="tw-h-50 tw-text-center tw-leading-[50px]">{{ count }}</div>
    <div class="tw-flex tw-justify-center">
      <van-button
        type="primary"
        @click="add"
      >Add</van-button
      >
    </div>

    <!-- pinia -->
    <div>{{ example.kiwi}}</div>
    <div class="tw-h-10"></div>
    <div>{{ example.kiwi.kiwi_download_1}}</div>

    <!-- theme -->
    <div class="tw-bg-primary">主题主色1</div>
    <div class="tw-bg-secondary">主题主色2</div>
    <div class="tw-text-font-title">标题颜色</div>
    <div class="tw-bg-red-100 tw-text-font-title-dark">深色背景标题颜色</div>
    <div class="tw-text-font-primary">字体主色</div>
    <div class="tw-bg-red-100 tw-text-font-primary-dark">深色背景字体主色</div>
    <div class="tw-text-font-secondary">字体次级主色</div>
    <div class="tw-text-font-prompt">字体提示色3</div>
    <div class="tw-bg-red-100 tw-text-font-prompt-dark">深色背景字体主色</div>
    <div class="tw-bg-warning">警告色</div>
    <div class="tw-bg-danger">提示色</div>
    <div class="tw-bg-stroke1">间隔/描边色1</div>
    <div class="tw-bg-red-100 tw-text-font-stroke1-dark">深色背景间隔/描边色</div>
    <div class="tw-bg-stroke2">间隔/描边色2</div>
    <div class="tw-bg-stroke3">间隔/描边色3</div>
    <div class="tw-bg-accent1">点缀色1</div>
    <div class="tw-bg-accent2">点缀色2</div>
    <div class="tw-bg-button1">按钮颜色1</div>
    <div class="tw-bg-button2">按钮颜色2</div>
    <div class="tw-bg-yellow1">黄色1</div>
    <div class="tw-bg-yellow1">黄色1</div>
    <div class="tw-bg-gradient1">渐变色1</div>
    <div class="tw-bg-gradient2">渐变色2</div>
    <div class="tw-bg-gradient3">渐变色3</div>
    <div class="tw-bg-gradient4">渐变色4</div>
    <div class="tw-bg-gradient5">渐变色5</div>
    <div class="tw-bg-gradient6">渐变色6</div>
    <div class="tw-bg-gradient7">渐变色7</div>
    <div class="tw-bg-gradient8">渐变色8</div>
    <div class="tw-bg-gradient9">渐变色9</div>
    <div class="tw-bg-gradient10">渐变色10</div>
    <div class="tw-bg-gradient11">渐变色11</div>
    <div class="tw-bg-gradient12">渐变色12</div>
    <div class="tw-bg-gradient13">渐变色13</div>
    <div class="tw-bg-gradient14">渐变色14</div>
    <div class="var-color">在less中使用</div>
    <van-button @click="app.toggleTheme">切换主题</van-button>
  </div>
</template>
<script setup lang="ts">
import { useExampleStore } from '@/stores/example.store'
import { useAppStore } from '@/stores/app.store'

definePage({
  path: '/example',
  name: 'example',
})
const example = useExampleStore()
const app = useAppStore();

const count = ref<number>(0)

const add = () => {
  count.value++
}

onMounted(() => {
  example.fetchAppConfig()
})
</script>

<style scoped lang="less">
.var-color {
  // 使用变量
  color: var(--bg-primary);
}
</style>
