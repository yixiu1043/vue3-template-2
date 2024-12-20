<template>
  <Header :fixed="false" />
  <div class="tickets">
    <div class="registration">
      <img
        src="./img/reg-ticket.png"
      />
    </div>
    <Redeem />
    <PointRedeem />
    <ExchangeCode />
<!--    <Invite />-->
    <MoreWays />
    <div class="tw-fixed tw-left-0 tw-top-1/4">
      <img
        src="../index/img/deco-1.png"
        class="tw-w-52"
      />
    </div>
    <div class="tw-fixed tw-right-0 tw-bottom-180 tw-scale-[-1]">
      <img
        src="../index/img/deco-1.png"
        class="tw-w-52"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import Header from '../components/lottery.header.tickets.vue'
// import CheckIn from './tickets.check-in.vue'
import Redeem from './tickets.redeem.vue'
import PointRedeem from './tickets.point-redeem.vue'
import ExchangeCode from './tickets.exchange-code.vue'
// import Invite from './tickets.invite.vue'
import MoreWays from './tickets.more-ways.vue'

definePage({
  meta: {
    title: 'HOW TO GET TICKETS！',
    authentication: true,
  },
})
</script>
<style lang="less">
.page-luckydraw-tickets {
  background: url(./img/bg.png) no-repeat top center/100% auto;
}

.tickets {
@apply tw-grid tw-gap-8;

  .registration {
    margin: 0 24px;
  }
}
</style>
