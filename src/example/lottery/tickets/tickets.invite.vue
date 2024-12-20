<template>
  <Module
    class="invite"
    title="INVITE FRIENDS"
    filter-id="redeem-tickets "
  >
    <template
      v-if="invitedUsers.length"
      #title-right
    >
      <InviteButton size="small" />
    </template>
    <div
      v-if="invitedUsers.length"
      class=""
    >
      <div class="invite__table">
        <div class="invite__row">
          <div
            class="invite__col"
            style="color: #ad4104"
          >
            Username
          </div>
          <div
            class="invite__col"
            style="color: #ad4104"
          >
            Register Date
          </div>
          <div
            class="invite__col"
            style="color: #ad4104"
          >
            First Deposit Status
          </div>
        </div>
        <div
          v-for="user in invitedUsers"
          :key="user.id"
          class="invite__row"
        >
          <div class="invite__col">{{ user.inviteTo }}</div>
          <div class="invite__col">{{ user.registerTime.slice(0, 10) }}</div>
          <div class="invite__col">
            <van-button
              v-if="user.lotteryRedeemStatus === 2"
              size="small"
              color="#6D00E2"
              class="tw-shrink-0"
              block
              round
              @click="redeem(user.id)"
            >
              <span class="tw-text-white tw-text-36">REDEEM</span>
            </van-button>
            <span v-else>{{ user.lotteryRedeemStatus === 1 ? 'In Progress' : 'Succeed' }} </span>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="tw-flex"
    >
      <div class="tw-text-24 tw-mr-16 tw-tracking-wider tw-text-justify tw-font-bold">
        Invite friends to register and complete the first deposit, two people each get a
        ticket！Referrer can get up to 5 tickets.
      </div>
      <InviteButton />
    </div>
  </Module>
</template>
<script lang="ts" setup>
import { queryInviteRecord, type response, redeemByInvite } from '@/example/apis'
import Module from '../components/Module.vue'
import InviteButton from './tickets.invite.button.vue'
import { useCounterStore } from '../context'

const { update } = useCounterStore()!

const invitedUsers = ref<response.InvitedUser[]>([])

queryInviteRecord().then((data = []) => {
  invitedUsers.value = data.slice(0, 10)
})

async function redeem(id: string) {
  await redeemByInvite({ id })
  queryInviteRecord()
  update()
}
</script>
<style lang="less">
.invite {
  background: radial-gradient(127.02% 50% at 16.44% 0%, #ff9a37 0%, #ff5800 100%);
  &__table {
  @apply tw-grid tw-gap-8;
  }
  &__row {
  @apply tw-grid tw-gap-8 tw-h-72 tw-items-center;
    grid-template-columns: 1fr 1fr 1.2fr;
  }
  &__col {
    color: #5c2000;

    &:nth-child(1) {
    @apply tw-text-left;
    }
    &:nth-child(2) {
    @apply tw-text-center;
    }
    &:nth-child(3) {
    @apply tw-text-right;
    }
  }
}
</style>
