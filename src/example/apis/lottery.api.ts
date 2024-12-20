import { Polling, post } from '@/apis/http'
import type * as model from './lottery.api.model'

/** 查询14天的签到数据 */
export const fetch14Days = post<model.QueryUserResponse>('/integralLottery/queryUser', {
  loading: false,
})
/** 签到 */
export const checkin = post<model.response.Checkin>('/integralLottery/checkin')
/** 总签到天数 */
export const fetchAllDays = post<model.QueryUserResponse>('/lottery/totalCheckin')
/** 兑换彩票-兑换码 */
export const redeemByCode = post<number>('/integralLottery/exchangeCodeRedeem', {
  silent: true,
})
/** 兑换彩票-邀请 */
export const redeemByInvite = post<model.QueryUserResponse>('/lottery/inviteExchange')
/** 兑换彩票-其他投注额 */
export const redeemByOtherRollover = post<number>('/integralLottery/otherRedeem')
/** 兑换彩票-体育投注额 */
export const redeemBySportRollover = post<number>('/integralLottery/sportBetRedeem')
/** 查询我的未中奖彩票 */
export const fetchMyTickets = post<model.response.MyTickets2>('/integralLottery/getMyWaitingLottery', {
  loading: false,
})
/** 查询我的中奖彩票 */
export const fetchMyWonTickets = post<model.response.MyTickets2>('/integralLottery/myWonTickets', {
  loading: false,
})
/** 查询我的投注额 */
export const fetchMyRollover = post<model.response.Rollover>('/integralLottery/getBetAmontAboutNBA', {
  loading: false,
})
/** 查詢邀請名單 */
export const queryInviteRecord = post<model.response.InvitedUser[]>(
  '/integralLottery/queryInviteRecord',
  { loading: false },
)
/** 彩票計數器 */
export const myTicketsCount = post<model.response.MyTickets>('/integralLottery/myTicketsCount', {
  loading: false,
})
/** 獲取抽獎名單 */
export const queryLuckyDrawList = post<model.response.LuckyDrawList, model.request.LuckyDrawList>(
  '/integralLottery/queryLuckyDrawList',
  {
    loading: false,
  },
)
/** 獎池數據 */
export const queryPoolData = post<model.response.PoolData>('/integralLottery/queryPoolData')
/** onGoing數據 */
export const queryOnGoing = post<model.response.OnGoing>('/integralLottery/queryOnGoing', {
  silent: true,
})
/** 直播间抽獎接口 */
export const liveLuckyDraw = post<model.response.LiveLuckyDraw>('/integralLottery/liveLuckyDraw', {
  timeout: 15 * 10,
  retryLimit: 2,
  loading: false,
  silent: true,
})
/** 直播间显示的剩余未中奖彩票数量 */
export const queryActivatedCount = post<number>('/integralLottery/queryActivatedCount', {
  loading: false,
  silent: true,
})
export const pollingActivatedCount = new Polling(queryActivatedCount, {
  interval: 10 * 60 * 1000,
  retry: Number.MAX_SAFE_INTEGER,
})

/** 查询当日积分可兑换彩票剩余量 */
export const getIntegralRemainAmount = post<model.response.RemainAmount>('/integralLottery/getIntegralRemainAmount')
/** 积分兑换彩票 */
export const redeemByIntegral = post<number>('/integralLottery/integralRedeem')
/** 查询用户积分余额 */
export const queryCustomerPoints = post<model.response.CustomerPoints>('/integral/queryCustomerPoints')
