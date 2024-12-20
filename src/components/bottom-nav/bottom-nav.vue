<template>
  <div class="bottom-nav">
    <van-tabbar route v-model="active" active-color="#6C64F3" inactive-color="#16181F4D">
      <van-tabbar-item replace to="/home">
        <span class="tw-ml-4">首页</span>
        <template #icon="props">
          <svg-icon size="20" :icon="props.active ? 'nav-home-active' : 'nav-home-inactive'" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item replace to="/bet">
        <span class="tw-ml-4">投注</span>
        <template #icon="props">
          <svg-icon size="20" :icon="props.active ? 'nav-bet-active' : 'nav-bet-inactive'" />
        </template>
        </van-tabbar-item>
      <van-tabbar-item replace to="/win">
        <span class="tw-ml-4">开奖</span>
        <template #icon="props">
          <svg-icon size="20" :icon="props.active ? 'nav-record-active' : 'nav-record-inactive'" />
        </template>
        </van-tabbar-item>
      <van-tabbar-item replace to="/rule">
        <span class="tw-ml-4">说明</span>
        <template #icon="props">
          <svg-icon size="20" :icon="props.active ? 'nav-manual-active' : 'nav-manual-inactive'" />
        </template>
        </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script setup lang="ts">
const active = ref(0)
</script>

<style scoped lang="less">
.bottom-nav {
  //.van-tabbar-item {
  //  display: flex;
  //  flex-direction: row;
  //}

  ::v-deep(.van-tabbar-item) {
    display: flex;
    flex-direction: row;
  }
}
</style>